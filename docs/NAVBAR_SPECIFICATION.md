# Dokumentasi Komponen Navbar (Navigasi Utama SMKN 1 Subang)

Dokumentasi ini menjelaskan arsitektur, spesifikasi desain visual, struktur kode, dan panduan penggunaan komponen **Navbar** pada aplikasi frontend SMKN 1 Subang (`nesaiFrontend`).

---

## 1. Ikhtisar & Arsitektur

Komponen Navbar diimplementasikan menggunakan **React (Next.js 16 App Router)** dan didesain secara presisi mengikuti referensi desain dengan **Tailwind CSS v4**.

- **File Komponen:** [`src/components/Navbar.tsx`](file:///d:/NEXTJS/nesaiFrontend/src/components/Navbar.tsx)
- **Re-export Index:** [`src/components/navigation/index.ts`](file:///d:/NEXTJS/nesaiFrontend/src/components/navigation/index.ts)
- **Implementasi Global:** Terintegrasi di [`src/app/layout.tsx`](file:///d:/NEXTJS/nesaiFrontend/src/app/layout.tsx) sehingga otomatis aktif di seluruh halaman aplikasi.
- **Aset Logo:** [`public/images/logo-smkn1subang.png`](file:///d:/NEXTJS/nesaiFrontend/public/images/logo-smkn1subang.png)

---

## 2. Spesifikasi Visual & Tokens Desain

| Bagian | Elemen | Spesifikasi | Nilai Token / Tailwind |
| :--- | :--- | :--- | :--- |
| **Kontainer** | Latar Belakang | Putih Solid | `#FFFFFF` (`bg-white`) |
| | Tinggi | Fixed 68px (kisaran 64px - 72px) | `h-[68px]` |
| | Posisi | Sticky di bagian paling atas dengan z-index tinggi | `sticky top-0 z-50` |
| | Pembatas & Bayangan | Border bawah halus & bayangan lembut | `border-b border-slate-100 shadow-[0_2px_4px_rgba(0,0,0,0.03)]` |
| | Tata Letak | Flexbox horizontal proporsional | `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 justify-between items-center` |
| **Area Kiri** | Logo Sekolah | Lambang resmi SMKN 1 Subang / NESAS | `width={36} height={44}` (`h-10 w-auto object-contain`) |
| | Judul Brand | Sans-serif bold navy / slate gelap | `#0F172A` / `#1E293B` (`text-[#0F172A] font-bold text-sm sm:text-base tracking-tight`) |
| | Slogan Brand | Sans-serif bold cyan / biru muda | `#06B6D4` (`text-[#06B6D4] font-bold text-[10px] sm:text-[11px] tracking-wider`) |
| **Area Tengah** | Tautan Menu | Sans-serif compact (13px - 14px) abu-abu gelap | `text-[#475569] font-medium text-[13px] lg:text-[14px]` |
| | Menu Aktif | Teks cyan terang (Status Aktif pada **Profil**) | `text-[#06B6D4] font-semibold` |
| | Hover State | Transisi warna teks ke cyan | `hover:text-[#06B6D4] transition-colors duration-200` |
| | Spasi Antar Item | Konsisten 20px - 24px | `gap-5 lg:gap-6` |
| **Area Kanan** | CTA Button | Latar oranye terang | `#FF5722` (`bg-[#FF5722] hover:bg-[#E64A19]`) |
| | CTA Teks | Putih solid, medium/semibold compact | `#FFFFFF` (`text-[#FFFFFF] font-medium text-[13px] lg:text-[14px]`) |
| | CTA Shape | Rounded medium & smooth active state | `rounded-md shadow-sm active:scale-[0.98]` |

---

## 3. Daftar Urutan Menu Navigasi

Sesuai spesifikasi, daftar link navigasi berada dalam urutan tetap:

1. **Beranda** (`/`)
2. **Profil** (`/profil`) &rarr; *Status: ACTIVE (`#06B6D4`)*
3. **Jurusan** (`/jurusan`)
4. **Alumni** (`/alumni`)
5. **Industry** (`/industry`)
6. **PPDB** (`/ppdb`)
7. **NESAI** (`/nesai`)

---

## 4. Responsivitas & Aksesibilitas (A11y)

1. **Responsif Multi-Device:**
   - **Desktop (&ge; 768px / `md:`):** Menampilkan seluruh menu navigasi horizontal dan tombol CTA "Daftar PPDB".
   - **Mobile / Tablet (&lt; 768px):** Menampilkan tombol Hamburger menu (`Menu` / `X` icon dari `lucide-react`). Saat ditekan, dropdown menu terbuka dengan transisi halus memuat seluruh 7 menu tautan dan tombol CTA "Daftar PPDB".
2. **Aksesibilitas (Semantic & A11y):**
   - Menggunakan tag semantik `<header>` dan `<nav aria-label="Navigasi Utama">`.
   - Menggunakan atribut `aria-current="page"` pada menu yang aktif.
   - Menggunakan atribut `aria-expanded` dan `aria-label` pada tombol pembuka menu seluler.
   - Kompatibel dengan pembaca layar (screen reader) dan navigasi keyboard.

---

## 5. Cara Penggunaan Komponen

### Impor Default:
```tsx
import Navbar from "@/components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar activeItem="Profil" />
      <main>{children}</main>
    </>
  );
}
```

### Properti (Props):
| Nama Prop | Tipe | Nilai Bawaan | Deskripsi |
| :--- | :--- | :--- | :--- |
| `activeItem` | `string` (opsional) | `"Profil"` | Menentukan label menu yang sedang aktif (misalnya: `"Beranda"`, `"Profil"`, dll.). |

---

## 6. Verifikasi & Pengujian

- **Typecheck:** Lulus pengujian statis `npx tsc --noEmit` tanpa error.
- **Next.js Server SSR:** Berhasil dirender pada `http://localhost:3000/` dengan respons status `200 OK`.
- **Aset Logo:** Tersedia di direktori `/public/images/logo-smkn1subang.png` dengan rasio aspek dan tampilan yang tajam.
