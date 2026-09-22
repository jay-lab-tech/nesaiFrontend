'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Network, 
  Code2, 
  Palette, 
  Cpu, 
  TrendingUp, 
  Calculator, 
  ChevronRight, 
  CheckCircle2, 
  Briefcase, 
  Award, 
  Bot, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { openNesaiChat } from '@/lib/nesai-events';
import { NesaiPromoBar } from '@/components/home/NesaiPromoBar';
import { publicService, unwrapList } from '@/lib/api/public-endpoints';
import type { Major } from '@/types/cms';

interface MajorDetail {
  id: string;
  slug: string;
  code: string;
  name: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  summary: string;
  skills: string[];
  certifications: string[];
  careers: string[];
  promptQuestion: string;
}

const DEFAULT_MAJORS_DATA: MajorDetail[] = [
  {
    id: 'tkj',
    slug: 'tkj',
    code: 'TKJ',
    name: 'Teknik Komputer & Jaringan',
    badge: 'Infrastruktur & Cloud',
    icon: Network,
    color: 'from-blue-600 to-cyan-600',
    summary: 'Mempelajari perakitan komputer, instalasi sistem operasi jaringan, konfigurasi router & switch, keamanan siber, administrasi server, hingga cloud computing.',
    skills: ['Routing & Switching Jaringan', 'Cyber Security & Firewall', 'Linux & Windows Server Admin', 'Cloud Architecture (AWS / GCP)', 'Fiber Optic Installation'],
    certifications: ['MikroTik Certified Network Associate (MTCNA)', 'Cisco Certified Network Associate (CCNA)', 'Sertifikasi BNSP Teknisi Komputer & Jaringan'],
    careers: ['Network Engineer', 'Cyber Security Analyst', 'Cloud Administrator', 'System Administrator', 'IT Support Specialist'],
    promptQuestion: 'Jelaskan prospek kerja, mata pelajaran, dan sertifikasi di jurusan Teknik Komputer & Jaringan (TKJ) SMKN 1 Subang.',
  },
  {
    id: 'rpl',
    slug: 'rpl',
    code: 'RPL',
    name: 'Rekayasa Perangkat Lunak',
    badge: 'Software & AI Development',
    icon: Code2,
    color: 'from-indigo-600 to-blue-600',
    summary: 'Fokus pada pemrograman berorientasi objek, perancangan basis data relasional & NoSQL, pengembangan web full-stack modern, mobile application (Flutter/React Native), dan integrasi AI.',
    skills: ['Full-Stack Web (Next.js, Laravel, Node.js)', 'Mobile Apps (Flutter / Android)', 'Database Engineering (PostgreSQL, MySQL)', 'API Integration & Cloud Deployment', 'Git & Software Testing'],
    certifications: ['BNSP Junior Web Developer', 'Oracle Certified Java Associate', 'Google Cloud Certified Associate'],
    careers: ['Full-Stack Developer', 'Frontend / Backend Engineer', 'Mobile App Developer', 'Software QA Tester', 'AI Prompt & Solution Engineer'],
    promptQuestion: 'Apa saja materi coding, portofolio yang dibuat, dan prospek karir jurusan Rekayasa Perangkat Lunak (RPL)?',
  },
  {
    id: 'dkv',
    slug: 'dkv',
    code: 'DKV',
    name: 'Multimedia & Desain Komunikasi Visual',
    badge: 'Industri Kreatif Digital',
    icon: Palette,
    color: 'from-purple-600 to-pink-600',
    summary: 'Menyiapkan kreator visual handal dalam produksi animasi 2D/3D, sinematografi, fotografi komersial, tata suara digital, desain UI/UX, dan branding grafis profesional.',
    skills: ['Desain Vektor & Ilustrasi (Illustrator/Photoshop)', 'Animasi 2D & 3D (Blender/After Effects)', 'Videografi & Color Grading Sinematik', 'UI/UX Design (Figma)', 'Audio Recording & Mixing'],
    certifications: ['Adobe Certified Professional (Photoshop & Premiere Pro)', 'Sertifikasi BNSP Desainer Grafis Muda', 'Sertifikasi Animator Madya'],
    careers: ['3D Animator & Modeler', 'Video Editor & Colorist', 'UI/UX Designer', 'Motion Graphic Artist', 'Creative Director'],
    promptQuestion: 'Bagaimana kurikulum dan karya siswa di jurusan Desain Komunikasi Visual (DKV) SMKN 1 Subang?',
  },
  {
    id: 'toi',
    slug: 'toi',
    code: 'TOI',
    name: 'Teknik Otomasi Industri',
    badge: 'Mekatronika & Robotik',
    icon: Cpu,
    color: 'from-teal-600 to-emerald-600',
    summary: 'Mengkaji sistem kontrol otomatis pabrik modern, pemrograman PLC (Programmable Logic Controller), sensor dan aktuator cerdas, pneumatik, hidrolik, dan lengan robot manufaktur.',
    skills: ['Pemrograman PLC (Siemens / Omron)', 'Sistem Kontrol Pneumatik & Hidrolik', 'Lengan Robotik Industri (Articulated Robot)', 'Wiring Panel Industri & Kalibrasi', 'Internet of Things (IoT) Manufaktur'],
    certifications: ['Sertifikasi BNSP Teknisi Otomasi Industri', 'Sertifikasi Pemrograman PLC Standar Internasional'],
    careers: ['Automation Maintenance Engineer', 'PLC Programmer', 'Robotics Technician', 'Electrical Control Engineer', 'Plant Operator'],
    promptQuestion: 'Jelaskan fasilitas bengkel dan peluang kerja alumni jurusan Teknik Otomasi Industri (TOI).',
  },
  {
    id: 'bdp',
    slug: 'bdp',
    code: 'BDP',
    name: 'Bisnis Digital & Pemasaran',
    badge: 'Digital Commerce & Marketing',
    icon: TrendingUp,
    color: 'from-amber-600 to-orange-600',
    summary: 'Mencakup strategi pemasaran digital, manajemen marketplace e-commerce, content strategy, live selling profesional, optimasi mesin pencari (SEO), dan analitik bisnis terapan.',
    skills: ['Digital Advertising (Meta Ads, Google Ads)', 'Social Media Management & Copywriting', 'SEO & Content Marketing Strategy', 'E-Commerce Marketplace Operations', 'Customer Relationship & Analitik'],
    certifications: ['Google Digital Garage Certified', 'BNSP Digital Marketing Professional', 'HubSpot Inbound Marketing Certified'],
    careers: ['Digital Marketer', 'Social Media Strategist', 'E-Commerce Specialist', 'Content Creator & Live Streamer', 'Technopreneur / Wirausaha'],
    promptQuestion: 'Apa saja prospek karir dan program wirausaha di jurusan Bisnis Digital & Pemasaran?',
  },
  {
    id: 'akl',
    slug: 'akl',
    code: 'AKL',
    name: 'Akuntansi & Keuangan Lembaga',
    badge: 'Keuangan & Perbankan',
    icon: Calculator,
    color: 'from-sky-600 to-blue-700',
    summary: 'Membekali keahlian pembukuan digital, audit keuangan lembaga, sistem informasi perpajakan, transaksi perbankan syariah/konvensional, dan pelaporan keuangan terstandar PSAK.',
    skills: ['Software Akuntansi (MYOB, Accurate, Spreadsheet)', 'Perpajakan Digital (e-SPT, PPh, PPN)', 'Penyusunan Laporan Keuangan Neraca & Laba Rugi', 'Audit Bukti Transaksi Perusahaan', 'Operasional Layanan Bank Mini Sekolah'],
    certifications: ['Sertifikasi BNSP Teknisi Akuntansi Pratama', 'Certified Accurate Accounting Practitioner', 'Sertifikasi Brevet Pajak A & B Terapan'],
    careers: ['Junior Accountant', 'Tax Consultant Staff', 'Finance & Billing Officer', 'Teller & Customer Service Bank', 'Auditor Internal'],
    promptQuestion: 'Bisa jelaskan kompetensi dan sertifikasi yang didapat di jurusan Akuntansi & Keuangan Lembaga?',
  },
];

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  tkj: Network,
  rpl: Code2,
  dkv: Palette,
  toi: Cpu,
  bdp: TrendingUp,
  akl: Calculator,
};

const COLOR_MAP: Record<string, string> = {
  tkj: 'from-blue-600 to-cyan-600',
  rpl: 'from-indigo-600 to-blue-600',
  dkv: 'from-purple-600 to-pink-600',
  toi: 'from-teal-600 to-emerald-600',
  bdp: 'from-amber-600 to-orange-600',
  akl: 'from-sky-600 to-blue-700',
};

export default function JurusanPage() {
  const [majorsList, setMajorsList] = useState<MajorDetail[]>(DEFAULT_MAJORS_DATA);

  useEffect(() => {
    publicService.getMajors()
      .then((res) => {
        const apiMajors = unwrapList<Major>(res);
        if (apiMajors.length > 0) {
          // Map API majors to UI structure
          const mapped: MajorDetail[] = apiMajors.map((m) => {
            const slugKey = m.slug.toLowerCase();
            const fallbackItem = DEFAULT_MAJORS_DATA.find(
              (d) => d.slug === slugKey || d.id === slugKey || m.name.toLowerCase().includes(d.id)
            );

            return {
              id: m.slug,
              slug: m.slug,
              code: fallbackItem?.code || m.name.substring(0, 4).toUpperCase(),
              name: m.name,
              badge: fallbackItem?.badge || 'Program Keahlian Vokasi',
              icon: fallbackItem?.icon || ICON_MAP[slugKey] || Network,
              color: fallbackItem?.color || COLOR_MAP[slugKey] || 'from-slate-700 to-slate-900',
              summary: m.summary || m.description || fallbackItem?.summary || '',
              skills: m.subjects && m.subjects.length > 0
                ? m.subjects.map((s) => s.name)
                : fallbackItem?.skills || ['Kurikulum Berbasis Industri', 'Praktek Kerja Lapangan'],
              certifications: fallbackItem?.certifications || ['Sertifikasi Kompetensi BNSP', 'Uji Kompetensi Keahlian (UKK)'],
              careers: m.careers && m.careers.length > 0
                ? m.careers.map((c) => c.name)
                : fallbackItem?.careers || ['Tenaga Terampil Industri', 'Wirausaha Mandiri'],
              promptQuestion: fallbackItem?.promptQuestion || `Jelaskan kurikulum dan peluang karir di jurusan ${m.name} SMKN 1 Subang.`,
            };
          });
          setMajorsList(mapped);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="relative bg-slate-950 text-white py-16 lg:py-24 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20 filter brightness-50"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=2000&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-4">
            <Link href="/" className="hover:text-cyan-300 transition-colors">Beranda</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-cyan-300">Program Keahlian</span>
          </nav>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 px-3.5 py-1 text-xs font-semibold text-cyan-300 mb-4">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            {majorsList.length} Konsentrasi Keahlian Unggulan
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Pilihan Program Keahlian Masa Depan
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Kurikulum berbasis industri yang dirancang dengan skema <em>Link & Match</em>, diperkuat sertifikasi kompetensi nasional BNSP dan mitra industri multinasional.
          </p>
        </div>
      </section>

      {/* Majors Deep Dive */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          {majorsList.map((major) => {
            const Icon = major.icon;
            return (
              <div
                key={major.id}
                id={major.id}
                className="rounded-3xl border border-slate-200 bg-white p-8 lg:p-10 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-8 border-b border-slate-100 pb-6">
                  <div className="flex items-start gap-4">
                    <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${major.color} text-white shadow-md`}>
                      <Icon className="h-8 w-8 text-cyan-100" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-black tracking-widest text-blue-600 uppercase bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200">
                          {major.code}
                        </span>
                        <span className="text-xs font-semibold text-slate-500">
                          {major.badge}
                        </span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                        <Link href={`/jurusan/${major.slug}`} className="hover:text-blue-600 transition-colors">
                          {major.name}
                        </Link>
                      </h2>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      href={`/jurusan/${major.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 hover:border-slate-300 transition-all"
                    >
                      <span>Lihat Halaman Jurusan</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => openNesaiChat(major.promptQuestion)}
                      className="inline-flex items-center gap-2 self-start rounded-xl border border-cyan-300 bg-cyan-50/80 px-4 py-2.5 text-xs font-bold text-cyan-800 hover:bg-cyan-100 hover:border-cyan-400 transition-all shadow-2xs"
                    >
                      <Bot className="h-4 w-4 text-cyan-600" />
                      <span>Tanya ke NESAI</span>
                    </button>
                  </div>
                </div>

                <p className="text-slate-600 text-base leading-relaxed mb-8">
                  {major.summary}
                </p>

                {/* 3 Pillars Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  {/* Skills */}
                  <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-5">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-3">
                      <CheckCircle2 className="h-4 w-4 text-blue-600" />
                      <span>Keahlian yang Dipelajari</span>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-600">
                      {major.skills.map((skill, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-blue-500 font-bold">•</span>
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Certifications */}
                  <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-5">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-3">
                      <Award className="h-4 w-4 text-amber-600" />
                      <span>Sertifikasi Kompetensi</span>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-600">
                      {major.certifications.map((cert, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-amber-500 font-bold">•</span>
                          <span>{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Career Opportunities */}
                  <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-5">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-3">
                      <Briefcase className="h-4 w-4 text-emerald-600" />
                      <span>Peluang Karir Lulusan</span>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-600">
                      {major.careers.map((career, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-emerald-500 font-bold">•</span>
                          <span>{career}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* AI Guidance Box */}
      <section className="py-12 bg-white border-t border-slate-200">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="rounded-3xl border-2 border-cyan-200 bg-gradient-to-r from-blue-900 to-slate-950 p-8 sm:p-12 text-white shadow-xl">
            <Bot className="h-12 w-12 text-cyan-300 mx-auto mb-4" />
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-3">
              Masih Bingung Memilih Jurusan yang Tepat?
            </h3>
            <p className="text-slate-300 max-w-xl mx-auto mb-8 text-sm sm:text-base">
              Ceritakan hobi, minat, dan impian karirmu kepada asisten virtual NESAI. Kami akan merekomendasikan jurusan paling cocok untuk masa depanmu!
            </p>
            <button
              type="button"
              onClick={() => openNesaiChat('Saya ingin tes minat dan bakat. Bisakah NESAI merekomendasikan jurusan yang paling cocok dengan hobi dan keahlian saya?')}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg hover:from-cyan-600 hover:to-blue-700 transition-all active:scale-95"
            >
              <Sparkles className="h-4 w-4" />
              <span>Analisis Jurusan dengan NESAI</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Promo Bar */}
      <NesaiPromoBar />
    </div>
  );
}
