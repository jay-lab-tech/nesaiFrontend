import Image from 'next/image';
import { Quote, Sparkles, CheckCircle2 } from 'lucide-react';

export function PrincipalSection() {
  return (
    <section id="profil" className="relative py-20 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Portrait Photo */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Decorative Frame Glow & Accent */}
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-blue-600/20 via-cyan-500/15 to-orange-400/20 blur-xl opacity-70" />
              <div className="relative rounded-2xl overflow-hidden border-4 border-white shadow-2xl bg-gradient-to-b from-slate-100 to-slate-200">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                  alt="Kepala SMKN 1 Subang"
                  width={600}
                  height={750}
                  className="w-full h-auto object-cover object-top hover:scale-105 transition-transform duration-500"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="inline-block rounded-full bg-cyan-500/80 backdrop-blur-md px-3 py-0.5 text-xs font-semibold text-white mb-1">
                    Kepala Sekolah
                  </span>
                  <p className="font-bold text-lg leading-tight">Deden Suryanto, M.Pd</p>
                  <p className="text-xs text-slate-200">Periode 2024 - Sekarang</p>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-5 -right-4 hidden sm:flex items-center gap-2 rounded-xl bg-white border border-slate-200/80 p-3 shadow-xl">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
                  <Sparkles className="h-5 w-5 text-cyan-300" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-900">Pusat Keunggulan</p>
                  <p className="text-[11px] text-slate-500">Kemendikbudristek RI</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sambutan Message */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200/60 px-3.5 py-1 text-xs font-bold text-blue-700 uppercase tracking-wider mb-4">
              <Quote className="h-3.5 w-3.5 text-blue-600" />
              Sambutan Kepala Sekolah
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-6 leading-tight">
              Menyiapkan Ahli Teknologi Masa Depan yang Kompeten & Berakhlak Mulia
            </h2>

            <div className="space-y-4 text-slate-600 text-base sm:text-lg leading-relaxed">
              <p>
                <em className="text-blue-900 font-medium not-italic">Assalamu’alaikum Warahmatullahi Wabarakatuh,</em>
              </p>
              <p>
                Selamat datang di portal resmi <strong>SMK Negeri 1 Subang (NESAS)</strong>. Sebagai salah satu
                Sekolah Menengah Kejuruan Pusat Keunggulan di Jawa Barat, kami bertekad untuk terus bertransformasi
                menjawab tantangan revolusi industri 4.0 dan era kecerdasan artifisial (AI).
              </p>
              <p>
                Melalui kurikulum berbasis industri, pembelajaran *Teaching Factory* (TEFA), serta kolaborasi aktif
                dengan puluhan perusahaan nasional dan multinasional, kami memastikan setiap peserta didik dibekali
                keterampilan teknis (*hard skills*) berstandar industri serta integritas dan kepemimpinan (*soft skills*)
                yang kuat.
              </p>
              <p>
                Kini, kami juga menghadirkan asisten cerdas <strong>NESAI</strong> untuk memudahkan siswa, calon siswa,
                dan orang tua dalam mengakses informasi sekolah secara instan kapan pun dan di mana pun. Mari melangkah
                bersama menuju masa depan gemilang.
              </p>
            </div>

            {/* Key Pillars */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-slate-100 pt-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0" />
                <span className="text-sm font-semibold text-slate-800">Link & Match Industri</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0" />
                <span className="text-sm font-semibold text-slate-800">Sertifikasi Kompetensi</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0" />
                <span className="text-sm font-semibold text-slate-800">Karakter & Nilai Kerja</span>
              </div>
            </div>

            {/* Signature Block */}
            <div className="mt-8 pt-4">
              <p className="font-bold text-slate-900 text-lg">Deden Suryanto, M.Pd</p>
              <p className="text-sm font-medium text-blue-600">Kepala SMK Negeri 1 Subang</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
