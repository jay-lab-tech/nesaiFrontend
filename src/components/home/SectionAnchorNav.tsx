'use client';

import { useEffect, useState, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';

const SECTIONS = [
  { id: 'sambutan', label: 'Sambutan' },
  { id: 'keunggulan', label: 'Keunggulan' },
  { id: 'statistik', label: 'Statistik' },
  { id: 'jurusan', label: 'Jurusan' },
  { id: 'mitra', label: 'Mitra' },
  { id: 'prestasi', label: 'Prestasi' },
  { id: 'testimoni', label: 'Testimoni' },
  { id: 'berita', label: 'Berita' },
  { id: 'ppdb-cta', label: 'PPDB' },
] as const;

/**
 * Sticky section anchor nav — "table of contents" for the landing page narrative.
 * Desktop: horizontal bar pinned below the primary navbar.
 * Mobile: dropdown "Lompat ke bagian" selector.
 * Uses IntersectionObserver for visibility toggle and active section highlight.
 */
export function SectionAnchorNav() {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) return;

    // 1. Toggle anchor nav visibility when hero leaves viewport
    const heroObserver = new IntersectionObserver(
      ([entry]) => setIsVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    heroObserver.observe(hero);

    // 2. Highlight the active section as user scrolls
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-140px 0px -55% 0px', threshold: 0 }
    );

    for (const { id } of SECTIONS) {
      const el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    }

    return () => {
      heroObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (!el) return;

    // Check for prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({
      behavior: prefersReduced ? 'auto' : 'smooth',
      block: 'start',
    });
    setIsMobileOpen(false);
  }, []);

  // Close mobile dropdown on outside click
  useEffect(() => {
    if (!isMobileOpen) return;
    const handleClick = () => setIsMobileOpen(false);
    // Delay to avoid closing immediately on the same click
    const timer = setTimeout(() => {
      document.addEventListener('click', handleClick);
    }, 10);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleClick);
    };
  }, [isMobileOpen]);

  // Close mobile dropdown on Escape
  useEffect(() => {
    if (!isMobileOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileOpen]);

  if (!isVisible) return null;

  const activeLabel = SECTIONS.find((s) => s.id === activeSection)?.label || 'Lompat ke bagian';

  return (
    <nav
      aria-label="Navigasi section halaman"
      className="sticky top-[82px] z-30 border-b border-slate-200 bg-white/95 backdrop-blur-sm"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Desktop: horizontal scroll list */}
        <div className="hidden lg:flex items-center gap-1 overflow-x-auto py-2.5 scrollbar-none">
          {SECTIONS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => scrollToSection(id)}
              className={`shrink-0 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap ${
                activeSection === id
                  ? 'bg-[#0f1e36] text-white'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-[#0f1e36]'
              }`}
              aria-current={activeSection === id ? 'true' : undefined}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Mobile: dropdown selector */}
        <div className="lg:hidden relative py-2">
          <button
            type="button"
            onClick={() => setIsMobileOpen((prev) => !prev)}
            className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-[#0f1e36]"
            aria-expanded={isMobileOpen}
            aria-haspopup="listbox"
          >
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              {activeLabel}
            </span>
            <ChevronDown
              className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                isMobileOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {isMobileOpen && (
            <div
              className="absolute left-0 right-0 top-full z-40 mt-1 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl"
              role="listbox"
              aria-label="Pilih section"
            >
              {SECTIONS.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  role="option"
                  aria-selected={activeSection === id}
                  onClick={() => scrollToSection(id)}
                  className={`flex w-full items-center rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors ${
                    activeSection === id
                      ? 'bg-[#0f1e36] text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
