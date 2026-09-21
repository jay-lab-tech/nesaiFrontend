'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sparkles, GraduationCap, ChevronRight } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Beranda', href: '/' },
  { label: 'Profil', href: '/profil' },
  { label: 'Jurusan', href: '/jurusan' },
  { label: 'Fasilitas', href: '/fasilitas' },
  { label: 'Prestasi', href: '/prestasi' },
  { label: 'Berita', href: '/berita' },
  { label: 'PPDB', href: '/ppdb' },
  { label: 'Kontak', href: '/kontak' },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-20">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-950 text-white shadow-md shadow-blue-900/20 group-hover:scale-105 transition-transform">
            <GraduationCap className="h-6 w-6 text-cyan-300" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-slate-900 leading-tight">
              SMKN 1 SUBANG
            </span>
            <span className="text-xs font-semibold text-blue-600 tracking-wider uppercase">
              NESAS • Pusat Keunggulan
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'text-blue-600 font-bold bg-blue-50/90 shadow-2xs'
                    : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50/60'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/tanya-nesai"
            className="flex items-center gap-2 rounded-full border border-cyan-300/80 bg-gradient-to-r from-cyan-50 to-blue-50 px-3.5 py-1.5 text-xs font-semibold text-cyan-800 hover:border-cyan-400 hover:bg-cyan-100/70 transition-all shadow-sm group"
          >
            <Sparkles className="h-3.5 w-3.5 text-cyan-600 group-hover:rotate-12 transition-transform" />
            <span>Tanya NESAI</span>
          </Link>

          <Link
            href="/ppdb"
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-orange-500/20 hover:from-orange-600 hover:to-amber-700 hover:shadow-lg hover:shadow-orange-500/30 transition-all active:scale-95"
          >
            <span>Daftar PPDB</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden items-center gap-2">
          <Link
            href="/tanya-nesai"
            className="sm:hidden flex items-center gap-1.5 rounded-full bg-cyan-50 border border-cyan-300 px-2.5 py-1 text-xs font-medium text-cyan-800"
          >
            <Sparkles className="h-3 w-3 text-cyan-600" />
            <span>NESAI</span>
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900 focus:outline-none"
            aria-label="Buka menu navigasi"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white/95 backdrop-blur-md px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-1 py-2">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg ${
                    isActive
                      ? 'text-blue-600 font-bold bg-blue-50'
                      : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <Link
              href="/tanya-nesai"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-cyan-300 bg-cyan-50/80 py-2.5 text-sm font-semibold text-cyan-800"
            >
              <Sparkles className="h-4 w-4 text-cyan-600" />
              <span>Konsultasi dengan Asisten NESAI</span>
            </Link>
            <Link
              href="/ppdb"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-500/20"
            >
              Daftar PPDB 2026/2027
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
