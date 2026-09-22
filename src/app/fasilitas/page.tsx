'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Building2, Monitor, Server, Video, Wrench, BookOpen, Users, Dumbbell, ChevronRight, ShieldCheck } from 'lucide-react';
import { NesaiPromoBar } from '@/components/home/NesaiPromoBar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { publicApiGet } from '@/lib/api/cms-client';
import type { ApiPaginatedResponse, ApiResponse, Facility } from '@/types/cms';

const ICON_BY_CATEGORY: Record<string, React.ComponentType<{ className?: string }>> = {
  'Laboratorium & Bengkel': Monitor,
  'Laboratorium IT': Monitor,
  'Infrastruktur Jaringan': Server,
  'Kreatif & Broadcast': Video,
  'Manufaktur & Rekayasa': Wrench,
  'Pusat Literasi': BookOpen,
  'Gedung Akbar': Building2,
  'Kebugaran Siswa': Dumbbell,
  'Ibadah & Karakter': Users,
  'Sarana Ibadah': Users,
  'Fasilitas Olahraga': Dumbbell,
  'Fasilitas Umum': Building2,
};

function facilityIcon(category: string | null) {
  return (category && ICON_BY_CATEGORY[category]) || Building2;
}

export default function FasilitasPage() {
  const [facilities, setFacilities] = useState<Facility[] | null>(null);
  const [category, setCategory] = useState<string>('Semua');
  const [error, setError] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const first = await publicApiGet<ApiPaginatedResponse<Facility>>('/facilities', { per_page: 100 });
        let all = first.data.data;
        const lastPage = first.data.last_page;
        if (lastPage > 1) {
          const rest = await Promise.all(
            Array.from({ length: lastPage - 1 }, (_, i) =>
              publicApiGet<ApiPaginatedResponse<Facility>>('/facilities', { page: i + 2, per_page: 100 })
            )
          );
          for (const r of rest) all = all.concat(r.data.data);
        }
        if (all.length === 0) {
          const fallback = await publicApiGet<ApiResponse<Facility[]>>('/facilities').catch(() => null);
          if (fallback && Array.isArray(fallback.data)) all = fallback.data;
        }
        setFacilities(all);
      } catch {
        setError(true);
      }
    };
    load();
  }, []);

  const categories = useMemo(() => {
    if (!facilities) return ['Semua'];
    const cats = [...new Set(facilities.map((f) => f.category).filter(Boolean) as string[])];
    return ['Semua', ...cats];
  }, [facilities]);

  const filtered = useMemo(() => {
    if (!facilities) return null;
    if (category === 'Semua') return facilities;
    return facilities.filter((f) => f.category === category);
  }, [facilities, category]);

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="relative bg-slate-950 text-white py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-25 filter brightness-50" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=2000&q=80')` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-4"><Link href="/" className="hover:text-cyan-300 transition-colors">Beranda</Link><ChevronRight className="h-3 w-3" /><span className="text-cyan-300">Fasilitas Belajar</span></nav>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/20 border border-cyan-400/30 px-3.5 py-1 text-xs font-semibold text-cyan-300 mb-4"><ShieldCheck className="h-3.5 w-3.5 text-cyan-400" />Sarana Berstandar Industri</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">Fasilitas Belajar &amp; Sarana Prasarana</h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">Mendukung pembelajaran praktikum kejuruan dengan teknologi modern yang setara dengan lingkungan kerja industri sesungguhnya.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {facilities && categories.length > 1 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((c) => (
                <button key={c} type="button" onClick={() => setCategory(c)} className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${category === c ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}>{c}</button>
              ))}
            </div>
          )}
          {error ? <p className="text-slate-600">Fasilitas tidak dapat dimuat.</p> : !filtered ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"><Skeleton className="h-64 rounded-3xl" /><Skeleton className="h-64 rounded-3xl" /><Skeleton className="h-64 rounded-3xl" /></div> : filtered.length === 0 ? <p className="text-slate-600">Belum ada fasilitas.</p> : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((facility) => {
                const Icon = facilityIcon(facility.category);
                return (
                  <div key={facility.id} className="flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-all group">
                    <div className="relative h-12 w-full bg-slate-50 border-b border-slate-100 flex items-center px-6 gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white"><Icon className="h-3.5 w-3.5 text-cyan-400" />{facility.category ?? 'Fasilitas'}</span>
                      {facility.is_placeholder && <Badge variant="subtle">Data belum diverifikasi</Badge>}
                    </div>
                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">{facility.name}</h3>
                      {facility.description != null && facility.description !== '' && <p className="text-sm text-slate-600 leading-relaxed">{facility.description}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
      <NesaiPromoBar />
    </div>
  );
}
