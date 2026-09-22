# 📋 NESAS CMS Admin Panel — Frontend Implementation & AI Agent Guide

Dokumen ini adalah spesifikasi teknis lengkap dan instruksi khusus untuk **AI Coding Agent** maupun **Frontend Engineer** di repositori frontend (Next.js / React) guna membangun **Panel Admin CMS (Content Management System)** SMK Negeri 1 Subang (NESAS).

> **PANDUAN PROMPT UNTUK AI AGENT DI FRONTEND:**  
> Salin teks pada kotak di bawah ini atau referensikan dokumen ini langsung ke sesi kerja AI Agent frontend Anda:
> 
> ```text
> Anda bertindak sebagai Senior Frontend Engineer & UI/UX Specialist.
> Tugas Anda adalah membangun Modul Panel Admin CMS (Content Management System) lengkap untuk portal SMK Negeri 1 Subang.
> Silakan baca dan patuhi seluruh spesifikasi field, tipe data, model Eloquent, skema validasi Zod, dan antarmuka UI/UX yang tercantum dalam dokumen "CMS_FRONTEND_GUIDE.md".
> Buat tipe TypeScript yang presisi, komponen form yang interaktif, data table lengkap dengan search/filter/pagination, serta skema validasi yang sejalan dengan database backend Laravel.
> ```

---

## 1. Arsitektur & Gambaran Sistem

Sistem CMS mengelola seluruh aset informasi profil sekolah, akademik/jurusan, kesiswaan, PPDB, alumni, berita, hingga konfigurasi konten dinamis.

```
┌─────────────────────────────────────────────────────────────┐
│                 Frontend CMS Admin Panel                    │
│      (Next.js App Router, TypeScript, Tailwind, Zod)        │
│                                                             │
│  [Sidebar Nav]                                              │
│   ├── Dashboard (Statistik & Metrik Cepat)                  │
│   ├── Profil Lembaga (Sekolah, Sarpras, Ekstrakurikuler)    │
│   ├── Akademik & Inovasi (Jurusan, Mapel, Karir, HAKI)      │
│   ├── Kesiswaan & Alumni (Tracer Study, SPMB, Testimoni)    │
│   └── Publikasi & Info (Berita, PPDB, FAQ, Dynamic Content) │
└──────────────────────────────┬──────────────────────────────┘
                               │ REST API JSON
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 Backend Laravel 12 API                      │
│     - Endpoint REST: /api/v1/...                            │
│     - Database MySQL / PostgreSQL                           │
│     - Eloquent Models ($guarded = [])                       │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Pemetaan Lengkap Database ke Komponen Form CMS

Berdasarkan migration `2026_09_18_000100_create_nesas_content_tables.php` dan model di `app/Models/`, berikut rincian field dan komponen UI yang wajib dibangun:

### 2.1 Profil Sekolah (`schools`)
- **Model**: `App\Models\School` (`casts: ['social_links' => 'array']`)
- **UI Form**: *Single Settings View* (`/admin/school`)

| Nama Kolom | Tipe DB | Nullable | Komponen Input | Validasi & Format |
|---|---|---|---|---|
| `name` | `string` | Tidak | Text Input | Wajib diisi (e.g. `SMK Negeri 1 Subang`) |
| `npsn` | `string` | Ya | Text Input (Masked) | 8 digit angka (e.g. `20233680`) |
| `address` | `text` | Ya | Textarea | Alamat fisik sekolah lengkap |
| `phone` | `string` | Ya | Tel/Text Input | Nomor telepon representatif |
| `email` | `string` | Ya | Email Input | Format email resmi sekolah |
| `accreditation` | `string` | Ya | Select Dropdown | Pilihan: `A (Unggul)`, `B`, `C`, atau input manual |
| `founded_year` | `unsignedSmallInteger` | Ya | Number Input | Tahun pendirian (e.g. `1963`), rentang 1900-sekarang |
| `area_size` | `string` | Ya | Text Input | Luas tanah/bangunan (e.g. `31.780 m²` / `3.2 Hektar`) |
| `principal_name` | `string` | Ya | Text Input | Nama lengkap Kepala Sekolah beserta gelar |
| `staff_count` | `unsignedInteger` | Ya | Number Input | Jumlah guru & tenaga pendidik (min 0) |
| `student_count` | `unsignedInteger` | Ya | Number Input | Jumlah siswa aktif (min 0) |
| `classroom_count` | `unsignedInteger` | Ya | Number Input | Jumlah rombel/ruang kelas (min 0) |
| `stats_updated_at` | `timestamp` | Ya | Date/Time Picker | Waktu terakhir pembaruan statistik |
| `description` | `text` | Ya | Textarea / Rich | Deskripsi selayang pandang profil sekolah |
| `vision` | `text` | Ya | Textarea | Teks visi sekolah |
| `mission` | `text` | Ya | Dynamic List / Textarea | Teks misi (disarankan list poin per baris) |
| `social_links` | `json` | Ya | Key-Value Builder | Objek: `{ facebook, instagram, youtube, tiktok, website }` |

---

### 2.2 Program Keahlian / Jurusan (`majors`)
- **Model**: `App\Models\Major` (Relasi: `subjects`, `careers`, `alumni`, `innovations`, `admissionStats`)
- **UI Route**: `/admin/majors` (Data Table + Detail Form / Tabbed Sub-forms)

| Nama Kolom | Tipe DB | Nullable | Komponen Input | Keterangan |
|---|---|---|---|---|
| `name` | `string` | Tidak | Text Input | Nama jurusan (e.g. `Rekayasa Perangkat Lunak`) |
| `slug` | `string` (unique) | Tidak | Slug Input | Auto-generate dari nama: `rekayasa-perangkat-lunak` |
| `summary` | `text` | Ya | Textarea | Ringkasan singkat profil jurusan |
| `description` | `longText` | Ya | Rich / Markdown Editor | Kurikulum lengkap, fasilitas bengkel, dan kompetensi |

#### Sub-Form: Mata Pelajaran Kejuruan (`major_subjects`)
- Model: `App\Models\MajorSubject`
- Field: `major_id` (FK), `name` (string), `description` (text, nullable).
- **Komponen UI**: Repeater list atau sub-tabel inline di halaman detail jurusan.

#### Sub-Form: Peluang Karir Lulusan (`careers`)
- Model: `App\Models\Career`
- Field: `major_id` (FK), `name` (string, e.g. `Web Developer`), `description` (text, nullable).
- **Komponen UI**: Tag list / repeater item di formulir jurusan.

---

### 2.3 Sarana & Prasarana (`facilities`)
- **Model**: `App\Models\Facility`
- **UI Route**: `/admin/facilities` (Data Table + Modal Form Create/Edit)

| Nama Kolom | Tipe DB | Nullable | Komponen Input | Opsi Kategori Rekomendasi |
|---|---|---|---|---|
| `name` | `string` | Tidak | Text Input | e.g. `Laboratorium Komputer`, `Bengkel Otomotif` |
| `category` | `string` | Ya | Combobox / Select | `Laboratorium & Bengkel`, `Fasilitas Olahraga`, `Fasilitas Umum`, `Sarana Ibadah` |

---

### 2.4 Ekstrakurikuler (`extracurriculars`)
- **Model**: `App\Models\Extracurricular`
- **UI Route**: `/admin/extracurriculars` (Data Table + Badge Kategori)

| Nama Kolom | Tipe DB | Nullable | Komponen Input | Opsi Kategori Rekomendasi |
|---|---|---|---|---|
| `name` | `string` | Tidak | Text Input | e.g. `Paskibra`, `Pramuka`, `PMR`, `Cyber Club` |
| `category` | `string` | Ya | Combobox / Select | `Kepemimpinan`, `Olahraga`, `Seni & Budaya`, `Teknologi & Ilmiah`, `Keagamaan` |

---

### 2.5 Karya Inovasi Siswa (`innovations`)
- **Model**: `App\Models\Innovation` (Relasi: `belongsTo Major`)
- **UI Route**: `/admin/innovations` (Data Table + Modal)

| Nama Kolom | Tipe DB | Nullable | Komponen Input | Keterangan |
|---|---|---|---|---|
| `name` | `string` | Tidak | Text Input | Nama produk (e.g. `Motocimic`, `Nesasserator`, `Siborin`) |
| `major_id` | `foreignId` | Ya | Searchable Dropdown | Pilihan jurusan pembuat (relasi ke `majors`, nullable) |
| `description` | `text` | Ya | Textarea | Deskripsi fungsi dan keunggulan inovasi |
| `has_haki` | `boolean` | Tidak (def: `false`) | Switch Toggle | Status Sertifikat Hak Kekayaan Intelektual (HAKI) |

---

### 2.6 Statistik Pendaftar SPMB / PPDB (`admission_stats`)
- **Model**: `App\Models\AdmissionStat` (Relasi: `belongsTo Major`)
- **Constraint**: `unique(['major_id', 'year'])`
- **UI Route**: `/admin/admission-stats` (Matrix Grid / Tabular + Grafik Komparasi)

| Nama Kolom | Tipe DB | Nullable | Komponen Input | Keterangan |
|---|---|---|---|---|
| `major_id` | `foreignId` | Tidak | Select Dropdown | Jurusan yang didaftar |
| `year` | `unsignedSmallInteger` | Tidak | Number / Year Picker | Tahun seleksi (e.g. 2024, 2025, 2026) |
| `applicant_count` | `unsignedInteger` | Tidak | Number Input (min 0) | Jumlah calon siswa yang mendaftar |

---

### 2.7 Penelusuran Alumni / Tracer Study (`alumni_tracking_stats`)
- **Model**: `App\Models\AlumniTrackingStat`
- **Constraint**: `unique(['year'])`
- **UI Route**: `/admin/alumni-tracking` (Tabel Tahunan + Bar/Pie Chart)

| Nama Kolom | Tipe DB | Nullable | Komponen Input | Keterangan |
|---|---|---|---|---|
| `year` | `unsignedSmallInteger` | Tidak | Number / Year Picker | Tahun kelulusan (unik) |
| `employed_percent` | `decimal(5,2)` | Ya | Number Input (0-100%) | Persentase lulusan Bekerja (e.g. `68.50`) |
| `entrepreneur_percent`| `decimal(5,2)` | Ya | Number Input (0-100%) | Persentase Wirausaha (e.g. `12.00`) |
| `college_percent` | `decimal(5,2)` | Ya | Number Input (0-100%) | Persentase Lanjut Kuliah (e.g. `15.00`) |
| `other_percent` | `decimal(5,2)` | Ya | Number Input (0-100%) | Persentase Belum Bekerja/Lainnya |

> **Indikator UX**: Sertakan visual total otomatis `Total: X%`. Jika tidak sama dengan `100.00%`, beri warning visual ringan kepada pengguna.

---

### 2.8 Kisah & Testimoni Alumni (`alumni`)
- **Model**: `App\Models\Alumni` (Table: `alumni`, Relasi: `belongsTo Major`)
- **UI Route**: `/admin/alumni` (Card View / Table View)

| Nama Kolom | Tipe DB | Nullable | Komponen Input | Keterangan |
|---|---|---|---|---|
| `name` | `string` | Tidak | Text Input | Nama lengkap alumni |
| `major_id` | `foreignId` | Ya | Select Dropdown | Jurusan alumni sewaktu bersekolah |
| `headline` | `string` | Ya | Text Input | e.g. `Software Engineer at Unicorn (Lulusan 2021)` |
| `story` | `text` | Ya | Textarea | Testimoni, pengalaman belajar, dan pesan motivasi |

---

### 2.9 Berita & Pengumuman (`news`)
- **Model**: `App\Models\News`
- **UI Route**: `/admin/news` (List Table & Rich Editor Page)

| Nama Kolom | Tipe DB | Nullable | Komponen Input | Keterangan |
|---|---|---|---|---|
| `title` | `string` | Tidak | Text Input | Judul artikel |
| `slug` | `string` (unique) | Tidak | Slug Input | Otomatis dari judul |
| `excerpt` | `text` | Ya | Textarea | Ringkasan 1-2 kalimat untuk meta & kartu berita |
| `body` | `longText` | Ya | Rich / Markdown Editor | Isi lengkap artikel (format markdown/HTML) |
| `published_at` | `timestamp` | Ya | Date-Time Picker | Tanggal terbit publik (kosong = Draft) |

---

### 2.10 Pengaturan Informasi PPDB (`ppdb`)
- **Model**: `App\Models\Ppdb` (Table: `ppdb`, Casts: `requirements` => `array`, `schedule` => `array`)
- **UI Route**: `/admin/ppdb` (Form Pengaturan Periode Pendaftaran)

| Nama Kolom | Tipe DB | Nullable | Komponen Input | Keterangan |
|---|---|---|---|---|
| `title` | `string` | Tidak | Text Input | e.g. `PPDB Tahun Ajaran 2026/2027` |
| `description` | `text` | Ya | Textarea | Pengantar singkat |
| `requirements` | `json` (array) | Ya | Dynamic List Input | Daftar string syarat pendaftaran |
| `schedule` | `json` (array) | Ya | Table Repeater | Array objek: `[{ stage: string, date: string, desc?: string }]` |
| `is_active` | `boolean` | Tidak (def: `false`) | Switch Toggle | Indikator PPDB periode ini sedang dibuka |

---

### 2.11 Tanya Jawab / FAQ (`faqs`)
- **Model**: `App\Models\Faq`
- **UI Route**: `/admin/faqs` (Tabel Urutan / Reorderable List)

| Nama Kolom | Tipe DB | Nullable | Komponen Input | Keterangan |
|---|---|---|---|---|
| `question` | `string` | Tidak | Text Input | Pertanyaan |
| `answer` | `text` | Tidak | Textarea | Jawaban resmi |
| `sort_order` | `unsignedInteger` | Tidak (def: `0`) | Number / Drag Handle | Nomor urut tampilan prioritas |

---

### 2.12 Konten Halaman Dinamis (`contents`)
- **Model**: `App\Models\Content`
- **UI Route**: `/admin/contents`

| Nama Kolom | Tipe DB | Nullable | Komponen Input | Keterangan |
|---|---|---|---|---|
| `title` | `string` | Tidak | Text Input | Judul section / halaman |
| `slug` | `string` (unique) | Tidak | Text Input | Kunci unik (e.g. `sambutan-kepala-sekolah`) |
| `type` | `string` | Tidak | Select / Dropdown | Tipe: `banner`, `announcement`, `section`, `page` |
| `module` | `string` | Ya | Text Input | Modul: `home`, `about`, `contact` |
| `body` | `longText` | Ya | Rich / Markdown Editor | Konten kustom |
| `is_published` | `boolean` | Tidak (def: `false`) | Switch Toggle | Status publikasi |

---

## 3. Tipe Data TypeScript Rekomendasi (`types/cms.ts`)

Salin tipe berikut ke repositori frontend Anda:

```typescript
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
  stats_updated_at?: string | null;
  description?: string | null;
  vision?: string | null;
  mission?: string | null;
  social_links?: SchoolSocialLinks | null;
  created_at?: string;
  updated_at?: string;
}

export interface MajorSubject {
  id?: number;
  major_id: number;
  name: string;
  description?: string | null;
}

export interface Career {
  id?: number;
  major_id: number;
  name: string;
  description?: string | null;
}

export interface Major {
  id: number;
  name: string;
  slug: string;
  summary?: string | null;
  description?: string | null;
  subjects?: MajorSubject[];
  careers?: Career[];
  created_at?: string;
  updated_at?: string;
}

export interface Facility {
  id: number;
  name: string;
  category?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Extracurricular {
  id: number;
  name: string;
  category?: string | null;
  created_at?: string;
  updated_at?: string;
}

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

export interface AdmissionStat {
  id: number;
  major_id: number;
  major?: Major | null;
  year: number;
  applicant_count: number;
  created_at?: string;
  updated_at?: string;
}

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

export interface News {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  body?: string | null;
  published_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

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

export interface Faq {
  id: number;
  question: string;
  answer: string;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

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
```

---

## 4. Pola Validasi Form Frontend (Zod Schema)

Contoh skema validasi Zod (`lib/validations/cms.ts`):

```typescript
import { z } from "zod";

export const schoolFormSchema = z.object({
  name: z.string().min(3, "Nama sekolah wajib diisi"),
  npsn: z.string().length(8, "NPSN harus 8 digit").optional().nullable().or(z.literal("")),
  address: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().email("Format email tidak valid").optional().nullable().or(z.literal("")),
  accreditation: z.string().optional().nullable(),
  founded_year: z.coerce.number().int().min(1900).max(new Date().getFullYear()).optional().nullable(),
  area_size: z.string().optional().nullable(),
  principal_name: z.string().optional().nullable(),
  staff_count: z.coerce.number().int().min(0).optional().nullable(),
  student_count: z.coerce.number().int().min(0).optional().nullable(),
  classroom_count: z.coerce.number().int().min(0).optional().nullable(),
  description: z.string().optional().nullable(),
  vision: z.string().optional().nullable(),
  mission: z.string().optional().nullable(),
  social_links: z.object({
    facebook: z.string().url().optional().or(z.literal("")),
    instagram: z.string().url().optional().or(z.literal("")),
    youtube: z.string().url().optional().or(z.literal("")),
    tiktok: z.string().url().optional().or(z.literal("")),
    website: z.string().url().optional().or(z.literal("")),
  }).optional().nullable(),
});

export const majorFormSchema = z.object({
  name: z.string().min(2, "Nama jurusan wajib diisi"),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/, "Slug hanya boleh memuat huruf kecil, angka, dan strip"),
  summary: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
});

export const innovationFormSchema = z.object({
  name: z.string().min(2, "Nama inovasi wajib diisi"),
  major_id: z.coerce.number().int().positive().optional().nullable(),
  description: z.string().optional().nullable(),
  has_haki: z.boolean().default(false),
});

export const alumniTrackingFormSchema = z.object({
  year: z.coerce.number().int().min(2000).max(2100),
  employed_percent: z.coerce.number().min(0).max(100).optional().nullable(),
  entrepreneur_percent: z.coerce.number().min(0).max(100).optional().nullable(),
  college_percent: z.coerce.number().min(0).max(100).optional().nullable(),
  other_percent: z.coerce.number().min(0).max(100).optional().nullable(),
});
```

---

## 5. Pola Integrasi API & State Management

Gunakan standar response payload Laravel:

```typescript
// Tipe API Response standar Laravel
export interface ApiResponse<T> {
  success?: boolean;
  data: T;
  message?: string;
  meta?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}
```

### Konvensi Endpoint:
- **Profil Sekolah**: `GET /api/v1/school`, `PUT /api/v1/school` (atau `PUT /api/v1/school/1`)
- **Jurusan**: `GET /api/v1/majors`, `GET /api/v1/majors/:slug`, `POST /api/v1/majors`, `PUT /api/v1/majors/:id`, `DELETE /api/v1/majors/:id`
- **Fasilitas**: `GET /api/v1/facilities`, `POST /api/v1/facilities`, `PUT /api/v1/facilities/:id`, `DELETE /api/v1/facilities/:id`
- **Ekstrakurikuler**: `GET /api/v1/extracurriculars`, `POST /api/v1/extracurriculars`, `PUT /api/v1/extracurriculars/:id`, `DELETE /api/v1/extracurriculars/:id`
- **Inovasi**: `GET /api/v1/innovations`, `POST /api/v1/innovations`, `PUT /api/v1/innovations/:id`, `DELETE /api/v1/innovations/:id`
- **Statistik SPMB**: `GET /api/v1/admission-stats`, `POST /api/v1/admission-stats`, `PUT /api/v1/admission-stats/:id`, `DELETE /api/v1/admission-stats/:id`
- **Tracer Study**: `GET /api/v1/alumni-tracking-stats`, `POST /api/v1/alumni-tracking-stats`, `PUT /api/v1/alumni-tracking-stats/:id`, `DELETE /api/v1/alumni-tracking-stats/:id`
- **Alumni**: `GET /api/v1/alumni`, `POST /api/v1/alumni`, `PUT /api/v1/alumni/:id`, `DELETE /api/v1/alumni/:id`
- **Berita**: `GET /api/v1/news`, `POST /api/v1/news`, `PUT /api/v1/news/:id`, `DELETE /api/v1/news/:id`
- **PPDB**: `GET /api/v1/ppdb`, `PUT /api/v1/ppdb` (atau `POST /api/v1/ppdb`)
- **FAQ**: `GET /api/v1/faqs`, `POST /api/v1/faqs`, `PUT /api/v1/faqs/:id`, `DELETE /api/v1/faqs/:id`
- **Konten**: `GET /api/v1/contents`, `POST /api/v1/contents`, `PUT /api/v1/contents/:id`, `DELETE /api/v1/contents/:id`

---

## 6. Fitur UX & Keamanan Penting

1. **Konfirmasi Tindakan Hapus (Destructive Action)**:
   - Sediakan modal konfirmasi sebelum menghapus data penting (jurusan, artikel berita, atau statistik).
2. **Indikator Status & Filter Cepat**:
   - Badge status: Berita (Draft / Terbit), PPDB (Aktif / Nonaktif), HAKI (Terdaftar / Belum).
3. **Peringatan Nilai Sensitif**:
   - Sesuai regulasi data sekolah, **tidak boleh** menampilkan atau menerima data pribadi sensitif siswa (seperti NISN, NIK, nilai individu) di form publik/CMS tanpa enkripsi atau izin otoritas.
4. **Toast Feedback & Loading Skeletons**:
   - Selalu berikan pesan umpan balik (Toast notification) untuk setiap respons API (sukses simpan, validasi gagal, error jaringan).
