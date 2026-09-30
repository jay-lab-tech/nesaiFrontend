import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { CARA_BELAJAR } from '@/lib/site-data';

/**
 * 4.5 Cara Belajar — 4 langkah: Kenali → Coba → Buat → Terapkan.
 * Angka besar + garis penghubung; warna solid.
 */
export function CaraBelajarSection() {
  return (
    <section id="cara-belajar" className="border-b border-slate-200 bg-[var(--surface-muted)] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent-text)]">Cara Belajar</p>
          <h2 className="font-school-heading mt-4 text-4xl font-bold leading-tight tracking-[-0.03em] text-[var(--brand)] sm:text-5xl">
            {CARA_BELAJAR.title}
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600">{CARA_BELAJAR.description}</p>
        </div>

        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CARA_BELAJAR.steps.map((step, index) => (
            <li key={step.id} className="relative border-t-2 border-[var(--accent)] pt-6">
              <span className="font-school-heading block text-5xl font-extrabold tracking-[-0.04em] text-[var(--brand)]/15">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="font-school-heading mt-3 text-2xl font-bold text-[var(--brand)]">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12">
          <Link
            href={CARA_BELAJAR.cta.href}
            className="home-link inline-flex items-center gap-2 border-b-2 border-[var(--accent)] pb-1 text-sm font-bold text-[var(--brand)]"
          >
            {CARA_BELAJAR.cta.label.toUpperCase()} <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
