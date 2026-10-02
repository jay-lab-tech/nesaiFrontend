'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/home/Navbar';
import { Footer } from '@/components/home/Footer';
import { NesaiChatWidget } from '@/components/nesai/NesaiChatWidget';
import { StickyBottomBar } from '@/components/home/StickyBottomBar';

const SCROLL_MOTION_SELECTOR = [
  '#main-content main > *',
  '#main-content main article',
  '#main-content main .grid > :is(article, li, a)',
  '#main-content main .admin-card',
  '#main-content main .admin-metric-card',
].join(', ');
const SCROLL_MOTION_CARD_SELECTOR = [
  '#main-content main article',
  '#main-content main .grid > :is(article, li, a)',
  '#main-content main .admin-card',
  '#main-content main .admin-metric-card',
].join(', ');

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');
  const isNesaiRoute = pathname === '/tanya-nesai' || pathname === '/nesai';

  useEffect(() => {
    const content = document.querySelector('#main-content');
    if (!content || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const target = entry.target as HTMLElement;
          target.classList.add('scroll-motion-visible');
          target.dataset.scrollMotion = 'visible';
          observer.unobserve(target);

          const clearWillChange = (event: TransitionEvent) => {
            if (event.target !== target || event.propertyName !== 'opacity') return;
            target.classList.remove('scroll-motion-pending');
            target.removeEventListener('transitionend', clearWillChange);
          };
          target.addEventListener('transitionend', clearWillChange);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -7% 0px' },
    );

    const prepare = (target: HTMLElement) => {
      if (target.dataset.scrollMotion === 'visible') return;
      if (target.dataset.scrollMotion === 'pending') {
        observer.observe(target);
        return;
      }

      const rect = target.getBoundingClientRect();
      const isInInitialViewport = rect.top < window.innerHeight && rect.bottom > 0;
      if (isInInitialViewport) {
        target.dataset.scrollMotion = 'visible';
        return;
      }

      const isCard = target.matches(SCROLL_MOTION_CARD_SELECTOR);

      target.dataset.scrollMotion = 'pending';
      target.classList.add('scroll-motion', 'scroll-motion-pending');
      if (isCard) {
        const siblings = Array.from(target.parentElement?.children ?? []).filter((sibling) =>
          sibling.matches(SCROLL_MOTION_CARD_SELECTOR),
        );
        const index = Math.max(0, siblings.indexOf(target));
        target.classList.add('scroll-motion-card');
        target.style.setProperty('--scroll-motion-delay', `${Math.min(index, 5) * 75}ms`);
        target.style.setProperty('--scroll-motion-x', index % 2 === 0 ? '10px' : '-10px');
      }

      observer.observe(target);
    };

    const register = (root: ParentNode) => {
      if (root instanceof HTMLElement && root.matches(SCROLL_MOTION_SELECTOR)) prepare(root);
      root.querySelectorAll<HTMLElement>(SCROLL_MOTION_SELECTOR).forEach(prepare);
    };

    register(content);
    const mutations = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) register(node);
        });
      });
    });
    mutations.observe(content, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      observer.disconnect();
    };
  }, [pathname]);

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
