# South Side V2 — Design Plan

Each plan decision cites an anchor from
`notes/industry-inspiration.md`, a named pattern from
`.codex/skills/website-rebuild-pro/references/apple-design-language.md`,
or a concrete source-brand constraint.

## Hero architecture

**Decision**: Off-centre split. Left ≈ 55%: eyebrow chip
("HARD SODA · SOUTH AFRICA"), single-line H1, supporting tasting cue that
swaps with the active flavour, dual CTA (`Find a store`, `Explore flavours`).
Right ≈ 45%: a single large SVG can that re-colours and re-labels when the
viewer clicks a flavour swatch row beneath the can. A narrow accent band
behind the can also cross-fades to the active flavour.

**Citations**:

- ★ Liquid Death — type-led hero with floating can; permission to flood
  one colour at a time.
- ★ De La Calle — flavour-as-portrait; the can is the protagonist.
- Apple design-language: page archetype A hero pattern *Color-shifting
  product* (iPhone colour, MacBook Air colour) — "use when multiple
  colour variants are part of the story." South Side has exactly five.
- Source constraint: no first-party can photography; SVG primitives let
  the colour-shift hero be honest rather than faked.

## Typography stack

**Decision**:

- Display: **Fraunces** (variable, expressive serif via `next/font/google`,
  weights 500–800; opsz axis at high values for hero) — used by craft
  beverage brands and gives editorial personality without going luxury-cold.
- Body: **Manrope** (neo-grotesk, weights 400–600).
- Mono: **JetBrains Mono** for codes, spec rail, and footnotes.
- Scale: hero H1 ≈ `clamp(48px, 7.2vw, 104px)`, section H2 ≈
  `clamp(36px, 5vw, 64px)`, body 17px / 1.55, caption 13px / 1.45.
- Display tracking tight (`-0.025em`) on hero; body normal.

**Citations**:

- ★ De La Calle — warm editorial display + neutral sans body.
- ★ Liquid Death — confidence of the display scale.
- Apple design-language: typography scale and "tracking tightens as size
  grows" rule.
- Anti-pattern broken (taste-skill): explicit refusal to use Inter for
  brand identity, and refusal to borrow SF Pro or Apple's CTA blue.

## Component architecture

**Decision**: One client-rendered `HomeExperience` module. Shared
`Container` (max 1280px). Sections: SiteNav, HeroSwatch, SpecRail,
FlavourReel, FlavourBandLadder, RecipePinned, ComparisonStrip,
StockistLocator, InTheWild, SiteFooter. The can SVG is its own
component (`CanShape`) that takes a `flavour` prop and re-renders body
fill, label tint, and pull-tab. The whole experience runs from a single
React state for the active flavour, lifted from the hero so the
flavour-band ladder and the spec rail can subscribe to it.

**Citations**:

- Apple design-language: section-rhythm pattern (light → dense → light →
  dense, full-width bands).
- ★ De La Calle — flavour bands as the page's chapter structure.
- Source constraint: static export means all state lives in client
  components; no server interactivity.

## Motion paradigm

**Decision**:

- **Hero swatch cross-fade**: 450ms cubic-bezier(0.22, 0.61, 0.36, 1).
  Cross-fades the can body fill, label tint, accent band behind the can,
  and the supporting tasting line under the H1.
- **Floating-can breathe loop**: subtle 4-axis float (≤ 4px), 5s loop,
  paused under reduced motion.
- **Spec rail count-up** on first view (calorie / sugar / ABV numbers
  count to final values).
- **Staged entrance reveal** on every section (translate-y 20px → 0,
  opacity 0 → 1, stagger 80ms across siblings).
- **Scroll-pinned recipe sequence**: three states (`Spring water → real
  fruit → premium vodka`), pinned for 3 viewport heights, scrubbed via
  Framer Motion `useScroll` + `useTransform`. Builds an additive can
  illustration: layer 1 (water), layer 2 (fruit), layer 3 (vodka),
  finished can.
- **Magnetic primary CTA** on the locator band only (subtle, ≤ 6px).

**Citations**:

- Apple design-language motion table: *Color swatch cross-fade* (iPhone
  pattern), *Scroll-pinned section* (camera/AirPods reveal), *Staged
  reveal on enter*, *Generative type wobble / breathe* (HomePod mini
  pattern), *Magnetic CTA hover*.
- ★ Liquid Death — confident "everything floods one colour" reveal.
- ★ De La Calle — calm staged reveals on each flavour band.
- Reduced motion: cross-fade → instant swap, pin → three-up grid,
  breathe → static, count-up → final value.

## Conversion path

**Decision**:

- Primary `Find a store` everywhere the page asks for action: nav,
  hero, end of each flavour band, locator band, footer.
- Secondary `Explore flavours` (anchor) in the hero and nav.
- Tertiary `Follow on Instagram` (external) in the InTheWild section
  and footer only.
- All retail and social links go to the existing canonical URLs on
  south-side.co.za and instagram.com — no fake forms, no fake
  newsletter.

**Citations**:

- ★ High Noon — locator-led conversion architecture (FIND HIGH NOON).
- Apple design-language: CTA hierarchy table (primary filled pill,
  secondary text-link with trailing arrow, tertiary neutral text-link);
  "primary CTA in sticky nav, hero, after major beats, and just before
  footer."
- Source constraint: South Side is retail-shelf, not DTC — pretending
  there's a "buy now" button would be a lie.

## Reduced-motion strategy

**Decision**:

- Wrap all motion in `<MotionConfig reducedMotion="user">`.
- `useReducedMotion()` short-circuits the recipe pin into a three-up grid.
- Cross-fades collapse to instant swaps.
- Breathe loops stop.
- Counters render final value immediately.
- All copy is identical between motion-on and reduced-motion paths.
- Focus styles: 2px brand-accent ring with 2px offset on every interactive
  element.

**Citations**:

- Apple design-language: accessibility and reduced-motion section.
- Immersive-experience reference: motion-map reduced-motion column.

## Stack

- Next.js 16 App Router with `output: "export"` for GitHub Pages.
- TypeScript strict.
- Tailwind v4 with CSS custom properties for the per-flavour palette
  (CSS variables flip when the active flavour state changes).
- Framer Motion for motion.
- Lucide React for icon glyphs.
- Fraunces + Manrope + JetBrains Mono via `next/font/google`.

## Palette

- **Foundations**:
  - `--ink: #0a1626` — deep navy (carried from v1, modernised).
  - `--ink-2: #11203a` — surface on dark.
  - `--ink-3: #1d2f4d` — border on dark.
  - `--cream: #f4eada` — warm cream, the calm chrome (replaces the
    glassmorphic white from v1).
  - `--cream-2: #ffffff` — surface on cream.
  - `--cream-3: #e3d8b9` — border on cream.
  - `--accent: #f8b75a` — heritage amber, kept from v1 as a continuity cue.
- **Per-flavour palette** (set as CSS vars on `.flavour-*` modifier):
  - `cranberry-raspberry`: `#c8324d` (deep cranberry red)
  - `passion-fruit`: `#f5a623` (tropical gold)
  - `mango-orange`: `#ff7d3a` (bright mango)
  - `pineapple-coconut`: `#7fd1a4` (mint-coconut, with cream secondary)
  - `lime-lemon`: `#cce652` (electric chartreuse)
- The full hero band, can body, and accent rail flood the active flavour
  colour. Body chrome remains either ink or cream.

## Reject

- Glassmorphic rounded cards with amber underlines (v1 South Side).
- Generic party-lifestyle stock imagery.
- Health-functional language ("prebiotic," "calm," "wellness").
- Inter for brand identity.
- SF Pro, the Apple wordmark, the Apple CTA blue.
- Invented customer quotes, awards, retail names beyond PnP / Spar /
  Liquor City, or numeric metrics beyond the verified 5% ABV / 72 cal /
  3g sugar.
