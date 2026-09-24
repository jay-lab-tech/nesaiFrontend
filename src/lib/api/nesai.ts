import type { NesaiChatResponse, NesaiContext } from '@/types/nesai';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';

export interface ChatHistoryItem {
  role: 'user' | 'assistant';
  content: string;
}

export async function sendNesaiMessage(
  message: string,
  history: ChatHistoryItem[] = [],
  context?: NesaiContext
): Promise<NesaiChatResponse> {
  const rootUrl = API_BASE_URL.replace(/\/api\/v1\/?$/, '');
  const endpoints = [
    `${API_BASE_URL}/nesai/chat`,
    `${rootUrl}/api/chat`,
    `${API_BASE_URL}/chat`,
  ];

  let lastError: Error | null = null;

  for (const url of endpoints) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          message: message.trim(),
          history,
          context: context || [],
        }),
      });

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
    } catch (err) {
      lastError = err as Error;
    }
  }

  throw lastError || new Error('Gagal menghubungi layanan NESAI.');
}
