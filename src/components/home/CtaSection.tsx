'use client';

import Link from 'next/link';
import { ArrowRight, Bot, Sparkles, CheckCircle2 } from 'lucide-react';
import { openNesaiChat } from '@/lib/nesai-events';

export function CtaSection() {
  return (
    <section id="ppdb" className="py-20 bg-white relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-blue-950 to-teal-900 p-8 sm:p-12 lg:p-16 text-white shadow-2xl">
          {/* Background Decorative Circles */}
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-orange-500/15 blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 px-4 py-1 text-xs font-semibold text-cyan-200 mb-6 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
              PPDB TAHUN AJARAN 2026 / 2027
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-6 leading-tight">
              Bergabunglah dengan <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-amber-300">
                SMK NEGERI 1 SUBANG
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto">
              Wujudkan impian karirmu bersama sekolah kejuruan pusat keunggulan dengan fasilitas
              berstandar industri, sertifikasi internasional, dan jaminan koneksi langsung ke dunia kerja.
            </p>

            {/* Benefit Checkmarks */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-slate-200 mb-10">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                Tanpa Biaya Pendaftaran
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                Jalur Prestasi & Afirmasi
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                Beasiswa Industri
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/ppdb"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-orange-500/30 hover:from-orange-600 hover:to-amber-700 hover:scale-105 active:scale-95 transition-all"
              >
                <span>Daftar PPDB Sekarang</span>
                <ArrowRight className="h-5 w-5" />
              </Link>

              <button
                type="button"
                onClick={() => openNesaiChat('Saya ingin mengetahui syarat, alur pendaftaran, dan jadwal PPDB SMKN 1 Subang 2026.')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-md hover:bg-white/20 hover:border-white/50 active:scale-95 transition-all"
              >
                <Bot className="h-5 w-5 text-cyan-300" />
                <span>Konsultasi Syarat ke NESAI</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
