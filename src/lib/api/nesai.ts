import { NesaiChatResponse } from '@/types/nesai';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function sendNesaiMessage(message: string): Promise<NesaiChatResponse> {
  const response = await fetch(`${API_BASE_URL}/api/v1/nesai/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      message: message.trim(),
      context: [],
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || `Gagal menghubungi NESAI (${response.status})`);
  }

  return response.json();
}
