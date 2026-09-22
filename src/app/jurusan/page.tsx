'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Network, Code2, Palette, Cpu, TrendingUp, Calculator, ChevronRight, Bot, Sparkles, ArrowRight } from 'lucide-react';
import { openNesaiChat } from '@/lib/nesai-events';
import { NesaiPromoBar } from '@/components/home/NesaiPromoBar';
import { Skeleton } from '@/components/ui/skeleton';
import { publicApiGet } from '@/lib/api/cms-client';
import type { ApiPaginatedResponse, Major } from '@/types/cms';

const PRESENTATION: Record<string, { icon: React.ComponentType<{ className?: string }>; color: string; promptQuestion: string }> = {
  tkj: { icon: Network, color: 'from-blue-600 to-cyan-600', promptQuestion: 'Jelaskan prospek kerja dan mata pelajaran di jurusan Teknik Komputer & Jaringan (TKJ) SMKN 1 Subang.' },
  rpl: { icon: Code2, color: 'from-indigo-600 to-blue-600', promptQuestion: 'Apa saja materi coding dan prospek karir jurusan Rekayasa Perangkat Lunak (RPL)?' },
  dkv: { icon: Palette, color: 'from-purple-600 to-pink-600', promptQuestion: 'Bagaimana kurikulum dan karya siswa di jurusan Desain Komunikasi Visual (DKV)?' },
  toi: { icon: Cpu, color: 'from-teal-600 to-emerald-600', promptQuestion: 'Jelaskan fasilitas bengkel dan peluang kerja jurusan Teknik Otomasi Industri (TOI).' },
  bdp: { icon: TrendingUp, color: 'from-amber-600 to-orange-600', promptQuestion: 'Apa saja prospek karir di jurusan Bisnis Digital & Pemasaran?' },
  akl: { icon: Calculator, color: 'from-sky-600 to-blue-700', promptQuestion: 'Bisa jelaskan kompetensi di jurusan Akuntansi & Keuangan Lembaga?' },
};

const FALLBACK = { icon: Network, color: 'from-slate-700 to-slate-900', promptQuestion: 'Jelaskan tentang jurusan ini di SMKN 1 Subang.' };

export default function JurusanPage() {
  const [majors, setMajors] = useState<Major[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    publicApiGet<ApiPaginatedResponse<Major>>('/majors')
      .then((r) => setMajors(r.data.data))
      .catch(() => setError(true));
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="relative bg-slate-950 text-white py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20 filter brightness-50" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2000&q=80')` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-4"><Link href="/" className="hover:text-cyan-300 transition-colors">Beranda</Link><ChevronRight className="h-3 w-3" /><span className="text-cyan-300">Program Keahlian</span></nav>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 px-3.5 py-1 text-xs font-semibold text-cyan-300 mb-4"><Sparkles className="h-3.5 w-3.5 text-cyan-400" />{majors ? `${majors.length} Konsentrasi Keahlian Unggulan` : 'Program Keahlian'}</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">Pilihan Program Keahlian Masa Depan</h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">Kurikulum berbasis industri yang dirancang dengan skema *Link & Match*, diperkuat sertifikasi kompetensi nasional BNSP dan mitra industri multinasional.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          {error ? <p className="text-slate-600">Jurusan tidak dapat dimuat.</p> : !majors ? <><Skeleton className="h-48 w-full rounded-3xl" /><Skeleton className="h-48 w-full rounded-3xl" /></> : majors.length === 0 ? <p className="text-slate-600">Belum ada jurusan.</p> : majors.map((major) => {
            const pres = PRESENTATION[major.slug] ?? FALLBACK;
            const Icon = pres.icon;
            return (
              <div key={major.id} id={major.slug} className="rounded-3xl border border-slate-200 bg-white p-8 lg:p-10 shadow-sm hover:shadow-xl transition-all">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-6 border-b border-slate-100 pb-6">
                  <div className="flex items-start gap-4">
                    <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${pres.color} text-white shadow-md`}><Icon className="h-8 w-8 text-cyan-100" /></div>
                    <div><h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{major.name}</h2></div>
                  </div>
                  <div className="flex gap-2 self-start">
                    <Link href={`/jurusan/${major.slug}`} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all">Lihat Detail<ArrowRight className="h-4 w-4" /></Link>
                    <button type="button" onClick={() => openNesaiChat(pres.promptQuestion)} className="inline-flex items-center gap-2 rounded-xl border border-cyan-300 bg-cyan-50/80 px-4 py-2.5 text-xs font-bold text-cyan-800 hover:bg-cyan-100 transition-all"><Bot className="h-4 w-4 text-cyan-600" /><span>Tanya NESAI</span></button>
                  </div>
                </div>
                {major.summary && <p className="text-slate-600 text-base leading-relaxed">{major.summary}</p>}
                {major.description && <p className="text-slate-500 text-sm leading-relaxed mt-3">{major.description}</p>}
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-12 bg-white border-t border-slate-200">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="rounded-3xl border-2 border-cyan-200 bg-gradient-to-r from-blue-900 to-slate-950 p-8 sm:p-12 text-white shadow-xl">
            <Bot className="h-12 w-12 text-cyan-300 mx-auto mb-4" />
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-3">Masih Bingung Memilih Jurusan yang Tepat?</h3>
            <p className="text-slate-300 max-w-xl mx-auto mb-8 text-sm sm:text-base">Ceritakan hobi, minat, dan impian karirmu kepada asisten virtual NESAI. Kami akan merekomendasikan jurusan paling cocok untuk masa depanmu!</p>
            <button type="button" onClick={() => openNesaiChat('Saya ingin tes minat dan bakat. Bisakah NESAI merekomendasikan jurusan yang paling cocok dengan hobi dan keahlian saya?')} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg hover:from-cyan-600 hover:to-blue-700 transition-all active:scale-95"><Sparkles className="h-4 w-4" /><span>Analisis Jurusan dengan NESAI</span><ArrowRight className="h-4 w-4" /></button>
          </div>
        </div>
      </section>
      <NesaiPromoBar />
    </div>
  );
}
