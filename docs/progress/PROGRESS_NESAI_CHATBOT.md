# 🚀 Update Progress: Chatbot Virtual Assistant "NESAI"

Halo Tim! 👋  
Berikut adalah rangkuman progress implementasi asisten virtual **NESAI (SMKN 1 Subang)** pada website frontend ini. Catatan ini dibuat agar semua anggota tim—baik pengembang, desainer, maupun pengelola konten—bisa dengan mudah memahami apa saja yang sudah selesai dibuat dan bagaimana cara mencobanya.

---

## 📌 Apa yang Sudah Selesai?

Seluruh pondasi dan antarmuka (UI) chatbot NESAI sekarang sudah aktif dan terpasang langsung di website:

### 1. Tombol Chat Melayang (Floating Button)
- Di pojok kanan bawah layar, ada tombol bulat bergradien biru-ungu dengan ikon balon obrolan.
- Terdapat lampu titik hijau kecil berkedip yang menandakan asisten siap melayani pengunjung.
- Efek transisi halus saat tombol diklik untuk membuka atau menutup jendela chat.

### 2. Jendela Percakapan yang Elegan & Modern
- Mengusung tema modern dengan efek kaca buram (*glassmorphism*) dan header bertuliskan **"NESAI - Asisten Virtual SMKN 1 Subang"**.
- Di bagian atas tersedia tombol **Reset Percakapan** (jika ingin mulai dari awal lagi) dan tombol **Tutup/Minimize**.

### 3. Balon Pesan & Tampilan Rapi
- **Pesan Pengguna:** Berada di sisi kanan dengan warna biru gradien.
- **Pesan NESAI:** Berada di sisi kiri, dilengkapi logo bot NESAI.
- **Teks Rapi (Markdown):** Jawaban bot sudah otomatis mendukung teks tebal, daftar poin (bullet), nomor urut, dan link aktif sehingga penjelasan panjang tidak menumpuk dan enak dibaca.

### 4. Tombol Navigasi Halaman Langsung (*Action Chips*)
- Jika NESAI memberikan rekomendasi halaman (misalnya: *"Lihat info jurusan"* atau *"Buka halaman PPDB"*), akan muncul tombol/chip interaktif di bawah jawabannya.
- Pengunjung cukup sekali klik pada tombol tersebut untuk langsung berpindah ke halaman yang dimaksud tanpa perlu mencari di menu navigasi utama.

### 5. Badge Sumber Data (*Source Badges*)
- Setiap kali bot mengambil data dari dokumen sekolah, di bagian bawah pesan akan ditampilkan label sumber (contoh: *Sumber: Informasi Jurusan SMKN 1 Subang*), sehingga pengunjung tahu jawaban tersebut resmi dan akurat.

### 6. Pertanyaan Populer / Cepat (*Quick Suggestions*)
- Saat percakapan baru pertama kali dibuka, NESAI langsung menyapa ramah dan menyediakan pilihan pertanyaan instan:
  - 🎓 *Apa saja jurusan di SMKN 1 Subang?*
  - 📋 *Kapan PPDB dibuka & apa persyaratannya?*
  - 📍 *Di mana alamat dan kontak SMKN 1 Subang?*
  - 🏫 *Apa saja fasilitas sekolah?*
- Pengunjung cukup klik salah satu pertanyaan tanpa harus mengetik panjang lebar.

### 7. Animasi Mengetik (*Typing Indicator*)
- Ketika NESAI sedang berpikir atau menunggu respon dari backend AI, akan muncul animasi tiga titik melompat bertuliskan *"NESAI sedang mengetik"*.

### 8. Percakapan Tidak Hilang Saat Pindah Halaman
- Obrolan disimpan sementara di sesi browser (*session storage*). Jadi ketika pengunjung mengklik tombol navigasi ke halaman lain, riwayat chat tetap tersimpan dan tidak terhapus.

### 9. Ramah Layar Ponsel & Komputer
- Di desktop/laptop, jendela obrolan tampil proporsional di sudut kanan bawah.
- Di layar HP/smartphone, jendela chat otomatis menyesuaikan lebar layar secara penuh agar nyaman digunakan dengan satu tangan.

---

## 🧪 Cara Mencoba Langsung di Browser

1. Pastikan server frontend berjalan di terminal:
   ```bash
   npm run dev
   ```
2. Buka browser dan kunjungi:
   👉 **[http://localhost:3000](http://localhost:3000)**
3. Lihat ke pojok kanan bawah, klik tombol obrolan NESAI.
4. Coba klik pertanyaan rekomendasi atau ketik teks sapaan seperti *"Halo"*.

> **Catatan Koneksi ke AI:**
> Frontend sudah diarahkan ke endpoint backend Laravel di `http://localhost:8000/api/v1/nesai/chat`.  
> - Jika backend Laravel aktif dengan Gemini API, NESAI akan menjawab secara cerdas via AI.  
> - Jika backend Laravel sedang dimatikan, NESAI tidak akan crash, melainkan menampilkan pesan ramah bahwa server sedang offline dan menyarankan untuk mencoba lagi nanti.

---

## 📂 Struktur File yang Dikerjakan

Bagi tim teknis yang ingin meninjau kodenya:
- **Tipe Data:** `src/types/nesai.ts`
- **Jalur Komunikasi API:** `src/lib/api/nesai.ts`
- **Pengatur Alur Pesan (Hook):** `src/hooks/useNesaiChat.ts`
- **Komponen Tampilan:** `src/components/nesai/` (berisi widget, header, list pesan, input bar, dll.)
- **Desain & Animasi:** `src/app/nesai-chat.css`
- **Integrasi Halaman Utama:** `src/app/layout.tsx`

---

## 🎯 Langkah Selanjutnya (Next Steps)
- Menguji integrasi langsung dengan backend Laravel saat API Gemini sudah terkonfigurasi penuh.
- Penyesuaian tautan rute internal tambahan jika halaman-halaman website (seperti detail profil atau kontak) mulai diisi konten final.

Semoga catatan ini membantu tim dalam memantau perkembangan fitur NESAI! Jika ada masukan tampilan atau alur, silakan diskusikan bersama. 🚀
