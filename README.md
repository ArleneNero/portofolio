# Portofolio | Updated React/Vite Website

This repository publishes the personal portfolio at https://arlenenero.github.io/portofolio/.

The application has been updated from the [ArleneNero/portofolio-web](https://github.com/ArleneNero/portofolio-web) project. The new site features a responsive light-minimalist design, scrollable project cards, accessible project case-study dialogs, source-linked technical descriptions and genuine screenshot previews.

## Structure

- `modern/`: React 19 + Vite + TypeScript + Tailwind CSS source, tests and documentation.
- `index.html`, `assets/`, `projects/`, `profile/`: generated static site output, published by GitHub Actions.
- `img/` and `Data_Portofolio/`: retained original project evidence, PDF reports, photos and original CV.
- `script.js` and `style.css`: archival files from the earlier website, no longer used by the React deployment.
- `.github/workflows/publish-modern.yml`: builds and updates the generated static website at repository root.

## Develop locally

```bash
cd modern
npm install
npm run dev
npm run lint
npm run test
npm run build
```

Vite build base path: `/portofolio/`. Do not delete the existing `img/` and `Data_Portofolio/` folders; portfolio research/report links and profile assets depend on them.

This migration preserves the existing GitHub Pages branch-root deployment configuration, while letting GitHub Actions compile and publish the modern web source automatically.
