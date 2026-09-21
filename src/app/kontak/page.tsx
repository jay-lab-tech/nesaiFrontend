'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  Bot, 
  ChevronRight
} from 'lucide-react';
import { openNesaiChat } from '@/lib/nesai-events';
import { NesaiPromoBar } from '@/components/home/NesaiPromoBar';

export default function KontakPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Informasi PPDB & Jurusan',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="relative bg-slate-950 text-white py-16 lg:py-24 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 filter brightness-50"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=2000&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-4">
            <Link href="/" className="hover:text-cyan-300 transition-colors">Beranda</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-cyan-300">Kontak & Lokasi</span>
          </nav>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/20 border border-cyan-400/30 px-3.5 py-1 text-xs font-semibold text-cyan-300 mb-4">
            <Phone className="h-3.5 w-3.5 text-cyan-400" />
            Saluran Resmi
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Hubungi SMKN 1 Subang
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Kami siap melayani kebutuhan informasi seputar PPDB, kerjasama dunia industri, verifikasi alumni, dan layanan administrasi sekolah.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Contact Info & Map */}
            <div className="lg:col-span-5 space-y-8">
              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Informasi Kontak Resmi</h2>
                
                <div className="space-y-6 text-sm text-slate-600">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-200">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Alamat Sekolah</p>
                      <p className="mt-1 leading-relaxed">Jl. Arief Rahman Hakim No. 35, Dangdeur, Kec. Subang, Kabupaten Subang, Jawa Barat 41214</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-200">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Telepon & Fax</p>
                      <p className="mt-1">(0260) 411410</p>
                      <p className="text-xs text-slate-500">Senin - Jumat (07.30 - 15.30 WIB)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-200">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Email Resmi</p>
                      <p className="mt-1">info@smkn1subang.sch.id</p>
                      <p className="text-xs text-slate-500">ppdb@smkn1subang.sch.id</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-200">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Jam Operasional Pelayanan</p>
                      <p className="mt-1">Senin – Kamis: 07.30 – 15.30 WIB</p>
                      <p>Jumat: 07.30 – 15.00 WIB</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Instant AI Helper */}
              <div className="rounded-3xl border border-cyan-200 bg-gradient-to-br from-cyan-50 to-blue-50 p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-600 text-white shadow-md">
                    <Bot className="h-6 w-6 text-cyan-200" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Butuh Jawaban Cepat?</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Asisten virtual NESAI siap menjawab pertanyaan umum 24 jam sehari tanpa perlu menunggu jam kerja kantor.
                    </p>
                    <button
                      type="button"
                      onClick={() => openNesaiChat()}
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-cyan-700 hover:text-cyan-900 underline"
                    >
                      <span>Buka Chat NESAI Sekarang</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Message Form & Map */}
            <div className="lg:col-span-7 space-y-8">
              <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm">
                <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Kirim Pesan / Pengaduan</h2>
                <p className="text-sm text-slate-600 mb-8">
                  Isi formulir di bawah ini dan tim pelayanan SMKN 1 Subang akan merespons pesan Anda sesegera mungkin.
                </p>

                {submitted ? (
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
                    <CheckCircle2 className="h-12 w-12 text-emerald-600 mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-slate-900">Pesan Anda Telah Terkirim!</h3>
                    <p className="text-sm text-slate-600 mt-1">
                      Terima kasih telah menghubungi kami. Kami akan membalas melalui email atau nomor telepon yang Anda cantumkan.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="mt-4 rounded-xl bg-slate-900 px-5 py-2 text-xs font-bold text-white hover:bg-slate-800"
                    >
                      Kirim Pesan Lain
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Nama Lengkap *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Masukkan nama Anda"
                          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Email Aktif *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="nama@email.com"
                          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Nomor WhatsApp / HP
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="0812xxxxxxxx"
                          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                          Kategori Pertanyaan
                        </label>
                        <select
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
                        >
                          <option>Informasi PPDB & Jurusan</option>
                          <option>Kemitraan Industri & Magang</option>
                          <option>Layanan Legalisir Ijazah & Alumni</option>
                          <option>Pengaduan / Saran Masyarakat</option>
                          <option>Lainnya</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Pesan Anda *
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tuliskan pertanyaan atau pesan Anda secara jelas di sini..."
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-md hover:bg-blue-700 active:scale-95 transition-all"
                    >
                      <Send className="h-4 w-4" />
                      <span>Kirim Pesan Sekarang</span>
                    </button>
                  </form>
                )}
              </div>

              {/* Map Embed Card */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm overflow-hidden">
                <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  <span>Lokasi SMKN 1 Subang di Google Maps</span>
                </h3>
                <div className="relative h-64 w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                  <iframe
                    title="Peta Lokasi SMKN 1 Subang"
                    src="https://maps.google.com/maps?q=SMK+Negeri+1+Subang&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    className="h-full w-full border-0"
                    loading="lazy"
                  />
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
