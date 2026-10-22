# IT PORTFOLIO — IMPLEMENTATION HANDOFF PACKAGE

**Purpose:** Build the approved Figma V4 light-minimalist single-page personal portfolio using React, TypeScript, Vite, and Tailwind. Use the old personal repo only as reference for horizontal project carousel and modal slideshow behavior.

## Files in this package

1. `01_PRD_IT_Portfolio.md` — complete product requirements, user flows, scope, acceptance criteria.
2. `02_MASTER_PROMPT_CODING_AGENT.md` — copy-paste as an instruction to a coding assistant.
3. `03_DESIGN_INTERACTION_SPEC.md` — specific visual and interaction guidance.
4. `04_CONTENT_AND_PROJECT_GUIDE.md` — how to add/edit projects from one data file.
5. `05_QA_ACCEPTANCE_MATRIX.md` — test/validation checklist.

## Where to start

1. Create/open a local project directory and put these `.md` files at project root or `/docs`.
2. Open a coding agent with access to the codebase, Figma reference, and GitHub source reference.
3. Paste the entire `02_MASTER_PROMPT_CODING_AGENT.md` into the agent.
4. Tell it to read all companion files first and implement to completion.
5. Inspect output locally with `npm install && npm run dev`, then run `npm run lint && npm run build && npm run test`.
6. Replace samples with your personal content before publishing. Start at `src/data/projects.ts`.

## Source references

- Design: https://www.figma.com/design/T1DrZs505u4Lc7jTysqXMS?node-id=22-2
- Carousel behavior: https://github.com/ArleneNero/portofolio

## Hard rules

- **No hardcoded project cards or per-project components.** One `src/data/projects.ts` drives everything.
- Name placeholder **ISI NAMA**.
- Section order: Landing → About Me → Projects → Skills → Experience → Awards → Contact.
- Light minimalist, soft cyan hero glow, black/white CTAs, neutral borders; no decorative colored section lines.
- No fabricated real work history, awards, or broken dummy links.
- No backend or CMS for version 1.

> This package defines the implementation; it does **not** contain the finished React website. A coding agent should generate and test that application from these instructions.
