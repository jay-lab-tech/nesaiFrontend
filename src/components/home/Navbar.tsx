'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ChevronDown, ArrowUpRight, Search } from 'lucide-react';
import { ROUTES } from '@/lib/site-data';

/**
 * Navigasi global.
 * Menu utama mengikuti brief bagian 2 (Beranda | Tentang | Jurusan |
 * Karya & Industri | PPDB | Nesai | Kontak) sambil mempertahankan menu lama
 * (Berita, Fasilitas/Layanan, Prestasi, Tanya NesAI) agar tetap terjangkau.
 * CTA "Daftar PPDB" selalu terlihat.
 */
const NAV_LINKS: Array<{
  label: string;
  href: string;
  menu?: { label: string; href: string }[];
}> = [
  { label: 'Beranda', href: ROUTES.beranda },
  { label: 'Tentang', href: ROUTES.tentang, menu: [
    { label: 'Profil & sejarah', href: ROUTES.tentang },
    { label: 'Sambutan kepala sekolah', href: '/profil#sambutan' },
    { label: 'Sejarah sekolah', href: '/profil#sejarah' },
    { label: 'Perjalanan sekolah', href: '/profil#perjalanan-sekolah' },
    { label: 'Tenaga pendidik', href: '/profil#tenaga-pendidik' },
    { label: 'Fasilitas sekolah', href: ROUTES.fasilitas },
  ] },
  { label: 'Jurusan', href: ROUTES.jurusan },
  { label: 'Karya & Industri', href: ROUTES.karyaIndustri, menu: [
    { label: 'Portofolio & BLUD', href: ROUTES.portofolio },
    { label: 'PKL & Career Center', href: ROUTES.pkl },
    { label: 'Data Alumni', href: ROUTES.alumni },
    { label: 'Mitra Industri', href: ROUTES.mitra },
  ] },
  { label: 'Berita', href: ROUTES.berita, menu: [
    { label: 'Berita terbaru', href: ROUTES.berita },
    { label: 'Pengumuman sekolah', href: '/berita#pengumuman' },
    { label: 'Agenda kegiatan', href: '/berita#agenda' },
    { label: 'Prestasi siswa', href: ROUTES.prestasi },
  ] },
  { label: 'PPDB', href: ROUTES.ppdb },
  { label: 'Nesai', href: ROUTES.nesai },
  { label: 'Kontak', href: ROUTES.kontak },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navContainerRef = useRef<HTMLElement | null>(null);

  const pathname = usePathname();
  const isHome = pathname === '/';
  const tone = isHome ? 'text-white hover:text-white/80' : 'text-[#253b49] hover:text-[#54778c]';
  const navUnderline = isHome ? 'after:bg-white' : 'after:bg-[var(--accent)]';

  // Beranda memakai navbar fixed agar tetap terlihat saat scroll.
  // Latar dibuat solid setelah hero lewat supaya menu tetap terbaca.
  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 24);
    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollState);
  }, [pathname]);

  // Tutup dropdown dan mobile drawer saat berpindah rute
  // (pola "reset state saat prop berubah" dari React, tanpa setState di effect).
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    setMobileExpanded(null);
  }

  // Tutup dropdown saat klik di luar area navbar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navContainerRef.current && !navContainerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Tutup dropdown / mobile menu saat Escape ditekan
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
        setMobileExpanded(null);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Bersihkan timeout saat unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const handleToggleDropdown = (label: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveDropdown((prev) => (prev === label ? null : label));
  };

  return (
    <header
      ref={navContainerRef}
      className={`z-40 w-full transition-colors duration-300 ${isHome ? `fixed top-0 ${isScrolled ? 'border-b border-white/10 bg-[#09243b]/95 shadow-md backdrop-blur' : 'border-b border-white/20 bg-[#09243b]/10'}` : 'sticky top-0 border-b border-[#dce5e1] bg-[#f8faf8]/95 backdrop-blur'}`}
    >
      <div className="mx-auto flex h-[82px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className={`group flex items-center gap-3 ${isHome ? 'text-white' : 'text-[#172b3a]'}`}>
          <Image src="/images/logo-smkn-1-subang.png" alt="Lambang SMK Negeri 1 Subang" width={48} height={48} priority className="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-105" />
          <span className="flex flex-col leading-none">
            <span className="text-2xl font-extrabold tracking-[-0.04em]">NESAS BerAksi</span>
            <span className="mt-1 text-[10px] font-semibold tracking-[0.18em] opacity-90">SMK NEGERI 1 SUBANG</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Navigasi utama">
          {NAV_LINKS.map((link) => {
            const isDropdownOpen = activeDropdown === link.label;
            const isLinkActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/');

            return (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.menu && handleMouseEnter(link.label)}
                onMouseLeave={handleMouseLeave}
              >
                {link.menu ? (
                  <button
                    type="button"
                    onClick={() => handleToggleDropdown(link.label)}
                    aria-expanded={isDropdownOpen}
                    aria-haspopup="true"
                    className={`relative inline-flex items-center gap-1.5 py-2 text-sm font-semibold transition-colors focus:outline-hidden ${
                      isDropdownOpen || isLinkActive
                        ? isHome
                          ? 'text-white after:w-full'
                          : 'text-[#172b3a] after:w-full'
                        : tone
                    } after:absolute after:bottom-0 after:left-0 after:h-0.5 after:transition-[width] after:duration-300 ${navUnderline}`}
                  >
                    <span>{link.label}</span>
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${
                        isDropdownOpen ? 'rotate-180 text-[var(--accent-strong)]' : ''
                      }`}
                    />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className={`relative inline-flex items-center gap-1.5 py-2 text-sm font-semibold transition-colors focus:outline-hidden ${
                      isLinkActive
                        ? isHome
                          ? 'text-white after:w-full'
                          : 'text-[#172b3a] after:w-full'
                        : tone
                    } after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:transition-[width] after:duration-300 hover:after:w-full ${navUnderline}`}
                  >
                    <span>{link.label}</span>
                  </Link>
                )}

                {link.menu && isDropdownOpen && (
                  <div
                    className="absolute left-0 top-full z-50 w-56 pt-2"
                    onMouseEnter={() => handleMouseEnter(link.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="nav-dropdown relative rounded-xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-950/15 before:absolute before:-top-3 before:left-0 before:right-0 before:h-3 before:content-['']">
                      {link.menu.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className="block rounded-lg px-3 py-2.5 text-sm text-slate-700 transition hover:bg-slate-100 hover:text-[var(--brand)]"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {!isHome && (
            <Link
              href="/search"
              aria-label="Buka pencarian"
              className="inline-flex items-center justify-center p-2 text-[#172b3a] transition hover:text-[#54778c]"
            >
              <Search className="h-5 w-5" />
            </Link>
          )}

          {/* CTA tetap — selalu terlihat */}
          <Link
            href={ROUTES.ppdb}
            className={`inline-flex items-center gap-1.5 px-4 py-2 text-sm font-bold transition ${
              isHome
                ? 'bg-[var(--accent)] text-[var(--brand)] hover:bg-[#ffc83d]'
                : 'bg-[var(--brand)] text-white hover:bg-[var(--brand-soft)]'
            }`}
          >
            Daftar PPDB
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>

          <span className={`border-l pl-4 text-sm font-semibold ${isHome ? 'border-white/35 text-white' : 'border-[#cbd7d3] text-[#172b3a]'}`}>ID</span>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/search"
            aria-label="Buka pencarian"
            className={`inline-flex items-center justify-center p-2 transition ${isHome ? 'text-white hover:text-white/80' : 'text-[#172b3a] hover:text-[#54778c]'}`}
          >
            <Search className="h-5 w-5" />
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`group flex h-11 w-11 flex-col items-center justify-center gap-[5px] border transition ${isHome ? 'border-white/45 bg-[#08263d]/30 hover:bg-[#08263d]/60' : 'border-[#b9c7c2] bg-white hover:bg-[#edf3f0]'}`}
            aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
          >
            <span className={`h-px w-5 origin-center transition duration-300 ${isHome ? 'bg-white' : 'bg-[#172b3a]'} ${mobileMenuOpen ? 'translate-y-[6px] rotate-45' : ''}`} />
            <span className={`h-px w-5 transition duration-200 ${isHome ? 'bg-white' : 'bg-[#172b3a]'} ${mobileMenuOpen ? 'scale-x-0 opacity-0' : ''}`} />
            <span className={`h-px w-5 origin-center transition duration-300 ${isHome ? 'bg-white' : 'bg-[#172b3a]'} ${mobileMenuOpen ? '-translate-y-[6px] -rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav id="mobile-nav" aria-label="Navigasi seluler" className={`nav-mobile-drawer border-t px-5 py-5 lg:hidden ${isHome ? 'border-white/15 bg-[#102d43]' : 'border-[#dce5e1] bg-[#f8faf8]'}`}>
          <div className="mx-auto flex max-w-7xl flex-col">
            <p className={`mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] ${isHome ? 'text-white/55' : 'text-[#758b89]'}`}>Menu</p>
            {NAV_LINKS.map((link) => (
              <div key={link.label} className={`border-t ${isHome ? 'border-white/15' : 'border-[#dce5e1]'}`}>
                {link.menu ? (
                  <div>
                    <button
                      type="button"
                      onClick={() => setMobileExpanded(mobileExpanded === link.label ? null : link.label)}
                      className={`flex w-full items-center justify-between py-3.5 text-base font-semibold ${isHome ? 'text-white' : 'text-[#172b3a]'}`}
                      aria-expanded={mobileExpanded === link.label}
                    >
                      <span>{link.label}</span>
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileExpanded === link.label ? 'rotate-180 text-[var(--accent-strong)]' : ''}`} />
                    </button>
                    {mobileExpanded === link.label && (
                      <div className={`mb-2 ml-2 flex flex-col space-y-1 border-l-2 pl-3 ${isHome ? 'border-white/20' : 'border-slate-300'}`}>
                        {link.menu.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setMobileExpanded(null);
                            }}
                            className={`py-2 text-sm font-medium transition ${isHome ? 'text-white/80 hover:text-white' : 'text-slate-600 hover:text-[var(--brand)]'}`}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between py-3.5 text-base font-semibold ${isHome ? 'text-white' : 'text-[#172b3a]'}`}
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            ))}

            {/* CTA tetap pada menu mobile */}
            <Link href={ROUTES.ppdb} onClick={() => setMobileMenuOpen(false)} className={`mt-4 flex items-center justify-center gap-2 py-3.5 text-sm font-bold ${isHome ? 'bg-[var(--accent)] text-[#102d43]' : 'bg-[var(--brand)] text-white'}`}>Daftar PPDB <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
        </nav>
      )}
    </header>
  );
}
