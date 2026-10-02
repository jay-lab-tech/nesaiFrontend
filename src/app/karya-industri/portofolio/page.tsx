import Link from 'next/link';
import { ArrowUpRight, Palette, Package, Store, BadgeCheck } from 'lucide-react';
import { PageHero } from '@/components/site/PageHero';
import { ROUTES } from '@/lib/site-data';

/**
 * Halaman statis Portofolio & BLUD.
 *
 * ⚠️  Data karya, unit usaha, dan angka di bawah adalah DUMMY untuk keperluan
 *     tampilan. Wajib diganti dengan data resmi sekolah sebelum tayang.
 */

const UNIT_STATS = [
  { value: '120+', label: 'Karya & Produk', icon: Package },
  { value: '8', label: 'Unit Produksi', icon: Store },
  { value: '15', label: 'Produk Ber-HAKI', icon: BadgeCheck },
];

const WORKS = [
  {
    title: 'Aplikasi Kasir UMKM',
    major: 'Rekayasa Perangkat Lunak',
    type: 'Produk Digital',
    description: 'Aplikasi point-of-sale sederhana untuk membantu UMKM mencatat transaksi dan stok.',
  },
  {
    title: 'Jaringan WiFi Sekolah',
    major: 'Teknik Komputer & Jaringan',
    type: 'Instalasi',
    description: 'Perancangan dan pemasangan jaringan internet sekolah beserta manajemen bandwidth.',
  },
  {
    title: 'Identitas Visual UMKM',
    major: 'Desain Komunikasi Visual',
    type: 'Desain',
    description: 'Perancangan logo, kemasan, dan materi promosi untuk produk UMKM mitra sekolah.',
  },
  {
    title: 'Robot Lengan Otomatis',
    major: 'Teknik Otomasi Industri',
    type: 'Prototipe',
    description: 'Prototipe lengan robot berbasis mikrokontroler untuk simulasi lini produksi.',
  },
  {
    title: 'Katering & Olahan Kuliner',
    major: 'Kuliner',
    type: 'Produk BLUD',
    description: 'Layanan katering dan produk olahan yang dikelola sebagai unit produksi sekolah.',
  },
  {
    title: 'Sistem Pembukuan Toko',
    major: 'Akuntansi',
    type: 'Produk Digital',
    description: 'Template dan pendampingan laporan keuangan sederhana untuk pelaku usaha kecil.',
  },
];

export default function PortofolioPage() {
  return (
    <main className="bg-[#f8faf8] text-[#172b3a]">
      <PageHero
        eyebrow="Portofolio & BLUD"
        title="Karya siswa yang berguna dan bernilai."
        description="Dokumentasi produk, prototipe, dan layanan hasil pembelajaran berbasis praktik, termasuk unit produksi dan Badan Layanan Umum Daerah (BLUD) SMKN 1 Subang."
        image="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=2200&q=90"
      />

      {/* Stats */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-3 divide-x divide-slate-200 px-5 sm:px-8">
          {UNIT_STATS.map(({ value, label, icon: Icon }) => (
            <div key={label} className="flex items-center justify-center gap-3 py-6">
              <Icon className="hidden h-5 w-5 text-amber-600 sm:block" />
              <div className="text-center sm:text-left">
                <p className="font-school-heading text-2xl font-bold text-[#0f1e36]">{value}</p>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pengantar BLUD */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#657c7d]">
              Unit produksi & BLUD
            </p>
            <h2 className="mt-5 font-school-heading text-4xl leading-tight sm:text-5xl">
              Belajar sambil berkarya, berkarya sambil melayani.
            </h2>
            <p className="mt-5 text-base leading-7 text-[#5d6a6e]">
              Melalui unit produksi dan Badan Layanan Umum Daerah (BLUD), siswa terlibat langsung
              dalam mengerjakan pesanan nyata — dari aplikasi, instalasi jaringan, desain, sampai
              layanan kuliner. Hasilnya bukan hanya nilai, tetapi karya yang dipakai masyarakat.
            </p>
            <Link
              href={ROUTES.kontak}
              className="mt-8 inline-flex items-center gap-2 bg-[#0f1e36] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1e355b]"
            >
              Ajukan pesanan / kerja sama
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { icon: Package, title: 'Produk', desc: 'Barang & prototipe hasil praktik siswa.' },
              { icon: Store, title: 'Layanan', desc: 'Jasa dan pesanan dari mitra & masyarakat.' },
              { icon: BadgeCheck, title: 'Sertifikasi', desc: 'Produk & karya terverifikasi dan sebagian ber-HAKI.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="border border-slate-200 bg-white p-5">
                <Icon className="h-6 w-6 text-amber-600" />
                <h3 className="mt-4 font-school-heading text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#5d6a6e]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Daftar karya */}
      <section className="border-t border-[#d9e2de] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#657c7d]">
              Dokumentasi karya
            </p>
            <h2 className="mt-5 font-school-heading text-4xl leading-tight sm:text-5xl">
              Portofolio karya siswa.
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WORKS.map((work) => (
              <article
                key={work.title}
                className="flex flex-col border border-slate-200 bg-[#f8faf8] p-6 transition hover:border-slate-300 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-blue-700">
                    {work.type}
                  </span>
                  <Palette className="h-4 w-4 text-slate-400" />
                </div>
                <h3 className="font-school-heading mt-4 text-xl font-semibold text-[#0f1e36]">
                  {work.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-[#5d6a6e]">{work.description}</p>
                <p className="mt-4 text-xs uppercase tracking-widest text-slate-400">
                  {work.major}
                </p>
              </article>
            ))}
          </div>

          <p className="mt-10 border-l-2 border-amber-400 bg-amber-50 px-4 py-3 text-sm leading-6 text-[#5c4820]">
            Portofolio ini akan diperbarui dari dokumentasi resmi sekolah. Sebagian karya yang
            tayang merupakan contoh tampilan.
          </p>
        </div>
      </section>
    </main>
  );
}
