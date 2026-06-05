# Port443 V5 — Build

Fifth pass at the Port443 rebuild, produced with the
`website-rebuild-pro` skill.

V5 keeps the product-led editorial architecture, deepens the hero, and
pushes the site toward a calmer, more premium control-room feel:

- **Accent colour** stays green (`#22c55e`) to keep continuity with the
  original Port443 wordmark.
- **Hero** becomes a split editorial control room: a sharper claim on the
  left, a calmer evidence and coverage surface on the right.
- **Proof rail** is revised into evidence-led statements instead of generic
  marketing tiles.
- **The Loop** remains the signature scroll-pinned section, but the copy is
  tightened around observe → remediate → verify.
- **OneView** is expanded into a larger product band and paired with a real
  regional photo block to break the page rhythm.
- **Frameworks / insights / CTA** are kept, but each section is restated in
  a more authoritative tone.
- **New logo** assets now use the supplied shield + lockup across the site,
  with a full lockup for primary brand placements and a compact shield mark
  for dense UI surfaces.

The page architecture is still product-led (sticky subnav, scroll-pinned
signature, product bands, evidence rails), and the three star anchors from
the industry brief (Wiz, Tines, Linear) still gate the design plan.

See:

- `../notes/industry-inspiration.md` — the top-15 sector brief that gates the
  design plan
- `../notes/brand-brief.md`
- `../notes/experience-brief.md`
- `../notes/design-plan.md`

## Local run

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

For the hero comparison lab, open `http://localhost:3000/hero-lab/`.

## Static export (matches the GitHub Pages workflow)

```bash
NEXT_PUBLIC_BASE_PATH=/port443-v5 npm run build
```

The deployable artifact ends up under `out/`. The repo's
`scripts/export-pages.mjs` wraps this and assembles `pages-dist/` for GitHub
Pages, lifting the slug-nested assets out into the public route root.

## Stack

- Next.js 16 App Router with `output: "export"` for GitHub Pages
- TypeScript strict
- Tailwind v4 + custom CSS variable theme
- Framer Motion for entrance, scroll-pinned scrubs, and cross-fades
- `lucide-react` for icon glyphs
- Geist Sans + Geist Mono via `next/font/google`
- Green accent (`#22c55e` primary, `#a8ffce` bright highlight,
  `#0e6b54` deep) in place of v3's blue

## Asset and route notes

- Public assets live at `public/port443-v5/`. The site now uses
  `logo-full.webp` and `logo-mark.webp` from that folder for shared brand
  placements, and still resolves them as `/port443-v5/<file>` so `basePath`
  and `liftSlugAssets` in the export script work correctly.
- `hero-lab/` is a local-only comparison route that stacks five hero
  treatments inspired by Linear, Wiz, Tines, Vanta, and Cloudflare while
  keeping the Port443 copy unchanged.
- Subroutes: `/about-us/`, `/services/`, `/request-a-demo/`. Each reuses the
  shared `SiteNav`/`SiteFooter` from `components/v4/chrome.tsx`.
- Reduced motion: every effect collapses gracefully — the Loop pin releases
  into a three-up grid, cross-fades become instant swaps, the posture ring
  renders at its final value, and counters render their final number.
