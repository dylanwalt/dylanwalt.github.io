# Port443 V3 — Build

Third pass at the Port443 rebuild, produced with the
`website-rebuild-pro` skill.

V3 resets the direction. Where v1 was a basic network hero and v2 leaned into
the cyberpunk command-centre aesthetic (radar, terminal feed, electric mint),
v3 follows the skill's new pre-build research gate and the Apple design-language
reference. It treats Port443 as a **product-led editorial site** in the manner
of Wiz, Tines, and Linear: a real OneView surface in the hero, a scroll-pinned
`Signal → Correlate → Contain` narrative as the signature interaction, and
restrained editorial typography throughout.

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

## Static export (matches the GitHub Pages workflow)

```bash
NEXT_PUBLIC_BASE_PATH=/port443-v3 npm run build
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

## Asset and route notes

- Public assets live at `public/port443-v3/`. The home experience references
  them as `/port443-v3/<file>` so `basePath` and `liftSlugAssets` in the
  export script resolve correctly.
- Subroutes: `/about-us/`, `/services/`, `/request-a-demo/`. Each reuses the
  shared `SiteNav`/`SiteFooter` from `components/v3/chrome.tsx`.
- Reduced motion: every effect collapses gracefully — the Loop pin releases
  into a three-up grid, cross-fades become instant swaps, the posture ring
  renders at its final value, and counters render their final number.
