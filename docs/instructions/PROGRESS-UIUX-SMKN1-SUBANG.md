# Progress Pekerjaan Tampilan (UI/UX) — Website SMK Negeri 1 Subang

> Catatan perkembangan pekerjaan tampilan website. Ditulis dengan bahasa sederhana
> agar mudah dibaca oleh siapa pun — guru, staf, maupun pengelola proyek.
>
> Dokumen acuan utama: `docs/instructions/BRIEF-WEBSITE-SMKN1-SUBANG.md`

---

## 1. Apa Isi Dokumen Ini?

Dokumen ini mencatat **perkembangan pekerjaan tampilan (UI/UX)** website SMK Negeri 1 Subang.

Yang perlu diketahui:

- Pekerjaan ini **hanya menyentuh tampilan depan website** (bagian yang dilihat pengunjung).
- Bagian **pengelola data di belakang layar (yang dibuat dengan Laravel) tidak diubah sama sekali**.
- Pekerjaan mengikuti konsep pada dokumen brief yang sudah disetujui.

---

## 2. Status Saat Ini

| Hal | Keterangan |
|---|---|
| Tahap yang sedang berjalan | **Beranda — selesai, menunggu peninjauan** |
| Sudah selesai | Seluruh bagian Beranda, menu atas (navigasi), dan bagian bawah halaman (footer) |
| Belum dikerjakan | Halaman Jurusan, Detail Jurusan, Tentang, PPDB, Karya & Industri, dan Kontak |
| Langkah berikutnya | Menunggu persetujuan, lalu lanjut ke halaman Jurusan |

---

## 3. Kesepakatan yang Sudah Diputuskan

Hal-hal berikut sudah disepakati bersama dan menjadi dasar pekerjaan:

1. **Sambutan Kepala Sekolah tetap ditampilkan di Beranda**, supaya pengunjung merasa disambut saat pertama membuka website.
2. **Menu lama tetap dipertahankan**, ditambah menu baru dari konsep, agar semua halaman masih bisa dijangkau.
3. **Tombol "Daftar PPDB" selalu terlihat** di menu.
4. **Warna mengikuti warna logo sekolah** (kuning dan biru) dipadu warna netral, memakai warna yang jelas (bukan warna campuran/gradasi).
5. **Tidak menggunakan gradasi biru-ungu** atau efek berlebihan yang terkesan "buatan mesin".
6. **Ikon memakai gambar resmi**, bukan emoji.
7. **Jenis huruf tidak diganti**, tetap memakai yang sudah dipakai website sekarang agar tampilan konsisten.
8. Untuk data jurusan: **memakai data resmi bila sudah tersedia dari sistem, bila belum memakai data contoh sementara**.

---

## 4. Susunan Beranda yang Sudah Dikerjakan

Urutan dari atas ke bawah, sesuai konsep pada brief:

| No | Bagian | Status | Isi Singkat |
|---|---|---|---|
| 1 | **Pembuka (Hero)** | ✅ | Judul "Temukan yang Kamu Suka. Kuasai Keahliannya." dengan tombol "Kenali Jurusan" dan "Daftar PPDB" |
| 2 | **Sambutan Kepala Sekolah** | ✅ | Pengumuman sekolah + sambutan Kepala Sekolah |
| 3 | **Keunggulan Sekolah** | ✅ | Menjelaskan bahwa belajar bukan hanya duduk mendengarkan |
| 4 | **Statistik** | ✅ | 4 angka penting, masing-masing disertai tahun dan sumber |
| 5 | **Semua Jurusan** | ✅ | 9 kartu jurusan dengan tombol "Lihat Detail" |
| 6 | **Cara Belajar** | ✅ | 4 langkah: Kenali → Coba → Buat → Terapkan |
| 7 | **Portofolio & Mitra** | ✅ | Contoh karya siswa dan daftar mitra industri |
| 8 | **Kegiatan Terbaru** | ✅ | Kabar berita, prestasi, dan agenda sekolah |
| 9 | **Jejak Alumni** | ✅ | Arah lulusan (bekerja, kuliah, berwirausaha, mencari kerja) beserta tahun dan sumber data |
| 10 | **Penutup / Ajakan** | ✅ | Ajakan mengenal jurusan, dengan bantuan Nesai |
| 11 | **PPDB** | ✅ | Informasi pendaftaran: status, gelombang, batas waktu, dan persyaratan |

---

## 5. Menu yang Tersedia Sekarang

**Menu utama:**

Beranda | Tentang | Jurusan | Karya & Industri | Berita | PPDB | Nesai | Kontak

**Sub-menu "Karya & Industri":**

- Portofolio & BLUD
- PKL & Career Center
- Data Alumni
- Mitra Industri

**Tombol tetap:** "Daftar PPDB" selalu terlihat di menu, baik di komputer maupun di ponsel.

**Catatan:** menu lama (Tentang, Berita, Prestasi, Fasilitas) tetap dipertahankan agar halaman lama tetap bisa dijangkau.

---

## 6. Yang Belum Dibuat (Rencana Berikutnya)

Halaman-halaman berikut **belum dikerjakan** dan akan dikerjakan sesuai urutan:

1. Halaman **Jurusan** (daftar semua jurusan + penyaringan kelompok)
2. Halaman **Detail Jurusan** (satu tampilan seragam untuk semua jurusan)
3. Halaman **Tentang Sekolah**
4. Halaman **PPDB** (lengkap)
5. Halaman **Karya & Industri**: Portofolio & BLUD, PKL & Career Center, Data Alumni, Mitra Industri
6. Halaman **Kontak**

**Penting:** beberapa tautan menu saat ini mengarah ke halaman yang belum ada (bagian Karya & Industri). Hal ini **sudah ditandai di dalam kode** agar mudah dicari, dan menunggu keputusan apakah halaman-halaman tersebut akan dibuat.

---

## 7. Berkas yang Dibuat, Diubah, dan Dihapus

### Berkas yang dibuat

| Berkas | Fungsi |
|---|---|
| Data contoh beranda | Satu tempat penyimpanan semua angka, teks, dan data contoh untuk Beranda agar mudah diganti |
| Bagian Keunggulan | Tampilan bagian "Keunggulan Sekolah" |
| Bagian Cara Belajar | Tampilan bagian "Cara Belajar" (4 langkah) |
| Bagian Portofolio & Mitra | Tampilan bagian "Portofolio & Mitra" |
| Bagian Jejak Alumni | Tampilan bagian "Jejak Alumni" |
| Bagian Penutup | Tampilan bagian "Penutup / Ajakan" |

### Berkas yang diubah

| Berkas | Perubahan |
|---|---|
| Pengaturan warna (tampilan) | Menambahkan warna resmi (dari logo sekolah) supaya seragam di semua bagian |
| Halaman Beranda | Disusun ulang sesuai urutan pada konsep |
| Menu atas (navigasi) | Ditambah menu baru, tombol "Daftar PPDB" selalu terlihat, dan diperbaiki agar lebih ramah pengguna |
| Bagian bawah (footer) | Diringkas dan dirapikan |
| Bagian pembuka (Hero) | Teks disesuaikan dengan konsep |

### Berkas yang dihapus

Sebanyak **11 bagian lama** dihapus karena tidak terpakai lagi dan tampilannya bertabrakan dengan konsep baru (memakai gradasi biru-ungu, efek berlebihan, atau data lama yang keliru seperti daftar jurusan lama dan nama Kepala Sekolah yang berbeda-beda).

Contoh yang dihapus: bagian statistik lama, daftar jurusan lama, kartu berita lama, sambutan versi lama, dan bagian dekorasi lain yang tidak dipakai.

---

## 8. Data Contoh yang Harus Diganti Sebelum Website Tayang

Semua data di bawah ini masih berupa **contoh (sementara)** dan **wajib diganti dengan data resmi**:

- **Foto** — saat ini masih memakai foto stok dari internet; harus diganti foto asli siswa, fasilitas, karya, dan mitra.
- **Nama & foto Kepala Sekolah** — sesuaikan dengan data resmi.
- **Angka statistik** (jumlah jurusan, mitra, lulusan, siswa) — lengkapi tahun dan sumber data.
- **Nama perusahaan mitra** — hanya yang sudah memberi izin.
- **Jadwal & gelombang PPDB** — sesuaikan dengan jadwal terbaru.
- **Data alumni** — sertakan tahun dan sumber datanya.

> Semua data contoh ini dikumpulkan di **satu tempat** supaya mudah diganti.

---

## 9. Hasil Pemeriksaan

Pekerjaan Beranda sudah diuji:

- ✅ Website **berjalan tanpa error**.
- ✅ Halaman Beranda **tampil normal** saat dibuka.
- ✅ **9 kartu jurusan muncul lengkap** dengan tombol "Lihat Detail".
- ✅ **Tidak ada warna gradasi biru-ungu** pada bagian Beranda.
- ✅ Urutan bagian Beranda **sudah sesuai konsep**.
- ✅ **Tidak ada peringatan pada berkas Beranda** yang dikerjakan.

---

## 10. Daftar Periksa Kelayakan (dari Konsep Awal) — untuk Beranda

| No | Hal yang Diperiksa | Status |
|---|---|---|
| 1 | Perubahan hanya di tampilan depan website | ✅ |
| 2 | Mengikuti gaya dan bahan yang sudah ada (tanpa bahan baru) | ✅ |
| 3 | Tanpa gradasi biru-ungu; warna dari logo sekolah | ✅ |
| 4 | Beranda selesai dan ditinjau sebelum halaman lain | ✅ (menunggu peninjauan) |
| 5 | Menu & sub-menu sesuai konsep; tombol "Daftar PPDB" selalu terlihat | ✅ |
| 6 | Urutan bagian Beranda sesuai konsep | ✅ |
| 7 | 9 jurusan tampil sebagai kartu di Beranda | ✅ |
| 8 | Setiap bagian punya satu tujuan dan satu ajakan utama | ✅ |
| 9 | Halaman detail jurusan seragam | ⏳ Belum (dikerjakan nanti) |
| 10 | Gaya bahasa akrab dan langsung | ✅ |
| 11 | Setiap angka statistik punya tahun dan sumber | ✅ |
| 12 | Asisten Nesai muncul di semua halaman | ✅ |
| 13 | Nyaman dipakai di ponsel dan bisa diakses dengan keyboard | ✅ |
| 14 | Data contoh terkumpul di satu tempat dan ditandai jelas | ✅ |
| 15 | Tidak ada pekerjaan tambahan di luar konsep | ✅ |

---

## 11. Catatan Penting yang Perlu Diketahui

1. **Halaman "Karya & Industri" belum dibuat.** Tautannya sudah dipasang di menu, tetapi menuju halaman yang belum ada.
2. **Foto masih sementara** (foto stok internet) dan harus diganti dengan foto asli sebelum tayang.
3. **Nama Kepala Sekolah** kini diambil otomatis dari data sekolah; bila data belum ada, ditampilkan sebagai "Kepala SMK Negeri 1 Subang" (tidak menebak nama).
4. Beberapa halaman lama (di luar Beranda) memiliki **peringatan pada penulisan program** yang belum dibetulkan karena di luar lingkup pekerjaan ini. Akan dilaporkan terpisah bila ingin diperbaiki.
5. Beberapa bagian halaman lama yang tidak terpakai sudah dihapus agar tampilan tidak tercampur antara konsep lama dan konsep baru.

---

## 12. Langkah Selanjutnya

1. **Menunggu peninjauan** Beranda dari pihak yang berwenang.
2. Setelah disetujui, lanjut ke **halaman Jurusan**.
3. Kemudian **Detail Jurusan**, lalu **Tentang**, **PPDB**, **Karya & Industri**, dan terakhir **Kontak**.

> Dikerjakan satu halaman per persetujuan, sesuai arahan pada konsep awal.

---

*Dokumen ini bersifat catatan progress. Setiap perubahan besar akan dicatat di sini.*
