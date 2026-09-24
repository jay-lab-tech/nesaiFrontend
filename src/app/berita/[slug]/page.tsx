'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ChevronRight, Calendar, ArrowLeft, Share2 } from 'lucide-react';
import { publicService, unwrapItem } from '@/lib/api/public-endpoints';
import type { News } from '@/types/cms';
import { Skeleton } from '@/components/ui/skeleton';

export default function NewsDetailPage() {
  const params = useParams<{ slug: string }>();
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!params.slug) return;
    setLoading(true);
    publicService.getNewsBySlug(params.slug)
      .then((res) => {
        const item = unwrapItem<News>(res);
        if (item) {
          setNews(item);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [params.slug]);

  if (error) {
    return (
      <div className="bg-slate-50 min-h-screen py-24">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <h1 className="text-2xl font-bold text-slate-800">Berita Tidak Ditemukan</h1>
          <p className="mt-2 text-sm text-slate-500">Artikel yang Anda cari tidak tersedia atau telah dipindahkan.</p>
          <Link
            href="/berita"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Daftar Berita
          </Link>
        </div>
      </div>
    );
  }

  if (loading || !news) {
    return (
      <div className="bg-slate-50 min-h-screen py-20">
        <div className="mx-auto max-w-4xl px-5 space-y-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-64 w-full rounded-2xl" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    );
  }

  const dateString = news.published_at
    ? new Date(news.published_at).toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'Terbaru';

  return (
    <main className="bg-[#f8faf8] text-[#172b3a] min-h-screen pb-24">
      {/* Header Bar */}
      <section className="bg-white border-b border-slate-200 py-6">
        <div className="mx-auto max-w-4xl px-5">
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-4">
            <Link href="/" className="hover:text-blue-600">Beranda</Link>
            <ChevronRight className="h-3 w-3 text-slate-400" />
            <Link href="/berita" className="hover:text-blue-600">Berita & Pengumuman</Link>
            <ChevronRight className="h-3 w-3 text-slate-400" />
            <span className="text-slate-800 truncate max-w-xs">{news.title}</span>
          </nav>

          <Link
            href="/berita"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 transition mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Kembali ke Berita</span>
          </Link>

          <h1 className="font-school-heading text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[#0f1e36]">
            {news.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-500 border-t border-slate-100 pt-4">
            <span className="flex items-center gap-1.5 font-medium text-slate-700">
              <Calendar className="h-3.5 w-3.5 text-amber-600" />
              {dateString}
            </span>
            <span>•</span>
            <span className="bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded border border-blue-200">
              Humas SMKN 1 Subang
            </span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="mx-auto max-w-4xl px-5 mt-10">
        {news.excerpt && (
          <div className="mb-8 rounded-2xl bg-amber-50/60 border-l-4 border-amber-400 p-5 text-base sm:text-lg font-medium text-[#5c4820] leading-relaxed">
            {news.excerpt}
          </div>
        )}

        <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-10 shadow-xs">
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4 whitespace-pre-line text-sm sm:text-base">
            {news.body || 'Konten lengkap artikel belum tersedia.'}
          </div>
        </div>
      </article>
    </main>
  );
}
