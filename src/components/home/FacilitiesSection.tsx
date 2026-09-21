import Image from 'next/image';
import { Monitor, Server, Video, Wrench, BookOpen, Building2 } from 'lucide-react';

interface FacilityItem {
  id: string;
  title: string;
  tag: string;
  description: string;
  imageUrl: string;
  icon: React.ComponentType<{ className?: string }>;
}

const FACILITIES: FacilityItem[] = [
  {
    id: 'lab-komputer',
    title: 'Lab Komputer & IoT',
    tag: 'Teknologi Informasi',
    description: 'PC workstation spesifikasi tinggi, modul mikrokontroler IoT, dan jaringan fiber optic terdedikasi untuk praktikum rekayasa software.',
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
    icon: Monitor,
  },
  {
    id: 'data-center',
    title: 'Data Center & Mini Server',
    tag: 'Infrastruktur Jaringan',
    description: 'Fasilitas server mandiri berpendingin khusus untuk simulasi cloud architecture, virtualisasi server, dan keamanan siber.',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    icon: Server,
  },
  {
    id: 'studio-multimedia',
    title: 'Studio Multimedia & Green Screen',
    tag: 'Produksi Kreatif',
    description: 'Studio audio visual lengkap dengan kamera sinema 4K, tata cahaya profesional, cyclorama wall, dan ruang editing suara kedap.',
    imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80',
    icon: Video,
  },
  {
    id: 'workshop-otomasi',
    title: 'Workshop Mekatronika & Otomasi',
    tag: 'Teknik Industri',
    description: 'Ruang perakitan otomasi dengan modul PLC standar industri, simulator pneumatik/hidrolik, dan lengan robotik cerdas.',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    icon: Wrench,
  },
  {
    id: 'perpustakaan-digital',
    title: 'Perpustakaan Digital (E-Library)',
    tag: 'Pusat Literasi',
    description: 'Ruang baca estetik yang tenang dengan ribuan e-book, jurnal kejuruan internasional, komputer riset, dan area collaborative workspace.',
    imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
    icon: BookOpen,
  },
  {
    id: 'aula-graha-nesas',
    title: 'Aula Pertemuan Graha NESAS',
    tag: 'Fasilitas Akbar',
    description: 'Gedung serbaguna megah berkapasitas 1.500 peserta untuk job fair industri, pameran produk TEFA, seminar internasional, dan wisuda.',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    icon: Building2,
  },
];

export function FacilitiesSection() {
  return (
    <section id="fasilitas" className="py-24 bg-white relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-50 border border-cyan-200 px-3.5 py-1 text-xs font-bold text-cyan-800 uppercase tracking-wider mb-3">
            Fasilitas Sekolah
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight mb-4">
            Fasilitas Belajar Berstandar Industri
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Kami menyediakan sarana dan prasarana modern untuk mendukung proses belajar mengajar
            berbasis praktik langsung (hands-on) yang relevan dengan kebutuhan dunia usaha dan dunia industri (DUDI).
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FACILITIES.map((facility) => {
            const Icon = facility.icon;
            return (
              <div
                key={facility.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300"
              >
                {/* Image Wrap */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={facility.imageUrl}
                    alt={facility.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
                  
                  {/* Floating Tag */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-950/80 backdrop-blur-md px-3 py-1 text-[11px] font-semibold text-white">
                      <Icon className="h-3.5 w-3.5 text-cyan-400" />
                      {facility.tag}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                    {facility.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {facility.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
