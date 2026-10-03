import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { HERO } from '@/lib/site-data';

/**
 * 4.1 Hero — "Temukan yang Kamu Suka. Kuasai Keahliannya."
 * Foto asli + overlay solid (tanpa gradasi berwarna).
 */
export function HeroSection() {
  return (
    <section className="relative flex min-h-[640px] items-center overflow-hidden bg-[var(--brand)] pb-32 pt-[82px] text-white sm:min-h-[100dvh] sm:pb-36">
      {/* Foto asli (TODO: ganti foto resmi). Overlay solid, bukan gradasi berwarna. */}
      <div className="absolute inset-0">
        <Image
          src={HERO.image}
          alt="Suasana belajar di SMK Negeri 1 Subang"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#071c2d]/70" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-5 text-center sm:px-8">
        <div className="home-rise mx-auto flex max-w-4xl flex-col items-center">
          <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80 sm:text-xs">
            SMK Negeri 1 Subang
          </p>
          <h1 className="font-school-heading text-4xl font-extrabold leading-[1.02] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            {HERO.title}
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-7 text-white/90 sm:text-base">
            {HERO.description}
          </p>

          <div className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
            <Link
              href="#mulai"
              className="inline-flex w-full items-center justify-center gap-2 bg-[var(--accent)] px-7 py-3.5 text-sm font-bold text-[var(--brand)] transition hover:bg-[#ffc83d] sm:w-auto"
            >
              Mulai Jelajah
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href={HERO.secondaryCta.href}
              className="inline-flex w-full items-center justify-center gap-2 border border-white/50 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white hover:text-[var(--brand)] sm:w-auto"
            >
              {HERO.secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
