'use client';

import { useState, useCallback, useEffect, useRef, startTransition } from 'react';
import { ChatMessage, NesaiContext } from '@/types/nesai';
import { sendNesaiMessage, ChatHistoryItem } from '@/lib/api/nesai';

const SESSION_STORAGE_KEY = 'nesai-chat-messages';
const CONTEXT_STORAGE_KEY = 'nesai-chat-context';

const WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome',
  sender: 'nesai',
  text: 'Halo! Saya **NESAI**, asisten virtual SMKN 1 Subang. 👋\n\nAda yang bisa saya bantu terkait jurusan, PPDB, atau info sekolah lainnya?',
  createdAt: '',
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
  const [activeContext, setActiveContextState] = useState<NesaiContext | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const isInitialized = useRef(false);

  // Restore messages from sessionStorage on mount and clear any stale context storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.removeItem('nesai-chat-context');
      } catch {
        // Ignore storage errors
      }
    }

    const storedMessages = loadMessagesFromSession();

    startTransition(() => {
      if (storedMessages && storedMessages.length > 0) {
        setMessages(storedMessages);
      } else {
        setMessages([
          {
            ...WELCOME_MESSAGE,
            createdAt: new Date().toISOString(),
          },
        ]);
      }
    });
    isInitialized.current = true;
  }, []);

  // Persist messages to sessionStorage on change
  useEffect(() => {
    if (!isInitialized.current) return;
    saveMessagesToSession(messages);
  }, [messages]);

  const setActiveContext = useCallback((ctx: NesaiContext | null) => {
    setActiveContextState(ctx);
  }, []);

  const clearActiveContext = useCallback(() => {
    setActiveContextState(null);
  }, []);

  const sendMessage = useCallback(
    async (text: string, overrideContext?: NesaiContext) => {
      if (!text.trim() || isLoading) return;

      const effectiveContext = overrideContext !== undefined ? overrideContext : activeContext;
      if (overrideContext !== undefined && overrideContext !== activeContext) {
        setActiveContextState(overrideContext);
      }

      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        sender: 'user',
        text: text.trim(),
        createdAt: new Date().toISOString(),
        context: effectiveContext || undefined,
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      setError(null);

      // Build chat history from prior messages (last 6 messages)
      const history: ChatHistoryItem[] = messages
        .filter((m) => m.id !== 'welcome' && !m.isError)
        .slice(-6)
        .map((m) => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.text,
        }));

      try {
        const response = await sendNesaiMessage(text, history, effectiveContext || undefined);
        const data = response.data;

        const botMessage: ChatMessage = {
          id: `nesai-${Date.now()}`,
          sender: 'nesai',
          text: data.answer,
          createdAt: new Date().toISOString(),
          intent: data.intent,
          sources: data.sources,
          actions: data.actions,
          context: effectiveContext || undefined,
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
    },
    [isLoading, activeContext, messages]
  );

  const clearChat = useCallback(() => {
    const resetMessage: ChatMessage = {
      id: `welcome-${Date.now()}`,
      sender: 'nesai',
      text: 'Percakapan telah direset. Ada yang bisa NESAI bantu lagi? 😊',
      createdAt: new Date().toISOString(),
    };
    setMessages([resetMessage]);
    setActiveContextState(null);
    setError(null);
  }, []);

  return {
    messages,
    activeContext,
    isLoading,
    error,
    sendMessage,
    setActiveContext,
    clearActiveContext,
    clearChat,
  };
}

