import Link from 'next/link';
import { ArrowUpRight, Search } from 'lucide-react';
import { searchDocuments } from '@/lib/search-data';

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = (await searchParams).q?.trim() ?? '';
  const results = searchDocuments(query);

  return (
    <main className="min-h-screen bg-[#f8faf8] text-[#172b3a]">
      <section className="border-b border-[#d9e2de] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#657c7d]">Pencarian situs</p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-none tracking-[-0.035em] sm:text-6xl">Hasil pencarian</h1>
          <form action="/search" className="mt-8 flex max-w-2xl gap-2">
            <label htmlFor="search-page-input" className="sr-only">Kata kunci pencarian</label>
            <input id="search-page-input" name="q" defaultValue={query} placeholder="Cari di seluruh situs..." className="min-w-0 flex-1 border border-[#b9c7c2] bg-[#f8faf8] px-4 py-3 text-sm outline-none placeholder:text-[#8a9a97] focus:border-[#172b3a]" />
            <button type="submit" className="inline-flex items-center gap-2 bg-[#172b3a] px-4 py-3 text-sm font-semibold text-white hover:bg-[#2e5661]"><Search className="h-4 w-4" />Cari</button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:py-16">
        {!query ? <div className="border-t border-[#b9c7c2] py-8"><p className="text-lg text-[#5d6a6e]">Masukkan kata kunci untuk mencari informasi sekolah.</p></div> : <>
          <p className="mb-7 text-sm text-[#657c7d]">{results.length} hasil untuk <span className="font-semibold text-[#172b3a]">“{query}”</span></p>
          {results.length > 0 ? <div className="border-t border-[#b9c7c2]">{results.map((result) => <Link key={`${result.href}-${result.title}`} href={result.href} className="group grid gap-3 border-b border-[#d9e2de] py-6 sm:grid-cols-[1fr_auto] sm:items-start"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#657c7d]">{result.category}</p><h2 className="mt-2 font-serif text-2xl group-hover:text-[#2e5661]">{result.title}</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-[#5d6a6e]">{result.description}</p></div><ArrowUpRight className="h-5 w-5 text-[#7a908e] transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#172b3a]" /></Link>)}</div> : <div className="border-t border-[#b9c7c2] py-8"><p className="text-lg text-[#5d6a6e]">Belum ada hasil yang cocok. Coba kata kunci yang lebih umum.</p></div>}
        </>}
      </section>
    </main>
  );
}