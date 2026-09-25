import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Tag, ArrowRight } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  imageUrl: string;
}

const NEWS_LIST: NewsItem[] = [
  {
    id: 'lks-nasional',
    title: 'Siswa SMKN 1 Subang Borong Medali Emas di LKS Tingkat Nasional 2026',
    category: 'Prestasi',
    date: '18 September 2026',
    excerpt: 'Perwakilan jurusan RPL dan TKJ berhasil meraih predikat juara umum cabang Cyber Security dan Web Technologies di ajang bergengsi LKS Nasional.',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'mou-industri',
    title: 'Perluas Jejaring Karir: SMKN 1 Subang Teken MoU Kelas Industri Baru',
    category: 'Kemitraan',
    date: '10 September 2026',
    excerpt: 'Kerjasama strategis dengan 5 perusahaan teknologi ternama guna penyaluran magang bersertifikat dan rekrutmen kerja langsung sebelum kelulusan.',
    imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'ppdb-2026',
    title: 'Pembukaan Jalur Pendaftaran PPDB SMKN 1 Subang Tahun Ajaran 2026/2027',
    category: 'Pengumuman',
    date: '01 September 2026',
    excerpt: 'Informasi lengkap jadwal seleksi, syarat berkas, kuota jurusan, dan jalur afirmasi/prestasi untuk calon peserta didik baru.',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
  },
];

export function NewsSection() {
  return (
    <section id="berita" className="py-24 bg-slate-50 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 border border-blue-200 px-3.5 py-1 text-xs font-bold text-blue-700 uppercase tracking-wider mb-3">
              Kabar Sekolah
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight">
              Berita & Informasi Sekolah
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600">
              Update terkini kegiatan akademik, inovasi siswa, kemitraan industri, dan pengumuman resmi SMKN 1 Subang.
            </p>
          </div>

          <Link
            href="/berita"
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 hover:gap-3 transition-all"
          >
            <span>Lihat Semua Berita</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {NEWS_LIST.map((item) => (
            <article
              key={item.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300"
            >
              {/* Thumbnail */}
              <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-600/90 backdrop-blur-md px-3 py-0.5 text-xs font-semibold text-white">
                    <Tag className="h-3 w-3" />
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-2.5">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                  <time>{item.date}</time>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-3">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-6">
                  {item.excerpt}
                </p>

                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href="/berita"
                    className="text-xs font-bold text-blue-600 hover:underline inline-flex items-center gap-1"
                  >
                    <span>Baca Selengkapnya</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
