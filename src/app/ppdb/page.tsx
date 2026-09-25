'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Calendar, FileText, AlertCircle, ArrowUpRight } from 'lucide-react';
import { PageHero } from '@/components/site/PageHero';
import { publicService, unwrapItem } from '@/lib/api/public-endpoints';
import type { Ppdb, PpdbScheduleItem } from '@/types/cms';

const DEFAULT_REQUIREMENTS = [
  'Ijazah SMP/MTs atau Surat Keterangan Lulus (SKL) resmi.',
  'Kartu Keluarga (KK) dan Akta Kelahiran calon peserta didik.',
  'Buku Rapor SMP semester 1 sampai dengan 5 (asli dan fotokopi).',
  'Surat Keterangan Berkelakuan Baik dari sekolah asal.',
  'Piagam sertifikat kejuaraan/prestasi (bagi pendaftar jalur prestasi).',
  'Kartu KIP/KKS/PKH (bagi pendaftar jalur KETM/Afirmasi).',
];

const DEFAULT_SCHEDULE: PpdbScheduleItem[] = [
  {
    stage: 'Tahap 1: Jalur Afirmasi, KETM, & Kejuaraan Prestasi',
    date: '03 - 07 Juni 2026',
    desc: 'Pendaftaran online melalui portal resmi Disdik Jabar dan verifikasi berkas sekolah.',
  },
  {
    stage: 'Pengumuman Hasil Seleksi Tahap 1',
    date: '19 Juni 2026',
    desc: 'Pengumuman resmi kelulusan tahap 1 dan persiapan daftar ulang.',
  },
  {
    stage: 'Tahap 2: Jalur Prestasi Nilai Rapor Umum',
    date: '24 - 28 Juni 2026',
    desc: 'Seleksi berdasarkan akumulasi nilai rapor semester 1 sampai 5.',
  },
  {
    stage: 'Pengumuman Kelulusan & Daftar Ulang Tahap 2',
    date: '05 Juli 2026',
    desc: 'Penetapan calon peserta didik baru dan orientasi MPLS sekolah.',
  },
];

const DEFAULT_STEPS = [
  ['01', 'Buat akun & Verifikasi', 'Daftarkan akun di portal resmi PPDB Disdik Jawa Barat dan lakukan validasi data diri.'],
  ['02', 'Lengkapi Berkas', 'Unggah pindaian dokumen persyaratan sesuai jalur yang dipilih dengan format jelas.'],
  ['03', 'Pilih Program Keahlian', 'Tentukan pilihan jurusan prioritas di SMKN 1 Subang yang sesuai minat bakatmu.'],
  ['04', 'Pantau Pengumuman', 'Periksa status seleksi berkala dan lakukan daftar ulang bila dinyatakan diterima.'],
];

export default function PpdbPage() {
  const [ppdb, setPpdb] = useState<Ppdb | null>(null);

  useEffect(() => {
    publicService.getPpdb()
      .then((res) => {
        const item = unwrapItem<Ppdb>(res);
        if (item) setPpdb(item);
      })
      .catch(() => {});
  }, []);

  const title = ppdb?.title || 'Penerimaan Peserta Didik Baru (PPDB) 2026/2027';
  const description = ppdb?.description || 'Informasi resmi alur, jadwal, dan persyaratan seleksi masuk SMK Negeri 1 Subang.';
  const requirements = (ppdb?.requirements && ppdb.requirements.length > 0) ? ppdb.requirements : DEFAULT_REQUIREMENTS;
  const schedule = (ppdb?.schedule && ppdb.schedule.length > 0) ? ppdb.schedule : DEFAULT_SCHEDULE;
  const isActive = ppdb?.is_active ?? true;

  return (
    <main className="bg-[#f8faf8] text-[#172b3a]">
      <PageHero
        eyebrow="PPDB Online"
        title="Mulai perjalananmu di SMKN 1 Subang."
        description={description}
        image="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=2200&q=90"
      />

      {/* Status Alert Banner */}
      <section className="bg-[#0f1e36] py-8 text-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 px-5 sm:flex-row sm:items-center sm:px-8">
          <div>
            <div className="flex items-center gap-2">
              <span className={`inline-block h-2.5 w-2.5 rounded-full ${isActive ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-400">
                {isActive ? 'Pendaftaran PPDB Sedang Dibuka' : 'Periode PPDB Segera Dibuka'}
              </p>
            </div>
            <h2 className="mt-1 text-lg font-bold text-white sm:text-xl">{title}</h2>
          </div>
          <Link
            href="/kontak"
            className="inline-flex w-fit items-center gap-2 bg-amber-400 px-5 py-3 text-xs font-bold text-[#0f1e36] hover:bg-amber-300 transition"
          >
            HUBUNGI PANITIA PPDB →
          </Link>
        </div>
      </section>

      {/* Alur Pendaftaran */}
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[0.75fr_1.25fr] lg:py-24">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#657c7d]">Alur Pendaftaran</p>
          <h2 className="mt-4 font-school-heading text-4xl leading-tight sm:text-5xl">
            Siapkan langkahnya dari sekarang.
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Ikuti seluruh panduan resmi agar proses verifikasi berkas dan seleksi jurusan berjalan lancar tanpa kendala administratif.
          </p>
        </div>
        <div className="border-t border-[#b9c7c2]">
          {DEFAULT_STEPS.map(([num, stepTitle, desc]) => (
            <div key={num} className="group grid grid-cols-[3rem_1fr] gap-4 border-b border-[#d9e2de] px-2 py-6 transition hover:bg-white">
              <span className="text-xs font-bold text-[#7a908e] pt-1">{num}</span>
              <div>
                <h3 className="font-school-heading text-2xl font-bold transition group-hover:translate-x-1 text-[#0f1e36]">
                  {stepTitle}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#5d6a6e]">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Jadwal & Persyaratan Grid */}
      <section className="bg-white py-16 sm:py-20 border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 grid gap-12 lg:grid-cols-2">
          {/* Jadwal */}
          <div className="rounded-3xl border border-slate-200 bg-slate-50/50 p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="h-5 w-5 text-blue-600" />
              <h3 className="font-school-heading text-2xl font-bold text-[#0f1e36]">Jadwal Pelaksanaan PPDB</h3>
            </div>
            <div className="space-y-6 border-l-2 border-blue-400 pl-4 sm:pl-6 ml-2">
              {schedule.map((item, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[23px] sm:-left-[31px] top-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-blue-600" />
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {item.date}
                  </span>
                  <h4 className="font-bold text-sm sm:text-base text-slate-900 mt-1.5">{item.stage}</h4>
                  {item.desc && <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">{item.desc}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Persyaratan Dokumen */}
          <div className="rounded-3xl border border-slate-200 bg-slate-50/50 p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-6">
              <FileText className="h-5 w-5 text-amber-600" />
              <h3 className="font-school-heading text-2xl font-bold text-[#0f1e36]">Persyaratan Berkas Pendaftaran</h3>
            </div>
            <ul className="space-y-4">
              {requirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-3 rounded-xl bg-white p-3.5 border border-slate-200 shadow-2xs">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Catatan Penting */}
      <section className="bg-[#dfe9e5]">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-14 sm:grid-cols-2 sm:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#657c7d]">Catatan resmi Disdik</p>
            <p className="mt-3 text-sm leading-7 text-[#516064]">
              Seluruh proses pendaftaran dan seleksi PPDB SMK Negeri 1 Subang tidak dipungut biaya (GRATIS). Waspadai segala bentuk pungutan liar dan informasi tidak resmi dari pihak luar.
            </p>
          </div>
          <div className="border-l-2 border-amber-400 pl-5 text-sm leading-7 text-[#516064]">
            Portal pendaftaran resmi provinsi Jawa Barat dapat diakses langsung melalui situs PPDB Disdik Jabar saat gelombang pendaftaran dibuka.
          </div>
        </div>
      </section>
    </main>
  );
}
