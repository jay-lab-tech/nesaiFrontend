import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { HeroSection } from '@/components/home/HeroSection';

const PROGRAMS = [
  'Akuntansi dan Keuangan Lembaga',
  'Pemasaran',
  'Manajemen Perkantoran dan Layanan Bisnis',
  'Pengembangan Perangkat Lunak dan Gim',
  'Teknik Jaringan Komputer dan Telekomunikasi',
  'Teknik Otomotif',
  'Desain Komunikasi Visual',
  'Teknik Mesin',
  'Kuliner',
  'Teknik Logistik',
];

const FACILITIES = [
  'Lab RPL', 'Lab TKJ', 'Lab MPLB', 'Lab Pemasaran', 'Lab DKV', 'Lab Otomotif',
  'Lab AKL', 'Lab Kuliner', 'Lab Teknik Mesin', 'Lab Teknik Logistik',
];

export default function HomePage() {
  return (
    <main className="bg-[#f8faf8] text-[#172b3a] selection:bg-[#e7ae32] selection:text-[#172b3a]">
      <HeroSection />

      <section className="border-y border-[#d9e2de] bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[1fr_2fr] lg:gap-16 lg:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#657c7d]">Tentang NESAS</p>
          <div>
            <p className="max-w-3xl font-serif text-3xl leading-tight tracking-[-0.025em] sm:text-4xl">
              SMKN 1 Subang adalah ruang untuk belajar melalui praktik, membangun karakter, dan menemukan bidang keahlian yang tepat.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4 text-sm text-[#5d6a6e]">
              <span><b className="font-semibold text-[#172b3a]">2.589</b> siswa aktif</span>
              <span><b className="font-semibold text-[#172b3a]">159</b> tenaga pendidik</span>
              <span><b className="font-semibold text-[#172b3a]">10</b> program keahlian</span>
              <span><b className="font-semibold text-[#172b3a]">50–52</b> ruang kelas</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20 lg:py-28">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#657c7d]">Program keahlian</p>
          <h2 className="mt-5 font-serif text-4xl leading-none tracking-[-0.035em] sm:text-5xl">Belajar dari apa yang ingin kamu kuasai.</h2>
          <p className="mt-6 max-w-sm text-base leading-7 text-[#5d6a6e]">Setiap program dirancang untuk mempertemukan dasar pengetahuan, latihan praktik, dan kesiapan melangkah setelah lulus.</p>
          <Link href="/jurusan" className="mt-9 inline-flex items-center gap-2 border-b-2 border-[#e7ae32] pb-1 text-sm font-semibold">Lihat seluruh jurusan <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
        <ol className="border-t border-[#b9c7c2]">
          {PROGRAMS.map((program, index) => (
            <li key={program} className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 border-b border-[#d9e2de] py-4 sm:py-5">
              <span className="text-xs tabular-nums text-[#7a908e]">{String(index + 1).padStart(2, '0')}</span>
              <span className="font-serif text-xl leading-tight transition group-hover:translate-x-1 sm:text-2xl">{program}</span>
              <ArrowUpRight className="h-4 w-4 text-[#7a908e] transition group-hover:text-[#172b3a]" />
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-[#dfe9e5] py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-16">
          <div className="min-h-[380px] bg-cover bg-center sm:min-h-[500px]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1400&q=85')" }} />
          <div className="pb-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#657c7d]">Fasilitas belajar</p>
            <h2 className="mt-5 font-serif text-4xl leading-none tracking-[-0.035em] sm:text-5xl">Ruang untuk mencoba dan mencipta.</h2>
            <p className="mt-6 text-base leading-7 text-[#516064]">Kegiatan praktik didukung ruang kelas, laboratorium kejuruan, dan area pembelajaran yang berkembang bersama kebutuhan setiap program.</p>
            <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-3 border-t border-[#aebfba] pt-6 text-sm text-[#33494d]">
              {FACILITIES.map((facility) => <span key={facility} className="border-b border-[#c6d4cf] pb-2">{facility}</span>)}
            </div>
            <Link href="/fasilitas" className="mt-8 inline-flex items-center gap-2 border-b-2 border-[#e7ae32] pb-1 text-sm font-semibold">Jelajahi fasilitas <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid gap-8 border-y border-[#b9c7c2] py-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#657c7d]">Penerimaan peserta didik baru</p>
            <h2 className="mt-5 max-w-2xl font-serif text-4xl leading-none tracking-[-0.035em] sm:text-5xl">Mulai perjalanan belajarmu bersama SMKN 1 Subang.</h2>
          </div>
          <Link href="/ppdb" className="inline-flex w-fit items-center gap-2 bg-[#172b3a] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#2e5661]">Informasi PPDB <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </main>
  );
}
