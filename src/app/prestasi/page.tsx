'use client';

import { useEffect, useState } from 'react';
import { Award, Lightbulb, Trophy, Sparkles } from 'lucide-react';
import { PageHero } from '@/components/site/PageHero';
import { publicService, unwrapList } from '@/lib/api/public-endpoints';
import type { Innovation, Extracurricular } from '@/types/cms';

const DEFAULT_INNOVATIONS = [
  { id: 1, name: 'Sistem Smart Green House Berbasis IoT', description: 'Pengaturan suhu dan kelembaban otomatis via mikrokontroler ESP32 dan dashboard web monitoring realtime.', has_haki: true, major_name: 'Rekayasa Perangkat Lunak' },
  { id: 2, name: 'Autonomous Inspection Rover Bot', description: 'Robot pemantau jalur pipa industri sempit dengan transmisi video terenkripsi jarak jauh.', has_haki: true, major_name: 'Teknik Otomasi Industri' },
  { id: 3, name: 'Aplikasi Kasir POS Offline-First & Analitik', description: 'Solusi perangkat lunak kasir pintar untuk UMKM lokal Subang dengan sinkronisasi cloud berkala.', has_haki: false, major_name: 'Bisnis Digital' },
];

const DEFAULT_EXTRAS = [
  { id: 1, name: 'Cyber Security & Network Club', category: 'Teknologi & Ilmiah' },
  { id: 2, name: 'Robotics & Automation Team', category: 'Teknologi & Ilmiah' },
  { id: 3, name: 'Paskibra Pasheman 35', category: 'Kepemimpinan' },
  { id: 4, name: 'PMR (Palang Merah Remaja)', category: 'Kemanusiaan' },
  { id: 5, name: 'Pramuka Ambalan Singaperbangsa', category: 'Kepemimpinan' },
  { id: 6, name: 'Sanggar Seni & Tari Sunda Tradisional', category: 'Seni & Budaya' },
  { id: 7, name: 'Nesas Cinema & Photography', category: 'Seni & Budaya' },
  { id: 8, name: 'Klub Futsal & Basket NESAS', category: 'Olahraga' },
];

export default function PrestasiPage() {
  const [innovations, setInnovations] = useState<Innovation[]>([]);
  const [extras, setExtras] = useState<Extracurricular[]>([]);

  useEffect(() => {
    publicService.getInnovations()
      .then((res) => {
        const list = unwrapList<Innovation>(res);
        if (list.length > 0) setInnovations(list);
      })
      .catch(() => {});

    publicService.getExtracurriculars()
      .then((res) => {
        const list = unwrapList<Extracurricular>(res);
        if (list.length > 0) setExtras(list);
      })
      .catch(() => {});
  }, []);

  const displayInnovations = innovations.length > 0
    ? innovations.map((inv) => ({
        id: inv.id,
        name: inv.name,
        description: inv.description || 'Karya inovasi teknologi terapan ciptaan siswa dan guru SMKN 1 Subang.',
        has_haki: inv.has_haki,
        major_name: inv.major?.name || 'Vokasi Terapan',
      }))
    : DEFAULT_INNOVATIONS;

  const displayExtras = extras.length > 0 ? extras : DEFAULT_EXTRAS;

  return (
    <main className="bg-[#f8faf8] text-[#172b3a]">
      <PageHero
        eyebrow="Prestasi & Karya"
        title="Merayakan proses dan pencapaian siswa."
        description="Dokumentasi karya inovasi, perolehan sertifikat HAKI, kejuaraan LKS, dan wadah pengembangan minat bakat di SMKN 1 Subang."
        image="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2200&q=90"
      />

      {/* 3 Keunggulan Banner */}
      <section className="bg-[#0f1e36] py-14 text-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:grid-cols-3 sm:px-8">
          {[
            ['Kompetisi LKS', 'Raihan medali emas di ajang Lomba Kompetensi Siswa tingkat Nasional dan Provinsi.'],
            ['Karya Ber-HAKI', 'Paten Hak Kekayaan Intelektual resmi atas produk inovasi riset terapan siswa.'],
            ['Ekstrakurikuler', 'Wadah pembentukan karakter, kepemimpinan, dan keahlian di luar jam pelajaran.'],
          ].map(([title, desc], i) => (
            <div key={title} className="border-l-2 border-amber-400 pl-4">
              <span className="text-xs font-bold text-amber-400">0{i + 1}</span>
              <h2 className="font-school-heading mt-2 text-xl font-semibold">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Karya Inovasi & Riset Terapan */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#657c7d]">Riset & Inovasi</span>
            <h2 className="mt-4 font-school-heading text-4xl leading-tight sm:text-5xl text-[#0f1e36]">
              Karya Inovasi Siswa & Guru
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Produk nyata yang dihasilkan dari kurikulum pembelajaran berbasis proyek (*Project-Based Learning*) dan terdaftar dalam perlindungan Hak Cipta (HAKI).
            </p>
          </div>
          <span className="rounded-full bg-amber-50 border border-amber-200 px-4 py-1 text-xs font-bold text-amber-800 self-start md:self-auto">
            {displayInnovations.length} Inovasi Terdaftar
          </span>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayInnovations.map((inv) => (
            <div key={inv.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:shadow-md transition">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                  {inv.major_name}
                </span>
                {inv.has_haki && (
                  <span className="flex items-center gap-1 rounded bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-900">
                    <Sparkles className="h-3 w-3" />
                    Sertifikat HAKI
                  </span>
                )}
              </div>
              <h3 className="font-school-heading text-xl font-bold text-[#0f1e36] mb-2">{inv.name}</h3>
              <p className="text-xs leading-5 text-slate-600">{inv.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ekstrakurikuler Grid */}
      <section className="bg-white border-t border-slate-200 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#657c7d]">Kesiswaan & Pengembangan Diri</span>
            <h2 className="mt-4 font-school-heading text-4xl leading-tight sm:text-5xl text-[#0f1e36]">
              Kegiatan Ekstrakurikuler
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              SMKN 1 Subang menyediakan beragam klub minat dan bakat untuk mengasah jiwa kepemimpinan, kreativitas, dan sportivitas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {displayExtras.map((extra) => (
              <div key={extra.id} className="rounded-xl border border-slate-200 bg-slate-50/70 p-5 hover:border-amber-400 hover:bg-white transition">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  {extra.category || 'Organisasi'}
                </span>
                <h4 className="font-bold text-sm text-[#0f1e36] mt-1.5">{extra.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
