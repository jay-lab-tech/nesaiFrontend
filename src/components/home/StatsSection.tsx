import { Users, GraduationCap, Building, Briefcase } from 'lucide-react';

const STATS = [
  {
    id: 'students',
    value: '2.500+',
    label: 'Siswa Aktif',
    subtext: 'Tersebar di 6 Program Keahlian',
    icon: Users,
  },
  {
    id: 'teachers',
    value: '150+',
    label: 'Tenaga Pendidik',
    subtext: 'Guru Tersertifikasi & Praktisi DUDI',
    icon: GraduationCap,
  },
  {
    id: 'alumni',
    value: '15.000+',
    label: 'Alumni Sukses',
    subtext: 'Bekerja, Kuliah, & Berwirausaha',
    icon: Briefcase,
  },
  {
    id: 'partners',
    value: '50+',
    label: 'Mitra Industri',
    subtext: 'Perusahaan Nasional & Multinasional',
    icon: Building,
  },
];

export function StatsSection() {
  return (
    <section className="bg-slate-900 text-white py-16 relative overflow-hidden border-y border-slate-800">
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:32px_32px] opacity-10" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-blue-600/10 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.id} className="text-center group">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-950/80 border border-blue-800/60 text-cyan-400 group-hover:scale-110 group-hover:border-cyan-400 transition-all shadow-inner">
                  <Icon className="h-6 w-6" />
                </div>
                <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-white tracking-tight">
                  {stat.value}
                </p>
                <p className="mt-2 text-base font-bold text-slate-100">
                  {stat.label}
                </p>
                <p className="mt-0.5 text-xs text-slate-400">
                  {stat.subtext}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
