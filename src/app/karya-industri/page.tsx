import Link from 'next/link';
import { ArrowUpRight, Palette, Briefcase, Users, Handshake } from 'lucide-react';
import { PageHero } from '@/components/site/PageHero';
import { ROUTES } from '@/lib/site-data';

const SECTION_LINKS = [
  {
    href: ROUTES.portofolio,
    label: 'Portofolio & BLUD',
    description:
      'Dokumentasi karya, produk, dan layanan siswa — termasuk unit produksi dan Badan Layanan Umum Daerah (BLUD) sekolah.',
    icon: Palette,
  },
  {
    href: ROUTES.pkl,
    label: 'PKL & Career Center',
    description:
      'Pusat informasi Praktik Kerja Lapangan, lowongan magang, dan jejaring karier bagi siswa dan lulusan.',
    icon: Briefcase,
  },
  {
    href: ROUTES.alumni,
    label: 'Data Alumni',
    description:
      'Jejak lulusan SMKN 1 Subang yang berkarya dan berkarir di dunia industri maupun melanjutkan pendidikan.',
    icon: Users,
  },
  {
    href: ROUTES.mitra,
    label: 'Mitra Industri',
    description:
      'Kemitraan strategis sekolah dengan dunia usaha dan dunia industri (DUDI) untuk praktik, PKL, dan sertifikasi.',
    icon: Handshake,
  },
];

const HIGHLIGHTS = [
  ['Karya nyata', 'Siswa menghasilkan produk dan layanan dari proses belajar berbasis praktik.'],
  ['Jejaring industri', 'Kemitraan dengan perusahaan untuk magang, sertifikasi, dan penyerapan kerja.'],
  ['Karier lulusan', 'Lulusan siap bekerja, berwirausaha, atau melanjutkan pendidikan tinggi.'],
];

export default function KaryaIndustriPage() {
  return (
    <main className="bg-[#f8faf8] text-[#172b3a]">
      <PageHero
        eyebrow="Karya & Industri"
        title="Dari ruang kelas sampai dunia kerja."
        description="Menghubungkan karya siswa, praktik kerja lapangan, alumni, dan mitra industri dalam satu ruang. Di sini belajar tidak berhenti di teori, tapi menjadi karya yang berguna."
        image="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=2200&q=90"
      />

      {/* Highlights */}
      <section className="bg-[#0f1e36] py-14 text-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:grid-cols-3 sm:px-8">
          {HIGHLIGHTS.map(([title, desc], i) => (
            <div key={title} className="border-l-2 border-amber-400 pl-4">
              <span className="text-xs text-amber-400">0{i + 1}</span>
              <h2 className="font-school-heading mt-2 text-xl font-semibold">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Navigation cards */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="mb-12 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#657c7d]">
            Jelajahi
          </p>
          <h2 className="mt-5 font-school-heading text-4xl leading-tight sm:text-5xl">
            Empat pintu menuju karya dan industri.
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {SECTION_LINKS.map(({ href, label, description, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col justify-between border border-slate-200 bg-white p-7 transition hover:border-slate-300 hover:shadow-lg"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center bg-slate-100 text-[#0f1e36]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-school-heading mt-5 text-2xl font-semibold text-[#0f1e36]">
                  {label}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#5d6a6e]">{description}</p>
              </div>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-[#0f1e36] group-hover:text-amber-700">
                Buka halaman
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
