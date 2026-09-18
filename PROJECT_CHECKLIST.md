# NESAS Project Checklist

Daftar ini adalah acuan kerja bersama. Centang hanya setelah pekerjaan benar-benar selesai, diuji, dan perubahan terkait sudah masuk ke branch `develop`.

## 1. Fondasi dan Kolaborasi

- [x] Repository frontend dan backend dibuat di GitHub
- [x] Branch `main` dan `develop` tersedia pada kedua repository
- [x] Branch awal berbasis fitur dibuat
- [x] Aturan dasar Git, commit, dan Pull Request ditetapkan
- [x] Frontend dan backend dipisahkan sebagai aplikasi terpisah
- [x] File `.env.example` dan lockfile tersedia
- [ ] Perlindungan branch `main` dan `develop` diaktifkan di GitHub
- [ ] Template Pull Request dan issue dibuat

## 2. Environment Lokal

- [x] Laravel berjalan secara lokal
- [x] Next.js berjalan secara lokal
- [x] PostgreSQL berjalan secara lokal
- [x] Database `nesas` dibuat
- [x] Migration dan seeder dijalankan
- [x] Frontend dapat memanggil endpoint health backend
- [x] CORS mengizinkan `http://localhost:3000`
- [ ] Semua anggota tim memverifikasi setup lokal masing-masing
- [ ] Versi runtime tim diseragamkan atau perbedaannya disepakati

## 3. Data Resmi Sekolah

- [x] Situs lama `smkn1subang.sch.id` diidentifikasi sebagai sumber data awal
- [ ] Inventaris seluruh halaman dan menu situs lama
- [ ] Verifikasi data dengan pihak sekolah sebelum publikasi
- [ ] Kumpulkan profil sekolah, visi, misi, fasilitas, prestasi, dan kontak
- [ ] Kumpulkan daftar jurusan, mata pelajaran, skill, dan prospek karier
- [ ] Kumpulkan PPDB, berita, alumni, FAQ, dan aset media yang diizinkan
- [ ] Siapkan seed data resmi tanpa data fiktif

## 4. Backend dan Database

- [x] Model dan tabel dasar School, Major, MajorSubject, Career, Alumni, News, PPDB, FAQ, dan Content dibuat
- [x] Struktur service Search, Recommendation, dan NESAI dibuat
- [x] Endpoint `GET /api/v1/health` dibuat dan diverifikasi
- [x] Kontrak endpoint awal didokumentasikan
- [ ] Resource/API response konsisten untuk seluruh modul
- [ ] Endpoint School memakai data resmi
- [ ] Endpoint Majors dan detail major memakai data resmi
- [ ] Endpoint News, PPDB, Alumni, FAQ, dan Content selesai
- [ ] Pagination, filter, slug, dan penanganan data kosong diselesaikan
- [ ] Test API untuk endpoint penting dibuat
- [ ] Validasi Form Request lengkap untuk seluruh request tulis

## 5. Frontend Foundation

- [x] Next.js, TypeScript, Tailwind CSS, dan konfigurasi alias siap
- [x] Konfigurasi shadcn/ui dasar tersedia
- [x] Integrasi health check API tersedia
- [x] Lint dan production build berhasil dijalankan
- [ ] Design tokens warna, tipografi, spacing, radius, shadow, dan motion diputuskan
- [ ] Layout global, navbar, footer, dan navigasi mobile dibuat
- [ ] Komponen shared dan state loading/error/empty dibuat
- [ ] Pola aksesibilitas dasar diterapkan
- [ ] Responsif mobile, tablet, dan desktop diverifikasi

## 6. Halaman Informasi dan Discovery

- [ ] Homepage
- [ ] Explore dan Quick Access
- [ ] Daftar jurusan `/jurusan`
- [ ] Detail jurusan `/jurusan/[slug]`
- [ ] Search `/search`
- [ ] Find Your Path `/explore/find-your-path`
- [ ] PPDB `/ppdb`
- [ ] Berita dan detail berita
- [ ] Alumni
- [ ] Tentang sekolah, fasilitas, prestasi, dan kontak

## 7. Search dan Find Your Path

- [ ] PostgreSQL full-text search atau pencarian MVP yang terukur diimplementasikan
- [ ] UI hasil pencarian, loading, error, dan empty state dibuat
- [ ] Matrix minat dan aturan scoring resmi disetujui sekolah
- [ ] RecommendationService menghasilkan rekomendasi deterministik
- [ ] UI hasil Find Your Path menjelaskan alasan rekomendasi dan tautan jurusan

## 8. NESAI

- [x] Endpoint dan service stub NESAI tersedia
- [x] Validasi request chat dan respons development stub tersedia
- [ ] Intent classification diimplementasikan
- [ ] Retrieval memakai data PostgreSQL terverifikasi
- [ ] Provider dan model LLM dipilih
- [ ] LLM key disimpan hanya di environment backend
- [ ] Guardrails, sumber jawaban, dan aksi menuju halaman nyata dibuat
- [ ] UI NESAI dan conversational navigation dibuat
- [ ] Test respons aman dan kasus error dibuat

## 9. Quality, Security, dan Dokumentasi

- [x] `.env`, `.env.local`, `vendor`, dan `node_modules` diabaikan Git
- [x] README/setup dasar dan API contract tersedia
- [ ] Review aksesibilitas keyboard, focus state, contrast, label, dan alt text
- [ ] Review keamanan input, error response, CORS production, dan secret
- [ ] Test end-to-end golden journey calon siswa
- [ ] Dokumentasi developer diperbarui sesuai implementasi akhir
- [ ] Screenshot/video demo disiapkan

## 10. Deployment dan Rilis

- [ ] Dockerfile frontend dan backend dibuat
- [ ] Docker Compose production dibuat
- [ ] Konfigurasi Nginx dan domain VPS dibuat
- [ ] Environment production dan secret disiapkan
- [ ] PostgreSQL backup dan recovery plan diuji
- [ ] Staging/deployment VPS diuji
- [ ] Final QA dan release MVP ke `main`
