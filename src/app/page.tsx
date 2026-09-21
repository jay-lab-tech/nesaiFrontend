import { HeroSection } from '@/components/home/HeroSection';
import { PrincipalSection } from '@/components/home/PrincipalSection';
import { MajorsSection } from '@/components/home/MajorsSection';
import { FacilitiesSection } from '@/components/home/FacilitiesSection';
import { StatsSection } from '@/components/home/StatsSection';
import { NewsSection } from '@/components/home/NewsSection';
import { AchievementsSection } from '@/components/home/AchievementsSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { IndustryPartnersSection } from '@/components/home/IndustryPartnersSection';
import { CtaSection } from '@/components/home/CtaSection';
import { NesaiPromoBar } from '@/components/home/NesaiPromoBar';

export default function HomePage() {
  return (
    <div className="selection:bg-cyan-500 selection:text-white">
      {/* 1. Hero Section with dark tech theme & badges */}
      <HeroSection />

      {/* 2. Sambutan Kepala Sekolah */}
      <PrincipalSection />

      {/* 3. Pilihan Jurusan / Program Keahlian (6 Jurusan) */}
      <MajorsSection />

      {/* 4. Fasilitas Belajar Berstandar Industri (6 Fasilitas) */}
      <FacilitiesSection />

      {/* 5. Statistik Sekolah Counter Banner */}
      <StatsSection />

      {/* 6. Berita & Informasi Sekolah */}
      <NewsSection />

      {/* 7. Prestasi Gemilang Siswa */}
      <AchievementsSection />

      {/* 8. Testimoni Alumni Sukses */}
      <TestimonialsSection />

      {/* 9. Mitra Industri Terkemuka */}
      <IndustryPartnersSection />

      {/* 10. Call to Action (CTA) PPDB Pendaftaran */}
      <CtaSection />

      {/* 11. Interactive NESAI Promo Bar */}
      <NesaiPromoBar />
    </div>
  );
}
