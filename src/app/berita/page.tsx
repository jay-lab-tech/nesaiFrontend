'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Search, Calendar, Tag } from 'lucide-react';
import { PageHero } from '@/components/site/PageHero';
import { publicService, unwrapList } from '@/lib/api/public-endpoints';
import type { News } from '@/types/cms';

const DEFAULT_NEWS: News[] = [
  {
    id: 1,
    title: 'Siswa SMKN 1 Subang Borong Medali Emas di LKS Tingkat Nasional 2026',
    slug: 'lks-nasional-2026',
    published_at: '2026-09-18T10:00:00Z',
    excerpt: 'Perwakilan jurusan RPL dan TKJ berhasil meraih predikat juara umum cabang Cyber Security dan Web Technologies di ajang LKS Nasional.',
    body: 'Perwakilan jurusan RPL dan TKJ berhasil meraih predikat juara umum cabang Cyber Security dan Web Technologies di ajang LKS Nasional.',
  },
  {
    id: 2,
    title: 'Perluas Jejaring Karir: SMKN 1 Subang Teken MoU Kelas Industri Baru',
    slug: 'mou-kelas-industri',
    published_at: '2026-09-10T10:00:00Z',
    excerpt: 'Kerjasama strategis dengan perusahaan teknologi ternama guna penyaluran magang bersertifikat dan rekrutmen kerja langsung sebelum kelulusan.',
    body: 'Kerjasama strategis dengan perusahaan teknologi ternama guna penyaluran magang bersertifikat dan rekrutmen kerja langsung sebelum kelulusan.',
  },
  {
    id: 3,
    title: 'Pembukaan Jalur Pendaftaran PPDB SMKN 1 Subang Tahun Ajaran 2026/2027',
    slug: 'ppdb-2026-dibuka',
    published_at: '2026-09-01T10:00:00Z',
    excerpt: 'Informasi lengkap jadwal seleksi, syarat berkas, kuota jurusan, dan jalur afirmasi/prestasi untuk calon peserta didik baru.',
    body: 'Informasi lengkap jadwal seleksi, syarat berkas, kuota jurusan, dan jalur afirmasi/prestasi untuk calon peserta didik baru.',
  },
];

const CATEGORIES = ['Semua', 'Pengumuman', 'Kegiatan', 'Prestasi', 'Akademik'];

export default function BeritaPage() {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    publicService.getNews({ per_page: 20 })
      .then((res) => {
        const list = unwrapList<News>(res);
        if (list.length > 0) setNewsList(list);
      })
      .catch(() => {});
  }, []);

  const filteredNews = useMemo(() => {
    const list = newsList.length > 0 ? newsList : DEFAULT_NEWS;
    return list.filter((item) => {
      const matchesCat = activeCategory === 'Semua' || (item.excerpt || item.title).toLowerCase().includes(activeCategory.toLowerCase());
      const matchesSearch = !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase()) || (item.excerpt || '').toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [newsList, activeCategory, searchTerm]);

  return (
    <main className="bg-[#f8faf8] text-[#172b3a]">
      <PageHero
        eyebrow="Berita & Pengumuman"
        title="Kabar terbaru dari sekolah."
        description="Informasi kegiatan, prestasi siswa, pengumuman resmi, dan agenda SMKN 1 Subang."
        image="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2200&q=90"
      />

      {/* Filter and Search Bar */}
      <section className="border-b border-slate-200 bg-white sticky top-0 z-20 shadow-xs">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? 'border-[#0f1e36] bg-[#0f1e36] text-white'
                    : 'border border-slate-200 bg-white text-slate-600 hover:border-amber-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari berita..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-4 py-2 text-xs outline-none focus:border-blue-500 focus:bg-white transition"
            />
          </div>
        </div>
      </section>

      {/* Main Articles List */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#657c7d]">Kabar sekolah</p>
            <h2 className="mt-4 font-school-heading text-4xl leading-tight sm:text-5xl">
              Informasi yang perlu kamu ketahui.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Berita resmi, pengumuman akademik, dan agenda kegiatan sekolah diperbarui secara berkala oleh tim publikasi humas SMKN 1 Subang.
            </p>
          </div>

          <div className="border-t border-[#b9c7c2]">
            {filteredNews.length === 0 ? (
              <div className="py-12 text-center text-slate-500 text-sm">
                Tidak ada berita yang cocok dengan kata kunci atau filter pencarian.
              </div>
            ) : (
              filteredNews.map((item) => {
                const dateString = item.published_at
                  ? new Date(item.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
                  : (item as any).date || 'Baru';

                const targetSlug = item.slug || String(item.id);

                return (
                  <article
                    key={item.id}
                    className="group grid gap-5 border-b border-[#d9e2de] py-7 sm:grid-cols-[7rem_1fr_auto] items-start transition hover:bg-white/70 px-2 rounded-lg"
                  >
                    <div className="text-xs text-[#758b89]">
                      <time className="block font-semibold flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {dateString}
                      </time>
                      <span className="mt-2 inline-block text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 uppercase">
                        {(item as any).category || 'Berita'}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-school-heading text-2xl font-bold transition group-hover:text-blue-700">
                        <Link href={`/berita/${targetSlug}`}>
                          {item.title}
                        </Link>
                      </h3>
                      <p className="mt-2.5 text-sm leading-6 text-slate-600 line-clamp-3">
                        {item.excerpt || (item.body ? item.body.substring(0, 140) + '...' : '')}
                      </p>
                    </div>

                    <Link
                      href={`/berita/${targetSlug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 group-hover:text-blue-600 transition whitespace-nowrap pt-1"
                    >
                      <span>Baca</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </article>
                );
              })
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
