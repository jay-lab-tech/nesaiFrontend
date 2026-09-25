'use client';

import { useEffect, useState } from 'react';
import { Phone, Mail, MapPin, Globe, Check, Share2 } from 'lucide-react';
import { PageHero } from '@/components/site/PageHero';
import { publicService, unwrapItem } from '@/lib/api/public-endpoints';
import type { School } from '@/types/cms';

export default function KontakPage() {
  const [sent, setSent] = useState(false);
  const [school, setSchool] = useState<School | null>(null);

  useEffect(() => {
    publicService.getSchool()
      .then((res) => {
        const item = unwrapItem<School>(res);
        if (item) setSchool(item);
      })
      .catch(() => {});
  }, []);

  const phone = school?.phone || '(0260) 411410';
  const email = school?.email || 'info@smkn1subang.sch.id';
  const address = school?.address || 'Jl. Arief Rahman Hakim No. 35, Kelurahan Cigadung, Kecamatan Subang, Kabupaten Subang, Jawa Barat 41213.';
  const website = school?.social_links?.website || 'https://www.smkn1subang.sch.id';
  const instagram = school?.social_links?.instagram;
  const youtube = school?.social_links?.youtube;

  return (
    <main className="bg-[#f8faf8] text-[#172b3a]">
      <PageHero
        eyebrow="Kontak Resmi"
        title="Mari terhubung dengan sekolah."
        description="Sampaikan pertanyaan tentang profil, program keahlian vokasi, PPDB, kemitraan industri, dan layanan informasi sekolah."
        image="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2200&q=90"
      />

      {/* Map & Lokasi */}
      <section className="bg-white py-14 border-b border-slate-200">
        <div className="mx-auto grid max-w-7xl gap-0 px-5 sm:px-8 lg:grid-cols-[1fr_0.8fr]">
          <div
            className="min-h-[300px] bg-slate-100 bg-cover bg-center rounded-l-2xl"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=1200&q=85')",
            }}
          />
          <div className="border border-slate-200 p-8 rounded-r-2xl flex flex-col justify-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">Lokasi kampus</p>
            <h2 className="font-school-heading mt-3 text-3xl font-bold text-[#0f1e36]">
              Datang dan kenali lingkungan belajar kami.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 flex items-start gap-2">
              <MapPin className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <span>{address}</span>
            </p>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex border-b-2 border-amber-400 pb-1 text-sm font-bold text-[#0f1e36] hover:text-amber-700 transition"
            >
              BUKA DI GOOGLE MAPS →
            </a>
          </div>
        </div>
      </section>

      {/* Detail Kontak & Formulir Pesan */}
      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:py-28">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#657c7d]">Informasi resmi</p>
          <h2 className="mt-3 font-school-heading text-4xl leading-tight sm:text-5xl text-[#0f1e36]">
            {school?.name || 'SMK Negeri 1 Subang'}
          </h2>
          <div className="mt-8 space-y-6 border-t border-[#b9c7c2] pt-6 text-sm leading-6 text-[#5d6a6e]">
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <b className="text-[#0f1e36] block">Telepon Kantor</b>
                <span>{phone}</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <b className="text-[#0f1e36] block">Email Resmi</b>
                <a href={`mailto:${email}`} className="hover:underline">{email}</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Globe className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <b className="text-[#0f1e36] block">Portal Resmi</b>
                <a href={website} target="_blank" rel="noreferrer" className="text-[#315e68] font-semibold underline">
                  {website.replace(/^https?:\/\//, '')}
                </a>
              </div>
            </div>

            {(instagram || youtube) && (
              <div className="pt-4 border-t border-slate-200 flex items-center gap-4">
                {instagram && (
                  <a href={instagram} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-pink-600">
                    <Share2 className="h-4 w-4 text-pink-600" />
                    <span>Instagram</span>
                  </a>
                )}
                {youtube && (
                  <a href={youtube} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-red-600">
                    <Share2 className="h-4 w-4 text-red-600" />
                    <span>YouTube</span>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="border border-slate-200 bg-white p-6 sm:p-10 rounded-2xl shadow-xs"
        >
          {sent ? (
            <div className="py-12 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
                <Check className="h-6 w-6" />
              </div>
              <h3 className="font-school-heading text-2xl font-bold text-slate-900">Pesan Terkirim!</h3>
              <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto">
                Terima kasih telah menghubungi SMKN 1 Subang. Pesan Anda telah tercatat dan tim humas kami akan merespons secepatnya.
              </p>
            </div>
          ) : (
            <>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#657c7d]">Formulir Pertanyaan</p>
              <h3 className="font-school-heading mt-2 text-2xl font-semibold text-[#0f1e36]">
                Kirim pesan atau pengaduan.
              </h3>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <input
                  required
                  placeholder="Nama Lengkap"
                  className="border-b border-[#9aaba8] bg-transparent px-0 py-3 text-sm outline-none placeholder:text-[#81928f] focus:border-[#0f1e36] transition"
                />
                <input
                  required
                  type="email"
                  placeholder="Alamat Email"
                  className="border-b border-[#9aaba8] bg-transparent px-0 py-3 text-sm outline-none placeholder:text-[#81928f] focus:border-[#0f1e36] transition"
                />
              </div>
              <textarea
                required
                placeholder="Tulis pesan atau pertanyaan Anda di sini..."
                rows={5}
                className="mt-6 w-full resize-none border-b border-[#9aaba8] bg-transparent px-0 py-3 text-sm outline-none placeholder:text-[#81928f] focus:border-[#0f1e36] transition"
              />
              <button
                type="submit"
                className="mt-8 rounded-xl bg-[#0f1e36] px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-slate-800 shadow-sm"
              >
                Kirim Pesan
              </button>
            </>
          )}
        </form>
      </section>
    </main>
  );
}
