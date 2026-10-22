# PRODUCT REQUIREMENTS DOCUMENT (PRD)
## IT Portfolio — Light Minimalist

**Versi:** 1.0 — implementation-ready  
**Status:** Approved visual direction; ready for development  
**Tipe produk:** Personal IT / AI portfolio, single-page static website  
**Sumber kebenaran visual:** [Figma V4 FINAL — node 22:2](https://www.figma.com/design/T1DrZs505u4Lc7jTysqXMS?node-id=22-2)  
**Referensi perilaku galeri:** [ArleneNero/portofolio](https://github.com/ArleneNero/portofolio) (`script.js` dan `style.css`)  
**Identitas:** placeholder wajib **ISI NAMA** sampai pemilik menggantinya.

> Aturan utama: jangan redesign Figma yang sudah di-ACC. Implementasikan website yang terasa dan terlihat setia pada desain final, tetapi adaptif, responsif, accessible, dan maintainable. Repo GitHub referensi hanya untuk perilaku galeri/modal, bukan untuk palet, layout, atau komposisi.

---

## 1. Ringkasan Produk

Bangun website portofolio personal untuk mahasiswa / developer IT dengan penekanan kemampuan **Machine Learning, Natural Language Processing, RAG / Generative AI, data, dan software development**. Bahasa tampilan awal **Inggris** mengikuti Figma; seluruh konten harus mudah diganti dari data terpusat. Tampilan **light minimalist** beraksen soft cyan pada hero (bukan dekorasi berlebihan). Halaman tunggal, navigasi floating, hero berpusat, area About Me langsung setelah landing, katalog proyek bergeser horizontal, popup detail proyek dengan galeri screenshot, Skills, Experience, Awards, dan Contact.

## 2. Tujuan dan Ukuran Keberhasilan

1. Pengunjung langsung paham siapa developer ini dan minat spesialisasinya dalam 5–10 detik.
2. Pengunjung dapat menjelajahi proyek, membaca case study, serta membuka tautan demo/source code yang valid.
3. Pemilik bisa **menambahkan, menyunting, menyembunyikan, mengurutkan, atau menghapus proyek dengan mengubah satu file data** dan meletakkan gambar pada direktori yang terdokumentasi.
4. Website layak dipresentasikan sebagai portofolio profesional dan diakses di desktop, tablet, dan smartphone.
5. Tidak menggunakan backend, admin dashboard, CMS, login, maupun database pada MVP.

**Acceptance indicators:** Lulus build/lint/test, semua navigasi dan modal berfungsi, tidak ada scroll trap, tidak ada broken asset, dan semua fitur dapat dipakai via keyboard/touch.

## 3. Target Pengguna

- **Recruiter / HR:** meninjau profil, keterampilan, pengalaman, penghargaan, CV, serta kontak.
- **Engineer / reviewer teknis:** melihat screenshot, latar belakang masalah, solusi, teknologi, GitHub, dan demo proyek.
- **Pemilik portofolio:** memperbarui data proyek dan profil tanpa perlu mengedit struktur JSX.

## 4. Ruang Lingkup

### In scope — MVP

- Single-page responsive website; Vite + React + TypeScript + Tailwind CSS.
- Fixed/floating pill-shaped top navbar, active section indicator, smooth anchor navigation, mobile adaptation.
- Hero berpusat dengan `Hi, I'm`, **ISI NAMA**, deskripsi, availability badge, glow cyan halus, tombol `View My Work` dan `Download CV`, serta scroll cue.
- **About Me tepat setelah hero**, dengan portrait, deskripsi, statistik opsional dari data.
- **Selected Projects:** horizontal snap carousel, card preview, mouse drag, native touch swipe, tombol prev/next bila diperlukan, progress/index, card opens detail modal.
- Modal project: screenshot carousel dengan prev/next, `01 / NN`, key information, problem, solution, stack, valid links.
- Skills dikelompokkan: ML; NLP & Generative AI; Programming/Data; Software Development/Tools, semuanya data-driven.
- Experience, Awards/Achievements, Contact, Footer.
- SEO dasar, responsive images, keyboard accessibility, reduced-motion support, loading/empty states.
- Data dummy secara eksplisit untuk demo; tidak boleh diklaim sebagai fakta pengalaman atau penghargaan asli.
- Deployment-ready static build (GitHub Pages maupun layanan static hosting lainnya).

### Out of scope — MVP

- Login, dashboard admin, CMS, Supabase/Firebase/database untuk mengelola proyek.
- Komentar publik, guestbook, pembayaran, form kontak dengan backend.
- AI chatbot di website portofolio, analytics yang dimanipulasi, animasi 3D, efek parallax berat.
- Blog full-featured, sistem multibahasa, filter kompleks, tema gelap (boleh backlog).

## 5. Struktur Informasi / Urutan Halaman

1. **Home / Landing** — hero centered.
2. **About Me** — bio, portrait, statistik yang bisa diedit.
3. **Projects** — horizontal carousel, modal detail.
4. **Skills** — kategori kemampuan yang benar-benar relevan.
5. **Experience** — timeline atau daftar sederhana.
6. **Awards** — penghargaan/pencapaian, bisa kosong atau disembunyikan.
7. **Contact** — email, GitHub, LinkedIn, CTA.

**Navbar:** `Home · About · Projects · Skills · Experience · Awards · Contact`. Navbar mengikuti urutan konten, aktif saat scrolling, dan tidak menimpa anchor target. Layar kecil menggunakan menu aksesibel, bukan tujuh label yang dipaksa menjadi sangat kecil.

## 6. Functional Requirements (FR)

| ID | Feature | Requirement | Prioritas |
|---|---|---|---|
| FR-01 | Main layout | Implementasi setia pada Figma V4, proper hierarchy, whitespace, dan responsivitas | P0 |
| FR-02 | Navbar | Navigasi anchor, keyboard usable, aktif sesuai section, mobile menu | P0 |
| FR-03 | Hero | `ISI NAMA`, availability badge, deskripsi, CTA bekerja dan fallback CV | P0 |
| FR-04 | About | Muncul **tepat setelah landing** dengan konten editable | P0 |
| FR-05 | Project data | Kartu/isi modal dirender dari **satu sumber data** | P0 |
| FR-06 | Project carousel | Native horizontal scroll + snap, mouse drag, touch swipe, navigasi tombol | P0 |
| FR-07 | Carousel controls | Progress/status mengikuti posisi nyata; jangan membajak scroll pengguna | P0 |
| FR-08 | Modal | Klik project membuka modal spesifik sesuai slug/id; tutup via X/Escape/backdrop | P0 |
| FR-09 | Gallery | Prev/next screenshot, counter dinamis, disabled ketika perlu, tanpa broken image | P0 |
| FR-10 | Links | Demo/GitHub hanya muncul jika URL diisi; eksternal `noopener noreferrer` | P0 |
| FR-11 | Content editing | Profile, Skills, Experience, Awards, Social disimpan di file data terpisah | P0 |
| FR-12 | Empty states | Tanpa project/award/CV harus tetap tampil rapi dan tidak crash | P0 |
| FR-13 | Accessibility | Focus trapping pada modal, restore focus, keyboard, alt text, contrast | P0 |
| FR-14 | SEO | Title, metadata, OpenGraph fallback, favicon, semantic sections | P1 |
| FR-15 | UX polish | Hover scale subtle, modal fade/slide, progress, respect prefers-reduced-motion | P1 |
| FR-16 | Shareable details | Optional URL `?project=slug` agar proyek dapat dibuka langsung | P2 |

## 7. Spesifikasi Interaksi Proyek

### Carousel horizontal

- `overflow-x: auto`; `scroll-snap-type: x mandatory` atau `proximity` sesuai uji usability; setiap kartu `scroll-snap-align: start`.
- Kartu pertama terlihat lengkap, kartu sesudahnya terlihat sebagian sebagai affordance arah scroll.
- **Desktop:** mouse drag/pointer drag dengan threshold ~6–8px; drag tidak boleh tidak sengaja membuka modal; tombol kiri/kanan berguna bagi pengguna non-trackpad.
- **Touch:** native swipe; hindari konflik dengan scroll vertikal; jangan memaksa `preventDefault` di touch tanpa alasan.
- **Mouse wheel:** jika ditambahkan konversi wheel vertical→horizontal seperti referensi, lakukan **hanya saat pointer berada di galeri dan galeri masih bisa bergerak ke arah itu**. Pada tepi galeri, biarkan scroll halaman normal. Jangan membuat scroll trap. Prefer opsi progresif bila UX belum teruji.
- Scroll progress/index harus berdasarkan `scrollLeft`, `clientWidth`, dan `scrollWidth` aktual; tidak boleh angka statis.
- Hover gambar maksimal ~`scale(1.03–1.06)` dan cards lift 2–4px; no aggressive glow.

### Popup detail

- Modal dapat dibuka dari kartu apa pun.
- Overlay dengan panel putih, radius 16–20px, backdrop redup tipis.
- Screenshot gallery 1..N, tombol `Prev`, `Next`, indeks `01 / 0N`; item pertama gambar cover atau media pertama; opsi wrap ditentukan konsisten (rekomendasi disable ujung).
- `Escape`, tombol `X`, dan klik backdrop menutup modal; fokus dikembalikan ke kartu yang membuka.
- Ketika modal aktif: scroll background dikunci, focus tetap di modal, tab navigation logis, dialog memiliki judul yang diasosiasikan.
- Pada perangkat kecil: modal menjadi full-height sheet/scrollable dialog tanpa konten terpotong.
- Jangan membuka tautan demo/source yang kosong; gambar memiliki alt dan fallback.

## 8. Model Konten

Semua data tersedia secara lokal di `src/data/`. Paling penting **`src/data/projects.ts`**, yang menjadi sumber kebenaran project list dan modal.

### Project entity (minimum)

| Field | Type | Penjelasan |
|---|---|---|
| `id`, `slug` | string | Stable unique ID dan URL slug |
| `title`, `summary` | string | Judul dan ringkasan singkat |
| `category`, `year` | string | Kategori dan waktu |
| `description` | string | Penjelasan detail |
| `problem`, `solution` | string | Case study |
| `stack` | string[] | Teknologi yang digunakan |
| `cover` | `MediaAsset` | Gambar utama dan alt text |
| `gallery` | `MediaAsset[]` | Gambar tambahan untuk modal |
| `links` | object | Optional `demo`/`github` URL |
| `featured`, `order` | boolean, number | Penonjolan dan pengurutan |
| `status` | `published` / `draft` | Tentukan tampil/tidak di UI |

Konten proyek **dummy dulu**: TaskFlow, NoteHub, dan SewaQu dari rancangan. Semua dummy wajib mudah dihapus tanpa mengubah JSX, dan tidak boleh memasukkan tautan palsu. `status: 'draft'` tersembunyi dari UI.

### Content lainnya

- `src/data/profile.ts` — nama placeholder, headline, intro, bio, lokasi opsional, ketersediaan, avatar, CV, socials.
- `src/data/skills.ts` — kategori dan skill chips; **tanpa progress bar persentase proficiency**.
- `src/data/experience.ts` — timeline; jangan mengaku punya pengalaman kerja tertentu bila belum diverifikasi.
- `src/data/awards.ts` — nama award, organizer, peringkat, tanggal, URL bukti opsional.
- `src/data/site.ts` — SEO/label/locale/site URL.

## 9. Arsitektur dan Konvensi

- React + Vite + TypeScript strict, Tailwind CSS, modern CSS variables.
- Struktur direkomendasikan:

```text
src/
  app/App.tsx
  components/layout/{FloatingNavbar,Footer}.tsx
  components/sections/{Hero,About,ProjectSection,Skills,Experience,Awards,Contact}.tsx
  components/projects/{ProjectCarousel,ProjectCard,ProjectModal,ProjectGallery}.tsx
  components/ui/{Button,SectionHeading}.tsx
  data/{projects,profile,skills,experience,awards,site}.ts
  types/{project,content}.ts
  hooks/{useActiveSection,useHorizontalDrag,useLockBodyScroll}.ts
  styles/{globals,tokens}.css
  utils/{media,links,project}.ts
public/
  projects/<slug>/{cover.webp,screen-01.webp,...}
  profile/{portrait.webp,cv.pdf}
```

- **Jangan pakai satu `App.tsx` raksasa.** Jangan membuat komponen baru tiap kali menambah proyek.
- Tanpa environment secret untuk frontend. Semua URL eksternal harus eksplisit dalam data.
- Gunakan `import.meta.env.BASE_URL`/`base` Vite yang benar untuk assets ketika deployment ke GitHub Pages subpath atau custom domain.
- Dependency hanya yang diperlukan. Native scrolling + CSS transitions diprioritaskan, animation library opsional jika ada manfaat jelas.

## 10. Design System

Rujuk `03_DESIGN_INTERACTION_SPEC.md` untuk detail. Aturan ringkas:

- Background putih / off-white, tulisan charcoal, cyan lembut **khusus ambient hero** dan beberapa aksen sangat terbatas.
- Floating pill navbar di pusat atas, bayangan sangat ringan.
- Hero **centered**, label `Hi, I'm`, judul `ISI NAMA`, dua CTA hitam/putih **mengikuti Figma**.
- Border netral tipis, radius 10–20px, ruang putih lapang.
- Tidak ada random gradient, garis warna dekoratif di tiap section, neon, glassmorphism berlebihan, carousel autoplay, atau transformasi heboh.

## 11. Nonfunctional Requirements (NFR)

- **Responsive:** uji 360, 390, 768, 1024, 1440px; tanpa horizontal overflow pada body. Carousel boleh scroll sendiri.
- **Accessibility:** semantic HTML, `aria-label`, visible focus rings, image alt, WCAG AA contrast where practical, skip-to-content, reduced motion.
- **Performance:** image WebP/AVIF bila tersedia, `loading="lazy"` untuk below-the-fold, pre-load seperlunya, hindari render gambar full size secara eager.
- **SEO:** custom meta title/description, canonical (jika domain diketahui), OpenGraph/Twitter meta, structured data Person optional jika data valid.
- **Reliability:** graceful handling saat data kosong, link hilang, gambar rusak; error boundary optional.
- **Maintainability:** modular, lint + formatting, constants for animation, no duplicated project data, typed interfaces.

## 12. Acceptance Criteria / Definition of Done

- [ ] Landing tepat mengikuti arah desain Figma V4 final (bukan remix generik).
- [ ] About Me benar-benar section kedua, dan navbar urutannya konsisten.
- [ ] Projects horizontal dapat swipe di mobile dan drag di desktop, snap terasa mulus.
- [ ] Klik kartu apa pun membuka modal proyek yang benar; screenshot bisa berubah dengan tombol kiri/kanan.
- [ ] Tutup modal via X, Escape, backdrop; fokus kembali ke kartu asal.
- [ ] Tambah proyek baru **hanya** perlu data entry + foto aset, tidak perlu edit JSX.
- [ ] `published/draft`, order, featured, URL opsional, fallback foto berfungsi.
- [ ] Semua konten personal di file data (bukan hardcoded di layout).
- [ ] `npm install`, `npm run dev`, `npm run build`, `npm run lint` berhasil.
- [ ] Tes dasar interaksi project dan modal berjalan.
- [ ] Tidak ada JS console error, link kosong palsu, atau layout overflow.
- [ ] Project, pengalaman, dan penghargaan dummy diidentifikasi jelas sebagai placeholder dalam dokumentasi.
- [ ] README menjelaskan setup, penambahan proyek, CV, sosial, gambar, dan deployment.

## 13. Milestones Implementasi

| Milestone | Isi | Kriteria selesai |
|---|---|---|
| M1 | Bootstrap proyek + tokens + base layout | Dev server/build berjalan |
| M2 | Navbar, hero, About, responsive | Sesuai Figma dan anchor bekerja |
| M3 | Project data model + cards + carousel | Add/remove/order proyek via data |
| M4 | Project modal + screenshot slides + keyboard | Bisa open/close/navigate semua proyek |
| M5 | Skills, Experience, Awards, Contact | Konten data-driven, empty state oke |
| M6 | QA, aksesibilitas, SEO, README, deploy readiness | Semua acceptance test lulus |

## 14. Keputusan yang Sudah Dikunci

- Figma node `22:2` adalah referensi UI utama.
- Repository GitHub `ArleneNero/portofolio` hanya rujukan logika carousel dan popup.
- Urutan: **Landing → About → Projects → Skills → Experience → Awards → Contact**.
- Tema awal light minimalist, tanpa dark mode wajib.
- Nama tetap **ISI NAMA** sampai user sendiri mengubah.
- Backend/CMS ditiadakan: project management melalui satu data file.
- Project dummy diperbolehkan selama mudah diganti.

## 15. Batasan dan Keterbukaan

Implementasi harus membedakan **data nyata yang pengguna berikan** dari **dummy yang hanya ilustrasi**. Jangan mengklaim pernah menjadi intern, menerima award, mendapatkan proyek klien, atau menguasai library tertentu tanpa bukti dari pengguna. Rujukan gambar Figma dapat memakai aset terkompresi; implementasi harus memungkinkan penggantian dengan screenshot resolusi asli.
