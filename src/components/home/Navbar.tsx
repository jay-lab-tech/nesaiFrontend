'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, ArrowUpRight, Search } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Profil', href: '/profil' }, { label: 'Jurusan', href: '/jurusan' },
  { label: 'Fasilitas', href: '/fasilitas' }, { label: 'Prestasi', href: '/prestasi' },
  { label: 'Berita', href: '/berita' }, { label: 'Kontak', href: '/kontak' },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const router = useRouter();

  function submitSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;
    setSearchOpen(false);
    setSearchQuery('');
    router.push(`/search?q=${encodeURIComponent(query)}`);
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[#dce5e1] bg-[#f8faf8]/95 backdrop-blur">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3 text-[#172b3a]"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e7ae32] font-serif text-lg font-bold">N</span><span className="font-serif text-lg tracking-tight">SMKN 1 Subang</span></Link>
        <nav className="hidden items-center gap-7 lg:flex"><Link href="/" className={`text-sm ${pathname === '/' ? 'font-semibold text-[#172b3a]' : 'text-[#627277] hover:text-[#172b3a]'}`}>Beranda</Link>{NAV_LINKS.map((link) => <Link key={link.href} href={link.href} className={`text-sm ${pathname === link.href ? 'font-semibold text-[#172b3a]' : 'text-[#627277] hover:text-[#172b3a]'}`}>{link.label}</Link>)}</nav>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setSearchOpen(true)} className="rounded-full p-2 text-[#172b3a] hover:bg-[#e9f0ed]" aria-label="Cari di situs"><Search className="h-5 w-5" /></button>
          <Link href="/ppdb" className="hidden items-center gap-2 border-b-2 border-[#e7ae32] pb-1 text-sm font-semibold text-[#172b3a] sm:flex">PPDB <ArrowUpRight className="h-4 w-4" /></Link>
          <button type="button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="rounded-full p-2 text-[#172b3a] hover:bg-[#e9f0ed] lg:hidden" aria-label="Buka menu navigasi">{mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
      </div>
      {mobileMenuOpen && <nav className="border-t border-[#dce5e1] bg-[#f8faf8] px-5 py-4 lg:hidden"><div className="flex flex-col gap-1"><Link href="/" onClick={() => setMobileMenuOpen(false)} className="px-3 py-3 text-sm text-[#172b3a]">Beranda</Link>{NAV_LINKS.map((link) => <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className="px-3 py-3 text-sm text-[#172b3a]">{link.label}</Link>)}<Link href="/ppdb" onClick={() => setMobileMenuOpen(false)} className="mt-2 border-t border-[#dce5e1] px-3 py-4 text-sm font-semibold text-[#172b3a]">PPDB 2026/2027</Link></div></nav>}
      </header>
      {searchOpen && <div className="fixed inset-0 z-50 flex items-start justify-center bg-[#172b3a]/40 px-5 pt-[15vh] backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="search-title">
        <div className="w-full max-w-2xl border border-[#dce5e1] bg-[#f8faf8] p-5 shadow-2xl sm:p-7">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#657c7d]">Pencarian situs</p><h2 id="search-title" className="mt-2 font-serif text-3xl text-[#172b3a]">Temukan informasi NESAS</h2></div>
            <button type="button" onClick={() => setSearchOpen(false)} className="rounded-full p-2 text-[#627277] hover:bg-[#e9f0ed] hover:text-[#172b3a]" aria-label="Tutup pencarian"><X className="h-5 w-5" /></button>
          </div>
          <form onSubmit={submitSearch} className="flex gap-2">
            <label htmlFor="site-search" className="sr-only">Kata kunci pencarian</label>
            <input id="site-search" autoFocus value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Cari jurusan, berita, fasilitas..." className="min-w-0 flex-1 border border-[#b9c7c2] bg-white px-4 py-3 text-sm text-[#172b3a] outline-none placeholder:text-[#8a9a97] focus:border-[#172b3a]" />
            <button type="submit" className="inline-flex items-center gap-2 bg-[#172b3a] px-4 py-3 text-sm font-semibold text-white hover:bg-[#2e5661]" aria-label="Mulai pencarian"><Search className="h-4 w-4" /><span className="hidden sm:inline">Cari</span></button>
          </form>
          <p className="mt-3 text-xs text-[#657c7d]">Gunakan kata kunci lengkap untuk hasil paling sesuai, atau kata singkat untuk menemukan topik yang mirip.</p>
        </div>
      </div>}
    </>
  );
}
