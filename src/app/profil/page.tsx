'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PageHero } from '@/components/site/PageHero';
import { publicService, unwrapItem } from '@/lib/api/public-endpoints';
import type { School } from '@/types/cms';
import { MapPin, Mail, Phone } from 'lucide-react';

export default function ProfilPage() {
  const [school, setSchool] = useState<School | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    publicService.getSchool()
      .then((res) => {
        const item = unwrapItem<School>(res);
        if (item) setSchool(item);
      })
      .catch((err) => {
        console.error("Gagal mengambil data profil sekolah:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Parse mission whether string with newlines or list
  const missionsList: string[] = school?.mission
    ? school.mission
        .split('\n')
        .map((m) => m.replace(/^(\d+[\.\)]|\-|\*)\s*/, '').trim())
        .filter(Boolean)
    : [];

  const schoolName = school?.name || 'SMK Negeri 1 Subang';
  const description = school?.description || 'SMK Pusat Keunggulan di Kabupaten Subang yang berdedikasi menghasilkan lulusan kompeten, berkarakter, dan berdaya saing global.';

  return (
    <main className="bg-[#f8faf8] text-[#172b3a]">
      <PageHero
        eyebrow="Profil Sekolah"
        title={`Mengenal ${schoolName}`}
        description={description}
        image="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=2200&q=90"
      />

      {loading ? (
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <div className="animate-pulse space-y-8">
            <div className="h-6 w-32 bg-slate-200 rounded"></div>
            <div className="h-10 w-3/4 bg-slate-200 rounded"></div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-28 bg-slate-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Identitas & Statistik Utama */}
          <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.75fr_1.25fr] lg:py-28">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#657c7d]">Identitas Sekolah</p>
              <h3 className="mt-4 font-school-heading text-2xl font-bold text-[#172b3a]">
                {schoolName}
              </h3>
              {school?.principal_name && (
                <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
                  <p className="text-xs uppercase tracking-wider text-slate-400 font-medium">Kepala Sekolah</p>
                  <p className="mt-2 text-lg font-bold text-slate-900">{school.principal_name}</p>
                  <p className="text-xs text-slate-500 mt-1">Pemimpin Lembaga Pendidikan</p>
                </div>
              )}
            </div>

            <div>
              <h2 className="font-school-heading text-3xl font-semibold leading-tight sm:text-4xl text-[#0f1e36]">
                Membangun Generasi Vokasi Unggul, Mandiri, dan Berkarakter
              </h2>
              <p className="mt-6 text-base leading-8 text-[#5d6a6e]">
                {description}
              </p>

              {/* Data Identitas Resmi dari API */}
              <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 border-t border-[#b9c7c2] pt-8">
                {school?.npsn && (
                  <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                    <p className="text-xs uppercase tracking-widest text-[#748985]">NPSN</p>
                    <p className="mt-1 font-mono font-bold text-lg text-slate-900">{school.npsn}</p>
                  </div>
                )}
                {school?.accreditation && (
                  <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                    <p className="text-xs uppercase tracking-widest text-[#748985]">Akreditasi</p>
                    <p className="mt-1 font-school-heading font-bold text-lg text-emerald-700">{school.accreditation} (Unggul)</p>
                  </div>
                )}
                {school?.founded_year && (
                  <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                    <p className="text-xs uppercase tracking-widest text-[#748985]">Tahun Berdiri</p>
                    <p className="mt-1 font-school-heading font-bold text-lg text-slate-900">{school.founded_year}</p>
                  </div>
                )}
                {school?.area_size && (
                  <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                    <p className="text-xs uppercase tracking-widest text-[#748985]">Luas Area</p>
                    <p className="mt-1 font-school-heading font-bold text-lg text-slate-900">{school.area_size}</p>
                  </div>
                )}
                {typeof school?.student_count === 'number' && school.student_count > 0 && (
                  <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                    <p className="text-xs uppercase tracking-widest text-[#748985]">Total Siswa</p>
                    <p className="mt-1 font-school-heading font-bold text-lg text-blue-700">{school.student_count.toLocaleString('id-ID')} Siswa</p>
                  </div>
                )}
                {typeof school?.staff_count === 'number' && school.staff_count > 0 && (
                  <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                    <p className="text-xs uppercase tracking-widest text-[#748985]">Pendidik & Staf</p>
                    <p className="mt-1 font-school-heading font-bold text-lg text-slate-900">{school.staff_count} Orang</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Visi & Misi Dinamis */}
          {(school?.vision || missionsList.length > 0) && (
            <section className="bg-[#dfe9e5]">
              <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:py-24">
                {school?.vision && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#657c7d]">Visi Sekolah</p>
                    <p className="mt-5 font-school-heading text-2xl sm:text-3xl leading-snug font-medium text-[#172b3a]">
                      &ldquo;{school.vision}&rdquo;
                    </p>
                  </div>
                )}
                {missionsList.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#657c7d]">Misi Sekolah</p>
                    <ol className="mt-5 space-y-4 border-t border-[#aec0ba] pt-4 text-base leading-7 text-[#516064]">
                      {missionsList.map((item, index) => (
                        <li key={index} className="flex gap-4 border-b border-[#c5d3ce] pb-3">
                          <span className="text-xs font-bold text-[#45615d]">{String(index + 1).padStart(2, '0')}</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Kontak & Alamat Sekolah */}
          {(school?.address || school?.phone || school?.email) && (
            <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
              <div className="rounded-3xl bg-white p-8 sm:p-12 border border-slate-100 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#657c7d]">Alamat & Kontak Resmi</p>
                <div className="mt-6 grid gap-6 sm:grid-cols-3">
                  {school?.address && (
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-xl bg-slate-50 text-[#657c7d] shrink-0">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Lokasi Kampus</p>
                        <p className="mt-1 text-sm text-slate-700 leading-relaxed">{school.address}</p>
                      </div>
                    </div>
                  )}
                  {school?.phone && (
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-xl bg-slate-50 text-[#657c7d] shrink-0">
                        <Phone size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Telepon</p>
                        <p className="mt-1 text-sm text-slate-700">{school.phone}</p>
                      </div>
                    </div>
                  )}
                  {school?.email && (
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-xl bg-slate-50 text-[#657c7d] shrink-0">
                        <Mail size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Surel / Email</p>
                        <p className="mt-1 text-sm text-slate-700">{school.email}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* Navigasi Jurusan */}
          <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
            <Link href="/jurusan" className="inline-flex items-center gap-2 border-b-2 border-[#e7ae32] pb-1 text-sm font-semibold text-slate-900 hover:text-amber-700 transition">
              Eksplorasi Program Keahlian SMK Negeri 1 Subang →
            </Link>
          </section>
        </>
      )}
    </main>
  );
}

