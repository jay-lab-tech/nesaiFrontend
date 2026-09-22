# Dokumentasi API NESAI (SMK Negeri 1 Subang)
> **Versi API:** `v1`  
> **Format Standar:** JSON (`application/json`)  
> **Terakhir Diperbarui:** 22 September 2026  
> **Arsitektur Controller:** Terbagi atas namespace `Admin`, `Public`, `Auth`, dan `Utility/AI`.

Dokumentasi ini disusun khusus untuk pengembang Front-End (Web Publik Sekolah, Admin Dashboard CMS, dan Aplikasi AI Chatbot) agar dapat mengintegrasikan seluruh endpoint dengan tepat, aman, dan konsisten.

---

## 1. Ikhtisar & Standar Respons

### Base URL
- **Lokal Dev:** `http://127.0.0.1:8000/api/v1`
- **Root Chat Endpoint:** `http://127.0.0.1:8000/api/chat` (alias: `/api/v1/nesai/chat`)

### HTTP Headers Standar
Setiap permintaan ke API disarankan menyertakan header berikut:
```http
Accept: application/json
Content-Type: application/json
```
Untuk endpoint yang berada di dalam grup **Admin CMS (Protected)**, wajib menyertakan Bearer Token:
```http
Authorization: Bearer <TOKEN_SANCTUM_ANDA>
```

---

### Struktur Envelope Respons Standar

Semua response dari backend menggunakan format envelope seragam dari `ApiResponse` trait:

#### A. Respons Berhasil (Single Data) — HTTP 200 / 201
```json
{
  "success": true,
  "message": "Pesan deskriptif keberhasilan.",
  "data": {
    "id": 1,
    "...": "..."
  }
}
```

#### B. Respons Berhasil (Paginated List) — HTTP 200
```json
{
  "success": true,
  "message": "Daftar data berhasil diambil.",
  "data": [
    { "id": 1, "...": "..." },
    { "id": 2, "...": "..." }
  ],
  "meta": {
    "current_page": 1,
    "last_page": 5,
    "per_page": 15,
    "total": 68
  }
}
```

#### C. Respons Gagal / Validasi Gagal — HTTP 422 Unprocessable Entity
```json
{
  "message": "Data yang diberikan tidak valid.",
  "errors": {
    "title": [
      "Field judul berita wajib diisi."
    ],
    "email": [
      "Format email tidak valid."
    ]
  }
}
```

#### D. Respons Error Umum (401 / 404 / 500)
```json
{
  "success": false,
  "message": "Email atau kata sandi tidak valid."
}
```

---

## 2. Authentication & Admin Profile (`Api\Auth\AuthController`)

Grup endpoint otentikasi menggunakan Laravel Sanctum untuk manajemen token admin CMS.

| Method | Endpoint | Auth Required | Deskripsi |
| :--- | :--- | :---: | :--- |
| `POST` | `/auth/login` | Publik | Autentikasi email & kata sandi, menerbitkan Personal Access Token. |
| `GET` | `/admin/auth/me` | Bearer Token | Mengambil data akun admin yang sedang login. |
| `POST` | `/admin/auth/logout` | Bearer Token | Mencabut/menghapus token akses yang sedang aktif. |

### `POST /auth/login`
- **Request Body:**
  ```json
  {
    "email": "admin@smkn1subang.sch.id",
    "password": "password_rahasia"
  }
  ```
- **Response Berhasil (HTTP 200):**
  ```json
  {
    "success": true,
    "message": "Login berhasil.",
    "data": {
      "token": "1|qwert12345abcdef...",
      "user": {
        "id": 1,
        "name": "Administrator CMS",
        "email": "admin@smkn1subang.sch.id"
      }
    }
  }
  ```

### `GET /admin/auth/me`
- **Headers:** `Authorization: Bearer <token>`
- **Response Berhasil (HTTP 200):**
  ```json
  {
    "success": true,
    "message": "Profil pengguna berhasil diambil.",
    "data": {
      "id": 1,
      "name": "Administrator CMS",
      "email": "admin@smkn1subang.sch.id"
    }
  }
  ```

### `POST /admin/auth/logout`
- **Headers:** `Authorization: Bearer <token>`
- **Response Berhasil (HTTP 200):**
  ```json
  {
    "success": true,
    "message": "Logout berhasil.",
    "data": null
  }
  ```

---

## 3. Public Endpoints (`Api\Public\*`)
Endpoint ini bersifat **Read-Only (GET)** dan tidak membutuhkan header otentikasi. Digunakan oleh website utama sekolah dan antarmuka pengguna umum.

| Resource | Method | Endpoint | Query Parameters | Deskripsi |
| :--- | :--- | :--- | :--- | :--- |
| **Profil Sekolah** | `GET` | `/school` | - | Mengambil data lengkap profil sekolah. |
| **Jurusan** | `GET` | `/majors` | `search` | Mengambil seluruh daftar jurusan beserta mata pelajaran & prospek karir. |
| **Detail Jurusan** | `GET` | `/majors/{slug}` | - | Mengambil detail 1 jurusan beserta relasi mata pelajaran, karir, inovasi, alumni, dan statistik penerimaan. |
| **Sarana Prasarana** | `GET` | `/facilities` | `category` | Mengambil seluruh sarana/prasarana sekolah (filter by kategori). |
| **Ekstrakurikuler** | `GET` | `/extracurriculars` | `category` | Mengambil seluruh daftar ekstrakurikuler. |
| **Karya Inovasi** | `GET` | `/innovations` | - | Mengambil daftar karya inovasi siswa/guru beserta jurusan terkait. |
| **Statistik Siswa** | `GET` | `/admission-stats` | - | Mengambil data statistik penerimaan siswa per tahun. |
| **Pelacakan Alumni** | `GET` | `/alumni-tracking-stats` | - | Mengambil statistik kelulusan alumni (bekerja, wirausaha, kuliah). |
| **Direktori Alumni** | `GET` | `/alumni` | - | Mengambil daftar alumni sukses beserta headline dan cerita singkat. |
| **Berita Sekolah** | `GET` | `/news` | `page`, `per_page`, `search` | Mengambil daftar berita yang sudah terbit (`published_at <= now`), terurut dari yang terbaru (Paginated). |
| **Detail Berita** | `GET` | `/news/{slug}` | - | Mengambil isi detail berita berdasarkan slug. |
| **Informasi PPDB** | `GET` | `/ppdb` | - | Mengambil informasi pengaturan PPDB yang sedang aktif (`is_active = true`). |
| **Tanya Jawab (FAQ)** | `GET` | `/faqs` | - | Mengambil daftar FAQ yang diurutkan berdasarkan `sort_order`. |
| **Konten Halaman** | `GET` | `/contents` | `type`, `module` | Mengambil daftar konten statis yang berstatus `is_published = true`. |
| **Detail Konten** | `GET` | `/contents/{slug}` | - | Mengambil isi detail konten statis berdasarkan slug. |

---

## 4. Admin CMS Endpoints (`Api\Admin\*`)
Seluruh endpoint di bawah ini berada di bawah prefix `/admin` dan **WAJIB** menyertakan header `Authorization: Bearer <TOKEN>`.

### 4.1. Dashboard Metrics (`Api\Admin\DashboardController`)
- **`GET /admin/dashboard/metrics`**
- **Response:**
  ```json
  {
    "success": true,
    "message": "Metrik dashboard berhasil diambil.",
    "data": {
      "total_students": 1500,
      "total_staff": 80,
      "total_classrooms": 36,
      "total_majors": 8,
      "total_news": 24,
      "total_facilities": 15,
      "total_extracurriculars": 18,
      "total_innovations": 10,
      "total_alumni": 120,
      "total_faqs": 12,
      "is_ppdb_active": true
    }
  }
  ```

---

### 4.2. Profil Sekolah (`Api\Admin\SchoolController`)
- **`GET /admin/school`**: Mengambil data profil sekolah untuk diedit di CMS.
- **`PUT /admin/school`**: Memperbarui informasi sekolah (single-instance).
  - **Body Payload (JSON):**
    ```json
    {
      "name": "SMK Negeri 1 Subang",
      "npsn": "20233680",
      "address": "Jl. Arif Rahman Hakim No. 35, Dangdeur, Kec. Subang",
      "phone": "(0260) 411410",
      "email": "info@smkn1subang.sch.id",
      "accreditation": "A",
      "founded_year": 1968,
      "area_size": "2.5 Ha",
      "principal_name": "Deden Saiman, S.Pd., M.Eng.",
      "staff_count": 80,
      "student_count": 1500,
      "classroom_count": 36,
      "description": "SMK Pusat Keunggulan di Kabupaten Subang...",
      "vision": "Menjadi SMK Unggul dan Berkarakter...",
      "mission": "1. Meningkatkan mutu pembelajaran...",
      "social_links": {
        "instagram": "https://instagram.com/smkn1subang",
        "youtube": "https://youtube.com/@smkn1subangofficial"
      }
    }
    ```

---

### 4.3. Jurusan / Kompetensi Keahlian (`Api\Admin\MajorController`)
Manajemen kompetensi keahlian beserta mata pelajaran dan prospek karir.

- **`GET /admin/majors`**: List jurusan paginated (`?page=1&per_page=15&search=tkj`).
- **`GET /admin/majors/{id}`**: Detail jurusan berdasarkan ID database.
- **`POST /admin/majors`**: Tambah jurusan baru.
  - **Body Payload:**
    ```json
    {
      "name": "Rekayasa Perangkat Lunak",
      "slug": "rekayasa-perangkat-lunak",
      "summary": "Mempelajari pengembangan software, web, dan mobile application.",
      "description": "Program keahlian RPL membekali siswa dengan logika pemrograman, UI/UX, dan database.",
      "subjects": [
        { "name": "Pemrograman Web & Perangkat Bergerak", "description": "HTML, CSS, JS, Laravel, React Native" },
        { "name": "Basis Data", "description": "MySQL & PostgreSQL" }
      ],
      "careers": [
        { "name": "Frontend Web Developer", "description": "Membangun tampilan aplikasi web interaktif" },
        { "name": "Mobile Application Developer", "description": "Membuat aplikasi iOS dan Android" }
      ]
    }
    ```
- **`PUT /admin/majors/{id}`**: Update data jurusan (format body sama dengan POST).
- **`DELETE /admin/majors/{id}`**: Hapus jurusan.

---

### 4.4. Berita & Pengumuman (`Api\Admin\NewsController`)
Manajemen berita dan pengumuman kegiatan sekolah.

- **`GET /admin/news`**: List seluruh berita (`?search=...&page=...&per_page=...`).
- **`GET /admin/news/{id}`**: Detail berita by ID.
- **`POST /admin/news`**: Buat berita baru.
  - *Catatan:* Mendukung format JSON biasa (jika thumbnail berupa link string) maupun `multipart/form-data` jika mengunggah file gambar (maks 2MB).
  - **Fields:**
    - `title` *(string, required)*
    - `slug` *(string, nullable - akan di-generate otomatis jika kosong)*
    - `excerpt` *(string, nullable)*: Ringkasan singkat berita
    - `body` *(string, nullable)*: Konten teks lengkap / HTML berita
    - `thumbnail` *(file image / string URL, nullable)*
    - `published_at` *(string datetime format `YYYY-MM-DD HH:mm:ss`, nullable)*
- **`PUT /admin/news/{id}`**: Update berita.
- **`DELETE /admin/news/{id}`**: Hapus berita.

---

### 4.5. Sarana & Prasarana (`Api\Admin\FacilityController`)
- **`GET /admin/facilities`**: List sarana prasarana (`?category=...&search=...`).
- **`POST /admin/facilities`**: Tambah sarana.
  ```json
  {
    "name": "Laboratorium Jaringan Komputer Cisco",
    "category": "Laboratorium"
  }
  ```
- **`GET /admin/facilities/{id}`**: Detail sarana by ID.
- **`PUT /admin/facilities/{id}`**: Update sarana by ID.
- **`DELETE /admin/facilities/{id}`**: Hapus sarana by ID.

---

### 4.6. Kegiatan Ekstrakurikuler (`Api\Admin\ExtracurricularController`)
- **`GET /admin/extracurriculars`**: List ekstrakurikuler (`?category=...&search=...`).
- **`POST /admin/extracurriculars`**: Tambah ekstrakurikuler.
  ```json
  {
    "name": "PMR (Palang Merah Remaja)",
    "category": "Kemanusiaan"
  }
  ```
- **`GET /admin/extracurriculars/{id}`**: Detail ekskul by ID.
- **`PUT /admin/extracurriculars/{id}`**: Update ekskul by ID.
- **`DELETE /admin/extracurriculars/{id}`**: Hapus ekskul by ID.

---

### 4.7. Karya Inovasi Siswa & Guru (`Api\Admin\InnovationController`)
- **`GET /admin/innovations`**: List karya inovasi (`?major_id=...&search=...`).
- **`POST /admin/innovations`**: Tambah karya inovasi.
  ```json
  {
    "major_id": 1,
    "name": "Sistem Smart Green House Berbasis IoT",
    "description": "Pengaturan suhu dan kelembaban otomatis via ESP32 dan dashboard web.",
    "has_haki": true
  }
  ```
- **`GET /admin/innovations/{id}`**: Detail karya inovasi by ID.
- **`PUT /admin/innovations/{id}`**: Update inovasi by ID.
- **`DELETE /admin/innovations/{id}`**: Hapus inovasi by ID.

---

### 4.8. Statistik Penerimaan Siswa (`Api\Admin\AdmissionStatController`)
- **`GET /admin/admission-stats`**: List statistik (`?major_id=...&year=2025`).
- **`POST /admin/admission-stats`**: Tambah catatan statistik.
  ```json
  {
    "major_id": 1,
    "year": 2026,
    "applicant_count": 320
  }
  ```
- **`GET /admin/admission-stats/{id}`**: Detail by ID.
- **`PUT /admin/admission-stats/{id}`**: Update by ID.
- **`DELETE /admin/admission-stats/{id}`**: Hapus by ID.

---

### 4.9. Penelusuran Tamatan Alumni (`Api\Admin\AlumniTrackingController`)
- **`GET /admin/alumni-tracking-stats`**: List persentase per tahun (`?year=...`).
- **`POST /admin/alumni-tracking-stats`**: Tambah data tahunan.
  ```json
  {
    "year": 2025,
    "employed_percent": 72.5,
    "entrepreneur_percent": 12.0,
    "college_percent": 10.5,
    "other_percent": 5.0
  }
  ```
- **`GET /admin/alumni-tracking-stats/{id}`**: Detail by ID.
- **`PUT /admin/alumni-tracking-stats/{id}`**: Update by ID.
- **`DELETE /admin/alumni-tracking-stats/{id}`**: Hapus by ID.

---

### 4.10. Profil Alumni (`Api\Admin\AlumniController`)
- **`GET /admin/alumni`**: List alumni (`?major_id=...&search=...`).
- **`POST /admin/alumni`**: Tambah data alumni.
  ```json
  {
    "name": "Alif Subagja, S.Kom.",
    "major_id": 1,
    "headline": "Software Engineer di Unicorn Tech",
    "story": "Lulusan SMKN 1 Subang tahun 2020 yang kini berkarir sebagai Backend Engineer..."
  }
  ```
- **`GET /admin/alumni/{id}`**: Detail by ID.
- **`PUT /admin/alumni/{id}`**: Update by ID.
- **`DELETE /admin/alumni/{id}`**: Hapus by ID.

---

### 4.11. Tanya Jawab / FAQ (`Api\Admin\FaqController`)
- **`GET /admin/faqs`**: List FAQ (`?search=...`).
- **`POST /admin/faqs`**: Tambah pertanyaan & jawaban FAQ.
  ```json
  {
    "question": "Apakah SMKN 1 Subang memiliki asrama?",
    "answer": "Saat ini belum tersedia asrama resmi, namun banyak kos di sekitar kampus.",
    "sort_order": 2
  }
  ```
- **`GET /admin/faqs/{id}`**: Detail FAQ by ID.
- **`PUT /admin/faqs/{id}`**: Update FAQ by ID.
- **`DELETE /admin/faqs/{id}`**: Hapus FAQ by ID.

---

### 4.12. Konten Halaman Dinamis (`Api\Admin\ContentController`)
- **`GET /admin/contents`**: List konten (`?type=...&module=...&search=...`).
- **`POST /admin/contents`**: Tambah halaman konten statis.
  ```json
  {
    "title": "Sejarah Lengkap SMKN 1 Subang",
    "slug": "sejarah-lengkap",
    "type": "page",
    "module": "profile",
    "body": "Pada masa awal berdirinya sekolah ini bernama STM Negeri Subang...",
    "is_published": true
  }
  ```
- **`GET /admin/contents/{id}`**: Detail konten by ID.
- **`PUT /admin/contents/{id}`**: Update konten by ID.
- **`DELETE /admin/contents/{id}`**: Hapus konten by ID.

---

### 4.13. Pengaturan PPDB (`Api\Admin\PpdbController`)
- **`GET /admin/ppdb`**: Mengambil konfigurasi PPDB aktif saat ini.
- **`PUT /admin/ppdb`**: Memperbarui informasi & jadwal pendaftaran PPDB.
  - **Body Payload (JSON):**
    ```json
    {
      "title": "Penerimaan Peserta Didik Baru (PPDB) 2026/2027",
      "description": "Informasi resmi alur dan persyaratan seleksi masuk SMKN 1 Subang.",
      "requirements": [
        "Ijazah SMP/MTs atau Surat Keterangan Lulus",
        "Kartu Keluarga (KK) dan Akta Kelahiran",
        "Nilai Rapor semester 1 sampai 5",
        "Surat Keterangan Berkelakuan Baik"
      ],
      "schedule": [
        {
          "stage": "Tahap 1 (Afirmasi, KETM, & Prestasi)",
          "date": "03 - 07 Juni 2026",
          "desc": "Pendaftaran online melalui portal resmi Disdik Jabar"
        },
        {
          "stage": "Tahap 2 (Jalur Rapor Umum)",
          "date": "24 - 28 Juni 2026",
          "desc": "Seleksi berdasarkan peringkat akumulasi nilai rapor"
        }
      ],
      "is_active": true
    }
    ```

---

## 5. AI Service & Utility Endpoints

### 5.1. Chatbot NESAI (`Api\NesaiController`)
Endpoint percakapan AI interaktif dengan pengetahuan lengkap SMKN 1 Subang (profil, jurusan, ekstrakurikuler, PPDB, beasiswa, dan tata tertib).

- **URL:** `POST /api/chat` *(atau `/api/v1/nesai/chat`)*
- **Body Request:**
  ```json
  {
    "message": "Halo, apa saja jurusan unggulan di SMKN 1 Subang?",
    "history": [
      { "role": "user", "content": "Hai" },
      { "role": "assistant", "content": "Halo! Saya NESAI, asisten AI SMKN 1 Subang. Ada yang bisa saya bantu?" }
    ]
  }
  ```
- **Response Berhasil (HTTP 200):**
  ```json
  {
    "reply": "SMKN 1 Subang memiliki beragam jurusan unggulan di bidang teknologi dan bisnis...",
    "source": "database_and_llm"
  }
  ```

---

### 5.2. Rekomendasi Jurusan (`Api\RecommendationController`)
Memberikan rekomendasi jurusan terbaik berdasarkan ketertarikan siswa.

- **URL:** `POST /api/v1/recommendations/majors`
- **Body Request:**
  ```json
  {
    "interests": ["coding", "komputer", "desain aplikasi web"]
  }
  ```
- **Response Berhasil (HTTP 200):**
  ```json
  {
    "data": [
      {
        "id": 1,
        "name": "Rekayasa Perangkat Lunak",
        "slug": "rekayasa-perangkat-lunak",
        "summary": "Belajar coding dan software...",
        "score": 3,
        "matched_interests": ["coding", "komputer", "desain aplikasi web"]
      }
    ]
  }
  ```

---

### 5.3. Global Search (`Api\SearchController`)
- **URL:** `GET /api/v1/search?q=robotik`
- **Response:** Menampilkan hasil gabungan berita, jurusan, dan sarana prasarana yang relevan dengan kata kunci pencarian.

---

### 5.4. Health Check (`Api\HealthController`)
- **URL:** `GET /api/v1/health`
- **Response:**
  ```json
  {
    "status": "ok",
    "timestamp": "2026-09-22T04:00:00.000000Z"
  }
  ```

---

## 6. Panduan Integrasi Front-End

### Konfigurasi Axios / Fetch Interceptor (Rekomendasi)
Untuk kemudahan integrasi di Next.js / Vue / React:
```typescript
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// Interceptor untuk menyisipkan Bearer Token otomatis pada permintaan Admin
apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('cms_access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Interceptor untuk menangani Token Expired (401)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Hapus token lokal & redirect ke halaman login
      if (typeof window !== 'undefined') {
        localStorage.removeItem('cms_access_token');
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);
```
