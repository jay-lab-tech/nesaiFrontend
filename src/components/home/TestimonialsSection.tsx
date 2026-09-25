import Image from 'next/image';
import { Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  major: string;
  avatarUrl: string;
  content: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Andi Pratama',
    role: 'Senior Software Engineer',
    company: 'Tech Unicorn Indonesia',
    major: 'Alumni RPL 2021',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    content: 'Pondasi logika programming dan bimbingan guru di RPL SMKN 1 Subang sangat relevan dengan standar industri tech saat ini. Sejak kelas 12 saya sudah percaya diri membangun aplikasi full-stack.',
  },
  {
    id: '2',
    name: 'Siti Nurhaliza',
    role: 'Cloud Network Specialist',
    company: 'PT Telkom Indonesia',
    major: 'Alumni TKJ 2022',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    content: 'Sertifikasi MikroTik dan Cisco yang saya dapatkan selama di SMKN 1 Subang menjadi nilai plus luar biasa saat proses rekrutmen. Fasilitas lab server sekolah benar-benar berstandar industri nyata.',
  },
  {
    id: '3',
    name: 'Fahri Ramadhan',
    role: 'Lead 3D Animator & Art Director',
    company: 'Animation Studio Global',
    major: 'Alumni DKV 2020',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    content: 'Di SMKN 1 Subang, kami tidak hanya diajarkan teori gambar, tapi langsung mengerjakan proyek komersial di studio. Mentalitas profesional dan portofolio itulah yang membuka pintu karir saya ke industri internasional.',
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 border border-blue-200 px-3.5 py-1 text-xs font-bold text-blue-700 uppercase tracking-wider mb-3">
            Testimoni Alumni
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight mb-4">
            Alumni Sukses di Industri Global
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Kisah inspiratif lulusan SMKN 1 Subang yang kini berkarya di perusahaan teknologi terdepan,
            BUMN, dan agensi multinasional.
          </p>
        </div>

        {/* Testimonials 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-8 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300"
            >
              <div>
                <Quote className="h-8 w-8 text-blue-300/80 mb-4" />
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-6 italic">
                  &ldquo;{item.content}&rdquo;
                </p>
              </div>

              {/* Author Profile */}
              <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-blue-600 shrink-0">
                  <Image
                    src={item.avatarUrl}
                    alt={item.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-slate-900 text-sm leading-tight">
                    {item.name}
                  </p>
                  <p className="text-xs font-semibold text-blue-600 truncate">
                    {item.role}
                  </p>
                  <p className="text-[11px] text-slate-500 truncate">
                    {item.company} • {item.major}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
