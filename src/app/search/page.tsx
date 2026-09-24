import Link from 'next/link';
import { ArrowUpRight, Search } from 'lucide-react';
import { getSearchSuggestions, searchDocuments } from '@/lib/search-data';
import { PageHero } from '@/components/site/PageHero';

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = (await searchParams).q?.trim() ?? '';
  const results = searchDocuments(query);
  const suggestions = getSearchSuggestions(query);

  return (
    <main className="bg-[#f8fafc] text-[#172b3a]">
      <PageHero
        eyebrow="Pencarian situs"
        title={query ? `Hasil untuk “${query}”.` : 'Temukan informasi sekolah.'}
        description="Cari jurusan, berita, fasilitas, PPDB, dan informasi resmi SMKN 1 Subang."
        image="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=2200&q=90"
      />

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
          <form action="/search" className="mx-auto flex w-full max-w-4xl flex-col gap-2 rounded-[1.6rem] border-4 border-[#dce5e1] bg-white p-2 shadow-[0_15px_35px_-22px_rgba(15,30,54,0.55)] sm:flex-row sm:rounded-full">
            <label htmlFor="search-page-input" className="sr-only">Kata kunci pencarian</label>
            <div className="flex min-h-12 flex-1 items-center gap-3 px-4 text-[#57636b]">
              <Search className="h-5 w-5 shrink-0 text-[#8095a0]" />
              <input id="search-page-input" name="q" type="search" defaultValue={query} placeholder="Apa yang ingin Anda cari?" className="w-full bg-transparent text-sm outline-none placeholder:text-[#95a0a6] sm:text-base" />
            </div>
            <button type="submit" className="min-h-12 rounded-full bg-[#f5b51b] px-8 text-sm font-bold text-[#152c3e] transition hover:bg-[#ffc83d]">Cari</button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        {!query ? (
          <div className="grid gap-8 border-y border-slate-300 py-10 sm:grid-cols-[0.7fr_1.3fr] sm:py-14">
            <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">Mulai pencarian</p><h2 className="font-school-heading mt-4 text-3xl font-bold leading-tight text-[#0f1e36] sm:text-4xl">Satu kotak untuk menemukan semuanya.</h2></div>
            <p className="max-w-xl text-base leading-7 text-slate-600 sm:pt-2">Masukkan kata kunci seperti “jurusan”, “PPDB”, atau “fasilitas” untuk menemukan halaman yang kamu butuhkan.</p>
          </div>
        ) : (
          <>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b-2 border-amber-400 pb-5">
              <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">Direktori informasi</p><h2 className="font-school-heading mt-3 text-3xl font-bold text-[#0f1e36]">{results.length} hasil ditemukan</h2></div>
              <p className="text-sm text-slate-500">Untuk <span className="font-semibold text-[#172b3a]">“{query}”</span></p>
            </div>
            {results.length === 0 && suggestions.length > 0 && <div className="mb-8 border-l-4 border-amber-400 bg-amber-50 px-5 py-4 text-sm text-slate-700"><span className="font-semibold text-[#0f1e36]">Mungkin maksud Anda: </span>{suggestions.map((suggestion, index) => <span key={suggestion}>{index > 0 && ', '}<Link href={`/search?q=${encodeURIComponent(suggestion)}`} className="font-bold text-amber-800 underline decoration-amber-300 underline-offset-4 hover:text-[#0f1e36]">{suggestion}</Link></span>)}</div>}
            {results.length > 0 ? (
              <div className="border-t border-slate-300">
                {results.map((result, index) => (
                  <article key={`${result.href}-${result.title}-${index}`} className="grid gap-5 border-b border-slate-200 py-7 sm:grid-cols-[4rem_1fr] sm:items-start sm:px-3">
                    <span className="font-school-heading text-sm font-bold text-slate-400">{String(index + 1).padStart(2, '0')}</span>
                    <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">{result.category}</p><h3 className="font-school-heading mt-2 text-2xl font-bold text-[#0f1e36]">{result.title}</h3><p className="mt-3 max-w-4xl text-sm leading-7 text-slate-600">{result.description}</p><div className="mt-4 max-w-4xl border-l-2 border-amber-300 pl-4"><p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Cakupan informasi</p><p className="mt-1 text-sm leading-6 text-slate-700">{result.keywords}</p></div><Link href={result.href} className="mt-5 inline-flex items-center gap-2 bg-[#0f1e36] px-4 py-3 text-xs font-bold text-white transition hover:bg-[#1e355b]">Buka halaman informasi <ArrowUpRight className="h-4 w-4" /></Link></div>
                  </article>
                ))}
              </div>
            ) : <div className="border-t border-slate-300 py-10"><p className="font-school-heading text-2xl font-bold text-[#0f1e36]">Belum ada hasil yang cocok.</p><p className="mt-3 text-sm leading-6 text-slate-600">Coba gunakan kata kunci yang lebih umum, seperti “sekolah”, “jurusan”, atau “berita”.</p></div>}
          </>
        )}
      </section>
    </main>
  );
}