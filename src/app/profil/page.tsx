import Link from 'next/link';
import { PageHero } from '@/components/site/PageHero';
import { publicService, unwrapItem } from '@/lib/api/public-endpoints';
import type { School } from '@/types/cms';

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

const fallbackMission = [
  'Menyiapkan lulusan yang berkarakter agamis.',
  'Menyiapkan lulusan yang berjiwa wirausaha.',
  'Menyiapkan lulusan yang mampu beradaptasi dengan perkembangan zaman.',
  'Menyiapkan lulusan yang kompeten di bidangnya.',
  'Menyiapkan lulusan yang peduli terhadap lingkungan.',
  'Menyiapkan lulusan yang mendukung implementasi BLUD.',
];

export default async function ProfilPage() {
  const school = await getSchool();

  const identity: Array<[string, string]> = [
    ['NPSN', school?.npsn ?? '20233680'],
    ['Akreditasi', school?.accreditation ?? 'A'],
    ['Kepala sekolah', school?.principal_name ?? 'Walyati Retnoningsih, S.Si., M.AP'],
    ['Didirikan', school?.founded_year ? String(school.founded_year) : '1965'],
  ];

  const description =
    school?.description ??
    'SMKN 1 Subang berdiri sejak 1965 dan terus berkembang mengikuti perubahan dunia pendidikan serta kebutuhan dunia kerja. Pembelajaran vokasi dipadukan dengan pembentukan karakter dan kepedulian terhadap lingkungan.';

  const vision =
    school?.vision ??
    'Menjadikan lulusan yang berkarakter agamis, berjiwa wirausaha, mampu beradaptasi dengan perkembangan zaman, kompeten di bidangnya, peduli terhadap lingkungan, dan menerapkan BLUD.';

  const missions = school?.mission
    ? school.mission
        .split(/\r?\n/)
        .map((m) => m.trim())
        .filter(Boolean)
    : fallbackMission;

  return (
    <main className="bg-[#f8faf8] text-[#172b3a]">
      <PageHero
        eyebrow="Profil Sekolah"
        title={`Mengenal ${school?.name ?? 'SMKN 1 Subang'}`}
        description="Sekolah menengah kejuruan negeri di Kabupaten Subang yang menyiapkan lulusan berkarakter, adaptif, kompeten, sinergis, dan inovatif."
        image="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=2200&q=90"
      />
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.75fr_1.25fr] lg:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#657c7d]">Identitas sekolah</p>
        <div>
          <h2 className="font-school-heading text-4xl font-semibold leading-tight sm:text-5xl">
            Tempat belajar untuk tumbuh menjadi tenaga profesional.
          </h2>
          <p className="mt-7 max-w-2xl text-base leading-8 text-[#5d6a6e]">{description}</p>
          <div className="mt-10 grid gap-5 border-t border-[#b9c7c2] pt-6 sm:grid-cols-2">
            {identity.map(([label, value]) => (
              <div key={label}>
                <p className="text-xs uppercase tracking-widest text-[#748985]">{label}</p>
                <p className="mt-1 font-school-heading text-xl">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[#dfe9e5]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#657c7d]">Visi</p>
            <p className="mt-5 font-school-heading text-3xl leading-tight">{vision}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#657c7d]">Misi</p>
            <ol className="mt-5 space-y-4 border-t border-[#aec0ba] pt-4 text-base leading-7 text-[#516064]">
              {missions.map((item, index) => (
                <li key={index} className="flex gap-4 border-b border-[#c5d3ce] pb-3">
                  <span className="text-xs text-[#7a908e]">{String(index + 1).padStart(2, '0')}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
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
