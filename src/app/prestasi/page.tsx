import Link from 'next/link';
import { 
  Trophy, 
  Medal, 
  ChevronRight 
} from 'lucide-react';
import { NesaiPromoBar } from '@/components/home/NesaiPromoBar';

export const metadata = {
  title: 'Prestasi Siswa — SMKN 1 Subang (NESAS)',
  description: 'Daftar prestasi dan medali kejuaraan siswa-siswi SMKN 1 Subang.',
};

interface AchievementRecord {
  id: string;
  title: string;
  badge: string;
  level: string;
  recipient: string;
  mentor: string;
  year: string;
  category: string;
  description: string;
}

const ACHIEVEMENTS_LIST: AchievementRecord[] = [
  {
    id: '1',
    title: 'Medali Emas LKS Tingkat Nasional — Cyber Security',
    badge: 'Juara 1 (Emas)',
    level: 'Tingkat Nasional',
    recipient: 'Ahmad Fauzi & Tim',
    mentor: 'Ir. Budi Hermawan, M.T',
    year: '2026',
    category: 'Teknologi Informasi (RPL/TKJ)',
    description: 'Berhasil mengamankan infrastruktur server dari simulasi serangan siber dan memecahkan tantangan capture the flag (CTF) dengan skor tertinggi se-Indonesia.',
  },
  {
    id: '2',
    title: 'Juara 1 Lomba Desain UI/UX & Mobile App Prototype Vokasi',
    badge: 'Juara 1',
    level: 'Tingkat Provinsi Jawa Barat',
    recipient: 'Nabila Putri Azzahra',
    mentor: 'Rina Kusuma, S.Sn',
    year: '2026',
    category: 'Kreatif & Desain (DKV)',
    description: 'Merancang prototype aplikasi inklusif ramah disabilitas untuk layanan publik dengan metodologi Design Thinking yang memukau dewan juri industri.',
  },
  {
    id: '3',
    title: 'Best Innovation — IoT Smart Agriculture & Weather Station',
    badge: 'Inovasi Terbaik',
    level: 'National Vocational Innovation Summit',
    recipient: 'Tim Mekatronika NESAS',
    mentor: 'Yayan Hendrayana, S.T',
    year: '2025',
    category: 'Otomasi & Rekayasa (TOI)',
    description: 'Menciptakan sistem sensor cuaca dan penyiraman otomatis berbasis IoT bertenaga panel surya untuk petani di Kabupaten Subang.',
  },
  {
    id: '4',
    title: 'Juara Umum Olimpiade Akuntansi & Perpajakan Terapan',
    badge: 'Juara Umum',
    level: 'Tingkat Wilayah Jawa Barat',
    recipient: 'Siti Rahmawati & Tim',
    mentor: 'Hj. Nenden Kurniasih, S.Pd',
    year: '2025',
    category: 'Bisnis & Keuangan (AKL)',
    description: 'Menyelesaikan siklus akuntansi perusahaan dagang dan manufaktur menggunakan software MYOB serta penghitungan SPT pajak dengan akurasi 100%.',
  },
  {
    id: '5',
    title: 'Juara 2 LKS Nasional — Web Technologies',
    badge: 'Juara 2 (Perak)',
    level: 'Tingkat Nasional',
    recipient: 'Rizky Ramadhan',
    mentor: 'Hendra Gunawan, S.Kom',
    year: '2025',
    category: 'Software Engineering (RPL)',
    description: 'Mengembangkan sistem web responsif full-stack dengan kecepatan tinggi dan integrasi REST API arsitektur microservices.',
  },
  {
    id: '6',
    title: 'Medali Emas FLS2N Bidang Film Pendek Dokumenter Budaya',
    badge: 'Juara 1 (Emas)',
    level: 'Tingkat Provinsi Jawa Barat',
    recipient: 'Tim Sinematografi DKV NESAS',
    mentor: 'Andri Wijaya, M.Ds',
    year: '2025',
    category: 'Seni & Sinematografi (DKV)',
    description: 'Karya film dokumenter kearifan lokal kesenian Sisingaan Subang dengan sinematografi dan tata suara audio visual berstandar bioskop.',
  },
];

export default function PrestasiPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="relative bg-slate-950 text-white py-16 lg:py-24 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 filter brightness-50"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2000&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-4">
            <Link href="/" className="hover:text-cyan-300 transition-colors">Beranda</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-cyan-300">Prestasi Siswa</span>
          </nav>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 px-3.5 py-1 text-xs font-semibold text-amber-300 mb-4">
            <Trophy className="h-3.5 w-3.5 text-amber-400" />
            Pencapaian Gemilang
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Prestasi & Kejuaraan Siswa
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Dedikasi belajar, pembinaan intensif, dan bimbingan guru profesional yang menghasilkan torehan prestasi membanggakan di kancah nasional maupun internasional.
          </p>
        </div>
      </section>

      {/* Counter Ringkasan Medali */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200">
              <p className="text-3xl sm:text-4xl font-black text-amber-600">28+</p>
              <p className="text-sm font-bold text-slate-800 mt-1">Medali Emas</p>
              <p className="text-xs text-slate-500 mt-0.5">Kejuaraan Nasional & Provinsi</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-100 border border-slate-300">
              <p className="text-3xl sm:text-4xl font-black text-slate-700">34+</p>
              <p className="text-sm font-bold text-slate-800 mt-1">Medali Perak</p>
              <p className="text-xs text-slate-500 mt-0.5">Ajang LKS & Vokasi</p>
            </div>
            <div className="p-6 rounded-2xl bg-orange-50/70 border border-orange-200">
              <p className="text-3xl sm:text-4xl font-black text-orange-600">19+</p>
              <p className="text-sm font-bold text-slate-800 mt-1">Medali Perunggu</p>
              <p className="text-xs text-slate-500 mt-0.5">Olimpiade & Lomba Terapan</p>
            </div>
            <div className="p-6 rounded-2xl bg-blue-50/70 border border-blue-200">
              <p className="text-3xl sm:text-4xl font-black text-blue-600">15+</p>
              <p className="text-sm font-bold text-slate-800 mt-1">Best Innovation</p>
              <p className="text-xs text-slate-500 mt-0.5">Penghargaan Karya Cipta</p>
            </div>
          </div>
        </div>
      </section>

      {/* Daftar Prestasi */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ACHIEVEMENTS_LIST.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center rounded-lg bg-amber-500/15 border border-amber-500/30 px-3 py-1 text-xs font-bold text-amber-700">
                      <Medal className="h-3.5 w-3.5 mr-1 text-amber-600" />
                      {item.badge}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {item.level} • {item.year}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900 mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-col gap-1 text-xs text-slate-500">
                  <p>Siswa: <strong className="text-slate-800">{item.recipient}</strong></p>
                  <p>Pembimbing: <span className="text-slate-700 font-medium">{item.mentor}</span></p>
                  <p className="text-blue-600 font-semibold mt-1">Bidang: {item.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Bar */}
      <NesaiPromoBar />
    </div>
  );
}
