'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Profil', href: '/profil' }, { label: 'Jurusan', href: '/jurusan' },
  { label: 'Fasilitas', href: '/fasilitas' }, { label: 'Prestasi', href: '/prestasi' },
  { label: 'Berita', href: '/berita' }, { label: 'Kontak', href: '/kontak' },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b border-[#dce5e1] bg-[#f8faf8]/95 backdrop-blur">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3 text-[#172b3a]"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e7ae32] font-serif text-lg font-bold">N</span><span className="font-serif text-lg tracking-tight">SMKN 1 Subang</span></Link>
        <nav className="hidden items-center gap-7 lg:flex"><Link href="/" className={`text-sm ${pathname === '/' ? 'font-semibold text-[#172b3a]' : 'text-[#627277] hover:text-[#172b3a]'}`}>Beranda</Link>{NAV_LINKS.map((link) => <Link key={link.href} href={link.href} className={`text-sm ${pathname === link.href ? 'font-semibold text-[#172b3a]' : 'text-[#627277] hover:text-[#172b3a]'}`}>{link.label}</Link>)}</nav>
        <Link href="/ppdb" className="hidden items-center gap-2 border-b-2 border-[#e7ae32] pb-1 text-sm font-semibold text-[#172b3a] sm:flex">PPDB <ArrowUpRight className="h-4 w-4" /></Link>
        <button type="button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="rounded-full p-2 text-[#172b3a] hover:bg-[#e9f0ed] lg:hidden" aria-label="Buka menu navigasi">{mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
      </div>
      {mobileMenuOpen && <nav className="border-t border-[#dce5e1] bg-[#f8faf8] px-5 py-4 lg:hidden"><div className="flex flex-col gap-1"><Link href="/" onClick={() => setMobileMenuOpen(false)} className="px-3 py-3 text-sm text-[#172b3a]">Beranda</Link>{NAV_LINKS.map((link) => <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className="px-3 py-3 text-sm text-[#172b3a]">{link.label}</Link>)}<Link href="/ppdb" onClick={() => setMobileMenuOpen(false)} className="mt-2 border-t border-[#dce5e1] px-3 py-4 text-sm font-semibold text-[#172b3a]">PPDB 2026/2027</Link></div></nav>}
    </header>
  );
}
