'use client';

import { useState, useCallback, useEffect, startTransition } from 'react';
import { usePathname } from 'next/navigation';
import { MessageSquare, X } from 'lucide-react';
import { useNesaiChat } from '@/hooks/useNesaiChat';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { NESAI_OPEN_EVENT, NesaiOpenDetail } from '@/lib/nesai-events';
import { NesaiHeader } from './NesaiHeader';
import { NesaiChatBody } from './NesaiChatBody';

export function NesaiChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [prefillPrompt, setPrefillPrompt] = useState<string>('');
  const {
    messages,
    activeContext,
    isLoading,
    sendMessage,
    setActiveContext,
    clearActiveContext,
    clearChat,
  } = useNesaiChat();
  const pathname = usePathname();

  // Sembunyikan widget floating di halaman khusus NesAI
  const isNesaiPage = pathname === '/tanya-nesai' || pathname === '/nesai';

  // Handle explicit event to open chat with dynamic params/context
  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<NesaiOpenDetail>;
      setIsOpen(true);
      const detail = customEvent.detail;

      if (detail?.context) {
        setActiveContext(detail.context);
      }

      if (detail?.prompt) {
        if (detail.autoSend !== false) {
          sendMessage(detail.prompt, detail.context);
        } else {
          setPrefillPrompt(detail.prompt);
        }
      }
    };

    window.addEventListener(NESAI_OPEN_EVENT, handleOpen);
    return () => {
      window.removeEventListener(NESAI_OPEN_EVENT, handleOpen);
    };
  }, [sendMessage, setActiveContext]);

  // Route context awareness (Blueprint Section 25)
  // When opening widget, if no explicit context was set, infer from pathname
  useEffect(() => {
    if (!isOpen || activeContext) return;

    startTransition(() => {
      if (pathname.startsWith('/jurusan/') && pathname !== '/jurusan') {
        const slug = pathname.replace('/jurusan/', '').split('/')[0];
        if (slug) {
          setActiveContext({
            page: 'major_detail',
            path: pathname,
            major: slug,
            majorName: slug.toUpperCase(),
            topic: 'jurusan',
          });
        }
      } else if (pathname === '/ppdb') {
        setActiveContext({
          page: 'ppdb',
          path: pathname,
          topic: 'ppdb',
        });
      } else if (pathname === '/profil') {
        setActiveContext({
          page: 'profil',
          path: pathname,
          topic: 'profil',
        });
      } else if (pathname === '/fasilitas') {
        setActiveContext({
          page: 'fasilitas',
          path: pathname,
          topic: 'fasilitas',
        });
      }
    });
  }, [isOpen, pathname, activeContext, setActiveContext]);

  const toggleChat = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Jangan render apapun di halaman khusus NesAI
  if (isNesaiPage) return null;

  return (
    <>
      {/* Chat Window Container */}
      <Card
        className={`fixed bottom-3 sm:bottom-20 right-3 sm:right-6 z-[9998] w-[calc(100vw-24px)] sm:w-[410px] h-[calc(100dvh-24px)] sm:h-[min(620px,calc(100vh-110px))] max-h-[620px] rounded-2xl bg-white border border-[#dce5e1] shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ${
          isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto scale-100'
            : 'opacity-0 translate-y-4 pointer-events-none scale-95'
        }`}
      >
        <NesaiHeader
          onClose={handleClose}
          onClear={clearChat}
          variant="floating"
          activeContext={activeContext}
          onClearContext={clearActiveContext}
        />

        <NesaiChatBody
          messages={messages}
          isLoading={isLoading}
          sendMessage={sendMessage}
          variant="floating"
          activeContext={activeContext}
          prefillValue={prefillPrompt}
        />
      </Card>

      {/* Launcher Button: Clean pill matching school branding */}
      <div className={`fixed bottom-5 right-3 sm:right-6 z-[9999] ${isOpen ? 'hidden sm:block' : 'block'}`}>
        <Button
          type="button"
          onClick={toggleChat}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Tutup navigasi NesAI' : 'Buka navigasi asisten NesAI'}
          className={`relative group h-12 rounded-full px-4 sm:px-5 gap-2.5 font-medium transition-all duration-300 shadow-lg cursor-pointer ${
            isOpen
              ? 'bg-[#172b3a] hover:bg-[#09243b] text-white border border-[#172b3a]'
              : 'bg-[#172b3a] hover:bg-[#09243b] text-white border border-[#172b3a]/40 hover:shadow-xl'
          }`}
        >
          {isOpen ? (
            <>
              <X className="h-4 w-4" />
              <span className="hidden sm:inline text-xs font-semibold tracking-wide">Tutup Chat</span>
            </>
          ) : (
            <>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <MessageSquare className="h-4 w-4 text-[#e7ae32] group-hover:scale-110 transition-transform" />
              <span className="text-xs sm:text-sm font-bold tracking-tight font-school-heading">Tanya NesAI</span>
            </>
          )}
        </Button>
      </div>
    </>
  );
}
