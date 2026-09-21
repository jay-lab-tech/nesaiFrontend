# Walkthrough: Implementasi Fitur Rekomendasi Jurusan Berbasis Minat

Fitur rekomendasi jurusan SMKN 1 Subang telah selesai diimplementasikan secara menyeluruh untuk kebutuhan lomba Web Development JHIC 2.0.

Fitur ini mendukung 2 mode akses yang diselaraskan dengan kebutuhan tim:
1. **Via Percakapan Chatbot NESAI AI (`POST /api/chat`)**: Siswa mengobrol santai mengenai minat/hobi/cita-cita, AI mendeteksi minat, mengeksekusi tool rekomendasi, dan memberikan jawaban terstruktur dengan tombol quick-action navigasi.
2. **Via Form/Kuis Interaktif "Find Your Path" (`POST /api/v1/recommendations/majors`)**: Frontend Next.js mengirimkan array minat siswa dan langsung mendapatkan rekomendasi berbobot skor tanpa latency AI.

---

## 1. Komponen yang Dibuat & Diperbarui

### Shared Scoring Engine
- **[JurusanScorer.php](file:///d:/laragon/www/nesaiBackend/app/Ai/Support/JurusanScorer.php)**:
  - `[CORE-LOGIC: JURUSAN-SCORING-ALGORITHM]`
  - `[CORE-LOGIC: KEYWORD-MATCHING-RULE]` (+3 kata kunci minat, +2 prospek karir, +2 nama jurusan, +1 mata pelajaran).

### AI Agent & Tools (laravel/ai)
- **[RecommendJurusanTool.php](file:///d:/laragon/www/nesaiBackend/app/Ai/Tools/RecommendJurusanTool.php)**:
  - `[CORE-LOGIC: RECOMMEND-JURUSAN-TOOL]` & `[CORE-LOGIC: FLEXIBLE-INTEREST-PARSER]`
  - Menangani input parameter minat baik format JSON array maupun string koma dari Gemini.
- **[SchoolAssistantAgent.php](file:///d:/laragon/www/nesaiBackend/app/Ai/Agents/SchoolAssistantAgent.php)**:
  - Memperbarui system instruction untuk panduan rekomendasi jurusan & pendaftaran `RecommendJurusanTool` di method `tools()`.
- **[NesaiService.php](file:///d:/laragon/www/nesaiBackend/app/Services/Nesai/NesaiService.php)**:
  - Ekstraksi hasil `recommend_jurusan`, pengaturan intent `major_recommendation`, dan pembuatan quick actions otomatis ke `/jurusan/{slug}`.

### Endpoint Form Interaktif
- **[RecommendationService.php](file:///d:/laragon/www/nesaiBackend/app/Services/RecommendationService.php)**:
  - Terhubung langsung ke `JurusanScorer` untuk konsistensi hasil antara form dan chat AI.
- **[RecommendationController.php](file:///d:/laragon/www/nesaiBackend/app/Http/Controllers/Api/RecommendationController.php)**:
  - Mengembalikan status `scored` dan daftar rekomendasi jurusan lengkap dengan alasan dan kata kunci cocok.

### Sumber Data Statis
- **[config/jurusan.php](file:///d:/laragon/www/nesaiBackend/config/jurusan.php)**:
  - Diperkaya dengan 7 atribut: `nama`, `slug`, `deskripsi`, `kuota`, `kata_kunci_minat`, `prospek_karir`, `mata_pelajaran_utama` untuk seluruh 10 jurusan resmi SMKN 1 Subang.

---

## 2. Hasil Verifikasi

### A. Endpoint `POST /api/v1/recommendations/majors`
- **Request valid (`interests: ["coding", "game", "komputer"]`)**:
  - HTTP 200 OK
  - Ranking 1: Pengembangan Perangkat Lunak dan Gim (PPLG) dengan skor 11.
  - Ranking 2: Teknik Komputer Jaringan (TKJ) dengan skor 7.
- **Request invalid (`interests: []`)**:
  - HTTP 422 Unprocessable Entity dengan pesan validasi baku.

### B. Tool `RecommendJurusanTool`
- Pengujian langsung dengan input array `['coding', 'game']` dan input string `'mobil, motor, bengkel'` berhasil mengidentifikasi jurusan PPLG dan Teknik Otomotif dengan akurat.

### C. Chatbot AI `POST /api/chat` & Resilient Fallback
- Alur controller, request pipeline, dan fallback guard `[CORE-LOGIC: RESILIENT-FALLBACK-GUARD]` terverifikasi aman tanpa memicu crash HTTP 500 saat provider AI offline/rate limited.

---

## 3. Dokumentasi

Dokumentasi lengkap untuk tim pengembang dan tim konten tersedia di:
- [2026-09-19-fitur-rekomendasi-jurusan.md](file:///d:/laragon/www/nesaiBackend/docs/develop_nesai/2026-09-19-fitur-rekomendasi-jurusan.md)
- [2026-09-19-perkaya-data-jurusan.md](file:///d:/laragon/www/nesaiBackend/docs/develop_nesai/2026-09-19-perkaya-data-jurusan.md)
