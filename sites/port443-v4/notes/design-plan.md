# Port443 V4 — Design Plan

Each of the five plan decisions cites a sector anchor from
`notes/industry-inspiration.md`, a named pattern from the
`.codex/skills/website-rebuild-pro/references/apple-design-language.md`
reference, or a concrete source-brand constraint.

## Hero architecture

**Decision**: Type-led, off-centre split. Left ≈ 50%: eyebrow chip
("CYBER DEFENCE AUTOMATION — MEA"), H1 over two rows, sub-line, dual CTA.
Right ≈ 50%: a calm OneView dashboard surface (posture ring, four framework
rows, three-line evidence log) — not a radar, not a terminal.

**Citations**:

- ★ Wiz — type-led hero with calm product surface anchor.
- ★ Linear — H1 sentence as the claim, dual-CTA pattern.
- Apple design-language: page archetype A (product hero page), off-centre
  product still + lockup-left variant; rule "H1 = product name on a single
  line; sub-headline ≤ 90 characters."
- Source constraint: no first-party UI screenshots exist; the OneView
  surface is composed from primitives so nothing is faked.

## Typography stack

**Decision**:

- Display: `Geist Sans` weights 500–700, tracked tight on hero (`-0.025em`).
- Body: `Geist Sans` weights 400–500.
- Mono: `Geist Mono` for codes, framework names, status pills, and footnotes.
- Scale: hero H1 ≈ `clamp(48px, 7vw, 96px)`; section H2 ≈ `clamp(36px, 5vw, 64px)`;
  body 17px / 1.5; caption 13px / 1.45.

**Citations**:

- ★ Linear — display-dominant editorial scale.
- ★ Vercel — Geist Sans as the precedent typeface family in modern B2B tech.
- Apple design-language: typography scale table (`display-xl`, `display-lg`,
  `body-lg`, `body`, `caption`).
- Anti-pattern broken: explicit refusal to use Inter for brand identity per
  taste-skill rules, and refusal to use SF Pro from the Apple reference.

## Component architecture

**Decision**: A single client-rendered `HomeExperience` module containing
purpose-built sections (HeroNav, HeroSplit, ProofRail, HighlightsReel,
LoopNarrative, OneViewBand, ServicesSwatch, FrameworksRail, RegionalPresence,
ComparisonStrip, InsightsFeed, ContactStage, SiteFooter). Each section
controls its own width (full-bleed band) and inner content is constrained by
a shared `Container` to a max width of 1280px. Subroutes (`/about-us`,
`/services`, `/request-a-demo`) reuse the same nav and footer with focused
content blocks.

**Citations**:

- Apple design-language: section-rhythm pattern (light → dense → light →
  dense, full-width bands with constrained inner content).
- ★ Wiz — alternating ink and ivory bands as the section grid.
- Source constraint: GH Pages static export requires App Router with
  `output: "export"`; client components carry all motion.

## Motion paradigm

**Decision**:

- **Sticky product subnav** appears after the hero exits (`IntersectionObserver`
  on the hero sentinel).
- **Staged entrance reveal** on every section (translate-y 24px → 0, opacity
  0 → 1, stagger 80ms).
- **Scroll-pinned Loop section** — three states (`Signal → Correlate → Contain`)
  pinned for ~3 viewport heights, scrubbed via Framer Motion `useScroll` +
  `useTransform`; left-column SVG diagram builds; right-column copy and
  evidence rows swap.
- **Color-swatch cross-fade** on the Services section — selecting a service
  cross-fades the surface in ~450ms.
- **Counter animation** (count-up) on the proof rail metrics on first view.
- **Posture-score ring** animates `stroke-dashoffset` from full to
  target on intersection.
- **Sparkline draw** on the OneView surface chart on intersection.

**Citations**:

- ★ Tines — scroll-pinned signature canvas as the page's interaction landmark.
- ★ Wiz — calm cross-fade between product modules.
- Apple design-language motion table: sticky product subnav, staged
  reveal-on-enter, scroll-pinned section, colour-swatch cross-fade, magnetic
  CTA hover, expand drawer for FAQ-style detail.
- Reduced motion: every effect collapses per the table in the Apple
  reference; documented inline in the experience brief.

## Conversion path

**Decision**:

- Primary `Request a demo` lives in: global nav (right), sticky subnav,
  hero, end of every product band, contact stage.
- Secondary `See OneView` (anchor to the OneView band) lives in the hero and
  the sticky subnav.
- Tertiary `Read the brief` (anchor to the consulting band) lives in the
  Services swatch only.
- Comparison strip closes with one `Request a demo` CTA at the bottom of the
  card stack.
- Contact stage uses a sober two-field form (work email, organisation) +
  service-of-interest swatch — no chat widget, no marketing field bloat.

**Citations**:

- Apple design-language: CTA hierarchy table (primary filled pill, secondary
  text-link with trailing arrow, tertiary neutral text-link); "primary CTA
  appears in sticky nav, hero, after major beats, and just before footer."
- ★ Wiz — single primary `Get a demo`, kept everywhere; calm secondary.
- ★ Tines — calm secondary text-link as a quiet partner to the primary
  button.

## Reduced-motion strategy

**Decision**:

- Wrap all motion in `<MotionConfig reducedMotion="user">`.
- `useReducedMotion()` short-circuits the Loop pin into a static three-up
  grid; the diagram renders at its final state.
- The colour-swatch cross-fade becomes an instant swap.
- The posture-score ring renders at its final value.
- Counters render at their final numeric value.
- Sparklines render at their final path.
- All content (copy, framework chips, evidence rows) is identical between
  motion-on and reduced-motion paths.
- Focus styles: 2px brand-blue ring with 2px offset on every interactive
  element.

**Citations**:

- Apple design-language: accessibility and reduced-motion section.
- Immersive-experience reference: motion-map and reduced-motion column.
- Taste-skill reference: motion-and-interaction policy.

## Stack

- Next.js 16 App Router with `output: "export"` for GitHub Pages.
- TypeScript, strict mode.
- Tailwind v4 with CSS custom properties for theming.
- Framer Motion for all client-side motion.
- Lucide React for icon glyphs.
- Geist Sans + Geist Mono via `next/font/google`.

## Palette

- `--ink: #0a0e16` — near-black chrome and dark section background.
- `--ink-2: #11151f` — surface on dark bands.
- `--ink-3: #1a2030` — border on dark bands.
- `--ivory: #f7f6f2` — near-white chrome and light section background.
- `--ivory-2: #ffffff` — surface on light bands.
- `--ivory-3: #e7e5dc` — border on light bands.
- `--green: #22c55e` — single chroma accent, used on primary CTAs and on
  diagram strokes only. Distinct from Apple's `#0071e3`. **Replaces v3's
  blue, restoring brand continuity with v1/v2 which used green.**
- `--green-soft: rgba(34, 197, 94, 0.14)` — focus ring and chip backgrounds.
- `--green-bright: #a8ffce` — the v2 electric-mint highlight, used in
  small accents and on the colour logo's circuit traces only.
- `--green-deep: #0e6b54` — deeper forest variant for hover and depth.
- `--forest: #0e6b54` — live-status indicator only; never decorative.
- `--rose: #fb7185` — threat-state indicator only; never decorative.
- `--muted-on-ink: #8a93a4` — secondary text on dark.
- `--muted-on-ivory: #5b6473` — secondary text on light.

Sections strictly alternate ink and ivory backgrounds.

## Reject

- The cyberpunk command-centre direction (radar, terminal feed, neon mint).
- Inter as brand display type.
- SF Pro, the Apple wordmark, the Apple CTA blue (`#0071e3`).
- Generic glassmorphism, blob gradients, purple gradients.
- Rounded-corner card decks.
- Invented metrics, customer logos, or awards.

## V4 deltas (from V3)

V4 inherits V3's architecture wholesale. Content + visual changes only:

- **Accent palette**: blue → green per user direction (continuity with v1/v2).
  All `var(--blue)` token usage renamed to `var(--green)`.
- **Hero H1**: replaced with "Port443. Enhancing the security posture through
  observability, visibility and automated attestation."
- **Proof rail**: 4 abstract tiles → 3 substantive claims about
  scale ("Thousands of controls across multiple clients and geographies"),
  reach ("Implemented within many clients and across multiple industries"),
  and delivery ("Delivered SaaS, consumption-based, across any geography
  with a hyperscale presence").
- **Core services header**: "The five things Port443 does, in the order
  you'd ask about them." → "Core services."
- **OneView highlight**: "One independent posture view" → "Consolidate
  security posture." Body re-written to cross-control observability +
  third-party independent governance.
- **Consulting highlight**: "Exposure to roadmap" → "Cyber Security
  Assessments." Body re-written to include "information security policy
  and incident response policy definition and development."
- **Region (5th highlight)**: replaced with "vueITall — Automated
  Observability and Visibility — powered by Port443 (Pty) Ltd."
- **Loop narrative**: Signal / Correlate / Contain → Analyzing / Remediate
  / Validate, with new copy per the user's spec. Centre of the loop
  diagram reads "AUTOMATED ATTESTATION" instead of a synthetic 94.2
  posture score.
- **ISO references**: scrubbed site-wide (hero meta strip, services array,
  frameworks rail, comparison rows, insights cards, OneView bullets,
  evidence rows).
- **Logo**: new shield + padlock + circuit-trace SVGs (`logo-shield-white.svg`
  and `logo-shield-color.svg`) in `public/port443-v4/`.
