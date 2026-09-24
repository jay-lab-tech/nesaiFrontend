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
    keywords: 'profil sejarah visi misi Nyantri Rancage Pinter Bageur akreditasi NPSN',
  },
  {
    title: 'Akuntansi dan Keuangan Lembaga (AKL)',
    description: 'Program AKL mempelajari pembukuan, administrasi keuangan, perpajakan, dan layanan perbankan.',
    href: '/jurusan#akl',
    category: 'Program Keahlian',
    keywords: 'AKL akuntansi pembukuan administrasi keuangan perpajakan perbankan',
  },
  {
    title: 'Pemasaran',
    description: 'Program Pemasaran membahas penjualan, promosi, bisnis ritel, e-commerce, dan pemasaran digital.',
    href: '/jurusan#pms',
    category: 'Program Keahlian',
    keywords: 'PMS pemasaran penjualan promosi bisnis ritel ecommerce digital marketing',
  },
  {
    title: 'Manajemen Perkantoran dan Layanan Bisnis (MPLB)',
    description: 'Program MPLB mengembangkan kemampuan administrasi perkantoran, pengelolaan dokumen, teknologi perkantoran, dan layanan pelanggan.',
    href: '/jurusan#mplb',
    category: 'Program Keahlian',
    keywords: 'MPLB manajemen perkantoran administrasi dokumen teknologi layanan pelanggan',
  },
  {
    title: 'Teknik Jaringan Komputer dan Telekomunikasi (TJKT)',
    description: 'Program TJKT mempelajari instalasi, konfigurasi, dan pemeliharaan komputer, jaringan, internet, serta fiber optik.',
    href: '/jurusan#tjkt',
    category: 'Program Keahlian',
    keywords: 'TJKT teknik jaringan komputer telekomunikasi instalasi konfigurasi internet fiber optik',
  },
  {
    title: 'Teknik Otomotif',
    description: 'Program Teknik Otomotif berfokus pada perawatan dan perbaikan kendaraan roda dua serta dasar kewirausahaan bengkel.',
    href: '/jurusan#to',
    category: 'Program Keahlian',
    keywords: 'TO teknik otomotif kendaraan roda dua perawatan perbaikan bengkel kewirausahaan',
  },
  {
    title: 'Desain Komunikasi Visual (DKV)',
    description: 'Program DKV mempelajari tata letak, warna, ilustrasi, tipografi, videografi, dan fotografi.',
    href: '/jurusan#dkv',
    category: 'Program Keahlian',
    keywords: 'DKV desain komunikasi visual layout warna ilustrasi tipografi videografi fotografi',
  },
  {
    title: 'Teknik Mesin',
    description: 'Program Teknik Mesin mempelajari produksi komponen mesin dan otomotif menggunakan mesin konvensional maupun CNC.',
    href: '/jurusan#tm',
    category: 'Program Keahlian',
    keywords: 'TM teknik mesin produksi komponen otomotif CNC mesin konvensional',
  },
  {
    title: 'Kuliner',
    description: 'Program Kuliner mempelajari pengolahan makanan, penyajian, pelayanan makanan dan minuman, serta keamanan pangan.',
    href: '/jurusan#kl',
    category: 'Program Keahlian',
    keywords: 'KL kuliner makanan minuman penyajian pelayanan keamanan pangan',
  },
  {
    title: 'Teknik Logistik',
    description: 'Program Teknik Logistik membahas perencanaan, pengendalian, penyimpanan, pemindahan, dan distribusi barang.',
    href: '/jurusan#tl',
    category: 'Program Keahlian',
    keywords: 'TL teknik logistik perencanaan pengendalian penyimpanan pemindahan distribusi barang',
  },
  {
    title: 'Alur PPDB: Buat Akun dan Lengkapi Berkas',
    description: 'Calon peserta didik perlu mengikuti portal pendaftaran resmi sesuai jadwal, membuat akun, menyiapkan dokumen, dan memeriksa kembali berkas sebelum dikirim.',
    href: '/ppdb',
    category: 'PPDB',
    keywords: 'PPDB pendaftaran buat akun lengkapi berkas dokumen calon siswa jadwal portal resmi',
  },
  {
    title: 'Alur PPDB: Pilih Program dan Pantau Pengumuman',
    description: 'Pahami pilihan program keahlian dan ketentuan seleksi, kemudian periksa hasil seleksi melalui kanal resmi sekolah.',
    href: '/ppdb',
    category: 'PPDB',
    keywords: 'PPDB pilih program jurusan seleksi pantau pengumuman hasil seleksi kanal resmi',
  },
  {
    title: 'Berita Kegiatan dan Informasi Sekolah',
    description: 'Pembaruan informasi sekolah dan layanan untuk peserta didik, orang tua, dan masyarakat, termasuk kegiatan pembelajaran, organisasi siswa, dan praktik program keahlian.',
    href: '/berita',
    category: 'Berita',
    keywords: 'berita informasi kegiatan sekolah layanan siswa orang tua masyarakat organisasi praktik akademik',
  },
  {
    title: 'Ruang Prestasi dan Karya Siswa',
    description: 'Dokumentasi prestasi akademik, kompetensi, seni, olahraga, organisasi, pengembangan diri, produk, prototipe, dan karya siswa berbasis praktik.',
    href: '/prestasi',
    category: 'Prestasi',
    keywords: 'prestasi akademik kompetensi seni olahraga organisasi karya inovasi produk prototipe ekstrakurikuler',
  },
  {
    title: 'Alamat dan Kontak Resmi Sekolah',
    description: 'SMKN 1 Subang beralamat di Jl. Arief Rahman Hakim No. 35, Kelurahan Cigadung, Kecamatan Subang, Kabupaten Subang, Jawa Barat 41213. Telepon (0260) 411410 dan email info@smkn1subang.sch.id.',
    href: '/kontak',
    category: 'Kontak',
    keywords: 'kontak alamat telepon email lokasi peta Cigadung Subang Jawa Barat info@smkn1subang.sch.id 0260 411410',
  },

  {
    title: 'Kepala Sekolah SMKN 1 Subang',
    description: 'Walyati Retnoningsih, S.Si., M.AP adalah Kepala SMKN 1 Subang. Informasi ini tercantum pada identitas resmi sekolah bersama NPSN 20233680, akreditasi A, dan tahun berdiri 1965.',
    href: '/profil',
    category: 'Profil',
    keywords: 'kepala sekolah kepala SMKN 1 Subang Walyati Retnoningsih S.Si M.AP pimpinan identitas sekolah NPSN akreditasi didirikan 1965',
  },
  {
    title: 'Sambutan Kepala Sekolah',
    description: 'Walyati Retnoningsih menyambut siswa, orang tua, calon peserta didik, dan masyarakat di portal SMKN 1 Subang. Portal ini membantu menemukan informasi sekolah secara jelas dan terarah, sekaligus mendukung pendidikan vokasi yang membangun karakter, keterampilan, dan kesiapan beradaptasi dengan perubahan zaman.',
    href: '/',
    category: 'Profil',
    keywords: 'sambutan kepala sekolah Walyati Retnoningsih Assalamualaikum portal siswa orang tua calon peserta didik masyarakat pendidikan vokasi karakter keterampilan adaptif perubahan zaman',
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
    title: 'Kompetensi RPL: Web, Mobile, Cloud, dan AI',
    description: 'Siswa RPL mempelajari pemrograman web modern, aplikasi mobile Android dan iOS, basis data enterprise, cloud deployment, serta artificial intelligence engineering.',
    href: '/jurusan#rpl',
    category: 'Akademik',
    keywords: 'RPL PPLG kompetensi pemrograman web Android iOS basis data enterprise cloud deployment artificial intelligence engineering',
  },
  {
    title: 'Laboratorium Rekayasa Perangkat Lunak',
    description: 'Lab RPL menjadi ruang praktik untuk mencoba, membuat, menguji, dan memperbaiki perangkat lunak sebagai bagian dari pembelajaran vokasi.',
    href: '/fasilitas',
    category: 'Fasilitas',
    keywords: 'RPL laboratorium lab praktik coding komputer perangkat lunak ruang belajar',
  },
  {
    title: 'Prestasi RPL di LKS Nasional 2026',
    description: 'Perwakilan jurusan RPL dan TKJ meraih predikat juara umum pada cabang Cyber Security dan Web Technologies di LKS tingkat nasional.',
    href: '/berita',
    category: 'Prestasi',
    keywords: 'RPL LKS nasional cyber security web technologies medali emas juara kompetisi',
  },
  {
    title: 'Pengalaman Alumni RPL di Industri Teknologi',
    description: 'Alumni RPL membangun kepercayaan diri melalui pondasi logika programming dan pengalaman membuat aplikasi full-stack yang relevan dengan standar industri teknologi.',
    href: '/',
    category: 'Alumni',
    keywords: 'RPL alumni software engineer programming full-stack aplikasi industri teknologi karir',
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
  {
    title: 'Akuntansi dan Keuangan Lembaga (AKL)',
    description: 'Program AKL mempelajari pembukuan, administrasi keuangan, perpajakan, dan layanan perbankan.',
    href: '/jurusan#akl',
    category: 'Program Keahlian',
    keywords: 'AKL akuntansi pembukuan administrasi keuangan perpajakan perbankan pajak',
  },
  {
    title: 'Pemasaran (PMS)',
    description: 'Program Pemasaran mempelajari penjualan, promosi, bisnis ritel, e-commerce, dan pemasaran digital.',
    href: '/jurusan#pms',
    category: 'Program Keahlian',
    keywords: 'PMS pemasaran penjualan promosi bisnis ritel ecommerce digital marketing',
  },
  {
    title: 'Manajemen Perkantoran dan Layanan Bisnis (MPLB)',
    description: 'Program MPLB membekali siswa dengan administrasi perkantoran, pengelolaan dokumen, teknologi perkantoran, dan layanan pelanggan.',
    href: '/jurusan#mplb',
    category: 'Program Keahlian',
    keywords: 'MPLB manajemen perkantoran administrasi dokumen teknologi layanan pelanggan',
  },
  {
    title: 'Pengembangan Perangkat Lunak dan Gim (PPLG)',
    description: 'Program PPLG mempelajari analisis, perancangan, pembuatan, pengujian, dan pemeliharaan perangkat lunak serta gim.',
    href: '/jurusan#pplg',
    category: 'Program Keahlian',
    keywords: 'PPLG RPL perangkat lunak gim game analisis perancangan pembuatan pengujian pemeliharaan coding',
  },
  {
    title: 'Teknik Jaringan Komputer dan Telekomunikasi (TJKT)',
    description: 'Program TJKT mempelajari instalasi, konfigurasi, dan pemeliharaan komputer, jaringan, internet, serta fiber optik.',
    href: '/jurusan#tjkt',
    category: 'Program Keahlian',
    keywords: 'TJKT TKJ jaringan komputer telekomunikasi instalasi konfigurasi internet fiber optik',
  },
  {
    title: 'Teknik Otomotif (TO)',
    description: 'Program Teknik Otomotif berfokus pada perawatan dan perbaikan kendaraan roda dua serta dasar kewirausahaan bengkel.',
    href: '/jurusan#to',
    category: 'Program Keahlian',
    keywords: 'TO otomotif kendaraan motor roda dua perawatan perbaikan bengkel wirausaha',
  },
  {
    title: 'Desain Komunikasi Visual (DKV)',
    description: 'Program DKV mempelajari desain tata letak, warna, ilustrasi, tipografi, videografi, dan fotografi.',
    href: '/jurusan#dkv',
    category: 'Program Keahlian',
    keywords: 'DKV desain tata letak warna ilustrasi tipografi videografi fotografi visual',
  },
  {
    title: 'Teknik Mesin (TM)',
    description: 'Program Teknik Mesin mempelajari produksi komponen mesin dan otomotif menggunakan mesin konvensional maupun CNC.',
    href: '/jurusan#tm',
    category: 'Program Keahlian',
    keywords: 'TM teknik mesin produksi komponen otomotif mesin konvensional CNC manufaktur',
  },
  {
    title: 'Kuliner (KL)',
    description: 'Program Kuliner mempelajari pengolahan makanan, penyajian, pelayanan makanan dan minuman, serta keamanan pangan.',
    href: '/jurusan#kl',
    category: 'Program Keahlian',
    keywords: 'KL kuliner makanan minuman penyajian pelayanan keamanan pangan memasak',
  },
  {
    title: 'Teknik Logistik (TL)',
    description: 'Program Teknik Logistik mempelajari perencanaan, pengendalian, penyimpanan, pemindahan, dan distribusi barang.',
    href: '/jurusan#tl',
    category: 'Program Keahlian',
    keywords: 'TL teknik logistik perencanaan pengendalian penyimpanan pemindahan distribusi barang gudang',
  },
  {
    title: 'Alur PPDB: Buat Akun dan Lengkapi Berkas',
    description: 'Calon peserta didik mengikuti portal pendaftaran resmi sesuai jadwal, membuat akun, menyiapkan dokumen, lalu memeriksa kembali berkas sebelum dikirim.',
    href: '/ppdb',
    category: 'PPDB',
    keywords: 'PPDB pendaftaran buat akun lengkapi berkas dokumen calon siswa jadwal portal',
  },
  {
    title: 'Alur PPDB: Pilih Program dan Pantau Pengumuman',
    description: 'Calon siswa memahami pilihan program keahlian dan ketentuan seleksi, kemudian memeriksa hasil seleksi melalui kanal resmi sekolah.',
    href: '/ppdb',
    category: 'PPDB',
    keywords: 'PPDB pilih jurusan program keahlian seleksi pengumuman hasil diterima',
  },
  {
    title: 'Visi dan Misi SMKN 1 Subang',
    description: 'Sekolah menyiapkan lulusan yang berkarakter agamis, berjiwa wirausaha, mampu beradaptasi dengan perkembangan zaman, kompeten, peduli lingkungan, dan mendukung implementasi BLUD.',
    href: '/profil#visi-misi',
    category: 'Profil',
    keywords: 'visi misi karakter agamis wirausaha adaptasi kompeten lingkungan BLUD nilai sekolah',
  },
  {
    title: 'Alamat SMKN 1 Subang',
    description: 'SMKN 1 Subang beralamat di Jl. Arief Rahman Hakim No. 35, Kelurahan Cigadung, Kecamatan Subang, Kabupaten Subang, Jawa Barat 41213.',
    href: '/kontak',
    category: 'Kontak',
    keywords: 'alamat lokasi jalan Arief Rahman Hakim Cigadung Subang Jawa Barat 41213 sekolah',
  },
  {
    title: 'Kontak Resmi SMKN 1 Subang',
    description: 'Hubungi sekolah melalui telepon (0260) 411410 atau email info@smkn1subang.sch.id untuk pertanyaan tentang profil, jurusan, PPDB, dan layanan sekolah.',
    href: '/kontak',
    category: 'Kontak',
    keywords: 'kontak telepon email info smkn1subang sch id layanan pertanyaan informasi',
  },
  {
    title: 'Ruang Prestasi dan Karya Siswa',
    description: 'Prestasi sekolah mencakup kompetisi akademik dan keahlian, karya serta prototipe siswa, kegiatan seni, olahraga, organisasi, dan pengembangan diri.',
    href: '/prestasi',
    category: 'Prestasi',
    keywords: 'prestasi kompetisi karya prototipe ekstrakurikuler seni olahraga organisasi akademik inovasi',
  },
];

const normalize = (value: string) => value
  .toLocaleLowerCase('id-ID')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .trim();

const tokenize = (value: string): string[] => normalize(value).match(/[a-z0-9]+/g) ?? [];

function levenshteinDistance(left: string, right: string): number {
  const previous = Array.from({ length: right.length + 1 }, (_, index) => index);

  for (let leftIndex = 1; leftIndex <= left.length; leftIndex += 1) {
    let diagonal = previous[0];
    previous[0] = leftIndex;

    for (let rightIndex = 1; rightIndex <= right.length; rightIndex += 1) {
      const above = previous[rightIndex];
      previous[rightIndex] = left[leftIndex - 1] === right[rightIndex - 1]
        ? diagonal
        : Math.min(diagonal, previous[rightIndex - 1], above) + 1;
      diagonal = above;
    }
  }

  return previous[right.length];
}

function fuzzyMatch(token: string, words: string[]): { word: string; distance: number } | null {
  if (token.length < 3) return null;

  return words
    .filter((word) => word.length >= 3)
    .map((word) => ({ word, distance: levenshteinDistance(token, word) }))
    .filter(({ distance, word }) => distance <= Math.max(1, Math.floor(Math.max(token.length, word.length) / 3)))
    .sort((left, right) => left.distance - right.distance || left.word.length - right.word.length)[0] ?? null;
}

function matchesAbbreviation(token: string, words: string[]): boolean {
  for (let start = 0; start < words.length; start += 1) {
    let abbreviation = '';

    for (let end = start; end < Math.min(words.length, start + 4); end += 1) {
      abbreviation += words[end].slice(0, 3);
      if (abbreviation === token) return true;
    }
  }

  return false;
}

export function searchDocuments(query: string): SearchDocument[] {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return [];

  const queryTokens = tokenize(normalizedQuery);
  return SEARCH_DOCUMENTS
    .map((document) => {
      const searchable = normalize(`${document.title} ${document.description} ${document.keywords}`);
      const title = normalize(document.title);
      const searchableWords = tokenize(searchable);
      const titleWords = tokenize(title);
      let score = 0;

      if (searchable.includes(normalizedQuery)) score += 30;
      if (title.includes(normalizedQuery)) score += 35;

      for (const token of queryTokens) {
        if (titleWords.some((word) => word.startsWith(token))) score += 12;
        else if (searchableWords.includes(token)) score += 5;
        else if (fuzzyMatch(token, searchableWords)) score += 3;
      }

      return { document, score };
    })
    .filter(({ score }) => score > 0)
    .sort((left, right) => right.score - left.score || left.document.title.localeCompare(right.document.title))
    .filter(({ document }, index, matches) => matches.findIndex((match) => match.document.href === document.href && match.document.title === document.title) === index)
    .map(({ document }) => document);
}

export function getSearchSuggestions(query: string): string[] {
  const queryTokens = tokenize(query);
  if (!queryTokens.length) return [];

  return SEARCH_DOCUMENTS
    .map((document) => {
      const titleWords = tokenize(document.title);
      const searchableWords = tokenize(`${document.title} ${document.description} ${document.keywords}`);
      const fuzzyMatches = queryTokens.map((token) => fuzzyMatch(token, searchableWords));
      const abbreviationMatches = queryTokens.map((token) => matchesAbbreviation(token, titleWords));
      const matchedTokens = queryTokens.filter((token, index) => searchableWords.includes(token) || fuzzyMatches[index] || abbreviationMatches[index]);
      const hasSuggestionMatch = fuzzyMatches.some(Boolean) || abbreviationMatches.some(Boolean);

      return {
        title: document.title,
        score: matchedTokens.length * 10 + (hasSuggestionMatch ? 5 : 0) + (titleWords.some((word) => queryTokens.includes(word)) ? 10 : 0),
        hasSuggestionMatch,
      };
    })
    .filter(({ score, hasSuggestionMatch }) => score > 0 && hasSuggestionMatch)
    .sort((left, right) => right.score - left.score || left.title.localeCompare(right.title))
    .map(({ title }) => title)
    .filter((title, index, suggestions) => suggestions.indexOf(title) === index)
    .slice(0, 3);
}
