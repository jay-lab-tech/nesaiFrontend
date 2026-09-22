'use client';
import Link from 'next/link';
import type { FormEvent } from 'react';
import { ArrowRight, Bot, ShieldCheck, Award, Sparkles, ChevronDown, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { openNesaiChat } from '@/lib/nesai-events';

export function HeroSection() {
  const router = useRouter();

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = new FormData(event.currentTarget).get('query')?.toString().trim();
    if (query) router.push(`/jurusan?search=${encodeURIComponent(query)}`);
    else router.push('/jurusan');
  }

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white pt-16 pb-24 md:pt-24 md:pb-32">
      {/* Background Graphic & Glows */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat filter brightness-50 contrast-125"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=2000&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/60" />
        <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
      </div>

      {/* Subtle Cyan and Orange Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-[700px] rounded-full bg-blue-600/20 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 h-64 w-64 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 px-3.5 py-1 text-xs font-semibold text-blue-300 backdrop-blur-md">
            <Award className="h-3.5 w-3.5 text-cyan-400" />
            SMK PUSAT KEUNGGULAN
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 px-3.5 py-1 text-xs font-semibold text-emerald-300 backdrop-blur-md">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            TERAKREDITASI A
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/20 border border-cyan-400/30 px-3.5 py-1 text-xs font-semibold text-cyan-200 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            NESAI AI INTEGRATED
          </span>
        </div>

        {/* Main Headings */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-4 drop-shadow-sm">
          SMKN 1 SUBANG
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-blue-300 mb-6 max-w-3xl mx-auto">
          Mencetak Generasi Unggul Siap Industri 4.0
        </p>

        {/* Subtext */}
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          Sekolah menengah kejuruan berstandar industri dengan kurikulum berbasis kompetensi,
          fasilitas modern, kemitraan perusahaan multinasional, serta didampingi asisten virtual{' '}
          <strong className="text-cyan-300 font-semibold">NESAI</strong> untuk memandu masa depanmu.
        </p>

        {/* School-style search bar inspired by the selected reference */}
        <form onSubmit={handleSearch} className="mx-auto mb-8 flex max-w-3xl flex-col gap-2 rounded-2xl bg-white p-2 shadow-2xl shadow-slate-950/40 sm:flex-row">
          <label htmlFor="school-search" className="sr-only">Cari informasi sekolah</label>
          <div className="flex min-h-12 flex-1 items-center gap-3 rounded-xl px-4 text-left text-slate-500">
            <Search className="h-5 w-5 shrink-0 text-blue-600" />
            <input
              id="school-search"
              name="query"
              type="search"
              placeholder="Cari jurusan, fasilitas, berita, atau informasi PPDB..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 sm:text-base"
            />
          </div>
          <button type="submit" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-amber-500 px-7 font-bold text-slate-950 transition hover:bg-amber-400">
            Cari
          </button>
        </form>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <Link
            href="/ppdb"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-orange-500/30 hover:from-orange-600 hover:to-amber-700 hover:shadow-orange-500/50 hover:scale-[1.02] active:scale-95 transition-all"
          >
            <span>Daftar PPDB 2026</span>
            <ArrowRight className="h-5 w-5" />
          </Link>

          <button
            type="button"
            onClick={() => openNesaiChat('Halo NESAI! Tolong jelaskan profil keunggulan dan jurusan di SMKN 1 Subang.')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-400/50 bg-slate-900/80 px-6 py-3.5 text-base font-semibold text-cyan-200 backdrop-blur-md hover:bg-cyan-950/60 hover:border-cyan-300 hover:text-white transition-all active:scale-95 shadow-md shadow-cyan-950/50"
          >
            <Bot className="h-5 w-5 text-cyan-400" />
            <span>Konsultasi NESAI</span>
          </button>
        </div>

        {/* Quick Features Row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-slate-800/80 pt-8 text-left">
          <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800">
            <p className="text-xs text-slate-400 font-medium">Kurikulum</p>
            <p className="text-sm font-semibold text-slate-200">Berbasis Industri & TEFA</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800">
            <p className="text-xs text-slate-400 font-medium">Sertifikasi</p>
            <p className="text-sm font-semibold text-slate-200">Kompetensi sesuai industri</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800">
            <p className="text-xs text-slate-400 font-medium">Penyaluran Kerja</p>
            <p className="text-sm font-semibold text-slate-200">Informasi karier & alumni</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800">
            <p className="text-xs text-slate-400 font-medium">Bimbingan Karir</p>
            <p className="text-sm font-semibold text-slate-200">Didukung AI NESAI 24/7</p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-8 flex justify-center">
          <Link
            href="/profil"
            aria-label="Menuju profil sekolah"
            className="text-slate-400 hover:text-cyan-300 transition-colors animate-bounce p-1"
          >
            <ChevronDown className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </section>
  );
}
