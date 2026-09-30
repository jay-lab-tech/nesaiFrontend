import { PageHero } from '@/components/site/PageHero';
import { ContactForm } from '@/components/site/ContactForm';
import { publicService, unwrapItem } from '@/lib/api/public-endpoints';
import type { School } from '@/types/cms';

export const metadata = { title: 'Kontak — SMKN 1 Subang' };
export const revalidate = 60;

async function getSchool(): Promise<School | null> {
  try {
    const response = await publicService.getSchool();
    return unwrapItem<School>(response);
  } catch {
    return null;
  }
}

export default async function KontakPage() {
  const school = await getSchool();

  const address =
    school?.address ??
    'Jl. Arief Rahman Hakim No. 35, Kelurahan Cigadung, Kecamatan Subang, Kabupaten Subang, Jawa Barat 41213.';
  const phone = school?.phone ?? '(0260) 411410';
  const email = school?.email ?? 'info@smkn1subang.sch.id';
  const website = school?.social_links?.website ?? 'https://www.smkn1subang.sch.id';
  const websiteLabel = website.replace(/^https?:\/\//, '').replace(/\/$/, '');

  const socials = school?.social_links
    ? Object.entries(school.social_links).filter(([key, value]) => key !== 'website' && value)
    : [];

  const mapQuery = encodeURIComponent(school?.name ?? 'SMKN 1 Subang');

  return (
    <main className="bg-[#f8faf8] text-[#172b3a]">
      <PageHero
        eyebrow="Kontak"
        title="Mari terhubung dengan sekolah."
        description="Sampaikan pertanyaan tentang profil, program keahlian, PPDB, dan layanan sekolah melalui kanal resmi berikut."
        image="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2200&q=90"
      />
      <section className="bg-white py-14">
        <div className="mx-auto grid max-w-7xl gap-0 px-5 sm:px-8 lg:grid-cols-[1fr_0.8fr]">
          <div
            className="min-h-[300px] bg-slate-100 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=1200&q=85')",
            }}
          />
          <div className="border border-slate-200 p-7">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">Lokasi sekolah</p>
            <h2 className="font-school-heading mt-4 text-3xl font-bold text-[#0f1e36]">
              Datang dan kenali lingkungan belajar kami.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">{address}</p>
            <a
              href={`https://maps.google.com/?q=${mapQuery}`}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex border-b-2 border-amber-400 pb-1 text-sm font-bold"
            >
              BUKA PETA →
            </a>
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:py-28">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#657c7d]">Informasi resmi</p>
          <h2 className="mt-5 font-school-heading text-4xl leading-tight sm:text-5xl">{school?.name ?? 'SMKN 1 Subang'}</h2>
          <div className="mt-8 space-y-5 border-t border-[#b9c7c2] pt-6 text-sm leading-6 text-[#5d6a6e]">
            <p>
              <b className="text-[#0f1e36]">Telepon</b>
              <br />
              {phone}
            </p>
            <p>
              <b className="text-[#0f1e36]">Email</b>
              <br />
              {email}
            </p>
            <a
              href={website}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-[#315e68] underline"
            >
              {websiteLabel}
            </a>
            {socials.length > 0 ? (
              <div className="flex flex-wrap gap-4 pt-2">
                {socials.map(([key, value]) => (
                  <a
                    key={key}
                    href={value as string}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold capitalize text-[#315e68] underline"
                  >
                    {key}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>
        <ContactForm />
      </section>
    </main>
  );
}
