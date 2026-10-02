import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Check, Flag, Sparkles, Target } from 'lucide-react';
import { PageHero } from '@/components/site/PageHero';
import { publicService, unwrapItem, unwrapList } from '@/lib/api/public-endpoints';
import { SAMBUTAN } from '@/lib/site-data';
import type { Content, School } from '@/types/cms';

export const metadata = { title: 'Profil Sekolah — SMKN 1 Subang' };
export const revalidate = 60;

const FALLBACK_VISION = 'Menjadikan Lulusan yang Berkarakter Agamis, Berjiwa Wirausaha, Mampu Beradaptasi dengan Perkembangan Zaman, Kompeten di Bidangnya, Peduli Terhadap Lingkungan dan menerapkan BLUD pada Tahun 2029.';
const FALLBACK_MISSION = [
  'Menyiapkan lulusan yang berkarakter agamis.',
  'Menyiapkan lulusan yang berjiwa wirausaha.',
  'Menyiapkan lulusan yang mampu beradaptasi dengan perkembangan zaman.',
  'Menyiapkan lulusan yang kompeten di bidangnya.',
  'Menyiapkan lulusan yang peduli terhadap lingkungan.',
  'Menyiapkan lulusan yang kompeten sesuai dengan implementasi BLUD.',
];

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
  const vision = school?.vision?.trim() || FALLBACK_VISION;
  const missionText = Array.isArray(school?.mission) ? school.mission.join('\n') : school?.mission ?? '';
  const missionItems = missionText
    .split(/\r?\n/)
    .map((mission) => mission.replace(/^\s*\d+[.)]\s*/, '').trim())
    .filter(Boolean);
  const missions = missionItems.length > 0 ? missionItems : FALLBACK_MISSION;

  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <PageHero
        eyebrow="Profil Sekolah"
        title={`Mengenal ${school?.name ?? 'SMKN 1 Subang'}`}
        description="Sekolah menengah kejuruan negeri di Kabupaten Subang yang menyiapkan lulusan berkarakter, adaptif, kompeten, sinergis, dan inovatif."
        image="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=2200&q=90"
      />
      <section id="sambutan" className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
          <div className="grid gap-8 border-y border-slate-200 py-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-center lg:gap-12 lg:py-10">
            <div className="max-w-sm">
              <div className="relative aspect-[4/5] overflow-hidden bg-[var(--surface-muted)]">
                <Image
                  src={SAMBUTAN.principalImage}
                  alt={school?.principal_name || SAMBUTAN.principalName}
                  fill
                  sizes="(max-width: 1024px) 90vw, 420px"
                  className="object-cover"
                />
              </div>
              <p className="mt-4 font-school-heading text-lg font-semibold text-[var(--brand)]">{school?.principal_name || SAMBUTAN.principalName}</p>
              <p className="text-sm text-slate-500">{SAMBUTAN.principalRole}</p>
            </div>
            <div className="self-center py-2 lg:py-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent-text)]">Sambutan Kepala Sekolah</p>
              <h2 className="mt-4 font-school-heading text-3xl font-bold leading-tight text-[var(--brand)] sm:text-4xl">Selamat datang di SMKN 1 Subang</h2>
              <div className="mt-6 space-y-4 text-base leading-8 text-slate-600">
                <p className="font-semibold text-[var(--brand)]">{SAMBUTAN.greeting}</p>
                {SAMBUTAN.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="visi-misi" className="border-b border-slate-200 bg-[var(--surface-muted)] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <header className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent-text)]">Arah Sekolah</p>
            <h2 className="font-school-heading mt-4 text-3xl font-bold leading-tight text-[var(--brand)] sm:text-4xl">Visi &amp; Misi</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">Landasan SMKN 1 Subang dalam membentuk lulusan yang siap berkarya dan memberi dampak.</p>
          </header>

          <div className="mt-10 grid gap-6 lg:grid-cols-12">
            <article className="border border-[var(--brand)] bg-[var(--brand)] p-6 text-white sm:p-8 lg:col-span-5">
              <div className="flex h-12 w-12 items-center justify-center bg-[var(--accent)] text-[var(--brand)]">
                <Target className="h-6 w-6" />
              </div>
              <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent)]">Visi</p>
              <h3 className="font-school-heading mt-3 text-2xl font-bold">Tujuan besar kami</h3>
              <p className="mt-5 text-base leading-8 text-white/85">{vision}</p>
            </article>

            <article className="border border-slate-200 bg-white p-6 sm:p-8 lg:col-span-7">
              <div className="flex items-center gap-3 border-b-2 border-[var(--accent)] pb-4">
                <h3 className="font-school-heading text-2xl font-bold text-[var(--brand)]">Misi</h3>
                <span className="h-1.5 w-1.5 bg-[var(--accent)]" />
              </div>
              <ol className="mt-2">
                {missions.map((mission, index) => (
                  <li key={`${index}-${mission}`} className="flex gap-4 border-b border-slate-200 py-4 last:border-b-0">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-[var(--surface-muted)] text-[var(--brand)]">
                      <Check className="h-4 w-4" />
                    </span>
                    <p className="pt-1 text-sm leading-6 text-slate-600">{mission}</p>
                  </li>
                ))}
              </ol>
            </article>
          </div>
        </div>
      </section>
      <section id="sejarah" className="overflow-hidden border-y border-slate-200 bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <header className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--accent-text)]">Sejarah Kami</p>
            <h2 className="font-school-heading mt-4 text-3xl font-bold leading-tight text-[var(--brand)] sm:text-4xl">Perjalanan Panjang, Terus Berlanjut</h2>
          </header>
          <ol
            id="perjalanan-sekolah"
            className="relative mx-auto mt-12 grid max-w-5xl gap-8 before:absolute before:bottom-8 before:left-5 before:top-5 before:w-px before:bg-slate-200 before:content-[''] md:grid-cols-2 md:gap-10 md:before:bottom-auto md:before:left-1/4 md:before:right-1/4 md:before:top-[14rem] md:before:h-px md:before:w-auto"
          >
            <li className="relative grid min-h-[12rem] grid-cols-[2.5rem_1fr] gap-x-4 md:block md:min-h-[29rem]">
              <p className="col-start-2 row-start-1 text-left font-school-heading text-xl font-bold text-[var(--brand)] md:absolute md:inset-x-0 md:top-0 md:text-center">{school?.founded_year ?? 1965}</p>
              <span aria-hidden="true" className="relative z-10 col-start-1 row-span-2 row-start-1 flex h-10 w-10 items-center justify-center self-start rounded-full border-4 border-white bg-[var(--brand)] text-[var(--accent)] ring-4 ring-[var(--surface-muted)] md:absolute md:left-1/2 md:top-[12.75rem] md:-translate-x-1/2">
                <Flag className="h-4 w-4" />
              </span>
              <div className="col-start-2 row-start-2 border border-slate-200 bg-[var(--surface-muted)] p-5 text-left md:absolute md:left-1/2 md:top-[2.5rem] md:w-80 md:p-6 md:text-center">
                <h3 className="font-school-heading text-lg font-semibold text-[var(--brand)]">Awal berdiri</h3>
                <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-600 line-clamp-4">{history}</p>
              </div>
            </li>
            <li className="relative grid min-h-[12rem] grid-cols-[2.5rem_1fr] gap-x-4 md:block md:min-h-[29rem]">
              <p className="col-start-2 row-start-1 text-left font-school-heading text-xl font-bold text-[var(--brand)] md:absolute md:inset-x-0 md:top-0 md:text-center">Kini</p>
              <span aria-hidden="true" className="relative z-10 col-start-1 row-span-2 row-start-1 flex h-10 w-10 items-center justify-center self-start rounded-full border-4 border-white bg-[var(--brand)] text-[var(--accent)] ring-4 ring-[var(--surface-muted)] md:absolute md:left-1/2 md:top-[12.75rem] md:-translate-x-1/2">
                <Sparkles className="h-4 w-4" />
              </span>
              <div className="col-start-2 row-start-2 border border-slate-200 bg-[var(--surface-muted)] p-5 text-left md:absolute md:left-1/2 md:top-[16rem] md:w-80 md:p-6 md:text-center">
                <h3 className="font-school-heading text-lg font-semibold text-[var(--brand)]">Terus berkembang</h3>
                <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-600 line-clamp-4">{schoolJourney}</p>
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
              <p className="font-school-heading text-lg font-semibold text-[var(--brand)]">{title}</p>
              <p className="mt-2 text-xs leading-5 text-slate-500">{desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <Link href="/jurusan" className="home-link inline-flex items-center gap-2 border-b-2 border-[var(--accent)] pb-1 text-sm font-bold text-[var(--brand)]">
            Lihat program keahlian <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
