import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Hand, Presentation, Factory } from 'lucide-react';
import { KEUNGGULAN } from '@/lib/site-data';

/**
 * 4.2 Keunggulan Sekolah — satu pesan utama, satu CTA.
 * Ikon lucide (tanpa emoji), warna solid.
 */
const ICONS = {
  praktik: Hand,
  bimbingan: Presentation,
  industri: Factory,
} as const;

export function KeunggulanSection() {
  return (
    <section className="border-b border-slate-200 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent-text)]">Keunggulan Sekolah</p>
          <h2 className="font-school-heading mt-4 text-4xl font-bold leading-tight tracking-[-0.03em] text-[var(--brand)] sm:text-5xl">
            {KEUNGGULAN.title}
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600">{KEUNGGULAN.description}</p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:items-stretch">
          {/* Foto asli */}
          <div className="relative min-h-[260px] overflow-hidden border border-slate-200 lg:col-span-5">
            {/* TODO(foto): ganti dengan foto asli kegiatan praktik siswa. */}
            <Image
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1000&q=85"
              alt="Kegiatan praktik siswa SMK Negeri 1 Subang"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>

          {/* Sorotan: praktik, bimbingan guru, hubungan industri */}
          <div className="grid gap-5 lg:col-span-7">
            {KEUNGGULAN.highlights.map((item, index) => {
              const Icon = ICONS[item.id as keyof typeof ICONS] ?? Hand;
              return (
                <div
                  key={item.id}
                  className="flex gap-5 border border-slate-200 bg-[var(--surface-muted)] p-6 sm:p-7"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-[var(--brand)] text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <span className="text-xs font-bold tracking-[0.15em] text-slate-400">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-school-heading mt-1 text-xl font-bold text-[var(--brand)]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-12">
          <Link
            href={KEUNGGULAN.cta.href}
            className="home-link inline-flex items-center gap-2 border-b-2 border-[var(--accent)] pb-1 text-sm font-bold text-[var(--brand)]"
          >
            {KEUNGGULAN.cta.label.toUpperCase()} <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
