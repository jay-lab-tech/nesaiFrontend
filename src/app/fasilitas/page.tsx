import { PageHero } from '@/components/site/PageHero';
import { publicService, unwrapList } from '@/lib/api/public-endpoints';
import type { Facility } from '@/types/cms';

export const revalidate = 60;

async function getFacilities(): Promise<Facility[]> {
  try {
    const response = await publicService.getFacilities();
    return unwrapList<Facility>(response);
  } catch {
    return [];
  }
}

export default async function FasilitasPage() {
  const facilities = await getFacilities();
  const labCount = facilities.filter((f) => f.category === 'Laboratorium & Bengkel').length;

  return (
    <main className="bg-[#f8faf8] text-[#172b3a]">
      <PageHero
        eyebrow="Fasilitas"
        title="Ruang belajar untuk mencoba dan mencipta."
        description="Fasilitas sekolah mendukung pembelajaran praktik di setiap program keahlian."
        image="https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=2200&q=90"
      />
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div
            className="min-h-[300px] bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85')",
            }}
          />
          <div className="border border-slate-200 p-7">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-700">Lingkungan belajar</p>
            <h2 className="mt-4 font-school-heading text-3xl font-bold leading-tight text-[#0f1e36]">
              Fasilitas yang mendukung proses praktik.
            </h2>
            <p className="mt-5 text-sm leading-7 text-slate-600">
              Pembelajaran vokasi membutuhkan ruang yang memungkinkan siswa mencoba, membuat, dan memperbaiki.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-4 border-t border-slate-200 pt-5">
              <span className="text-sm">
                <b className="block font-school-heading text-2xl text-[#0f1e36]">{labCount || facilities.length}</b>
                kelompok lab
              </span>
              <span className="text-sm">
                <b className="block font-school-heading text-2xl text-[#0f1e36]">50–52</b>
                ruang kelas
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.7fr_1.3fr] lg:py-28">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#657c7d]">Data fasilitas</p>
          <h2 className="mt-5 font-school-heading text-4xl leading-tight sm:text-5xl">
            Sarana yang mengikuti kebutuhan program.
          </h2>
          <p className="mt-6 text-base leading-7 text-[#5d6a6e]">
            Daftar fasilitas sekolah yang dikelola melalui sistem informasi sekolah.
          </p>
        </div>
        <div className="border-t border-[#b9c7c2]">
          {facilities.length === 0 ? (
            <div className="border-b border-[#d9e2de] py-10 text-sm leading-7 text-slate-500">
              Belum ada data fasilitas yang dipublikasikan.
            </div>
          ) : (
            facilities.map((facility, index) => (
              <div
                key={facility.id}
                className="group grid grid-cols-[3rem_1fr] gap-4 border-b border-[#d9e2de] px-2 py-5 transition hover:bg-white"
              >
                <span className="text-xs text-[#7a908e]">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="font-school-heading text-xl transition group-hover:translate-x-1">{facility.name}</h3>
                  {facility.category ? (
                    <p className="mt-1 text-xs uppercase tracking-widest text-amber-700">{facility.category}</p>
                  ) : null}
                  {facility.description ? (
                    <p className="mt-2 text-sm leading-6 text-[#657c7d]">{facility.description}</p>
                  ) : null}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
