import Link from 'next/link';
import { 
  Building2, 
  Target, 
  History, 
  Award, 
  ShieldCheck, 
  GraduationCap, 
  ChevronRight
} from 'lucide-react';
import { PrincipalSection } from '@/components/home/PrincipalSection';
import { NesaiPromoBar } from '@/components/home/NesaiPromoBar';

export const metadata = {
  title: 'Profil Sekolah — SMKN 1 Subang (NESAS)',
  description: 'Sejarah, Visi, Misi, Budaya Sekolah, dan Struktur Manajemen SMK Negeri 1 Subang.',
};

export default function ProfilPage() {
  const VALUES = [
    {
      title: 'Nyantri',
      desc: 'Menjunjung tinggi nilai spiritual, berakhlak karimah, bertoleransi, dan berintegritas.',
      color: 'from-blue-600 to-indigo-600',
    },
    {
      title: 'Rancage',
      desc: 'Terampil, tangkas, kreatif, dan senantiasa berorientasi pada solusi praktis industri.',
      color: 'from-cyan-600 to-teal-600',
    },
    {
      title: 'Pinter',
      desc: 'Cerdas dalam ilmu pengetahuan, menguasai teknologi terkini, dan adaptif terhadap AI.',
      color: 'from-amber-500 to-orange-600',
    },
    {
      title: 'Bageur',
      desc: 'Berbudi pekerti luhur, peduli sesama, sopan santun, dan menjunjung tinggi kerja tim.',
      color: 'from-emerald-600 to-teal-700',
    },
  ];

  const MANAGEMENT = [
    { role: 'Kepala Sekolah', name: 'Deden Suryanto, M.Pd' },
    { role: 'Wakasek Kurikulum', name: 'Drs. H. Ahmad Sudrajat, M.M' },
    { role: 'Wakasek Kesiswaan', name: 'Hj. Nenden Kurniasih, S.Pd' },
    { role: 'Wakasek Hubungan Industri (Hubinmas)', name: 'Ir. Budi Hermawan, M.T' },
    { role: 'Wakasek Sarana & Prasarana', name: 'Yayan Hendrayana, S.T' },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="relative bg-slate-950 text-white py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-25 filter brightness-50"
             style={{ backgroundImage: `url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2000&q=80')` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-4">
            <Link href="/" className="hover:text-cyan-300 transition-colors">Beranda</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-cyan-300">Profil Sekolah</span>
          </nav>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/20 border border-cyan-400/30 px-3.5 py-1 text-xs font-semibold text-cyan-300 mb-4">
            <Building2 className="h-3.5 w-3.5 text-cyan-400" />
            Tentang SMKN 1 Subang
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Profil & Identitas Sekolah
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Mengenal lebih dekat sejarah, visi misi, tata kelola, dan komitmen keunggulan SMK Negeri 1 Subang dalam menyiapkan generasi emas berdaya saing global.
          </p>
        </div>
      </section>

      {/* Sambutan Kepala Sekolah */}
      <PrincipalSection />

      {/* Visi & Misi */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Visi */}
            <div className="rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-50/80 to-sky-50/50 p-8 sm:p-10 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md">
                  <Target className="h-6 w-6 text-cyan-200" />
                </div>
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Arah & Pandangan</span>
                  <h2 className="text-2xl font-extrabold text-slate-900">Visi Sekolah</h2>
                </div>
              </div>
              <p className="text-lg font-semibold text-slate-800 leading-relaxed italic">
                &ldquo;Menjadi Sekolah Menengah Kejuruan Pusat Keunggulan yang menghasilkan tamatan beriman, bertakwa, berkarakter mulia, kompeten, mandiri, dan berdaya saing global di era Industri 4.0.&rdquo;
              </p>
            </div>

            {/* Misi */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-md">
                  <Award className="h-6 w-6 text-cyan-400" />
                </div>
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Langkah Strategis</span>
                  <h2 className="text-2xl font-extrabold text-slate-900">Misi Sekolah</h2>
                </div>
              </div>
              <ul className="space-y-4 text-sm sm:text-base text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-xs font-bold">1</span>
                  <span>Mengembangkan kurikulum kejuruan yang selaras (*link and match*) dengan kebutuhan dunia usaha dan dunia industri (DUDI).</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-xs font-bold">2</span>
                  <span>Menyelenggarakan proses pembelajaran berbasis *Teaching Factory* (TEFA) dan sertifikasi kompetensi keahlian nasional/internasional.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-xs font-bold">3</span>
                  <span>Meningkatkan sarana prasarana modern, laboratorium berstandar industri, dan pemanfaatan kecerdasan artifisial.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-xs font-bold">4</span>
                  <span>Menumbuhkan jiwa kewirausahaan (*technopreneurship*) dan budaya kerja industri berakhlak mulia.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Nilai Budaya Sekolah NESAS */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 border border-blue-200 px-3.5 py-1 text-xs font-bold text-blue-700 uppercase tracking-wider mb-3">
              Karakter Vokasi
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-4">
              Nilai Budaya Sekolah (NESAS)
            </h2>
            <p className="text-slate-600">
              Prinsip integritas luhur yang ditanamkan kepada setiap civitas akademika SMKN 1 Subang.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((val) => (
              <div
                key={val.title}
                className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <div className={`h-2.5 w-16 rounded-full bg-gradient-to-r ${val.color} mb-6`} />
                <h3 className="text-2xl font-extrabold text-slate-900 mb-2">{val.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sejarah Singkat & Legalitas */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-100 border border-cyan-200 px-3.5 py-1 text-xs font-bold text-cyan-800 uppercase tracking-wider">
                <History className="h-3.5 w-3.5" />
                Sejarah Singkat
              </span>
              <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">
                Bertransformasi Menjadi Pusat Keunggulan Vokasi Subang
              </h2>
              <p className="text-slate-600 leading-relaxed">
                SMKN 1 Subang (dikenal akrab sebagai NESAS) didirikan pada tahun 1968 guna memenuhi kebutuhan tenaga kerja terampil di wilayah Subang dan sekitarnya. Berawal dari STM Negeri Subang dengan dua jurusan teknik dasar, kini sekolah telah bertransformasi menjadi institusi vokasi unggulan dengan 6 program keahlian berstandar industri era 4.0.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Melalui penetapan resmi sebagai <strong>SMK Pusat Keunggulan (SMK-PK)</strong> oleh Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi RI, SMKN 1 Subang terus memimpin inovasi pembelajaran berbasis Teaching Factory, kemitraan DUDI, serta pemanfaatan teknologi digital terpadu.
              </p>

              <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-xs text-slate-500 font-semibold">Tahun Berdiri</p>
                  <p className="text-xl font-black text-blue-600">1968</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-xs text-slate-500 font-semibold">Akreditasi</p>
                  <p className="text-xl font-black text-emerald-600">A (Unggul)</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-xs text-slate-500 font-semibold">Status Sekolah</p>
                  <p className="text-xl font-black text-purple-600">SMK-PK</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-slate-200 bg-slate-900 text-white p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <ShieldCheck className="h-6 w-6 text-cyan-400" />
                  <h3 className="text-xl font-bold">Identitas Resmi</h3>
                </div>
                <dl className="space-y-4 text-sm divide-y divide-slate-800">
                  <div className="pt-2 flex justify-between">
                    <dt className="text-slate-400">NPSN</dt>
                    <dd className="font-semibold text-slate-100">20233680</dd>
                  </div>
                  <div className="pt-3 flex justify-between">
                    <dt className="text-slate-400">Bentuk Pendidikan</dt>
                    <dd className="font-semibold text-slate-100">SMK Negeri</dd>
                  </div>
                  <div className="pt-3 flex justify-between">
                    <dt className="text-slate-400">Status Kepemilikan</dt>
                    <dd className="font-semibold text-slate-100">Pemerintah Daerah Prov. Jabar</dd>
                  </div>
                  <div className="pt-3 flex justify-between">
                    <dt className="text-slate-400">Kurikulum</dt>
                    <dd className="font-semibold text-slate-100">Kurikulum Merdeka Vokasi</dd>
                  </div>
                  <div className="pt-3 flex justify-between">
                    <dt className="text-slate-400">Nomor Telepon</dt>
                    <dd className="font-semibold text-slate-100">(0260) 411410</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Struktur Kepemimpinan */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 border border-blue-200 px-3.5 py-1 text-xs font-bold text-blue-700 uppercase tracking-wider mb-3">
              Manajemen Sekolah
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Pimpinan & Manajemen
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {MANAGEMENT.map((mgr, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex items-center gap-4"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 font-bold border border-blue-200">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">{mgr.role}</p>
                  <p className="text-base font-bold text-slate-900 mt-0.5">{mgr.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Bar */}
      <NesaiPromoBar />
    </div>
  );
}
