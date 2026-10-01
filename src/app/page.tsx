'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowUpRight,
  Bell,
  ChevronRight,
  Calculator,
  ShoppingBag,
  ClipboardList,
  Code2,
  Network,
  Cog,
  Wrench,
  Truck,
  UtensilsCrossed,
  Calendar,
} from 'lucide-react';
import { HeroSection } from '@/components/home/HeroSection';
import { KeunggulanSection } from '@/components/home/KeunggulanSection';
import { CaraBelajarSection } from '@/components/home/CaraBelajarSection';
import { PortofolioMitraSection } from '@/components/home/PortofolioMitraSection';
import { JejakAlumniSection } from '@/components/home/JejakAlumniSection';
import { PenutupSection } from '@/components/home/PenutupSection';
import { publicService, unwrapList, unwrapItem } from '@/lib/api/public-endpoints';
import { resolveJurusanSlug } from '@/lib/jurusan-data';
import { getJurusanLogo512 } from '@/lib/jurusan-logos';
import type { School, Major, News, Ppdb } from '@/types/cms';
import {
  STATISTIK,
  JURUSAN_SECTION,
  JURUSAN_CARDS,
  KEGIATAN,
  PPDB_BERANDA,
  SAMBUTAN,
  ROUTES,
} from '@/lib/site-data';

/**
 * Beranda — urutan section sesuai Brief bagian 4:
 * Hero → Keunggulan → Statistik → Semua Jurusan → Cara Belajar →
 * Portofolio & Mitra → Kegiatan Terbaru → Jejak Alumni → Penutup → PPDB
 * (Floating Nesai & StickyBottomBar dirender oleh AppShell.)
 *
 * Catatan data:
 * - Jurusan memakai data dari API bila tersedia, else fallback statis (site-data).
 * - Berita/PPDB/profil sekolah memakai API bila tersedia, else fallback statis.
 *   Semua fallback ditandai TODO di `src/lib/site-data.ts`.
 */

// Peta nama ikon lucide → komponen (tanpa emoji).
const JURUSAN_ICONS: Record<string, typeof Code2> = {
  Calculator,
  ShoppingBag,
  ClipboardList,
  Code2,
  Network,
  Cog,
  Wrench,
  Truck,
  UtensilsCrossed,
};

function formatDate(value?: string | null): string {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
}

export default function HomePage() {
  const [school, setSchool] = useState<School | null>(null);
  const [majors, setMajors] = useState<Major[]>([]);
  const [newsList, setNewsList] = useState<News[]>([]);
  const [ppdb, setPpdb] = useState<Ppdb | null>(null);

  useEffect(() => {
    // Semua fetch memakai try/catch → fallback ke data statis bila API belum siap.
    publicService.getSchool().then((res) => {
      const item = unwrapItem<School>(res);
      if (item) setSchool(item);
    }).catch(() => {});

    publicService.getMajors({ per_page: 10 }).then((res) => {
      const list = unwrapList<Major>(res);
      if (list.length > 0) setMajors(list);
    }).catch(() => {});

    publicService.getNews({ per_page: 3 }).then((res) => {
      const list = unwrapList<News>(res);
      if (list.length > 0) setNewsList(list);
    }).catch(() => {});

    publicService.getPpdb().then((res) => {
      const item = unwrapItem<Ppdb>(res);
      if (item) setPpdb(item);
    }).catch(() => {});
  }, []);

  // Jurusan: API bila ada, else 9 jurusan statis dari brief.
  // Link detail HARUS memakai slug yang dikenal halaman `/jurusan/[slug]`
  // (bersumber dari data statis `JURUSAN`). Slug dari API dibuat otomatis dari
  // nama (mis. "rekayasa-perangkat-lunak") sehingga bisa 404 jika dipakai mentah.
  const jurusanItems = majors.length > 0
    ? majors.map((m, idx) => {
        const fallback = JURUSAN_CARDS.find((j) => j.slug === m.slug) ?? JURUSAN_CARDS[idx];
        const resolvedSlug = resolveJurusanSlug({ slug: m.slug, code: m.code, name: m.name });
        return {
          key: String(m.id ?? m.slug),
          code: m.code ?? fallback?.code ?? '',
          slug: resolvedSlug ?? fallback?.slug ?? m.slug,
          name: m.name ?? fallback?.name ?? '',
          description: m.summary ?? fallback?.description ?? '',
          icon: fallback?.icon ?? 'Code2',
        };
      })
    : JURUSAN_CARDS.map((j) => ({ key: j.slug, code: j.code, slug: j.slug, name: j.name, description: j.description, icon: j.icon }));

  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      {/* 4.1 — Hero */}
      <HeroSection />

      {/* Sambutan Kepala Sekolah (dipertahankan di Beranda sesuai keputusan produk) */}
      <section id="sambutan" className="narrative-section border-b border-slate-200 bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
          {/* Pengumuman (API/fallback) */}
          <div className="lg:col-span-5">
            <div className="overflow-hidden border border-slate-200 bg-white shadow-[0_10px_25px_-15px_rgba(15,30,54,0.18)]">
              <div className="flex items-center justify-between bg-[var(--brand)] px-5 py-4 text-white">
                <span className="flex items-center gap-2 text-sm font-bold tracking-wide">
                  <Bell className="h-4 w-4 text-[var(--accent)]" /> PENGUMUMAN SEKOLAH
                </span>
                <span className="bg-[var(--accent)] px-2 py-0.5 text-[10px] font-bold text-[var(--brand)]">TERKINI</span>
              </div>
              <div className="divide-y divide-slate-100">
                {newsList.length > 0
                  ? newsList.slice(0, 3).map((item, idx) => (
                      <Link
                        key={item.id || idx}
                        href={item.slug ? `/berita/${item.slug}` : ROUTES.berita}
                        className="group flex gap-3 p-4 transition hover:bg-slate-50"
                      >
                        <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center border border-slate-200 bg-slate-50 text-[9px] font-bold tracking-wide text-[var(--brand-soft)]">
                          {idx === 0 ? 'INFO' : idx === 1 ? 'BERITA' : 'AGENDA'}
                        </span>
                        <span>
                          <b className="block text-sm leading-5 text-slate-800 transition group-hover:text-[var(--brand-soft)]">
                            {item.title}
                          </b>
                          <span className="mt-1 block text-xs leading-5 text-slate-500 line-clamp-2">
                            {item.excerpt || 'Klik untuk membaca informasi lengkap.'}
                          </span>
                        </span>
                      </Link>
                    ))
                  : KEGIATAN.fallbackItems.map((item) => (
                      <Link key={item.id} href={item.href} className="group flex gap-3 p-4 transition hover:bg-slate-50">
                        <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center border border-slate-200 bg-slate-50 text-[9px] font-bold tracking-wide text-[var(--brand-soft)]">
                          {item.tag.slice(0, 5).toUpperCase()}
                        </span>
                        <span>
                          <b className="block text-sm leading-5 text-slate-800 transition group-hover:text-[var(--brand-soft)]">
                            {item.title}
                          </b>
                          <span className="mt-1 block text-xs leading-5 text-slate-500">{item.excerpt}</span>
                        </span>
                      </Link>
                    ))}
              </div>
              <Link
                href={ROUTES.berita}
                className="flex items-center justify-center gap-1 border-t border-slate-200 bg-slate-50 px-4 py-3 text-xs font-bold tracking-wide text-[var(--brand)] hover:text-[var(--accent-text)]"
              >
                LIHAT SEMUA PENGUMUMAN <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* Sambutan */}
          <div className="lg:col-span-7">
            <div className="border border-slate-200 bg-white p-6 sm:p-8">
              <div className="flex items-center gap-3 border-b-2 border-[var(--accent)] pb-4">
                <h2 className="font-school-heading text-xl font-bold text-[var(--brand)]">{SAMBUTAN.heading}</h2>
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              </div>
              <div className="mt-7 grid gap-6 sm:grid-cols-[150px_1fr]">
                <div>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-slate-100">
                    <Image
                      src={SAMBUTAN.principalImage}
                      alt={SAMBUTAN.principalName}
                      fill
                      sizes="150px"
                      className="object-cover"
                    />
                  </div>
                  <p className="mt-3 text-sm font-bold text-slate-900">{school?.principal_name || SAMBUTAN.principalName}</p>
                  <p className="text-xs font-semibold text-[var(--accent-text)]">{SAMBUTAN.principalRole}</p>
                </div>
                <div className="text-sm leading-7 text-slate-600">
                  <p className="font-semibold text-slate-800">{SAMBUTAN.greeting}</p>
                  {school?.description ? (
                    <p className="mt-3">{school.description}</p>
                  ) : (
                    SAMBUTAN.paragraphs.map((p) => <p key={p} className="mt-3">{p}</p>)
                  )}
                  <Link
                    href={SAMBUTAN.cta.href}
                    className="mt-5 inline-flex items-center gap-1 border-b-2 border-[var(--accent)] pb-1 text-xs font-bold text-[var(--brand)]"
                  >
                    {SAMBUTAN.cta.label.toUpperCase()} <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4.2 — Keunggulan Sekolah */}
      <div id="keunggulan" className="narrative-section">
        <KeunggulanSection />
      </div>

      {/* 4.3 — Statistik */}
      <section id="statistik" className="narrative-section border-b border-slate-200 bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent-text)]">Statistik</p>
            <h2 className="font-school-heading mt-4 text-4xl font-bold leading-tight tracking-[-0.03em] text-[var(--brand)] sm:text-5xl">
              {STATISTIK.title}
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600">{STATISTIK.description}</p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden border border-slate-200 bg-slate-200 sm:grid-cols-4">
            {STATISTIK.items.map((item) => (
              <div key={item.label} className="bg-white p-6 sm:p-8">
                <p className="font-school-heading text-4xl font-extrabold tracking-[-0.03em] text-[var(--brand)] sm:text-5xl">
                  {item.value}
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-700">{item.label}</p>
                {/* Wajib: tahun & sumber data */}
                <p className="mt-2 text-[11px] leading-4 text-slate-500">
                  {item.year} · {item.source}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href={STATISTIK.cta.href}
              className="home-link inline-flex items-center gap-2 border-b-2 border-[var(--accent)] pb-1 text-sm font-bold text-[var(--brand)]"
            >
              {STATISTIK.cta.label.toUpperCase()} <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4.4 — Semua Jurusan */}
      <section id="jurusan" className="narrative-section border-b border-slate-200 bg-[var(--surface-muted)] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent-text)]">Program Keahlian</p>
            <h2 className="font-school-heading mt-4 text-4xl font-bold leading-tight tracking-[-0.03em] text-[var(--brand)] sm:text-5xl">
              {JURUSAN_SECTION.title}
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600">{JURUSAN_SECTION.description}</p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {jurusanItems.map((jurusan) => {
              const Icon = JURUSAN_ICONS[jurusan.icon] ?? Code2;
              const logo = getJurusanLogo512(jurusan.slug);
              return (
                <article
                  key={jurusan.key}
                  className="group flex flex-col border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-[var(--brand)] hover:shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    {logo ? (
                      <span className="flex h-16 w-16 items-center justify-center">
                        <Image
                          src={logo}
                          alt={`Logo ${jurusan.name}`}
                          width={64}
                          height={64}
                          unoptimized
                          className="h-16 w-16 object-contain"
                        />
                      </span>
                    ) : (
                      <span className="flex h-12 w-12 items-center justify-center bg-[var(--brand)] text-white">
                        <Icon className="h-6 w-6" />
                      </span>
                    )}
                    <span className="text-xs font-bold tracking-widest text-slate-400">{jurusan.code}</span>
                  </div>
                  <h3 className="font-school-heading mt-5 text-xl font-bold leading-snug text-[var(--brand)]">
                    {jurusan.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{jurusan.description}</p>
                  <Link
                    href={`/jurusan/${jurusan.slug}`}
                    className="mt-6 inline-flex w-fit items-center gap-1 text-sm font-bold text-[var(--brand)] transition group-hover:text-[var(--accent-text)]"
                  >
                    Lihat Detail <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </article>
              );
            })}
          </div>

          <div className="mt-12">
            <Link
              href={JURUSAN_SECTION.cta.href}
              className="home-link inline-flex items-center gap-2 border-b-2 border-[var(--accent)] pb-1 text-sm font-bold text-[var(--brand)]"
            >
              {JURUSAN_SECTION.cta.label.toUpperCase()} <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4.5 — Cara Belajar */}
      <CaraBelajarSection />

      {/* 4.6 — Portofolio & Mitra */}
      <PortofolioMitraSection />

      {/* 4.7 — Kegiatan Terbaru */}
      <section id="kegiatan" className="narrative-section border-b border-slate-200 bg-[var(--brand)] py-20 text-white sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-6 border-b border-white/15 pb-8 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent)]">Kegiatan Terbaru</p>
              <h2 className="font-school-heading mt-4 text-4xl font-bold leading-tight tracking-[-0.03em] sm:text-5xl">
                {KEGIATAN.title}
              </h2>
              <p className="mt-6 text-base leading-7 text-white/85">{KEGIATAN.description}</p>
            </div>
            <Link
              href={KEGIATAN.cta.href}
              className="shrink-0 inline-flex items-center gap-2 border-b-2 border-[var(--accent)] pb-1 text-sm font-bold text-white transition hover:text-[var(--accent)]"
            >
              {KEGIATAN.cta.label.toUpperCase()} <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {(newsList.length > 0
              ? newsList.map((item) => ({
                  id: String(item.id),
                  tag: 'BERITA',
                  title: item.title,
                  date: item.published_at ?? '',
                  excerpt: item.excerpt || (item.body ? item.body.substring(0, 100) + '…' : ''),
                  href: item.slug ? `/berita/${item.slug}` : ROUTES.berita,
                }))
              : KEGIATAN.fallbackItems
            ).map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="group border border-white/15 bg-white/[0.04] p-6 transition hover:border-[var(--accent)] hover:bg-white/[0.07]"
              >
                <div className="flex items-center gap-3 text-[10px] font-bold tracking-[0.15em] text-[var(--accent)]">
                  <span>{item.tag.toUpperCase()}</span>
                  {item.date ? (
                    <span className="flex items-center gap-1 text-white/60">
                      <Calendar className="h-3 w-3" />
                      {formatDate(item.date)}
                    </span>
                  ) : null}
                </div>
                <h3 className="font-school-heading mt-4 text-xl font-semibold leading-snug line-clamp-2">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300 line-clamp-3">{item.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-1 text-xs font-bold text-[var(--accent)]">
                  BACA SELENGKAPNYA <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4.8 — Jejak Alumni */}
      <JejakAlumniSection />

      {/* 4.9 — Penutup / Ajakan */}
      <PenutupSection />

      {/* 4.10 — PPDB di Beranda */}
      <section id="ppdb" className="narrative-section bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-10 border-y border-slate-300 py-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent-text)]">PPDB</p>
                <span className="inline-flex items-center gap-2 border border-emerald-600/30 bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                  {ppdb?.is_active ? 'PENDAFTARAN DIBUKA' : PPDB_BERANDA.status.toUpperCase()}
                </span>
              </div>
              <h2 className="font-school-heading mt-4 max-w-2xl text-4xl font-bold leading-tight tracking-[-0.03em] text-[var(--brand)] sm:text-5xl">
                {PPDB_BERANDA.title}
              </h2>
              <p className="mt-5 max-w-xl text-base leading-6 text-slate-600">{PPDB_BERANDA.description}</p>

              <dl className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="border-l-2 border-[var(--accent)] pl-4">
                  <dt className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500">Gelombang aktif</dt>
                  <dd className="font-school-heading mt-1 text-lg font-bold text-[var(--brand)]">{PPDB_BERANDA.wave}</dd>
                </div>
                <div className="border-l-2 border-[var(--accent)] pl-4">
                  <dt className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500">Batas pendaftaran</dt>
                  <dd className="font-school-heading mt-1 text-lg font-bold text-[var(--brand)]">{PPDB_BERANDA.deadline}</dd>
                </div>
              </dl>
            </div>

            <div className="border border-slate-200 bg-[var(--surface-muted)] p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500">Persyaratan</p>
              <ul className="mt-4 space-y-2.5 text-sm leading-6 text-slate-700">
                {PPDB_BERANDA.requirements.map((req) => (
                  <li key={req} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-slate-200 pt-4 text-xs leading-5 text-slate-500">{PPDB_BERANDA.statusCheckNote}</p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={PPDB_BERANDA.cta.href}
                  className="inline-flex flex-1 items-center justify-center gap-2 bg-[var(--brand)] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[var(--brand-soft)]"
                >
                  {PPDB_BERANDA.cta.label} <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link
                  href={PPDB_BERANDA.ctaSecondary.href}
                  className="inline-flex flex-1 items-center justify-center gap-2 border border-[var(--brand)] px-6 py-3.5 text-sm font-bold text-[var(--brand)] transition hover:bg-[var(--brand)] hover:text-white"
                >
                  {PPDB_BERANDA.ctaSecondary.label}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
