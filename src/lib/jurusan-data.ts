export interface Guru {
  nama: string;
  jabatan: string;
  bidang: string;
  pendidikan: string;
}

export interface Perusahaan {
  nama: string;
  bidang: string;
  deskripsi: string;
}

export interface Kompetensi {
  judul: string;
  deskripsi: string;
}

export interface PeluangKarir {
  posisi: string;
  deskripsi: string;
  gajiRange: string;
}

export interface MataPelajaran {
  semester: string;
  pelajaran: string[];
}

export interface ProfilJurusan {
  visi: string;
  misi: string[];
  akreditasi: string;
  tahunBerdiri: string;
  jumlahSiswa: string;
  jumlahKelas: string;
}

export interface Jurusan {
  code: string;
  slug: string;
  name: string;
  description: string;
  focus: string;
  subjects: string[];
  careers: string[];
  tagline: string;
  icon: string;
  kompetensi: Kompetensi[];
  profil: ProfilJurusan;
  peluangKarir: PeluangKarir[];
  mataPelajaran: MataPelajaran[];
  guru: Guru[];
  perusahaan: Perusahaan[];
}

export const JURUSAN: Jurusan[] = [
  {
    code: 'AKL',
    slug: 'akl',
    name: 'Akuntansi dan Keuangan Lembaga',
    description: 'Mempelajari pencatatan, pengelolaan, dan pelaporan keuangan untuk mendukung administrasi bisnis yang tertib dan akurat.',
    focus: 'Pembukuan, administrasi keuangan, perpajakan, dan layanan perbankan.',
    subjects: ['Akuntansi dasar', 'Komputer akuntansi', 'Perpajakan', 'Administrasi pajak'],
    careers: ['Staf akuntansi', 'Administrasi keuangan', 'Staf pajak', 'Wirausaha'],
    tagline: 'Mengelola keuangan dengan presisi dan integritas',
    icon: '📊',
    kompetensi: [
      { judul: 'Akuntansi Dasar', deskripsi: 'Menguasai siklus akuntansi lengkap dari jurnal umum hingga laporan keuangan sesuai SAK.' },
      { judul: 'Perpajakan', deskripsi: 'Menghitung, menyetor, dan melaporkan pajak (PPh, PPN) sesuai peraturan perpajakan Indonesia.' },
      { judul: 'Komputer Akuntansi', deskripsi: 'Mengoperasikan software akuntansi seperti MYOB, Accurate, dan Zahir Accounting.' },
      { judul: 'Keuangan Lembaga', deskripsi: 'Mengelola keuangan lembaga pemerintah dan swasta sesuai standar yang berlaku.' },
      { judul: 'Spreadsheet Akuntansi', deskripsi: 'Menggunakan Microsoft Excel untuk analisis keuangan dan pembuatan laporan.' },
      { judul: 'Audit Internal', deskripsi: 'Melaksanakan pemeriksaan internal untuk memastikan kepatuhan dan efisiensi keuangan.' },
    ],
    profil: {
      visi: 'Menjadi program keahlian akuntansi terbaik yang menghasilkan lulusan berintegritas dan siap bersaing di era digital.',
      misi: [
        'Menyelenggarakan pembelajaran akuntansi berbasis teknologi informasi',
        'Mempersiapkan siswa dengan sertifikasi teknisi akuntansi',
        'Mengembangkan karakter jujur, teliti, dan bertanggung jawab',
        'Menjalin kerja sama dengan kantor akuntan publik dan lembaga keuangan',
      ],
      akreditasi: 'A (Unggul)',
      tahunBerdiri: '2012',
      jumlahSiswa: '240',
      jumlahKelas: '8',
    },
    peluangKarir: [
      { posisi: 'Staff Akuntansi', deskripsi: 'Mengelola pencatatan dan pelaporan keuangan perusahaan', gajiRange: 'Rp 4 - 8 Juta/bulan' },
      { posisi: 'Tax Consultant', deskripsi: 'Memberikan konsultasi dan layanan perpajakan', gajiRange: 'Rp 6 - 15 Juta/bulan' },
      { posisi: 'Internal Auditor', deskripsi: 'Melakukan audit internal perusahaan', gajiRange: 'Rp 7 - 18 Juta/bulan' },
      { posisi: 'Financial Analyst', deskripsi: 'Menganalisis data keuangan untuk pengambilan keputusan', gajiRange: 'Rp 8 - 20 Juta/bulan' },
      { posisi: 'Teller Bank', deskripsi: 'Melayani transaksi nasabah di perbankan', gajiRange: 'Rp 4 - 7 Juta/bulan' },
      { posisi: 'Payroll Staff', deskripsi: 'Mengelola penggajian karyawan perusahaan', gajiRange: 'Rp 4 - 8 Juta/bulan' },
    ],
    mataPelajaran: [
      { semester: 'Semester 1-2 (Kelas X)', pelajaran: ['Pengantar Akuntansi', 'Ekonomi Bisnis', 'Etika Profesi', 'Teknologi Perkantoran', 'Matematika Keuangan'] },
      { semester: 'Semester 3-4 (Kelas XI)', pelajaran: ['Akuntansi Perusahaan Jasa & Dagang', 'Perpajakan', 'Komputer Akuntansi (MYOB/Accurate)', 'Akuntansi Keuangan', 'Spreadsheet Akuntansi'] },
      { semester: 'Semester 5-6 (Kelas XII)', pelajaran: ['Akuntansi Manufaktur', 'Akuntansi Lembaga/Instansi Pemerintah', 'Audit Internal', 'Proyek Akuntansi', 'Praktik Kerja Lapangan'] },
    ],
    guru: [
      { nama: 'Dra. Siti Aminah, M.Ak.', jabatan: 'Kepala Program Keahlian', bidang: 'Akuntansi Keuangan', pendidikan: 'S2 Akuntansi' },
      { nama: 'Edi Purwanto, S.E.', jabatan: 'Guru Produktif', bidang: 'Perpajakan', pendidikan: 'S1 Akuntansi' },
      { nama: 'Lina Marlina, S.E.', jabatan: 'Guru Produktif', bidang: 'Komputer Akuntansi', pendidikan: 'S1 Akuntansi' },
      { nama: 'Hendri Kurniawan, S.E., M.M.', jabatan: 'Guru Produktif', bidang: 'Audit & Keuangan Lembaga', pendidikan: 'S2 Manajemen' },
    ],
    perusahaan: [
      { nama: 'KAP Tanudiredja, Wibisana & Rekan (PwC)', bidang: 'Kantor Akuntan Publik', deskripsi: 'Program magang dan pelatihan audit' },
      { nama: 'Bank BRI', bidang: 'Perbankan', deskripsi: 'Magang dan rekrutmen teller & customer service' },
      { nama: 'Direktorat Jenderal Pajak', bidang: 'Pemerintahan', deskripsi: 'Pelatihan perpajakan dan e-Filing' },
      { nama: 'PT Astra International', bidang: 'Konglomerasi', deskripsi: 'Magang bagian finance & accounting' },
    ],
  },

  {
    code: 'BDP',
    slug: 'pemasaran',
    name: 'Pemasaran',
    description: 'Mengembangkan kemampuan memahami pelanggan, menyusun strategi promosi, dan menjalankan kegiatan penjualan di berbagai kanal.',
    focus: 'Penjualan, promosi, bisnis ritel, e-commerce, dan pemasaran digital.',
    subjects: ['Dasar pemasaran', 'Bisnis ritel', 'Pemasaran digital', 'Komunikasi bisnis'],
    careers: ['Staf pemasaran', 'Visual merchandiser', 'Pengelola toko online', 'Wirausaha'],
    tagline: 'Menguasai strategi bisnis digital di era marketplace',
    icon: '🛒',
    kompetensi: [
      { judul: 'Digital Marketing', deskripsi: 'Mengelola kampanye pemasaran digital melalui SEO, SEM, social media marketing, dan email marketing.' },
      { judul: 'E-Commerce', deskripsi: 'Mengelola toko online di berbagai marketplace (Shopee, Tokopedia) dan membangun website e-commerce.' },
      { judul: 'Content Marketing', deskripsi: 'Membuat konten pemasaran yang menarik untuk berbagai platform digital.' },
      { judul: 'Pemasaran Produk', deskripsi: 'Menerapkan strategi marketing mix (4P/7P) untuk memasarkan produk dan jasa.' },
      { judul: 'Analisis Bisnis', deskripsi: 'Menganalisis data penjualan dan perilaku konsumen untuk optimasi strategi pemasaran.' },
      { judul: 'Kewirausahaan', deskripsi: 'Merancang dan menjalankan usaha bisnis dari perencanaan hingga evaluasi.' },
    ],
    profil: {
      visi: 'Menjadi program keahlian yang menghasilkan wirausaha digital dan marketer profesional berdaya saing global.',
      misi: [
        'Menyelenggarakan pembelajaran bisnis berbasis praktik dan proyek nyata',
        'Membina jiwa kewirausahaan dan kreativitas bisnis',
        'Mempersiapkan siswa dengan sertifikasi digital marketing',
        'Mengembangkan kemitraan dengan pelaku industri e-commerce',
      ],
      akreditasi: 'A (Unggul)',
      tahunBerdiri: '2016',
      jumlahSiswa: '190',
      jumlahKelas: '6',
    },
    peluangKarir: [
      { posisi: 'Digital Marketing Specialist', deskripsi: 'Mengelola strategi pemasaran digital perusahaan', gajiRange: 'Rp 5 - 15 Juta/bulan' },
      { posisi: 'Social Media Manager', deskripsi: 'Mengelola dan mengoptimalkan media sosial brand', gajiRange: 'Rp 5 - 12 Juta/bulan' },
      { posisi: 'E-Commerce Manager', deskripsi: 'Mengelola operasional toko online', gajiRange: 'Rp 6 - 15 Juta/bulan' },
      { posisi: 'Content Creator', deskripsi: 'Membuat konten kreatif untuk brand dan platform digital', gajiRange: 'Rp 4 - 20 Juta/bulan' },
      { posisi: 'Sales Executive', deskripsi: 'Menjual produk dan jasa secara B2B maupun B2C', gajiRange: 'Rp 4 - 15 Juta/bulan' },
      { posisi: 'Entrepreneur', deskripsi: 'Menjalankan bisnis sendiri secara online maupun offline', gajiRange: 'Tidak terbatas' },
    ],
    mataPelajaran: [
      { semester: 'Semester 1-2 (Kelas X)', pelajaran: ['Pengantar Bisnis & Manajemen', 'Marketing Dasar', 'Simulasi Digital', 'Komunikasi Bisnis', 'Ekonomi Bisnis'] },
      { semester: 'Semester 3-4 (Kelas XI)', pelajaran: ['Bisnis Online (E-Commerce)', 'Digital Marketing', 'Penataan Produk', 'Pengelolaan Bisnis Ritel', 'Administrasi Transaksi'] },
      { semester: 'Semester 5-6 (Kelas XII)', pelajaran: ['Strategi Pemasaran Digital', 'Analisis Data Bisnis', 'Produk Kreatif & Kewirausahaan', 'Proyek Bisnis', 'Praktik Kerja Lapangan'] },
    ],
    guru: [
      { nama: 'Hj. Nurhayati, S.E., M.M.', jabatan: 'Kepala Program Keahlian', bidang: 'Manajemen Pemasaran', pendidikan: 'S2 Manajemen' },
      { nama: 'Bambang Suryadi, S.E.', jabatan: 'Guru Produktif', bidang: 'Digital Marketing & E-Commerce', pendidikan: 'S1 Manajemen' },
      { nama: 'Yuliana Sari, S.Pd.', jabatan: 'Guru Produktif', bidang: 'Pemasaran & Bisnis Ritel', pendidikan: 'S1 Pendidikan Ekonomi' },
      { nama: 'Rudi Hartono, S.E.', jabatan: 'Guru Produktif', bidang: 'Kewirausahaan & Bisnis Online', pendidikan: 'S1 Manajemen' },
    ],
    perusahaan: [
      { nama: 'Shopee Indonesia', bidang: 'E-Commerce', deskripsi: 'Program magang dan pelatihan seller management' },
      { nama: 'Tokopedia', bidang: 'E-Commerce', deskripsi: 'Kolaborasi program digital marketing' },
      { nama: 'PT Unilever Indonesia', bidang: 'FMCG', deskripsi: 'Magang bagian marketing dan sales' },
      { nama: 'Google Indonesia', bidang: 'Technology', deskripsi: 'Sertifikasi Google Ads dan Digital Garage' },
    ],
  },

  {
    code: 'MPLB',
    slug: 'mplb',
    name: 'Manajemen Perkantoran dan Layanan Bisnis',
    description: 'Membangun keterampilan administrasi, pengelolaan dokumen, komunikasi profesional, dan layanan pelanggan.',
    focus: 'Administrasi perkantoran, dokumen, teknologi perkantoran, dan layanan pelanggan.',
    subjects: ['Korespondensi', 'Teknologi perkantoran', 'Kearsipan', 'Layanan bisnis'],
    careers: ['Staf administrasi', 'Sekretaris', 'Resepsionis', 'Customer service'],
    tagline: 'Profesionalisme dalam tata kelola administrasi modern',
    icon: '📋',
    kompetensi: [
      { judul: 'Otomatisasi Perkantoran', deskripsi: 'Mengoperasikan perangkat lunak perkantoran (Microsoft Office, Google Workspace) secara mahir.' },
      { judul: 'Manajemen Kearsipan', deskripsi: 'Mengelola arsip secara sistematis baik manual maupun digital (e-archive).' },
      { judul: 'Komunikasi Bisnis', deskripsi: 'Menyusun surat bisnis, proposal, dan laporan sesuai standar korespondensi.' },
      { judul: 'Pengelolaan Rapat', deskripsi: 'Merencanakan, melaksanakan, dan mendokumentasikan rapat secara profesional.' },
      { judul: 'Customer Service', deskripsi: 'Memberikan pelayanan prima kepada pelanggan dan tamu perusahaan.' },
      { judul: 'Digital Office', deskripsi: 'Mengelola perkantoran berbasis digital termasuk e-mail, cloud storage, dan project management tools.' },
    ],
    profil: {
      visi: 'Menjadi program keahlian yang menghasilkan tenaga administrasi perkantoran yang profesional dan adaptif terhadap teknologi.',
      misi: [
        'Menyelenggarakan pembelajaran administrasi berbasis teknologi terkini',
        'Membina sikap profesional dan etika kerja yang tinggi',
        'Mempersiapkan siswa dengan sertifikasi administrasi perkantoran',
        'Menjalin kemitraan dengan perusahaan dan instansi pemerintah',
      ],
      akreditasi: 'A (Unggul)',
      tahunBerdiri: '2013',
      jumlahSiswa: '200',
      jumlahKelas: '7',
    },
    peluangKarir: [
      { posisi: 'Sekretaris Eksekutif', deskripsi: 'Mendukung operasional eksekutif perusahaan', gajiRange: 'Rp 5 - 12 Juta/bulan' },
      { posisi: 'Admin Staff', deskripsi: 'Mengelola administrasi dan dokumentasi perusahaan', gajiRange: 'Rp 4 - 7 Juta/bulan' },
      { posisi: 'Resepsionis', deskripsi: 'Menjadi gerbang pertama pelayanan perusahaan', gajiRange: 'Rp 4 - 6 Juta/bulan' },
      { posisi: 'HRD Staff', deskripsi: 'Mengelola administrasi sumber daya manusia', gajiRange: 'Rp 5 - 10 Juta/bulan' },
      { posisi: 'Office Manager', deskripsi: 'Mengelola operasional kantor secara keseluruhan', gajiRange: 'Rp 7 - 15 Juta/bulan' },
      { posisi: 'Virtual Assistant', deskripsi: 'Memberikan dukungan administratif secara remote', gajiRange: 'Rp 4 - 10 Juta/bulan' },
    ],
    mataPelajaran: [
      { semester: 'Semester 1-2 (Kelas X)', pelajaran: ['Pengantar Administrasi Perkantoran', 'Teknologi Perkantoran', 'Korespondensi Bisnis', 'Simulasi Digital', 'Etika Profesi'] },
      { semester: 'Semester 3-4 (Kelas XI)', pelajaran: ['Otomatisasi Tata Kelola Kepegawaian', 'Otomatisasi Tata Kelola Keuangan', 'Manajemen Kearsipan', 'Humas dan Keprotokolan', 'Administrasi Umum'] },
      { semester: 'Semester 5-6 (Kelas XII)', pelajaran: ['Otomatisasi Tata Kelola Sarana & Prasarana', 'Produk Kreatif dan Kewirausahaan', 'Digital Office Management', 'Proyek Administrasi', 'Praktik Kerja Lapangan'] },
    ],
    guru: [
      { nama: 'Dra. Kartini Wulandari, M.Pd.', jabatan: 'Kepala Program Keahlian', bidang: 'Manajemen Perkantoran', pendidikan: 'S2 Pendidikan Administrasi' },
      { nama: 'Sri Wahyuni, S.Pd.', jabatan: 'Guru Produktif', bidang: 'Korespondensi & Kearsipan', pendidikan: 'S1 Pendidikan Administrasi' },
      { nama: 'Andi Saputra, S.E.', jabatan: 'Guru Produktif', bidang: 'Otomatisasi Perkantoran', pendidikan: 'S1 Manajemen' },
      { nama: 'Ratna Dewi, S.Pd.', jabatan: 'Guru Produktif', bidang: 'Humas & Keprotokolan', pendidikan: 'S1 Ilmu Komunikasi' },
    ],
    perusahaan: [
      { nama: 'Bank Mandiri', bidang: 'Perbankan', deskripsi: 'Magang posisi customer service dan administrasi' },
      { nama: 'PT Pertamina', bidang: 'Energi', deskripsi: 'Program magang administrasi perkantoran' },
      { nama: 'Kantor Pemerintah Daerah', bidang: 'Pemerintahan', deskripsi: 'Magang tata kelola administrasi publik' },
      { nama: 'PT Unilever Indonesia', bidang: 'FMCG', deskripsi: 'Magang bagian admin dan office management' },
    ],
  },

  {
    code: 'PPLG',
    slug: 'pplg',
    name: 'Pengembangan Perangkat Lunak dan Gim',
    description: 'Mengenal proses merancang, membangun, menguji, dan memelihara perangkat lunak, aplikasi web, serta gim.',
    focus: 'Pemrograman, basis data, aplikasi web, pengujian, dan pengembangan gim.',
    subjects: ['Pemrograman dasar', 'Basis data', 'Pemrograman web', 'Pengembangan gim'],
    careers: ['Web developer', 'Software developer', 'Game developer', 'UI developer'],
    tagline: 'Membangun masa depan digital melalui kode dan kreativitas',
    icon: '💻',
    kompetensi: [
      { judul: 'Pemrograman Web', deskripsi: 'Menguasai HTML, CSS, JavaScript, serta framework modern seperti React dan Laravel untuk membangun aplikasi web responsif.' },
      { judul: 'Pemrograman Mobile', deskripsi: 'Mengembangkan aplikasi mobile menggunakan Flutter, React Native, atau Kotlin untuk platform Android dan iOS.' },
      { judul: 'Pemrograman Desktop', deskripsi: 'Membuat aplikasi desktop menggunakan Java, C#, atau Python dengan antarmuka pengguna yang modern.' },
      { judul: 'Game Development', deskripsi: 'Mendesain dan mengembangkan game 2D/3D menggunakan Unity atau Godot Engine dengan mekanik gameplay yang menarik.' },
      { judul: 'Database Management', deskripsi: 'Merancang, mengelola, dan mengoptimasi database relasional (MySQL, PostgreSQL) dan NoSQL (MongoDB).' },
      { judul: 'UI/UX Design', deskripsi: 'Mendesain antarmuka pengguna yang intuitif dan pengalaman pengguna yang optimal menggunakan tools seperti Figma.' },
    ],
    profil: {
      visi: 'Menjadi program keahlian unggulan yang menghasilkan lulusan kompeten di bidang pengembangan perangkat lunak dan gim yang berdaya saing global.',
      misi: [
        'Menyelenggarakan pembelajaran berbasis proyek yang relevan dengan industri',
        'Mengembangkan kompetensi siswa melalui sertifikasi profesi nasional dan internasional',
        'Menjalin kemitraan strategis dengan perusahaan teknologi terkemuka',
        'Membina kreativitas dan inovasi siswa melalui kompetisi dan hackathon',
      ],
      akreditasi: 'A (Unggul)',
      tahunBerdiri: '2018',
      jumlahSiswa: '180',
      jumlahKelas: '6',
    },
    peluangKarir: [
      { posisi: 'Full-Stack Developer', deskripsi: 'Mengembangkan aplikasi web dari sisi frontend hingga backend', gajiRange: 'Rp 6 - 15 Juta/bulan' },
      { posisi: 'Mobile App Developer', deskripsi: 'Membuat aplikasi mobile untuk Android dan iOS', gajiRange: 'Rp 7 - 18 Juta/bulan' },
      { posisi: 'Game Developer', deskripsi: 'Merancang dan mengembangkan video game', gajiRange: 'Rp 5 - 20 Juta/bulan' },
      { posisi: 'DevOps Engineer', deskripsi: 'Mengelola infrastruktur dan deployment aplikasi', gajiRange: 'Rp 8 - 25 Juta/bulan' },
      { posisi: 'UI/UX Designer', deskripsi: 'Mendesain antarmuka dan pengalaman pengguna', gajiRange: 'Rp 5 - 15 Juta/bulan' },
      { posisi: 'Data Analyst', deskripsi: 'Menganalisis data untuk mendukung keputusan bisnis', gajiRange: 'Rp 6 - 18 Juta/bulan' },
    ],
    mataPelajaran: [
      { semester: 'Semester 1-2 (Kelas X)', pelajaran: ['Dasar Pemrograman', 'Algoritma dan Struktur Data', 'Desain Grafis', 'Sistem Komputer', 'Basis Data Dasar'] },
      { semester: 'Semester 3-4 (Kelas XI)', pelajaran: ['Pemrograman Web (HTML, CSS, JS)', 'Pemrograman Berorientasi Objek', 'Framework Web (React/Laravel)', 'Pemrograman Mobile', 'Manajemen Basis Data'] },
      { semester: 'Semester 5-6 (Kelas XII)', pelajaran: ['Pengembangan Game', 'Proyek Perangkat Lunak', 'DevOps & Deployment', 'UI/UX Design', 'Praktik Kerja Lapangan'] },
    ],
    guru: [
      { nama: 'Budi Santoso, S.Kom., M.T.', jabatan: 'Kepala Program Keahlian', bidang: 'Pemrograman Web & Mobile', pendidikan: 'S2 Teknik Informatika' },
      { nama: 'Siti Rahayu, S.Kom.', jabatan: 'Guru Produktif', bidang: 'Basis Data & Backend Development', pendidikan: 'S1 Teknik Informatika' },
      { nama: 'Ahmad Fauzi, S.T.', jabatan: 'Guru Produktif', bidang: 'Game Development & Unity', pendidikan: 'S1 Teknik Elektro' },
      { nama: 'Dewi Lestari, S.Kom.', jabatan: 'Guru Produktif', bidang: 'UI/UX Design & Frontend', pendidikan: 'S1 Sistem Informasi' },
    ],
    perusahaan: [
      { nama: 'PT Telkom Indonesia', bidang: 'Telekomunikasi & IT', deskripsi: 'Program magang dan rekrutmen untuk posisi developer' },
      { nama: 'Tokopedia', bidang: 'E-Commerce & Technology', deskripsi: 'Kolaborasi pengembangan proyek dan sertifikasi' },
      { nama: 'Agate Studio', bidang: 'Game Development', deskripsi: 'Program mentoring dan magang game developer' },
      { nama: 'GoTo Group', bidang: 'Technology', deskripsi: 'Beasiswa dan program pelatihan intensif' },
    ],
  },

  {
    code: 'TJKT',
    slug: 'tjkt',
    name: 'Teknik Jaringan Komputer dan Telekomunikasi',
    description: 'Mempelajari perakitan, instalasi, konfigurasi, dan pemeliharaan komputer serta jaringan komunikasi.',
    focus: 'Komputer, jaringan, internet, server, keamanan jaringan, dan fiber optik.',
    subjects: ['Jaringan dasar', 'Administrasi server', 'Keamanan jaringan', 'Teknologi fiber optik'],
    careers: ['Teknisi jaringan', 'Network administrator', 'Teknisi komputer', 'Teknisi telekomunikasi'],
    tagline: 'Membangun infrastruktur telekomunikasi masa depan',
    icon: '📡',
    kompetensi: [
      { judul: 'Jaringan Komputer', deskripsi: 'Menginstalasi, mengkonfigurasi, dan memelihara jaringan LAN, MAN, dan WAN.' },
      { judul: 'Telekomunikasi', deskripsi: 'Memahami dan mengelola sistem telekomunikasi termasuk fiber optic, microwave, dan 5G.' },
      { judul: 'Internet of Things (IoT)', deskripsi: 'Merancang dan mengimplementasikan sistem IoT menggunakan mikrokontroler dan sensor.' },
      { judul: 'Network Security', deskripsi: 'Menerapkan keamanan jaringan termasuk firewall, VPN, dan enkripsi data.' },
      { judul: 'Fiber Optic', deskripsi: 'Menginstalasi dan memelihara jaringan fiber optic (FTTH/FTTB).' },
      { judul: 'Mikrotik & Cisco', deskripsi: 'Mengkonfigurasi perangkat Mikrotik dan Cisco untuk jaringan enterprise.' },
    ],
    profil: {
      visi: 'Menjadi program keahlian unggulan dalam bidang jaringan komputer dan telekomunikasi yang menghasilkan lulusan bersertifikasi internasional.',
      misi: [
        'Menyelenggarakan pembelajaran berbasis lab dengan perangkat industri',
        'Mempersiapkan siswa dengan sertifikasi MTCNA dan CCNA',
        'Mengembangkan kompetensi IoT dan teknologi telekomunikasi modern',
        'Menjalin kemitraan dengan provider telekomunikasi dan ISP',
      ],
      akreditasi: 'A (Unggul)',
      tahunBerdiri: '2015',
      jumlahSiswa: '210',
      jumlahKelas: '7',
    },
    peluangKarir: [
      { posisi: 'Network Engineer', deskripsi: 'Merancang dan mengelola infrastruktur jaringan', gajiRange: 'Rp 7 - 20 Juta/bulan' },
      { posisi: 'Telecom Engineer', deskripsi: 'Mengelola infrastruktur telekomunikasi', gajiRange: 'Rp 6 - 18 Juta/bulan' },
      { posisi: 'IoT Engineer', deskripsi: 'Mengembangkan dan mengelola sistem IoT', gajiRange: 'Rp 7 - 20 Juta/bulan' },
      { posisi: 'Fiber Optic Technician', deskripsi: 'Menginstalasi dan memelihara jaringan fiber optic', gajiRange: 'Rp 4 - 10 Juta/bulan' },
      { posisi: 'ISP Technical Staff', deskripsi: 'Mengelola layanan internet di Internet Service Provider', gajiRange: 'Rp 4 - 10 Juta/bulan' },
      { posisi: 'Security Analyst', deskripsi: 'Mengamankan jaringan dan infrastruktur IT', gajiRange: 'Rp 8 - 25 Juta/bulan' },
    ],
    mataPelajaran: [
      { semester: 'Semester 1-2 (Kelas X)', pelajaran: ['Dasar Teknik Jaringan', 'Elektronika Telekomunikasi', 'Sistem Komputer', 'Instalasi Perangkat Keras', 'Sistem Operasi Jaringan'] },
      { semester: 'Semester 3-4 (Kelas XI)', pelajaran: ['Administrasi Jaringan (Mikrotik & Cisco)', 'Teknologi Telekomunikasi (Fiber Optic)', 'Keamanan Jaringan', 'IoT & Embedded System', 'Wireless & Mobile Network'] },
      { semester: 'Semester 5-6 (Kelas XII)', pelajaran: ['Network Design & Implementation', 'Cloud & Virtualisasi', 'Proyek TJKT', 'Sertifikasi MTCNA/CCNA', 'Praktik Kerja Lapangan'] },
    ],
    guru: [
      { nama: 'Ir. Wahyu Pratama, M.T.', jabatan: 'Kepala Program Keahlian', bidang: 'Telekomunikasi & Fiber Optic', pendidikan: 'S2 Teknik Telekomunikasi' },
      { nama: 'Fajar Nugroho, S.T.', jabatan: 'Guru Produktif', bidang: 'Jaringan Komputer & Mikrotik', pendidikan: 'S1 Teknik Elektro' },
      { nama: 'Indra Kusuma, S.Kom.', jabatan: 'Guru Produktif', bidang: 'IoT & Embedded System', pendidikan: 'S1 Teknik Informatika' },
      { nama: 'Lestari Wati, S.T.', jabatan: 'Guru Produktif', bidang: 'Network Security & Cloud', pendidikan: 'S1 Teknik Telekomunikasi' },
    ],
    perusahaan: [
      { nama: 'PT Telkom Indonesia', bidang: 'Telekomunikasi', deskripsi: 'Magang instalasi fiber optic dan data center' },
      { nama: 'PT Huawei Tech Investment', bidang: 'Telekomunikasi', deskripsi: 'Sertifikasi dan pelatihan teknologi 5G' },
      { nama: 'PT Tower Bersama Group', bidang: 'Infrastruktur Telekomunikasi', deskripsi: 'Magang maintenance tower telekomunikasi' },
      { nama: 'Mikrotik Indonesia', bidang: 'Networking Equipment', deskripsi: 'Sertifikasi MTCNA dan program academy' },
    ],
  },

  {
    code: 'TO',
    slug: 'teknik-otomotif',
    name: 'Teknik Otomotif',
    description: 'Mengembangkan keterampilan pemeriksaan, perawatan, dan perbaikan kendaraan dengan prosedur kerja yang aman.',
    focus: 'Perawatan kendaraan roda dua, diagnosis kerusakan, dan dasar kewirausahaan bengkel.',
    subjects: ['Teknologi dasar otomotif', 'Pemeliharaan mesin', 'Kelistrikan otomotif', 'Chassis dan pemindah tenaga'],
    careers: ['Mekanik otomotif', 'Service advisor', 'Teknisi kendaraan', 'Wirausaha bengkel'],
    tagline: 'Menguasai teknologi kendaraan masa kini dan masa depan',
    icon: '🔧',
    kompetensi: [
      { judul: 'Engine Maintenance', deskripsi: 'Melakukan perawatan dan perbaikan mesin kendaraan bensin maupun diesel secara profesional.' },
      { judul: 'Kelistrikan Otomotif', deskripsi: 'Mendiagnosis dan memperbaiki sistem kelistrikan kendaraan termasuk ECU dan sensor.' },
      { judul: 'Chassis & Suspension', deskripsi: 'Melakukan perawatan dan perbaikan sistem chassis, rem, dan suspensi kendaraan.' },
      { judul: 'Transmisi', deskripsi: 'Memahami dan memperbaiki sistem transmisi manual maupun otomatis.' },
      { judul: 'Elektronik Kendaraan', deskripsi: 'Menggunakan scanner dan peralatan diagnostik modern untuk troubleshooting kendaraan.' },
      { judul: 'Kewirausahaan Bengkel', deskripsi: 'Merancang dan mengelola usaha bengkel otomotif secara mandiri.' },
    ],
    profil: {
      visi: 'Menjadi program keahlian otomotif yang menghasilkan teknisi terampil dan bersertifikasi sesuai standar industri.',
      misi: [
        'Menyelenggarakan pembelajaran praktik dengan peralatan bengkel modern',
        'Mempersiapkan siswa dengan sertifikasi kompetensi otomotif nasional',
        'Mengembangkan pengetahuan tentang teknologi kendaraan terbaru',
        'Menjalin kemitraan dengan dealer dan bengkel resmi',
      ],
      akreditasi: 'A (Unggul)',
      tahunBerdiri: '2010',
      jumlahSiswa: '220',
      jumlahKelas: '7',
    },
    peluangKarir: [
      { posisi: 'Mekanik Otomotif', deskripsi: 'Melakukan perawatan dan perbaikan kendaraan di bengkel resmi', gajiRange: 'Rp 4 - 10 Juta/bulan' },
      { posisi: 'Service Advisor', deskripsi: 'Menjembatani kebutuhan pelanggan dengan teknisi bengkel', gajiRange: 'Rp 5 - 12 Juta/bulan' },
      { posisi: 'Teknisi Dealer', deskripsi: 'Bekerja di dealer resmi untuk merek kendaraan', gajiRange: 'Rp 4 - 10 Juta/bulan' },
      { posisi: 'Quality Inspector', deskripsi: 'Melakukan inspeksi kualitas di pabrik otomotif', gajiRange: 'Rp 5 - 12 Juta/bulan' },
      { posisi: 'Parts Specialist', deskripsi: 'Mengelola inventaris suku cadang', gajiRange: 'Rp 4 - 8 Juta/bulan' },
      { posisi: 'Wirausaha Bengkel', deskripsi: 'Membangun dan mengelola bengkel otomotif sendiri', gajiRange: 'Tidak terbatas' },
    ],
    mataPelajaran: [
      { semester: 'Semester 1-2 (Kelas X)', pelajaran: ['Teknologi Dasar Otomotif', 'Gambar Teknik Otomotif', 'Pekerjaan Dasar Otomotif', 'Sistem Komputer', 'K3 Otomotif'] },
      { semester: 'Semester 3-4 (Kelas XI)', pelajaran: ['Pemeliharaan Mesin Kendaraan', 'Kelistrikan Otomotif', 'Chassis & Pemindah Tenaga', 'Sistem Injeksi Bahan Bakar', 'Elektronik Kendaraan'] },
      { semester: 'Semester 5-6 (Kelas XII)', pelajaran: ['Diagnosis Kerusakan Kendaraan', 'Perawatan Berkala', 'Proyek Otomotif', 'Kewirausahaan Bengkel', 'Praktik Kerja Lapangan'] },
    ],
    guru: [
      { nama: 'Ir. Suryono, M.T.', jabatan: 'Kepala Program Keahlian', bidang: 'Mesin & Powertrain', pendidikan: 'S2 Teknik Mesin' },
      { nama: 'Agus Wibowo, S.T.', jabatan: 'Guru Produktif', bidang: 'Kelistrikan Otomotif', pendidikan: 'S1 Teknik Elektro' },
      { nama: 'Dedi Kurniawan, S.Pd.', jabatan: 'Guru Produktif', bidang: 'Chassis & Transmisi', pendidikan: 'S1 Pendidikan Teknik Otomotif' },
      { nama: 'Heri Susanto, S.T.', jabatan: 'Guru Produktif', bidang: 'Elektronik & Diagnosa Kendaraan', pendidikan: 'S1 Teknik Mesin' },
    ],
    perusahaan: [
      { nama: 'PT Astra Honda Motor', bidang: 'Otomotif', deskripsi: 'Magang teknisi di dealer resmi Honda' },
      { nama: 'PT Toyota Astra Motor', bidang: 'Otomotif', deskripsi: 'Program T-TEP (Toyota Technical Education Program)' },
      { nama: 'PT Yamaha Motor', bidang: 'Otomotif', deskripsi: 'Magang di bengkel resmi Yamaha' },
      { nama: 'PT Suzuki Indomobil', bidang: 'Otomotif', deskripsi: 'Program magang teknisi dan spare part' },
    ],
  },

  {
    code: 'DKV',
    slug: 'dkv',
    name: 'Desain Komunikasi Visual',
    description: 'Mengolah ide menjadi pesan visual melalui desain, ilustrasi, fotografi, dan video yang komunikatif.',
    focus: 'Tata letak, warna, ilustrasi, tipografi, videografi, dan fotografi.',
    subjects: ['Dasar desain', 'Ilustrasi', 'Fotografi', 'Desain publikasi'],
    careers: ['Desainer grafis', 'Ilustrator', 'Fotografer', 'Content creator'],
    tagline: 'Mengkomunikasikan ide melalui visual yang memukau',
    icon: '🎨',
    kompetensi: [
      { judul: 'Desain Grafis', deskripsi: 'Mendesain materi visual menggunakan Adobe Photoshop, Illustrator, dan InDesign secara profesional.' },
      { judul: 'Fotografi', deskripsi: 'Menguasai teknik fotografi studio dan outdoor untuk berbagai kebutuhan komersial.' },
      { judul: 'Videografi & Editing', deskripsi: 'Memproduksi konten video dan melakukan editing menggunakan Adobe Premiere Pro dan After Effects.' },
      { judul: 'Animasi 2D/3D', deskripsi: 'Membuat animasi motion graphics dan 3D menggunakan After Effects dan Blender.' },
      { judul: 'Branding & Identity', deskripsi: 'Merancang identitas visual merek termasuk logo, packaging, dan brand guideline.' },
      { judul: 'UI/UX Design', deskripsi: 'Mendesain antarmuka aplikasi dan website yang menarik dan user-friendly menggunakan Figma.' },
    ],
    profil: {
      visi: 'Menjadi program keahlian DKV yang menghasilkan desainer kreatif berkelas nasional dan internasional.',
      misi: [
        'Menyelenggarakan pembelajaran kreatif berbasis proyek industri',
        'Memfasilitasi siswa dengan peralatan dan software desain terkini',
        'Mengembangkan portofolio siswa melalui kompetisi dan pameran',
        'Menjalin kerjasama dengan industri kreatif dan advertising agency',
      ],
      akreditasi: 'A (Unggul)',
      tahunBerdiri: '2017',
      jumlahSiswa: '160',
      jumlahKelas: '5',
    },
    peluangKarir: [
      { posisi: 'Graphic Designer', deskripsi: 'Mendesain materi visual untuk berbagai media', gajiRange: 'Rp 4 - 12 Juta/bulan' },
      { posisi: 'Video Editor/Videographer', deskripsi: 'Memproduksi dan mengedit konten video', gajiRange: 'Rp 5 - 15 Juta/bulan' },
      { posisi: 'Motion Graphics Designer', deskripsi: 'Membuat animasi dan visual effects', gajiRange: 'Rp 6 - 18 Juta/bulan' },
      { posisi: 'Brand Designer', deskripsi: 'Merancang identitas visual dan branding perusahaan', gajiRange: 'Rp 7 - 20 Juta/bulan' },
      { posisi: 'Social Media Designer', deskripsi: 'Membuat konten visual untuk platform media sosial', gajiRange: 'Rp 4 - 10 Juta/bulan' },
      { posisi: 'Freelance Designer', deskripsi: 'Bekerja mandiri untuk berbagai klien', gajiRange: 'Rp 5 - 30 Juta/bulan' },
    ],
    mataPelajaran: [
      { semester: 'Semester 1-2 (Kelas X)', pelajaran: ['Dasar Desain Grafis', 'Nirmana (Teori Bentuk & Warna)', 'Tipografi', 'Fotografi Dasar', 'Menggambar Manual'] },
      { semester: 'Semester 3-4 (Kelas XI)', pelajaran: ['Desain Grafis Percetakan', 'Videografi & Video Editing', 'Animasi 2D & Motion Graphics', 'Branding & Packaging Design', 'Fotografi Komersial'] },
      { semester: 'Semester 5-6 (Kelas XII)', pelajaran: ['Animasi 3D', 'UI/UX Design', 'Proyek Desain Komunikasi Visual', 'Portofolio & Pameran', 'Praktik Kerja Lapangan'] },
    ],
    guru: [
      { nama: 'Agus Setiawan, S.Sn., M.Ds.', jabatan: 'Kepala Program Keahlian', bidang: 'Desain Grafis & Branding', pendidikan: 'S2 Desain' },
      { nama: 'Rina Fitriani, S.Ds.', jabatan: 'Guru Produktif', bidang: 'Fotografi & Videografi', pendidikan: 'S1 Desain Komunikasi Visual' },
      { nama: 'Dimas Arya, S.Sn.', jabatan: 'Guru Produktif', bidang: 'Animasi & Motion Graphics', pendidikan: 'S1 Animasi' },
      { nama: 'Putri Handayani, S.Ds.', jabatan: 'Guru Produktif', bidang: 'UI/UX & Digital Design', pendidikan: 'S1 Desain Komunikasi Visual' },
    ],
    perusahaan: [
      { nama: 'PT Kompas Gramedia', bidang: 'Media & Publishing', deskripsi: 'Magang desain editorial dan layout majalah' },
      { nama: 'Ogilvy Indonesia', bidang: 'Advertising Agency', deskripsi: 'Program magang creative designer' },
      { nama: 'Tiket.com', bidang: 'Technology', deskripsi: 'Magang UI/UX designer dan graphic designer' },
      { nama: 'NET Television', bidang: 'Media & Broadcasting', deskripsi: 'Magang videografi dan motion graphics' },
    ],
  },

  {
    code: 'TM',
    slug: 'teknik-mesin',
    name: 'Teknik Mesin',
    description: 'Mempelajari proses produksi dan pengerjaan komponen menggunakan mesin konvensional maupun berbasis CNC.',
    focus: 'Gambar teknik, proses pemesinan, pengukuran, dan produksi komponen.',
    subjects: ['Gambar teknik', 'Teknik pemesinan', 'CNC dasar', 'Pengukuran teknik'],
    careers: ['Operator mesin', 'Teknisi manufaktur', 'Drafter teknik', 'Wirausaha produksi'],
    tagline: 'Presisi tinggi dalam setiap proses manufaktur',
    icon: '⚙️',
    kompetensi: [
      { judul: 'Teknik Pemesinan', deskripsi: 'Mengoperasikan mesin bubut, frais, gerinda, dan bor sesuai standar industri manufaktur.' },
      { judul: 'CNC Programming', deskripsi: 'Memprogram dan mengoperasikan mesin CNC (Computer Numerical Control) untuk produksi presisi.' },
      { judul: 'Gambar Teknik', deskripsi: 'Membuat gambar teknik manual dan CAD (Computer Aided Design) menggunakan AutoCAD dan SolidWorks.' },
      { judul: 'Pengukuran Teknik', deskripsi: 'Melakukan pengukuran presisi menggunakan alat ukur standar industri.' },
      { judul: 'Pengelasan', deskripsi: 'Menguasai teknik pengelasan SMAW, GMAW, dan GTAW sesuai standar WPS.' },
      { judul: 'Quality Control', deskripsi: 'Melakukan inspeksi kualitas produk sesuai standar ISO.' },
    ],
    profil: {
      visi: 'Menjadi program keahlian teknik mesin yang menghasilkan operator dan teknisi manufaktur yang kompeten dan bersertifikasi.',
      misi: [
        'Menyelenggarakan pembelajaran praktik dengan mesin dan peralatan standar industri',
        'Mempersiapkan siswa dengan sertifikasi kompetensi pemesinan',
        'Mengembangkan kemampuan membaca gambar teknik dan mengoperasikan CAD/CAM',
        'Menjalin kemitraan dengan perusahaan manufaktur dan industri logam',
      ],
      akreditasi: 'A (Unggul)',
      tahunBerdiri: '2011',
      jumlahSiswa: '180',
      jumlahKelas: '6',
    },
    peluangKarir: [
      { posisi: 'Operator CNC', deskripsi: 'Mengoperasikan mesin CNC untuk produksi komponen presisi', gajiRange: 'Rp 4 - 10 Juta/bulan' },
      { posisi: 'Teknisi Manufaktur', deskripsi: 'Melakukan perawatan dan perbaikan mesin produksi', gajiRange: 'Rp 5 - 12 Juta/bulan' },
      { posisi: 'Drafter CAD', deskripsi: 'Membuat gambar teknik digital untuk produksi', gajiRange: 'Rp 4 - 10 Juta/bulan' },
      { posisi: 'Quality Inspector', deskripsi: 'Melakukan inspeksi kualitas produk di pabrik', gajiRange: 'Rp 5 - 12 Juta/bulan' },
      { posisi: 'Welder', deskripsi: 'Melakukan pengelasan sesuai standar internasional', gajiRange: 'Rp 5 - 15 Juta/bulan' },
      { posisi: 'Production Supervisor', deskripsi: 'Mengawasi proses produksi di pabrik', gajiRange: 'Rp 7 - 15 Juta/bulan' },
    ],
    mataPelajaran: [
      { semester: 'Semester 1-2 (Kelas X)', pelajaran: ['Gambar Teknik Dasar', 'Teknologi Mekanik Dasar', 'Pekerjaan Logam Dasar', 'Pengukuran Teknik', 'K3 Industri'] },
      { semester: 'Semester 3-4 (Kelas XI)', pelajaran: ['Teknik Pemesinan Bubut & Frais', 'Gambar CAD (AutoCAD/SolidWorks)', 'Teknik Pengelasan', 'Pemrograman CNC', 'Material Teknik'] },
      { semester: 'Semester 5-6 (Kelas XII)', pelajaran: ['CNC Lanjutan (CAM)', 'Proyek Pemesinan', 'Quality Control & Inspeksi', 'Kewirausahaan Manufaktur', 'Praktik Kerja Lapangan'] },
    ],
    guru: [
      { nama: 'Ir. Bambang Sukarno, M.T.', jabatan: 'Kepala Program Keahlian', bidang: 'Teknik Pemesinan & CNC', pendidikan: 'S2 Teknik Mesin' },
      { nama: 'Joko Susilo, S.T.', jabatan: 'Guru Produktif', bidang: 'Pengelasan & Fabrikasi', pendidikan: 'S1 Teknik Mesin' },
      { nama: 'Riyadi, S.Pd.', jabatan: 'Guru Produktif', bidang: 'Gambar Teknik & CAD', pendidikan: 'S1 Pendidikan Teknik Mesin' },
      { nama: 'Eko Prasetyo, S.T.', jabatan: 'Guru Produktif', bidang: 'Quality Control & Pengukuran', pendidikan: 'S1 Teknik Industri' },
    ],
    perusahaan: [
      { nama: 'PT Astra Otoparts', bidang: 'Manufaktur Otomotif', deskripsi: 'Magang operator mesin dan quality control' },
      { nama: 'PT Krakatau Steel', bidang: 'Industri Baja', deskripsi: 'Program magang teknik pemesinan' },
      { nama: 'PT Bukaka Teknik Utama', bidang: 'Konstruksi & Manufaktur', deskripsi: 'Magang fabrikasi dan pengelasan' },
      { nama: 'PT Mitra Pinasthika Mustika', bidang: 'Manufaktur', deskripsi: 'Program magang CNC dan produksi' },
    ],
  },

  {
    code: 'KL',
    slug: 'kuliner',
    name: 'Kuliner',
    description: 'Mengembangkan keterampilan mengolah, menyajikan, dan mengelola produk makanan serta minuman secara profesional.',
    focus: 'Pengolahan makanan, penyajian, pelayanan, dan keamanan pangan.',
    subjects: ['Dasar kuliner', 'Pastry dan bakery', 'Tata hidang', 'Keamanan pangan'],
    careers: ['Juru masak', 'Pastry chef', 'Pramusaji', 'Wirausaha kuliner'],
    tagline: 'Mengolah cita rasa menjadi karya seni kuliner',
    icon: '👨‍🍳',
    kompetensi: [
      { judul: 'Pengolahan Masakan Indonesia', deskripsi: 'Menguasai teknik dan resep masakan tradisional dan modern Indonesia dari berbagai daerah.' },
      { judul: 'Pengolahan Masakan Internasional', deskripsi: 'Menyiapkan hidangan internasional (Western, Asian, Continental) sesuai standar internasional.' },
      { judul: 'Pastry & Bakery', deskripsi: 'Membuat berbagai produk pastry, roti, kue, dan dessert dengan teknik profesional.' },
      { judul: 'Food Presentation & Plating', deskripsi: 'Menyajikan hidangan dengan estetika dan teknik plating yang menarik.' },
      { judul: 'Manajemen Restoran', deskripsi: 'Mengelola operasional restoran termasuk food cost, menu planning, dan service.' },
      { judul: 'Keamanan & Higiene Pangan', deskripsi: 'Menerapkan standar keamanan pangan dan higiene (HACCP) dalam pengolahan makanan.' },
    ],
    profil: {
      visi: 'Menjadi program keahlian kuliner terbaik yang menghasilkan chef dan wirausaha kuliner yang profesional dan berkarakter.',
      misi: [
        'Menyelenggarakan pembelajaran kuliner dengan standar industri perhotelan',
        'Memfasilitasi praktik di dapur modern yang lengkap',
        'Mengembangkan kreativitas dan inovasi dalam seni kuliner',
        'Menjalin kemitraan dengan hotel, restoran, dan industri F&B',
      ],
      akreditasi: 'B (Baik Sekali)',
      tahunBerdiri: '2021',
      jumlahSiswa: '100',
      jumlahKelas: '4',
    },
    peluangKarir: [
      { posisi: 'Chef / Cook', deskripsi: 'Memasak di hotel, restoran, dan kapal pesiar', gajiRange: 'Rp 4 - 15 Juta/bulan' },
      { posisi: 'Pastry Chef', deskripsi: 'Spesialis pembuatan pastry, kue, dan dessert', gajiRange: 'Rp 5 - 15 Juta/bulan' },
      { posisi: 'Food Stylist', deskripsi: 'Menata makanan untuk fotografi dan media', gajiRange: 'Rp 5 - 18 Juta/bulan' },
      { posisi: 'Restaurant Manager', deskripsi: 'Mengelola operasional restoran', gajiRange: 'Rp 6 - 15 Juta/bulan' },
      { posisi: 'Catering Entrepreneur', deskripsi: 'Menjalankan bisnis catering secara mandiri', gajiRange: 'Tidak terbatas' },
      { posisi: 'F&B Supervisor', deskripsi: 'Mengawasi operasional F&B di hotel', gajiRange: 'Rp 5 - 12 Juta/bulan' },
    ],
    mataPelajaran: [
      { semester: 'Semester 1-2 (Kelas X)', pelajaran: ['Pengantar Kuliner', 'Pengetahuan Bahan Makanan', 'Keamanan Pangan & Sanitasi Hygiene', 'Teknik Dasar Memasak', 'Pengelolaan Dapur'] },
      { semester: 'Semester 3-4 (Kelas XI)', pelajaran: ['Pengolahan Masakan Indonesia', 'Pengolahan Masakan Internasional', 'Pastry & Bakery', 'Food Presentation & Garnishing', 'Manajemen Usaha Kuliner'] },
      { semester: 'Semester 5-6 (Kelas XII)', pelajaran: ['Masakan Fusion & Kreasi', 'Manajemen Restoran & Catering', 'Proyek Kuliner', 'Kewirausahaan Kuliner', 'Praktik Kerja Lapangan'] },
    ],
    guru: [
      { nama: 'Chef Riyanto, S.Pd., M.Par.', jabatan: 'Kepala Program Keahlian', bidang: 'Masakan Indonesia & Internasional', pendidikan: 'S2 Pariwisata' },
      { nama: 'Chef Melinda, S.Par.', jabatan: 'Guru Produktif', bidang: 'Pastry & Bakery', pendidikan: 'S1 Perhotelan' },
      { nama: 'Agung Prasetyo, S.Pd.', jabatan: 'Guru Produktif', bidang: 'Manajemen Restoran & F&B', pendidikan: 'S1 Pendidikan Tata Boga' },
      { nama: 'Sari Rahmawati, S.T.P.', jabatan: 'Guru Produktif', bidang: 'Keamanan Pangan & Hygiene', pendidikan: 'S1 Teknologi Pangan' },
    ],
    perusahaan: [
      { nama: 'Hotel Indonesia Kempinski', bidang: 'Hospitality', deskripsi: 'Magang kitchen brigade di hotel bintang 5' },
      { nama: 'PT Sari Roti (Nippon Indosari)', bidang: 'F&B Manufacturing', deskripsi: 'Magang produksi dan quality control bakery' },
      { nama: 'Pizza Hut Indonesia', bidang: 'Restaurant Chain', deskripsi: 'Program pelatihan dan magang di outlet' },
      { nama: 'Marriott International', bidang: 'Hospitality', deskripsi: 'Magang F&B service dan kitchen operation' },
    ],
  },

  {
    code: 'TL',
    slug: 'teknik-logistik',
    name: 'Teknik Logistik',
    description: 'Mempelajari perencanaan, pengendalian, penyimpanan, pemindahan, dan distribusi barang secara efisien.',
    focus: 'Pergudangan, inventaris, distribusi, transportasi, dan rantai pasok.',
    subjects: ['Manajemen pergudangan', 'Pengendalian persediaan', 'Distribusi barang', 'Administrasi logistik'],
    careers: ['Staf gudang', 'Administrasi logistik', 'Inventory controller', 'Staf distribusi'],
    tagline: 'Mengoptimalkan rantai pasok untuk efisiensi global',
    icon: '🚛',
    kompetensi: [
      { judul: 'Manajemen Gudang', deskripsi: 'Mengelola penerimaan, penyimpanan, dan pengiriman barang di gudang secara efisien.' },
      { judul: 'Supply Chain Management', deskripsi: 'Memahami dan mengelola rantai pasok dari pemasok hingga konsumen akhir.' },
      { judul: 'Transportasi & Distribusi', deskripsi: 'Merencanakan dan mengoptimalkan rute distribusi dan moda transportasi.' },
      { judul: 'Inventory Management', deskripsi: 'Mengelola persediaan barang menggunakan metode dan software modern.' },
      { judul: 'Kepabeanan & Ekspor-Impor', deskripsi: 'Memahami prosedur kepabeanan dan dokumentasi ekspor-impor.' },
      { judul: 'Logistik Digital', deskripsi: 'Menggunakan teknologi WMS, TMS, dan IoT untuk optimasi operasional logistik.' },
    ],
    profil: {
      visi: 'Menjadi program keahlian logistik terkemuka yang menghasilkan lulusan siap kerja di industri rantai pasok global.',
      misi: [
        'Menyelenggarakan pembelajaran logistik berbasis simulasi dan praktik industri',
        'Mempersiapkan siswa dengan sertifikasi logistik nasional',
        'Mengembangkan kompetensi teknologi logistik modern',
        'Menjalin kemitraan dengan perusahaan logistik dan ekspedisi',
      ],
      akreditasi: 'B (Baik Sekali)',
      tahunBerdiri: '2020',
      jumlahSiswa: '120',
      jumlahKelas: '4',
    },
    peluangKarir: [
      { posisi: 'Warehouse Supervisor', deskripsi: 'Mengawasi operasional gudang dan tim', gajiRange: 'Rp 5 - 12 Juta/bulan' },
      { posisi: 'Supply Chain Analyst', deskripsi: 'Menganalisis dan mengoptimalkan rantai pasok', gajiRange: 'Rp 6 - 15 Juta/bulan' },
      { posisi: 'Freight Forwarder', deskripsi: 'Mengelola pengiriman barang internasional', gajiRange: 'Rp 5 - 12 Juta/bulan' },
      { posisi: 'Procurement Staff', deskripsi: 'Mengelola pengadaan barang dan jasa', gajiRange: 'Rp 5 - 10 Juta/bulan' },
      { posisi: 'Distribution Coordinator', deskripsi: 'Mengkoordinasikan distribusi dan pengiriman', gajiRange: 'Rp 4 - 9 Juta/bulan' },
      { posisi: 'Customs Officer', deskripsi: 'Menangani dokumen dan prosedur kepabeanan', gajiRange: 'Rp 5 - 12 Juta/bulan' },
    ],
    mataPelajaran: [
      { semester: 'Semester 1-2 (Kelas X)', pelajaran: ['Pengantar Logistik', 'Ekonomi Bisnis', 'Dasar Manajemen Gudang', 'Simulasi Digital', 'K3 Logistik'] },
      { semester: 'Semester 3-4 (Kelas XI)', pelajaran: ['Manajemen Pergudangan', 'Transportasi & Distribusi', 'Inventory Management', 'Supply Chain Management', 'Administrasi Logistik'] },
      { semester: 'Semester 5-6 (Kelas XII)', pelajaran: ['Kepabeanan & Ekspor-Impor', 'Logistik Digital (WMS/TMS)', 'Proyek Teknik Logistik', 'Kewirausahaan Logistik', 'Praktik Kerja Lapangan'] },
    ],
    guru: [
      { nama: 'Drs. Supriyanto, M.Log.', jabatan: 'Kepala Program Keahlian', bidang: 'Supply Chain Management', pendidikan: 'S2 Manajemen Logistik' },
      { nama: 'Wahyu Setiawan, S.T.', jabatan: 'Guru Produktif', bidang: 'Pergudangan & Distribusi', pendidikan: 'S1 Teknik Industri' },
      { nama: 'Lia Permatasari, S.E.', jabatan: 'Guru Produktif', bidang: 'Kepabeanan & Ekspor-Impor', pendidikan: 'S1 Manajemen' },
      { nama: 'Arif Budiman, S.Log.', jabatan: 'Guru Produktif', bidang: 'Logistik Digital & IoT', pendidikan: 'S1 Logistik' },
    ],
    perusahaan: [
      { nama: 'JNE Express', bidang: 'Ekspedisi & Logistik', deskripsi: 'Magang operasional gudang dan pengiriman' },
      { nama: 'PT Pos Indonesia', bidang: 'Layanan Pos & Logistik', deskripsi: 'Program magang manajemen logistik' },
      { nama: 'J&T Express', bidang: 'Ekspedisi', deskripsi: 'Magang distribusi dan supply chain' },
      { nama: 'PT Kamadjaja Logistics', bidang: '3PL Logistics', deskripsi: 'Magang warehouse management system' },
    ],
  },
];

export function getJurusan(slug: string) {
  return JURUSAN.find((jurusan) => jurusan.slug === slug);
}

/**
 * Cari slug jurusan statis (yang dikenal halaman detail `/jurusan/[slug]`)
 * dari data jurusan mana pun — termasuk data dari API yang slug-nya dibuat
 * otomatis dari nama (mis. "rekayasa-perangkat-lunak") sehingga tidak cocok
 * dengan slug statis ("pplg").
 *
 * Urutan pencocokan:
 * 1. slug sama persis (data statis / API yang sudah sinkron)
 * 2. kode sama (mis. "PPLG", "TJKT")
 * 3. nama sama persis
 * 4. nama mengandung / kata kunci
 */
export function resolveJurusanSlug(input: {
  slug?: string | null;
  code?: string | null;
  name?: string | null;
}): string | null {
  const slug = (input.slug ?? '').trim().toLowerCase();
  const code = (input.code ?? '').trim().toLowerCase();
  const name = (input.name ?? '').trim().toLowerCase();

  // 1. Slug sama persis.
  if (slug) {
    const bySlug = JURUSAN.find((j) => j.slug === slug);
    if (bySlug) return bySlug.slug;
  }

  // 2. Kode sama.
  if (code) {
    const byCode = JURUSAN.find((j) => j.code.toLowerCase() === code);
    if (byCode) return byCode.slug;
  }

  // 3. Nama sama persis.
  if (name) {
    const byName = JURUSAN.find((j) => j.name.toLowerCase() === name);
    if (byName) return byName.slug;
  }

  // 4. Kata kunci pada nama/slug (urutan penting: yang lebih spesifik dulu).
  const haystack = `${name} ${slug} ${code}`;
  const KEYWORDS: Array<{ match: string[]; slug: string }> = [
    { match: ['perangkat lunak', 'pplg', 'rpl', 'software'], slug: 'pplg' },
    { match: ['jaringan', 'tjkt', 'tkj', 'telekomunikasi'], slug: 'tjkt' },
    { match: ['multimedia', 'dkv', 'desain komunikasi visual'], slug: 'dkv' },
    { match: ['kuliner', 'tata boga'], slug: 'kuliner' },
    { match: ['logistik'], slug: 'teknik-logistik' },
    { match: ['otomotif'], slug: 'teknik-otomotif' },
    { match: ['mesin', 'otomasi', 'manufaktur'], slug: 'teknik-mesin' },
    { match: ['akuntansi', 'akl', 'keuangan'], slug: 'akl' },
    { match: ['pemasaran', 'pms', 'bisnis digital', 'ritel'], slug: 'pemasaran' },
    { match: ['perkantoran', 'mplb', 'administrasi perkantoran', 'layanan bisnis'], slug: 'mplb' },
  ];

  const hit = KEYWORDS.find(({ match }) => match.some((kw) => haystack.includes(kw)));
  return hit ? hit.slug : null;
}