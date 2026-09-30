import Link from 'next/link';
import { ArrowUpRight, Briefcase, GraduationCap, Store, Search } from 'lucide-react';
import { JEJAK_ALUMNI } from '@/lib/site-data';

/**
 * 4.8 Jejak Alumni — arah alumni dengan tahun & sumber data (brief bagian 3).
 * Data dummy; ganti dengan tracer study resmi sebelum tayang.
 */
const DIRECTION_ICONS = {
  bekerja: Briefcase,
  kuliah: GraduationCap,
  wirausaha: Store,
  mencari: Search,
} as const;

export function JejakAlumniSection() {
  return (
    <section className="border-b border-slate-200 bg-[var(--brand)] py-20 text-white sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 border-b border-white/15 pb-8 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent)]">Jejak Alumni</p>
            <h2 className="font-school-heading mt-4 text-4xl font-bold leading-tight tracking-[-0.03em] sm:text-5xl">
              {JEJAK_ALUMNI.title}
            </h2>
            <p className="mt-6 text-base leading-7 text-white/85">{JEJAK_ALUMNI.description}</p>
          </div>
          {/* Wajib: tahun & sumber data */}
          <p className="shrink-0 text-xs font-semibold text-white/70">
            Data {JEJAK_ALUMNI.dataYear} · Sumber: {JEJAK_ALUMNI.dataSource}
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {JEJAK_ALUMNI.directions.map((item) => {
            const Icon = DIRECTION_ICONS[item.id as keyof typeof DIRECTION_ICONS] ?? Briefcase;
            return (
              <div key={item.id} className="border border-white/15 bg-white/[0.04] p-6">
                <Icon className="h-6 w-6 text-[var(--accent)]" />
                <p className="font-school-heading mt-4 text-4xl font-extrabold tracking-[-0.03em]">
                  {item.value}%
                </p>
                <p className="mt-2 text-sm font-semibold text-white/85">{item.label}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12">
          <Link
            href={JEJAK_ALUMNI.cta.href}
            className="inline-flex items-center gap-2 border-b-2 border-[var(--accent)] pb-1 text-sm font-bold text-white transition hover:text-[var(--accent)]"
          >
            {JEJAK_ALUMNI.cta.label.toUpperCase()} <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
