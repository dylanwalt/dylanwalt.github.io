# Apple Design Language Reference

Read this reference before designing or building any rebuild that should feel
premium, product-led, editorial, or hardware-grade. Apple.com is the canonical
reference for product marketing sites; this document distills the patterns that
recur across its product pages (iPhone, iPad, Mac, Apple Watch, AirPods, Vision
Pro, HomePod, AirTag, Studio Display) and the hubs that connect them.

Do not literally clone Apple's pages or wordmark. Borrow the structural and
behavioral patterns, then translate them through the source brand's actual
material, voice, and subject matter. If a pattern feels untranslatable, drop it
rather than dilute the brand.

## 10 macro principles

1. **Product is the hero.** Real, isolated, dimensional product photography on a
   neutral stage. Backgrounds defer; the object carries the page.
2. **Generous negative space.** Hero viewports are mostly air. Every subsequent
   section is allowed to breathe.
3. **One claim per beat.** Each section makes one promise, supports it with one
   visual, and moves on. Sections do not stack three benefits in one band.
4. **Cinematic, paced scroll.** The page is a sequence of staged moments, not a
   list of features. Tempo shifts (full-bleed → compact spec → wide narrative)
   are deliberate.
5. **Typography is the spine.** Display type is huge, tight, and confident. Body
   copy is small, well-leaded, and short. No decorative type.
6. **Restraint in color.** Page chrome is white, near-white, or true black.
   Saturated color enters only through product imagery, color swatches, or
   capability accents.
7. **Motion that explains.** Animation reveals structure (camera modules, chip
   architecture, port layout) or progress (scroll-pinned scrubs through a
   sequence). It is never decorative wallpaper.
8. **Repeatable conversion bar.** A primary `Buy` CTA is in the sticky nav, in
   the hero, after major feature beats, and just before the footer. Secondary
   `Learn more`, `Compare`, `Watch the film`, and `View in your space` always
   sit beside it as quiet text links.
9. **Footnotes are first-class.** Numbered superscripts on claims map to a
   block of legal/spec footnotes near the footer. Trust is built by being
   willing to qualify the claims.
10. **Ecosystem before goodbye.** Every product page ends by routing into
    siblings ("Keep exploring iPhone…"), accessories, and the comparison hub.

## Page archetypes

Apple ships roughly six recognizable page archetypes. Map the brief to one of
these before designing.

### A. Product hero page (the canonical model)

Used by every flagship product (iPhone 17 Pro, MacBook Pro, iPad Pro, AirPods
Pro, Apple Watch Ultra, Vision Pro). Long-scroll, 8–14 sections.

Common section order:

1. **Sticky product subnav** — slim, second-tier nav appears under the global
   nav when the page enters; left-aligned product name, right-aligned anchor
   links and a `Buy` button.
2. **Hero** — H1 = product name; sub-headline = one terse claim
   ("Heat-forged aluminum unibody design for exceptional pro capability."); a
   single hero render or scroll-scrubbed sequence; `Buy` + `Watch the film` +
   sometimes `Highlights ↓`.
3. **"Get the highlights" reel** — horizontally scrollable card carousel of
   4–6 thumbnails that each map to a downstream section.
4. **Design / material story** — full-bleed product close-up; copy about the
   chassis material; sometimes an exploded/cutaway view.
5. **Display story** (when applicable) — large content frame of the display
   showing UI/photography to demonstrate brightness, contrast, color.
6. **Performance / chip story** — large chip render floating against black;
   benchmark bars or multiples ("Up to 9.5x faster than M1") with a small "Pro
   workflows" inline gallery.
7. **Camera / signature feature** — scroll-pinned focal-length or capability
   demonstration that scrubs through frames as the user scrolls.
8. **Software / intelligence story** — UI screenshots tiled in a slow-moving
   gallery; copy about Apple Intelligence / iOS features.
9. **Battery / endurance** — one large statistic ("Up to 18 hours of battery
   life") and one supporting line.
10. **Sustainability / values** — one short paragraph, one icon row, link to
    environmental report.
11. **Comparison strip** — horizontally swipable cards showing this product vs.
    siblings, with capability rows (Design, Camera, Chip, Battery).
12. **"Keep exploring …" tile rail** — three-up image tiles linking to
    accessories, services, and sibling products.
13. **Footer footnotes** — numbered claims block.
14. **Global footer** — site map.

### B. Family / hub page

Mac, iPad, iPhone, Apple Watch hubs. Single viewport per family member with
brand-color photography and 2–4 lines of differentiator copy.

- Banner promo at the top (education savings, trade-in).
- Tile grid grouped by sub-family (Laptops / Desktops / Displays for Mac).
- Each tile: product photo, tagline, one-line differentiator, `Learn more` and
  `Buy` links.
- "Help me choose," "Compare," "Trade in," "Personal Setup" rail near the end.
- Closes with shared capability stripes (Apple Intelligence, macOS, iCloud).

### C. Buy / configurator page

Multi-step flow that lives at `/shop/buy-<product>`.

- Step 1: Model — large image, tagline, capability summary, `Select`.
- Step 2: Color — swatch tiles below a large product image that cross-fades on
  selection (about 400–600ms ease).
- Step 3: Storage / size — chip-style toggle group; price recalculates inline.
- Step 4: Connectivity (where applicable) — carrier or eSIM flow.
- Step 5: Trade-in — separate stacked card with input flow.
- Step 6: AppleCare — opt-in card with radio rows.
- Step 7: Payment — finance toggle (full price / monthly) updates the summary.
- A sticky right-rail or bottom summary tracks the running total, product
  thumbnail, and `Add to Bag`.
- Accessory upsell rail at the bottom.

### D. Homepage / "tiles"

A mosaic of asymmetric tiles. Big tile + small tile rows, occasional full-bleed
banners.

- Each tile is its own micro-ad: product image dominant, two-line head, two
  CTAs.
- Background of each tile is sometimes pure white, sometimes a brand-tone
  derived from the product (cosmic orange band for iPhone 17 Pro, sky-blue for
  MacBook Air).
- Horizontal scroller for Apple TV+ / Music content.

### E. Tech specs page

`/specs/` or `/tech-specs/`. Pure information design: jump nav, tables, prose
under headings. White background, tight type, no decoration.

### F. Compare page

`/compare/`. 3–4 columns of product images at the top, then capability rows
beneath. Cells use checkmarks, short text, or numeric values. Sticky header.

## Hero treatment patterns

Pick exactly one for the rebuild's first viewport. Mixing two yields a confused
hero.

| Pattern | Example | When to use |
| --- | --- | --- |
| Centered product still | AirPods Pro, HomePod mini | Single iconic object, no environment needed |
| Off-center product still + lockup left | MacBook Pro, iMac | When copy needs visual weight |
| Color-shifting product | iPhone 17, iPad Air, MacBook Air | Multiple color variants are part of the story |
| Scroll-scrubbed sequence | Vision Pro, AirPods Pro ear-canal | Product reveals depth, layers, or assembly |
| Lifestyle environment | Apple Watch Ultra, Vision Pro | Product is inseparable from context (athletics, spatial) |
| Tagline-only / type-led | "Mmmmm. Power." iPad Pro | Brand voice is the asset |

Common hero invariants:

- H1 = product name in a single line; never two lines.
- Sub-headline ≤ 90 characters, single sentence, ends with a period.
- Primary CTA is `Buy`/`Pre-order`/`Get started`; secondary is a quiet link
  (`Watch the film >`, `Learn more >`).
- No badges, no "NEW!" ribbons. The product itself signals newness.
- The next section is hinted at the bottom of the viewport: a partial peek of
  the next product/headline, never a "↓" indicator.

## Typography system

Apple uses **SF Pro Display** (headlines) and **SF Pro Text** (body), with
**SF Mono** in spec tables. For rebuilds, do not use SF Pro unless licensed —
use Inter only if Apple aesthetics genuinely fit the source brand; otherwise
choose a neo-grotesque (e.g. Söhne, Neue Haas Grotesk, Aeonik, GT America,
Untitled Sans) or whatever the source brand actually uses.

Scale that survives any swap-in:

| Token | Rough size (desktop) | Use |
| --- | --- | --- |
| `display-xl` | 80–128 px, weight 600, line-height 1.05, tracking -0.02em | Hero H1 |
| `display-lg` | 56–80 px, weight 600, tracking -0.015em | Section opener |
| `display-md` | 40–56 px, weight 600 | Feature beat heading |
| `headline` | 28–32 px, weight 600 | Sub-section |
| `body-lg` | 20–22 px, weight 400, line-height 1.4 | Lede paragraphs |
| `body` | 17 px, weight 400, line-height 1.47 | Default body |
| `caption` | 12–14 px, weight 400 | Footnotes, fine print |

Body type stays small. Headlines do all the visual work. Tracking tightens as
size grows.

## Color system

- Page chrome alternates **pure white** (`#fbfbfd`-ish) and **near-black**
  (`#000` or `#1d1d1f`). Sections explicitly alternate to create rhythm.
- Brand color exists only in product imagery and the occasional capability
  accent (e.g. a green health ring, a blue iMessage bubble).
- CTAs use a single brand-blue (`#0071e3` is Apple's). For rebuilds, pick one
  primary CTA color derived from the source palette and keep it constant.
- Avoid gradients on chrome. Color gradients only appear inside product
  imagery or as a hint inside a software UI screenshot (Apple Intelligence
  rainbow shimmer is the rare exception).
- "Liquid Glass" frosting (translucent panels with backdrop blur) appears on
  sticky nav and on macOS Tahoe demos; use sparingly and only over product
  imagery.

## Section rhythm patterns

A long Apple page is a paced sequence of named beats. The recurring beats:

1. **Open** — full-bleed hero.
2. **Reel** — horizontal-scroll highlight cards.
3. **Material/Design** — close-up + one paragraph.
4. **Display/Surface** — large content frame.
5. **Performance** — chip render + benchmark blocks.
6. **Signature** — scroll-pinned interactive demo.
7. **Software** — UI gallery.
8. **Endurance** — single statistic.
9. **Privacy/Values** — short, sober.
10. **Ecosystem rail** — three-up tiles.
11. **Compare strip** — sibling cards.
12. **Footnotes** — numbered claims.

The rhythm is light → dense → light → dense, not uniform. White sections are
followed by black-background sections so the page changes "temperature" every
two beats.

## Motion vocabulary

Apple has a small, repeating motion library. Implement these effects, not
others.

| Effect | Where it's used | How to build it |
| --- | --- | --- |
| **Scroll-scrubbed image sequence** | AirPods reveal, Vision Pro tech, iPhone camera | Preload 100–300 JPGs, draw current frame to a `<canvas>` based on scroll progress; pin the section while it plays |
| **Section pin + content swap** | Camera Control focal-length demo, iPhone Pro zoom | GSAP `ScrollTrigger.create({ pin: true, scrub: 1 })`; advance state by progress thresholds |
| **Color swatch cross-fade** | iPhone color picker, MacBook Air colors | On swatch click, cross-fade the hero `<img>` 400–600ms with cubic-bezier(0.4, 0, 0.2, 1) |
| **Magnetic CTA hover** | Sticky `Buy` button | Translate button toward cursor with damping; cap at ~6px offset |
| **Staged reveal on enter** | Most feature beats | Translate-y 24px → 0 and opacity 0 → 1, staggered 80–120ms across siblings |
| **Pause/play on scroll** | Embedded films | `IntersectionObserver` toggles `.play()` / `.pause()` when 50% visible |
| **AR "View in your space"** | All hero hardware pages | Embed `usdz` model; render an `<a rel="ar">` link with a fallback poster |
| **Sticky product subnav** | Every product page | `position: sticky; top: 0` once the hero exits the viewport; backdrop-blurred background |
| **Compare carousel** | End of every product page | Horizontal flex of cards; native scroll snap on mobile, drag-paginated on desktop |
| **Expand/collapse drawer** | "Tech specs" sections, FAQ | Animate `grid-template-rows: 0fr → 1fr` for smooth height transitions |
| **Generative type wobble** | HomePod mini "mini" letters | Subtle multi-axis float on display type; ≤ 4px amplitude, 4s loop |

Duration defaults: 300–700ms for chrome, 800–1400ms for hero entrance, scrub
durations follow scroll. Easing default: `cubic-bezier(0.4, 0, 0.2, 1)` or
`cubic-bezier(0.22, 0.61, 0.36, 1)`.

Every effect above must have a reduced-motion path. Scroll-scrubbed sequences
collapse to a single still. Cross-fades become instant swaps. Pinned sections
unpin and render as a vertical stack.

## Asset patterns

- Product renders on neutral grey-white (`#f5f5f7`) or true black (`#000`).
- Light source from above-left, soft shadow under the product.
- No people in the hero — people appear in "Story" sections (Vision Pro,
  Apple Watch Ultra) shot in editorial style with shallow depth of field.
- UI screenshots are full-resolution, no device frame chrome unless the
  device frame itself is the point.
- Icons are monochrome line glyphs at ~24px in copy blocks; never colorful
  emoji-grade icons.
- Image-to-data transitions: a product photo dissolves into a wireframe or
  exploded view as the section progresses.

## CTA hierarchy

| Level | Treatment |
| --- | --- |
| Primary | `Buy` — filled pill, brand blue, white text, 17px medium |
| Secondary | `Learn more` — text link, brand blue, trailing arrow `→` |
| Tertiary | `Watch the film` / `Compare` — text link, neutral grey, trailing arrow |
| Inline anchor | Sub-section names that scroll to the right beat |

CTAs never carry icons that compete with the arrow. Buttons are pill-shaped
(border-radius ≥ button height / 2). Hover state lightens or darkens by ~8%,
never adds a shadow.

## Footer architecture

- A "Keep exploring …" rail (3 product tiles) just above the footer is part of
  the product page, not the footer itself.
- The global footer is a multi-column site map (8–12 columns on desktop,
  collapsing accordions on mobile), grouped by:
  - Shop and Learn
  - Apple Wallet / Account
  - Entertainment
  - Apple Store services
  - For Business / Education / Healthcare / Government
  - Apple Values (Accessibility, Environment, Privacy, Inclusion, Racial
    Equity & Justice)
  - About Apple
- A "More ways to shop" line with phone number and store locator.
- A small grey divider, then copyright, region/language selector, legal links.
- Footnotes (numbered) live in a separate block immediately above the footer.

## Accessibility and reduced motion

- Color contrast on all chrome ≥ 4.5:1.
- All scroll-pinned and scroll-scrubbed sequences must collapse to a single
  still under `prefers-reduced-motion: reduce`.
- Focus states are visible: 2px brand-blue ring with 2px offset.
- Every interactive control is reachable with a keyboard; sticky subnavs do
  not trap focus.
- Captions are present on all "Watch the film" videos.

## Things to avoid even when "doing Apple"

- Borrowing Apple's exact wordmark, exact CTA blue, or its product names.
- Using SF Pro without a license.
- Decks of rounded gradient cards — Apple does not ship those; do not ship
  them either.
- Generic abstract floor-tiles, blobby gradients, or stock "happy team"
  photography.
- Decorative scroll-scrubbed video that does not explain anything.
- Long-form lifestyle imagery dropped in to fill space without a feature beat
  attached.

## When to borrow this for the source brand

Map each pattern to a real reason in the source. If the source has:

- a hero hardware product → product-still hero, scroll-pinned reveal, chip
  story analog (the brand's "core mechanism");
- a service or software → tile-grid homepage analog, UI gallery section, no
  performance/chip story;
- a hospitality / venue → lifestyle hero (Apple Watch Ultra analog), but
  product-still beats become "space," "menu," or "team";
- multiple color or material variants → color-swatch cross-fade pattern;
- a configurator / commerce flow → archetype C with the source's actual
  options.

When the source has none of the above, drop the Apple analogy and use a more
appropriate reference from the industry-research brief.
