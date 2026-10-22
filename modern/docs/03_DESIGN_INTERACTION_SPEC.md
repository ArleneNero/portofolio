# DESIGN + INTERACTION SPEC
## IT Portfolio V4 — Light Minimalist

**Design source:** https://www.figma.com/design/T1DrZs505u4Lc7jTysqXMS?node-id=22-2  
**Interaction source:** https://github.com/ArleneNero/portofolio (project gallery in `script.js`, `style.css`).

## A. Visual direction (locked)

**Key emotion:** intentional, airy, understated, typographic, genuinely designed. Not an AI template or marketing landing page overloaded with decorative shapes.

- Background: white `#FFFFFF` / soft-white neutral.
- Foreground: near-black `#111318` / dark charcoal text.
- Muted text: gray-blue / slate, approx `#6D7886`.
- Borders: cool-neutral `#E5EAEE` in subtle 1px strokes.
- Card surfaces: white; subtle shadows, no heavy gradients.
- Accent: soft cyan from **ambient blurred hero** only; no recurring colored separator lines throughout the layout.
- Typography: follow Figma original hierarchy (Plus Jakarta Sans for heading/hero where represented; existing Inter for content as needed). Use a font fallback stack that looks visually consistent.
- Spacing: generous hero space and breathing room in all sections. Systematic spacing scale (4 / 8 / 12 / 16 / 24 / 32 / 48 / 64).
- Border radius: buttons approx 9–11px, cards approx 14–18px, modal approx 18–22px; navbar a pill, avoid rounding every element identically.
- Use `prefers-reduced-motion: reduce` to disable smooth/animated enhancements.

**Tokens are starting estimates** if Figma extract differs; Figma approved frame wins. Never arbitrarily invent a second accent color family.

## B. UI layout

### Desktop header

- Left `portfolio.` small bold wordmark.
- Center: white floating pill nav with slightly translucent surface and subtle elevation. Active item is a light neutral capsule.
- Right: small caption `DESIGN × DEVELOPMENT`.
- Navbar order **Home, About, Projects, Skills, Experience, Awards, Contact**.
- Remains legible when scrolling; backdrop is opaque enough above content.

### Hero (centered, not two-column)

- Tall spacious zone immediately below navbar.
- Soft diffuse cyan glow behind centered text, avoiding oversaturation.
- Small availability badge. `Hi, I'm`, then main H1 `ISI NAMA` in heavy weight, single obvious focal point.
- Descriptive line(s) below in muted gray; not too wide.
- Primary black CTA `View My Work`; secondary white outlined CTA `Download CV`; buttons side-by-side on desktop, flexible width on mobile.
- Small neutral scroll cue after CTAs.
- Do not add portrait to hero; portrait belongs in About.

### About Me (immediately after hero)

- Intro block on left, photo on right (mobile stacked).
- Photo is replaceable as content, `object-fit: cover` with controlled crop.
- Optional 1–3 stats sourced from data, never hard-coded fictional achievements.
- No extra decorative gradient rules.

### Projects

- Heading plus subtle helper text `Drag or swipe to explore · Select a project for details`.
- White project cards with separate image containers and neutral borders.
- Carousel should show two cards plus a **peek** of third at desktop V4 reference width.
- On small screens show ~1 card plus 10–20% of the next, adjusted for readable content.
- Cards are from data and should stay dimensionally consistent even with different screenshot sizes.
- Labels: short category/number, title, one-line description, north-east arrow affordance.
- Optional scroll status/progress under cards. Use real `scrollLeft` measurement; no false fixed `01 / 03` after scroll.

### Skills

- Four groups preferred for future content: Machine Learning, NLP & GenAI, Programming & Data, Development & Tools.
- Display small neutral chips or low-contrast bordered groups, not bright logo mosaics or fake skill percentage gauges.
- Use only skills the owner can substantiate; current entries can be placeholders.

### Experience and Awards

- Desktop may share a two-column row matching Figma; on mobile stack vertically.
- Experiences display organization/role/dates/description when real. Awards include title/organizer/date and optional proof link.
- Do not invent tenure, employer names, first-place wins, or official rankings.
- If list is empty, hide its section or present a tasteful compact placeholder in dev mode.

### Contact

- Soft cyan-washed panel as in Figma; dark primary CTA and neutral alternate CV action.
- Links sourced from data; no empty placeholder `href="#"` masquerading as actual contact.

## C. Interaction timing / movement

| Element | Interaction | Recommendation |
|---|---|---|
| Nav link | Smooth scroll to id; update active section | 250–450ms (or native CSS smooth) |
| Primary button | Subtle hover shadow or color change | 150–200ms |
| Project card | Slight lift (`translateY(-2px)` max) | 180–240ms |
| Project screenshot | Zoom max 1.04 | 200–300ms |
| Carousel | Native horizontal swipe and snapping | scroll-snap; avoid programmatic easing conflicts |
| Project modal | Backdrop fade + panel short vertical lift | 250–350ms |
| Modal gallery | Short crossfade / lateral transition | 220–320ms |
| Reduced motion | No zoom/translate/smooth animations | immediate state changes |

**No autoplay. No aggressive parallax. No looping animation on every section. No forced scroll hijack.**

## D. Project gallery behavior algorithm

1. Put cards in `overflow-x:auto` track with snap-align; use native swipe on touch.
2. On pointerdown for mouse: remember start position and scrollLeft. On pointermove: if movement threshold exceeded, scroll horizontally and suppress click on pointerup. Use pointer capture if appropriate.
3. On card click: if no drag occurred, open project modal.
4. Provide `Prev`/`Next` buttons as explicit accessible alternatives; disable at edges or hide when there's no overflow.
5. Measure scroll progress. Keep it dynamic on scroll and resize.
6. Optional wheel conversion: only intercept inside gallery when it can still move in the wheel direction and the intent is horizontal browsing. Otherwise allow normal page scroll. Validate this carefully on real mouse/trackpad.
7. Ensure page navigation, text selection, links, and focus are not compromised.

## E. Modal behavior / accessibility

1. Click project → open dialog, autofocus meaningful close or title.
2. Lock body scroll, preserve return focus anchor.
3. Dialog content: title, subtitle, screenshot with alt, prev/next controls, `01 / NN`, problem, solution, stack, action links.
4. Prev/next affect **only media within the active project**, not which project is selected.
5. If `gallery` empty, display cover only; count `01 / 01`, disable prev/next.
6. Close via X, Escape, or backdrop; return focus to prior card.
7. Use `role="dialog"` and `aria-modal="true"` or native `<dialog>`, label by heading, trap focus; no keyboard focus behind overlay.
8. On phone: make content scrollable with large enough tap targets; don't let image overflow viewport.

## F. Responsive checkpoints

- 360–390px: navbar condensed, hero heading scaled down, About stacked, carousel one-ish card, modal adapted to sheet.
- 768px: tablet header links allowed if they fit; otherwise collapse; About may be stacked/two columns based on width.
- 1024–1440px: approved desktop proportions with centered hero and 2+ carousel cards.
- No body-level horizontal scroll. Only project gallery scrolls horizontally.

## G. Common mistakes to reject

- A desktop-only page squeezed into a mobile frame.
- Full-page screenshot substituted for actual HTML/React components.
- Fake carousel implemented by swapping card data without real drag/swipe.
- Projects duplicated as JSX cards and modal records.
- Clickable-looking dead buttons or fake links.
- Random cyan lines under every heading.
- Gradient background on every section, unrelated theme colors, or excessive shadow.
- Dismissed keyboard focus / modal that cannot be closed with Escape.
- Mobile drag triggering a modal accidentally.
- Broken images from GitHub Pages subpath routing.
