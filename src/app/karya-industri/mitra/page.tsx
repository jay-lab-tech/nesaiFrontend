import Link from 'next/link';
import { ArrowUpRight, Building2, Handshake, FileBadge, Users, Target, HeartHandshake } from 'lucide-react';
import { PageHero } from '@/components/site/PageHero';
import { ROUTES } from '@/lib/site-data';

/**
 * Halaman statis Mitra Industri.
 *
 * ⚠️  Nama mitra dan angka di bawah adalah DUMMY untuk keperluan tampilan.
 *     Wajib diganti dengan daftar mitra resmi (MoU) sebelum tayang.
 */

const PARTNER_STATS = [
  { value: '50+', label: 'Mitra Aktif', icon: Building2 },
  { value: '300+', label: 'Siswa Magang/Tahun', icon: Users },
  { value: '85%', label: 'Tingkat Penyerapan', icon: FileBadge },
];

const PARTNERS = [
  { name: 'PT Telkom Indonesia', industry: 'Telekomunikasi', majors: ['TKJ', 'RPL'] },
  { name: 'PT Astra International', industry: 'Otomotif & Teknologi', majors: ['TOI', 'TKJ'] },
  { name: 'Google Cloud Indonesia', industry: 'Cloud Computing', majors: ['RPL', 'TKJ'] },
  { name: 'Tokopedia (GoTo)', industry: 'E-Commerce & Fintech', majors: ['RPL', 'BDP'] },
  { name: 'Bank BRI', industry: 'Perbankan', majors: ['AKL'] },
  { name: 'PT Indosat Ooredoo', industry: 'Telekomunikasi', majors: ['TKJ'] },
  { name: 'Studio Antelope', industry: 'Animasi & Media', majors: ['DKV'] },
  { name: 'Ruangguru', industry: 'Edtech', majors: ['RPL', 'DKV'] },
];

const BENEFITS = [
  {
    icon: Users,
    title: 'Sumber daya terampil',
    desc: 'Akses ke siswa dan lulusan yang terlatih sesuai kebutuhan dunia usaha dan dunia industri.',
  },
  {
    icon: Target,
    title: 'Program terarah',
    desc: 'Kolaborasi kurikulum, kelas industri, PKL, dan sertifikasi kompetensi yang relevan.',
  },
  {
    icon: HeartHandshake,
    title: 'Kemitraan berkelanjutan',
    desc: 'Hubungan jangka panjang melalui MoU, penyerapan kerja, dan pengembangan bersama.',
  },
];

export default function MitraPage() {
  return (
    <main className="bg-[#f8faf8] text-[#172b3a]">
      <PageHero
        eyebrow="Mitra Industri"
        title="Tumbuh bersama dunia industri."
        description="Kemitraan SMKN 1 Subang dengan dunia usaha dan dunia industri (DUDI) untuk praktik kerja lapangan, sertifikasi, hingga penyerapan lulusan."
        image="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2200&q=90"
      />

      {/* Stats */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-3 divide-x divide-slate-200 px-5 sm:px-8">
          {PARTNER_STATS.map(({ value, label, icon: Icon }) => (
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

      {/* Manfaat bermitra */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="mb-12 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#657c7d]">
            Mengapa bermitra
          </p>
          <h2 className="mt-5 font-school-heading text-4xl leading-tight sm:text-5xl">
            Manfaat menjadi mitra industri.
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {BENEFITS.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="border border-slate-200 bg-white p-7">
              <div className="flex h-12 w-12 items-center justify-center bg-slate-100 text-[#0f1e36]">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-school-heading mt-5 text-xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#5d6a6e]">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Daftar mitra */}
      <section className="border-t border-[#d9e2de] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#657c7d]">
                Jejaring mitra
              </p>
              <h2 className="mt-5 font-school-heading text-4xl leading-tight sm:text-5xl">
                Sebagian mitra industri kami.
              </h2>
            </div>
            <Link
              href={ROUTES.kontak}
              className="inline-flex shrink-0 items-center gap-2 bg-[#0f1e36] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1e355b]"
            >
              Jadilah mitra
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PARTNERS.map((partner) => (
              <div
                key={partner.name}
                className="rounded-xl border border-slate-200 bg-[#f8faf8] p-5 transition hover:border-slate-300 hover:shadow-lg"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                    <Handshake className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#0f1e36]">{partner.name}</p>
                    <p className="text-xs text-slate-500">{partner.industry}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {partner.majors.map((m) => (
                    <span
                      key={m}
                      className="rounded-md border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-10 border-l-2 border-amber-400 bg-amber-50 px-4 py-3 text-sm leading-6 text-[#5c4820]">
            Daftar mitra di atas merupakan contoh tampilan dan akan disesuaikan dengan data MoU
            resmi sekolah.
          </p>
        </div>
      </section>
    </main>
  );
}
