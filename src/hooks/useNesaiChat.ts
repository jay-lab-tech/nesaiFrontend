'use client';

import { useState, useCallback, useEffect } from 'react';
import { ChatMessage } from '@/types/nesai';
import { sendNesaiMessage } from '@/lib/api/nesai';

const SESSION_STORAGE_KEY = 'nesai-chat-messages';

const WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome',
  sender: 'nesai',
  text: 'Halo! Saya **NESAI**, asisten virtual SMKN 1 Subang. 👋\n\nAda yang bisa saya bantu terkait jurusan, PPDB, atau info sekolah lainnya?',
  createdAt: new Date().toISOString(),
};

function loadMessagesFromSession(): ChatMessage[] | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as ChatMessage[];
    }
  } catch {
    // Ignore parse errors
  }
  return null;
}

function saveMessagesToSession(messages: ChatMessage[]): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(messages));
  } catch {
    // Ignore storage errors
  }
}

export function useNesaiChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Restore messages from sessionStorage on mount
  useEffect(() => {
    const stored = loadMessagesFromSession();
    if (stored && stored.length > 0) {
      setMessages(stored);
    }
  }, []);

  // Persist messages to sessionStorage on change
  useEffect(() => {
    saveMessagesToSession(messages);
  }, [messages]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await sendNesaiMessage(text);
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
  }, [isLoading]);

  const clearChat = useCallback(() => {
    const resetMessage: ChatMessage = {
      id: `welcome-${Date.now()}`,
      sender: 'nesai',
      text: 'Percakapan telah direset. Ada yang bisa NESAI bantu lagi? 😊',
      createdAt: new Date().toISOString(),
    };
    setMessages([resetMessage]);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat,
  };
}
