'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Network, 
  Code2, 
  Palette, 
  Cpu, 
  TrendingUp, 
  Calculator, 
  ArrowRight, 
  Bot,
  Sparkles 
} from 'lucide-react';
import { openNesaiChat } from '@/lib/nesai-events';
import { publicService, unwrapList } from '@/lib/api/public-endpoints';
import type { Major } from '@/types/cms';

interface MajorItem {
  id: string;
  slug: string;
  code: string;
  name: string;
  logo?: string | null;
  icon?: React.ComponentType<{ className?: string }>;
  description: string;
  colorClass: string;
  iconBg: string;
  promptQuestion: string;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  tkj: Network,
  rpl: Code2,
  pplg: Code2,
  dkv: Palette,
  toi: Cpu,
  bdp: TrendingUp,
  akl: Calculator,
};

const MAJORS: MajorItem[] = [
  {
    id: 'tkj',
    slug: 'tkj',
    code: 'TKJ',
    name: 'Teknik Komputer & Jaringan',
    icon: Network,
    description: 'Infrastruktur jaringan, routing & switching, cloud computing, cybersecurity, dan administrasi server berstandar Cisco & MikroTik.',
    colorClass: 'from-blue-600 to-cyan-600',
    iconBg: 'bg-blue-50 text-blue-600 border-blue-200',
    promptQuestion: 'Bagaimana kurikulum dan prospek kerja jurusan Teknik Komputer & Jaringan (TKJ)?',
  },
  {
    id: 'pplg',
    slug: 'pplg',
    code: 'PPLG',
    name: 'Pengembangan Perangkat Lunak & Gim',
    icon: Code2,
    description: 'Pemrograman web modern, aplikasi mobile Android/iOS, basis data enterprise, cloud deployment, dan artificial intelligence engineering.',
    colorClass: 'from-indigo-600 to-blue-600',
    iconBg: 'bg-indigo-50 text-indigo-600 border-indigo-200',
    promptQuestion: 'Apa saja yang dipelajari dan peluang karir di jurusan Pengembangan Perangkat Lunak dan Gim (PPLG)?',
  },
  {
    id: 'dkv',
    slug: 'dkv',
    code: 'DKV',
    name: 'Multimedia & Desain Komunikasi Visual',
    icon: Palette,
    description: 'Animasi 2D/3D, sinematografi, desain grafis komersial, UI/UX design, fotografi profesional, serta digital content production.',
    colorClass: 'from-purple-600 to-pink-600',
    iconBg: 'bg-purple-50 text-purple-600 border-purple-200',
    promptQuestion: 'Bisa jelaskan fasilitas dan fokus keahlian di jurusan DKV / Multimedia?',
  },
  {
    id: 'toi',
    slug: 'toi',
    code: 'TOI',
    name: 'Teknik Otomasi Industri',
    icon: Cpu,
    description: 'Pemrograman PLC, mekatronika, sensor cerdas, lengan robot manufaktur, pneumatik, dan sistem otomasi pabrik pintar era 4.0.',
    colorClass: 'from-teal-600 to-emerald-600',
    iconBg: 'bg-teal-50 text-teal-600 border-teal-200',
    promptQuestion: 'Bagaimana prospek kerja dan materi praktik di jurusan Teknik Otomasi Industri?',
  },
  {
    id: 'bdp',
    slug: 'bdp',
    code: 'BDP',
    name: 'Bisnis Digital & Pemasaran',
    icon: TrendingUp,
    description: 'Digital marketing, e-commerce management, content strategy, live selling, SEO/SEM, analitik bisnis, dan kewirausahaan modern.',
    colorClass: 'from-amber-600 to-orange-600',
    iconBg: 'bg-amber-50 text-amber-600 border-amber-200',
    promptQuestion: 'Apa keunggulan dan peluang bisnis di jurusan Bisnis Digital & Pemasaran?',
  },
  {
    id: 'akl',
    slug: 'akl',
    code: 'AKL',
    name: 'Akuntansi & Keuangan Lembaga',
    icon: Calculator,
    description: 'Komputerisasi akuntansi (MYOB/Accurate), audit keuangan, perpajakan digital, perbankan, dan administrasi keuangan instansi terstandar.',
    colorClass: 'from-sky-600 to-blue-700',
    iconBg: 'bg-sky-50 text-sky-600 border-sky-200',
    promptQuestion: 'Bisa berikan rincian sertifikasi dan keahlian di Akuntansi & Keuangan Lembaga?',
  },
];

export function MajorsSection() {
  const [majorsList, setMajorsList] = useState<MajorItem[]>(MAJORS);

  useEffect(() => {
    publicService.getMajors()
      .then((res) => {
        const apiMajors = unwrapList<Major>(res);
        if (apiMajors.length > 0) {
          const mapped: MajorItem[] = apiMajors.map((m) => {
            const slugKey = m.slug.toLowerCase();
            const fallbackItem = MAJORS.find(
              (d) => d.slug === slugKey || d.id === slugKey || m.name.toLowerCase().includes(d.id)
            );
            return {
              id: m.slug,
              slug: m.slug,
              code: fallbackItem?.code || m.name.substring(0, 4).toUpperCase(),
              name: m.name,
              logo: m.logo_url || m.logo || null,
              icon: fallbackItem?.icon || ICON_MAP[slugKey] || Network,
              description: m.summary || m.description || fallbackItem?.description || '',
              colorClass: fallbackItem?.colorClass || 'from-blue-600 to-cyan-600',
              iconBg: fallbackItem?.iconBg || 'bg-blue-50 text-blue-600 border-blue-200',
              promptQuestion: fallbackItem?.promptQuestion || `Bagaimana kurikulum dan prospek kerja jurusan ${m.name} di SMKN 1 Subang?`,
            };
          });
          setMajorsList(mapped);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="jurusan" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 border border-blue-200 px-3.5 py-1 text-xs font-bold text-blue-700 uppercase tracking-wider mb-3">
            Program Keahlian
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight mb-4">
            Pilihan Jurusan Masa Depan
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Kurikulum berbasis industri dengan sertifikasi keahlian berstandar nasional dan internasional
            untuk memastikan setiap lulusan siap kerja, kuliah, maupun berwirausaha.
          </p>
        </div>

        {/* Majors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {majorsList.map((major) => {
            const Icon = major.icon;
            return (
              <div
                key={major.id}
                className="group relative flex flex-col justify-between rounded-2xl bg-white p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-300/80 transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  {/* Top bar with Icon/Logo & Code */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`flex h-13 w-13 items-center justify-center rounded-xl border p-2 ${major.iconBg} shadow-sm group-hover:scale-110 transition-transform overflow-hidden`}>
                      {major.logo ? (
                        <img
                          src={major.logo}
                          alt={major.name}
                          className="h-full w-full object-contain filter drop-shadow-xs"
                          onError={(e) => {
                            (e.currentTarget as HTMLElement).style.display = 'none';
                          }}
                        />
                      ) : Icon ? (
                        <Icon className="h-7 w-7" />
                      ) : (
                        <span className="text-xs font-black uppercase">{major.code}</span>
                      )}
                    </div>
                    <span className="text-xs font-black tracking-widest text-slate-400 group-hover:text-blue-600 transition-colors uppercase">
                      {major.code}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2.5">
                    <Link href={`/jurusan/${major.slug}`} className="hover:underline">
                      {major.name}
                    </Link>
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {major.description}
                  </p>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      openNesaiChat({
                        prompt: major.promptQuestion,
                        context: {
                          page: 'homepage_majors',
                          path: `/jurusan/${major.slug}`,
                          major: major.slug,
                          majorName: major.name,
                          topic: 'jurusan',
                        },
                        autoSend: true,
                      })
                    }
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-700 hover:text-cyan-900 hover:underline cursor-pointer"
                  >
                    <Bot className="h-3.5 w-3.5 text-cyan-600" />
                    <span>Tanya NESAI</span>
                  </button>

                  <Link
                    href={`/jurusan/${major.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Lihat Jurusan</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Helper Note */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200/90 px-5 py-2 text-xs sm:text-sm text-slate-600 shadow-sm">
            <Sparkles className="h-4 w-4 text-cyan-600" />
            <span>Bingung memilih jurusan yang tepat untuk minatmu?</span>
            <button
              type="button"
              onClick={() =>
                openNesaiChat({
                  prompt:
                    'Saya bingung memilih jurusan. Bisakah NESAI membantu menganalisis minat dan bakat saya untuk menentukan jurusan terbaik di SMKN 1 Subang?',
                  context: {
                    page: 'homepage',
                    path: '/',
                    topic: 'jurusan',
                  },
                  autoSend: true,
                })
              }
              className="font-bold text-blue-600 hover:text-blue-800 underline ml-1 cursor-pointer"
            >
              Konsultasikan ke NESAI sekarang
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
