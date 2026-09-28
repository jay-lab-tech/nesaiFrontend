import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getJurusan, JURUSAN } from '@/lib/jurusan-data';
import { PageHero } from '@/components/site/PageHero';

export function generateStaticParams() {
  return JURUSAN.map(({ slug }) => ({ slug }));
}

export default async function JurusanDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const jurusan = getJurusan(slug);
  if (!jurusan) notFound();

  return <main className="bg-[#f8faf8] text-[#172b3a]"><PageHero eyebrow={jurusan.code} title={jurusan.name} description={jurusan.description} image="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2200&q=90" /><section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24"><Link href="/jurusan" className="inline-flex items-center gap-2 text-sm font-semibold text-[#557d82] transition hover:text-[#172b3a]"><ArrowLeft className="h-4 w-4" /> Kembali ke semua jurusan</Link><div className="mt-12 grid gap-12 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">Tentang program</p><h2 className="font-school-heading mt-4 text-3xl font-bold leading-tight text-[#0f1e36]">Bangun kompetensi yang relevan untuk masa depan.</h2><p className="mt-5 text-base leading-7 text-slate-600">{jurusan.focus}</p><Link href="/ppdb" className="mt-8 inline-flex items-center gap-2 bg-[#0f1e36] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1e355b]">Lihat informasi PPDB <ArrowUpRight className="h-4 w-4" /></Link></div><div className="grid gap-8 sm:grid-cols-2"><div className="border-t-2 border-amber-400 pt-5"><h3 className="font-school-heading text-xl font-bold text-[#0f1e36]">Materi utama</h3><ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">{jurusan.subjects.map((subject) => <li key={subject} className="border-b border-slate-200 pb-3">{subject}</li>)}</ul></div><div className="border-t-2 border-amber-400 pt-5"><h3 className="font-school-heading text-xl font-bold text-[#0f1e36]">Prospek karier</h3><ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">{jurusan.careers.map((career) => <li key={career} className="border-b border-slate-200 pb-3">{career}</li>)}</ul></div></div></div></section></main>;
}