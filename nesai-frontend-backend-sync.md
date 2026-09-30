# NESAI Frontend — Sesi Baru: Penyesuaian Terhadap Perubahan Backend

Dokumen ini adalah **titik mulai (kickoff) untuk sesi pengerjaan di repository frontend**.
Tujuannya: menyesuaikan frontend Next.js/React dengan perubahan backend NESAI yang baru
(rate limiting per-IP, idempotency, origin guard fail-closed, pruning ter-defer).

> Baca juga: `CHATBOT_FRONTEND_GUIDE.md` (di root repo backend) untuk kontrak API lengkap,
> tipe TypeScript, dan rancangan komponen UI. Dokumen ini **melengkapi**, bukan menggantikan.

---

## 0. Ringkasan: Apa yang berubah di backend

Backend menerapkan 5 perbaikan (prioritas tinggi). Yang berdampak ke frontend:

| # | Perubahan backend | Dampak frontend |
| :-- | :--- | :--- |
| 1 | Rate limit chat **per-IP** (default 10/menit) + plafon global; `/search` (30/menit) & `/recommendations` (20/menit) kini juga dibatasi | Frontend bisa menerima **HTTP 429** |
| 2 | **Idempotency/dedup**: pesan identik dalam jendela 5 detik → respons cache, atau **HTTP 429** bila masih diproses | Frontend bisa menerima **429 "in-flight"** |
| 5 | **Origin guard fail-closed**: request ber-cookie tanpa Origin/Referer terverifikasi → **HTTP 403**; allowlist via `CHAT_TRUSTED_ORIGINS` | Frontend **wajib** kirim Origin yang benar + cookie sesi |

Yang **TIDAK berubah** (aman, tidak perlu diutak-atik):
- Struktur JSON sukses: `data.{answer, intent, sources, actions, mode}`.
- Format `actions[]` (`{type, path, title}`) dan `sources[]`.
- URL endpoint: `POST /api/v1/nesai/chat` dan alias `POST /api/chat`.

---

## 1. Tugas yang harus dikerjakan di frontend

### ✅ TUGAS 1 (WAJIB) — Tangani HTTP 429
Backend kini mengembalikan **429** pada dua kondisi:
1. **Rate limit** per-IP / global / endpoint.
2. **Duplicate in-flight**: dua request identik dikirim saat yang pertama belum selesai.

**Yang salah saat ini:** `lib/api/nesai.ts` (versi di guide) hanya membedakan `response.ok`
vs error generik, sehingga 429 tampil sebagai "gagal menghubungi server" — menyesatkan.

**Yang harus dilakukan:**
- Bedakan 429 dari error lain.
- Tampilkan pesan ramah: *"Terlalu banyak permintaan, coba lagi sebentar."*
- **Jangan auto-retry** pada 429 (memperburuk keadaan). Gunakan header `Retry-After`
  atau `X-RateLimit-Reset` untuk cooldown tombol kirim.
- Disable tombol kirim selama cooldown.

### ✅ TUGAS 2 (WAJIB) — Kirim `credentials` + pastikan origin terdaftar
Karena endpoint chat terikat sesi Laravel dan origin guard aktif:
- Tambahkan `credentials: 'include'` pada `fetch` (backend CORS sudah
  `supports_credentials: true`).
- Pastikan **`FRONTEND_URL`** (backend) **dan `CHAT_TRUSTED_ORIGINS`** (backend) berisi
  origin frontend yang benar. Jika salah → semua request chat **403**.
  - Dev: `http://localhost:3000` (sesuaikan bila Vite 5173 / Next 3001).
  - Prod: `https://smkn1subang.sch.id` (dan `www` bila ada).

### 🟡 TUGAS 3 (DISARANKAN) — Tangani `mode: "fallback-error"`
Provider AI down → backend tetap membalas **HTTP 200** namun `data.mode = "fallback-error"`.
Frontend sebaiknya:
- Beri indikator halus (badge "mode terbatas"), BUKAN error merah.
- Tetap render `data.actions` default (tombol navigasi darurat).

### 🟡 TUGAS 4 (OPSIONAL) — `Idempotency-Key`
Backend sudah men-dedup via hash(sesi+pesan). Untuk menghilangkan ambiguitas 429
"in-flight", frontend bisa mengirim header `Idempotency-Key` **per-klik** (bukan per-retry),
sehingga retry jaringan otomatis tetap menghasilkan respons yang sama.

### 🟢 TUGAS 5 — Pemetaan status HTTP di UI
| Status | Arti | Aksi frontend |
| :--- | :--- | :--- |
| `200` + `mode: "ai-agent"` | Normal | Render jawaban |
| `200` + `mode: "fallback-error"` | Provider AI down | Badge lembut + tetap tampilkan `actions` |
| `422` | Validasi (`message` > 2000 char, `context` invalid) | Validasi di form input |
| **`429`** | Rate limit / duplikat | Pesan "sabar" + cooldown `Retry-After` |
| **`403`** | Origin/sesi ditolak | (Kesalahan konfigurasi) log + perbaiki env backend |

---

## 2. Kontrak API ringkas (referensi cepat)

**Endpoint:** `POST {API_BASE_URL}/api/v1/nesai/chat`

**Request:**
```json
{
  "message": "Halo, apa saja jurusan di SMKN 1 Subang?",
  "context": []
}
```
- `message`: string, wajib, maks **2000** karakter.
- `context`: array string, opsional, maks **5** item.

**Response sukses (200):**
```json
{
  "data": {
    "answer": "…teks markdown…",
    "intent": "school_navigation",
    "sources": ["Basis Data Kompetensi Keahlian (Database SMKN 1 Subang)"],
    "actions": [
      { "type": "navigate", "path": "/jurusan", "title": "Daftar Jurusan / Kompetensi Keahlian" }
    ],
    "mode": "ai-agent"
  },
  "meta": {},
  "message": null
}
```

**Response 429 (rate limit / duplikat):** body JSON dengan `message`, plus header
`Retry-After` dan/atau `X-RateLimit-Reset`.

**Response 403 (origin ditolak):** body JSON dengan `message`
(*"Origin tidak diizinkan."* / *"Origin tidak dapat diverifikasi."*).

---

## 3. Patch contoh (sesuaikan dengan kode aktual)

> File mengikuti struktur di `CHATBOT_FRONTEND_GUIDE.md`. Sesuaikan path/nama dengan repo frontend.

### `lib/api/nesai.ts`

```typescript
import { NesaiChatResponse } from '@/types/nesai';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export class NesaiRateLimitError extends Error {
  retryAfterSeconds: number;
  constructor(message: string, retryAfterSeconds = 5) {
    super(message);
    this.name = 'NesaiRateLimitError';
    this.retryAfterSeconds = retryAfterSeconds;
  }
}

export class NesaiOriginError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NesaiOriginError';
  }
}

export async function sendNesaiMessage(message: string): Promise<NesaiChatResponse> {
  const response = await fetch(`${API_BASE_URL}/api/v1/nesai/chat`, {
    method: 'POST',
    credentials: 'include', // WAJIB: cookie sesi + origin guard
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ message: message.trim(), context: [] }),
  });

  if (response.status === 429) {
    const retryAfter = Number(response.headers.get('Retry-After') ?? '5');
    const body = await response.json().catch(() => null);
    throw new NesaiRateLimitError(
      body?.message ?? 'Terlalu banyak permintaan. Coba lagi sebentar.',
      Number.isFinite(retryAfter) ? retryAfter : 5,
    );
  }

  if (response.status === 403) {
    throw new NesaiOriginError(
      'Permintaan ditolak (origin/sesi). Periksa konfigurasi FRONTEND_URL & CHAT_TRUSTED_ORIGINS.',
    );
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || `Gagal menghubungi NESAI (${response.status})`);
  }

  return response.json();
}
```

### `hooks/useNesaiChat.ts` (bagian penting)

```typescript
import { useState, useCallback, useRef } from 'react';
import { ChatMessage } from '@/types/nesai';
import { sendNesaiMessage, NesaiRateLimitError } from '@/lib/api/nesai';

export function useNesaiChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cooldownUntil, setCooldownUntil] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const idempotencyKeyRef = useRef<string | null>(null);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading || Date.now() < cooldownUntil) return;

      // Kunci idempotency stabil per-pesan (bukan per-retry).
      idempotencyKeyRef.current =
        idempotencyKeyRef.current ?? crypto.randomUUID();

      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        sender: 'user',
        text: text.trim(),
        createdAt: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      setError(null);

      try {
        const response = await sendNesaiMessage(text);
        const data = response.data;

        setMessages((prev) => [
          ...prev,
          {
            id: `nesai-${Date.now()}`,
            sender: 'nesai',
            text: data.answer,
            createdAt: new Date(),
            intent: data.intent,
            sources: data.sources,
            actions: data.actions,
            // mode fallback ditandai agar UI bisa memberi badge lembut
            isFallback: data.mode === 'fallback-error',
          },
        ]);
        idempotencyKeyRef.current = null;
      } catch (err: any) {
        if (err instanceof NesaiRateLimitError) {
          const until = Date.now() + err.retryAfterSeconds * 1000;
          setCooldownUntil(until);
          setError(`Terlalu banyak permintaan. Coba lagi dalam ${err.retryAfterSeconds} detik.`);
        } else {
          setMessages((prev) => [
            ...prev,
            {
              id: `error-${Date.now()}`,
              sender: 'nesai',
              text: 'Maaf, terjadi gangguan saat menghubungi server. Silakan coba lagi.',
              createdAt: new Date(),
              isError: true,
            },
          ]);
          setError(err?.message || 'Terjadi kesalahan jaringan.');
        }
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, cooldownUntil],
  );

  return { messages, isLoading, error, cooldownUntil, sendMessage };
}
```

> Catatan: tambahkan field opsional `isFallback?: boolean` pada tipe `ChatMessage`
> di `types/nesai.ts`.

---

## 4. Checklist konfigurasi (backend & frontend)

Backend `.env` (bukan repo frontend, tapi koordinasikan dengan pemilik backend):
- [ ] `FRONTEND_URL` = origin frontend asli (dev: `http://localhost:3000`).
- [ ] `CHAT_TRUSTED_ORIGINS` = daftar origin dipisah koma (prod: `https://smkn1subang.sch.id,https://www.smkn1subang.sch.id`).
- [ ] `CHAT_RATE_LIMIT_PER_IP` / `CHAT_RATE_LIMIT_GLOBAL` disesuaikan bila perlu.
- [ ] `CHAT_RATE_LIMIT_RECOMMENDATIONS` dinaikkan bila banyak siswa berbagi IP NAT sekolah.

Frontend `.env.local`:
- [ ] `NEXT_PUBLIC_API_URL` = base URL backend.

> PENTING: `config/cors.php` backend memakai `env('FRONTEND_URL')`. Jika memakai
> `php artisan config:cache` di production, pastikan nilai env benar SEBELUM cache dibuat,
> dan `CHAT_TRUSTED_ORIGINS` sudah terisi (dibaca via `config()`, aman saat config:cache).

---

## 5. Checklist pengujian frontend

- [ ] Kirim pesan normal → bubble NESAI + markdown ter-render + `actions` muncul.
- [ ] **429**: spam kirim cepat (>10/menit) → muncul pesan "sabar", tombol kirim disabled
      sesuai `Retry-After`, tidak ada auto-retry.
- [ ] **Duplikat in-flight**: klik ganda sangat cepat pada satu pesan → tidak dobel-bubble,
      maksimal satu pesan user.
- [ ] **`fallback-error`**: (simulasi provider down) → badge lembut + `actions` default tampil.
- [ ] **403**: (uji dengan origin salah) → tidak crash, muncul pesan konfigurasi.
- [ ] Riwayat sesi tetap ada saat navigasi via tombol chatbot (`sessionStorage`).
- [ ] Responsif di mobile.
- [ ] Tombol kirim disabled selama `isLoading` DAN selama cooldown 429.


---

## 6. Referensi

- `CHATBOT_FRONTEND_GUIDE.md` — kontrak API lengkap, tipe TypeScript, rancangan komponen UI.
- `docs/backend/local-stress-test.md` — pembedaan 429 vs `fallback-error`.
- Backend route: `routes/api.php` (endpoint chat + throttle).
- Backend limiter: `app/Providers/AppServiceProvider.php` (`configureRateLimiting`).
- Backend origin guard: `app/Http/Middleware/EnsureTrustedChatOrigin.php`.
- Backend config: `config/chat.php` (rate limit, idempotency, trusted origins).
