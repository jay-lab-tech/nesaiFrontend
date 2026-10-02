import Link from 'next/link';
import { ArrowUpRight, Users, GraduationCap, Briefcase, Building2 } from 'lucide-react';
import { PageHero } from '@/components/site/PageHero';
import { ROUTES } from '@/lib/site-data';

/**
 * Halaman statis Data Alumni.
 *
 * ⚠️  Nama, jabatan, dan angka di bawah adalah DUMMY untuk keperluan tampilan.
 *     Wajib diganti dengan data alumni terverifikasi sebelum tayang.
 */

const ALUMNI_STATS = [
  { value: '3.200+', label: 'Alumni Terdata', icon: Users },
  { value: '78%', label: 'Bekerja/Wirausaha', icon: Briefcase },
  { value: '42', label: 'Mitra Penyerap', icon: Building2 },
];

const TESTIMONIALS = [
  {
    name: 'Ahmad Rizki',
    year: 'Lulusan 2020',
    role: 'Software Engineer di perusahaan teknologi',
    major: 'Rekayasa Perangkat Lunak',
    quote:
      'Berkat pondasi logika pemrograman dan pengalaman membuat aplikasi full-stack, saya siap bersaing di industri teknologi.',
  },
  {
    name: 'Siti Nurhaliza',
    year: 'Lulusan 2019',
    role: 'Wirausaha Kuliner',
    major: 'Kuliner',
    quote:
      'Praktik di unit produksi sekolah mengajarkan saya mengelola rasa, biaya, dan pelayanan pelanggan sejak dini.',
  },
  {
    name: 'Bagas Pratama',
    year: 'Lulusan 2021',
    role: 'Teknisi Otomasi Industri',
    major: 'Teknik Otomasi Industri',
    quote:
      'Pembelajaran berbasis PLC dan robotika membuat saya cepat beradaptasi saat masuk dunia kerja.',
  },
];

export default function AlumniPage() {
  return (
    <main className="bg-[#f8faf8] text-[#172b3a]">
      <PageHero
        eyebrow="Data Alumni"
        title="Lulusan yang terus berkarya."
        description="Jejak lulusan SMKN 1 Subang yang bekerja, berwirausaha, dan melanjutkan pendidikan. Data alumni menjadi jembatan antara sekolah, siswa, dan dunia industri."
        image="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=2200&q=90"
      />

      {/* Stats */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-3 divide-x divide-slate-200 px-5 sm:px-8">
          {ALUMNI_STATS.map(({ value, label, icon: Icon }) => (
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

      {/* Kisah alumni */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="mb-12 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#657c7d]">
            Kisah alumni
          </p>
          <h2 className="mt-5 font-school-heading text-4xl leading-tight sm:text-5xl">
            Langkah baru setelah lulus.
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {TESTIMONIALS.map((alumni) => (
            <article
              key={alumni.name}
              className="flex flex-col border border-slate-200 bg-white p-7"
            >
              <GraduationCap className="h-7 w-7 text-amber-600" />
              <p className="mt-5 flex-1 text-base leading-7 text-[#3c4a52]">“{alumni.quote}”</p>
              <div className="mt-6 border-t border-slate-200 pt-5">
                <p className="font-bold text-[#0f1e36]">{alumni.name}</p>
                <p className="text-sm text-slate-600">{alumni.role}</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-slate-400">
                  {alumni.major} · {alumni.year}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA pendataan */}
      <section className="bg-[#0f1e36] py-14 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 sm:px-8 lg:flex-row lg:items-center">
          <div>
            <h2 className="font-school-heading text-2xl font-semibold sm:text-3xl">
              Kamu alumni SMKN 1 Subang?
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
              Bantu sekolah mendata dan memperbarui data alumni. Ceritakan juga perjalananmu agar
              menginspirasi adik-adik kelas.
            </p>
          </div>
          <Link
            href={ROUTES.kontak}
            className="inline-flex shrink-0 items-center gap-2 bg-amber-400 px-5 py-3 text-sm font-bold text-[#0f1e36] transition hover:bg-amber-300"
          >
            Kirim data alumni
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
