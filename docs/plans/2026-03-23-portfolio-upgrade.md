# Portfolio Full Upgrade — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Upgrade portfolio from basic text-only site to polished, professional developer portfolio with filtering, timeline, better case studies, SEO, and UX improvements.

**Architecture:** Component-first approach — improve existing components, add new sections, then layer SEO/meta. Keep dark-only (remove next-themes). Maximize server components where possible.

**Tech Stack:** Next.js 16, React 19, Tailwind 4, Framer Motion, Lucide Icons

---

### Task 1: Cleanup — Remove unused deps, fix base

**Files:**
- Modify: `package.json`
- Modify: `src/app/layout.tsx`

**Step 1: Remove next-themes (installed but unused)**
```bash
cd /tmp/portfolio-build && npm uninstall next-themes @studio-freight/lenis
```
(keep `lenis` — the one actually used)

**Step 2: Commit**
```bash
git add -A && git commit -m "chore: remove unused dependencies (next-themes, @studio-freight/lenis)"
```

---

### Task 2: Add project type filters to Projects section

**Files:**
- Modify: `src/components/Projects.tsx`

**Step 1: Add filter bar with animated tabs**

Extract unique types from projects data. Add horizontal filter pills above the grid. Use `AnimatePresence` + `layout` for smooth card reflow. Filter types: "All", "Mobile App", "Web App", "Website", "Design Concept", "Bot / API".

**Step 2: Commit**
```bash
git add src/components/Projects.tsx && git commit -m "feat: add project type filter with animated transitions"
```

---

### Task 3: Add Experience/Timeline section

**Files:**
- Create: `src/components/Experience.tsx`
- Modify: `src/app/page.tsx` (add between About and Contact)

**Step 1: Create timeline component**

Timeline entries (vertical line with dots):
1. **2016** — Computer Engineering @ IST (Instituto Superior Tecnico, Lisbon)
2. **2018** — Accenture — IT Consulting
3. **2019** — Teleperformance — Tech Support
4. **2020-2024** — DJ Dago — Full-time DJ career across Portugal & Mozambique
5. **2025** — Back to code — Building real products, shipping apps
6. **2026** — Freelance & Open — Full-stack dev + DJ, building what matters

Design: vertical line on left (mobile) or center (desktop), alternating cards, amber dot markers, fade-in on scroll.

**Step 2: Add to page.tsx**

Order: Hero → Projects → About → Experience → Contact

**Step 3: Commit**
```bash
git add src/components/Experience.tsx src/app/page.tsx && git commit -m "feat: add experience timeline section"
```

---

### Task 4: Improve case study pages

**Files:**
- Modify: `src/data/projects.ts` — add `highlights` field (key metrics/stats)
- Modify: `src/app/projects/[slug]/CaseStudy.tsx` — add stats cards, next/prev nav

**Step 1: Add highlights data to projects**

Add `highlights: { label: string; value: string }[]` to each project. Examples:
- AgendaDJ: "40+ Screens", "20 Tables", "8 Edge Functions"
- MUSICTOLEGAL: "90%+ Match Rate", "8 Scan Phases", "4 Stores"

**Step 2: Add visual stats bar to CaseStudy**

Horizontal row of stat cards between header and Problem/Solution/Result. Animated count-up feel.

**Step 3: Add next/prev project navigation**

At bottom of CaseStudy, show prev/next project cards with title + type. Wrap around (last → first).

**Step 4: Commit**
```bash
git add src/data/projects.ts src/app/projects/[slug]/CaseStudy.tsx && git commit -m "feat: enhance case studies with stats and next/prev navigation"
```

---

### Task 5: Add Instagram to socials + improve Footer

**Files:**
- Modify: `src/components/Contact.tsx` — add Instagram
- Modify: `src/components/Footer.tsx` — add nav links, socials, better layout

**Step 1: Add Instagram icon and link to Contact socials**

Add `{ icon: Instagram, label: "Instagram", href: "https://instagram.com/deejay.dago" }` to socials array. Import Instagram from lucide-react.

**Step 2: Redesign Footer**

3-column layout:
- Left: Name + tagline
- Center: Nav links (Projects, About, Experience, Contact)
- Right: Social icons + "Available for hire" badge

**Step 3: Commit**
```bash
git add src/components/Contact.tsx src/components/Footer.tsx && git commit -m "feat: add Instagram social + redesign footer"
```

---

### Task 6: SEO — sitemap, robots.txt, OG metadata, structured data

**Files:**
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`
- Modify: `src/app/layout.tsx` — add structured data (JSON-LD)
- Modify: `src/app/layout.tsx` — improve OG metadata

**Step 1: Create sitemap.ts**

Dynamic sitemap with homepage + all project slugs + privacy page.

**Step 2: Create robots.ts**

Allow all, reference sitemap.

**Step 3: Add JSON-LD structured data to layout**

Person schema with name, jobTitle, url, sameAs (GitHub, LinkedIn, Instagram).

**Step 4: Improve OG metadata**

Add `metadataBase`, complete OG fields, Twitter card.

**Step 5: Commit**
```bash
git add src/app/sitemap.ts src/app/robots.ts src/app/layout.tsx && git commit -m "feat: add sitemap, robots.txt, structured data, and OG metadata"
```

---

### Task 7: Add resume/CV download button

**Files:**
- Modify: `src/components/Nav.tsx` — add CV button (desktop)
- Modify: `src/components/Contact.tsx` — add CV download CTA
- Note: actual PDF to be added to `public/cv.pdf` by user

**Step 1: Add CV button to Nav**

Next to "Available for hire", add a download icon button linking to `/cv.pdf`.

**Step 2: Add CV CTA in Contact section**

Secondary button "Download CV" below the email CTA.

**Step 3: Commit**
```bash
git add src/components/Nav.tsx src/components/Contact.tsx && git commit -m "feat: add resume/CV download button to nav and contact"
```

---

### Task 8: Polish & optimize

**Files:**
- Modify: `src/app/privacy/page.tsx` — match site styling (use var(--bg) instead of bg-black)
- Optimize: convert `SmoothScroll.tsx` and `not-found.tsx` layout patterns

**Step 1: Fix privacy page styling**

Replace `bg-black` with site's bg color, use amber accent for links instead of blue.

**Step 2: Commit**
```bash
git add -A && git commit -m "fix: align privacy page styling with site theme"
```

---

## Execution Order

1. Task 1 — Cleanup (2 min)
2. Task 4 — Case study data + highlights (needs to happen before filters reference data)
3. Task 2 — Project filters (5 min)
4. Task 3 — Experience timeline (5 min)
5. Task 5 — Instagram + Footer (5 min)
6. Task 6 — SEO (5 min)
7. Task 7 — CV download (3 min)
8. Task 8 — Polish (2 min)

Total: ~8 tasks, all code changes, no external deps needed.
