import type { NesaiContext } from '@/types/nesai';

export const NESAI_OPEN_EVENT = 'nesai:open-chat';

export interface NesaiOpenDetail {
  prompt?: string;
  context?: NesaiContext;
  autoSend?: boolean;
}

export function openNesaiChat(input?: string | NesaiOpenDetail): void {
  if (typeof window === 'undefined') return;

  const detail: NesaiOpenDetail =
    typeof input === 'string'
      ? { prompt: input, autoSend: true }
      : input || {};

  const event = new CustomEvent<NesaiOpenDetail>(NESAI_OPEN_EVENT, { detail });
  window.dispatchEvent(event);
}
