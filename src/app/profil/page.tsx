import Link from 'next/link';
import Image from 'next/image';
import { Flag, Sparkles } from 'lucide-react';
import { PageHero } from '@/components/site/PageHero';
import { publicService, unwrapItem, unwrapList } from '@/lib/api/public-endpoints';
import { SAMBUTAN } from '@/lib/site-data';
import type { Content, School } from '@/types/cms';

export const metadata = { title: 'Profil Sekolah — SMKN 1 Subang' };
export const revalidate = 60;

async function getSchool(): Promise<School | null> {
  try {
    const response = await publicService.getSchool();
    return unwrapItem<School>(response);
  } catch {
    return null;
  }
}

async function getAboutContents(): Promise<Content[]> {
  try {
    const response = await publicService.getContents({ module: 'about' });
    return unwrapList<Content>(response).filter((content) => content.is_published);
  } catch {
    return [];
  }
}

export default async function ProfilPage() {
  const [school, aboutContents] = await Promise.all([getSchool(), getAboutContents()]);
  const historyContent = aboutContents.find((content) => /sejarah/i.test(`${content.slug} ${content.title}`));
  const journeyContent = aboutContents.find((content) => /perjalanan|roadmap/i.test(`${content.slug} ${content.title}`));

  const history = historyContent?.body?.trim() ||
    `SMKN 1 Subang berdiri pada ${school?.founded_year ?? 1965} dan memulai perjalanan pendidikan kejuruannya.`;
  const schoolJourney = journeyContent?.body?.trim() ||
    'Kini, SMKN 1 Subang terus mengembangkan pembelajaran vokasi yang memadukan keahlian, karakter, dan kepedulian terhadap lingkungan.';

  return (
    <main className="bg-[#f8faf8] text-[#172b3a]">
      <PageHero
        eyebrow="Profil Sekolah"
        title={`Mengenal ${school?.name ?? 'SMKN 1 Subang'}`}
        description="Sekolah menengah kejuruan negeri di Kabupaten Subang yang menyiapkan lulusan berkarakter, adaptif, kompeten, sinergis, dan inovatif."
        image="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=2200&q=90"
      />
      <section id="sambutan" className="border-b border-[#e3ebe6] bg-[#f3f6f3]">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
          <div className="grid gap-8 rounded-3xl border border-[#e4ebe6] bg-white p-5 shadow-[0_18px_50px_-38px_rgba(23,43,58,0.45)] sm:p-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-center lg:gap-12 lg:p-10">
            <div className="max-w-sm">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#dfe9e5]">
                <Image
                  src={SAMBUTAN.principalImage}
                  alt={school?.principal_name || SAMBUTAN.principalName}
                  fill
                  sizes="(max-width: 1024px) 90vw, 420px"
                  className="object-cover"
                />
              </div>
              <p className="mt-4 font-school-heading text-lg font-semibold">{school?.principal_name || SAMBUTAN.principalName}</p>
              <p className="text-sm text-[#657c7d]">{SAMBUTAN.principalRole}</p>
            </div>
            <div className="self-center py-2 lg:py-6">
              <p className="inline-flex rounded-full bg-[#edf4ef] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#557469]">Sambutan kepala sekolah</p>
              <h2 className="mt-5 font-school-heading text-3xl font-semibold leading-tight sm:text-4xl">Selamat datang di SMKN 1 Subang</h2>
              <div className="mt-6 space-y-4 text-base leading-8 text-[#5d6a6e]">
                <p className="font-semibold text-[#172b3a]">{SAMBUTAN.greeting}</p>
                {SAMBUTAN.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="sejarah" className="overflow-hidden border-y border-[#f1e3e4] bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <header className="mx-auto max-w-3xl text-center">
            <p className="inline-flex rounded-full border border-[#ffd4d8] bg-[#fff0f1] px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#df2538]">Sejarah kami</p>
            <h2 className="mt-5 font-school-heading text-3xl font-bold leading-tight text-[#26384a] sm:text-4xl">Perjalanan Panjang, Terus Berlanjut</h2>
          </header>
          <ol
            id="perjalanan-sekolah"
            className="relative mx-auto mt-12 grid max-w-5xl gap-8 before:absolute before:bottom-8 before:left-5 before:top-5 before:w-px before:bg-[#e7e8eb] before:content-[''] md:grid-cols-2 md:gap-10 md:before:bottom-auto md:before:left-1/4 md:before:right-1/4 md:before:top-[14rem] md:before:h-px md:before:w-auto"
          >
            <li className="relative grid min-h-[12rem] grid-cols-[2.5rem_1fr] gap-x-4 md:block md:min-h-[29rem]">
              <p className="col-start-2 row-start-1 text-left font-school-heading text-xl font-bold text-[#28394a] md:absolute md:inset-x-0 md:top-0 md:text-center">{school?.founded_year ?? 1965}</p>
              <span aria-hidden="true" className="relative z-10 col-start-1 row-span-2 row-start-1 flex h-10 w-10 items-center justify-center self-start rounded-full border-4 border-white bg-[#e21f33] text-white shadow-[0_0_0_3px_#fde5e7] md:absolute md:left-1/2 md:top-[12.75rem] md:-translate-x-1/2">
                <Flag className="h-4 w-4" />
              </span>
              <div className="col-start-2 row-start-2 rounded-xl border border-[#e9eaed] bg-[#f8f9fa] p-5 text-left md:absolute md:left-1/2 md:top-[2.5rem] md:w-80 md:-translate-x-1/2 md:p-6 md:text-center">
                <h3 className="font-school-heading text-lg font-semibold text-[#293b4d]">Awal berdiri</h3>
                <p className="mt-2 whitespace-pre-line text-sm leading-6 text-[#5d6977] line-clamp-4">{history}</p>
              </div>
            </li>
            <li className="relative grid min-h-[12rem] grid-cols-[2.5rem_1fr] gap-x-4 md:block md:min-h-[29rem]">
              <p className="col-start-2 row-start-1 text-left font-school-heading text-xl font-bold text-[#28394a] md:absolute md:inset-x-0 md:top-0 md:text-center">Kini</p>
              <span aria-hidden="true" className="relative z-10 col-start-1 row-span-2 row-start-1 flex h-10 w-10 items-center justify-center self-start rounded-full border-4 border-white bg-[#e21f33] text-white shadow-[0_0_0_3px_#fde5e7] md:absolute md:left-1/2 md:top-[12.75rem] md:-translate-x-1/2">
                <Sparkles className="h-4 w-4" />
              </span>
              <div className="col-start-2 row-start-2 rounded-xl border border-[#e9eaed] bg-[#f8f9fa] p-5 text-left md:absolute md:left-1/2 md:top-[16rem] md:w-80 md:-translate-x-1/2 md:p-6 md:text-center">
                <h3 className="font-school-heading text-lg font-semibold text-[#293b4d]">Terus berkembang</h3>
                <p className="mt-2 whitespace-pre-line text-sm leading-6 text-[#5d6977] line-clamp-4">{schoolJourney}</p>
              </div>
            </li>
          </ol>
        </div>
      </section>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-slate-200 px-5 sm:grid-cols-4 sm:px-8">
          {[
            ['Berkarakter', 'Menguatkan nilai dan integritas.'],
            ['Adaptif', 'Terbuka pada perubahan zaman.'],
            ['Kompeten', 'Menguasai bidang keahliannya.'],
            ['Inovatif', 'Berani mencoba solusi baru.'],
          ].map(([title, desc]) => (
            <div key={title} className="px-3 py-8 first:pl-0 sm:px-6 sm:py-10">
              <p className="font-school-heading text-lg font-semibold text-[#0f1e36]">{title}</p>
              <p className="mt-2 text-xs leading-5 text-slate-500">{desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <Link href="/jurusan" className="inline-flex border-b-2 border-[#e7ae32] pb-1 text-sm font-semibold">
          Lihat program keahlian →
        </Link>
      </section>
    </main>
  );
}
