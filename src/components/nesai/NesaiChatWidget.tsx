'use client';

import { useState, useCallback, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { MessageSquare, X } from 'lucide-react';
import { useNesaiChat } from '@/hooks/useNesaiChat';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { NESAI_OPEN_EVENT, NesaiOpenDetail } from '@/lib/nesai-events';
import { NesaiHeader } from './NesaiHeader';
import { NesaiChatBody } from './NesaiChatBody';

/**
 * Floating NesAI chat widget — DESKTOP ONLY (hidden on mobile via lg:hidden).
 * On mobile, the StickyBottomBar component handles NesAI.
 *
 * On the landing page (/), the launcher is hidden until the user scrolls
 * past the hero section — to avoid interrupting the narrative first impression.
 */
export function NesaiChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLauncherVisible, setIsLauncherVisible] = useState(true);
  const { messages, isLoading, sendMessage, clearChat, isCooldown, cooldownRemaining } = useNesaiChat();
  const pathname = usePathname();

  // Sembunyikan widget floating di halaman khusus NesAI
  const isNesaiPage = pathname === '/tanya-nesai' || pathname === '/nesai';
  const isHomePage = pathname === '/';

  // On landing page, hide launcher until hero is scrolled past
  useEffect(() => {
    if (!isHomePage) {
      setIsLauncherVisible(true);
      return;
    }

    // Start hidden on landing page
    setIsLauncherVisible(false);

    const hero = document.getElementById('hero');
    if (!hero) {
      setIsLauncherVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsLauncherVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );
    observer.observe(hero);

    return () => observer.disconnect();
  }, [isHomePage]);

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

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

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
      {/* Chat Window Container — desktop only */}
      <Card
        className={`fixed bottom-20 right-3 sm:right-6 z-[9998] w-[calc(100vw-24px)] sm:w-[410px] max-h-[620px] h-[calc(100vh-120px)] rounded-2xl bg-white border border-[#dce5e1] shadow-2xl overflow-hidden flex-col hidden lg:flex transition-all duration-300 ${
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
          isCooldown={isCooldown}
          cooldownRemaining={cooldownRemaining}
        />
      </Card>

      {/* Launcher Button — desktop only, with delayed appearance on landing page */}
      <div
        className={`fixed bottom-5 right-3 sm:right-6 z-[9999] hidden lg:block transition-all duration-300 ${
          isLauncherVisible || isOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
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
              <span className="hidden sm:inline text-xs font-semibold tracking-wide">Tutup</span>
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
