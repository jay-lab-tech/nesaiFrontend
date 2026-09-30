'use client';

import { useState, useCallback, useEffect, useRef, startTransition } from 'react';
import { ChatMessage } from '@/types/nesai';
import {
  sendNesaiMessage,
  ChatHistoryItem,
  NesaiRateLimitError,
  NesaiOriginError,
} from '@/lib/api/nesai';

const STORAGE_KEY = 'nesai-chat-messages-v1';
const SESSION_ID_KEY = 'nesai-chat-session-id';

const WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome',
  sender: 'nesai',
  text: 'Halo! Saya **NESAI**, asisten virtual SMKN 1 Subang. 👋\n\nAda yang bisa saya bantu terkait jurusan, PPDB, atau info sekolah lainnya?',
  createdAt: '',
};

function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return '';
  try {
    let id = localStorage.getItem(SESSION_ID_KEY);
    if (!id) {
      id = `nesai_sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem(SESSION_ID_KEY, id);
    }
    return id;
  } catch {
    return `nesai_sess_${Date.now()}`;
  }
}

function loadMessagesFromStorage(): ChatMessage[] | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY) || sessionStorage.getItem('nesai-chat-messages');
    if (stored) {
      return JSON.parse(stored) as ChatMessage[];
    }
  } catch {
    // Ignore parse errors
  }
  return null;
}

function saveMessagesToStorage(messages: ChatMessage[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch {
    // Ignore storage errors
  }
}

function createIdempotencyKey(): string {
  try {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }
  } catch {
    // Ignore — fallback below
  }
  return `nesai_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
}

export function useNesaiChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [sessionId, setSessionId] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [cooldownUntil, setCooldownUntil] = useState<number>(0);
  const [cooldownRemaining, setCooldownRemaining] = useState<number>(0);
  const isInitialized = useRef(false);

  // Guard sinkron melawan double-submit: `isLoading` (state) baru berubah
  // setelah render, sehingga klik cepat beruntun bisa lolos. Ref ini set
  // segera saat submit dimulai.
  const inFlightRef = useRef(false);
  const cooldownUntilRef = useRef(0);

  // Inisialisasi pesan & session ID dari storage saat mount
  useEffect(() => {
    const id = getOrCreateSessionId();
    setSessionId(id);

    const stored = loadMessagesFromStorage();
    if (stored && stored.length > 0) {
      startTransition(() => {
        setMessages(stored);
      });
    } else {
      startTransition(() => {
        setMessages([
          {
            ...WELCOME_MESSAGE,
            createdAt: new Date().toISOString(),
          },
        ]);
      });
    }
    isInitialized.current = true;
  }, []);

  // Simpan riwayat obrolan ke storage setiap kali ada perubahan
  useEffect(() => {
    if (!isInitialized.current) return;
    saveMessagesToStorage(messages);
  }, [messages]);

  // Cooldown ticker untuk 429: hitung mundur detik tersisa agar UI bisa
  // menampilkan sisa waktu dan menahan tombol kirim.
  useEffect(() => {
    if (cooldownUntil <= Date.now()) {
      return;
    }

    const tick = () => {
      const remaining = Math.max(0, Math.ceil((cooldownUntil - Date.now()) / 1000));
      setCooldownRemaining(remaining);
      if (remaining <= 0) {
        cooldownUntilRef.current = 0;
        setCooldownUntil(0);
        setError((prev) => (prev?.startsWith('Terlalu banyak permintaan') ? null : prev));
      }
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [cooldownUntil]);

  const sendMessage = useCallback(
    async (text: string) => {
      // Cegah double-submit: jangan kirim bila kosong, sedang memuat,
      // request lain masih in-flight, atau sedang cooldown 429.
      if (
        !text.trim() ||
        isLoading ||
        inFlightRef.current ||
        Date.now() < cooldownUntilRef.current
      ) {
        return;
      }

      // Idempotency-Key per-klik: di-generate sekali di sini dan dipakai
      // untuk seluruh percobaan (termasuk retry jaringan internal), BUKAN
      // per-retry, sehingga backend mengembalikan respons yang sama.
      const idempotencyKey = createIdempotencyKey();

      inFlightRef.current = true;

      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        sender: 'user',
        text: text.trim(),
        createdAt: new Date().toISOString(),
      };

      // Ekstrak riwayat percakapan sebelumnya untuk memory AI (multi-turn context)
      // Filter pesan sambutan awal dan pesan error, ambil 10 pesan terakhir (5 giliran dialog)
      const history: ChatHistoryItem[] = messages
        .filter((m) => m.id !== 'welcome' && !m.isError && m.text.trim())
        .slice(-10)
        .map((m) => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.text,
        }));

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      setError(null);

      try {
        const response = await sendNesaiMessage(text, history, sessionId, {
          idempotencyKey,
        });
        const data = response.data;

        const botMessage: ChatMessage = {
          id: `nesai-${Date.now()}`,
          sender: 'nesai',
          text: data.answer,
          createdAt: new Date().toISOString(),
          intent: data.intent,
          sources: data.sources,
          actions: data.actions,
          // Provider AI down → HTTP 200 + mode "fallback-error".
          // Tandai agar UI memberi badge lembut (bukan error merah),
          // namun tetap render `actions` default.
          isFallback: data.mode === 'fallback-error',
        };

        setMessages((prev) => [...prev, botMessage]);
      } catch (err: unknown) {
        if (err instanceof NesaiRateLimitError) {
          // JANGAN auto-retry. Set cooldown dari Retry-After, disable tombol kirim.
          const until = Date.now() + err.retryAfterSeconds * 1000;
          cooldownUntilRef.current = until;
          setCooldownUntil(until);
          setCooldownRemaining(err.retryAfterSeconds);
          setError(
            `Terlalu banyak permintaan. Coba lagi dalam ${err.retryAfterSeconds} detik.`
          );
        } else if (err instanceof NesaiOriginError) {
          // Kesalahan konfigurasi (origin/sesi ditolak) — jangan tampilkan
          // sebagai kegagalan jaringan umum, dan jangan crash.
          setError(
            'Permintaan ke NESAI ditolak (origin/sesi). Hubungi pengelola situs untuk konfigurasi.'
          );
          setMessages((prev) => [
            ...prev,
            {
              id: `error-${Date.now()}`,
              sender: 'nesai',
              text: 'Maaf, permintaan tidak diizinkan oleh server. Silakan hubungi pengelola situs.',
              createdAt: new Date().toISOString(),
              isError: true,
            },
          ]);
        } else {
          const errorMessage = err instanceof Error ? err.message : 'Terjadi kesalahan jaringan.';
          setMessages((prev) => [
            ...prev,
            {
              id: `error-${Date.now()}`,
              sender: 'nesai',
              text: 'Maaf, terjadi gangguan saat menghubungi server. Silakan coba lagi atau cek koneksi internet Anda.',
              createdAt: new Date().toISOString(),
              isError: true,
            },
          ]);
          setError(errorMessage);
        }
      } finally {
        inFlightRef.current = false;
        setIsLoading(false);
      }
    },
    [isLoading, messages, sessionId]
  );

  const clearChat = useCallback(() => {
    const newSessionId = `nesai_sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    setSessionId(newSessionId);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(SESSION_ID_KEY, newSessionId);
        localStorage.removeItem(STORAGE_KEY);
        sessionStorage.removeItem('nesai-chat-messages');
      } catch {
        // Ignore storage errors
      }
    }

    cooldownUntilRef.current = 0;
    setCooldownUntil(0);
    setCooldownRemaining(0);

    const resetMessage: ChatMessage = {
      id: `welcome-${Date.now()}`,
      sender: 'nesai',
      text: 'Percakapan dan memori telah direset. Ada yang bisa NESAI bantu lagi? 😊',
      createdAt: new Date().toISOString(),
    };
    setMessages([resetMessage]);
    setError(null);
  }, []);

  // Selama cooldown, anggap seperti "disabled" agar tombol kirim terkunci.
  const isCooldown = cooldownRemaining > 0;

  return {
    messages,
    sessionId,
    isLoading,
    error,
    cooldownUntil,
    cooldownRemaining,
    isCooldown,
    sendMessage,
    clearChat,
  };
}
