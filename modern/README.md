# IT Portfolio — Light Minimalist

A responsive, single-page **React + Vite + TypeScript + Tailwind CSS** portfolio based on the approved [Figma V4](https://www.figma.com/design/T1DrZs505u4Lc7jTysqXMS?node-id=22-2). Horizontal carousel interaction is adapted from [ArleneNero/portofolio](https://github.com/ArleneNero/portofolio), but its old dark styling was intentionally not reused.

> **Content note:** Project case studies are grounded in public repositories, and the three new SVG cover artworks are illustrations rather than screenshots. The migration fills in the real name, portrait, CV and contact information using materials from the legacy portfolio repository.

## 1. Requirements / local setup

Node.js 22+ recommended (Vite 7 supports current Node 20.19+/22+).

```bash
npm install
npm run dev
# Open the URL printed by Vite, typically http://localhost:5173/
```

Check the build:

```bash
npm run lint
npm run test
npm run build
npm run preview
```

The migrated production build defaults to base path `/portofolio/`, suitable for `https://ArleneNero.github.io/portofolio/`. `npm run dev` uses `/` automatically.

## 2. Add a project in a few minutes — no component editing

1. Create `public/projects/campusfind/` with `cover.webp` and optional `screen-01.webp` etc.
2. Open **`src/data/projects.ts`** and add one typed `Project` object to the `projects` array:

```ts
{
  id: 'project-campusfind',
  slug: 'campusfind',
  title: 'CampusFind',
  category: 'Web Application',
  year: '2026',
  summary: 'Helping students find lost belongings.',
  description: 'A prototype for handling found items.',
  problem: 'Found items are difficult to track across campus.',
  solution: 'A searchable catalog and lightweight claim flow.',
  stack: ['React', 'TypeScript'],
  cover: { src: 'projects/campusfind/cover.webp', alt: 'CampusFind catalog screenshot' },
  gallery: [
    { src: 'projects/campusfind/screen-01.webp', alt: 'Catalog' },
    { src: 'projects/campusfind/screen-02.webp', alt: 'Item details' },
  ],
  links: { github: 'https://github.com/YOUR-ACCOUNT/YOUR-REPO' }, // Replace or omit
  featured: false,
  order: 4,
  status: 'published',
}
```

3. Save/refresh. The **carousel card and modal both update automatically**. To hide a project, set `status: 'draft'`. To reorder, change `order`. Links appear only when valid real URLs exist. If gallery is empty, the cover is the sole slide. When image loading fails, a visible fallback appears.

**Asset paths:** Always use `projects/campusfind/cover.webp` (no leading slash). `src/utils/media.ts` automatically prefixes Vite's base URL, so GitHub Pages deployment is supported.

## 3. Edit profile, skills, experience and awards

| File | Change |
| --- | --- |
| `src/data/profile.ts` | Replace `ISI NAMA`, bio, portrait path, email, social URLs, availability, stats, CV |
| `src/data/skills.ts` | Edit four skill groups (ML, NLP/GenAI, Data, Development) |
| `src/data/experience.ts` | Add only verifiable experience (empty initially) |
| `src/data/awards.ts` | Add only verifiable awards (empty initially) |
| `src/data/site.ts` | Footer year, site labels, sample-content footer notice |
| `index.html` | Update SEO title, metadata, social descriptions before public release |

To enable **Download CV**, place `public/profile/cv.pdf` and set `cv: 'profile/cv.pdf'` in `profile.ts`. To enable **Get In Touch** as email, set a real `email`; until then the Contact CTA points to the verified `ArleneNero` GitHub account.

To replace the portrait: put `public/profile/portrait.webp`, set `photo: 'profile/portrait.webp'` and update the About alt text if appropriate.

## 4. Interaction/accessibility contract

- Floating pill navbar and scroll-position tracking; mobile toggle menu.
- Native horizontal CSS snap/trackpad/touch scrolling; desktop mouse drag with 7px click suppression; prev/next buttons; live progress, all data-driven.
- Optional conversion of vertical wheel to horizontal **only inside the gallery, only while travel remains**. At either end vertical scrolling resumes.
- Semantic project cards; `<dialog>` modal with browser-native focus confinement, Escape, overlay close, restore focus, locked background scroll and keyboard gallery arrows.
- No carousel or modal autoplay, `prefers-reduced-motion` respected.
- No backend, CMS, analytics injection, or fake outbound links.

## 5. Deploying to GitHub Pages

This repository includes **CI checks only**, not automatic publication (deployment requires an explicit follow-up choice).

To build for repository Pages URL:

```bash
npm install
npm run build
```

Publish the contents of `dist/` using GitHub Pages Actions or another supported static publisher. The build uses `/portofolio/` as the default base. For a custom domain (hosting at `/`):

```bash
VITE_BASE_PATH=/ npm run build
```

A custom domain can then serve the root build directly. No `.env` secrets are required. Make sure `index.html` metadata reflects your real domain and identity before deploying.

## 6. Source specifications and QA

See `docs/` for the six handoff documents (PRD, prompt, visual spec, content guide and testing matrix). See `QA_REPORT.md` for confirmed/unconfirmed test results.
