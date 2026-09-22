'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Network, Code2, Palette, Cpu, TrendingUp, Calculator, ChevronRight, CheckCircle2, Briefcase } from 'lucide-react';
import { publicApiGet } from '@/lib/api/cms-client';
import type { ApiResponse, Career, Major, MajorSubject } from '@/types/cms';
import { Skeleton } from '@/components/ui/skeleton';

type MajorDetailApi = Major & { subjects?: MajorSubject[]; careers?: Career[] };

const PRESENTATION: Record<string, { icon: React.ComponentType<{ className?: string }>; color: string }> = {
  tkj: { icon: Network, color: 'from-blue-600 to-cyan-600' },
  rpl: { icon: Code2, color: 'from-indigo-600 to-blue-600' },
  dkv: { icon: Palette, color: 'from-purple-600 to-pink-600' },
  toi: { icon: Cpu, color: 'from-teal-600 to-emerald-600' },
  bdp: { icon: TrendingUp, color: 'from-amber-600 to-orange-600' },
  akl: { icon: Calculator, color: 'from-sky-600 to-blue-700' },
};

const FALLBACK = { icon: Network, color: 'from-slate-700 to-slate-900' };

export default function MajorDetailPage() {
  const params = useParams<{ slug: string }>();
  const [major, setMajor] = useState<MajorDetailApi | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!params.slug) return;
    publicApiGet<ApiResponse<MajorDetailApi>>(`/majors/${params.slug}`)
      .then((r) => setMajor(r.data))
      .catch(() => setError(true));
  }, [params.slug]);

  if (error) return <div className="bg-slate-50 min-h-screen py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-slate-600">Jurusan tidak ditemukan.</div></div>;
  if (!major) return <div className="bg-slate-50 min-h-screen py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><Skeleton className="h-64 w-full rounded-3xl" /></div></div>;

  const pres = PRESENTATION[major.slug] ?? FALLBACK;
  const Icon = pres.icon;
  const skills = major.subjects?.map((s) => s.name) ?? [];
  const careers = major.careers?.map((c) => c.name) ?? [];

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="relative bg-slate-950 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-4"><Link href="/" className="hover:text-cyan-300">Beranda</Link><ChevronRight className="h-3 w-3" /><Link href="/jurusan" className="hover:text-cyan-300">Program Keahlian</Link><ChevronRight className="h-3 w-3" /><span className="text-cyan-300">{major.name}</span></nav>
          <div className="flex items-start gap-4">
            <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${pres.color} text-white shadow-md`}><Icon className="h-8 w-8 text-cyan-100" /></div>
            <h1 className="text-3xl sm:text-4xl font-extrabold">{major.name}</h1>
          </div>
          {major.summary && <p className="text-slate-300 max-w-3xl mt-4 leading-relaxed">{major.summary}</p>}
        </div>
      </section>
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          {major.description && <p className="text-slate-600 leading-relaxed">{major.description}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.length > 0 && <div className="rounded-2xl bg-white border border-slate-200 p-6"><div className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-3"><CheckCircle2 className="h-4 w-4 text-blue-600" /><span>Keahlian yang Dipelajari</span></div><ul className="space-y-2 text-xs text-slate-600">{skills.map((skill) => <li key={skill} className="flex items-start gap-1.5"><span className="text-blue-500 font-bold">•</span><span>{skill}</span></li>)}</ul></div>}
            {careers.length > 0 && <div className="rounded-2xl bg-white border border-slate-200 p-6"><div className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-3"><Briefcase className="h-4 w-4 text-emerald-600" /><span>Peluang Karir Lulusan</span></div><ul className="space-y-2 text-xs text-slate-600">{careers.map((career) => <li key={career} className="flex items-start gap-1.5"><span className="text-emerald-500 font-bold">•</span><span>{career}</span></li>)}</ul></div>}
          </div>
        </div>
      </section>
    </div>
  );
}
