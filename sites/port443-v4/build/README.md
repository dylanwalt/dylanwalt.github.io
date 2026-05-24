# Port443 V4 — Build

Fourth pass at the Port443 rebuild, produced with the
`website-rebuild-pro` skill.

V4 keeps v3's product-led editorial architecture (the closest the Port443
brand has felt to its actual category) and applies the user's content +
visual revisions:

- **Accent colour**: blue (`#3d7bff`) → green (`#22c55e`), restoring the
  v1/v2 brand-continuity green that the original Port443 wordmark uses.
- **Hero H1**: "Port443. Enhancing the security posture through
  observability, visibility and automated attestation."
- **Proof rail**: three substantive claims about scale, geography, and
  delivery model — no more abstract "Operating across MEA" tile.
- **The Loop**: re-narrated as **Analyze → Remediate → Validate** to
  match how Port443 actually delivers attestation. The pinned diagram's
  centre reads "Automated Attestation" instead of a synthetic posture score.
- **Consulting**: re-positioned as Cyber Security Assessments, including
  information security policy and incident response policy definition
  and development.
- **OneView**: re-titled "Consolidate security posture", with cross-control
  observability + third-party independent governance framing.
- **vueITall** added as the fifth Core Service highlight card with the
  "Automated Observability and Visibility — powered by Port443 (Pty) Ltd"
  tagline.
- **ISO references removed** site-wide, including in the hero meta strip,
  service capability lists, frameworks rail, comparison strip, and
  insights cards.
- **New logo** SVGs (`logo-shield-white.svg`, `logo-shield-color.svg`)
  matching the supplied shield + padlock + circuit-trace lockup.

The page architecture is otherwise inherited from v3 (sticky product
subnav, scroll-pinned signature, color-swatch services, compare strip,
in-the-wild rail), and the three ★ anchors from the industry brief
(Wiz, Tines, Linear) still gate the design plan.

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
NEXT_PUBLIC_BASE_PATH=/port443-v4 npm run build
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

- Public assets live at `public/port443-v4/`. The home experience references
  them as `/port443-v4/<file>` so `basePath` and `liftSlugAssets` in the
  export script resolve correctly.
- Subroutes: `/about-us/`, `/services/`, `/request-a-demo/`. Each reuses the
  shared `SiteNav`/`SiteFooter` from `components/v4/chrome.tsx`.
- Reduced motion: every effect collapses gracefully — the Loop pin releases
  into a three-up grid, cross-fades become instant swaps, the posture ring
  renders at its final value, and counters render their final number.
