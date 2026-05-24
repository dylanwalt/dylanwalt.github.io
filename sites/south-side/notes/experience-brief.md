# South Side V2 — Experience Brief

## Experience thesis

Make South Side feel like **a craft hard soda you'd actually pull off a Cape
Town shelf** — bold-colour-banded, product-led, type-led, and confidently
local — by treating the can as the protagonist, the five flavours as the
colour system, and the retail locator as the page's gravitational centre.
Borrow Liquid Death's confidence, De La Calle's flavour-portrait care, and
High Noon's locator-led conversion architecture.

## First viewport

- **Brand signal**: South Side wordmark + small "Hard Soda · South Africa"
  meta in the top nav.
- **Hero scene**: off-centre split. Left: a heritage-coloured eyebrow,
  large H1 (single sentence), one supporting line, dual CTA (`Find a store`,
  `Explore flavours`). Right: a single floating can composed from SVG
  primitives, large enough to be the page's protagonist; the can's body
  colour and label tint cross-fade as flavour swatches are clicked.
- **Conversion path**: primary `Find a store` (external link to
  south-side.co.za/storelocator); secondary `Explore flavours` (anchor to
  the flavour band).
- **Next-section hint**: a slim ingredient rail just below the fold
  (Vodka · Spring water · Real fruit · 72 cal · 3g sugar · 5% ABV).

## Section sequence

1. **Hero (flavour swatch)** — the colour-shifting hero. Picking a swatch
   re-colours the can and floods a narrow accent band behind it.
2. **Spec rail** — six-cell calm row: 5% ABV / 72 cal / 3g sugar /
   gluten-free / sparkling spring water / real fruit.
3. **Flavour reel** — Apple "Get the highlights" pattern with five cards,
   one per flavour, each a quiet portrait in that flavour's colour.
4. **Flavour-band ladder** — five full-bleed bands, alternating dark-ink
   and that flavour's colour, each showing the can, the ingredient line,
   one tasting note, one ideal moment (Lime & Lemon → braai weather, etc.).
   The bands are paced light-dark-light-dark for tempo (Apple section
   rhythm).
5. **Recipe / how it's made (scroll-pinned)** — three states
   (`Spring water → real fruit → premium vodka`), pinned for ~3 viewport
   heights, with a building can illustration. (Tines / Apple-pinned
   signature.) Reduced motion: pin releases and the three states render
   as a three-up grid.
6. **Why South Side (compare strip)** — Port443-style comparison table:
   South Side vs. Mass hard seltzer vs. Premixed cocktail. Honest "yes /
   partial / no" cells. (Apple compare-strip pattern.)
7. **Stockist locator band** — single calm band naming PnP, Spar, and
   Liquor City with the locator CTA. (High Noon's locator-led
   conversion.)
8. **In the wild (insights / social)** — three editorial cards linking to
   the Instagram feed and any press; no invented quotes.
9. **Contact / footer** — site map + retail-locator CTA repeated.

## Signature interaction

The hero **flavour-swatch cross-fade**: clicking a swatch drives a 450ms
cross-fade across:
- the can body colour
- the can label tint
- a narrow accent band behind the can
- the supporting line under the H1 (one-line tasting cue per flavour)

Under `prefers-reduced-motion: reduce` the cross-fade becomes an instant
swap. All five flavour states are reachable by keyboard via arrow keys on
the swatch group.

## Three anchor references this experience responds to

1. **Liquid Death** — confidence and scale of bold-coloured bands;
   permission to flood the viewport in one flavour at a time.
2. **De La Calle** — flavour-as-portrait, ingredient honesty, heritage
   storytelling.
3. **High Noon** — closest functional analog (premium vodka soda RTD) and
   the retail-locator-led conversion architecture (which v1 South Side
   already gets right and v2 keeps).

## Assets

- No first-party can photography. Compose the can from SVG primitives:
  body cylinder, top/bottom rims, pull-tab, label area with the South Side
  wordmark and flavour name. Body fill cross-fades on flavour change.
- Real Instagram URL and storelocator URL kept as the only external links.
- No invented customer quotes, awards, or numeric metrics beyond the
  product spec.

## Reduced-motion strategy

- Cross-fade swatch becomes an instant swap.
- Scroll-pinned recipe section releases into a three-up grid.
- Ambient gradient drift on band backgrounds becomes static.
- The floating-can "breathe" loop pauses.
- All copy and CTAs are identical between motion-on and reduced-motion
  paths; the swatch is fully keyboard accessible.
