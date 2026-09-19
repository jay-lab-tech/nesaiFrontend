# 🤖 Implementasi NESAI Chatbot Virtual Assistant

Implementasi fitur chatbot floating widget "NESAI" (Asisten Virtual SMKN 1 Subang) sesuai spesifikasi di `docs/CHATBOT_FRONTEND_GUIDE.md`.

## Ringkasan

Membangun chatbot interaktif sebagai floating widget di pojok kanan bawah, terintegrasi dengan backend Laravel API. Fitur mencakup: markdown rendering, action chips navigasi, source badges, typing indicator, quick replies, dan session storage.

---

## Proposed Changes

### 1. Dependency — Install `react-markdown` & `remark-gfm`

Untuk merender teks jawaban bot (bold, numbered list, bullet list) diperlukan library markdown parser.

```bash
npm install react-markdown remark-gfm
```

---

### 2. TypeScript Types

#### [NEW] [`nesai.ts`](file:///d:/NEXTJS/nesaiFrontend/src/types/nesai.ts)

Definisi interface/tipe data sesuai guide:
- `NesaiAction` — aksi navigasi (`type`, `path`, `title`)
- `NesaiChatData` — response data (`answer`, `intent`, `sources`, `actions`, `mode`)
- `NesaiChatResponse` — wrapper response Laravel (`data`, `meta`, `message`)
- `ChatMessage` — state pesan internal (`id`, `sender`, `text`, `createdAt`, `intent`, `sources`, `actions`, `isError`)

---

### 3. API Client

#### [NEW] [`nesai.ts`](file:///d:/NEXTJS/nesaiFrontend/src/lib/api/nesai.ts)

Fungsi `sendNesaiMessage(message: string)` yang:
- POST ke `${NEXT_PUBLIC_API_URL}/api/v1/nesai/chat`
- Mengirim `{ message, context: [] }`
- Handle error response (422, 500, network error)
- Return `NesaiChatResponse`

---

### 4. Custom Hook

#### [NEW] [`useNesaiChat.ts`](file:///d:/NEXTJS/nesaiFrontend/src/hooks/useNesaiChat.ts)

Hook untuk state management chat:
- `messages` — array `ChatMessage[]` (dimulai dengan welcome message)
- `isLoading` — status loading/typing
- `error` — pesan error
- `sendMessage(text)` — kirim pesan, tambah user message, call API, tambah bot response
- `clearChat()` — reset percakapan
- **Session storage persistence** — simpan & restore riwayat chat agar tidak hilang saat navigasi

---

### 5. Komponen UI Chat Widget

Semua komponen dibuat di `src/components/nesai/`:

#### [NEW] [`NesaiChatWidget.tsx`](file:///d:/NEXTJS/nesaiFrontend/src/components/nesai/NesaiChatWidget.tsx)
Komponen utama — floating action button + chat window container. Mengorkestrasikan semua sub-komponen. Client component (`"use client"`).

#### [NEW] [`NesaiHeader.tsx`](file:///d:/NEXTJS/nesaiFrontend/src/components/nesai/NesaiHeader.tsx)
Header chat: judul "NESAI - Asisten Virtual", status indicator (online/offline), tombol clear/reset, tombol close/minimize.

#### [NEW] [`NesaiMessageList.tsx`](file:///d:/NEXTJS/nesaiFrontend/src/components/nesai/NesaiMessageList.tsx)
Container scroll pesan dengan auto-scroll ke bawah saat pesan baru masuk.

#### [NEW] [`NesaiMessageItem.tsx`](file:///d:/NEXTJS/nesaiFrontend/src/components/nesai/NesaiMessageItem.tsx)
Bubble pesan (user vs NESAI) dengan:
- Markdown rendering via `react-markdown` + `remark-gfm`
- Styling berbeda untuk user bubble (kanan, warna accent) dan bot bubble (kiri, warna netral)
- Error state styling

#### [NEW] [`NesaiActionChips.tsx`](file:///d:/NEXTJS/nesaiFrontend/src/components/nesai/NesaiActionChips.tsx)
Tombol navigasi interaktif dari array `actions`. Menggunakan `next/link` untuk navigasi ke halaman terkait (e.g., `/jurusan`, `/ppdb`).

#### [NEW] [`NesaiSourceBadges.tsx`](file:///d:/NEXTJS/nesaiFrontend/src/components/nesai/NesaiSourceBadges.tsx)
Badge referensi sumber data dari array `sources`, ditampilkan di bawah pesan bot.

#### [NEW] [`NesaiQuickReplies.tsx`](file:///d:/NEXTJS/nesaiFrontend/src/components/nesai/NesaiQuickReplies.tsx)
Tombol pertanyaan cepat saat awal buka chat:
- "Apa saja jurusan di SMKN 1 Subang?"
- "Kapan PPDB dibuka & apa persyaratannya?"
- "Di mana alamat dan kontak SMKN 1 Subang?"

#### [NEW] [`NesaiTypingIndicator.tsx`](file:///d:/NEXTJS/nesaiFrontend/src/components/nesai/NesaiTypingIndicator.tsx)
Animasi 3 titik bounce saat menunggu respons backend.

#### [NEW] [`NesaiChatInput.tsx`](file:///d:/NEXTJS/nesaiFrontend/src/components/nesai/NesaiChatInput.tsx)
Form input teks dengan:
- Validasi panjang teks (maks. 2000 karakter)
- Tombol kirim
- Handle Enter key
- Disabled saat loading

---

### 6. Styling

#### [NEW] [`nesai-chat.css`](file:///d:/NEXTJS/nesaiFrontend/src/app/nesai-chat.css)

CSS khusus untuk chatbot widget termasuk:
- Animasi floating button (pulse, bounce)
- Animasi buka/tutup chat window (slide-up, fade-in)
- Typing indicator animation (3 dot bounce)
- Markdown content styling (prose-like)
- Responsive layout (mobile: full-width, desktop: fixed-width popup)
- Custom scrollbar styling
- Glassmorphism & gradient effects untuk premium look

#### [MODIFY] [`globals.css`](file:///d:/NEXTJS/nesaiFrontend/src/app/globals.css)

Import `nesai-chat.css` dan tambahkan CSS custom properties (design tokens) untuk chatbot theme.

---

### 7. Integrasi ke Layout

#### [MODIFY] [`layout.tsx`](file:///d:/NEXTJS/nesaiFrontend/src/app/layout.tsx)

Tambahkan `<NesaiChatWidget />` di dalam `<body>` setelah `{children}` agar widget tersedia di semua halaman.

---

## Design Decisions

1. **Styling**: Menggunakan kombinasi Tailwind CSS utility classes + custom CSS file (`nesai-chat.css`) untuk animasi dan efek yang lebih kompleks. Ini konsisten dengan approach yang sudah ada di project.

2. **Markdown Rendering**: Menggunakan `react-markdown` + `remark-gfm` — library yang ringan dan well-maintained untuk merender markdown dalam React.

3. **Navigation**: Menggunakan `next/link` (komponen `<Link>`) untuk action chips navigasi, sesuai rekomendasi Next.js docs. `useRouter` dari `next/navigation` sebagai fallback untuk navigasi programmatik.

4. **Session Storage**: Menyimpan riwayat chat di `sessionStorage` agar percakapan tidak hilang saat user navigasi antar halaman via action chips chatbot.

5. **Component Structure**: Mengikuti persis hierarki komponen yang direkomendasikan di guide (`components/nesai/`).

---

## Verification Plan

### Build Verification
```bash
npm run build
```
Memastikan tidak ada TypeScript error dan semua komponen tercompile.

### Manual Verification
- Widget chatbot bisa dibuka/tutup via floating button
- Quick replies berfungsi mengirim pesan
- Typing indicator muncul saat loading
- Markdown rendering rapi (bold, list, numbered list)
- Action chips navigasi berfungsi (redirect ke halaman)
- Source badges muncul di bawah pesan bot
- Responsif di mobile dan desktop
- Error handling saat backend tidak aktif
- Session storage persistence saat navigasi
