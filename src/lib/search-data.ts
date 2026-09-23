export interface SearchDocument {
  title: string;
  description: string;
  href: string;
  category: string;
  keywords: string;
}

export const SEARCH_DOCUMENTS: SearchDocument[] = [
  {
    title: 'Beranda SMKN 1 Subang',
    description: 'Informasi umum sekolah, program keahlian, fasilitas belajar, dan penerimaan peserta didik baru.',
    href: '/',
    category: 'Halaman',
    keywords: 'beranda sekolah SMKN 1 Subang NESAS siswa pendidikan vokasi',
  },
  {
    title: 'Profil & Identitas Sekolah',
    description: 'Sejarah, visi, misi, nilai budaya, tata kelola, dan identitas resmi SMK Negeri 1 Subang.',
    href: '/profil',
    category: 'Profil',
    keywords: 'profil sejarah visi misi kepala sekolah Nyantri Rancage Pinter Bageur akreditasi NPSN',
  },
  {
    title: 'Program Keahlian',
    description: 'Pilihan jurusan vokasi: TKJ, RPL, DKV, TOI, Bisnis Digital, serta Akuntansi dan Keuangan Lembaga.',
    href: '/jurusan',
    category: 'Akademik',
    keywords: 'jurusan program keahlian teknik komputer jaringan rekayasa perangkat lunak multimedia desain otomasi bisnis digital pemasaran akuntansi',
  },
  {
    title: 'Teknik Komputer & Jaringan (TKJ)',
    description: 'Belajar jaringan, keamanan siber, administrasi server, cloud computing, routing, dan switching.',
    href: '/jurusan#tkj',
    category: 'Jurusan',
    keywords: 'TKJ komputer jaringan cyber security server cloud MikroTik Cisco network engineer',
  },
  {
    title: 'Rekayasa Perangkat Lunak (RPL)',
    description: 'Fokus pada pemrograman, basis data, web full-stack, aplikasi mobile, API, dan AI.',
    href: '/jurusan#rpl',
    category: 'Jurusan',
    keywords: 'RPL coding software pemrograman web mobile database Next.js Laravel Flutter developer AI',
  },
  {
    title: 'Multimedia & Desain Komunikasi Visual (DKV)',
    description: 'Pengembangan keterampilan desain, animasi, sinematografi, fotografi, UI/UX, dan branding.',
    href: '/jurusan#dkv',
    category: 'Jurusan',
    keywords: 'DKV desain multimedia animasi video fotografi UI UX branding kreatif',
  },
  {
    title: 'Teknik Otomasi Industri (TOI)',
    description: 'Mempelajari PLC, sensor, aktuator, pneumatik, hidrolik, dan robotik manufaktur.',
    href: '/jurusan#toi',
    category: 'Jurusan',
    keywords: 'TOI otomasi industri PLC robotik mekatronika sensor manufaktur',
  },
  {
    title: 'Bisnis Digital & Pemasaran (BDP)',
    description: 'Strategi pemasaran digital, marketplace, content strategy, SEO, dan analitik bisnis.',
    href: '/jurusan#bdp',
    category: 'Jurusan',
    keywords: 'BDP bisnis digital pemasaran marketplace ecommerce SEO content marketing wirausaha',
  },
  {
    title: 'Akuntansi & Keuangan Lembaga (AKL)',
    description: 'Keahlian pembukuan digital, perpajakan, audit, perbankan, dan laporan keuangan.',
    href: '/jurusan#akl',
    category: 'Jurusan',
    keywords: 'AKL akuntansi keuangan pajak audit perbankan MYOB Accurate laporan',
  },
  {
    title: 'Fasilitas Belajar & Sarana Prasarana',
    description: 'Laboratorium IT, data center, studio multimedia, workshop otomasi, perpustakaan, aula, dan sarana olahraga.',
    href: '/fasilitas',
    category: 'Fasilitas',
    keywords: 'fasilitas laboratorium komputer IoT server studio multimedia green screen robotik perpustakaan aula olahraga masjid',
  },
  {
    title: 'Berita & Pengumuman Sekolah',
    description: 'Kabar kegiatan akademik, prestasi siswa, kemitraan industri, dan agenda resmi sekolah.',
    href: '/berita',
    category: 'Berita',
    keywords: 'berita pengumuman LKS prestasi medali MoU industri PPDB kunjungan workshop pameran AI guru',
  },
  {
    title: 'Penerimaan Peserta Didik Baru (PPDB)',
    description: 'Informasi pendaftaran, jadwal seleksi, persyaratan, kuota jurusan, dan panduan PPDB.',
    href: '/ppdb',
    category: 'Layanan',
    keywords: 'PPDB pendaftaran siswa baru seleksi jadwal persyaratan kuota 2026 2027',
  },
  {
    title: 'Kontak Sekolah',
    description: 'Alamat, nomor telepon, dan email resmi SMKN 1 Subang.',
    href: '/kontak',
    category: 'Layanan',
    keywords: 'kontak alamat telepon email lokasi Subang info',
  },
  {
    title: 'Prestasi Siswa',
    description: 'Pencapaian dan prestasi siswa SMKN 1 Subang di bidang akademik, kompetensi, dan kreativitas.',
    href: '/prestasi',
    category: 'Prestasi',
    keywords: 'prestasi penghargaan juara siswa kompetisi LKS akademik olahraga seni',
  },
];

const normalize = (value: string) => value.toLocaleLowerCase('id-ID').trim();

export function searchDocuments(query: string): SearchDocument[] {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return [];

  const queryTokens = normalizedQuery.split(/\\s+/).filter(Boolean);
  return SEARCH_DOCUMENTS
    .map((document) => {
      const searchable = normalize(`${document.title} ${document.description} ${document.keywords}`);
      const title = normalize(document.title);
      let score = 0;

      if (searchable.includes(normalizedQuery)) score += 30;
      if (title.includes(normalizedQuery)) score += 35;

      for (const token of queryTokens) {
        if (title.split(/\\s+/).some((word) => word.startsWith(token))) score += 12;
        else if (searchable.includes(token)) score += 5;
      }

      return { document, score };
    })
    .filter(({ score }) => score > 0)
    .sort((left, right) => right.score - left.score || left.document.title.localeCompare(right.document.title))
    .map(({ document }) => document);
}
