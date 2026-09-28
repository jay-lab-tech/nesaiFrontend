'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { NesaiChatWidget } from '@/components/nesai/NesaiChatWidget';
import { StickyBottomBar } from '@/components/home/StickyBottomBar';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');
  const isNesaiRoute = pathname === '/tanya-nesai' || pathname === '/nesai';

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <div
        id="main-content"
        className={isAdminRoute ? 'w-full flex-1' : 'flex-1'}
      >
        {children}
      </div>
      {!isAdminRoute && !isNesaiRoute && <Footer />}
      {/* Desktop: floating NesAI widget (hidden on lg- via StickyBottomBar) */}
      {!isAdminRoute && !isNesaiRoute && <NesaiChatWidget />}
      {/* Mobile: sticky bottom bar with PPDB CTA + NesAI launcher */}
      {!isAdminRoute && !isNesaiRoute && <StickyBottomBar />}
    </>
  );
}
