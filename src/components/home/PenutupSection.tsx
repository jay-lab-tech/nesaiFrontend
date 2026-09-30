import Link from 'next/link';
import { ArrowUpRight, MessageSquare } from 'lucide-react';
import { PENUTUP } from '@/lib/site-data';

/**
 * 4.9 Penutup / Ajakan — dua CTA: rekomendasi jurusan (Nesai) & daftar jurusan.
 * Warna solid, aksen kuning logo.
 */
export function PenutupSection() {
  return (
    <section className="border-y border-slate-200 bg-[var(--accent-soft)] py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
        <span className="inline-flex h-14 w-14 items-center justify-center bg-[var(--brand)] text-white">
          <MessageSquare className="h-7 w-7" />
        </span>
        <h2 className="font-school-heading mt-6 text-4xl font-bold leading-tight tracking-[-0.03em] text-[var(--brand)] sm:text-5xl">
          {PENUTUP.title}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-700">{PENUTUP.description}</p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href={PENUTUP.primaryCta.href}
            className="inline-flex w-full items-center justify-center gap-2 bg-[var(--brand)] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[var(--brand-soft)] sm:w-auto"
          >
            {PENUTUP.primaryCta.label}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link
            href={PENUTUP.secondaryCta.href}
            className="inline-flex w-full items-center justify-center gap-2 border border-[var(--brand)] px-7 py-3.5 text-sm font-bold text-[var(--brand)] transition hover:bg-[var(--brand)] hover:text-white sm:w-auto"
          >
            {PENUTUP.secondaryCta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
