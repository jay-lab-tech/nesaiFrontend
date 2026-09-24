import type { MajorWithRelations } from '@/lib/api/public-endpoints';

export interface FallbackMajorDefinition extends MajorWithRelations {
  aliases?: string[];
  badge?: string;
  color?: string;
  certifications?: string[];
  promptQuestion?: string;
}

export const DEFAULT_MAJORS_CATALOG: FallbackMajorDefinition[] = [
  {
    id: 1,
    slug: 'pplg',
    aliases: ['rpl', 'rekayasa-perangkat-lunak', 'pengembangan-perangkat-lunak-dan-gim'],
    name: 'Pengembangan Perangkat Lunak & Gim (PPLG)',
    summary:
      'Fokus pada pemrograman berorientasi objek, perancangan basis data modern, pengembangan web full-stack (Next.js, Laravel), mobile application (Flutter), game development, dan integrasi Artificial Intelligence (AI).',
    description:
      'Program Keahlian Pengembangan Perangkat Lunak dan Gim (PPLG) — yang sebelumnya dikenal sebagai Rekayasa Perangkat Lunak (RPL) — membekali siswa dengan keahlian komprehensif di bidang rekayasa piranti lunak, web programming, game design, dan solusi digital industri masa kini.\n\nSiswa dididik dengan kurikulum selaras industri yang bekerja sama dengan berbagai software house dan studio gim nasional. Pembelajaran berfokus pada penguasaan bahasa pemrograman JavaScript, TypeScript, Python, PHP, Dart, hingga C#, serta pengujian perangkat lunak (QA), arsitektur komputasi awan (cloud computing), dan kolaborasi tim berbasis Agile/Scrum.',
    badge: 'Software & AI Development',
    color: 'from-indigo-600 to-blue-600',
    subjects: [
      { id: 101, major_id: 1, name: 'Pemrograman Web Full-Stack (Next.js, React, Laravel, Node.js)' },
      { id: 102, major_id: 1, name: 'Pemrograman Berorientasi Objek (PBO) & Basis Data (MySQL, PostgreSQL)' },
      { id: 103, major_id: 1, name: 'Pengembangan Aplikasi Mobile (Flutter, Android Studio)' },
      { id: 104, major_id: 1, name: 'Pengembangan Gim 2D/3D (Unity Engine, Godot, Blender)' },
      { id: 105, major_id: 1, name: 'Arsitektur API, Cloud Deployment, & Version Control (Git/GitHub)' },
      { id: 106, major_id: 1, name: 'Kecerdasan Buatan Terapan & Prompt Engineering AI' },
    ],
    careers: [
      { id: 201, major_id: 1, name: 'Full-Stack Web Developer' },
      { id: 202, major_id: 1, name: 'Mobile App Developer (Android/iOS)' },
      { id: 203, major_id: 1, name: 'Game Programmer & Technical Designer' },
      { id: 204, major_id: 1, name: 'Database Administrator & Backend Engineer' },
      { id: 205, major_id: 1, name: 'Software Quality Assurance (QA) Tester' },
      { id: 206, major_id: 1, name: 'Cloud Solutions & DevOps Specialist' },
    ],
    innovations: [
      {
        id: 301,
        name: 'Sistem Informasi Akademik & Presensi Mandiri Berbasis Geolocation',
        has_haki: true,
        description: 'Aplikasi presensi berbasis mobile dan face recognition untuk mencatat kehadiran siswa secara real-time.',
      },
      {
        id: 302,
        name: 'Gim Edukasi Budaya Pasundan 2D',
        has_haki: true,
        description: 'Gim platformer edukatif yang mengenalkan sejarah dan kebudayaan daerah Jawa Barat.',
      },
      {
        id: 303,
        name: 'NesAI Virtual Assistant School Hub',
        has_haki: false,
        description: 'Portal tanya jawab interaktif berbasis AI dan semantic context awareness untuk layanan informasi sekolah.',
      },
    ],
    alumni: [
      {
        id: 401,
        name: 'Alif Muhamad Ramdan',
        headline: 'Lead Software Engineer di Digital Studio Jakarta',
        story: 'Fondasi logika pemrograman dan kurikulum industri di SMKN 1 Subang sangat membantu saya bersaing di industri teknologi modern.',
      },
      {
        id: 402,
        name: 'Fakhri Pratama',
        headline: 'Mobile Application Developer di Perusahaan FinTech',
        story: 'Proyek nyata selama sekolah membuat portofolio saya langsung dilirik perusahaan ternama sebelum lulus.',
      },
    ],
    certifications: [
      'Sertifikasi BNSP Junior Web Developer',
      'Oracle Certified Associate Java Programmer',
      'Google Cloud Certified Associate Cloud Engineer',
    ],
    promptQuestion: 'Apa saja materi coding, portofolio yang dibuat, dan prospek karir di jurusan Pengembangan Perangkat Lunak dan Gim (PPLG)?',
  },
  {
    id: 2,
    slug: 'tkj',
    aliases: ['teknik-komputer-jaringan', 'teknik-komputer-dan-jaringan'],
    name: 'Teknik Komputer & Jaringan (TKJ)',
    summary:
      'Mempelajari perakitan komputer, instalasi sistem operasi jaringan, konfigurasi router & switch, keamanan siber (cyber security), administrasi server, hingga cloud computing.',
    description:
      'Program Keahlian Teknik Komputer dan Jaringan (TKJ) mendidik peserta didik untuk menguasai infrastruktur jaringan kabel dan nirkabel, fiber optik, instalasi data center, konfigurasi keamanan sistem (firewall, IDS/IPS, VPN), hingga manajemen server berbasis Linux dan Windows Server.\n\nSiswa dipersiapkan untuk menghadapi tantangan era industri 4.0 dan transformasi cloud dengan sertifikasi berstandar industri internasional seperti MikroTik Certified Network Associate (MTCNA) dan Cisco Certified Network Associate (CCNA).',
    badge: 'Infrastruktur & Cloud',
    color: 'from-blue-600 to-cyan-600',
    subjects: [
      { id: 111, major_id: 2, name: 'Routing & Switching Jaringan (MikroTik, Cisco Catalyst)' },
      { id: 112, major_id: 2, name: 'Cyber Security, Penetration Testing & Firewall Protection' },
      { id: 113, major_id: 2, name: 'Linux & Windows Server Enterprise Administration' },
      { id: 114, major_id: 2, name: 'Infrastruktur Fiber Optik (FTTH), OTDR, & Splicing Presisi' },
      { id: 115, major_id: 2, name: 'Cloud Architecture & Virtualisasi (AWS, Proxmox, Docker)' },
    ],
    careers: [
      { id: 211, major_id: 2, name: 'Network Engineer & Network Administrator' },
      { id: 212, major_id: 2, name: 'Cyber Security Analyst & SOC Operator' },
      { id: 213, major_id: 2, name: 'Cloud & System Administrator' },
      { id: 214, major_id: 2, name: 'Fiber Optic Installation Specialist' },
      { id: 215, major_id: 2, name: 'Network Operations Center (NOC) Engineer' },
    ],
    innovations: [
      {
        id: 311,
        name: 'Smart Campus Bandwidth Management & Captive Portal',
        has_haki: true,
        description: 'Solusi routing cerdas penyeimbang beban lalu lintas internet di seluruh lingkungan sekolah.',
      },
      {
        id: 312,
        name: 'IoT Network Security Alert via Telegram Gateway',
        has_haki: false,
        description: 'Sistem deteksi dini serangan brute-force dan anomali jaringan yang mengirim notifikasi seketika.',
      },
    ],
    alumni: [
      {
        id: 411,
        name: 'Rian Hidayat',
        headline: 'Senior Network Operations Engineer di Telco Provider',
        story: 'Sertifikasi MTCNA yang saya peroleh saat kelas 12 di SMKN 1 Subang menjadi tiket emas memulai karir profesional.',
      },
    ],
    certifications: [
      'MikroTik Certified Network Associate (MTCNA)',
      'Cisco Certified Network Associate (CCNA)',
      'Sertifikasi BNSP Teknisi Madya Komputer & Jaringan',
    ],
    promptQuestion: 'Jelaskan prospek kerja, mata pelajaran, dan sertifikasi di jurusan Teknik Komputer & Jaringan (TKJ) SMKN 1 Subang.',
  },
  {
    id: 3,
    slug: 'dkv',
    aliases: ['desain-komunikasi-visual', 'multimedia', 'mm'],
    name: 'Desain Komunikasi Visual (DKV)',
    summary:
      'Menyiapkan kreator visual handal dalam produksi animasi 2D/3D, sinematografi, fotografi komersial, tata suara digital, desain UI/UX, dan branding grafis profesional.',
    description:
      'Program Keahlian Desain Komunikasi Visual (DKV) — sebelumnya dikenal sebagai Multimedia — memadukan nilai seni estetika dengan teknologi grafis komputer modern.\n\nSiswa dilatih untuk memproduksi konten visual komersial, media periklanan, motion graphics, video sinematik berstandar siaran, desain antarmuka digital (UI/UX), hingga aset animasi 3D menggunakan software standar industri global.',
    badge: 'Industri Kreatif Digital',
    color: 'from-purple-600 to-pink-600',
    subjects: [
      { id: 121, major_id: 3, name: 'Desain Vektor & Ilustrasi Digital (Adobe Illustrator, Photoshop)' },
      { id: 122, major_id: 3, name: 'Animasi 2D & 3D Modeling (Blender, After Effects)' },
      { id: 123, major_id: 3, name: 'Sinematografi, Videografi, & Color Grading Profesional' },
      { id: 124, major_id: 3, name: 'UI/UX Design Produk Digital & Web Prototyping (Figma)' },
      { id: 125, major_id: 3, name: 'Fotografi Komersial & Studio Lighting Management' },
    ],
    careers: [
      { id: 221, major_id: 3, name: 'Graphic Designer & Brand Identity Specialist' },
      { id: 222, major_id: 3, name: 'UI/UX Designer Produk Digital' },
      { id: 223, major_id: 3, name: 'Video Editor & Colorist Sinematik' },
      { id: 224, major_id: 3, name: '3D Modeler & Motion Graphic Animator' },
      { id: 225, major_id: 3, name: 'Creative Director & Content Producer' },
    ],
    innovations: [
      {
        id: 321,
        name: 'Film Pendek Dokumenter "Pesona Budaya Subang"',
        has_haki: true,
        description: 'Karya sinematografi siswa yang memenangkan penghargaan festival film pelajar tingkat provinsi.',
      },
    ],
    alumni: [
      {
        id: 421,
        name: 'Nadia Salsabila',
        headline: 'Lead Motion Designer di Creative Agency Jakarta',
        story: 'Praktik studio yang intensif di DKV SMKN 1 Subang membangun portofolio kreatif yang diakui klien multinasional.',
      },
    ],
    certifications: [
      'Adobe Certified Professional (Photoshop & Premiere Pro)',
      'Sertifikasi BNSP Desainer Grafis Muda',
      'Sertifikasi Kompetensi Animator Madya',
    ],
    promptQuestion: 'Bagaimana kurikulum, fasilitas studio, dan karya siswa di jurusan Desain Komunikasi Visual (DKV)?',
  },
  {
    id: 4,
    slug: 'toi',
    aliases: ['teknik-otomasi-industri'],
    name: 'Teknik Otomasi Industri (TOI)',
    summary:
      'Mengkaji sistem kontrol otomatis pabrik modern, pemrograman PLC (Programmable Logic Controller), sensor cerdas, sistem pneumatik, hidrolik, dan lengan robot manufaktur.',
    description:
      'Program Keahlian Teknik Otomasi Industri (TOI) menjawab kebutuhan modernisasi pabrik manufaktur di era industri pintar. Siswa dibekali kompetensi merancang, menginstalasi, memprogram, dan merawat sistem kendali otomatis berbasis PLC, elektropneumatik, sistem SCADA, dan robotika industri.',
    badge: 'Mekatronika & Robotik',
    color: 'from-teal-600 to-emerald-600',
    subjects: [
      { id: 131, major_id: 4, name: 'Pemrograman PLC Terstandar Industri (Siemens, Omron, Mitsubishi)' },
      { id: 132, major_id: 4, name: 'Sistem Elektropneumatik & Hidrolik Pabrik' },
      { id: 133, major_id: 4, name: 'Robotika Industri & Articulated Robotic Arm Programming' },
      { id: 134, major_id: 4, name: 'Perakitan Panel Daya Industri & Kalibrasi Sensor Cerdas' },
      { id: 135, major_id: 4, name: 'SCADA (Supervisory Control and Data Acquisition) & IIoT' },
    ],
    careers: [
      { id: 231, major_id: 4, name: 'Automation Maintenance Engineer' },
      { id: 232, major_id: 4, name: 'PLC & SCADA Programmer' },
      { id: 233, major_id: 4, name: 'Industrial Robotics Technician' },
      { id: 234, major_id: 4, name: 'Electrical Control Specialist' },
      { id: 235, major_id: 4, name: 'Plant Operator Manufaktur Otomotif' },
    ],
    innovations: [
      {
        id: 331,
        name: 'Prototipe Sorting Machine Otomatis Berbasis Sensor Warna & PLC',
        has_haki: true,
        description: 'Sistem pemilah objek otomatis berkecepatan tinggi yang dikontrol melalui PLC terprogram.',
      },
    ],
    alumni: [
      {
        id: 431,
        name: 'Aditia Nugraha',
        headline: 'Automation Engineer di Perusahaan Manufaktur Otomotif Jepang',
        story: 'Keahlian PLC dan pneumatik dari bengkel TOI membuat saya langsung direkrut sebelum wisuda kelulusan.',
      },
    ],
    certifications: [
      'Sertifikasi BNSP Teknisi Otomasi Industri',
      'Sertifikasi Pemrograman PLC Standar Internasional',
    ],
    promptQuestion: 'Jelaskan fasilitas bengkel dan peluang kerja alumni jurusan Teknik Otomasi Industri (TOI).',
  },
  {
    id: 5,
    slug: 'bdp',
    aliases: ['bisnis-digital', 'pemasaran', 'pm', 'bisnis-digital-dan-pemasaran'],
    name: 'Bisnis Digital & Pemasaran (BDP)',
    summary:
      'Mencakup strategi pemasaran digital, manajemen marketplace e-commerce, content strategy, live selling profesional, optimasi SEO, dan analitik bisnis modern.',
    description:
      'Program Keahlian Bisnis Digital dan Pemasaran menyiapkan tenaga profesional dan wirausahawan tangguh yang menguasai ekosistem perdagangan digital. Siswa mempelajari periklanan berbayar (Meta Ads, Google Ads, TikTok Ads), pengelolaan toko e-commerce, strategi konten viral, hingga manajemen relasi pelanggan.',
    badge: 'Digital Commerce & Marketing',
    color: 'from-amber-600 to-orange-600',
    subjects: [
      { id: 141, major_id: 5, name: 'Digital Advertising (Meta Ads, Google Ads, TikTok Ads)' },
      { id: 142, major_id: 5, name: 'Social Media Strategy, Copywriting, & Content Marketing' },
      { id: 143, major_id: 5, name: 'Operasional Marketplace E-Commerce & Logistik Digital' },
      { id: 144, major_id: 5, name: 'Search Engine Optimization (SEO) & Google Analytics' },
      { id: 145, major_id: 5, name: 'Live Stream Selling & Public Speaking Bisnis' },
    ],
    careers: [
      { id: 241, major_id: 5, name: 'Digital Marketing Specialist' },
      { id: 242, major_id: 5, name: 'E-Commerce Marketplace Manager' },
      { id: 243, major_id: 5, name: 'Social Media Strategist & Content Creator' },
      { id: 244, major_id: 5, name: 'SEO Specialist & Web Growth Hacker' },
      { id: 245, major_id: 5, name: 'Technopreneur / Wirausahawan Mandiri' },
    ],
    innovations: [
      {
        id: 341,
        name: 'Unit Bisnis E-Commerce Siswa "NESAS Mart Online"',
        has_haki: false,
        description: 'Platform ritel digital yang dikelola langsung oleh siswa sebagai inkubator bisnis sekolah.',
      },
    ],
    alumni: [
      {
        id: 441,
        name: 'Siti Rahmawati',
        headline: 'Digital Advertiser di Brand FMCG Nasional',
        story: 'Praktek mengelola budget iklan digital riil di sekolah memberikan kepercayaan diri memimpin kampanye besar.',
      },
    ],
    certifications: [
      'Google Digital Garage Certified',
      'BNSP Digital Marketing Professional',
      'HubSpot Inbound Marketing Certified',
    ],
    promptQuestion: 'Apa saja prospek karir dan program wirausaha di jurusan Bisnis Digital & Pemasaran?',
  },
  {
    id: 6,
    slug: 'akl',
    aliases: ['akuntansi', 'akuntansi-dan-keuangan-lembaga'],
    name: 'Akuntansi & Keuangan Lembaga (AKL)',
    summary:
      'Membekali keahlian pembukuan digital, audit keuangan lembaga, sistem perpajakan, transaksi perbankan syariah/konvensional, dan pelaporan keuangan berstandar PSAK.',
    description:
      'Program Keahlian Akuntansi dan Keuangan Lembaga (AKL) membentuk lulusan yang teliti, jujur, dan kompeten di bidang administrasi finansial. Siswa dilatih menggunakan software akuntansi modern seperti MYOB, Accurate, dan Zahir, serta memahami prosedur perpajakan elektronik (e-Faktur, e-SPT) dan operasional kas bank.',
    badge: 'Keuangan & Perbankan',
    color: 'from-sky-600 to-blue-700',
    subjects: [
      { id: 151, major_id: 6, name: 'Komputerisasi Akuntansi Terpadu (Accurate, MYOB, Zahir)' },
      { id: 152, major_id: 6, name: 'Penyusunan Laporan Keuangan Standar PSAK' },
      { id: 153, major_id: 6, name: 'Administrasi Perpajakan Digital (PPh, PPN, e-Faktur)' },
      { id: 154, major_id: 6, name: 'Operasional Kas Bank & Lembaga Keuangan Mikro' },
      { id: 155, major_id: 6, name: 'Advanced Spreadsheet & Financial Modeling' },
    ],
    careers: [
      { id: 251, major_id: 6, name: 'Junior Accountant & Finance Staff' },
      { id: 252, major_id: 6, name: 'Tax Administration Specialist' },
      { id: 253, major_id: 6, name: 'Teller & Customer Service Perbankan' },
      { id: 254, major_id: 6, name: 'Internal Audit Assistant' },
      { id: 255, major_id: 6, name: 'Payroll & Budgeting Administrator' },
    ],
    innovations: [
      {
        id: 351,
        name: 'Aplikasi Pembukuan Kas Mini Bank Siswa',
        has_haki: false,
        description: 'Sistem pencatatan transaksi tabungan siswa berbasis web untuk laboratorium perbankan sekolah.',
      },
    ],
    alumni: [
      {
        id: 451,
        name: 'Dwi Lestari',
        headline: 'Relationship Officer di Bank BUMN Subang',
        story: 'Sertifikasi kompetensi teknisi akuntansi dari SMKN 1 Subang sangat diakui saat seleksi perbankan.',
      },
    ],
    certifications: [
      'Sertifikasi BNSP Teknisi Akuntansi Yunior',
      'Sertifikasi Accurate Accounting Software Official',
    ],
    promptQuestion: 'Apa saja keahlian pembukuan dan peluang kerja di perbankan untuk lulusan Akuntansi (AKL)?',
  },
];

/**
 * Helper to find fallback major by slug or alias.
 * Handles cases like 'pplg', 'rpl', 'tkj', 'dkv', etc.
 */
export function getFallbackMajorBySlug(rawSlug: string): FallbackMajorDefinition | null {
  if (!rawSlug) return null;
  const normalized = rawSlug.trim().toLowerCase();

  return (
    DEFAULT_MAJORS_CATALOG.find(
      (m) =>
        m.slug === normalized ||
        (m.aliases && m.aliases.includes(normalized)) ||
        m.name.toLowerCase().includes(normalized)
    ) || null
  );
}
