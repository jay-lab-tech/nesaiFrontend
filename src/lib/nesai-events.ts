export const NESAI_OPEN_EVENT = 'nesai:open-chat';

export interface NesaiOpenDetail {
  prompt?: string;
}

export function openNesaiChat(prompt?: string): void {
  if (typeof window === 'undefined') return;
  const event = new CustomEvent<NesaiOpenDetail>(NESAI_OPEN_EVENT, {
    detail: { prompt },
  });
  window.dispatchEvent(event);
}
