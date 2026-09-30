'use client';

import { useRef, useEffect, useCallback } from 'react';
import { ChatMessage } from '@/types/nesai';
import { ScrollArea } from '@/components/ui/scroll-area';
import { NesaiMessageItem } from './NesaiMessageItem';
import { NesaiTypingIndicator } from './NesaiTypingIndicator';
import { useTypewriter } from '@/hooks/useTypewriter';

interface NesaiMessageListProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

/** Jarak (px) dari dasar yang masih dianggap "menempel di bawah". */
const STICK_TO_BOTTOM_THRESHOLD = 80;

export function NesaiMessageList({ messages, isLoading }: NesaiMessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLElement | null>(null);
  // Saat user menggulir ke atas untuk membaca, kita berhenti auto-scroll
  // sampai mereka kembali ke dasar.
  const userPinnedUpRef = useRef(false);

  // Identifikasi pesan bot terakhir. Hanya pesan ini yang di-reveal bertahap;
  // pesan historis (dari storage) tampil instan.
  const lastMessage = messages[messages.length - 1];
  const revealTargetId =
    !isLoading && lastMessage && lastMessage.sender === 'nesai' && !lastMessage.isError
      ? lastMessage.id
      : null;

  // Reveal hanya aktif untuk pesan bot terbaru hasil kirim. Pesan ber-id
  // "welcome"/"welcome-*" adalah sambutan/reset → tampil apa adanya.
  const isRevealing =
    revealTargetId !== null &&
    !revealTargetId.startsWith('welcome');

  const targetText = isRevealing && lastMessage ? lastMessage.text : '';
  const { visibleText, isTyping } = useTypewriter(targetText, isRevealing);

  // Resolve viewport Radix ScrollArea sekali.
  useEffect(() => {
    const root = bottomRef.current?.closest('[data-radix-scroll-area-viewport]');
    viewportRef.current = (root as HTMLElement) ?? null;
  }, []);

  // Lacak posisi scroll user untuk memutuskan auto-scroll.
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const handleScroll = () => {
      const distanceFromBottom =
        viewport.scrollHeight - viewport.scrollTop - viewport.clientHeight;
      userPinnedUpRef.current = distanceFromBottom > STICK_TO_BOTTOM_THRESHOLD;
    };

    viewport.addEventListener('scroll', handleScroll, { passive: true });
    return () => viewport.removeEventListener('scroll', handleScroll);
  }, []);

  const stickToBottom = useCallback((smooth: boolean) => {
    const viewport = viewportRef.current;
    if (viewport) {
      // Scroll pada viewport Radix langsung — lebih andal daripada
      // scrollIntoView yang bisa menggeser elemen induk ikut bergerak.
      viewport.scrollTo({
        top: viewport.scrollHeight,
        behavior: smooth ? 'smooth' : 'auto',
      });
    } else if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
    }
  }, []);

  // Auto-scroll mengikuti pertumbuhan teks.
  // - Saat reveal berjalan (isTyping): geser instan ('auto') mengikuti tiap
  //   tick agar tidak "kalah cepat" dari render.
  // - Saat pesan pengguna baru dikirim / indikator loading muncul: smooth.
  // - Bila user menggulir ke atas, jangan paksa turun.
  useEffect(() => {
    if (userPinnedUpRef.current) return;
    stickToBottom(!isTyping);
  }, [messages, isLoading, visibleText, isTyping, stickToBottom]);

  return (
    <ScrollArea className="flex-1 px-3.5 py-3">
      <div className="flex flex-col gap-3">
        {messages.map((message) => {
          const isTarget = revealTargetId !== null && message.id === revealTargetId;
          return (
            <NesaiMessageItem
              key={message.id}
              message={message}
              displayText={isTarget && isRevealing ? visibleText : undefined}
              isRevealing={isTarget && isTyping}
            />
          );
        })}
        {isLoading && <NesaiTypingIndicator />}
        <div ref={bottomRef} aria-hidden="true" />
      </div>
    </ScrollArea>
  );
}
