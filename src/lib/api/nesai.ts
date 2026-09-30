import type { NesaiChatResponse } from '@/types/nesai';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';

/**
 * Batas waktu request (ms). Disesuaikan dengan kondisi backend terkini:
 * provider timeout = 10s dan agent max 3 langkah → worst-case ±30s; saat
 * provider AI mati, circuit breaker membalas HTTP 200 `mode: "fallback-error"`
 * dalam < 1 detik. 25s cukup untuk worst-case (3 × 10s + overhead) tanpa
 * membuat user menunggu sia-sia bila jaringan bermasalah.
 */
const REQUEST_TIMEOUT_MS = 25000;

export interface ChatHistoryItem {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * Error dari rate limit (HTTP 429).
 * Backend mengembalikan 429 baik untuk rate limit per-IP/global/endpoint
 * maupun saat pesan identik sedang diproses ("in-flight" dedup).
 * JANGAN auto-retry: gunakan `retryAfterSeconds` sebagai cooldown tombol kirim.
 */
export class NesaiRateLimitError extends Error {
  retryAfterSeconds: number;

  constructor(message: string, retryAfterSeconds = 5) {
    super(message);
    this.name = 'NesaiRateLimitError';
    this.retryAfterSeconds = retryAfterSeconds;
  }
}

/**
 * Error origin/sesi ditolak (HTTP 403) oleh origin guard fail-closed.
 * Ini indikasi kesalahan konfigurasi (`FRONTEND_URL` / `CHAT_TRUSTED_ORIGINS`),
 * bukan error pengguna — log dan perbaiki env backend.
 */
export class NesaiOriginError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NesaiOriginError';
  }
}

export interface SendNesaiMessageOptions {
  /**
   * Kunci idempotency stabil PER-KLIK (bukan per-retry) untuk menghilangkan
   * ambiguitas 429 "in-flight". Retry jaringan otomatis tetap memakai kunci
   * yang sama sehingga menghasilkan respons yang sama.
   */
  idempotencyKey?: string;
}

export async function sendNesaiMessage(
  message: string,
  history: ChatHistoryItem[] = [],
  sessionId?: string,
  options: SendNesaiMessageOptions = {}
): Promise<NesaiChatResponse> {
  const rootUrl = API_BASE_URL.replace(/\/api\/v1\/?$/, '');
  const endpoints = [
    `${API_BASE_URL}/nesai/chat`,
    `${rootUrl}/api/chat`,
    `${API_BASE_URL}/chat`,
  ];

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  if (options.idempotencyKey) {
    headers['Idempotency-Key'] = options.idempotencyKey;
  }

  let lastError: Error | null = null;

  for (const url of endpoints) {
    // AbortController: backend kini memakai provider timeout 10s (CHAT_PROVIDER_TIMEOUT)
    // dan agent maks 3 langkah → worst-case ±30s; saat provider AI down, backend
    // membalas `fallback-error` < 1s (circuit breaker). Batas 25s ini mencegah
    // request menggantung tanpa batas bila jaringan benar-benar mati.
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const payload: Record<string, unknown> = {
        message: message.trim(),
        // Backend memvalidasi `context` sebagai array STRING (maks 5 item,
        // tiap item maks 500 karakter). Backend mengelola riwayat multi-turn
        // sendiri via `session_id` (ChatSession/ChatMessage), sehingga `context`
        // cukup berisi potongan teks terakhir sebagai petunjuk — BUKAN objek
        // { role, content } yang akan memicu HTTP 422.
        context: history
          .slice(-5)
          .map((item) => (typeof item.content === 'string' ? item.content.slice(0, 500) : ''))
          .filter((content) => content.trim() !== ''),
      };

      if (sessionId) {
        payload.session_id = sessionId;
        payload.conversation_id = sessionId;
      }

      const response = await fetch(url, {
        method: 'POST',
        // WAJIB: cookie sesi Laravel + origin guard (fail-closed).
        // Backend CORS sudah `supports_credentials: true`.
        credentials: 'include',
        headers,
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      // 429 — rate limit per-IP/global ATAU duplikat "in-flight".
      // Jangan pernah dianggap sebagai error generik.
      if (response.status === 429) {
        const rawRetry =
          response.headers.get('Retry-After') ??
          response.headers.get('X-RateLimit-Reset') ??
          '5';
        const parsed = Number(rawRetry);
        const retryAfter = Number.isFinite(parsed) && parsed > 0 ? parsed : 5;
        const body = await response.json().catch(() => null);
        throw new NesaiRateLimitError(
          body?.message ?? 'Terlalu banyak permintaan. Coba lagi sebentar.',
          retryAfter
        );
      }

      // 403 — origin/sesi ditolak oleh origin guard (kesalahan konfigurasi).
      if (response.status === 403) {
        const body = await response.json().catch(() => null);
        throw new NesaiOriginError(
          body?.message ??
            'Permintaan ditolak (origin/sesi). Periksa FRONTEND_URL & CHAT_TRUSTED_ORIGINS.'
        );
      }

      if (response.ok) {
        const json = await response.json();
        // Normalize response whether backend returns { reply, source } or { data: { answer, ... } }
        if (json.reply && !json.data) {
          return {
            data: {
              answer: json.reply,
              intent: json.intent || 'informasi',
              sources: json.source ? [json.source] : ['Sistem NESAI'],
              actions: json.actions || [],
              mode: 'ai-agent',
            },
            meta: {},
            message: 'Berhasil',
          };
        }
        return json;
      }

      // Error HTTP non-429/403 (mis. 422/500). Simpan lalu coba endpoint berikutnya.
      const errorData = await response.json().catch(() => null);
      lastError = new Error(
        errorData?.message || `Gagal menghubungi NESAI (${response.status})`
      );
    } catch (err) {
      clearTimeout(timeoutId);
      // Error khusus tidak boleh ditelan oleh loop fallback endpoint,
      // karena bukan masalah "endpoint salah".
      if (err instanceof NesaiRateLimitError || err instanceof NesaiOriginError) {
        throw err;
      }
      if (err instanceof DOMException && err.name === 'AbortError') {
        lastError = new Error(
          'NESAI membutuhkan waktu terlalu lama untuk merespons. Silakan coba lagi.'
        );
        continue;
      }
      lastError = err as Error;
    }
  }

  throw lastError || new Error('Gagal menghubungi layanan NESAI.');
}
