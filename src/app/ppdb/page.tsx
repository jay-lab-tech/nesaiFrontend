import Link from 'next/link';
import { PageHero } from '@/components/site/PageHero';
import { publicService, unwrapItem } from '@/lib/api/public-endpoints';
import type { Ppdb } from '@/types/cms';

export const revalidate = 60;

async function getPpdb(): Promise<Ppdb | null> {
  try {
    const response = await publicService.getPpdb();
    return unwrapItem<Ppdb>(response);
  } catch {
    return null;
  }
}

export default async function PpdbPage() {
  const ppdb = await getPpdb();
  const schedule = ppdb?.schedule ?? [];
  const requirements = ppdb?.requirements ?? [];

  return (
    <main className="bg-[#f8faf8] text-[#172b3a]">
      <PageHero
        eyebrow="PPDB"
        title={ppdb?.title ?? 'Mulai perjalananmu di SMKN 1 Subang.'}
        description={
          ppdb?.description ??
          'Informasi penerimaan peserta didik baru akan diperbarui mengikuti pengumuman resmi sekolah dan pemerintah daerah.'
        }
        image="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=2200&q=90"
      />
      <section className="bg-[#0f1e36] py-10 text-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 px-5 sm:flex-row sm:items-center sm:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-400">Informasi calon siswa</p>
            <p className="mt-2 text-sm text-slate-300">
              Butuh bantuan memilih jurusan atau memahami alur pendaftaran?
            </p>
          </div>
          <Link
            href="/kontak"
            className="inline-flex w-fit bg-amber-400 px-5 py-3 text-sm font-bold text-[#0f1e36] hover:bg-amber-300"
          >
            HUBUNGI SEKOLAH →
          </Link>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.75fr_1.25fr] lg:py-28">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#657c7d]">Alur pendaftaran</p>
          <h2 className="mt-5 font-school-heading text-4xl leading-tight sm:text-5xl">Siapkan langkahnya dari sekarang.</h2>
          <p className="mt-5 text-sm leading-7 text-slate-600">
            Ikuti informasi resmi agar setiap proses pendaftaran berjalan sesuai ketentuan.
          </p>
        </div>
        <div className="border-t border-[#b9c7c2]">
          {schedule.length === 0 ? (
            <div className="border-b border-[#d9e2de] py-10 text-sm leading-7 text-slate-500">
              Alur dan jadwal pendaftaran belum dipublikasikan. Silakan pantau halaman ini secara berkala.
            </div>
          ) : (
            schedule.map((step, index) => (
              <div
                key={`${step.stage}-${index}`}
                className="group grid grid-cols-[3rem_1fr] gap-4 border-b border-[#d9e2de] px-2 py-6 transition hover:bg-white"
              >
                <span className="text-xs text-[#7a908e]">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="font-school-heading text-2xl transition group-hover:translate-x-1">{step.stage}</h3>
                  {step.date ? (
                    <p className="mt-1 text-xs uppercase tracking-widest text-amber-700">{step.date}</p>
                  ) : null}
                  {step.desc ? <p className="mt-2 text-sm leading-6 text-[#5d6a6e]">{step.desc}</p> : null}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
      <section className="bg-[#dfe9e5]">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-16 sm:grid-cols-2 sm:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#657c7d]">Persyaratan</p>
            {requirements.length === 0 ? (
              <p className="mt-3 text-sm leading-7 text-[#516064]">
                Persyaratan pendaftaran akan diumumkan mengikuti ketentuan PPDB resmi yang berlaku.
              </p>
            ) : (
              <ul className="mt-3 space-y-2 text-sm leading-7 text-[#516064]">
                {requirements.map((item, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="text-amber-700">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="border-l-2 border-amber-400 pl-5 text-sm leading-7 text-[#516064]">
            Gunakan halaman ini sebagai pusat informasi; tautan pendaftaran akan dipasang saat kanal resmi dibuka.
          </div>
        </div>
      </section>
    </main>
  );
}
