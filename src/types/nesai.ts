export interface NesaiAction {
  type: 'navigate' | string;
  path: string;
  title: string;
}

export interface NesaiChatData {
  answer: string;
  intent: string;
  sources: string[];
  actions: NesaiAction[];
  mode: 'ai-agent' | 'fallback-error' | string;
}

export interface NesaiChatResponse {
  data: NesaiChatData;
  meta: Record<string, unknown>;
  message: string | null;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'nesai';
  text: string;
  createdAt: Date | string;
  intent?: string;
  sources?: string[];
  actions?: NesaiAction[];
  isError?: boolean;
}
