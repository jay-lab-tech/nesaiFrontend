# NESAS — Full Application Product & UI/UX Blueprint

> **Product:** Website SMKN 1 Subang (NESAS)  
> **AI layer:** NESAI — conversational navigation  
> **Primary goal:** membuat informasi sekolah yang sudah tersedia menjadi jauh lebih mudah ditemukan, dipahami, dan ditindaklanjuti.

---

## 1. Product Direction

NESAS bukan sekadar website sekolah dengan halaman profil, berita, dan PPDB.

Konsep utamanya:

**Information already exists → users need a better way to discover it.**

Maka pengalaman produk dibangun di atas 4 jalur:

1. **Navigation** — pengguna sudah tahu apa yang dicari.
2. **Search** — pengguna tahu topiknya, tetapi tidak tahu letaknya.
3. **Quick Access** — kebutuhan penting yang sering dicari.
4. **NESAI** — pengguna belum tahu harus mulai dari mana atau butuh bantuan memahami pilihan.

### Core user journey

```text
ASK
 ↓
EXPLORE
 ↓
DISCOVER
 ↓
ACT
```

Contoh:

```text
"Saya suka komputer dan desain"
        ↓
      NESAI
        ↓
  Find Your Path
        ↓
  Rekomendasi Jurusan
        ↓
 Detail Jurusan
        ↓
 Skill + Mata Pelajaran
        ↓
 Karier + Alumni
        ↓
      PPDB
```

NESAI harus selalu membantu pengguna **kembali ke website**, bukan membuat chatbot yang menjadi dead-end.

---

# 2. Visual & UX Direction

## Design thesis

Jangan membuat website sekolah yang terasa seperti:

- template sekolah WordPress;
- portal berita;
- dashboard admin;
- landing page startup generik;
- chatbot yang ditempel di pojok kanan bawah.

Arah visual:

**"Modern vocational institution + editorial storytelling + intelligent interface."**

Website harus terasa seperti produk digital modern, tetapi identitas sekolah tetap kuat.

### Prinsip visual

- Editorial, bukan template.
- Spacious, tetapi bukan kosong.
- Typography-led.
- Foto aktivitas nyata sekolah menjadi bagian penting dari storytelling.
- Cards digunakan sebagai alat grouping, bukan memenuhi seluruh layar dengan card.
- AI memiliki visual language sendiri.
- Motion digunakan untuk menjelaskan hubungan antar-informasi.
- Data sekolah tampil manusiawi, bukan seperti dashboard perusahaan.
- Mobile experience harus dipikirkan sejak awal.

---

# 3. Visual Language

## Color system

Gunakan warna identitas NESAS sebagai sumber utama, tetapi jangan membuat seluruh halaman menjadi satu warna solid.

Struktur:

```text
Primary
→ warna identitas NESAS

Ink
→ warna teks utama

Paper
→ background utama

Muted
→ secondary text / metadata

Accent
→ hanya untuk action / AI / highlight

Signal
→ success / warning / important status
```

Hindari:

- gradient ungu AI yang terlalu generik;
- neon cyan/purple everywhere;
- glassmorphism berlebihan;
- shadow besar pada semua card;
- border radius ekstrem pada seluruh komponen.

### AI visual language

NESAI boleh memiliki aksen visual yang berbeda dari halaman biasa.

Contoh:

```text
Website
→ solid / editorial / institutional

NESAI
→ subtle glow / dynamic orb / animated response marker

Jembatan
→ accent color yang sama
```

AI terasa spesial tanpa mengambil alih identitas sekolah.

---

# 4. Typography

Gunakan maksimal 2 family font.

### Recommendation

```text
Display:
→ font dengan karakter editorial / contemporary

UI & Body:
→ sans-serif yang sangat readable
```

Hierarchy:

```text
Display XL
→ hero statement

Display
→ section headline

H1
→ page title

H2
→ section

Body Large
→ introductory copy

Body
→ normal content

Label / Meta
→ category, date, tag
```

Headline jangan semuanya menggunakan format:

> "Selamat Datang di Website SMKN 1 Subang"

Lebih baik menggunakan language yang berorientasi pada kebutuhan pengguna:

> **Temukan arahmu di NESAS.**

atau

> **Tidak tahu harus mulai dari mana?**

---

# 5. Global Navigation

## Desktop

Header tidak perlu terlalu tinggi.

Struktur:

```text
[ NESAS ]   Explore   Jurusan   Berita   PPDB   Alumni   [ Search ] [ Ask NESAI ]
```

### Navigation behavior

Navbar menjadi sedikit lebih compact saat scroll.

Search dapat dibuka dengan:

```text
/ 
or
⌘ K
```

NESAI dapat dibuka dengan:

```text
Ask NESAI
```

Bukan sekadar icon robot.

---

## Mobile

Bottom navigation:

```text
Home
Explore
Search
NESAI
More
```

Menu "More":

- Tentang
- Jurusan
- Berita
- PPDB
- Alumni
- Kontak

---

# 6. Page Map

```text
/
├── Home
│
├── Explore
│   ├── Jurusan
│   ├── Find Your Path
│   ├── Fasilitas
│   ├── Prestasi
│   ├── Kegiatan
│   └── Ekosistem Sekolah
│
├── Jurusan
│   └── /jurusan/[slug]
│
├── Search
│   └── /search?q=
│
├── Berita
│   ├── /berita
│   └── /berita/[slug]
│
├── PPDB
│   └── /ppdb
│
├── Alumni
│   └── /alumni
│
├── Tentang
│   ├── Profil
│   ├── Visi Misi
│   ├── Fasilitas
│   ├── Prestasi
│   └── Kontak
│
└── NESAI
    └── /nesai
```

---

# 7. HOME — The Discovery Hub

Homepage jangan menjadi kumpulan semua informasi.

Homepage adalah **starting point**.

## Section 01 — Hero

Layout tidak harus centered.

Gunakan split composition:

```text
┌───────────────────────────────────────────────┐
│                                               │
│  SMKN 1 SUBANG                               │
│                                               │
│  Temukan arahmu.                             │
│  Bangun masa depanmu.                        │
│                                               │
│  [ Explore NESAS ] [ Tanya NESAI ]           │
│                                               │
│                       [ large school image ] │
│                       [ image / motion ]     │
└───────────────────────────────────────────────┘
```

Hero image dapat berupa:

- aktivitas workshop;
- siswa praktik;
- laboratorium;
- kolase beberapa kegiatan;
- foto yang dipotong secara editorial.

Jangan gunakan stock image.

---

## Section 02 — "What brings you here?"

Buat pengguna memilih intent.

```text
Saya datang untuk...

[ Mencari jurusan ]
[ Info PPDB ]
[ Melihat kegiatan ]
[ Mencari informasi sekolah ]
[ Mengenal kehidupan siswa ]
```

Ini adalah alternative discovery path.

---

## Section 03 — Find Your Path

Jangan langsung menampilkan daftar jurusan.

Gunakan mini interaction:

```text
Apa yang paling menarik buat kamu?

[ Teknologi ]
[ Desain ]
[ Bisnis ]
[ Teknik ]
[ Kreatif ]
```

Setelah memilih:

```text
Your path is taking shape.

→ PPLG
→ TJKT
→ DKV
```

CTA:

**Explore your path →**

---

## Section 04 — NESAI

Buat NESAI sebagai bagian dari homepage, bukan hanya floating button.

Contoh:

```text
┌──────────────────────────────────────────────┐
│                                              │
│        [ animated NESAI core ]               │
│                                              │
│  Tidak tahu harus mulai dari mana?           │
│                                              │
│  "Tanya apa saja tentang NESAS."             │
│                                              │
│  [ Saya ingin mencari jurusan ]              │
│  [ Bagaimana cara PPDB? ]                   │
│  [ Apa yang dipelajari di PPLG? ]           │
│                                              │
│  [ Ask NESAI → ]                             │
└──────────────────────────────────────────────┘
```

---

## Section 05 — School in Motion

Daripada grid berita 3x3, gunakan editorial timeline.

```text
2026
 │
 ├── Competition
 ├── Student Project
 ├── Industry Visit
 └── School Event
```

Setiap item memiliki:

- tanggal;
- category;
- short title;
- image;
- CTA.

---

## Section 06 — Life at NESAS

Buat visual mosaic:

```text
┌─────────────┬───────────────┐
│             │               │
│   Workshop  │    Student    │
│             │    Activity   │
├─────────────┼───────┬───────┤
│             │       │       │
│ Lab / Tech  │ Event │ Club  │
│             │       │       │
└─────────────┴───────┴───────┘
```

Tujuan: menunjukkan sekolah sebagai tempat yang hidup.

---

## Section 07 — Alumni / Outcomes

Jangan menggunakan angka generik besar tanpa konteks.

Gunakan story:

```text
FROM NESAS → TO THE WORLD

[ Alumni portrait ]

"Di NESAS saya belajar bukan cuma skill,
tapi bagaimana mengerjakan sesuatu
sampai benar-benar jadi."

Nama Alumni
Role / Company
```

CTA:

**Explore alumni stories**

---

## Section 08 — Final CTA

```text
Belum menemukan yang kamu cari?

[ Ask NESAI ]
```

---

# 8. EXPLORE PAGE

Route:

```text
/explore
```

Purpose:

Menjadi "map" seluruh ekosistem sekolah.

Layout:

```text
Explore NESAS

[ Jurusan ]       [ Kehidupan Siswa ]
[ Fasilitas ]     [ Prestasi ]
[ Kegiatan ]      [ Alumni ]
[ PPDB ]          [ Tentang NESAS ]
```

Jangan membuat semuanya berupa card identik.

Setiap area dapat memiliki visual treatment berbeda.

---

# 9. JURUSAN INDEX

Route:

```text
/jurusan
```

Hero:

> **Temukan bidang yang cocok untukmu.**

Filter:

```text
Semua
Teknologi
Desain
Teknik
Bisnis
Lainnya
```

Jurusan ditampilkan dalam editorial list:

```text
01  PPLG
    Pengembangan Perangkat Lunak dan Gim
    [ Explore → ]

02  TJKT
    Teknik Jaringan Komputer dan Telekomunikasi
    [ Explore → ]

03  DKV
    Desain Komunikasi Visual
    [ Explore → ]
```

Tambahkan micro-preview:

- skill;
- tools;
- bidang karier;
- foto aktivitas.

---

# 10. MAJOR DETAIL PAGE

Route:

```text
/jurusan/[slug]
```

Ini harus menjadi salah satu halaman paling kuat.

## Hero

```text
PPLG

Pengembangan Perangkat Lunak
dan Gim

Build. Create. Solve.

[ Lihat skill ] [ Tanya NESAI ]
```

Background bisa berupa foto workshop atau project siswa.

---

## Section — What will you learn?

Bukan daftar panjang.

Gunakan skill map:

```text
Programming
██████████

Problem Solving
████████

UI / UX
███████

Database
██████
```

Angka/percentage jangan digunakan sebagai klaim kemampuan siswa.

Gunakan visual grouping saja.

---

## Section — Learning journey

```text
START
 ↓
Fundamental
 ↓
Project
 ↓
Industry Exposure
 ↓
Portfolio
 ↓
Career
```

---

## Section — Career map

```text
PPLG
 ├── Software Developer
 ├── Web Developer
 ├── Game Developer
 ├── UI Engineer
 └── QA / Tester
```

---

## Section — Student projects

Tampilkan project nyata.

```text
[ project ]
Project Name
Student / Team
Year
```

---

## Section — Alumni

Hubungkan jurusan dengan alumni.

---

## Section — Ask NESAI about this major

Context-aware CTA:

> "Masih bingung apakah PPLG cocok untukmu?"

[ Ask NESAI ]

NESAI harus sudah mengetahui konteks halaman:

```text
current_page = PPLG
```

---

# 11. FIND YOUR PATH

Route:

```text
/explore/find-your-path
```

Jangan terasa seperti form pendaftaran.

Buat seperti interactive journey.

## Step 01

> **Apa yang paling membuat kamu penasaran?**

Pilih beberapa:

```text
[ Membuat aplikasi ]
[ Mendesain visual ]
[ Mengutak-atik jaringan ]
[ Membuat sesuatu dengan tangan ]
[ Berbisnis ]
[ Memecahkan masalah ]
```

---

## Step 02

> **Cara kerja yang paling kamu suka?**

```text
[ Di depan komputer ]
[ Praktik langsung ]
[ Bekerja dengan tim ]
[ Membuat sesuatu dari nol ]
```

---

## Result

```text
YOUR PATH

Berdasarkan pilihanmu,
beberapa bidang yang bisa kamu eksplor:

01  PPLG
    Strong match berdasarkan minatmu

02  DKV
    Menarik jika kamu lebih suka sisi visual

03  TJKT
    Eksplor jika kamu tertarik pada infrastruktur teknologi
```

Gunakan **reasoning/explanation**, bukan hanya angka.

---

# 12. SEARCH PAGE

Route:

```text
/search
```

Search harus terasa seperti command center.

## Initial state

```text
What are you looking for?

[ Search NESAS... ]

Popular:
PPDB
PPLG
Ekstrakurikuler
Fasilitas
Alumni
```

---

## Search result

Group by content type:

```text
MAJOR
PPLG

PAGE
Informasi PPDB 2026

NEWS
Siswa NESAS Raih Prestasi...

FACILITY
Laboratorium Komputer
```

Highlight query match.

---

## Search keyboard UX

Support:

```text
/
⌘ K
ESC
↑ ↓
ENTER
```

---

# 13. QUICK ACCESS

Quick Access bukan halaman besar.

Letakkan di homepage dan navigation.

Contoh:

```text
Need something quickly?

[ PPDB ]
[ Jurusan ]
[ Jadwal ]
[ Kontak ]
[ Berita ]
```

Visualnya dapat seperti compact utility rail.

---

# 14. BERITA INDEX

Route:

```text
/berita
```

Jangan menggunakan grid card standar sebagai default.

Gunakan editorial layout:

```text
FEATURED STORY

[ Large Image ]

Title
Excerpt
Date

────────────────────────

Latest
01 ...
02 ...
03 ...
```

Filter:

```text
Semua
Prestasi
Kegiatan
Akademik
Pengumuman
```

---

# 15. BERITA DETAIL

Route:

```text
/berita/[slug]
```

Layout:

```text
Category
Title
Date

[ Full-width image ]

Article content

Related stories
```

Tambahkan:

```text
Ask NESAI about this article
```

jika relevan.

---

# 16. PPDB PAGE

Route:

```text
/ppdb
```

PPDB harus menjadi task-oriented page.

Hero:

> **Mau masuk NESAS? Mulai dari sini.**

Primary actions:

```text
[ Persyaratan ]
[ Alur Pendaftaran ]
[ Jadwal ]
[ FAQ ]
[ Tanya NESAI ]
```

---

## Admission timeline

```text
01
Persiapan

02
Pendaftaran

03
Verifikasi

04
Seleksi

05
Pengumuman
```

Gunakan timeline visual.

---

## Important information

Gunakan hierarchy:

```text
OPEN / ACTIVE
Deadline
Dokumen
Link resmi
```

Jika data belum tersedia, jangan membuat tanggal palsu.

---

# 17. ALUMNI PAGE

Route:

```text
/alumni
```

Purpose:

Menunjukkan outcome dan network.

Hero:

> **Dari NESAS, ke mana mereka melangkah?**

Alumni stories:

```text
[ Portrait ]

Nama
Jurusan
Graduation Year
Current Role

"Short quote..."
```

Filter berdasarkan jurusan atau tahun jika datanya tersedia.

---

# 18. ABOUT / PROFIL

Route:

```text
/tentang
```

Jangan membuat halaman profil seperti dokumen PDF yang dipindahkan ke web.

Gunakan narrative:

```text
Who we are
↓
Our story
↓
Vision & mission
↓
People
↓
Facilities
↓
Achievements
```

---

# 19. FACILITIES

Route:

```text
/tentang/fasilitas
```

Gunakan immersive gallery.

```text
[ Large image ]

LABORATORIUM KOMPUTER

Tempat siswa...
```

Kategori:

```text
Learning
Workshop
Technology
Student Life
```

---

# 20. ACHIEVEMENTS

Route:

```text
/tentang/prestasi
```

Gunakan timeline:

```text
2026
National Competition
Student Name
Achievement

2025
...
```

Bukan hanya kumpulan badge.

---

# 21. CONTACT

Route:

```text
/tentang/kontak
```

Struktur:

```text
Address
Phone
Email
Social Media
Map
Office Hours
```

Jika ada informasi yang belum tersedia di database, jangan di-hardcode sebagai fakta.

---

# 22. NESAI — MAIN EXPERIENCE

Route:

```text
/nesai
```

Ini bukan halaman chatbot biasa.

## Initial screen

```text
                  NESAI

       Apa yang ingin kamu cari?

    ┌─────────────────────────────┐
    │ Tanya tentang NESAS...      │
    └─────────────────────────────┘

    Try asking:

    "Jurusan apa yang cocok buat saya?"
    "Bagaimana cara daftar PPDB?"
    "Apa yang dipelajari di PPLG?"
    "Ada kegiatan apa minggu ini?"
```

---

# 23. NESAI CHAT UX

Layout:

```text
┌────────────────────────────────────────────────┐
│ NESAI                         New conversation │
├───────────────┬────────────────────────────────┤
│               │                                │
│ Conversation  │          NESAI                 │
│ history       │                                │
│               │   User question                │
│               │                                │
│               │   AI response                  │
│               │                                │
│               │   [ Explore PPLG ]             │
│               │   [ Open PPDB ]                │
│               │                                │
│               │                                │
│               ├────────────────────────────────┤
│               │ Ask NESAI...              ↑    │
└───────────────┴────────────────────────────────┘
```

---

# 24. NESAI RESPONSE DESIGN

Jangan membuat semua jawaban menjadi paragraf.

Response harus dapat memiliki blocks:

```text
Answer
↓
Relevant information
↓
Suggested actions
↓
Source/page links
```

Contoh:

```text
NESAI

Kalau kamu suka membuat aplikasi dan
memecahkan masalah, PPLG bisa menjadi
salah satu bidang yang menarik untuk kamu
eksplor.

Yang bisa kamu pelajari:
• Programming
• Database
• Web development

Explore:
[ Lihat PPLG ]
[ Cari jurusan lain ]
```

AI tidak boleh mengarang informasi sekolah.

---

# 25. NESAI CONTEXT AWARENESS

Jika user berada di:

```text
/jurusan/pplg
```

dan bertanya:

> "Cocok gak buat saya?"

NESAI menerima context:

```text
page = major
major = PPLG
```

Sehingga response dapat langsung relevan.

Jika user berada di:

```text
/ppdb
```

NESAI otomatis memprioritaskan konteks PPDB.

---

# 26. NESAI MOBILE UX

Mobile harus terasa seperti native conversational experience.

```text
┌─────────────────────┐
│ ← NESAI             │
│                     │
│      response       │
│                     │
│      response       │
│                     │
│ [ suggestion chip ] │
│                     │
│ Ask NESAI...     ↑  │
└─────────────────────┘
```

Bottom input harus sticky.

---

# 27. NESAI MICROINTERACTION

Gunakan subtle motion:

### Thinking

```text
● ● ●
```

atau animated AI core.

### Retrieval

Tampilkan secara subtle:

```text
Finding relevant NESAS information...
```

Bukan menampilkan technical log.

### Response

Text dapat muncul progressively.

### Navigation

Saat NESAI mengarahkan user ke halaman:

```text
→ Opening PPLG
```

Kemudian route transition.

---

# 28. GLOBAL AI ENTRY POINT

Jangan selalu menggunakan floating chatbot bubble.

Alternatif:

### Desktop

Persistent top action:

```text
[ Ask NESAI ]
```

### Homepage

Full section.

### Detail pages

Contextual CTA.

### Mobile

Bottom navigation item.

Dengan begitu NESAI terasa sebagai **product capability**, bukan widget tempelan.

---

# 29. EMPTY STATES

Jangan menggunakan:

> "No data found."

Gunakan contextual empty state.

Search:

> **Belum menemukan yang cocok.**  
> Coba kata lain atau tanyakan langsung ke NESAI.

[ Ask NESAI ]

---

# 30. LOADING STATES

Gunakan skeleton yang mengikuti layout asli.

Jangan spinner besar di tengah halaman.

Untuk NESAI:

```text
AI core
+
small status text
```

---

# 31. ERROR STATES

Contoh:

> **NESAI sedang tidak dapat diakses.**

> Kamu tetap bisa menjelajahi informasi sekolah melalui Search atau Navigation.

[ Search NESAS ] [ Explore ]

---

# 32. RESPONSIVE SYSTEM

## Desktop

Primary target:

```text
1440px
1280px
```

## Tablet

```text
1024px
768px
```

## Mobile

```text
390px
360px
```

Design harus dibuat mobile-first untuk interaction penting:

- Search
- Find Your Path
- NESAI
- PPDB

---

# 33. MOTION SYSTEM

Motion harus memiliki fungsi.

### Page transition

Subtle fade + translate.

### Cards

Small image scale on hover.

### Navigation

Smooth indicator.

### Find Your Path

Progressive transition antar-step.

### NESAI

Animated core saat aktif.

Hindari:

- parallax berlebihan;
- loading animation panjang;
- random floating elements;
- excessive 3D;
- animation yang memperlambat task.

---

# 34. COMPONENT SYSTEM

Suggested reusable components:

```text
Navbar
MobileNav
SearchCommand
SearchResults
SectionHeader
EditorialCard
NewsCard
MajorCard
MajorHero
SkillMap
CareerMap
Timeline
AlumniStory
ImageMosaic
QuickAccess
IntentSelector
PathQuestion
PathResult
NesaiLauncher
NesaiChat
NesaiMessage
NesaiAction
NesaiSource
Breadcrumb
Footer
```

---

# 35. DESIGN TOKENS

Gunakan token, jangan hardcode style di setiap component.

```text
colors
typography
spacing
radius
shadow
motion
container
breakpoints
```

Example spacing:

```text
4
8
12
16
24
32
48
64
96
128
```

Radius jangan semuanya sama.

Gunakan:

```text
small
medium
large
pill
```

secara kontekstual.

---

# 36. ACCESSIBILITY

Minimum:

- semantic HTML;
- keyboard navigation;
- visible focus state;
- sufficient contrast;
- alt text;
- form labels;
- aria-label untuk icon-only button;
- reduced-motion support;
- readable line length;
- touch target minimum yang nyaman.

---

# 37. DATA / CONTENT PRINCIPLE

Frontend tidak boleh menjadi sumber data utama.

```text
Laravel API
     ↓
PostgreSQL
     ↓
Frontend
```

NESAI:

```text
User
 ↓
Laravel
 ↓
Retrieve school data
 ↓
LLM
 ↓
Structured response
 ↓
Frontend
```

LLM bukan database sekolah.

---

# 38. URL / ROUTING CONTRACT

Frontend:

```text
/
 /explore
 /explore/find-your-path
 /jurusan
 /jurusan/[slug]
 /search
 /berita
 /berita/[slug]
 /ppdb
 /alumni
 /tentang
 /tentang/fasilitas
 /tentang/prestasi
 /tentang/kontak
 /nesai
```

Backend:

```text
GET  /api/v1/school
GET  /api/v1/majors
GET  /api/v1/majors/{slug}
GET  /api/v1/news
GET  /api/v1/news/{slug}
GET  /api/v1/ppdb
GET  /api/v1/alumni
GET  /api/v1/search?q={query}

POST /api/v1/recommendations/majors
POST /api/v1/nesai/chat
```

---

# 39. NON-GOALS

Jangan melebar menjadi:

- LMS;
- e-learning;
- student attendance system;
- online exam;
- full school management system;
- social network siswa;
- AI yang menjawab semua hal tanpa sumber.

Untuk MVP, produk adalah:

**School website + intelligent discovery layer.**

---

# 40. MVP PRIORITY

## P0 — Must Have

```text
Homepage
Navigation
Major pages
Search
Find Your Path
PPDB
NESAI
Responsive UI
```

## P1

```text
News
Alumni
Facilities
Achievements
Context-aware NESAI
Advanced motion
```

## P2

```text
Personalization
Analytics
Admin CMS enhancements
More advanced recommendation
```

---

# 41. UX RULES FOR CODEX

Saat meminta Codex mengimplementasikan UI:

1. Jangan membuat UI berdasarkan asumsi "website sekolah".
2. Jangan memakai template landing page generik.
3. Jangan membuat semua section sebagai card grid.
4. Jangan menggunakan gradient AI generik sebagai visual utama.
5. Jangan menaruh chatbot bubble sebagai satu-satunya AI UX.
6. Jangan membuat hero centered secara default.
7. Jangan mengisi halaman dengan statistik palsu.
8. Jangan mengarang data sekolah.
9. Gunakan data nyata dari API.
10. Prioritaskan information hierarchy.
11. Gunakan motion hanya jika membantu comprehension.
12. Pastikan mobile UX bukan versi desktop yang diperkecil.
13. Cari referensi visual terlebih dahulu sebelum implementasi.
14. Referensi boleh dari Dribbble, tetapi jangan menyalin satu desain.
15. Gabungkan beberapa referensi menjadi visual language NESAS sendiri.

---

# 42. DRIBBBLE RESEARCH DIRECTIONS

Gunakan Dribbble sebagai **referensi visual**, bukan sumber implementasi copy-paste.

Search terms yang disarankan:

```text
education website
school website
education platform
edtech landing page
student portal
school dashboard
education editorial website
career guidance platform
AI education platform
AI assistant interface
conversational UI
AI chat interface
editorial web design
modern university website
vocational education website
```

Beberapa hasil Dribbble yang relevan untuk dijadikan starting references:

- Education Website Dashboard
- School Dashboard
- Online School Dashboard
- Education Website
- AI Assistant UI
- AI education platform
- Career guidance platform

Gunakan referensi yang berbeda untuk:

```text
Homepage
→ editorial / education website

Find Your Path
→ career guidance / onboarding

Major Detail
→ editorial + career platform

NESAI
→ conversational AI interface

PPDB
→ task-oriented service page
```

Jangan mencari satu desain lalu menjadikannya blueprint seluruh website.

---

# 43. CODEX DESIGN RESEARCH PROMPT

Gunakan prompt berikut ketika meminta Codex melakukan research UI:

```text
Before implementing the NESAS website UI, research current visual references on Dribbble.

Search specifically for:
- modern education websites
- vocational education websites
- university websites
- career guidance platforms
- editorial education websites
- AI assistant interfaces
- conversational AI UI
- student portals

Do NOT copy one design.

Extract design patterns from multiple references:
- layout composition
- typography hierarchy
- navigation behavior
- card usage
- editorial grids
- image treatment
- interaction patterns
- AI interaction patterns
- motion language
- responsive behavior

Then create a unique visual system for NESAS.

The product must feel like:
modern vocational institution + editorial storytelling + intelligent navigation.

Avoid:
- generic school website templates
- generic SaaS landing pages
- generic purple AI gradients
- excessive glassmorphism
- card-grid-everywhere
- chatbot bubble as the only AI interaction
- fake statistics
- stock-photo-heavy layouts

The UI should make users discover information naturally.
NESAI should feel like an intelligent navigation layer, not a separate chatbot product.
```

---

# 44. CODEX IMPLEMENTATION PROMPT

```text
You are implementing the NESAS website.

Product concept:
NESAS is the digital information and discovery platform for SMKN 1 Subang.

Core UX:
Navigation + Search + Quick Access + NESAI.

NESAI is conversational navigation, not a standalone chatbot.

Tech:
Frontend = Next.js + TypeScript + Tailwind + shadcn/ui
Backend = Laravel REST API
Database = PostgreSQL

Frontend and backend are separate applications.

Important:
- Do not invent school data.
- Use API data.
- Keep UI components reusable.
- Keep design tokens centralized.
- Build responsive layouts.
- Use semantic HTML.
- Implement keyboard accessibility.
- Use subtle meaningful motion.
- Do not overuse cards.
- Do not make every section look like a dashboard.
- Keep pages editorial and information-oriented.
- Make the website feel premium and distinctive.

Pages:
/
 /explore
 /explore/find-your-path
 /jurusan
 /jurusan/[slug]
 /search
 /berita
 /berita/[slug]
 /ppdb
 /alumni
 /tentang
 /tentang/fasilitas
 /tentang/prestasi
 /tentang/kontak
 /nesai

Core components:
Navbar
SearchCommand
QuickAccess
IntentSelector
MajorCard
MajorHero
SkillMap
CareerMap
Timeline
AlumniStory
ImageMosaic
PathQuestion
PathResult
NesaiLauncher
NesaiChat
NesaiMessage
NesaiAction
NesaiSource

Before coding each major page:
1. Research relevant Dribbble references.
2. Identify 3–5 useful patterns.
3. Combine them into an original composition.
4. Implement.
5. Verify desktop and mobile.
```

---

# 45. FINAL PRODUCT FEEL

Target feeling:

```text
User opens NESAS
        ↓
"Ini bukan website sekolah biasa."
        ↓
They immediately understand
where to start.
        ↓
They can browse naturally.
        ↓
If they are lost:
NESAI helps.
        ↓
NESAI points them back to
real information.
        ↓
They continue exploring.
        ↓
They take action.
```

The product should communicate:

> **NESAS memiliki banyak informasi. NESAI membuat informasi itu terasa dekat.**

---

# 46. SUCCESS CRITERIA

The UI/UX is successful if:

### Discovery

User can find a major, PPDB information, or relevant school content without knowing the exact URL.

### Understanding

User can understand what a major is, what is learned, and where it can lead.

### Guidance

User who does not know what to search can start with Find Your Path or NESAI.

### Continuity

NESAI responses lead into real pages and actions.

### Identity

The website feels specifically designed for NESAS rather than being a generic school template.

### Technical

The interface maps cleanly to:

```text
Next.js
   ↓
Laravel API
   ↓
PostgreSQL
```

and NESAI can use retrieved school data as its factual context.

---

# 47. ONE-LINE PRODUCT DEFINITION

**NESAS is a modern school information platform where users can navigate, search, discover their path, and ask NESAI for guidance.**


---

# 48. FINAL TECH STACK & VERSION LOCK

**Reference date:** 18 September 2026.

Untuk development team, gunakan major/minor version yang sama. Patch version boleh mengikuti lockfile (`package-lock.json` / `composer.lock`) setelah repository dibuat.

## Frontend

```text
Next.js        16.3.5
React          19.3.0
Node.js        24.21.0 LTS
npm            11.19.0
TypeScript     5.9.2
Tailwind CSS   4.3.3
shadcn/ui      4.21.0
```

Next.js 16 membutuhkan Node.js minimal 20.9. Untuk tim NESAS, gunakan Node.js 24.21.0 LTS agar semua anggota memakai runtime LTS yang sama.

React 19.3 sudah stable. Tailwind CSS 4.3 adalah current v4 line. shadcn/ui memakai CLI package `shadcn`; project baru memakai Base UI sebagai default component foundation. Radix tetap didukung.

## Backend

```text
Laravel        13.x
PHP            8.5.x
Composer       2.10.x
```

Laravel 13 membutuhkan PHP 8.3+ dan mendukung PHP 8.3–8.5. Untuk tim NESAS, gunakan PHP 8.5.x.

Do not pin Laravel ke patch tertentu di dokumentasi. Gunakan:

```text
^13.0
```

dan commit `composer.lock` supaya semua anggota memakai dependency result yang sama.

## Database

```text
PostgreSQL     18.x
```

Gunakan PostgreSQL 18.x untuk development dan production, dengan patch release terbaru yang tersedia pada environment masing-masing.

Untuk fitur Search MVP:

```text
PostgreSQL Full-Text Search
```

Tidak perlu Elasticsearch atau vector database untuk tahap MVP.

## Infrastructure

```text
Local development
→ Laragon

Production
→ VPS panitia
→ Docker Compose
→ Nginx
→ Next.js
→ Laravel
→ PostgreSQL
```

Docker tidak wajib untuk local development. Docker dipakai untuk menyamakan environment production dan deployment VPS.

---

# 49. LARAGON — LOCAL DEVELOPMENT STANDARD

Semua anggota sudah menggunakan Laragon, jadi jangan membuat setup local yang berbeda-beda.

Recommended:

```text
Laragon      8.7.x
PHP          8.5.x
Node.js      24.21.0 LTS
npm          11.19.0
PostgreSQL   18.x
Git          bundled / current stable
Composer     2.10.x
```

Laragon Full menyediakan PHP, Node.js, npm, Composer, Git, dan beberapa versi PostgreSQL. Pastikan versi yang aktif sesuai project standard di atas.

### Laragon checklist

Buka:

```text
Laragon
→ Menu
→ PHP
→ Version
```

Pilih:

```text
PHP 8.5.x
```

Lalu:

```text
Menu
→ Node.js
→ Version
```

Pilih:

```text
Node.js 24.21.0
```

Database:

```text
Menu
→ PostgreSQL
```

Pastikan PostgreSQL 18.x tersedia dan aktif.

Jalankan Laragon Terminal dan cek:

```bash
php -v
composer -V
node -v
npm -v
psql --version
git --version
```

Expected baseline:

```text
PHP       8.5.x
Composer  2.10.x
Node      24.21.0
npm       11.19.0
Postgres  18.x
Git       current stable
```

---

# 50. SOFTWARE YANG PERLU DISIAPKAN

## Semua anggota

Minimal:

```text
Laragon 8.7.x
VS Code / editor pilihan
Git
GitHub account
Browser modern
```

Tidak perlu install PHP, Composer, atau Node secara global apabila semuanya sudah tersedia melalui Laragon.

Laragon dapat menambahkan environment-nya ke PATH melalui:

```text
Laragon
→ Tools
→ Path
→ Add Laragon to Path
```

## Frontend members

Pastikan tersedia:

```text
Node.js 24.21.0
npm 11.19.0
```

Tidak perlu install Yarn atau pnpm.

Gunakan **npm** sebagai package manager resmi project supaya semua anggota menjalankan workflow yang sama.

## Backend / Database members

Pastikan tersedia:

```text
PHP 8.5.x
Composer 2.10.x
PostgreSQL 18.x
```

---

# 51. OPTIONAL TOOLS — TIDAK WAJIB

Tools berikut berguna, tetapi jangan dijadikan dependency wajib untuk semua anggota:

```text
DBeaver
Postman / Insomnia
Docker Desktop
Figma
GitHub Desktop
```

Rekomendasi:

```text
API testing
→ Postman atau Insomnia

Database inspection
→ DBeaver atau pgAdmin

Production
→ Docker + Docker Compose
```

Local project tetap dapat berjalan tanpa Docker.

---

# 52. REPOSITORY INITIALIZATION

Root repository:

```text
nesas/
├── frontend/
├── backend/
├── deployment/
├── docs/
├── .gitignore
└── README.md
```

## Create frontend

```bash
cd nesas

npx create-next-app@16.3.5 frontend \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"
```

Masuk ke frontend:

```bash
cd frontend
```

Initialize shadcn:

```bash
npx shadcn@latest init
```

Gunakan shadcn sebagai source component yang dimiliki project, bukan sebagai black-box UI library.

Tambahkan component hanya saat dibutuhkan:

```bash
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add dialog
npx shadcn@latest add command
npx shadcn@latest add sheet
npx shadcn@latest add tabs
```

Jangan install semua component sekaligus.

## Create backend

Dari root:

```bash
cd ../

composer create-project laravel/laravel:^13.0 backend
```

Masuk:

```bash
cd backend
```

Copy environment:

```bash
cp .env.example .env
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Generate application key:

```bash
php artisan key:generate
```

---

# 53. POSTGRESQL DATABASE

Create database:

```text
nesas
```

Example local configuration:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=nesas
DB_USERNAME=postgres
DB_PASSWORD=YOUR_LOCAL_PASSWORD
```

Jangan commit:

```text
.env
```

Commit:

```text
.env.example
```

---

# 54. LOCAL RUNNING STANDARD

## Backend

From:

```text
backend/
```

Run:

```bash
php artisan serve --host=127.0.0.1 --port=8000
```

API:

```text
http://127.0.0.1:8000/api/v1
```

## Frontend

From:

```text
frontend/
```

Run:

```bash
npm run dev
```

Frontend:

```text
http://localhost:3000
```

## Final local topology

```text
Browser
   │
   ├── http://localhost:3000
   │        ↓
   │     Next.js
   │        │
   │        │ REST API
   │        ↓
   └── http://127.0.0.1:8000
            ↓
         Laravel
            ↓
       PostgreSQL
          :5432
```

---

# 55. FRONTEND ENVIRONMENT

Create:

```text
frontend/.env.local
```

Example:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api/v1
```

Never put private LLM API keys into `NEXT_PUBLIC_*`.

Correct:

```text
LLM_API_KEY
→ Laravel backend .env
```

Incorrect:

```text
NEXT_PUBLIC_LLM_API_KEY
```

---

# 56. BACKEND ENVIRONMENT

Backend `.env` should contain:

```env
APP_NAME=NESAS
APP_ENV=local
APP_DEBUG=true

APP_URL=http://127.0.0.1:8000

DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=nesas
DB_USERNAME=postgres
DB_PASSWORD=

FRONTEND_URL=http://localhost:3000

LLM_API_KEY=
LLM_MODEL=
```

Exact LLM provider/model is intentionally not locked until the AI implementation phase.

---

# 57. CORS STANDARD

Laravel must allow the local frontend:

```text
http://localhost:3000
```

Production:

```text
https://DOMAIN-NESAS
```

Do not use:

```text
Access-Control-Allow-Origin: *
```

for authenticated/private API endpoints.

---

# 58. DEPENDENCY POLICY

Project-wide:

```text
DO
✓ commit package-lock.json
✓ commit composer.lock
✓ document runtime versions
✓ use exact major versions consistently
✓ update dependencies deliberately
```

Avoid:

```text
✗ random package installation
✗ different package managers per member
✗ uncommitted lockfile changes
✗ installing unnecessary UI libraries
✗ changing framework major version during feature work
```

Before adding a package:

```text
1. Check whether native Next.js / Laravel can solve it.
2. Check whether shadcn component can solve it.
3. Check maintenance status.
4. Check bundle/runtime impact.
5. Inform Azhar before adding project-wide dependency.
```

---

# 59. GIT STANDARD

Branches:

```text
main
develop
feature/*
fix/*
refactor/*
```

Examples:

```text
feature/homepage
feature/nesai-chat
feature/find-your-path
feature/search
fix/mobile-navbar
```

Commit examples:

```text
feat(frontend): add major detail page
feat(backend): add major API
feat(nesai): add retrieval service
fix(search): handle empty query
```

Never commit:

```text
.env
.env.local
API keys
database dumps containing credentials
node_modules/
vendor/
.next/
```

---

# 60. FIRST-DAY CHECKLIST

Setiap anggota harus bisa menjalankan:

```bash
php -v
composer -V
node -v
npm -v
psql --version
git --version
```

Kemudian:

```bash
git clone <repository>
cd nesas

cd backend
composer install
php artisan key:generate
php artisan migrate --seed
php artisan serve --port=8000
```

Terminal kedua:

```bash
cd frontend
npm ci
npm run dev
```

Expected:

```text
Frontend → http://localhost:3000
Backend  → http://127.0.0.1:8000
Database → PostgreSQL :5432
```

---

# 61. VERSION LOCK RULE FOR CODEX

Codex harus membaca version standard sebelum membuat atau mengubah dependency.

Use:

```text
Next.js        16.3.5
React          19.3.0
Node.js        24.21.0 LTS
TypeScript     5.9.2
Tailwind CSS   4.3.3
shadcn/ui      4.21.0
Laravel        13.x
PHP            8.5.x
Composer       2.10.x
PostgreSQL     18.x
```

Do not automatically upgrade a framework major version.

Do not replace:

```text
Next.js
Laravel
PostgreSQL
```

with another framework/database unless the technical lead explicitly changes the architecture.

For dependency installation, prefer the project's existing lockfile over "latest".

---

# 62. IMPORTANT NOTE ABOUT VERSION PINNING

Runtime versions should be standardized at team level, but framework patch versions should be locked by repository lockfiles.

Therefore:

```text
Runtime:
Node 24.21.0
PHP 8.5.x
PostgreSQL 18.x
```

Framework:

```text
Next.js 16.3.x
Laravel 13.x
React 19.3.x
```

Repository lockfiles determine the exact installed patch versions.

This avoids the situation where two developers run different dependency graphs even though they use the same framework major version.

---

# 63. PRODUCTION DEPLOYMENT NOTE

Local:

```text
Laragon
```

Production:

```text
Docker Compose
```

Do not deploy Laragon to the competition VPS.

Production containers:

```text
nginx
frontend
backend
postgres
```

Optional later:

```text
redis
queue worker
```

Redis should only be added when the application actually needs queues/cache/session scaling.

---

# 64. TECHNICAL BASELINE SUMMARY

```text
┌───────────────────────────────────────────┐
│ FRONTEND                                  │
│ Next.js 16.3.x                            │
│ React 19.3.x                              │
│ TypeScript 5.9.x                          │
│ Tailwind CSS 4.3.x                        │
│ shadcn/ui 4.x                             │
│ Node.js 24 LTS                            │
├───────────────────────────────────────────┤
│ BACKEND                                   │
│ Laravel 13.x                              │
│ PHP 8.5.x                                 │
│ Composer 2.10.x                           │
├───────────────────────────────────────────┤
│ DATABASE                                  │
│ PostgreSQL 18.x                           │
├───────────────────────────────────────────┤
│ LOCAL                                     │
│ Laragon 8.7.x                             │
├───────────────────────────────────────────┤
│ PRODUCTION                                │
│ VPS + Docker Compose + Nginx              │
└───────────────────────────────────────────┘
```
