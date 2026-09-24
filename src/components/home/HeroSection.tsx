'use client';

import type { FormEvent } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function HeroSection() {
  const router = useRouter();

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = new FormData(event.currentTarget).get('query')?.toString().trim();
    router.replace(query ? `/search?q=${encodeURIComponent(query)}` : '/search');
  }

  return (
    <section className="relative flex min-h-[650px] items-center overflow-hidden bg-[#12334a] pb-10 pt-[82px] text-white sm:min-h-[720px] lg:min-h-[790px]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=2200&q=90')" }}
      />
      <div className="absolute inset-0 bg-[#071c2d]/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#071c2d]/65 via-[#071c2d]/35 to-[#071c2d]/75" />

      <div className="relative mx-auto w-full max-w-7xl px-5 text-center sm:px-8">
        <div className="home-rise mx-auto flex max-w-5xl flex-col items-center">
        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80 sm:text-xs">Pendidikan vokasi untuk masa depan</p>
        <h1 className="font-school-heading text-4xl font-extrabold leading-[0.94] tracking-[-0.06em] drop-shadow-sm sm:text-6xl lg:text-7xl">
          SMK NEGERI 1 SUBANG
        </h1>
        <p className="mt-4 text-sm leading-7 text-white/90 sm:text-base">Berkarakter, adaptif, kompeten, sinergis, dan inovatif.</p>

        <form onSubmit={handleSearch} className="mt-8 flex w-full max-w-xl flex-col gap-2 rounded-[1.6rem] border-4 border-white/75 bg-white p-2 shadow-2xl shadow-black/30 sm:mt-9 sm:flex-row sm:rounded-full sm:p-2">
          <label htmlFor="school-search" className="sr-only">Cari informasi sekolah</label>
          <div className="flex min-h-11 flex-1 items-center gap-3 px-4 text-[#57636b] sm:min-h-10">
            <Search className="h-4 w-4 shrink-0 text-[#8095a0]" />
            <input id="school-search" name="query" type="search" placeholder="Apa yang ingin Anda cari?" className="w-full bg-transparent text-sm outline-none placeholder:text-[#95a0a6]" />
          </div>
          <button type="submit" className="min-h-11 rounded-full bg-[#f5b51b] px-8 text-sm font-bold text-[#152c3e] transition hover:bg-[#ffc83d] sm:min-h-10">Cari</button>
        </form>
        </div>
      </div>
    </section>
  );
}
