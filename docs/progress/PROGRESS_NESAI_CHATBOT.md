# 🚀 Update Progress: Chatbot Virtual Assistant "NESAI"

Halo Tim! 👋  
Berikut adalah rangkuman progress implementasi asisten virtual **NESAI (SMKN 1 Subang)** pada website frontend ini. Catatan ini telah diperbarui setelah penyelarasan dengan **Blueprint UI/UX Produk NESAS** dan standar komponen **shadcn/ui**.

---

## 📌 Apa Saja yang Telah Disempurnakan?

### 1. Refactor Penuh ke Standar Komponen shadcn/ui
Sesuai arahan teknis dan konfigurasi project di `components.json`, seluruh elemen UI chatbot kini dibangun di atas komponen atomik resmi:
- **`Card` (`src/components/ui/card.tsx`)**: Menjadi kontainer jendela percakapan yang kokoh dan rapi.
- **`Button` (`src/components/ui/button.tsx`)**: Digunakan untuk launcher pemicu chat, tombol navigasi rute (*action chips*), tombol pertanyaan cepat, tombol header, dan tombol kirim pesan.
- **`Badge` (`src/components/ui/badge.tsx`)**: Menampilkan referensi sumber data resmi (*sources*) dan badge navigator.
- **`Avatar` (`src/components/ui/avatar.tsx`)**: Menampilkan identitas visual NESAI.
- **`ScrollArea` (`src/components/ui/scroll-area.tsx`)**: Menghadirkan area scroll percakapan yang sangat halus (*smooth*) dan konsisten di berbagai browser.
- **`Textarea` (`src/components/ui/textarea.tsx`)**: Input form yang fleksibel dan responsif.
- **`lucide-react`**: Menggantikan seluruh SVG manual dengan set ikon standar (`Sparkles`, `ArrowUpRight`, `BookOpen`, `Compass`, `RotateCcw`, `X`, `ArrowUp`).

### 2. Penyelarasan Desain dengan Blueprint (Bebas "AI-Slop")
Sesuai instruksi pada *UI/UX Blueprint* Bagian 2, 3, dan 41:
- ❌ **Dihilangkan:** Efek gradient ungu AI generik, neon berlebihan, glassmorphism buram yang berat, dan kartu-kartu mengambang acak.
-  **Diterapkan:**
  - **Identitas Institusional:** Warna *Slate Navy* dan *NESAS Blue* yang solid, bersih, profesional, dan berkarakter sekolah vokasi modern.
  - **Pill Launcher "Tanya NESAI":** Di desktop tampil sebagai tombol kapsul elegan bertuliskan *"Tanya NESAI"* dengan lampu status hijau halus (bukan sekadar ikon robot biasa, sesuai Blueprint Bab 5 & 28).
  - **Subtle AI Indicator:** Menggunakan animasi lembut *"Mencari informasi NESAS..."* saat proses temu-kembali data berlangsung (sesuai Blueprint Bab 27).
  - **Balon Percakapan Berstruktur:** Format jawaban memisahkan dengan jelas antara Teks Penjelasan $\rightarrow$ Rekomendasi Navigasi (*Action Chips*) $\rightarrow$ Sumber Resmi Sekolah.

### 3. Logika & Alur Kontrak Tetap Terjaga 100%
- Menghubungi endpoint backend Laravel `POST /api/v1/nesai/chat`.
- Navigasi internal ke halaman sekolah (`/jurusan`, `/ppdb`, dll.) menggunakan `next/link` terintegrasi.
- Riwayat percakapan tetap tersimpan di `sessionStorage` sehingga tidak terhapus saat pengunjung berpindah halaman.
- Penanganan error anggun jika server backend belum dihidupkan.

---

## 🧪 Cara Mencoba Langsung di Browser

1. Pastikan server frontend berjalan di terminal:
   ```bash
   npm run dev
   ```
2. Buka browser dan kunjungi:
   👉 **[http://localhost:3000](http://localhost:3000)**
3. Perhatikan pojok kanan bawah:
   - Di layar laptop/komputer, akan terlihat tombol kapsul elegan **"✨ Tanya NESAI"**.
   - Klik tombol tersebut untuk membuka jendela percakapan.
4. Coba klik pertanyaan rekomendasi yang tersedia atau ketik pertanyaan seputar SMKN 1 Subang.

---

## 📂 Struktur File Terkini

- **Komponen Atomik shadcn/ui:** `src/components/ui/` (`button.tsx`, `badge.tsx`, `card.tsx`, `avatar.tsx`, `scroll-area.tsx`, `textarea.tsx`)
- **Fitur Chatbot NESAI:** `src/components/nesai/` (`NesaiChatWidget.tsx`, `NesaiHeader.tsx`, `NesaiMessageList.tsx`, `NesaiMessageItem.tsx`, `NesaiActionChips.tsx`, `NesaiSourceBadges.tsx`, `NesaiQuickReplies.tsx`, `NesaiTypingIndicator.tsx`, `NesaiChatInput.tsx`)
- **Utilitas & Hooks:** `src/lib/utils.ts`, `src/lib/api/nesai.ts`, `src/hooks/useNesaiChat.ts`
- **Tipe Data:** `src/types/nesai.ts`
- **Styling Khusus Prose:** `src/app/nesai-chat.css`
