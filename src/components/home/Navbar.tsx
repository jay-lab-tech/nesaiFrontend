'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ChevronDown, ArrowUpRight } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Profil Sekolah', href: '/profil', menu: [{ label: 'Profil & sejarah', href: '/profil' }, { label: 'Visi & misi', href: '/profil#visi-misi' }, { label: 'Tenaga pendidik', href: '/profil#tenaga-pendidik' }] },
  { label: 'Berita', href: '/berita', menu: [{ label: 'Berita terbaru', href: '/berita' }, { label: 'Pengumuman sekolah', href: '/berita#pengumuman' }, { label: 'Agenda kegiatan', href: '/berita#agenda' }] },
  { label: 'Layanan', href: '/fasilitas', menu: [{ label: 'Program keahlian', href: '/jurusan' }, { label: 'Fasilitas sekolah', href: '/fasilitas' }, { label: 'Informasi PPDB', href: '/ppdb' }, { label: 'Tanya NesAI (Asisten)', href: '/tanya-nesai' }] },
  { label: 'Prestasi', href: '/prestasi' },
  { label: 'Jurusan', href: '/jurusan' },
  { label: 'Kontak', href: '/kontak' },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navContainerRef = useRef<HTMLElement | null>(null);

  const pathname = usePathname();
  const isHome = pathname === '/';
  const isNesai = pathname === '/tanya-nesai' || pathname === '/nesai';
  const tone = isHome ? 'text-white hover:text-white/80' : 'text-[#253b49] hover:text-[#54778c]';
  const navUnderline = isHome ? 'after:bg-white' : 'after:bg-[#e7ae32]';

  // Tutup dropdown dan mobile drawer saat berpindah rute
  useEffect(() => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    setMobileExpanded(null);
  }, [pathname]);

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
      className={`z-40 w-full ${isHome ? 'absolute top-0 border-b border-white/20 bg-[#09243b]/10' : 'sticky top-0 border-b border-[#dce5e1] bg-[#f8faf8]/95 backdrop-blur'}`}
    >
      <div className="mx-auto flex h-[82px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className={`group flex items-center gap-3 ${isHome ? 'text-white' : 'text-[#172b3a]'}`}>
          <Image src="/images/logo-smkn-1-subang.png" alt="Lambang SMK Negeri 1 Subang" width={48} height={48} priority className="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-105" />
          <span className="flex flex-col leading-none">
            <span className="text-2xl font-extrabold tracking-[-0.04em]">NESAS BerAksi</span>
            <span className="mt-1 text-[10px] font-semibold tracking-[0.18em] opacity-90">SMK NEGERI 1 SUBANG</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => {
            const isDropdownOpen = activeDropdown === link.label;
            const isLinkActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/');

            return (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => link.menu && handleMouseEnter(link.label)}
                onMouseLeave={() => link.menu && handleMouseLeave()}
              >
                {link.menu ? (
                  <button
                    type="button"
                    onClick={() => handleToggleDropdown(link.label)}
                    className={`relative inline-flex cursor-pointer items-center gap-1 pb-2 text-sm font-semibold transition-colors after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:transition-[width] after:duration-300 hover:after:w-full ${navUnderline} ${isDropdownOpen || isLinkActive ? `${isHome ? 'text-white after:w-full' : 'text-[#172b3a] after:w-full'}` : tone}`}
                    aria-expanded={isDropdownOpen}
                    aria-haspopup="true"
                  >
                    <span>{link.label}</span>
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className={`relative inline-flex items-center gap-1 pb-2 text-sm font-semibold transition-colors after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:transition-[width] after:duration-300 hover:after:w-full ${navUnderline} ${isLinkActive ? `${isHome ? 'text-white after:w-full' : 'text-[#172b3a] after:w-full'}` : tone}`}
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
                          className="block rounded-lg px-3 py-2.5 text-sm text-slate-700 transition hover:bg-slate-100 hover:text-[#002147]"
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

          {/* Tombol Khusus Tanya NesAI di Desktop */}
          <Link
            href="/tanya-nesai"
            className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-bold transition shadow-2xs ${
              isHome
                ? 'border-emerald-400/40 bg-emerald-500/15 hover:bg-emerald-500/25 text-white'
                : isNesai
                ? 'border-[#172b3a] bg-[#172b3a] text-white shadow-xs'
                : 'border-[#dce5e1] bg-white hover:bg-[#edf3f0] hover:border-[#b9c7c2] text-[#172b3a]'
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-school-heading tracking-tight">Tanya NesAI</span>
          </Link>

          <Link href="/ppdb" className={`inline-flex items-center gap-1 border-b pb-1 text-sm font-semibold ${isHome ? 'border-[#f5b51b] text-white' : 'border-[#e7ae32] text-[#172b3a]'}`}>PPDB</Link>
          <span className={`border-l pl-4 text-sm font-semibold ${isHome ? 'border-white/35 text-white' : 'border-[#cbd7d3] text-[#172b3a]'}`}>ID</span>
        </nav>

        <button type="button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`group flex h-11 w-11 flex-col items-center justify-center gap-[5px] border transition lg:hidden ${isHome ? 'border-white/45 bg-[#08263d]/30 hover:bg-[#08263d]/60' : 'border-[#b9c7c2] bg-white hover:bg-[#edf3f0]'}`} aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'} aria-expanded={mobileMenuOpen}>
          <span className={`h-px w-5 origin-center transition duration-300 ${isHome ? 'bg-white' : 'bg-[#172b3a]'} ${mobileMenuOpen ? 'translate-y-[6px] rotate-45' : ''}`} />
          <span className={`h-px w-5 transition duration-200 ${isHome ? 'bg-white' : 'bg-[#172b3a]'} ${mobileMenuOpen ? 'scale-x-0 opacity-0' : ''}`} />
          <span className={`h-px w-5 origin-center transition duration-300 ${isHome ? 'bg-white' : 'bg-[#172b3a]'} ${mobileMenuOpen ? '-translate-y-[6px] -rotate-45' : ''}`} />
        </button>
      </div>

      {mobileMenuOpen && (
        <nav className={`nav-mobile-drawer border-t px-5 py-5 lg:hidden ${isHome ? 'border-white/15 bg-[#102d43]' : 'border-[#dce5e1] bg-[#f8faf8]'}`}>
          <div className="mx-auto flex max-w-7xl flex-col">
            <p className={`mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] ${isHome ? 'text-white/55' : 'text-[#758b89]'}`}>Menu</p>
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className={`flex items-center justify-between border-t py-3.5 text-base font-semibold ${isHome ? 'border-white/15 text-white' : 'border-[#dce5e1] text-[#172b3a]'}`}>Beranda <ArrowUpRight className="h-4 w-4" /></Link>
            {NAV_LINKS.map((link) => (
              <div key={link.href} className="border-t border-inherit">
                {link.menu ? (
                  <div>
                    <button
                      type="button"
                      onClick={() => setMobileExpanded(mobileExpanded === link.label ? null : link.label)}
                      className={`flex w-full items-center justify-between py-3.5 text-base font-semibold ${isHome ? 'text-white' : 'text-[#172b3a]'}`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileExpanded === link.label ? 'rotate-180 text-[#e7ae32]' : ''}`} />
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
                            className={`py-2 text-sm font-medium transition ${isHome ? 'text-white/80 hover:text-white' : 'text-slate-600 hover:text-[#002147]'}`}
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
                    className={`flex items-center justify-between py-3.5 text-base font-semibold ${isHome ? 'border-white/15 text-white' : 'border-[#dce5e1] text-[#172b3a]'}`}
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            ))}

            {/* Navigasi Khusus NesAI di Menu Mobile */}
            <Link
              href="/tanya-nesai"
              onClick={() => setMobileMenuOpen(false)}
              className={`mt-4 flex items-center justify-between p-3.5 rounded-xl border transition shadow-xs ${
                isHome
                  ? 'border-emerald-400/30 bg-emerald-950/40 text-white'
                  : 'border-[#dce5e1] bg-white text-[#172b3a] hover:bg-[#edf3f0]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-bold font-school-heading">Tanya NesAI</span>
                  <span className={`text-[10.5px] ${isHome ? 'text-emerald-300' : 'text-[#657c7d]'}`}>Asisten Virtual SMKN 1 Subang</span>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-[#e7ae32]" />
            </Link>

            <Link href="/ppdb" onClick={() => setMobileMenuOpen(false)} className={`mt-3 flex items-center justify-center gap-2 py-3.5 text-sm font-bold ${isHome ? 'bg-[#f5b51b] text-[#102d43]' : 'bg-[#172b3a] text-white'}`}>Informasi PPDB <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
        </nav>
      )}
    </header>
  );
}
