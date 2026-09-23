'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { NesaiChatWidget } from '@/components/nesai/NesaiChatWidget';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');
  const isNesaiRoute = pathname === '/tanya-nesai' || pathname === '/nesai';

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <div className={isAdminRoute ? 'w-full flex-1' : 'flex-1'}>{children}</div>
      {!isAdminRoute && !isNesaiRoute && <Footer />}
      {!isAdminRoute && !isNesaiRoute && <NesaiChatWidget />}
    </>
  );
}
