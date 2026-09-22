'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
<<<<<<< HEAD
import { Menu, X, Sparkles, GraduationCap, ChevronRight } from 'lucide-react';
=======
import { ChevronDown, ArrowUpRight } from 'lucide-react';
>>>>>>> cdbb571e0248b80b2ab31c48bc5c677d91c6e4a9

const NAV_LINKS = [
  { label: 'Profil Sekolah', href: '/profil', menu: [{ label: 'Profil & sejarah', href: '/profil' }, { label: 'Visi & misi', href: '/profil#visi-misi' }, { label: 'Tenaga pendidik', href: '/profil#tenaga-pendidik' }] },
  { label: 'Berita', href: '/berita', menu: [{ label: 'Berita terbaru', href: '/berita' }, { label: 'Pengumuman sekolah', href: '/berita#pengumuman' }, { label: 'Agenda kegiatan', href: '/berita#agenda' }] },
  { label: 'Layanan', href: '/fasilitas', menu: [{ label: 'Program keahlian', href: '/jurusan' }, { label: 'Fasilitas sekolah', href: '/fasilitas' }, { label: 'Informasi PPDB', href: '/ppdb' }] },
  { label: 'Prestasi', href: '/prestasi' },
  { label: 'Jurusan', href: '/jurusan' },
  { label: 'Kontak', href: '/kontak' },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const isHome = pathname === '/';
  const tone = isHome ? 'text-white hover:text-white/80' : 'text-[#253b49] hover:text-[#54778c]';
  const navUnderline = isHome ? 'after:bg-white' : 'after:bg-[#e7ae32]';

  return (
    <header className={`z-40 w-full ${isHome ? 'absolute top-0 border-b border-white/20 bg-[#09243b]/10' : 'sticky top-0 border-b border-[#dce5e1] bg-[#f8faf8]/95 backdrop-blur'}`}>
      <div className="mx-auto flex h-[82px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className={`group flex items-center gap-3 ${isHome ? 'text-white' : 'text-[#172b3a]'}`}>
          <Image src="/images/logo-smkn-1-subang.png" alt="Lambang SMK Negeri 1 Subang" width={48} height={48} priority className="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-105" />
          <span className="flex flex-col leading-none">
            <span className="text-2xl font-extrabold tracking-[-0.04em]">NESAS</span>
            <span className="mt-1 text-[10px] font-semibold tracking-[0.18em] opacity-90">SMK NEGERI 1 SUBANG</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <div key={link.href} className="relative" onMouseEnter={() => link.menu && setActiveDropdown(link.label)} onMouseLeave={() => setActiveDropdown(null)}>
              <Link href={link.href} onFocus={() => link.menu && setActiveDropdown(link.label)} className={`relative inline-flex items-center gap-1 pb-2 text-sm font-semibold transition-colors after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:transition-[width] after:duration-300 hover:after:w-full ${navUnderline} ${pathname === link.href ? `${isHome ? 'text-white after:w-full' : 'text-[#172b3a] after:w-full'}` : tone}`}>
                {link.label}{link.menu && <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${activeDropdown === link.label ? 'rotate-180' : ''}`} />}
              </Link>
              {link.menu && activeDropdown === link.label && (
                <div className="nav-dropdown absolute left-0 top-full mt-3 w-56 border border-slate-200 bg-white p-2 shadow-xl shadow-slate-950/15">
                  {link.menu.map((item) => <Link key={item.href} href={item.href} onClick={() => setActiveDropdown(null)} className="block px-3 py-2.5 text-sm text-slate-700 transition hover:bg-slate-100 hover:text-[#002147]">{item.label}</Link>)}
                </div>
              )}
            </div>
          ))}
          <Link href="/ppdb" className={`inline-flex items-center gap-1 border-b pb-1 text-sm font-semibold ${isHome ? 'border-[#f5b51b] text-white' : 'border-[#e7ae32] text-[#172b3a]'}`}>PPDB</Link>
          <span className={`border-l pl-4 text-sm font-semibold ${isHome ? 'border-white/35 text-white' : 'border-[#cbd7d3] text-[#172b3a]'}`}>ID</span>
        </nav>

<<<<<<< HEAD
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
=======
        <button type="button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`group flex h-11 w-11 flex-col items-center justify-center gap-[5px] border transition lg:hidden ${isHome ? 'border-white/45 bg-[#08263d]/30 hover:bg-[#08263d]/60' : 'border-[#b9c7c2] bg-white hover:bg-[#edf3f0]'}`} aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'} aria-expanded={mobileMenuOpen}>
          <span className={`h-px w-5 origin-center transition duration-300 ${isHome ? 'bg-white' : 'bg-[#172b3a]'} ${mobileMenuOpen ? 'translate-y-[6px] rotate-45' : ''}`} />
          <span className={`h-px w-5 transition duration-200 ${isHome ? 'bg-white' : 'bg-[#172b3a]'} ${mobileMenuOpen ? 'scale-x-0 opacity-0' : ''}`} />
          <span className={`h-px w-5 origin-center transition duration-300 ${isHome ? 'bg-white' : 'bg-[#172b3a]'} ${mobileMenuOpen ? '-translate-y-[6px] -rotate-45' : ''}`} />
        </button>
>>>>>>> cdbb571e0248b80b2ab31c48bc5c677d91c6e4a9
      </div>

      {mobileMenuOpen && (
        <nav className={`nav-mobile-drawer border-t px-5 py-5 lg:hidden ${isHome ? 'border-white/15 bg-[#102d43]' : 'border-[#dce5e1] bg-[#f8faf8]'}`}>
          <div className="mx-auto flex max-w-7xl flex-col">
            <p className={`mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] ${isHome ? 'text-white/55' : 'text-[#758b89]'}`}>Menu</p>
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className={`flex items-center justify-between border-t py-3.5 text-base font-semibold ${isHome ? 'border-white/15 text-white' : 'border-[#dce5e1] text-[#172b3a]'}`}>Beranda <ArrowUpRight className="h-4 w-4" /></Link>
            {NAV_LINKS.map((link) => <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className={`flex items-center justify-between border-t py-3.5 text-base font-semibold ${isHome ? 'border-white/15 text-white' : 'border-[#dce5e1] text-[#172b3a]'}`}>{link.label}<ArrowUpRight className="h-4 w-4" /></Link>)}
            <Link href="/ppdb" onClick={() => setMobileMenuOpen(false)} className={`mt-5 flex items-center justify-center gap-2 py-3.5 text-sm font-bold ${isHome ? 'bg-[#f5b51b] text-[#102d43]' : 'bg-[#172b3a] text-white'}`}>Informasi PPDB <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
<<<<<<< HEAD

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
=======
        </nav>
>>>>>>> cdbb571e0248b80b2ab31c48bc5c677d91c6e4a9
      )}
    </header>
  );
}
