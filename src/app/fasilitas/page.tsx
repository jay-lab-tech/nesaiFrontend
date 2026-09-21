import Image from 'next/image';
import Link from 'next/link';
import { 
  Building2, 
  Monitor, 
  Server, 
  Video, 
  Wrench, 
  BookOpen, 
  Users, 
  Dumbbell, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { NesaiPromoBar } from '@/components/home/NesaiPromoBar';

export const metadata = {
  title: 'Fasilitas Sekolah — SMKN 1 Subang (NESAS)',
  description: 'Fasilitas dan sarana prasarana belajar berstandar industri di SMKN 1 Subang.',
};

interface FacilityDetail {
  id: string;
  title: string;
  category: string;
  description: string;
  specs: string[];
  imageUrl: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ALL_FACILITIES: FacilityDetail[] = [
  {
    id: 'lab-komputer',
    title: 'Lab Komputer & IoT Engineering',
    category: 'Laboratorium IT',
    description: 'Workstation performa tinggi untuk pemrograman web, mobile, basis data enterprise, dan perancangan mikrokontroler sensor Internet of Things.',
    specs: ['40 PC Core i7 16GB RAM + SSD NVMe', 'Dedicated Gigabit Fiber Optic Network', 'Smart Interactive Flat Panel Display', 'Modul IoT Arduino & ESP32 Board'],
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
    icon: Monitor,
  },
  {
    id: 'data-center',
    title: 'Mini Data Center & Server Room',
    category: 'Infrastruktur Jaringan',
    description: 'Ruang server mandiri berpendingin presisi yang digunakan siswa TKJ untuk mempelajari arsitektur cloud computing, virtualisasi Proxmox/VMware, dan keamanan siber.',
    specs: ['Rack Server Enterprise dengan Dual PSU', 'MikroTik CCR & Cisco Catalyst Switches', 'Sistem Pendingin Presisi & UPS Redundan', 'Firewall Hardware & CCTV Monitoring'],
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    icon: Server,
  },
  {
    id: 'studio-multimedia',
    title: 'Studio Produksi Multimedia & Green Screen',
    category: 'Kreatif & Broadcast',
    description: 'Studio kedap suara profesional untuk produksi film pendek, siaran live streaming, fotografi komersial, motion capture, dan animasi visual effect.',
    specs: ['Cyclorama Wall Green Screen 8x6 meter', 'Kamera Sinema 4K & Lensa Prime', 'Lighting Studio Godox / Aputure Profesional', 'Workstation Render GPU RTX 4080'],
    imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80',
    icon: Video,
  },
  {
    id: 'workshop-otomasi',
    title: 'Workshop Mekatronika & Robotik Industri',
    category: 'Manufaktur & Rekayasa',
    description: 'Bengkel praktik industri berstandar Jerman untuk perakitan sistem kontrol otomasi pabrik, kalibrasi sensor, pneumatik/hidrolik, dan pemrograman lengan robotik.',
    specs: ['Modul Trainer PLC Siemens S7-1200 & Omron', 'Trainer Elektropneumatik & Elektrohidrolik', 'Lengan Robotik 6-Axis Industri', 'Meja Kalibrasi & Perkakas Standar TEFA'],
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    icon: Wrench,
  },
  {
    id: 'perpustakaan-digital',
    title: 'Perpustakaan Digital (E-Library)',
    category: 'Pusat Literasi',
    description: 'Ruang baca modern bernuansa nyaman dengan ribuan koleksi buku cetak, portal e-book interaktif, akses jurnal ilmiah vokasi, dan area diskusi kelompok.',
    specs: ['10 PC Riset Khusus Akses E-Library', 'Ribuan Koleksi E-Book Berlisensi Kemdikbud', 'Area Diskusi & Bean Bag Santai', 'WiFi Khusus Kecepatan Tinggi 100 Mbps'],
    imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
    icon: BookOpen,
  },
  {
    id: 'aula-graha-nesas',
    title: 'Aula Pertemuan Graha NESAS',
    category: 'Gedung Akbar',
    description: 'Auditorium megah berkapasitas 1.500 orang dengan tata suara akustik profesional untuk job fair karir industri, pameran produk inovasi, dan wisuda.',
    specs: ['Kapasitas Hingga 1.500 Tamu Undangan', 'Videotron P2.5 High Definition 8x4 meter', 'Line Array Sound System Profesional', 'Full Air Conditioner & Ruang Transit VIP'],
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    icon: Building2,
  },
  {
    id: 'sarana-olahraga',
    title: 'Sarana Olahraga & Lapangan Terpadu',
    category: 'Kebugaran Siswa',
    description: 'Kompleks olahraga multi-fungsi untuk menjaga kebugaran, kegiatan ekstrakurikuler basket, voli, futsal, dan upacara bendera mingguan.',
    specs: ['Lapangan Futsal & Basket Standar Nasional', 'Tribun Penonton dengan Peneduh', 'Perlengkapan Atletik & Tenis Meja', 'Pencahayaan Malam LED Floodlight'],
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
    icon: Dumbbell,
  },
  {
    id: 'masjid-sekolah',
    title: 'Masjid Sekolah Asy-Syuhada NESAS',
    category: 'Ibadah & Karakter',
    description: 'Pusat pembinaan kerohanian Islam dan pembentukan akhlak mulia siswa melalui sholat berjamaah, keputrian, dan kajian mentoring keagamaan.',
    specs: ['Kapasitas Sholat 1.000 Jamaah', 'Area Wudhu Bersih & Representatif', 'Perpustakaan Mini Buku Islam & Al-Quran', 'Sound System Masjid Khusus Tartil'],
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    icon: Users,
  },
];

export default function FasilitasPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="relative bg-slate-950 text-white py-16 lg:py-24 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 filter brightness-50"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=2000&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-4">
            <Link href="/" className="hover:text-cyan-300 transition-colors">Beranda</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-cyan-300">Fasilitas Belajar</span>
          </nav>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/20 border border-cyan-400/30 px-3.5 py-1 text-xs font-semibold text-cyan-300 mb-4">
            <ShieldCheck className="h-3.5 w-3.5 text-cyan-400" />
            Sarana Berstandar Industri
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Fasilitas Belajar & Sarana Prasarana
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Mendukung pembelajaran praktikum kejuruan dengan teknologi modern yang setara dengan lingkungan kerja industri sesungguhnya.
          </p>
        </div>
      </section>

      {/* Grid Fasilitas */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ALL_FACILITIES.map((facility) => {
              const Icon = facility.icon;
              return (
                <div
                  key={facility.id}
                  className="flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-all group"
                >
                  <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                    <Image
                      src={facility.imageUrl}
                      alt={facility.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/80 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white">
                        <Icon className="h-3.5 w-3.5 text-cyan-400" />
                        {facility.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                      {facility.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-6">
                      {facility.description}
                    </p>

                    {/* Specs Box */}
                    <div className="mt-auto pt-4 border-t border-slate-100">
                      <p className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                        Fitur & Spesifikasi:
                      </p>
                      <ul className="space-y-1.5 text-xs text-slate-600">
                        {facility.specs.map((spec, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 shrink-0" />
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Promo Bar */}
      <NesaiPromoBar />
    </div>
  );
}
