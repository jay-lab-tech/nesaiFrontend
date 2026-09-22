'use client';

import { useEffect, useState, useMemo } from 'react';
import { PageHero } from '@/components/site/PageHero';
import { publicService, unwrapList } from '@/lib/api/public-endpoints';
import type { Facility } from '@/types/cms';

const DEFAULT_LABS = [
  { number: '01', title: 'Lab Rekayasa Perangkat Lunak (RPL)', category: 'Laboratorium & Bengkel', desc: 'Komputer spesifikasi tinggi, dual-monitor workstation, dan server lokal.' },
  { number: '02', title: 'Lab Teknik Komputer & Jaringan (TKJ)', category: 'Laboratorium & Bengkel', desc: 'Rack server, router Cisco & MikroTik, fiber optic splicer, dan simulator jaringan.' },
  { number: '03', title: 'Lab Multimedia & DKV', category: 'Laboratorium & Bengkel', desc: 'Drawing tablet, studio green screen, kamera sinematik, dan lighting profesional.' },
  { number: '04', title: 'Bengkel Teknik Otomasi Industri (TOI)', category: 'Laboratorium & Bengkel', desc: 'Trainer PLC, sistem pneumatik/hidrolik, lengan robotik, dan instrumen kalibrasi.' },
  { number: '05', title: 'Lab Bisnis Digital & Retail', category: 'Laboratorium & Bengkel', desc: 'Sistem kasir POS modern, display merchandise, dan studio live selling e-commerce.' },
  { number: '06', title: 'Lab Bank Mini & Akuntansi (AKL)', category: 'Laboratorium & Bengkel', desc: 'Mesin hitung uang, teller counter terpadu, dan software akuntansi Accurate/MYOB.' },
  { number: '07', title: 'Lapangan Olahraga Multifungsi', category: 'Fasilitas Olahraga', desc: 'Lapangan basket, futsal, dan voli berstandar kejuaraan tingkat kabupaten.' },
  { number: '08', title: 'Masjid Al-Hikmah SMKN 1 Subang', category: 'Sarana Ibadah', desc: 'Pusat kegiatan rohani, shalat berjamaah, dan pembinaan karakter religius siswa.' },
  { number: '09', title: 'Perpustakaan & Ruang Baca Digital', category: 'Fasilitas Umum', desc: 'Ribuan koleksi buku fisik, e-library portal, dan area belajar mandiri ber-AC.' },
  { number: '10', title: 'Aula Graha Puspa Serbaguna', category: 'Fasilitas Umum', desc: 'Gedung pertemuan berkapasitas 1.000 orang untuk seminar, pameran karya, dan wisuda.' },
];

const CATEGORIES = ['Semua', 'Laboratorium & Bengkel', 'Fasilitas Olahraga', 'Fasilitas Umum', 'Sarana Ibadah'];

export default function FasilitasPage() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [activeCategory, setActiveCategory] = useState('Semua');

  useEffect(() => {
    publicService.getFacilities()
      .then((res) => {
        const list = unwrapList<Facility>(res);
        if (list.length > 0) setFacilities(list);
      })
      .catch(() => {});
  }, []);

  const displayList = useMemo(() => {
    if (facilities.length > 0) {
      const filtered = activeCategory === 'Semua'
        ? facilities
        : facilities.filter((f) => (f.category || '').toLowerCase().includes(activeCategory.toLowerCase()));

      return filtered.map((f, idx) => ({
        number: String(idx + 1).padStart(2, '0'),
        title: f.name,
        category: f.category || 'Fasilitas Sekolah',
        desc: f.description || 'Fasilitas sarana dan prasarana resmi pendukung pembelajaran di SMKN 1 Subang.',
      }));
    }

    if (activeCategory === 'Semua') return DEFAULT_LABS;
    return DEFAULT_LABS.filter((d) => d.category.toLowerCase().includes(activeCategory.toLowerCase()));
  }, [facilities, activeCategory]);

  return (
    <main className="bg-[#f8faf8] text-[#172b3a]">
      <PageHero
        eyebrow="Fasilitas"
        title="Ruang belajar untuk mencoba dan mencipta."
        description="Fasilitas sekolah mendukung pembelajaran praktik di setiap program keahlian dengan sarana dan prasarana terstandar industri."
        image="https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=2200&q=90"
      />

      {/* Filter Tabs */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-2 px-5 py-4 sm:px-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-[#0f1e36] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Highlight Box */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div
            className="min-h-[300px] bg-cover bg-center rounded-2xl shadow-sm"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85')",
            }}
          />
          <div className="border border-slate-200 rounded-2xl p-7 flex flex-col justify-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">Lingkungan belajar</p>
            <h2 className="mt-3 font-school-heading text-3xl font-bold leading-tight text-[#0f1e36]">
              Fasilitas yang mendukung proses praktik.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Pembelajaran vokasi membutuhkan ruang yang memungkinkan siswa mencoba, membuat, menguji, dan menyempurnakan kompetensi keahliannya.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-4 border-t border-slate-200 pt-5">
              <span className="text-sm text-slate-600">
                <b className="block font-school-heading text-2xl text-[#0f1e36]">
                  {facilities.length > 0 ? facilities.length : '10+'}
                </b>
                Fasilitas Terdaftar
              </span>
              <span className="text-sm text-slate-600">
                <b className="block font-school-heading text-2xl text-[#0f1e36]">50–52</b>
                Ruang Kelas Teori
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities List Grid */}
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.7fr_1.3fr] lg:py-28">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#657c7d]">Data fasilitas</p>
          <h2 className="mt-4 font-school-heading text-4xl leading-tight sm:text-5xl">
            Sarana & prasarana sesuai standar kompetensi.
          </h2>
          <p className="mt-5 text-base leading-7 text-[#5d6a6e]">
            SMKN 1 Subang terus memperbarui inventaris alat praktik laboratorium dan fasilitas pendukung lainnya guna menjamin kualitas pembelajaran siswa.
          </p>
        </div>

        <div className="border-t border-[#b9c7c2]">
          {displayList.map((item) => (
            <div
              key={item.title + item.number}
              className="group grid grid-cols-[3rem_1fr] gap-4 border-b border-[#d9e2de] px-2 py-6 transition hover:bg-white"
            >
              <span className="text-xs font-bold text-[#7a908e] pt-1">{item.number}</span>
              <div>
                <span className="text-[10px] font-bold tracking-wider uppercase text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {item.category}
                </span>
                <h3 className="font-school-heading text-xl font-bold mt-2 transition group-hover:translate-x-1 text-[#0f1e36]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-[#5d6a6e] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
