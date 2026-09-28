'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, MessageSquare, X } from 'lucide-react';
import { useNesaiChat } from '@/hooks/useNesaiChat';
import { Card } from '@/components/ui/card';
import { NESAI_OPEN_EVENT, NesaiOpenDetail } from '@/lib/nesai-events';
import { NesaiHeader } from '@/components/nesai/NesaiHeader';
import { NesaiChatBody } from '@/components/nesai/NesaiChatBody';

/**
 * Mobile-only sticky bottom bar with two persistent CTAs:
 * 1. "Daftar PPDB" — direct action link (left)
 * 2. "Tanya NesAI" — chatbot launcher (right)
 *
 * Hidden on:
 * - Desktop (lg+ breakpoint)
 * - /ppdb (user already there)
 * - /tanya-nesai, /nesai (full-page NesAI)
 * - /admin/* (admin routes)
 */
export function StickyBottomBar() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { messages, isLoading, sendMessage, clearChat } = useNesaiChat();
  const pathname = usePathname();

  const isHidden =
    pathname === '/ppdb' ||
    pathname === '/tanya-nesai' ||
    pathname === '/nesai' ||
    pathname.startsWith('/admin');

  // Listen for programmatic chat open events (from NesAI promo bar, etc.)
  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<NesaiOpenDetail>;
      setIsChatOpen(true);
      if (customEvent.detail?.prompt) {
        sendMessage(customEvent.detail.prompt);
      }
    };
    window.addEventListener(NESAI_OPEN_EVENT, handleOpen);
    return () => window.removeEventListener(NESAI_OPEN_EVENT, handleOpen);
  }, [sendMessage]);

  const toggleChat = useCallback(() => {
    setIsChatOpen((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setIsChatOpen(false);
  }, []);

  // Close chat on Escape key
  useEffect(() => {
    if (!isChatOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsChatOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isChatOpen]);

  if (isHidden) return null;

  return (
    <>
      {/* Chat window — positioned above the bottom bar */}
      <Card
        className={`fixed bottom-[68px] right-2 left-2 z-[9998] max-h-[calc(100vh-80px)] h-[500px] rounded-2xl bg-white border border-[#dce5e1] shadow-2xl overflow-hidden flex flex-col transition-all duration-300 lg:hidden ${
          isChatOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto scale-100'
            : 'opacity-0 translate-y-4 pointer-events-none scale-95'
        }`}
      >
        <NesaiHeader onClose={handleClose} onClear={clearChat} variant="floating" />
        <NesaiChatBody
          messages={messages}
          isLoading={isLoading}
          sendMessage={sendMessage}
          variant="floating"
        />
      </Card>

      {/* Bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-[9999] lg:hidden sticky-bottom-bar">
        <div className="flex items-center gap-2 border-t border-slate-200 bg-white/95 backdrop-blur-sm px-3 py-2.5">
          {/* PPDB CTA */}
          <Link
            href="/ppdb"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#f5b51b] px-4 py-2.5 text-sm font-bold text-[#0f1e36] transition hover:bg-[#ffc83d] active:scale-[0.97]"
          >
            Daftar PPDB
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>

          {/* NesAI Toggle */}
          <button
            type="button"
            onClick={toggleChat}
            aria-expanded={isChatOpen}
            aria-label={isChatOpen ? 'Tutup NesAI' : 'Buka NesAI'}
            className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold transition active:scale-[0.97] ${
              isChatOpen
                ? 'bg-[#172b3a] text-white'
                : 'border border-[#172b3a]/20 bg-[#172b3a] text-white'
            }`}
          >
            {isChatOpen ? (
              <>
                <X className="h-4 w-4" />
                <span>Tutup</span>
              </>
            ) : (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <MessageSquare className="h-4 w-4 text-[#e7ae32]" />
                <span className="font-school-heading tracking-tight">NesAI</span>
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
