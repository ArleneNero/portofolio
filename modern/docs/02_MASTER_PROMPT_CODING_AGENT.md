# MASTER PROMPT — BUILD IT PORTFOLIO FROM APPROVED FIGMA V4

## ROLE
You are a senior frontend engineer, UI engineer, accessibility reviewer, and codebase maintainer. Implement a **real runnable production-ready React application**, not merely a concept, screenshot, landing screenshot import, or static Figma mockup.

## INPUTS / SOURCES OF TRUTH

1. **UI reference (highest authority for appearance):** https://www.figma.com/design/T1DrZs505u4Lc7jTysqXMS?node-id=22-2
2. **Functional carousel inspiration (not styling):** https://github.com/ArleneNero/portofolio — inspect `script.js` and `style.css` for drag/swipe, scroll-snap, scroll/wheel behavior, modal transitions, and slide navigation.
3. **Behavioral requirements:** `01_PRD_IT_Portfolio.md` (read in full).
4. **Visual details:** `03_DESIGN_INTERACTION_SPEC.md` (read in full).
5. **Editable project instructions:** `04_CONTENT_AND_PROJECT_GUIDE.md` (read in full).
6. **Validation:** `05_QA_ACCEPTANCE_MATRIX.md` (read in full).

If Figma connector is unavailable, work from screenshots and these accompanying specifications. Report what you could not inspect; never assert pixel-perfect fidelity when not verified. Never blindly copy styles from the old GitHub portfolio: copy **behavior**, not palette or overall layout.

## PROJECT GOAL
Develop an elegant, fast, **single-page light minimalist personal IT / AI portfolio** with a centered hero, floating pill navbar, About immediately after landing, horizontal sliding project gallery, slide-based project detail modal, Skills, Experience, Awards, and Contact. Content and project entries must be editable by a non-expert without touching layout code. Project cards initially use **dummy entries**. Main display name must be literally **ISI NAMA** until the owner changes it.

## REQUIRED STACK
- React, Vite, TypeScript strict, Tailwind CSS (current stable compatible version).
- Functional components and typed, composable hooks. Use semantic HTML.
- No backend, database, login, auth, CMS, heavyweight UI framework, or unnecessary animation dependencies.
- CSS transitions and native browser scroll are preferred. Use tiny packages (such as Lucide) only when they materially help.
- Responsive layouts; clean accessible mobile experience.

## VISUAL CONTRACT — DO NOT DEVIATE
- Hero follows Figma V4: **floating capsule navbar centered at the top**, small `portfolio.` logotype, understated `DESIGN × DEVELOPMENT` label, centered availability badge, `Hi, I'm`, very large **ISI NAMA**, short supporting copy, **solid black primary button** `View My Work`, **white outline secondary button** `Download CV`, scroll cue, spacious whitespace, soft cyan atmosphere behind hero.
- **No unrelated design redesign, rainbow borders, random neon/gradient effects, colored divider lines, 3D objects, rotating shapes, unnecessary scroll animations, or 'AI-generated template' ornamentation.** The single cyan glow/hero detail visible in Figma is okay; don't multiply it.
- Section order is mandatory: `Home → About → Projects → Skills → Experience → Awards → Contact`.
- About comes **directly after** landing, then project carousel.
- Projects use white cards, light gray borders/shadows, image emphasis, progressive peek at next card, subtle hover.
- Projects modal uses white dialog over dim backdrop, media area, slide arrows, `01 / NN`, concise problem/solution, tech stack, and links when provided.
- All remaining sections follow the approved light minimalist rhythm.

## DATA MODEL / MOST IMPORTANT REQUIREMENT
**Projects must be entirely data-driven**. The owner must add a project later in under ~5 minutes by:

1. Dropping screenshot files in `public/projects/<slug>/`.
2. Adding ONE object to `src/data/projects.ts`.
3. Optionally adding real `demo` and `github` URLs.

No component code edits, route creation, database entries, or duplicated card/modal text. `src/data/projects.ts` must be the **only source** for both cards and their modals. Define a strict `Project` type in `src/types/project.ts` covering `id`, `slug`, `title`, `summary`, `description`, `category`, `year`, `cover`, `gallery`, `problem`, `solution`, `stack`, `links?`, `featured?`, `order`, `status`. `MediaAsset` needs `{src, alt, caption?}`. Omit draft projects; sort published entries by `order`. `featured` may alter card prominence **only if compatible with the approved layout**. Missing optional links must hide the corresponding button. Missing gallery falls back to cover; absent image gets a designed placeholder.

**Example dummy projects:** TaskFlow, NoteHub, SewaQu. Treat them explicitly as samples; do not invent working demo/github URLs. Projects can later be replaced with real AI/ML/NLP work.

The other sections are also data-driven: `src/data/profile.ts`, `skills.ts`, `experience.ts`, `awards.ts`, and `site.ts`. Structure Skills with meaningful **Machine Learning**, **NLP & Generative AI**, **Programming & Data**, **Development & Tools** categories. The owner can edit them without modifying JSX. Do **not** fabricate genuine internship/awards experience. Use clearly editable placeholders, and add instructions to hide empty lists.

## INTERACTION CONTRACT
### Navbar
- Anchors for all sections. Active item when section in viewport. Fixed/sticky floating style. Correct scroll offsets. Mobile menu with accessible button and focus semantics.
- Primary hero CTA scrolls to projects; CV button downloads real PDF if configured, otherwise is omitted or gracefully disabled with clear placeholder text (no broken link).

### Projects carousel
- Native `overflow-x: auto` with CSS `scroll-snap` and clipping only inside carousel, never page overflow.
- Mouse dragging and touch swipe; keyboard horizontal nav; accessible prev/next controls where useful.
- Card image hover `scale(1.03–1.06)` max; subdued transitions and optional tiny lift.
- Display peek of next card and dynamic progress/index, not a static fake counter.
- Wheel-to-horizontal behavior from reference repo is optional **progressive enhancement**, with wheel interception ONLY when the gallery can still move in requested direction. NEVER trap scrolling at gallery ends, steal ordinary vertical scrolling globally, or break mobile touch.
- Distinguish drag from click using a movement threshold so swiping never opens a project accidentally.

### Project modal and internal slide gallery
- Clicking card opens **correct** project. `Escape`, close button, and backdrop close; lock background scroll; trap focus in modal; restore focus to opening card.
- Gallery from `cover` + `gallery` in data. Previous/next transitions ~250–350ms or immediate in reduced-motion. Counter updates `01 / 0N`. No autoplay. Keyboard arrow navigation when modal focus is within gallery; do not hijack arrow keys elsewhere.
- Mobile dialog adapts to screen with internal scroll and no clipped controls.
- Demo/GitHub buttons only if URLs are valid and present; external links use security attributes.

## STRUCTURE / QUALITY
Target an organized codebase roughly like:

```text
src/
  app/App.tsx
  components/layout/FloatingNavbar.tsx
  components/sections/Hero.tsx
  components/sections/About.tsx
  components/sections/Projects.tsx
  components/sections/Skills.tsx
  components/sections/Experience.tsx
  components/sections/Awards.tsx
  components/sections/Contact.tsx
  components/projects/ProjectCarousel.tsx
  components/projects/ProjectCard.tsx
  components/projects/ProjectModal.tsx
  components/projects/ProjectGallery.tsx
  components/ui/{Button,SectionHeading}.tsx
  data/{projects,profile,skills,experience,awards,site}.ts
  types/project.ts
  hooks/{useHorizontalDrag,useActiveSection}.ts
  styles/{globals,tokens}.css
  utils/{media,projects}.ts
public/projects/<slug>/...
public/profile/...
```

Use descriptive component names, predictable props, TypeScript strict, no dead imports, no pasted full-page screenshot. Any profile fields, experience, award labels, and image paths come from data. SVG placeholder graphics are permitted for initial dummy assets, but create them as **separate content assets**, never one static picture of the UI.

## ENGINEERING / ACCESSIBILITY / SEO
- Responsive 360px, 390px, 768px, 1024px, 1440px, no body overflow.
- Semantic headings (one H1), meaningful alt text, skip link, aria labels, focus-visible, accessible mobile nav.
- Respect `prefers-reduced-motion`; do not block text selection or regular scrolling except during intentional drag.
- Lazy-load below-fold screenshots; prevent CLS; handle missing/broken files gracefully.
- HTML title/meta description, social meta defaults and favicon; use absolute canonical URL only after real domain configured.
- Deployable static build, GitHub Pages base path support and custom domain path support; no secrets committed.
- Add readable README with commands and `How to add a project` tutorial.

## REQUIRED MILESTONES (WORK CONTINUOUSLY)
1. Inspect context/repo/Figma and plan source structure. Respect existing code and do not overwrite unrelated files.
2. Scaffold and complete foundational styles, layout, nav, hero, About.
3. Implement typed data and horizontal interactive projects gallery.
4. Implement accessible modal + real dynamic slideshow.
5. Implement Skills, Experience, Awards, Contact; polish responsiveness.
6. QA: `npm install`, `npm run lint`, `npm run build`, tests; fix errors. Provide actual screenshots if available.

Do not stop at scaffolding, a mockup, or skeleton components. Continue through MVP and tests unless a real blocker arises. Do not ask routine design questions already answered in PRD/Figma. If repo exists, check `git status` before modifications. Do not force push, remove unrelated work, publish, or deploy without explicit user approval.

## ACCEPTANCE TESTS
- All sections appear in specified order. Centered Figma V4 hero looks materially like approved design.
- Horizontal carousel navigates via swipe/mouse drag/controls; at ends, vertical page scroll is unblocked.
- `project` data is used for every card and detail modal. Changing any project name/image updates both.
- Adding project 4 requires only adding data and assets; project 4 appears with functioning modal and gallery.
- Modal works via click, close X, backdrop, Escape, tab/focus, and keyboard arrows.
- Optional links hidden when absent. Empty datasets do not crash UI.
- React app works across desktop/mobile widths with no significant overflow.
- Lint, build, and automated tests pass; do not claim tests passed if not actually executed.

## FINAL REPORT FORMAT
On completion report succinctly:
1. Milestones finished + what was built.
2. Directory structure and critical data files.
3. Exact commands to run locally.
4. How to add a new project and replace CV, avatar, skills, awards.
5. Actual verification results and remaining issues (if any).
6. Deployment instructions (do not claim already deployed).

**Key rule:** Project entries are easily editable. Do not substitute an elaborate CMS or hardcoded card list for the requested simple maintainable content model.
