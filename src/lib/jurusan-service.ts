/**
 * Jurusan Service — Hybrid (Option C) data layer
 *
 * Fetches major/jurusan data from the CMS API with automatic field-level
 * fallback to static data when API is unavailable or response is incomplete.
 *
 * Data flow:
 * 1. Basic fields (name, slug, summary, subjects, careers) → existing API fields
 * 2. Extended scalar fields (code, tagline, vision, mission, etc.) → new API fields (pending backend)
 * 3. Complex nested data (competencies, curricula, teachers, partners) → metadata JSON column
 * 4. Any field missing from API is filled from static fallback (`jurusan-data.ts`)
 *
 * Once the backend is fully updated and seeded, the fallback will be used less
 * and less until it can eventually be removed entirely.
 */

import type { Major, Career } from '@/types/cms';
import type { Jurusan } from './jurusan-data';
import { JURUSAN } from './jurusan-data';

// Re-export types so pages only need one import
export type { Jurusan };

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:8000/api/v1';
const REVALIDATE_SECONDS = 3600; // 1 hour ISR

// ── Extended API type (inherits all Major fields from cms.ts) ──

interface MajorFromApi extends Major {
  // Relations returned by GET /majors/{slug}
  innovations?: unknown[];
  alumni?: unknown[];
  admission_stats?: unknown[];
}

// ── Raw API fetchers (server-side with Next.js ISR caching) ──

async function apiFetchMajors(): Promise<MajorFromApi[]> {
  const res = await fetch(`${API_BASE}/majors`, {
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!res.ok) throw new Error(`API ${res.status}: ${res.statusText}`);

  const json = await res.json();

  // Handle paginated { data: { data: [...] } }
  if (
    json.data &&
    typeof json.data === 'object' &&
    !Array.isArray(json.data) &&
    Array.isArray(json.data.data)
  ) {
    return json.data.data as MajorFromApi[];
  }

  // Handle direct { data: [...] }
  if (Array.isArray(json.data)) {
    return json.data as MajorFromApi[];
  }

  return [];
}

async function apiFetchMajorBySlug(
  slug: string,
): Promise<MajorFromApi | null> {
  const res = await fetch(
    `${API_BASE}/majors/${encodeURIComponent(slug)}`,
    { next: { revalidate: REVALIDATE_SECONDS } },
  );

  if (!res.ok) throw new Error(`API ${res.status}: ${res.statusText}`);

  const json = await res.json();

  // Handle { data: { ... } }
  if (json.data && typeof json.data === 'object' && !Array.isArray(json.data)) {
    return json.data as MajorFromApi;
  }

  return null;
}

// ── Mapping helpers: API Major → Jurusan view model ──────────

/**
 * Maps a single API Major to the Jurusan view model.
 * For each field, API data takes priority; missing values are
 * filled from the static fallback dataset (field-level merge).
 */
function mapMajorToJurusan(api: MajorFromApi, fallback?: Jurusan): Jurusan {
  const fb = fallback;
  const meta = api.metadata;

  // — Kompetensi
  const kompetensi =
    meta?.competencies && meta.competencies.length > 0
      ? meta.competencies.map((c) => ({
          judul: c.title,
          deskripsi: c.description,
        }))
      : (fb?.kompetensi ?? []);

  // — Peluang Karir (requires salary_range on careers)
  const apiCareersWithSalary = (api.careers ?? []).filter(
    (c): c is Career & { salary_range: string } => !!c.salary_range,
  );
  const peluangKarir =
    apiCareersWithSalary.length > 0
      ? apiCareersWithSalary.map((c) => ({
          posisi: c.name,
          deskripsi: c.description ?? '',
          gajiRange: c.salary_range,
        }))
      : (fb?.peluangKarir ?? []);

  // — Mata Pelajaran
  const mataPelajaran =
    meta?.curricula && meta.curricula.length > 0
      ? meta.curricula.map((c) => ({
          semester: c.semester,
          pelajaran: c.subjects,
        }))
      : (fb?.mataPelajaran ?? []);

  // — Guru
  const guru =
    meta?.teachers && meta.teachers.length > 0
      ? meta.teachers.map((t) => ({
          nama: t.name,
          jabatan: t.position,
          bidang: t.field,
          pendidikan: t.education,
        }))
      : (fb?.guru ?? []);

  // — Perusahaan Mitra
  const perusahaan =
    meta?.partners && meta.partners.length > 0
      ? meta.partners.map((p) => ({
          nama: p.company_name,
          bidang: p.industry,
          deskripsi: p.description,
        }))
      : (fb?.perusahaan ?? []);

  return {
    code: api.code || fb?.code || '',
    slug: api.slug,
    name: api.name,
    description: api.summary || fb?.description || '',
    focus: api.description || fb?.focus || '',
    tagline: api.tagline || fb?.tagline || '',
    icon: api.logo || fb?.icon || '📚',

    subjects: api.subjects?.map((s) => s.name) ?? fb?.subjects ?? [],
    careers: api.careers?.map((c) => c.name) ?? fb?.careers ?? [],

    kompetensi,

    profil: {
      visi: api.vision || fb?.profil?.visi || '',
      misi:
        api.mission && api.mission.length > 0
          ? api.mission
          : (fb?.profil?.misi ?? []),
      akreditasi: api.accreditation || fb?.profil?.akreditasi || '',
      tahunBerdiri:
        api.founded_year?.toString() || fb?.profil?.tahunBerdiri || '',
      jumlahSiswa:
        api.student_count?.toString() || fb?.profil?.jumlahSiswa || '',
      jumlahKelas:
        api.class_count?.toString() || fb?.profil?.jumlahKelas || '',
    },

    peluangKarir,
    mataPelajaran,
    guru,
    perusahaan,
  };
}

// ── Public API ─────────────────────────────────────────────

/**
 * Fetch all jurusan for the listing page.
 * Falls back to static data if API is unavailable.
 */
export async function getJurusanList(): Promise<Jurusan[]> {
  try {
    const majors = await apiFetchMajors();
    if (majors.length > 0) {
      return majors.map((m) => {
        const fallback = JURUSAN.find((j) => j.slug === m.slug);
        return mapMajorToJurusan(m, fallback);
      });
    }
  } catch (error) {
    console.warn(
      '[jurusan-service] API unavailable, using static data:',
      error instanceof Error ? error.message : error,
    );
  }
  return JURUSAN;
}

/**
 * Fetch a single jurusan by slug for the detail page.
 * Falls back to static data if API is unavailable.
 */
export async function getJurusanBySlug(
  slug: string,
): Promise<Jurusan | undefined> {
  try {
    const major = await apiFetchMajorBySlug(slug);
    if (major) {
      const fallback = JURUSAN.find((j) => j.slug === slug);
      return mapMajorToJurusan(major, fallback);
    }
  } catch (error) {
    console.warn(
      `[jurusan-service] API unavailable for "${slug}", using static data:`,
      error instanceof Error ? error.message : error,
    );
  }
  return JURUSAN.find((j) => j.slug === slug);
}

/**
 * Get all available slugs for `generateStaticParams`.
 * Merges API slugs with static slugs to ensure all pages are generated.
 */
export async function getAllJurusanSlugs(): Promise<string[]> {
  const staticSlugs = JURUSAN.map((j) => j.slug);

  try {
    const majors = await apiFetchMajors();
    if (majors.length > 0) {
      const apiSlugs = majors.map((m) => m.slug);
      // Union of API + static slugs (deduped)
      const merged = new Set([...apiSlugs, ...staticSlugs]);
      return Array.from(merged);
    }
  } catch {
    // Fallback to static slugs
  }

  return staticSlugs;
}
