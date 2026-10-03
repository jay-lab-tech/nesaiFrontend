/**
 * ============================================================================
 * SITE DATA — SMK Negeri 1 Subang (BERANDA)
 * ============================================================================
 *
 * ⚠️  SEMUA ANGKA, NAMA MITRA, JADWAL, DAN STATISTIK DI FILE INI ADALAH DUMMY
 *     (sesuai "Brief Konsep Website SMK Negeri 1 Subang", bagian 14).
 *     WAJIB DIGANTI DENGAN DATA RESMI SEBELUM TAYANG.
 *
 * Tujuan file ini:
 * - Menjadi SATU tempat untuk seluruh teks/angka beranda agar mudah diganti
 *   saat data resmi sudah tersedia (tidak tersebar di banyak komponen).
 * - Data dinamis (berita, PPDB, profil sekolah) tetap diprioritaskan dari REST
 *   API/CMS di `src/app/page.tsx`; nilai di sini hanya dipakai sebagai fallback.
 *
 * TODO(data-resmi): ganti seluruh nilai `TODO(dummy)` di bawah dengan data
 * resmi dan cantumkan sumber + tahun pada setiap angka statistik.
 */

// ── Tautan rute ──────────────────────────────────────────────────────────────

export const ROUTES = {
  beranda: '/',
  tentang: '/profil',
  jurusan: '/jurusan',
  karyaIndustri: '/karya-industri',
  portofolio: '/karya-industri/portofolio',
  pkl: '/pkl',
  alumni: '/karya-industri/alumni',
  mitra: '/karya-industri/mitra',
  ppdb: '/ppdb',
  nesai: '/tanya-nesai',
  kontak: '/kontak',
  berita: '/berita',
  prestasi: '/prestasi',
  fasilitas: '/fasilitas',
} as const;

// ── 4.1 Hero ─────────────────────────────────────────────────────────────────

export const HERO = {
  // TODO(dummy): copy mengikuti brief bagian 4.1 (sudah final secara teks)
  title: 'Temukan yang Kamu Suka. Kuasai Keahliannya.',
  description:
    'Di sini, kamu tidak hanya belajar dari buku. Kamu akan mencoba, membuat karya, dan mengenal dunia kerja sejak di bangku sekolah.',
  primaryCta: { label: 'Kenali Jurusan', href: ROUTES.jurusan },
  secondaryCta: { label: 'Daftar PPDB', href: ROUTES.ppdb },
  // TODO(foto): ganti dengan foto asli siswa/fasilitas SMKN 1 Subang.
  image:
    'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=2200&q=90',
} as const;

// ── 4.2 Keunggulan Sekolah ───────────────────────────────────────────────────

export const KEUNGGULAN = {
  // TODO(dummy): judul & deskripsi mengikuti brief 4.2
  title: 'Belajar bukan hanya duduk dan mendengarkan.',
  description:
    'Setiap hari, kamu diberi kesempatan mencoba hal baru, mengerjakan proyek, dan belajar dari pengalaman nyata.',
  cta: { label: 'Lihat Cara Belajar', href: '#cara-belajar' },
  highlights: [
    {
      id: 'praktik',
      title: 'Praktik langsung',
      description:
        'Lebih banyak waktu di laboratorium dan bengkel daripada sekadar teori di kelas.',
    },
    {
      id: 'bimbingan',
      title: 'Bimbingan guru',
      description:
        'Guru mendampingi setiap langkah saat kamu mencoba, membuat, dan memperbaiki karya.',
    },
    {
      id: 'industri',
      title: 'Hubungan industri',
      description:
        'Belajar tidak berhenti di sekolah — kamu mengenal dunia kerja melalui mitra kami.',
    },
  ],
} as const;

// ── 4.3 Statistik ────────────────────────────────────────────────────────────

export interface StatItem {
  value: string;
  label: string;
  year: string; // WAJIB: tahun data
  source: string; // WAJIB: sumber data
}

export const STATISTIK = {
  // TODO(dummy): judul & deskripsi mengikuti brief 4.3
  title: 'Bukan Hanya Angka',
  description:
    'Di balik setiap angka, ada siswa yang belajar, guru yang mendampingi, karya yang dibuat, dan langkah baru yang dimulai.',
  cta: { label: 'Lihat Cerita Sekolah', href: ROUTES.tentang },
  // TODO(data-resmi): ganti angka + tahun + sumber dengan data resmi sekolah.
  items: [
    { value: '9', label: 'Jurusan', year: '2026', source: 'Data sekolah (dummy)' },
    { value: '42', label: 'Mitra Industri', year: '2026', source: 'Data kemitraan (dummy)' },
    { value: '87%', label: 'Lulusan bekerja atau kuliah', year: '2026', source: 'Tracer study (dummy)' },
    { value: '1.240', label: 'Siswa', year: '2026', source: 'Data siswa (dummy)' },
  ] satisfies StatItem[],
} as const;

// ── 4.4 Semua Jurusan ────────────────────────────────────────────────────────

export const JURUSAN_SECTION = {
  // TODO(dummy): judul & deskripsi mengikuti brief 4.4
  title: 'Temukan bidang yang paling dekat dengan minatmu.',
  description:
    'Suka angka, komputer, mesin, bisnis, logistik, atau memasak? Kenali semua pilihan jurusan.',
  cta: { label: 'Lihat Semua Jurusan', href: ROUTES.jurusan },
} as const;

/**
 * Daftar 9 jurusan sesuai brief 4.4.
 * `icon` adalah NAMA ikon lucide-react (bukan emoji) — dipetakan di komponen
 * agar file data tetap bebas dari dependensi React.
 * TODO(data-resmi): sinkronkan nama & slug dengan data CMS/database.
 */
export interface JurusanCard {
  code: string;
  slug: string;
  name: string;
  description: string; // satu kalimat, sesuai brief 4.4
  icon: string;
}

export const JURUSAN_CARDS: JurusanCard[] = [
  { code: 'AKL', slug: 'akl', name: 'AKL', description: 'Belajar mengatur angka, laporan, dan keuangan sebuah usaha.', icon: 'Calculator' },
  { code: 'BDP', slug: 'pemasaran', name: 'Pemasaran', description: 'Memahami pelanggan dan mengenalkan produk.', icon: 'ShoppingBag' },
  { code: 'MPLB', slug: 'mplb', name: 'MPLB', description: 'Mengatur pekerjaan kantor dan pelayanan.', icon: 'ClipboardList' },
  { code: 'PPLG', slug: 'pplg', name: 'PPLG', description: 'Membuat aplikasi, website, dan solusi digital.', icon: 'Code2' },
  { code: 'TJKT', slug: 'tjkt', name: 'TJKT', description: 'Memasang dan menjaga jaringan komputer.', icon: 'Network' },
  { code: 'TM', slug: 'teknik-mesin', name: 'Teknik Mesin', description: 'Menggunakan mesin dan membuat komponen presisi.', icon: 'Cog' },
  { code: 'TO', slug: 'teknik-otomotif', name: 'Teknik Otomotif', description: 'Merawat dan memperbaiki kendaraan.', icon: 'Wrench' },
  { code: 'TL', slug: 'teknik-logistik', name: 'Teknik Logistik', description: 'Mengatur penyimpanan dan distribusi barang.', icon: 'Truck' },
  { code: 'KL', slug: 'kuliner', name: 'Kuliner', description: 'Mengolah bahan menjadi makanan enak dan bernilai jual.', icon: 'UtensilsCrossed' },
];

// ── Pemetaan jurusan ke kelompok (brief bagian 6 & 13) ───────────────────────
//
// TODO(sinkronisasi): cms/database saat ini BELUM punya kolom `kelompok`.
// Pemetaan di bawah dilakukan secara percabangan dari nama jurusan:
// - Nama yang mengandung "Teknik" → kelompok "Teknik"
//   (termasuk Teknik Logistik, sesuai keputusan pemilik produk).
// - PPLG & TJKT → "Digital".
// - Kuliner → "Hospitality".
// - Sisanya → "Bisnis dan layanan".
// Ganti dengan data dari CMS begitu kolom `kelompok` tersedia di backend.

export type KelompokJurusan = 'Bisnis dan layanan' | 'Digital' | 'Teknik' | 'Hospitality';

export const KELOMPOK_JURUSAN: Record<
  KelompokJurusan,
  { label: KelompokJurusan; description: string }
> = {
  'Bisnis dan layanan': {
    label: 'Bisnis dan layanan',
    description:
      'Untuk kamu yang suka mengatur, menghitung, melayani, dan berkomunikasi.',
  },
  Digital: {
    label: 'Digital',
    description:
      'Untuk kamu yang tertarik pada komputer, aplikasi, jaringan, dan teknologi.',
  },
  Teknik: {
    label: 'Teknik',
    description:
      'Untuk kamu yang suka bekerja dengan mesin, alat, dan hal yang membutuhkan ketelitian.',
  },
  Hospitality: {
    label: 'Hospitality',
    description:
      'Untuk kamu yang senang memasak, mencoba rasa, dan membuat produk yang disukai orang.',
  },
};

/**
 * Tentukan kelompok jurusan dari nama/kode.
 * Percabangan sederhana sebagai pengganti data kelompok di CMS.
 */
export function resolveKelompokJurusan(input: {
  name?: string;
  code?: string;
  slug?: string;
}): KelompokJurusan {
  const haystack = `${input.name ?? ''} ${input.code ?? ''} ${input.slug ?? ''}`.toLowerCase();

  if (haystack.includes('pplg') || haystack.includes('perangkat lunak') || haystack.includes('tjkt') || haystack.includes('jaringan')) {
    return 'Digital';
  }
  if (haystack.includes('kuliner')) {
    return 'Hospitality';
  }
  // "Teknik" literal → Teknik (termasuk Teknik Logistik, sesuai keputusan produk).
  if (haystack.includes('teknik')) {
    return 'Teknik';
  }
  return 'Bisnis dan layanan';
}

// ── 4.5 Cara Belajar ─────────────────────────────────────────────────────────

export const CARA_BELAJAR = {
  // TODO(dummy): judul & deskripsi mengikuti brief 4.5
  title: 'Dari mencoba, menjadi bisa.',
  description:
    'Kamu mempelajari dasar, berlatih langsung, membuat proyek, lalu menerapkannya saat PKL.',
  cta: { label: 'Lihat Kegiatan Siswa', href: ROUTES.berita },
  steps: [
    { id: 'kenali', title: 'Kenali', description: 'Pelajari dasar dan konsep setiap bidang keahlian.' },
    { id: 'coba', title: 'Coba', description: 'Berlatih langsung di laboratorium dan bengkel.' },
    { id: 'buat', title: 'Buat', description: 'Kerjakan proyek nyata secara mandiri maupun berkelompok.' },
    { id: 'terapkan', title: 'Terapkan', description: 'Terapkan semua yang dipelajari saat PKL di dunia kerja.' },
  ],
} as const;

// ── 4.6 Portofolio & Mitra ───────────────────────────────────────────────────

export const PORTOFOLIO = {
  // TODO(dummy): judul & deskripsi mengikuti brief 4.6
  title: 'Karya siswa tidak berhenti di ruang kelas.',
  description:
    'Dari laporan keuangan, aplikasi, perawatan kendaraan sampai produk kuliner, siswa belajar menghasilkan karya yang berguna.',
  cta: { label: 'Lihat Portofolio', href: ROUTES.portofolio },
  // TODO(data-resmi): hanya tampilkan karya yang benar-benar dikerjakan siswa.
  works: [
    { id: 'k1', title: 'Aplikasi inventori sekolah', major: 'PPLG', type: 'Layanan digital' },
    { id: 'k2', title: 'Laporan keuangan usaha kecil', major: 'AKL', type: 'Produk bisnis' },
    { id: 'k3', title: 'Perawatan berkala kendaraan', major: 'Teknik Otomotif', type: 'Pekerjaan teknik' },
    { id: 'k4', title: 'Paket katering acara sekolah', major: 'Kuliner', type: 'Produk kuliner' },
  ],
  // TODO(data-resmi): hanya tampilkan mitra yang benar-benar terlibat & memberi izin.
  partners: [
    { id: 'm1', name: 'Mitra Industri A', type: 'Teknologi' },
    { id: 'm2', name: 'Mitra Industri B', type: 'Otomotif' },
    { id: 'm3', name: 'Mitra Industri C', type: 'Perbankan' },
    { id: 'm4', name: 'Mitra Industri D', type: 'Logistik' },
    { id: 'm5', name: 'Mitra Industri E', type: 'Kuliner' },
    { id: 'm6', name: 'Mitra Industri F', type: 'Retail' },
  ],
} as const;

// ── 4.7 Kegiatan Terbaru ─────────────────────────────────────────────────────

export const KEGIATAN = {
  // TODO(dummy): judul & deskripsi mengikuti brief 4.7
  title: 'Lihat apa yang sedang kami kerjakan.',
  description: 'Ikuti kegiatan, prestasi, proyek, dan cerita terbaru.',
  cta: { label: 'Lihat Semua Kegiatan', href: ROUTES.berita },
  // TODO(data-asli): ganti dengan berita dari CMS (sudah diambil via API).
  fallbackItems: [
    {
      id: 'n1',
      tag: 'Berita',
      title: 'Pembelajaran berbasis proyek di setiap jurusan',
      date: '2026-09-01',
      excerpt: 'Siswa mengerjakan proyek nyata sebagai bagian dari proses belajar di kelas.',
      href: ROUTES.berita,
    },
    {
      id: 'n2',
      tag: 'Prestasi',
      title: 'Prestasi siswa di ajang kompetensi keahlian',
      date: '2026-09-08',
      excerpt: 'Sejumlah siswa meraih penghargaan pada kompetisi tingkat daerah.',
      href: ROUTES.prestasi,
    },
    {
      id: 'n3',
      tag: 'Agenda',
      title: 'Agenda kegiatan dan kunjungan industri',
      date: '2026-09-15',
      excerpt: 'Jadwal kegiatan sekolah dan kunjungan ke mitra industri terdekat.',
      href: ROUTES.berita,
    },
  ],
} as const;

// ── 4.8 Jejak Alumni ─────────────────────────────────────────────────────────

export const JEJAK_ALUMNI = {
  // TODO(dummy): judul & deskripsi mengikuti brief 4.8
  title: 'Setelah lulus, kamu bisa melangkah ke banyak arah.',
  description:
    'Ada yang bekerja, melanjutkan kuliah, membangun usaha, atau mencari peluang kerja.',
  cta: { label: 'Lihat Jejak Alumni', href: ROUTES.alumni },
  // TODO(data-resmi): wajib cantumkan tahun data & sumber. Angka berikut dummy.
  dataYear: '2026',
  dataSource: 'Tracer study sekolah (dummy)',
  directions: [
    { id: 'bekerja', label: 'Bekerja', value: 48 },
    { id: 'kuliah', label: 'Melanjutkan kuliah', value: 27 },
    { id: 'wirausaha', label: 'Berwirausaha', value: 12 },
    { id: 'mencari', label: 'Mencari peluang kerja', value: 13 },
  ],
} as const;

// ── 4.9 Penutup / Ajakan ─────────────────────────────────────────────────────

export const PENUTUP = {
  // TODO(dummy): judul & deskripsi mengikuti brief 4.9
  title: 'Sudah menemukan jurusan yang kamu suka?',
  description:
    'Kalau belum yakin, Nesai dapat membantu mencocokkan minat dan kemampuanmu.',
  primaryCta: { label: 'Coba Rekomendasi Jurusan', href: ROUTES.nesai },
  secondaryCta: { label: 'Lihat Semua Jurusan', href: ROUTES.jurusan },
} as const;

// ── 4.10 PPDB di Beranda ─────────────────────────────────────────────────────

export const PPDB_BERANDA = {
  // TODO(dummy): judul & deskripsi mengikuti brief 4.10
  title: 'Mulai perjalananmu bersama kami.',
  description:
    'Pilih jurusan, siapkan berkas, dan ikuti proses pendaftaran dengan mudah.',
  cta: { label: 'Daftar PPDB', href: ROUTES.ppdb },
  ctaSecondary: { label: 'Tanya Nesai', href: ROUTES.nesai },
  // TODO(data-resmi): ganti status, gelombang, deadline, dan syarat berikut.
  status: 'Pendaftaran dibuka',
  wave: 'Gelombang 1',
  deadline: '30 Juni 2026',
  requirements: [
    'Ijazah / surat keterangan lulus',
    'Kartu keluarga & akta kelahiran',
    'Pas foto terbaru',
    'Nilai rapor semester terakhir',
  ],
  statusCheckNote: 'Cek status pendaftaranmu melalui halaman PPDB.',
} as const;

// ── 4.2b Sambutan Kepala Sekolah (dipertahankan di Beranda) ──────────────────

export const SAMBUTAN = {
  heading: 'Sambutan Kepala Sekolah',
  greeting: 'Assalamu\u2019alaikum Warahmatullahi Wabarakatuh,',
  // TODO(dummy): teks sambutan; ganti sesuai resmi.
  paragraphs: [
    'Selamat datang di website SMK Negeri 1 Subang. Kami senang kamu berkunjung dan mengenal sekolah ini lebih dekat.',
    'Kami percaya setiap siswa punya potensi. Tugas kami adalah membantu kamu menemukan keahlian, mencoba hal baru, dan menyiapkan langkah setelah lulus.',
  ],
  cta: { label: 'Baca Profil Sekolah', href: ROUTES.tentang },
  // TODO(data-resmi): nama & jabatan kepala sekolah.
  principalName: 'Kepala SMK Negeri 1 Subang',
  principalRole: 'Kepala Sekolah',
  principalImage: '/images/kepala-sekolah.png',
} as const;
