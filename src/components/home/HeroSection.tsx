'use client';

import Link from 'next/link';
import type { FormEvent } from 'react';
import { ArrowUpRight, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function HeroSection() {
  const router = useRouter();
  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = new FormData(event.currentTarget).get('query')?.toString().trim();
    router.push(query ? `/jurusan?search=${encodeURIComponent(query)}` : '/jurusan');
  }

  return (
    <section className="bg-[#eef2f0] text-[#172b3a]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-14 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16 lg:pb-24 lg:pt-20">
        <div className="max-w-xl">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.22em] text-[#57717b]">SMK Negeri 1 Subang</p>
          <h1 className="font-serif text-5xl leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">Tumbuh dengan <span className="italic text-[#3f6f75]">arah</span> dan keahlian.</h1>
          <p className="mt-7 max-w-md text-base leading-7 text-[#53646b] sm:text-lg">Pendidikan vokasi yang menyiapkan lulusan berkarakter, kompeten, dan siap melangkah ke dunia kerja maupun perguruan tinggi.</p>
          <div className="mt-9 flex flex-wrap items-center gap-5">
            <Link href="/profil" className="inline-flex items-center gap-2 bg-[#172b3a] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2e5661]">Kenali sekolah kami <ArrowUpRight className="h-4 w-4" /></Link>
            <Link href="/ppdb" className="text-sm font-semibold text-[#172b3a] underline decoration-[#e7ae32] decoration-2 underline-offset-8 hover:text-[#3f6f75]">Informasi PPDB</Link>
          </div>
        </div>
        <div className="relative min-h-[390px] overflow-hidden bg-[#d6e1dc] sm:min-h-[500px]">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=85')" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#172b3a]/55 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white"><p className="max-w-[220px] text-sm leading-5">Ruang belajar untuk menemukan potensi dan masa depan.</p><span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/70"><ArrowUpRight className="h-5 w-5" /></span></div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-5 pb-10 sm:px-8">
        <form onSubmit={handleSearch} className="flex max-w-3xl items-center border-b border-[#9aaba8] py-3"><label htmlFor="school-search" className="sr-only">Cari informasi sekolah</label><Search className="mr-3 h-5 w-5 text-[#57717b]" /><input id="school-search" name="query" type="search" placeholder="Cari jurusan, berita, fasilitas..." className="min-w-0 flex-1 bg-transparent text-sm text-[#172b3a] outline-none placeholder:text-[#78908f]" /><button type="submit" className="text-sm font-semibold text-[#172b3a] hover:text-[#3f6f75]">Cari</button></form>
      </div>
    </section>
  );
}
