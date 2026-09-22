import { z } from "zod";

// ── Helper ──────────────────────────────────────────────────

const optionalString = z.string().optional().nullable().or(z.literal(""));
const optionalUrl = z.string().url("Format URL tidak valid").optional().nullable().or(z.literal(""));
const positiveIntOrNull = z.coerce.number().int().min(0, "Tidak boleh negatif").optional().nullable();

// ── 1. Profil Sekolah ───────────────────────────────────────

export const schoolFormSchema = z.object({
  name: z.string().min(3, "Nama sekolah wajib diisi (min 3 karakter)"),
  npsn: z.string().length(8, "NPSN harus 8 digit").optional().nullable().or(z.literal("")),
  address: optionalString,
  phone: optionalString,
  email: z.string().email("Format email tidak valid").optional().nullable().or(z.literal("")),
  accreditation: optionalString,
  founded_year: z.coerce
    .number()
    .int()
    .min(1900, "Tahun minimal 1900")
    .max(new Date().getFullYear(), "Tahun tidak boleh melebihi tahun sekarang")
    .optional()
    .nullable(),
  area_size: optionalString,
  principal_name: optionalString,
  staff_count: positiveIntOrNull,
  student_count: positiveIntOrNull,
  classroom_count: positiveIntOrNull,
  description: optionalString,
  vision: optionalString,
  mission: optionalString,
  social_links: z
    .object({
      facebook: optionalUrl,
      instagram: optionalUrl,
      youtube: optionalUrl,
      tiktok: optionalUrl,
      website: optionalUrl,
    })
    .optional()
    .nullable(),
});

export type SchoolFormValues = z.infer<typeof schoolFormSchema>;

// ── 2. Program Keahlian / Jurusan ───────────────────────────

export const majorFormSchema = z.object({
  name: z.string().min(2, "Nama jurusan wajib diisi"),
  slug: z
    .string()
    .min(2, "Slug wajib diisi")
    .regex(/^[a-z0-9-]+$/, "Slug hanya boleh huruf kecil, angka, dan strip"),
  summary: optionalString,
  description: optionalString,
});

export type MajorFormValues = z.infer<typeof majorFormSchema>;

export const majorSubjectFormSchema = z.object({
  name: z.string().min(2, "Nama mata pelajaran wajib diisi"),
  description: optionalString,
});

export type MajorSubjectFormValues = z.infer<typeof majorSubjectFormSchema>;

export const careerFormSchema = z.object({
  name: z.string().min(2, "Nama karir wajib diisi"),
  description: optionalString,
});

export type CareerFormValues = z.infer<typeof careerFormSchema>;

// ── 3. Sarana & Prasarana ───────────────────────────────────

export const facilityFormSchema = z.object({
  name: z.string().min(2, "Nama fasilitas wajib diisi"),
  category: optionalString,
});

export type FacilityFormValues = z.infer<typeof facilityFormSchema>;

// ── 4. Ekstrakurikuler ─────────────────────────────────────

export const extracurricularFormSchema = z.object({
  name: z.string().min(2, "Nama ekstrakurikuler wajib diisi"),
  category: optionalString,
});

export type ExtracurricularFormValues = z.infer<typeof extracurricularFormSchema>;

// ── 5. Karya Inovasi Siswa ─────────────────────────────────

export const innovationFormSchema = z.object({
  name: z.string().min(2, "Nama inovasi wajib diisi"),
  major_id: z.coerce.number().int().positive().optional().nullable(),
  description: optionalString,
  has_haki: z.boolean().default(false),
});

export type InnovationFormValues = z.infer<typeof innovationFormSchema>;

// ── 6. Statistik Pendaftar SPMB/PPDB ───────────────────────

export const admissionStatFormSchema = z.object({
  major_id: z.coerce.number().int().positive("Pilih jurusan"),
  year: z.coerce
    .number()
    .int()
    .min(2000, "Tahun minimal 2000")
    .max(2100, "Tahun maksimal 2100"),
  applicant_count: z.coerce.number().int().min(0, "Jumlah tidak boleh negatif"),
});

export type AdmissionStatFormValues = z.infer<typeof admissionStatFormSchema>;

// ── 7. Tracer Study Alumni ─────────────────────────────────

const percentField = z.coerce
  .number()
  .min(0, "Minimal 0%")
  .max(100, "Maksimal 100%")
  .optional()
  .nullable();

export const alumniTrackingFormSchema = z.object({
  year: z.coerce
    .number()
    .int()
    .min(2000, "Tahun minimal 2000")
    .max(2100, "Tahun maksimal 2100"),
  employed_percent: percentField,
  entrepreneur_percent: percentField,
  college_percent: percentField,
  other_percent: percentField,
});

export type AlumniTrackingFormValues = z.infer<typeof alumniTrackingFormSchema>;

// ── 8. Testimoni & Kisah Alumni ────────────────────────────

export const alumniFormSchema = z.object({
  name: z.string().min(2, "Nama alumni wajib diisi"),
  major_id: z.coerce.number().int().positive().optional().nullable(),
  headline: optionalString,
  story: optionalString,
});

export type AlumniFormValues = z.infer<typeof alumniFormSchema>;

// ── 9. Berita & Pengumuman ─────────────────────────────────

export const newsFormSchema = z.object({
  title: z.string().min(3, "Judul artikel wajib diisi"),
  slug: z
    .string()
    .min(2, "Slug wajib diisi")
    .regex(/^[a-z0-9-]+$/, "Slug hanya boleh huruf kecil, angka, dan strip"),
  excerpt: optionalString,
  body: optionalString,
  published_at: optionalString,
});

export type NewsFormValues = z.infer<typeof newsFormSchema>;

// ── 10. Informasi PPDB ─────────────────────────────────────

const ppdbScheduleItemSchema = z.object({
  stage: z.string().min(1, "Tahap wajib diisi"),
  date: z.string().min(1, "Tanggal wajib diisi"),
  desc: z.string().optional().or(z.literal("")),
});

export const ppdbFormSchema = z.object({
  title: z.string().min(3, "Judul PPDB wajib diisi"),
  description: optionalString,
  requirements: z.array(z.string()).optional().nullable(),
  schedule: z.array(ppdbScheduleItemSchema).optional().nullable(),
  is_active: z.boolean().default(false),
});

export type PpdbFormValues = z.infer<typeof ppdbFormSchema>;

// ── 11. FAQ ────────────────────────────────────────────────

export const faqFormSchema = z.object({
  question: z.string().min(5, "Pertanyaan wajib diisi"),
  answer: z.string().min(5, "Jawaban wajib diisi"),
  sort_order: z.coerce.number().int().min(0).default(0),
});

export type FaqFormValues = z.infer<typeof faqFormSchema>;

// ── 12. Konten Dinamis ─────────────────────────────────────

export const contentFormSchema = z.object({
  title: z.string().min(2, "Judul konten wajib diisi"),
  slug: z
    .string()
    .min(2, "Slug wajib diisi")
    .regex(/^[a-z0-9-]+$/, "Slug hanya boleh huruf kecil, angka, dan strip"),
  type: z.string().min(1, "Tipe konten wajib dipilih"),
  module: optionalString,
  body: optionalString,
  is_published: z.boolean().default(false),
});

export type ContentFormValues = z.infer<typeof contentFormSchema>;

// ── Auth ───────────────────────────────────────────────────

export const loginFormSchema = z.object({
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;
