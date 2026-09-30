import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PageHero } from '@/components/site/PageHero';
import { publicService, unwrapList } from '@/lib/api/public-endpoints';
import type { News } from '@/types/cms';

export const revalidate = 60;

function formatDate(value?: string | null): string {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

async function getNews(): Promise<News[]> {
  try {
    const response = await publicService.getNews({ per_page: 20 });
    return unwrapList<News>(response);
  } catch {
    return [];
  }
}

export default async function BeritaPage() {
  const news = await getNews();

  return (
    <main className="bg-[#f8faf8] text-[#172b3a]">
      <PageHero
        eyebrow="Berita & Pengumuman"
        title="Kabar terbaru dari sekolah."
        description="Informasi kegiatan, pengumuman, dan cerita dari SMKN 1 Subang."
        image="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2200&q=90"
      />
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-2 px-5 py-5 sm:px-8">
          {['Semua', 'Pengumuman', 'Kegiatan', 'Akademik', 'Agenda'].map((item, index) => (
            <button
              key={item}
              className={`border px-4 py-2 text-xs font-bold transition ${
                index === 0
                  ? 'border-[#0f1e36] bg-[#0f1e36] text-white'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-amber-400'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#657c7d]">Kabar sekolah</p>
            <h2 className="mt-5 font-school-heading text-4xl leading-tight sm:text-5xl">Informasi yang perlu kamu ketahui.</h2>
            <p className="mt-5 text-sm leading-7 text-slate-600">Berita resmi, pengumuman, dan agenda akan diperbarui melalui halaman ini.</p>
          </div>
          <div className="border-t border-[#b9c7c2]">
            {news.length === 0 ? (
              <div className="border-b border-[#d9e2de] py-10 text-sm leading-7 text-slate-500">
                Belum ada berita yang dipublikasikan. Silakan kembali lagi nanti.
              </div>
            ) : (
              news.map((item) => (
                <article
                  key={item.id}
                  className="group grid gap-5 border-b border-[#d9e2de] py-7 sm:grid-cols-[6rem_1fr_auto]"
                >
                  <div className="text-xs text-[#758b89]">
                    <time className="block font-semibold">{formatDate(item.published_at ?? item.created_at)}</time>
                    <span className="mt-2 block text-amber-700">Berita</span>
                  </div>
                  <div>
                    <h3 className="font-school-heading text-2xl transition group-hover:translate-x-1">{item.title}</h3>
                    {item.excerpt ? (
                      <p className="mt-3 text-sm leading-6 text-slate-600">{item.excerpt}</p>
                    ) : null}
                  </div>
                  <Link
                    href={`/berita/${item.slug}`}
                    className="inline-flex items-start gap-1 text-sm font-semibold group-hover:text-[#557d82]"
                  >
                    Baca <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </article>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
