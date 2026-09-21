import { Trophy, Award, Medal, Star } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  recipient: string;
  category: string;
  badge: string;
  level: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: '1',
    title: 'Medali Emas Lomba Kompetensi Siswa (LKS) Bidang Cyber Security',
    recipient: 'Ahmad Fauzi & Tim (Kelas XII RPL)',
    category: 'Teknologi Informasi',
    badge: 'Juara 1',
    level: 'Tingkat Nasional 2026',
    icon: Trophy,
  },
  {
    id: '2',
    title: 'Juara 1 Lomba Inovasi UI/UX & Aplikasi Edukasi Vokasi',
    recipient: 'Nabila Putri Azzahra (Kelas XI DKV)',
    category: 'Kreatif & Desain',
    badge: 'Juara 1',
    level: 'Tingkat Provinsi Jawa Barat',
    icon: Medal,
  },
  {
    id: '3',
    title: 'Best Innovation IoT & Smart Agriculture Solution',
    recipient: 'Tim Mekatronika & TOI',
    category: 'Otomasi & Robotik',
    badge: 'Best Innovation',
    level: 'National Vocational Summit',
    icon: Award,
  },
  {
    id: '4',
    title: 'Juara Umum Olimpiade Akuntansi & Perpajakan Terapan',
    recipient: 'Siti Rahmawati (Kelas XII AKL)',
    category: 'Bisnis & Manajemen',
    badge: 'Juara Umum',
    level: 'Tingkat Wilayah Jawa Barat',
    icon: Star,
  },
];

export function AchievementsSection() {
  return (
    <section id="prestasi" className="py-24 bg-white relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 border border-amber-200 px-3.5 py-1 text-xs font-bold text-amber-800 uppercase tracking-wider mb-3">
            Prestasi Siswa
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight mb-4">
            Prestasi Gemilang Siswa Kami
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Bukti nyata keunggulan akademik, kompetensi kejuruan, dan pembinaan intensif yang berhasil
            mengantarkan siswa meraih predikat juara di berbagai ajang bergengsi.
          </p>
        </div>

        {/* 2x2 Grid matching the screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {ACHIEVEMENTS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="group relative flex items-start gap-4 rounded-2xl border border-slate-200/90 bg-slate-50/50 p-6 hover:bg-white hover:shadow-xl hover:border-blue-200 transition-all duration-300"
              >
                {/* Icon Medal Box */}
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-cyan-300 shadow-md shadow-blue-600/20 group-hover:scale-105 transition-transform">
                  <Icon className="h-7 w-7" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="inline-flex items-center rounded-md bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 text-xs font-bold text-amber-700">
                      {item.badge}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {item.level}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors mb-1">
                    {item.title}
                  </h3>

                  <p className="text-sm font-medium text-slate-600">
                    Oleh: <strong className="text-slate-800">{item.recipient}</strong>
                  </p>
                  <p className="text-xs text-blue-600 mt-0.5 font-medium">
                    Bidang: {item.category}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
