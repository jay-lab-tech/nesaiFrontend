# 🎨 Panduan Implementasi & Migrasi shadcn/ui pada NESAI Chatbot

Dokumen ini adalah panduan teknis langkah demi langkah untuk mengintegrasikan dan merefactor komponen **NESAI Chatbot** agar sepenuhnya mengadopsi standar dan pustaka komponen **shadcn/ui** sesuai konfigurasi project di `components.json`.

---

## 1. Tujuan & Arsitektur Desain

Saat ini prototype chatbot telah berjalan dengan *custom CSS* mandiri. Langkah migrasi ini bertujuan untuk:
1. **Konsistensi Desain:** Menggunakan token tema dan komponen atomik standar (`Button`, `Badge`, `Card`, `ScrollArea`, `Avatar`, `Textarea`).
2. **Iconography Standar:** Mengganti semua `<svg>` inline dengan ikon dari **`lucide-react`**.
3. **Maintainability:** Mempermudah tim frontend lain untuk mengembangkan halaman-halaman website SMKN 1 Subang menggunakan komponen yang seragam.

```
src/
├── components/
│   ├── ui/                       <-- Komponen Atomik shadcn/ui
│   │   ├── button.tsx
│   │   ├── badge.tsx
│   │   ├── card.tsx
│   │   ├── avatar.tsx
│   │   ├── scroll-area.tsx
│   │   └── textarea.tsx
│   └── nesai/                    <-- Fitur Chatbot (Konsumsi @/components/ui)
│       ├── NesaiChatWidget.tsx
│       ├── NesaiHeader.tsx
│       ├── NesaiMessageList.tsx
│       ├── NesaiMessageItem.tsx
│       ├── NesaiActionChips.tsx
│       ├── NesaiSourceBadges.tsx
│       ├── NesaiQuickReplies.tsx
│       ├── NesaiTypingIndicator.tsx
│       └── NesaiChatInput.tsx
```

---

## 2. Dependensi yang Dibutuhkan

Jalankan instalasi package berikut:

```bash
npm install clsx tailwind-merge class-variance-authority lucide-react @radix-ui/react-slot @radix-ui/react-scroll-area @radix-ui/react-avatar
```

### Rincian Kegunaan:
- **`clsx` & `tailwind-merge`:** Digunakan pada fungsi utilitas `cn()` di `src/lib/utils.ts` untuk penggabungan class Tailwind secara dinamis tanpa konflik.
- **`class-variance-authority` (cva):** Standar shadcn untuk varian komponen (contoh: variant `default`, `destructive`, `outline`, `secondary`, `ghost`).
- **`lucide-react`:** Pustaka ikon resmi shadcn/ui.
- **`@radix-ui/*`:** Primitif headless UI untuk aksesibilitas keyboard dan navigasi.

---

## 3. Penyesuaian Helper Utility (`src/lib/utils.ts`)

Pastikan fungsi `cn` menggunakan `clsx` dan `twMerge`:

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## 4. Penyesuaian Token Warna & Variabel CSS (`src/app/globals.css`)

Konfigurasi shadcn di `components.json` menggunakan tema **`new-york`** dan warna **`slate`**. Tambahkan variabel warna CSS standar di `src/app/globals.css`:

```css
@import "tailwindcss";
@import "./nesai-chat.css";

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;

    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;

    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;

    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;

    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;

    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;

    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;

    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;

    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;

    --radius: 0.75rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;

    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;

    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;

    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 47.4% 11.2%;

    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;

    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;

    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;

    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;

    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 224.3 76.3% 48%;
  }
}
```

---

## 5. Pembuatan Komponen Atomik shadcn/ui

Daftar komponen yang perlu di-generate di `src/components/ui/`:

### A. `src/components/ui/button.tsx`
- Mendukung varian: `default`, `secondary`, `outline`, `ghost`, `link`.
- Mendukung ukuran: `default`, `sm`, `lg`, `icon`.

### B. `src/components/ui/badge.tsx`
- Digunakan untuk sumber data (*sources*) dan status bot.
- Varian: `default`, `secondary`, `outline`.

### C. `src/components/ui/card.tsx`
- Komponen: `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`.
- Digunakan sebagai pembungkus utama jendela percakapan.

### D. `src/components/ui/avatar.tsx`
- Primitif dari `@radix-ui/react-avatar`.
- Digunakan untuk foto profil NESAI dan User.

### E. `src/components/ui/scroll-area.tsx`
- Primitif dari `@radix-ui/react-scroll-area`.
- Menghasilkan scrollbar kustom yang halus dan seragam antar browser.

### F. `src/components/ui/textarea.tsx`
- Input fleksibel yang mendukung auto-resize dan ring fokus tema.

---

## 6. Rencana Refactoring Komponen NESAI

| File Komponen | Perubahan / Pemanfaatan shadcn/ui |
| :--- | :--- |
| **`NesaiChatWidget.tsx`** | Menggunakan `Card` untuk jendela chat, `Button` varian `icon` untuk FAB, serta ikon `MessageCircle` & `X` dari `lucide-react`. |
| **`NesaiHeader.tsx`** | Menggunakan `Button` varian `ghost`/`icon` untuk tombol reset & minimize. Menggunakan ikon `RotateCcw`, `ChevronDown`, `Bot`. Menggunakan `Avatar` untuk icon NESAI. |
| **`NesaiMessageList.tsx`** | Mengganti `overflow-y: auto` dengan `<ScrollArea className="flex-1 p-4">`. |
| **`NesaiMessageItem.tsx`** | Menggunakan `<Avatar>` untuk ikon bot, serta merapikan styling bubble dengan utility class. |
| **`NesaiActionChips.tsx`** | Mengganti tag chip dengan `<Button variant="outline" size="sm" asChild>` yang membungkus `<Link>`. Menggunakan ikon `ExternalLink`. |
| **`NesaiSourceBadges.tsx`** | Mengganti badge manual dengan `<Badge variant="secondary">` dan menambahkan ikon `BookOpen`. |
| **`NesaiQuickReplies.tsx`** | Menggunakan `<Button variant="outline" className="justify-start">` untuk opsi pertanyaan instan. |
| **`NesaiChatInput.tsx`** | Menggunakan `<Textarea>` dan `<Button size="icon">` dengan ikon `Send`. |

---

## 7. Tahapan Eksekusi (Implementation Steps)

1. **Tahap 1:** Instalasi paket dependensi (`clsx`, `tailwind-merge`, `cva`, `lucide-react`, radix primitives).
2. **Tahap 2:** Perbarui `src/lib/utils.ts` untuk fungsi `cn()`.
3. **Tahap 3:** Buat folder `src/components/ui/` dan pasang komponen atomik (`button`, `badge`, `card`, `avatar`, `scroll-area`, `textarea`).
4. **Tahap 4:** Refactor komponen `src/components/nesai/*` satu per satu.
5. **Tahap 5:** Verifikasi type checking (`npx tsc --noEmit`) dan build Next.js.
6. **Tahap 6:** Uji visual di browser untuk memastikan gradien warna khas NESAI dan animasinya tetap memukau.
