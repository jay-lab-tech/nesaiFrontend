'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { 
  Network, 
  Code2, 
  Palette, 
  Cpu, 
  TrendingUp, 
  Calculator, 
  ChevronRight, 
  CheckCircle2, 
  Briefcase,
  Lightbulb,
  GraduationCap,
  Sparkles,
  Bot,
  Award,
  ArrowLeft
} from 'lucide-react';
import { publicService, unwrapItem, type MajorWithRelations } from '@/lib/api/public-endpoints';
import { Skeleton } from '@/components/ui/skeleton';
import { openNesaiChat } from '@/lib/nesai-events';
import { getFallbackMajorBySlug, DEFAULT_MAJORS_CATALOG, type FallbackMajorDefinition } from '@/lib/data/default-majors';

const PRESENTATION: Record<string, { icon: React.ComponentType<{ className?: string }>; color: string }> = {
  tkj: { icon: Network, color: 'from-blue-600 to-cyan-600' },
  rpl: { icon: Code2, color: 'from-indigo-600 to-blue-600' },
  pplg: { icon: Code2, color: 'from-indigo-600 to-blue-600' },
  dkv: { icon: Palette, color: 'from-purple-600 to-pink-600' },
  toi: { icon: Cpu, color: 'from-teal-600 to-emerald-600' },
  bdp: { icon: TrendingUp, color: 'from-amber-600 to-orange-600' },
  pm: { icon: TrendingUp, color: 'from-amber-600 to-orange-600' },
  akl: { icon: Calculator, color: 'from-sky-600 to-blue-700' },
};

const FALLBACK = { icon: Network, color: 'from-slate-700 to-slate-900' };

export default function MajorDetailPage() {
  const params = useParams<{ slug: string }>();
  const [major, setMajor] = useState<MajorWithRelations | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params.slug) return;
    setLoading(true);

    const fallback = getFallbackMajorBySlug(params.slug);

    publicService.getMajorBySlug(params.slug)
      .then((r) => {
        const item = unwrapItem<MajorWithRelations>(r);
        if (item && item.name) {
          setMajor(item);
          setError(false);
        } else if (fallback) {
          setMajor(fallback);
          setError(false);
        } else {
          setError(true);
        }
      })
      .catch(() => {
        if (fallback) {
          setMajor(fallback);
          setError(false);
        } else {
          setError(true);
        }
      })
      .finally(() => setLoading(false));
  }, [params.slug]);

  if (error) {
    return (
      <div className="bg-slate-50 min-h-screen py-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 text-center">
          <div className="h-16 w-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-red-100">
            <Bot className="h-8 w-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Jurusan tidak ditemukan</h2>
          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            Program keahlian dengan identifier <code className="bg-slate-200 px-1.5 py-0.5 rounded text-slate-800 font-mono text-xs">{params.slug}</code> tidak tersedia atau sedang dalam pembaruan data kurikulum.
          </p>

          <div className="mt-8 p-5 bg-white border border-slate-200 rounded-2xl shadow-xs text-left">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-3">
              Pilihan Jurusan yang Tersedia:
            </span>
            <div className="flex flex-wrap gap-2">
              {DEFAULT_MAJORS_CATALOG.map((m) => (
                <Link
                  key={m.slug}
                  href={`/jurusan/${m.slug}`}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-cyan-50 hover:border-cyan-300 hover:text-cyan-800 text-xs font-semibold text-slate-700 transition"
                >
                  {m.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-3">
            <Link
              href="/jurusan"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-700 transition"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Semua Jurusan SMKN 1 Subang</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading || !major) {
    return (
      <div className="bg-slate-50 min-h-screen py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
          <Skeleton className="h-64 w-full rounded-3xl" />
          <Skeleton className="h-40 w-full rounded-2xl" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-48 w-full rounded-2xl" />
            <Skeleton className="h-48 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  const slugKey = (major.slug || params.slug || '').toLowerCase();
  const pres = PRESENTATION[slugKey] ?? FALLBACK;
  const Icon = pres.icon;
  const skills = major.subjects?.map((s) => s.name) ?? [];
  const careers = major.careers?.map((c) => c.name) ?? [];
  const innovations = major.innovations ?? [];
  const alumni = major.alumni ?? [];
  const certifications = (major as FallbackMajorDefinition).certifications ?? [];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Header */}
      <section className="relative bg-slate-950 text-white py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-6">
            <Link href="/" className="hover:text-cyan-300">Beranda</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/jurusan" className="hover:text-cyan-300">Program Keahlian</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-cyan-300">{major.name}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${pres.color} text-white shadow-md p-2 overflow-hidden`}>
                {major.logo_url || major.logo ? (
                  <img
                    src={major.logo_url || major.logo!}
                    alt={major.name}
                    className="h-full w-full object-contain filter drop-shadow"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <Icon className="h-8 w-8 text-cyan-100" />
                )}
              </div>
              <div>
                <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">
                  Konsentrasi Keahlian
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold mt-1">{major.name}</h1>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                openNesaiChat({
                  prompt: `Bisa jelaskan lebih banyak tentang kurikulum, mata pelajaran, dan prospek karir di jurusan ${major.name}?`,
                  context: {
                    page: 'major_detail',
                    path: `/jurusan/${major.slug}`,
                    major: major.slug,
                    majorName: major.name,
                    topic: 'jurusan',
                  },
                  autoSend: true,
                })
              }
              className="inline-flex items-center gap-2 self-start rounded-xl border border-cyan-400/50 bg-cyan-950/80 px-4 py-2.5 text-xs font-bold text-cyan-300 hover:bg-cyan-900 transition-all shadow-md"
            >
              <Bot className="h-4 w-4 text-cyan-400" />
              <span>Tanya Seputar Jurusan ke NESAI</span>
            </button>
          </div>

          {major.summary && (
            <p className="text-slate-300 max-w-3xl mt-6 leading-relaxed text-sm sm:text-base">
              {major.summary}
            </p>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          {major.description && (
            <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8">
              <h2 className="text-lg font-bold text-slate-900 mb-3">Tentang Program Keahlian</h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                {major.description}
              </p>
            </div>
          )}

          {/* Grid: Skills, Careers, & Certifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.length > 0 && (
              <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 text-base font-bold text-slate-900 mb-4">
                  <CheckCircle2 className="h-5 w-5 text-blue-600" />
                  <span>Keahlian & Materi Utama</span>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
                  {skills.map((skill) => (
                    <li key={skill} className="flex items-start gap-2 border-b border-slate-100 pb-2.5 last:border-0 last:pb-0">
                      <span className="text-blue-500 font-bold">•</span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {careers.length > 0 && (
              <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 text-base font-bold text-slate-900 mb-4">
                  <Briefcase className="h-5 w-5 text-emerald-600" />
                  <span>Peluang Karir Lulusan</span>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
                  {careers.map((career) => (
                    <li key={career} className="flex items-start gap-2 border-b border-slate-100 pb-2.5 last:border-0 last:pb-0">
                      <span className="text-emerald-500 font-bold">•</span>
                      <span>{career}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {certifications.length > 0 && (
              <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm md:col-span-2 lg:col-span-1">
                <div className="flex items-center gap-2 text-base font-bold text-slate-900 mb-4">
                  <Award className="h-5 w-5 text-amber-500" />
                  <span>Sertifikasi & Uji Kompetensi</span>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
                  {certifications.map((cert) => (
                    <li key={cert} className="flex items-start gap-2 border-b border-slate-100 pb-2.5 last:border-0 last:pb-0">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Karya Inovasi Jurusan jika ada */}
          {innovations.length > 0 && (
            <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8">
              <div className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-4">
                <Lightbulb className="h-5 w-5 text-amber-500" />
                <span>Karya Inovasi Siswa {major.name}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {innovations.map((inv) => (
                  <div key={inv.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="text-sm font-bold text-slate-900">{inv.name}</h3>
                      {inv.has_haki && (
                        <span className="rounded bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                          HAKI
                        </span>
                      )}
                    </div>
                    {inv.description && (
                      <p className="text-xs text-slate-600 line-clamp-3">{inv.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Alumni Berprestasi jika ada */}
          {alumni.length > 0 && (
            <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8">
              <div className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-4">
                <GraduationCap className="h-5 w-5 text-indigo-600" />
                <span>Kiprah Alumni {major.name}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {alumni.map((alm) => (
                  <div key={alm.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm font-bold text-slate-900">{alm.name}</p>
                    {alm.headline && (
                      <p className="text-xs font-semibold text-blue-600 mt-0.5">{alm.headline}</p>
                    )}
                    {alm.story && (
                      <p className="text-xs text-slate-600 mt-2 line-clamp-3 italic">
                        "{alm.story}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
