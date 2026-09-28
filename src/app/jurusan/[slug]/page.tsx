import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, GraduationCap, Briefcase, BookOpen, Users, Building2, Target, Award, Calendar, UserCheck, School } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getJurusan, JURUSAN } from '@/lib/jurusan-data';
import { PageHero } from '@/components/site/PageHero';

export function generateStaticParams() {
  return JURUSAN.map(({ slug }) => ({ slug }));
}

export default async function JurusanDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const jurusan = getJurusan(slug);
  if (!jurusan) notFound();

  return (
    <main className="bg-[#f8faf8] text-[#172b3a]">
      {/* ─── Hero: Pengenalan Jurusan ─── */}
      <PageHero
        eyebrow={jurusan.code}
        title={jurusan.name}
        description={jurusan.description}
        image="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2200&q=90"
      />

      {/* ─── Breadcrumb & Intro ─── */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <Link
          href="/jurusan"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#557d82] transition hover:text-[#172b3a]"
        >
          <ArrowLeft className="h-4 w-4" /> Kembali ke semua jurusan
        </Link>

        {/* Tagline & Intro content */}
        <div className="mt-12 grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">Pengenalan Jurusan</p>
            <h2 className="font-school-heading mt-4 text-3xl font-bold leading-tight text-[#0f1e36]">
              {jurusan.tagline}
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-600">{jurusan.description}</p>
            <p className="mt-4 text-base leading-7 text-slate-600">{jurusan.focus}</p>

            <Link
              href="/ppdb"
              className="mt-8 inline-flex items-center gap-2 bg-[#0f1e36] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1e355b]"
            >
              Daftar Sekarang <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Quick stats */}
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: Calendar, label: 'Tahun Berdiri', value: jurusan.profil.tahunBerdiri },
              { icon: Award, label: 'Akreditasi', value: jurusan.profil.akreditasi },
              { icon: Users, label: 'Jumlah Siswa', value: `${jurusan.profil.jumlahSiswa} Siswa` },
              { icon: School, label: 'Jumlah Kelas', value: `${jurusan.profil.jumlahKelas} Kelas` },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="border border-slate-200 bg-white p-5 transition hover:shadow-md">
                <Icon className="h-5 w-5 text-amber-600" />
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">{label}</p>
                <p className="font-school-heading mt-1 text-2xl font-bold text-[#0f1e36]">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Kompetensi Keahlian ─── */}
      <section className="border-y border-slate-200 bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex items-center gap-3 mb-2">
            <Target className="h-5 w-5 text-amber-600" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">Kompetensi Keahlian</p>
          </div>
          <h2 className="font-school-heading text-4xl font-bold leading-tight text-[#0f1e36] sm:text-5xl">
            Keahlian yang akan kamu kuasai.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
            Setiap kompetensi dirancang sesuai kebutuhan industri agar kamu siap bersaing di dunia kerja.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {jurusan.kompetensi.map((item, index) => (
              <div
                key={item.judul}
                className="group border border-slate-200 p-6 transition hover:-translate-y-1 hover:border-amber-400 hover:shadow-lg"
              >
                <span className="text-xs font-semibold text-slate-400">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="font-school-heading mt-3 text-xl font-bold text-[#0f1e36] transition group-hover:text-amber-700">
                  {item.judul}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.deskripsi}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Profil Jurusan ─── */}
      <section className="bg-[#0f1e36] py-20 text-white sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <GraduationCap className="h-5 w-5 text-amber-400" />
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">Profil Jurusan</p>
              </div>
              <h2 className="font-school-heading text-4xl font-bold leading-tight sm:text-5xl">
                Visi dan misi program keahlian.
              </h2>
            </div>

            <div>
              {/* Visi */}
              <div className="border-l-2 border-amber-400 pl-6">
                <h3 className="font-school-heading text-lg font-bold text-amber-400">Visi</h3>
                <p className="mt-3 text-base leading-7 text-white/85">{jurusan.profil.visi}</p>
              </div>

              {/* Misi */}
              <div className="mt-10 border-l-2 border-amber-400 pl-6">
                <h3 className="font-school-heading text-lg font-bold text-amber-400">Misi</h3>
                <ul className="mt-4 space-y-4">
                  {jurusan.profil.misi.map((item, index) => (
                    <li key={index} className="flex gap-3 text-sm leading-6 text-white/85">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center border border-amber-400/40 text-xs font-bold text-amber-400">
                        {index + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Peluang Karir ─── */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <div className="flex items-center gap-3 mb-2">
                <Briefcase className="h-5 w-5 text-amber-600" />
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">Peluang Karir</p>
              </div>
              <h2 className="font-school-heading text-4xl font-bold leading-tight text-[#0f1e36] sm:text-5xl">
                Prospek karier setelah lulus.
              </h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-slate-600">
                Lulusan program keahlian {jurusan.name} memiliki peluang karir yang luas di berbagai sektor industri.
              </p>
            </div>

            <div className="border-t border-slate-300">
              {jurusan.peluangKarir.map((karir) => (
                <div
                  key={karir.posisi}
                  className="group grid gap-3 border-b border-slate-200 px-2 py-6 transition hover:bg-white sm:grid-cols-[1fr_auto]"
                >
                  <div>
                    <h3 className="font-school-heading text-xl font-bold text-[#0f1e36] transition group-hover:translate-x-1">
                      {karir.posisi}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{karir.deskripsi}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="inline-flex items-center gap-1 border border-amber-400 bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-800">
                      {karir.gajiRange}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Mata Pelajaran ─── */}
      <section className="border-y border-slate-200 bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="h-5 w-5 text-amber-600" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">Mata Pelajaran Kejuruan</p>
          </div>
          <h2 className="font-school-heading text-4xl font-bold leading-tight text-[#0f1e36] sm:text-5xl">
            Kurikulum yang kamu pelajari.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
            Mata pelajaran disusun secara bertahap dari dasar hingga lanjutan selama 3 tahun masa studi.
          </p>

          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {jurusan.mataPelajaran.map((semester) => (
              <div key={semester.semester} className="border border-slate-200 bg-slate-50/50">
                <div className="bg-[#0f1e36] px-5 py-4">
                  <h3 className="font-school-heading text-sm font-bold text-white">{semester.semester}</h3>
                </div>
                <ul className="divide-y divide-slate-200 px-5">
                  {semester.pelajaran.map((pelajaran, index) => (
                    <li key={pelajaran} className="flex items-center gap-3 py-4 text-sm text-slate-700">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center border border-amber-400 text-[10px] font-bold text-amber-700">
                        {index + 1}
                      </span>
                      {pelajaran}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Guru Mata Pelajaran Kejuruan ─── */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex items-center gap-3 mb-2">
            <UserCheck className="h-5 w-5 text-amber-600" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">Guru Mata Pelajaran Kejuruan</p>
          </div>
          <h2 className="font-school-heading text-4xl font-bold leading-tight text-[#0f1e36] sm:text-5xl">
            Tim pengajar yang berpengalaman.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
            Didukung oleh tenaga pendidik profesional yang kompeten di bidangnya masing-masing.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {jurusan.guru.map((guru) => (
              <div
                key={guru.nama}
                className="group border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Avatar placeholder */}
                <div className="flex h-48 items-center justify-center bg-gradient-to-br from-[#0f1e36] to-[#1e3a5f]">
                  <span className="font-school-heading text-5xl font-bold text-white/20">
                    {guru.nama.charAt(0)}
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-amber-700">
                    {guru.jabatan}
                  </p>
                  <h3 className="font-school-heading mt-2 text-lg font-bold leading-snug text-[#0f1e36]">
                    {guru.nama}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-slate-600">{guru.bidang}</p>
                  <p className="mt-1 text-[10px] font-semibold text-slate-400">{guru.pendidikan}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Perusahaan yang Bekerja Sama ─── */}
      <section className="border-t border-slate-200 bg-[#0f1e36] py-20 text-white sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex items-center gap-3 mb-2">
            <Building2 className="h-5 w-5 text-amber-400" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">Perusahaan Mitra</p>
          </div>
          <h2 className="font-school-heading text-4xl font-bold leading-tight sm:text-5xl">
            Kemitraan dengan dunia industri.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/75">
            Bekerjasama dengan perusahaan terkemuka untuk program magang, sertifikasi, dan peluang karir bagi siswa.
          </p>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {jurusan.perusahaan.map((perusahaan) => (
              <div
                key={perusahaan.nama}
                className="group border border-white/15 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-amber-400 hover:bg-white/[0.06]"
              >
                <span className="text-[10px] font-bold tracking-[0.15em] text-amber-400">
                  {perusahaan.bidang.toUpperCase()}
                </span>
                <h3 className="font-school-heading mt-3 text-lg font-bold leading-snug">{perusahaan.nama}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{perusahaan.deskripsi}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Bottom ─── */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-8 border-y border-slate-300 px-5 py-12 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">
              Tertarik dengan {jurusan.name}?
            </p>
            <h2 className="font-school-heading mt-4 max-w-2xl text-4xl font-bold leading-tight tracking-[-0.03em] text-[#0f1e36] sm:text-5xl">
              Bergabung dan mulai perjalanan belajarmu.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-6 text-slate-600">
              Dapatkan informasi lengkap tentang prosedur penerimaan peserta didik baru untuk program keahlian {jurusan.name}.
            </p>
          </div>
          <Link
            href="/ppdb"
            className="inline-flex items-center justify-center gap-2 bg-[#0f1e36] px-6 py-4 text-sm font-bold text-white transition hover:-translate-y-1 hover:bg-[#1e355b] hover:shadow-lg"
          >
            INFORMASI PPDB <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}