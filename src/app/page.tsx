'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Bell, ChevronRight } from 'lucide-react';
import { HeroSection } from '@/components/home/HeroSection';
import { publicService, unwrapList, unwrapItem } from '@/lib/api/public-endpoints';
import type { School, Major, News, Ppdb } from '@/types/cms';

const DEFAULT_ANNOUNCEMENTS = [
  { tag: 'INFO', title: 'Informasi penerimaan peserta didik baru', desc: 'Jadwal dan ketentuan akan diperbarui melalui kanal resmi sekolah.' },
  { tag: 'LAYANAN', title: 'Layanan informasi akademik dan sekolah', desc: 'Temukan informasi jurusan, fasilitas, dan layanan sekolah dalam satu portal.' },
  { tag: 'NESAI', title: 'Asisten informasi sekolah', desc: 'NESAI akan membantu menjawab pertanyaan umum seputar SMKN 1 Subang.' },
];

const DEFAULT_PROGRAMS = [
  { code: '01', name: 'Akuntansi dan Keuangan Lembaga', slug: 'akl' },
  { code: '02', name: 'Pemasaran', slug: 'bdp' },
  { code: '03', name: 'Manajemen Perkantoran dan Layanan Bisnis', slug: 'mplb' },
  { code: '04', name: 'Pengembangan Perangkat Lunak dan Gim', slug: 'rpl' },
  { code: '05', name: 'Teknik Jaringan Komputer dan Telekomunikasi', slug: 'tkj' },
  { code: '06', name: 'Desain Komunikasi Visual', slug: 'dkv' },
];

const DEFAULT_NEWS = [
  { title: 'Informasi sekolah', desc: 'Informasi dan pengumuman resmi akan dipublikasikan pada halaman berita.', tag: 'Berita', slug: '' },
  { title: 'Program keahlian', desc: 'Kenali pilihan bidang keahlian dan fasilitas praktik yang tersedia.', tag: 'Jurusan', slug: '' },
  { title: 'Penerimaan peserta didik baru', desc: 'Pantau pembaruan prosedur dan ketentuan PPDB melalui kanal resmi.', tag: 'PPDB', slug: '' },
];

export default function HomePage() {
  const [school, setSchool] = useState<School | null>(null);
  const [majors, setMajors] = useState<Major[]>([]);
  const [newsList, setNewsList] = useState<News[]>([]);
  const [ppdb, setPpdb] = useState<Ppdb | null>(null);

  useEffect(() => {
    // 1. Fetch school profile
    publicService.getSchool()
      .then((res) => {
        const item = unwrapItem<School>(res);
        if (item) setSchool(item);
      })
      .catch(() => {});

    // 2. Fetch majors
    publicService.getMajors({ per_page: 10 })
      .then((res) => {
        const list = unwrapList<Major>(res);
        if (list.length > 0) setMajors(list);
      })
      .catch(() => {});

    // 3. Fetch latest news
    publicService.getNews({ per_page: 3 })
      .then((res) => {
        const list = unwrapList<News>(res);
        if (list.length > 0) setNewsList(list);
      })
      .catch(() => {});

    // 4. Fetch PPDB status
    publicService.getPpdb()
      .then((res) => {
        const item = unwrapItem<Ppdb>(res);
        if (item) setPpdb(item);
      })
      .catch(() => {});
  }, []);

  const studentCount = school?.student_count ? school.student_count.toLocaleString('id-ID') : '2.589';
  const staffCount = school?.staff_count ? school.staff_count.toLocaleString('id-ID') : '159';
  const classroomCount = school?.classroom_count ? String(school.classroom_count) : '50–52';
  const majorCount = majors.length > 0 ? String(majors.length) : '10';
  const principalName = school?.principal_name || 'Walyati Retnoningsih, S.Si., M.AP';

  return (
    <main className="bg-[#f8fafc] text-[#172b3a] selection:bg-[#e7ae32] selection:text-[#172b3a]">
      <HeroSection />

      {/* Pengumuman & Sambutan Kepala Sekolah */}
      <section className="border-b border-slate-200 bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="overflow-hidden border border-slate-200 bg-white shadow-[0_10px_25px_-15px_rgba(15,30,54,0.18)]">
              <div className="flex items-center justify-between bg-[#0f1e36] px-5 py-4 text-white">
                <span className="flex items-center gap-2 text-sm font-bold tracking-wide">
                  <Bell className="h-4 w-4 text-amber-400" /> PENGUMUMAN SEKOLAH
                </span>
                <span className="bg-amber-400 px-2 py-0.5 text-[10px] font-bold text-[#0f1e36]">TERKINI</span>
              </div>
              <div className="divide-y divide-slate-100">
                {newsList.length > 0
                  ? newsList.slice(0, 3).map((item, idx) => (
                      <Link
                        key={item.id || idx}
                        href={item.slug ? `/berita/${item.slug}` : '/berita'}
                        className="group flex gap-3 p-4 transition hover:bg-slate-50"
                      >
                        <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center border border-slate-200 bg-slate-50 text-[9px] font-bold tracking-wide text-[#315e68]">
                          {idx === 0 ? 'INFO' : idx === 1 ? 'BERITA' : 'AGENDA'}
                        </span>
                        <span>
                          <b className="block text-sm leading-5 text-slate-800 transition group-hover:text-[#315e68]">
                            {item.title}
                          </b>
                          <span className="mt-1 block text-xs leading-5 text-slate-500 line-clamp-2">
                            {item.excerpt || 'Klik untuk membaca informasi lengkap.'}
                          </span>
                        </span>
                      </Link>
                    ))
                  : DEFAULT_ANNOUNCEMENTS.map((item) => (
                      <Link key={item.tag} href="/berita" className="group flex gap-3 p-4 transition hover:bg-slate-50">
                        <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center border border-slate-200 bg-slate-50 text-[9px] font-bold tracking-wide text-[#315e68]">
                          {item.tag}
                        </span>
                        <span>
                          <b className="block text-sm leading-5 text-slate-800 transition group-hover:text-[#315e68]">
                            {item.title}
                          </b>
                          <span className="mt-1 block text-xs leading-5 text-slate-500">{item.desc}</span>
                        </span>
                      </Link>
                    ))}
              </div>
              <Link
                href="/berita"
                className="flex items-center justify-center gap-1 border-t border-slate-200 bg-slate-50 px-4 py-3 text-xs font-bold tracking-wide text-[#0f1e36] hover:text-amber-700"
              >
                LIHAT SEMUA PENGUMUMAN <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="border border-slate-200 bg-white p-6 sm:p-8">
              <div className="flex items-center gap-3 border-b-2 border-amber-400 pb-4">
                <h2 className="font-school-heading text-xl font-bold text-[#0f1e36]">Sambutan Kepala Sekolah</h2>
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              </div>
              <div className="mt-7 grid gap-6 sm:grid-cols-[150px_1fr]">
                <div>
                  <div
                    className="aspect-[3/4] bg-cover bg-center rounded-lg shadow-sm"
                    style={{
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80')",
                    }}
                  />
                  <p className="mt-3 text-sm font-bold text-slate-900">{principalName}</p>
                  <p className="text-xs font-semibold text-amber-700">Kepala SMKN 1 Subang</p>
                </div>
                <div className="text-sm leading-7 text-slate-600">
                  <p className="font-semibold text-slate-800">Assalamu’alaikum Warahmatullahi Wabarakatuh,</p>
                  <p className="mt-3">
                    {school?.description
                      ? school.description
                      : 'Selamat datang di portal SMKN 1 Subang. Portal ini dirancang untuk memudahkan siswa, orang tua, calon peserta didik, dan masyarakat menemukan informasi sekolah secara jelas dan terarah.'}
                  </p>
                  <p className="mt-3">
                    Kami terus mengembangkan pendidikan vokasi yang membangun karakter, keterampilan, serta kesiapan
                    untuk beradaptasi dengan perubahan zaman.
                  </p>
                  <Link
                    href="/profil"
                    className="mt-5 inline-flex items-center gap-1 border-b-2 border-amber-400 pb-1 text-xs font-bold text-[#0f1e36]"
                  >
                    BACA PROFIL SEKOLAH <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vokasi Relevan & Fasilitas */}
      <section className="border-b border-slate-200 bg-slate-50 py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">Vokasi yang relevan</p>
            <h2 className="font-school-heading mt-4 text-4xl font-bold leading-tight tracking-[-0.03em] text-[#0f1e36] sm:text-5xl">
              Jejak kemitraan strategis dan pembelajaran berbasis praktik.
            </h2>
            <p className="mt-6 max-w-md text-base leading-7 text-slate-600">
              Pembelajaran di SMKN 1 Subang menghubungkan pengetahuan di kelas, kegiatan laboratorium, dan kesiapan
              memasuki dunia kerja.
            </p>
            <Link
              href="/fasilitas"
              className="home-link mt-8 inline-flex items-center gap-2 border-b-2 border-amber-400 pb-1 text-sm font-bold text-[#0f1e36]"
            >
              JELAJAHI FASILITAS <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="lg:col-span-7">
            <div className="grid overflow-hidden border border-slate-200 bg-white sm:grid-cols-2">
              <div
                className="min-h-[280px] bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=900&q=85')",
                }}
              />
              <div className="p-7">
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">Pembelajaran vokasi</span>
                <h3 className="font-school-heading mt-4 text-2xl font-bold text-[#0f1e36]">
                  Ruang belajar yang dekat dengan praktik.
                </h3>
                <p className="mt-4 text-sm leading-6 text-slate-600">
                  Laboratorium dan ruang praktik disiapkan untuk mendukung setiap program keahlian.
                </p>
                <div className="mt-7 grid grid-cols-2 gap-3 text-xs text-slate-600">
                  <span className="border-l-2 border-amber-400 pl-3">{majorCount} program keahlian</span>
                  <span className="border-l-2 border-amber-400 pl-3">Laboratorium terintegrasi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistik Sekolah */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-slate-200 px-5 sm:grid-cols-4 sm:px-8">
          {[
            [studentCount, 'SISWA AKTIF'],
            [staffCount, 'TENAGA PENDIDIK'],
            [majorCount, 'PROGRAM KEAHLIAN'],
            [classroomCount, 'RUANG KELAS'],
          ].map(([number, label]) => (
            <div key={label} className="py-8 text-center sm:py-11">
              <b className="font-school-heading block text-3xl font-bold text-[#0f1e36] sm:text-4xl">{number}</b>
              <span className="mt-2 block text-[10px] font-bold tracking-[0.13em] text-slate-500">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Program Keahlian / Jurusan */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">Program keahlian</p>
            <h2 className="font-school-heading mt-4 text-4xl font-bold leading-tight tracking-[-0.03em] text-[#0f1e36]">
              Temukan bidang yang ingin kamu kuasai.
            </h2>
            <p className="mt-5 text-sm leading-7 text-slate-600">
              Pilih bidang yang sesuai minat, lalu pelajari kompetensi dan fasilitas pendukungnya.
            </p>
            <Link
              href="/jurusan"
              className="home-link mt-8 inline-flex items-center gap-2 border-b-2 border-amber-400 pb-1 text-sm font-bold text-[#0f1e36]"
            >
              SEMUA JURUSAN <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="lg:col-span-8">
            <div className="border-t border-slate-300">
              {majors.length > 0
                ? majors.map((major, idx) => (
                    <Link
                      key={major.id || major.slug}
                      href={`/jurusan/${major.slug}`}
                      className="group grid grid-cols-[3rem_1fr_auto] items-center gap-3 border-b border-slate-200 px-1 py-5 transition hover:bg-slate-50"
                    >
                      <span className="text-xs font-semibold text-slate-400">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="font-school-heading text-lg font-semibold text-[#0f1e36] transition group-hover:translate-x-1 sm:text-xl">
                        {major.name}
                      </span>
                      <span className="flex h-8 w-8 items-center justify-center border border-slate-300 text-slate-500 transition group-hover:border-amber-400 group-hover:bg-amber-400 group-hover:text-[#0f1e36]">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </Link>
                  ))
                : DEFAULT_PROGRAMS.map((prog) => (
                    <Link
                      key={prog.code}
                      href={`/jurusan/${prog.slug}`}
                      className="group grid grid-cols-[3rem_1fr_auto] items-center gap-3 border-b border-slate-200 px-1 py-5 transition hover:bg-slate-50"
                    >
                      <span className="text-xs font-semibold text-slate-400">{prog.code}</span>
                      <span className="font-school-heading text-lg font-semibold text-[#0f1e36] transition group-hover:translate-x-1 sm:text-xl">
                        {prog.name}
                      </span>
                      <span className="flex h-8 w-8 items-center justify-center border border-slate-300 text-slate-500 transition group-hover:border-amber-400 group-hover:bg-amber-400 group-hover:text-[#0f1e36]">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </Link>
                  ))}
            </div>
          </div>
        </div>
      </section>

      {/* Kabar Sekolah / Berita */}
      <section className="bg-[#0f1e36] py-20 text-white sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-6 border-b border-white/20 pb-8 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-400">Kabar sekolah</p>
              <h2 className="font-school-heading mt-4 text-3xl font-bold sm:text-4xl">
                Berita, agenda, dan siaran resmi.
              </h2>
            </div>
            <Link
              href="/berita"
              className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-amber-300"
            >
              LIHAT SEMUA BERITA <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {newsList.length > 0
              ? newsList.map((item) => (
                  <Link
                    key={item.id}
                    href={item.slug ? `/berita/${item.slug}` : '/berita'}
                    className="group border border-white/15 bg-white/[0.03] p-5 transition hover:-translate-y-1 hover:border-amber-400 hover:bg-white/[0.06]"
                  >
                    <span className="text-[10px] font-bold tracking-[0.15em] text-amber-400">
                      {item.published_at ? new Date(item.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : 'BERITA TERBARU'}
                    </span>
                    <h3 className="font-school-heading mt-4 text-xl font-semibold leading-snug line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-slate-300 line-clamp-3">
                      {item.excerpt || (item.body ? item.body.substring(0, 100) + '...' : '')}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-1 text-xs font-bold text-amber-300">
                      BACA SELENGKAPNYA <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                ))
              : DEFAULT_NEWS.map((item) => (
                  <Link
                    key={item.title}
                    href="/berita"
                    className="group border border-white/15 bg-white/[0.03] p-5 transition hover:-translate-y-1 hover:border-amber-400 hover:bg-white/[0.06]"
                  >
                    <span className="text-[10px] font-bold tracking-[0.15em] text-amber-400">{item.tag.toUpperCase()}</span>
                    <h3 className="font-school-heading mt-4 text-xl font-semibold leading-snug">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{item.desc}</p>
                    <span className="mt-6 inline-flex items-center gap-1 text-xs font-bold">
                      BACA SELENGKAPNYA <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                ))}
          </div>
        </div>
      </section>

      {/* Penerimaan Peserta Didik Baru (PPDB) */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-8 border-y border-slate-300 px-5 py-12 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">Penerimaan peserta didik baru</p>
              {ppdb?.is_active && (
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                  PENDAFTARAN DIBUKA
                </span>
              )}
            </div>
            <h2 className="font-school-heading mt-4 max-w-2xl text-4xl font-bold leading-tight tracking-[-0.03em] text-[#0f1e36] sm:text-5xl">
              {ppdb?.title || 'Mulai perjalanan belajarmu bersama SMKN 1 Subang.'}
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-6 text-slate-600">
              {ppdb?.description || 'Dapatkan informasi awal tentang program keahlian dan proses penerimaan peserta didik baru.'}
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
