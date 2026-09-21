'use client';

import Link from 'next/link';
import { 
  FileText, 
  CheckCircle2, 
  Bot, 
  Sparkles, 
  ChevronRight, 
  ArrowRight,
  Users
} from 'lucide-react';
import { openNesaiChat } from '@/lib/nesai-events';
import { NesaiPromoBar } from '@/components/home/NesaiPromoBar';

export default function PpdbPage() {
  const PATHS = [
    { name: 'Jalur Prestasi Nilai Rapor', quota: '60%', desc: 'Seleksi berdasarkan rata-rata akumulasi nilai rapor semester 1 - 5 mata pelajaran inti.' },
    { name: 'Jalur Afirmasi / KETM', quota: '15%', desc: 'Bagi keluarga kurang mampu dengan kepemilikan KIP, PKH, atau terdaftar DTKS Kemensos.' },
    { name: 'Jalur Prestasi Kejuaraan', quota: '10%', desc: 'Sertifikat kejuaraan akademik, olahraga, seni, atau sains tingkat kab/provinsi/nasional.' },
    { name: 'Jalur Prioritas Terdekat', quota: '10%', desc: 'Berdasarkan radius jarak tempat tinggal terdekat domisili siswa ke SMKN 1 Subang.' },
    { name: 'Jalur Perpindahan Orang Tua / Anak Guru', quota: '5%', desc: 'Surat tugas mutasi dinas orang tua atau anak kandung tenaga pendidik/kependidikan.' },
  ];

  const STEPS = [
    {
      step: '01',
      title: 'Pembuatan Akun & Pendaftaran',
      desc: 'Calon siswa mendaftar online melalui portal resmi PPDB Jabar dan memilih SMKN 1 Subang.',
    },
    {
      step: '02',
      title: 'Verifikasi Berkas Dokumen',
      desc: 'Panitia sekolah memverifikasi kelengkapan berkas fisik dan berkas yang telah diunggah.',
    },
    {
      step: '03',
      title: 'Uji Kompetensi & Tes Minat Bakat',
      desc: 'Mengikuti tes tertulis kompetensi dasar, buta warna, dan wawancara peminatan jurusan.',
    },
    {
      step: '04',
      title: 'Pengumuman Hasil Seleksi',
      desc: 'Pengumuman kelulusan resmi dapat diakses melalui portal online dan papan pengumuman sekolah.',
    },
    {
      step: '05',
      title: 'Daftar Ulang & MPLS',
      desc: 'Calon siswa yang dinyatakan diterima melakukan daftar ulang dan persiapan Masa Pengenalan Lingkungan Sekolah.',
    },
  ];

  const REQUIREMENTS = [
    'Ijazah atau Surat Keterangan Lulus (SKL) SMP/MTs sederajat',
    'Buku Rapor SMP (Semester 1 s.d. 5) yang telah dilegalisir',
    'Akta Kelahiran asli dan fotokopi',
    'Kartu Keluarga (KK) yang diterbitkan minimal 1 tahun',
    'KTP orang tua / wali',
    'Surat Keterangan Bebas Buta Warna (khusus jurusan TKJ, RPL, DKV, TOI)',
    'Surat Pernyataan Tanggung Jawab Mutlak (SPTJM) bermaterai Rp10.000',
    'Sertifikat / Piagam Kejuaraan asli (khusus pendaftar Jalur Prestasi Kejuaraan)',
    'Kartu KIP/PKH/KKS bagi pendaftar Jalur Afirmasi',
  ];

  const QUOTAS = [
    { code: 'TKJ', name: 'Teknik Komputer & Jaringan', classes: '4 Rombel', capacity: 144 },
    { code: 'RPL', name: 'Rekayasa Perangkat Lunak', classes: '4 Rombel', capacity: 144 },
    { code: 'DKV', name: 'Multimedia / DKV', classes: '3 Rombel', capacity: 108 },
    { code: 'TOI', name: 'Teknik Otomasi Industri', classes: '3 Rombel', capacity: 108 },
    { code: 'BDP', name: 'Bisnis Digital & Pemasaran', classes: '4 Rombel', capacity: 144 },
    { code: 'AKL', name: 'Akuntansi & Keuangan Lembaga', classes: '4 Rombel', capacity: 144 },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="relative bg-slate-950 text-white py-16 lg:py-24 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 filter brightness-50"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2000&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-4">
            <Link href="/" className="hover:text-cyan-300 transition-colors">Beranda</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-cyan-300">PPDB 2026/2027</span>
          </nav>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/20 border border-orange-400/30 px-3.5 py-1 text-xs font-semibold text-orange-300 mb-4">
            <Sparkles className="h-3.5 w-3.5 text-orange-400" />
            Penerimaan Peserta Didik Baru
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Pusat Informasi PPDB 2026/2027
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Panduan lengkap alur pendaftaran, jadwal seleksi, persyaratan dokumen, kuota rombel, dan asisten virtual NESAI yang siap memandu kelulusanmu.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="https://ppdb.jabarprov.go.id"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg hover:from-orange-600 hover:to-amber-700 active:scale-95 transition-all"
            >
              <span>Daftar via Portal PPDB Jabar</span>
              <ArrowRight className="h-4 w-4" />
            </a>

            <button
              type="button"
              onClick={() => openNesaiChat('Halo NESAI, tolong bantu saya memahami syarat berkas dan alur pendaftaran PPDB SMKN 1 Subang 2026.')}
              className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/50 bg-slate-900/80 px-6 py-3.5 text-sm font-semibold text-cyan-200 backdrop-blur-md hover:bg-cyan-950/60 active:scale-95 transition-all"
            >
              <Bot className="h-4 w-4 text-cyan-400" />
              <span>Tanya Syarat ke NESAI</span>
            </button>
          </div>
        </div>
      </section>

      {/* Jalur Pendaftaran */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 border border-blue-200 px-3.5 py-1 text-xs font-bold text-blue-700 uppercase tracking-wider mb-3">
              Jalur Masuk
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Pilihan Jalur Pendaftaran
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PATHS.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 shadow-sm hover:bg-white hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black text-blue-600">{item.quota}</span>
                  <span className="text-xs font-bold text-slate-500 uppercase">Kuota</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.name}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alur Pendaftaran */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-100 border border-cyan-200 px-3.5 py-1 text-xs font-bold text-cyan-800 uppercase tracking-wider mb-3">
              Tahapan Seleksi
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Alur Pendaftaran Step-by-Step
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {STEPS.map((item) => (
              <div
                key={item.step}
                className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block rounded-xl bg-blue-600 px-3 py-1 text-sm font-black text-white mb-4">
                    Langkah {item.step}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Persyaratan Dokumen & Kuota */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Requirements */}
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 border border-blue-200 px-3.5 py-1 text-xs font-bold text-blue-700 uppercase tracking-wider mb-3">
                <FileText className="h-3.5 w-3.5" />
                Dokumen Berkas
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mb-6">
                Persyaratan Berkas Dokumen
              </h2>
              <ul className="space-y-3">
                {REQUIREMENTS.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3 rounded-xl bg-slate-50 border border-slate-200/80 p-3.5 text-sm text-slate-700">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quotas */}
            <div className="lg:col-span-5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 border border-amber-200 px-3.5 py-1 text-xs font-bold text-amber-800 uppercase tracking-wider mb-3">
                <Users className="h-3.5 w-3.5" />
                Daya Tampung
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mb-6">
                Kuota Penerimaan Siswa
              </h2>
              <div className="rounded-2xl border border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-sm">
                {QUOTAS.map((quota) => (
                  <div key={quota.code} className="p-4 flex items-center justify-between bg-white hover:bg-slate-50 transition-colors">
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{quota.name}</p>
                      <p className="text-xs text-slate-500">{quota.classes}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-extrabold text-blue-600 text-base">{quota.capacity}</span>
                      <p className="text-[10px] text-slate-400">Siswa</p>
                    </div>
                  </div>
                ))}
                <div className="p-4 bg-slate-950 text-white flex items-center justify-between">
                  <span className="font-bold text-sm">Total Kuota 2026/2027</span>
                  <span className="font-black text-cyan-300 text-lg">792 Siswa</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promo Bar */}
      <NesaiPromoBar />
    </div>
  );
}
