# QA & ACCEPTANCE TEST MATRIX

Use real interactions in a browser. Don't mark anything PASS without checking it.

## A. Build & baseline

| Test | Steps | Expected |
|---|---|---|
| Environment | `npm install`, `npm run dev` | App starts without fatal error |
| Strict build | `npm run build` | TypeScript + Vite finish successfully |
| Lint | `npm run lint` | No lint errors |
| Unit tests | `npm run test` | Passed for data sorting, filtering, gallery indexes |
| Data source | Edit title for dummy project in `projects.ts` | Card and modal both update |
| Add new project | Add 4th entry and assets | New card and working modal appear automatically |
| Hide project | Set `status: 'draft'` | Card disappears; modal inaccessible through UI |
| Missing optional links | Remove demo/github | Buttons omitted; no dead links |
| Image fallback | Temporarily use nonexistent image path | Layout stable; accessible placeholder shown |

## B. Navigation

| Test | Steps | Expected |
|---|---|---|
| Hero CTA | Click `View My Work` | Scrolls to Projects |
| Navbar order | Read labels | Home, About, Projects, Skills, Experience, Awards, Contact |
| About order | Scroll immediately below hero | About Me appears before Projects |
| Active state | Scroll through sections | Relevant nav tab active |
| Mobile menu | Open and select section | Menu accessible and closes after navigation |
| Anchor offset | Click each tab | Heading not hidden under floating nav |

## C. Carousel & modal

| Test | Steps | Expected |
|---|---|---|
| Touch swipe | Swipe project gallery on phone | Smooth horizontal scroll + snap |
| Mouse drag | Drag horizontally with mouse | Cards move; no accidental modal open |
| Wheel at boundaries | Scroll vertically over gallery at both ends | Page continues scrolling; no trap |
| Buttons | Click gallery prev/next | Correct card advances; disabled at endpoints |
| Focus | Tab into carousel and use controls | Keyboard usable + visible focus indicator |
| Progress | Scroll to last card | Progress/index updates correctly |
| Open first/last | Click card 1, last card | Corresponding project opens |
| Change slide | Click modal next/prev | Image and counter both change |
| Single screenshot | Open project with 1 image | `01 / 01`, no invalid next button |
| Escape | Press Escape when modal open | Modal closes, focus returns to card |
| Backdrop | Click outside dialog | Modal closes (if configured) |
| Keyboard | Tab through dialog | Focus stays within modal |
| Reduced motion | Enable reduced motion OS setting | No forced movement/transitions |

## D. Responsive / visuals

- [ ] 360px: no body-level horizontal scrolling, hero readable, mobile menu.
- [ ] 390px: gallery peeking next card; modal content scrolls.
- [ ] 768px: About image not squeezed, skills wrap logically.
- [ ] 1024px: navbar fits or switches to compact state.
- [ ] 1440px: centered hero and carousel align with Figma V4.
- [ ] Portrait images crop gracefully; no stretched project screenshots.
- [ ] Design remains neutral with one soft cyan hero atmosphere; no added colored decorative lines.
- [ ] No text clipped / overlapping / unexpectedly wrapping.

## E. Accessibility / SEO

- [ ] Only one `h1`, sections with proper headings and IDs.
- [ ] All image assets have purposeful `alt` or are marked decorative.
- [ ] Clickable controls are `button`/`a` elements, not click-only `div`.
- [ ] Modal labelled, focus trapped, dismissable and focus restored.
- [ ] Visible focus, sufficient contrast, accessible interactive control size.
- [ ] Page title and meta description populated and editable.
- [ ] No fake placeholder domain, dead CV link, or missing external link targets.
- [ ] `target="_blank"` links include `rel="noopener noreferrer"`.
- [ ] Zero critical console errors and no unexpected 404s.

## F. Handoff

- [ ] README includes setup, project addition, CV/profile editing, assets, build, and deployment.
- [ ] Code includes `src/types/project.ts` and `src/data/projects.ts` as required.
- [ ] Project demo links optional; status/ordering documented.
- [ ] Files in `public` work correctly on GitHub Pages base path and on custom domain.
- [ ] Dummy entries explicitly called sample/placeholder in repo docs.
- [ ] Final development report states what tests were *actually* executed and any outstanding gap.
