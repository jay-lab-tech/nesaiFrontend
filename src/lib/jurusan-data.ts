export interface Jurusan {
  code: string;
  slug: string;
  name: string;
  description: string;
  focus: string;
  subjects: string[];
  careers: string[];
}

export const JURUSAN: Jurusan[] = [
  { code: 'AKL', slug: 'akl', name: 'Akuntansi dan Keuangan Lembaga', description: 'Mempelajari pencatatan, pengelolaan, dan pelaporan keuangan untuk mendukung administrasi bisnis yang tertib dan akurat.', focus: 'Pembukuan, administrasi keuangan, perpajakan, dan layanan perbankan.', subjects: ['Akuntansi dasar', 'Komputer akuntansi', 'Perpajakan', 'Administrasi pajak'], careers: ['Staf akuntansi', 'Administrasi keuangan', 'Staf pajak', 'Wirausaha'] },
  { code: 'PMS', slug: 'pemasaran', name: 'Pemasaran', description: 'Mengembangkan kemampuan memahami pelanggan, menyusun strategi promosi, dan menjalankan kegiatan penjualan di berbagai kanal.', focus: 'Penjualan, promosi, bisnis ritel, e-commerce, dan pemasaran digital.', subjects: ['Dasar pemasaran', 'Bisnis ritel', 'Pemasaran digital', 'Komunikasi bisnis'], careers: ['Staf pemasaran', 'Visual merchandiser', 'Pengelola toko online', 'Wirausaha'] },
  { code: 'MPLB', slug: 'mplb', name: 'Manajemen Perkantoran dan Layanan Bisnis', description: 'Membangun keterampilan administrasi, pengelolaan dokumen, komunikasi profesional, dan layanan pelanggan.', focus: 'Administrasi perkantoran, dokumen, teknologi perkantoran, dan layanan pelanggan.', subjects: ['Korespondensi', 'Teknologi perkantoran', 'Kearsipan', 'Layanan bisnis'], careers: ['Staf administrasi', 'Sekretaris', 'Resepsionis', 'Customer service'] },
  { code: 'PPLG', slug: 'pplg', name: 'Pengembangan Perangkat Lunak dan Gim', description: 'Mengenal proses merancang, membangun, menguji, dan memelihara perangkat lunak, aplikasi web, serta gim.', focus: 'Pemrograman, basis data, aplikasi web, pengujian, dan pengembangan gim.', subjects: ['Pemrograman dasar', 'Basis data', 'Pemrograman web', 'Pengembangan gim'], careers: ['Web developer', 'Software developer', 'Game developer', 'UI developer'] },
  { code: 'TJKT', slug: 'tjkt', name: 'Teknik Jaringan Komputer dan Telekomunikasi', description: 'Mempelajari perakitan, instalasi, konfigurasi, dan pemeliharaan komputer serta jaringan komunikasi.', focus: 'Komputer, jaringan, internet, server, keamanan jaringan, dan fiber optik.', subjects: ['Jaringan dasar', 'Administrasi server', 'Keamanan jaringan', 'Teknologi fiber optik'], careers: ['Teknisi jaringan', 'Network administrator', 'Teknisi komputer', 'Teknisi telekomunikasi'] },
  { code: 'TO', slug: 'teknik-otomotif', name: 'Teknik Otomotif', description: 'Mengembangkan keterampilan pemeriksaan, perawatan, dan perbaikan kendaraan dengan prosedur kerja yang aman.', focus: 'Perawatan kendaraan roda dua, diagnosis kerusakan, dan dasar kewirausahaan bengkel.', subjects: ['Teknologi dasar otomotif', 'Pemeliharaan mesin', 'Kelistrikan otomotif', 'Chassis dan pemindah tenaga'], careers: ['Mekanik otomotif', 'Service advisor', 'Teknisi kendaraan', 'Wirausaha bengkel'] },
  { code: 'DKV', slug: 'dkv', name: 'Desain Komunikasi Visual', description: 'Mengolah ide menjadi pesan visual melalui desain, ilustrasi, fotografi, dan video yang komunikatif.', focus: 'Tata letak, warna, ilustrasi, tipografi, videografi, dan fotografi.', subjects: ['Dasar desain', 'Ilustrasi', 'Fotografi', 'Desain publikasi'], careers: ['Desainer grafis', 'Ilustrator', 'Fotografer', 'Content creator'] },
  { code: 'TM', slug: 'teknik-mesin', name: 'Teknik Mesin', description: 'Mempelajari proses produksi dan pengerjaan komponen menggunakan mesin konvensional maupun berbasis CNC.', focus: 'Gambar teknik, proses pemesinan, pengukuran, dan produksi komponen.', subjects: ['Gambar teknik', 'Teknik pemesinan', 'CNC dasar', 'Pengukuran teknik'], careers: ['Operator mesin', 'Teknisi manufaktur', 'Drafter teknik', 'Wirausaha produksi'] },
  { code: 'KL', slug: 'kuliner', name: 'Kuliner', description: 'Mengembangkan keterampilan mengolah, menyajikan, dan mengelola produk makanan serta minuman secara profesional.', focus: 'Pengolahan makanan, penyajian, pelayanan, dan keamanan pangan.', subjects: ['Dasar kuliner', 'Pastry dan bakery', 'Tata hidang', 'Keamanan pangan'], careers: ['Juru masak', 'Pastry chef', 'Pramusaji', 'Wirausaha kuliner'] },
  { code: 'TL', slug: 'teknik-logistik', name: 'Teknik Logistik', description: 'Mempelajari perencanaan, pengendalian, penyimpanan, pemindahan, dan distribusi barang secara efisien.', focus: 'Pergudangan, inventaris, distribusi, transportasi, dan rantai pasok.', subjects: ['Manajemen pergudangan', 'Pengendalian persediaan', 'Distribusi barang', 'Administrasi logistik'], careers: ['Staf gudang', 'Administrasi logistik', 'Inventory controller', 'Staf distribusi'] },
];

export function getJurusan(slug: string) {
  return JURUSAN.find((jurusan) => jurusan.slug === slug);
}