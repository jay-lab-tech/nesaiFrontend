'use client';

import { useState, useCallback, useEffect, useRef, startTransition } from 'react';
import { ChatMessage } from '@/types/nesai';
import { sendNesaiMessage, ChatHistoryItem } from '@/lib/api/nesai';

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

export function useNesaiChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [sessionId, setSessionId] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const isInitialized = useRef(false);

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

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;

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
      const response = await sendNesaiMessage(text, history, sessionId);
      const data = response.data;

      const botMessage: ChatMessage = {
        id: `nesai-${Date.now()}`,
        sender: 'nesai',
        text: data.answer,
        createdAt: new Date().toISOString(),
        intent: data.intent,
        sources: data.sources,
        actions: data.actions,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Terjadi kesalahan jaringan.';
      const fallbackErrorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        sender: 'nesai',
        text: 'Maaf, terjadi gangguan saat menghubungi server. Silakan coba lagi atau cek koneksi internet Anda.',
        createdAt: new Date().toISOString(),
        isError: true,
      };
      setMessages((prev) => [...prev, fallbackErrorMessage]);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, messages, sessionId]);

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

    const resetMessage: ChatMessage = {
      id: `welcome-${Date.now()}`,
      sender: 'nesai',
      text: 'Percakapan dan memori telah direset. Ada yang bisa NESAI bantu lagi? 😊',
      createdAt: new Date().toISOString(),
    };
    setMessages([resetMessage]);
    setError(null);
  }, []);

  return {
    messages,
    sessionId,
    isLoading,
    error,
    sendMessage,
    clearChat,
  };
}
