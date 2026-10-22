# CONTENT GUIDE — Mengisi Portofolio Tanpa Mengubah Komponen

## Prinsip

**Data-driven, no CMS.** Untuk menambahkan proyek baru, pemilik hanya perlu menaruh aset foto pada folder yang tepat dan menambah satu objek `src/data/projects.ts`. Semua ProjectCard, ProjectModal, dan ProjectGallery harus membaca array yang sama. Tidak ada sunting JSX berulang.

## 1. Contoh tipe TypeScript yang wajib dibuat

```ts
// src/types/project.ts
export type MediaAsset = {
  src: string;
  alt: string;
  caption?: string;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  description: string;
  problem: string;
  solution: string;
  stack: string[];
  cover: MediaAsset;
  gallery: MediaAsset[];
  links?: { demo?: string; github?: string };
  featured?: boolean;
  order: number;
  status: 'published' | 'draft';
};
```

## 2. Satu file data project

```ts
// src/data/projects.ts
import type { Project } from '../types/project';

// Asset paths: use helper resolveAssetPath if site is served at a GitHub Pages subpath.
export const projects: Project[] = [
  {
    id: 'project-taskflow',
    slug: 'taskflow',
    title: 'TaskFlow',
    category: 'Web Application',
    year: '2026',
    summary: 'An approachable workspace for collaborative project tracking.',
    description: 'Sample project content. Replace this with your actual project.',
    problem: 'Teams need a clear place to track progress.',
    solution: 'A single interface for tasks, milestones, and collaboration.',
    stack: ['React', 'TypeScript'],
    cover: {
      src: 'projects/taskflow/cover.webp',
      alt: 'TaskFlow project overview',
    },
    gallery: [
      {
        src: 'projects/taskflow/screen-01.webp',
        alt: 'TaskFlow task overview screen',
        caption: 'Task overview',
      },
      {
        src: 'projects/taskflow/screen-02.webp',
        alt: 'TaskFlow project board screen',
        caption: 'Project board',
      },
    ],
    // Leave links undefined until real URLs exist.
    links: {},
    featured: true,
    order: 1,
    status: 'published',
  },
];

export const visibleProjects = projects
  .filter((project) => project.status === 'published')
  .sort((a, b) => a.order - b.order);
```

> Ini **contoh contract untuk coding agent**, bukan klaim bahwa file sudah ada. `TaskFlow` adalah DUMMY.

**Important GitHub Pages note:** path contoh di atas sengaja **tanpa leading slash**. Implementasi harus memakai helper yang menggabungkan `import.meta.env.BASE_URL` dengan path agar website tetap berfungsi di `/nama-repo/` ataupun `/` (custom domain). Jangan menyusun URL dengan string acak atau mengasumsikan selalu root.

## 3. Cara menambah proyek baru (5 menit)

1. Buat `public/projects/campusfind/`.
2. Masukkan `cover.webp` dan `screen-01.webp`, `screen-02.webp`.
3. Tambahkan objek baru ke array `projects` dengan `slug: 'campusfind'`, `title`, `summary`, `problem`, `solution`, `stack`, `cover`, `gallery`, dan `order: 2`.
4. Isi `links.demo`/`links.github` **hanya jika ada URL asli**.
5. Ubah `status: 'published'`, simpan, dan refresh. Kartu dan popup otomatis muncul.

Tidak perlu membuat `CampusFindPage.tsx`, mengubah `ProjectCard.tsx`, atau menambah route manual.

## 4. Mengubah dan menyembunyikan konten

- Untuk menyembunyikan proyek, ganti `status` menjadi `'draft'`.
- Mengubah posisi proyek: ubah `order`.
- Mengganti gambar: ganti file di `public/projects/<slug>/` dan alt text yang sesuai.
- Menghapus proyek: hapus satu object array; folder lama boleh dibersihkan.
- Jika tidak punya GitHub/demo, biarkan properti link kosong sehingga tombol tidak dirender.
- `src/data/profile.ts`: ganti **ISI NAMA**, headline, bio, lokasi opsional, email, GitHub, LinkedIn, CV, portrait.
- `src/data/skills.ts`: daftar kemampuan dengan kategori. Jangan pakai rating proficiency tanpa dasar.
- `src/data/experience.ts`: pekerjaan organisasi/magang yang benar-benar pernah dilakukan; boleh array kosong.
- `src/data/awards.ts`: award yang bisa dibuktikan; boleh array kosong.

## 5. Contoh struktur folder aset

```text
public/
  profile/
    portrait.webp
    cv.pdf
  projects/
    taskflow/
      cover.webp
      screen-01.webp
      screen-02.webp
    campusfind/
      cover.webp
      screen-01.webp
      screen-02.webp
```

Jaga screenshot aspect ratio konsisten saat memungkinkan (`16:9`, `4:3`, mobile screenshots terpisah). Gunakan WebP/AVIF/JPEG yang dikompresi secara wajar, jangan menempel screenshot full page ke kartu untuk mengganti implementasi komponen.

## 6. Konten dummy dan kebenaran portofolio

- `TaskFlow`, `NoteHub`, `SewaQu` adalah contoh UI/data, **bukan** pengalaman nyata.
- Jangan menyebut penghargaan atau employer spesifik sebagai fakta hanya karena muncul dalam Figma; buat placeholder/tampilkan ketika diisi pengguna.
- Data Skills awal bisa mencakup minat di **ML, NLP, RAG, Python, SQL, React**, tetapi hindari klaim keahlian framework yang belum dibuktikan.
- Sebelum publikasi, jalankan checklist dummy: nama, foto, CV, social URLs, projek, experience, awards, SEO metadata, screenshot alt text.

## 7. Format template objek untuk copy/paste

```ts
{
  id: 'project-<slug>',
  slug: '<slug>',
  title: '<Judul Proyek>',
  category: '<Machine Learning | NLP | Web App | Mobile App>',
  year: '<Tahun>',
  summary: '<Ringkasan pendek>',
  description: '<Penjelasan proyek>',
  problem: '<Masalah>',
  solution: '<Solusi>',
  stack: ['Python', 'React'],
  cover: { src: 'projects/<slug>/cover.webp', alt: '<Alt foto>' },
  gallery: [{ src: 'projects/<slug>/screen-01.webp', alt: '<Alt screenshot>' }],
  links: {},
  featured: false,
  order: 99,
  status: 'draft',
}
```
