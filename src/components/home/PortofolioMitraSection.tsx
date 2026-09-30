import Link from 'next/link';
import { ArrowUpRight, BriefcaseBusiness, LayoutGrid, Wrench, ChefHat } from 'lucide-react';
import { PORTOFOLIO } from '@/lib/site-data';

/**
 * 4.6 Portofolio & Mitra — karya siswa + mitra industri.
 * Hanya sertakan karya & mitra yang benar-benar terlibat (lihat TODO di site-data).
 */
const TYPE_ICONS: Record<string, typeof BriefcaseBusiness> = {
  'Produk bisnis': BriefcaseBusiness,
  'Layanan digital': LayoutGrid,
  'Pekerjaan teknik': Wrench,
  'Produk kuliner': ChefHat,
};

export function PortofolioMitraSection() {
  return (
    <section className="border-b border-slate-200 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent-text)]">Portofolio &amp; Mitra</p>
          <h2 className="font-school-heading mt-4 text-4xl font-bold leading-tight tracking-[-0.03em] text-[var(--brand)] sm:text-5xl">
            {PORTOFOLIO.title}
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600">{PORTOFOLIO.description}</p>
        </div>

        {/* Karya siswa */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PORTOFOLIO.works.map((work) => {
            const Icon = TYPE_ICONS[work.type] ?? LayoutGrid;
            return (
              <div key={work.id} className="border border-slate-200 bg-[var(--surface-muted)] p-6">
                <span className="flex h-11 w-11 items-center justify-center border border-[var(--border-subtle)] bg-white text-[var(--brand)]">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--accent-text)]">
                  {work.type} · {work.major}
                </p>
                <h3 className="font-school-heading mt-2 text-lg font-bold leading-snug text-[var(--brand)]">
                  {work.title}
                </h3>
              </div>
            );
          })}
        </div>

        {/* Mitra industri */}
        <div className="mt-12 border-t border-slate-200 pt-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">Mitra Industri</p>
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {PORTOFOLIO.partners.map((partner) => (
              <div
                key={partner.id}
                className="flex flex-col items-center justify-center border border-slate-200 bg-white px-4 py-6 text-center"
              >
                <span className="text-sm font-bold text-[var(--brand)]">{partner.name}</span>
                <span className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                  {partner.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <Link
            href={PORTOFOLIO.cta.href}
            className="home-link inline-flex items-center gap-2 border-b-2 border-[var(--accent)] pb-1 text-sm font-bold text-[var(--brand)]"
          >
            {PORTOFOLIO.cta.label.toUpperCase()} <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
