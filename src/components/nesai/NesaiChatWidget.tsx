'use client';

import { useState, useCallback, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Sparkles, X } from 'lucide-react';
import { useNesaiChat } from '@/hooks/useNesaiChat';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { NESAI_OPEN_EVENT, NesaiOpenDetail } from '@/lib/nesai-events';
import { NesaiHeader } from './NesaiHeader';
import { NesaiChatBody } from './NesaiChatBody';

export function NesaiChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, isLoading, sendMessage, clearChat } = useNesaiChat();
  const pathname = usePathname();

  // Hide widget entirely on the dedicated NESAI chat page
  const isNesaiPage = pathname === '/tanya-nesai';

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<NesaiOpenDetail>;
      setIsOpen(true);
      if (customEvent.detail?.prompt) {
        sendMessage(customEvent.detail.prompt);
      }
    };

    window.addEventListener(NESAI_OPEN_EVENT, handleOpen);
    return () => {
      window.removeEventListener(NESAI_OPEN_EVENT, handleOpen);
    };
  }, [sendMessage]);

  const toggleChat = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Don't render anything on the dedicated NESAI page
  if (isNesaiPage) return null;

  return (
    <>
      {/* Chat Window Container using shadcn Card */}
      <Card
        className={`fixed bottom-20 right-3 sm:right-6 z-[9998] w-[calc(100vw-24px)] sm:w-[410px] max-h-[620px] h-[calc(100vh-120px)] rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col transition-all duration-300 ${
          isOpen
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

      {/* Launcher Button: Clean institutional pill on desktop, compact on mobile */}
      <div className="fixed bottom-5 right-3 sm:right-6 z-[9999]">
        <Button
          type="button"
          onClick={toggleChat}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Tutup navigasi NESAI' : 'Buka navigasi asisten NESAI'}
          className={`relative group h-12 rounded-full px-4 sm:px-5 gap-2.5 font-medium transition-all duration-300 shadow-lg cursor-pointer ${
            isOpen
              ? 'bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700'
              : 'bg-slate-900 hover:bg-blue-700 text-white border border-slate-800/80 hover:shadow-blue-900/20'
          }`}
        >
          {isOpen ? (
            <>
              <X className="h-4 w-4" />
              <span className="hidden sm:inline text-xs font-semibold tracking-wide">Tutup</span>
            </>
          ) : (
            <>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <Sparkles className="h-4 w-4 text-blue-400 group-hover:text-blue-200 transition-colors" />
              <span className="text-xs sm:text-sm font-semibold tracking-tight">Tanya NESAI</span>
            </>
          )}
        </Button>
      </div>
    </>
  );
}

