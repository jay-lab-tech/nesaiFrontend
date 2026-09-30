# Brief Konsep Website SMK Negeri 1 Subang

> Dokumen ini adalah **sumber acuan UI/UX dan konten** untuk AI agent. Isinya diturunkan dari PDF "Konsep Website SMK Negeri 1 Subang" (versi data dummy, September 2026).

---

## 0. Konteks dan Tugas untuk Agent

### Situasi saat ini
- Website SMK Negeri 1 Subang **sudah ada dan sedang dikembangkan**.
- Tech stack tim: **Laravel 13 (backend)** dan **Next.js (frontend)**.
- Implementasi yang ada **belum menerapkan konsep UI/UX** di dokumen ini.
- Dokumen ini bukan permintaan membangun website dari nol.

### Tujuan
Menyelaraskan **tampilan dan pengalaman pengguna (UI/UX)** website yang sudah ada dengan konsep di bawah: struktur menu, urutan section, gaya bahasa, dan prinsip desain.

### Ruang lingkup (WAJIB)
- **Hanya UI/UX di sisi frontend (Next.js).** Fokus pada layout, komponen, susunan section, copywriting, responsivitas, dan aksesibilitas.
- **Jangan menyentuh backend Laravel.** Jangan mengubah route, controller, model, migrasi, atau kontrak API. Backend tidak perlu dipikirkan.
- Bila sebuah tampilan butuh data atau fitur yang belum ada di backend (misalnya cek status PPDB, kuis rekomendasi), **buat UI-nya saja** dengan data statis/placeholder yang jelas ditandai `TODO`. Jangan membuat endpoint baru.
- **Ikuti style yang sudah ada di codebase:** struktur folder, penamaan, pola komponen, cara styling, cara mengambil data, dan library yang sudah dipakai. **Jangan menambah library atau mengganti pendekatan** kecuali diminta.
- **Minim scope creep.** Jangan menambah fitur atau refactor di luar dokumen ini.

### Arahan visual (WAJIB)
- **Larangan mutlak: gradasi biru-ungu** (dan sejenisnya seperti ungu-pink atau gradasi neon). Ini ciri khas tampilan "AI slop" dan tidak enak dipandang. Jangan dipakai di background, hero, tombol, teks, maupun kartu. Utamakan warna solid.
- **Warna baru BOLEH**, selama nyaman dipandang dan hasilnya lebih baik daripada palet sekarang. Tidak wajib terpaku pada warna yang ada.
- **Sumber palet yang disarankan (pilih salah satu):**
  1. **Kombinasi warna logo SMK Negeri 1 Subang** sebagai dasar palet (ambil warna dari logo resmi di project).
  2. **Monokrom**, seperti desain website sekarang, dengan satu warna aksen untuk CTA.
- **Syarat palet:** kontras teks memadai (target WCAG AA), jumlah warna sedikit (satu warna utama, satu aksen, netral), konsisten di semua section, dan dipakai lewat design token/CSS variables yang sudah ada di project.
- **Sebelum menerapkan,** tuliskan palet yang diusulkan (kode hex beserta fungsinya) di laporan audit agar bisa disetujui.
- Jangan menambah dekorasi generik: blob/orb blur, glow, glassmorphism berlebihan, emoji sebagai ikon, atau animasi berlebihan.
- Kesan visual dibangun dari **tipografi, spasi, hierarki, dan foto asli**, bukan dari efek.
- Ikuti font, radius, bayangan, dan pola komponen yang sudah ada.

### Prioritas pengerjaan
1. **Beranda dulu.** Selesaikan seluruh section Beranda (bagian 4), termasuk navbar dan footer yang tampil di Beranda, sampai layak ditinjau.
2. Setelah Beranda disetujui, lanjut ke halaman lain dengan urutan: **Jurusan → Detail Jurusan → Tentang → PPDB → Karya & Industri (Portofolio & BLUD, PKL & Career Center, Data Alumni, Mitra Industri) → Kontak**.
3. **Nesai:** widget/floating chat sudah ada dan dikerjakan terpisah. Sesuaikan penempatan dan copy-nya dengan konsep ini hanya bila diminta.
4. Berhenti dan minta review setelah tiap tahap selesai. Jangan mengerjakan beberapa halaman sekaligus.

### Cara kerja yang diharapkan
1. **Audit dulu.** Baca struktur project Next.js (routing, layout, komponen, halaman, token styling). Petakan setiap halaman/section yang sudah ada ke bagian dokumen ini. Laporkan selisihnya sebelum mengubah apa pun.
2. **Jangan menulis ulang dari nol.** Pakai ulang komponen dan konvensi yang ada. Ubah seperlunya.
3. **Sebutkan bug atau masalah yang ditemukan** di kode frontend existing sebelum memberi solusi, tapi jangan memperbaikinya di luar lingkup tanpa konfirmasi.
4. **Jangan mengarang data.** Semua angka, nama mitra, jadwal, dan statistik di dokumen ini adalah **dummy**. Pisahkan data dummy ke satu tempat (file konstanta/data) supaya mudah diganti data resmi. Tandai jelas di kode.
5. Bila ada hal yang tidak tercakup atau ambigu (lihat bagian 13), **tanya atau tandai TODO**. Jangan berasumsi diam-diam.

---

## 1. Arah Besar

Website menuntun pengunjung melalui satu cerita sederhana:

**kenal sekolah → lihat bukti → pilih jurusan → pahami peluang → ambil tindakan**

| Aspek | Ketentuan |
|---|---|
| Pesan utama | SMK Negeri 1 Subang membantu siswa menemukan keahlian, belajar lewat pengalaman nyata, dan menyiapkan langkah setelah lulus. |
| Gaya bahasa | Hangat, langsung, konkret. Berbicara kepada calon siswa dan orang tua (sapaan "kamu"). |
| Karakter visual | Clean, luas (banyak ruang kosong), mudah dipahami dalam sekali baca. |

Alur pengunjung yang dituju:
Kenal sekolah → Lihat bukti → Kenali jurusan → Pahami cara belajar → Lihat karya dan mitra → Pahami arah alumni → Tanya Nesai → Daftar PPDB

---

## 2. Navigasi Global

**Menu utama:** Beranda | Tentang | Jurusan | Karya & Industri | PPDB | Nesai | Kontak

**CTA tetap (selalu terlihat):** Daftar PPDB

**Submenu "Karya & Industri":**
- Portofolio & BLUD
- PKL & Career Center
- Data Alumni
- Mitra Industri

**Widget global:** floating chat Nesai di semua halaman.

---

## 3. Prinsip Desain (wajib dipatuhi di semua halaman)

- Satu section hanya punya **satu tujuan**.
- Beranda **ringkas**; informasi lengkap ada di halaman detail.
- Semua jurusan tampil di Beranda sebagai **kartu sederhana**.
- Judul pendek, deskripsi **satu atau dua kalimat**, **satu CTA utama** per section.
- Gunakan **foto asli** siswa, fasilitas, karya, dan mitra (jangan stok generik pada versi final).
- Angka statistik **harus mencantumkan tahun dan sumber**. Hindari angka tanpa sumber.
- PPDB dibuat praktis dan mudah dipindai.
- Nyaman di ponsel (mobile-first) dan **dapat dinavigasi dengan keyboard** (aksesibilitas).

---

## 4. BERANDA

Beranda menceritakan sekolah dari awal sampai akhir. **Satu section membawa satu pesan utama.**

**Urutan section (jangan diubah):**
Hero → Keunggulan → Statistik → Semua Jurusan → Cara Belajar → Portofolio & Mitra → Kegiatan Terbaru → Jejak Alumni → Penutup → PPDB

### 4.1 Hero
- **Judul:** Temukan yang Kamu Suka. Kuasai Keahliannya.
- **Deskripsi:** Di sini, kamu tidak hanya belajar dari buku. Kamu akan mencoba, membuat karya, dan mengenal dunia kerja sejak di bangku sekolah.
- **CTA:** Kenali Jurusan | Daftar PPDB

### 4.2 Keunggulan Sekolah
- **Judul:** Belajar bukan hanya duduk dan mendengarkan.
- **Deskripsi:** Setiap hari, kamu diberi kesempatan mencoba hal baru, mengerjakan proyek, dan belajar dari pengalaman nyata.
- **Sorotan:** praktik, bimbingan guru, hubungan industri.
- **CTA:** Lihat Cara Belajar

### 4.3 Statistik
- **Judul:** Bukan Hanya Angka
- **Deskripsi:** Di balik setiap angka, ada siswa yang belajar, guru yang mendampingi, karya yang dibuat, dan langkah baru yang dimulai.
- **Tampilkan maksimal 4 angka (dummy):** 9 jurusan · 42 mitra · 87% lulusan bekerja atau kuliah · 1.240 siswa
- **Wajib:** cantumkan tahun data (dan sumber).
- **CTA:** Lihat Cerita Sekolah

### 4.4 Semua Jurusan
- **Judul:** Temukan bidang yang paling dekat dengan minatmu.
- **Deskripsi:** Suka angka, komputer, mesin, bisnis, logistik, atau memasak? Kenali semua pilihan jurusan.
- **Tampilan:** 9 kartu; tiap kartu berisi logo/ikon, nama, deskripsi satu kalimat, dan tombol **Lihat Detail**.

| Jurusan | Deskripsi kartu |
|---|---|
| AKL | Belajar mengatur angka, laporan, dan keuangan sebuah usaha. |
| Pemasaran | Memahami pelanggan dan mengenalkan produk. |
| MPLB | Mengatur pekerjaan kantor dan pelayanan. |
| PPLG | Membuat aplikasi, website, dan solusi digital. |
| TJKT | Memasang dan menjaga jaringan komputer. |
| Teknik Mesin | Menggunakan mesin dan membuat komponen presisi. |
| Teknik Otomotif | Merawat dan memperbaiki kendaraan. |
| Teknik Logistik | Mengatur penyimpanan dan distribusi barang. |
| Kuliner | Mengolah bahan menjadi makanan enak dan bernilai jual. |

### 4.5 Cara Belajar
- **Judul:** Dari mencoba, menjadi bisa.
- **Deskripsi:** Kamu mempelajari dasar, berlatih langsung, membuat proyek, lalu menerapkannya saat PKL.
- **Tampilan:** 4 langkah → **Kenali → Coba → Buat → Terapkan**
- **CTA:** Lihat Kegiatan Siswa

### 4.6 Portofolio & Mitra
- **Judul:** Karya siswa tidak berhenti di ruang kelas.
- **Deskripsi:** Dari laporan keuangan, aplikasi, perawatan kendaraan sampai produk kuliner, siswa belajar menghasilkan karya yang berguna.
- **Catatan:** hanya sertakan karya dan mitra yang **benar-benar terlibat**.
- **CTA:** Lihat Portofolio

### 4.7 Kegiatan Terbaru
- **Judul:** Lihat apa yang sedang kami kerjakan.
- **Deskripsi:** Ikuti kegiatan, prestasi, proyek, dan cerita terbaru.
- **Tampilan:** kartu untuk berita, prestasi, kegiatan jurusan, dan agenda; masing-masing berisi foto, judul, tanggal, ringkasan.
- **CTA:** Lihat Semua Kegiatan

### 4.8 Jejak Alumni
- **Judul:** Setelah lulus, kamu bisa melangkah ke banyak arah.
- **Deskripsi:** Ada yang bekerja, melanjutkan kuliah, membangun usaha, atau mencari peluang kerja.
- **Tampilan:** data alumni **dengan tahun dan sumber**.
- **CTA:** Lihat Jejak Alumni

### 4.9 Penutup / Ajakan
- **Judul:** Sudah menemukan jurusan yang kamu suka?
- **Deskripsi:** Kalau belum yakin, Nesai dapat membantu mencocokkan minat dan kemampuanmu.
- **CTA:** Coba Rekomendasi Jurusan | Lihat Semua Jurusan

### 4.10 PPDB di Beranda
- **Judul:** Mulai perjalananmu bersama kami.
- **Deskripsi:** Pilih jurusan, siapkan berkas, dan ikuti proses pendaftaran dengan mudah.
- **Tampilan:** status, gelombang aktif, deadline, tombol daftar, persyaratan, cek status.
- **CTA:** Daftar PPDB | Tanya Nesai

---

## 5. TENTANG SEKOLAH

- **Judul:** Sekolah untuk belajar, mencoba, dan menjadi lebih siap.
- **Deskripsi:** SMK Negeri 1 Subang membantu siswa mengenali potensinya, menguasai keahlian, dan menyiapkan langkah setelah lulus.

**Isi yang harus ada:**
- Data pokok: nama, NPSN, alamat, status, akreditasi, tahun berdiri, kepala sekolah, jumlah siswa dan guru
- Visi dan misi
- Sambutan kepala sekolah
- Program unggulan
- Fasilitas
- Ekstrakurikuler
- Prestasi
- Roadmap (bila tersedia)
- Peta lokasi

**Visi:** Menjadi sekolah kejuruan yang membantu siswa tumbuh menjadi pribadi terampil, percaya diri, bertanggung jawab, dan siap menghadapi masa depan.

**Misi:**
1. Membuat pembelajaran dekat dengan kebutuhan kerja.
2. Memberi ruang untuk mencoba dan berkarya.
3. Membentuk siswa disiplin dan mandiri.
4. Memperkuat hubungan industri.
5. Membuka jalan untuk bekerja, kuliah, atau berwirausaha.

**Kalimat fasilitas:** Ruang belajar, laboratorium, bengkel, dan fasilitas praktik disiapkan agar kamu bisa belajar dengan cara yang lebih nyata.

**Kalimat lokasi:** Mari berkunjung dan rasakan langsung suasana belajar di SMK Negeri 1 Subang.

---

## 6. JURUSAN (halaman daftar)

- **Judul:** Pilih keahlian yang ingin kamu bawa ke masa depan.
- **Deskripsi:** Kenali minatmu, lihat kegiatan belajarnya, lalu pilih jurusan yang paling sesuai.

**Kelompok jurusan (dipakai sebagai filter):**

| Kelompok | Kalimat |
|---|---|
| Bisnis dan layanan | Untuk kamu yang suka mengatur, menghitung, melayani, dan berkomunikasi. |
| Digital | Untuk kamu yang tertarik pada komputer, aplikasi, jaringan, dan teknologi. |
| Teknik | Untuk kamu yang suka bekerja dengan mesin, alat, dan hal yang membutuhkan ketelitian. |
| Hospitality | Untuk kamu yang senang memasak, mencoba rasa, dan membuat produk yang disukai orang. |

**Tampilkan:** kartu lengkap, filter kelompok, fokus keterampilan, contoh kegiatan, prospek, tombol detail.
**CTA:** Bantu Saya Memilih

---

## 7. DETAIL JURUSAN

Gunakan **struktur seragam** untuk semua jurusan agar mudah dibandingkan:

Hero → Yang dipelajari → Fasilitas → Proyek → Sertifikasi → PKL dan mitra → Prospek kerja → Studi lanjut → CTA PPDB

**Contoh konten (PPLG):**
- **Judul hero:** Ubah ide menjadi aplikasi yang bisa digunakan.
- **Deskripsi:** Di PPLG, kamu belajar memahami masalah, menyusun ide, menulis kode, dan membuat solusi digital.
- **Contoh proyek:** Website sekolah, aplikasi inventori, sistem informasi, dan gim sederhana dapat menjadi bagian dari portofoliomu.
- **Ajakan:** Siap membuat karya pertamamu?

Implementasi yang disarankan: satu template halaman detail yang dirender dari data per jurusan, bukan 9 halaman yang ditulis manual.

---

## 8. PORTOFOLIO & BLUD

- **Judul:** Karya siswa bisa menjadi solusi.
- **Deskripsi:** Melalui BLUD, siswa belajar membuat produk dan memberikan layanan yang benar-benar dibutuhkan.
- **Kategori:** produk bisnis, layanan digital, pekerjaan teknik, produk kuliner.
- **Setiap karya memuat:** foto, nama, jurusan, kebutuhan yang dijawab, proses, mitra/pengguna, tahun.
- **Pemesanan:** Punya kebutuhan? Ceritakan kepada kami. Tim sekolah akan membantu memahami kebutuhan dan menjelaskan proses pengerjaannya.
- **CTA:** Minta Penawaran

---

## 9. PKL & CAREER CENTER / BKK

- **Judul:** Kenali dunia kerja sebelum benar-benar masuk ke dalamnya.
- **Deskripsi:** PKL memberi kesempatan untuk merasakan suasana kerja dan menguji kemampuan yang sudah dipelajari.
- **Jelaskan alur PKL:** pembekalan, penempatan, monitoring, evaluasi.
- **Career Center menampilkan:** lowongan, bantuan CV, latihan wawancara, bursa kerja, informasi kuliah, konsultasi karier, pendataan alumni.
- **Untuk industri:** Ingin mencari calon tenaga kerja, membuka tempat PKL, atau mengembangkan program bersama sekolah?
- **CTA:** Hubungi Career Center

---

## 10. DATA ALUMNI

- **Judul:** Perjalananmu tidak berhenti saat lulus.
- **Tampilkan arah alumni:** bekerja, kuliah, berwirausaha, mencari kerja.
- **Tambahkan:** bidang pekerjaan, perusahaan (bila diizinkan), tahun data, sumber, metode pendataan.
- **Aturan:** hindari angka tanpa sumber.

---

## 11. PPDB

- **Judul:** Siapkan langkah pertamamu.
- **Deskripsi:** Semua informasi pendaftaran kami susun dalam satu tempat agar kamu dan orang tua tidak perlu mencari ke banyak halaman.
- **Tampilkan:** status, gelombang, deadline, jalur, syarat, alur, jadwal, biaya/beasiswa, formulir, cek status, FAQ, kontak panitia.
- **Alur pendaftaran:** Buat akun → Isi data → Pilih jurusan → Unggah berkas → Verifikasi → Seleksi → Pengumuman → Daftar ulang
- **Kalimat bantuan:** Ikuti langkahnya satu per satu. Jika mengalami kesulitan, hubungi panitia atau tanyakan kepada Nesai.

---

## 12. NESAI (asisten virtual) dan KONTAK

### Nesai
- **Judul halaman:** Bingung mencari informasi? Tanya Nesai.
- **Fungsi:** membantu menemukan jurusan, menjelaskan PPDB, mencari jadwal, mengarahkan ke halaman yang tepat.
- **Antarmuka:** floating chat di semua halaman, quick actions, jawaban ringkas, tombol langsung.
- **Sapaan:** Halo, saya Nesai. Saya bisa membantu kamu mengenal sekolah, memilih jurusan, dan menemukan informasi PPDB.
- **Kuis rekomendasi jurusan (5 langkah):** minat → gaya kerja → karakter → rencana setelah lulus → pelajaran favorit.
- **Hasil kuis:** 3 rekomendasi, alasan, tingkat kecocokan, tautan ke detail jurusan dan PPDB.
- **Privasi:** minta pengunjung **tidak mengirim kata sandi atau data pribadi sensitif**.

### Kontak
- **Judul:** Ada yang ingin kamu tanyakan?
- **Deskripsi:** Kami siap menjawab pertanyaan tentang jurusan, PPDB, PKL, kerja sama, dan kegiatan sekolah.
- **Tampilkan:** alamat, WhatsApp, telepon, email, jam layanan, peta, media sosial, formulir.
- **Formulir meminta:** nama, kontak, kategori pertanyaan, pesan.
- **CTA:** Kirim Pesan / Hubungi WhatsApp

---

## 13. Hal yang Belum Jelas di Konsep (jangan diasumsikan)

Dokumen sumber tidak menjawab poin berikut. Agent harus bertanya atau memberi TODO, bukan menebak:

1. **Pemetaan jurusan ke kelompok.** Kelompok ada 4 (Bisnis dan layanan, Digital, Teknik, Hospitality), tetapi pemetaan 9 jurusan tidak ditulis. Yang jelas: PPLG dan TJKT → Digital; Kuliner → Hospitality. Tidak jelas: **Teknik Logistik** (Teknik atau Bisnis dan layanan?), serta apakah AKL, Pemasaran, MPLB semuanya masuk Bisnis dan layanan.
2. **Logika kuis rekomendasi Nesai.** Cara menghitung "kecocokan" tidak dijelaskan. Cukup buat UI-nya; jangan membuat logika atau endpoint baru.
3. **Sumber data resmi.** Semua data di dokumen ini dummy.

Catatan: arahan warna sudah ditetapkan di bagian 0 (palet logo sekolah atau monokrom, tanpa gradasi biru-ungu). Fitur yang butuh backend hanya dibuat sebatas UI (lihat bagian 0).

---

## 14. Data Dummy yang Harus Diganti Sebelum Tayang

Semua item berikut wajib diganti data resmi:
- Angka dan statistik (9 jurusan, 42 mitra, 87%, 1.240 siswa, dan lainnya)
- Nama mitra (hanya yang sudah memberi izin)
- Jadwal dan gelombang PPDB terbaru
- Foto asli dan logo resmi
- Data alumni beserta tahun dan sumbernya

---

## 15. Checklist Penerimaan (Definition of Done)

- [ ] Perubahan hanya di frontend Next.js; backend Laravel tidak disentuh
- [ ] Style, struktur, dan library mengikuti codebase yang sudah ada (tanpa dependensi baru)
- [ ] Tidak ada gradasi biru-ungu; palet berasal dari logo sekolah atau monokrom, kontras memadai, dan sudah disetujui
- [ ] Beranda selesai dan ditinjau sebelum halaman lain dikerjakan
- [ ] Menu utama dan submenu "Karya & Industri" sesuai bagian 2; CTA "Daftar PPDB" selalu terlihat
- [ ] Urutan section Beranda sesuai bagian 4
- [ ] Semua 9 jurusan tampil di Beranda sebagai kartu
- [ ] Setiap section punya satu tujuan dan satu CTA utama
- [ ] Halaman detail jurusan memakai satu template dengan struktur seragam
- [ ] Copy mengikuti gaya "kamu": hangat, langsung, konkret
- [ ] Setiap angka statistik punya tahun dan sumber
- [ ] Floating chat Nesai muncul di semua halaman
- [ ] Layout nyaman di ponsel dan dapat dinavigasi dengan keyboard
- [ ] Data dummy terkumpul di satu tempat dan ditandai jelas
- [ ] Tidak ada fitur atau scope tambahan di luar dokumen ini tanpa konfirmasi
