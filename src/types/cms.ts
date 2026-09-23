// ============================================================
// CMS TypeScript Interfaces — NESAS Admin Panel
// Reflects database schema from migration:
// 2026_09_18_000100_create_nesas_content_tables.php
// ============================================================

// ── Generic API Response Types ──────────────────────────────

export interface ApiResponse<T> {
  data: T;
  meta: Record<string, unknown> | null;
  message: string | null;
}

export interface Pagination<T> {
  current_page: number;
  data: T[];
  last_page: number;
  per_page: number;
  total: number;
}

export interface ApiPaginatedResponse<T> {
  data: Pagination<T>;
  meta: Record<string, unknown> | null;
  message: string | null;
}

export interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

// ── 1. Profil Sekolah ───────────────────────────────────────

export interface SchoolSocialLinks {
  facebook?: string;
  instagram?: string;
  youtube?: string;
  tiktok?: string;
  website?: string;
}

export interface School {
  id: number;
  name: string;
  npsn?: string | null;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  accreditation?: string | null;
  founded_year?: number | null;
  area_size?: string | null;
  principal_name?: string | null;
  staff_count?: number | null;
  student_count?: number | null;
  classroom_count?: number | null;
  classroom_count_min?: number | null;
  classroom_count_max?: number | null;
  stats_updated_at?: string | null;
  description?: string | null;
  vision?: string | null;
  mission?: string | null;
  social_links?: SchoolSocialLinks | null;
  created_at?: string;
  updated_at?: string;
}

// ── 2. Program Keahlian / Jurusan ───────────────────────────

export interface MajorSubject {
  id?: number;
  major_id: number;
  name: string;
  description?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Career {
  id?: number;
  major_id: number;
  name: string;
  description?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Major {
  id: number;
  name: string;
  slug: string;
  logo?: string | null;
  logo_url?: string | null;
  summary?: string | null;
  description?: string | null;
  subjects?: MajorSubject[];
  careers?: Career[];
  created_at?: string;
  updated_at?: string;
}

// ── 3. Sarana & Prasarana ───────────────────────────────────

export interface Facility {
  id: number;
  name: string;
  category: string | null;
  description: string | null;
  is_placeholder: boolean;
  created_at: string;
  updated_at: string;
}

export const FACILITY_CATEGORIES = [
  "Laboratorium & Bengkel",
  "Fasilitas Olahraga",
  "Fasilitas Umum",
  "Sarana Ibadah",
] as const;

// ── 4. Ekstrakurikuler ─────────────────────────────────────

export interface Extracurricular {
  id: number;
  name: string;
  category?: string | null;
  created_at?: string;
  updated_at?: string;
}

export const EXTRACURRICULAR_CATEGORIES = [
  "Kepemimpinan",
  "Olahraga",
  "Seni & Budaya",
  "Teknologi & Ilmiah",
  "Keagamaan",
] as const;

// ── 5. Karya Inovasi Siswa ─────────────────────────────────

export interface Innovation {
  id: number;
  major_id?: number | null;
  major?: Major | null;
  name: string;
  description?: string | null;
  has_haki: boolean;
  created_at?: string;
  updated_at?: string;
}

// ── 6. Statistik Pendaftar SPMB/PPDB ───────────────────────

export interface AdmissionStat {
  id: number;
  major_id: number;
  major?: Major | null;
  year: number;
  applicant_count: number;
  created_at?: string;
  updated_at?: string;
}

// ── 7. Tracer Study Alumni ─────────────────────────────────

export interface AlumniTrackingStat {
  id: number;
  year: number;
  employed_percent?: number | null;
  entrepreneur_percent?: number | null;
  college_percent?: number | null;
  other_percent?: number | null;
  created_at?: string;
  updated_at?: string;
}

// ── 8. Testimoni & Kisah Alumni ────────────────────────────

export interface Alumni {
  id: number;
  major_id?: number | null;
  major?: Major | null;
  name: string;
  headline?: string | null;
  story?: string | null;
  created_at?: string;
  updated_at?: string;
}

// ── 9. Berita & Pengumuman ─────────────────────────────────

export interface News {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  body?: string | null;
  thumbnail?: string | null;
  published_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

// ── 10. Informasi PPDB ─────────────────────────────────────

export interface PpdbScheduleItem {
  stage: string;
  date: string;
  desc?: string;
}

export interface Ppdb {
  id: number;
  title: string;
  description?: string | null;
  requirements?: string[] | null;
  schedule?: PpdbScheduleItem[] | null;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

// ── 11. FAQ ────────────────────────────────────────────────

export interface Faq {
  id: number;
  question: string;
  answer: string;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

// ── 12. Konten Dinamis ─────────────────────────────────────

export interface Content {
  id: number;
  title: string;
  slug: string;
  type: string;
  module?: string | null;
  body?: string | null;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
}

export const CONTENT_TYPES = [
  "banner",
  "announcement",
  "section",
  "page",
] as const;

// ── Auth Types ─────────────────────────────────────────────

export interface AuthUser {
  id: number;
  name: string;
  email: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: AuthUser;
  };
}

// ── Dashboard Metrics ──────────────────────────────────────

export interface DashboardMetrics {
  total_students?: number;
  total_staff?: number;
  total_classrooms?: number;
  total_majors?: number;
  total_news?: number;
  total_facilities?: number;
  total_extracurriculars?: number;
  total_innovations?: number;
  total_alumni?: number;
  total_faqs?: number;
  is_ppdb_active?: boolean;
  total_published_news?: number;
  total_applicants_current_year?: number;
  alumni_employment_rate?: number;
}

