import Image from 'next/image';
import Link from 'next/link';
import { 
  Calendar, 
  Tag, 
  ChevronRight, 
  ArrowRight, 
  User, 
  Newspaper 
} from 'lucide-react';
import { NesaiPromoBar } from '@/components/home/NesaiPromoBar';

export const metadata = {
  title: 'Berita & Informasi — SMKN 1 Subang (NESAS)',
  description: 'Kabar terkini, kegiatan sekolah, dan pengumuman resmi SMKN 1 Subang.',
};

interface ArticleItem {
  id: string;
  title: string;
  category: string;
  date: string;
  author: string;
  excerpt: string;
  imageUrl: string;
}

const ALL_NEWS: ArticleItem[] = [
  {
    id: 'lks-nasional-2026',
    title: 'Siswa SMKN 1 Subang Borong Medali Emas di LKS Tingkat Nasional 2026',
    category: 'Prestasi',
    date: '18 September 2026',
    author: 'Tim Humas NESAS',
    excerpt: 'Perwakilan jurusan RPL dan TKJ berhasil membuktikan kapasitas unggulnya dengan meraih predikat juara umum cabang Cyber Security dan Web Technologies di LKS Nasional.',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'mou-industri-tech',
    title: 'Perluas Jejaring Karir: SMKN 1 Subang Teken MoU Kelas Industri Baru dengan 5 Perusahaan',
    category: 'Kemitraan',
    date: '10 September 2026',
    author: 'Hubinmas',
    excerpt: 'Kerjasama strategis guna penyaluran magang bersertifikat, kurikulum sinkronisasi, dan rekrutmen kerja langsung sebelum kelulusan siswa.',
    imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'ppdb-2026-buka',
    title: 'Pembukaan Jalur Pendaftaran PPDB SMKN 1 Subang Tahun Ajaran 2026/2027',
    category: 'Pengumuman',
    date: '01 September 2026',
    author: 'Panitia PPDB',
    excerpt: 'Informasi lengkap jadwal seleksi, kuota masing-masing jurusan, persyaratan berkas, dan panduan penggunaan asisten AI NESAI untuk konsultasi syarat.',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'kunjungan-industri-astra',
    title: 'Ratusan Siswa TOI Ikuti Kunjungan Industri & Workshop Otomasi di PT Astra',
    category: 'Kegiatan',
    date: '25 Agustus 2026',
    author: 'Jurusan TOI',
    excerpt: 'Para siswa mengamati langsung proses manufaktur robotik modern, sistem kontrol PLC pabrik cerdas, dan budaya kerja 5S standar Jepang.',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'pameran-karya-dkv',
    title: 'Pameran Desain Kreatif NESAS CREAFEST 2026 Pukau Ribuan Pengunjung',
    category: 'Ekshibisi',
    date: '14 Agustus 2026',
    author: 'Kreatif DKV',
    excerpt: 'Menampilkan puluhan karya animasi 3D, film dokumenter, poster komersial, dan prototipe aplikasi mobile buatan siswa-siswi berbakat.',
    imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'pelatihan-ai-guru',
    title: 'Tingkatkan Mutu Pembelajaran: Guru SMKN 1 Subang Ikuti Bootcamp AI & Data Science',
    category: 'Akademik',
    date: '02 Agustus 2026',
    author: 'Kurikulum',
    excerpt: 'Peningkatan kompetensi tenaga pendidik dalam mengintegrasikan AI generatif untuk media pembelajaran interaktif dan modul ajar adaptif.',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
  },
];

export default function BeritaPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="relative bg-slate-950 text-white py-16 lg:py-24 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 filter brightness-50"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2000&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-4">
            <Link href="/" className="hover:text-cyan-300 transition-colors">Beranda</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-cyan-300">Berita & Informasi</span>
          </nav>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 px-3.5 py-1 text-xs font-semibold text-cyan-300 mb-4">
            <Newspaper className="h-3.5 w-3.5 text-cyan-400" />
            Warta Sekolah
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Berita & Pengumuman Sekolah
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Ikuti perkembangan terkini seputar kegiatan akademik, prestasi siswa, kemitraan dunia usaha, dan agenda resmi SMKN 1 Subang.
          </p>
        </div>
      </section>

      {/* Grid Berita */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ALL_NEWS.map((item) => (
              <article
                key={item.id}
                className="flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-600/90 backdrop-blur-md px-3 py-0.5 text-xs font-semibold text-white">
                      <Tag className="h-3 w-3" />
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" />
                      {item.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <User className="h-3.5 w-3.5 text-slate-400" />
                      {item.author}
                    </span>
                  </div>

                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-3 leading-snug line-clamp-2">
                    {item.title}
                  </h2>

                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-6">
                    {item.excerpt}
                  </p>

                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                    <span className="inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      Baca Selengkapnya
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Bar */}
      <NesaiPromoBar />
    </div>
  );
}
