# South Side — Brand Brief (V2)

## One-liner

South Side is a **premium hard soda from South Africa** — vodka, real fruit,
sparkling spring water, 5% ABV, 72 calories, 3g sugar. Crafted for the heat,
sold chilled at PnP, Spar, and Liquor City.

## Audience

- Young adults 20–35, urban South Africa
- Drinkers who value craft, low-sugar, and local provenance over mass-market
  hard seltzer
- Occasions: summer, evenings out, sundowner moments, party settings
  where the host curates what's in the fridge

## Primary CTA

- `Find a store` (retail locator on south-side.co.za)

## Secondary CTAs

- `Explore flavours` (anchor to the flavour band)
- `Follow on Instagram` (community proof; reposts of in-the-wild moments)

## Offer / Product truth

- **Form**: 250–330ml can (RTD), 5% ABV
- **Per can**: 72 calories, 3g sugar, gluten-free
- **Base spirit**: premium vodka
- **Mixer**: sparkling spring water + real fruit flavour (no artificial)
- **Flavours (current line-up)**:
  1. Cranberry & Raspberry
  2. Passion Fruit
  3. Mango & Orange
  4. Pineapple & Coconut
  5. Lime & Lemon
- **Retail**: Pick n Pay, Spar, Liquor City — nationwide stockists
- **Voice**: confident, energetic, authentic, refined street culture

## Voice / Tone

- Confident, energetic, authentic
- Refined street — bold but considered, not loud-for-loudness's-sake
- South African vernacular allowed but not forced (avoid clichéd "lekker"
  for its own sake)
- Bias toward the moment, the can, and the heat — not toward functional /
  wellness language
- Avoid breathless health claims and party-mass rhetoric in equal measure

## Proof / Trust signals

- Sold at major South African retailers (Pick n Pay, Spar, Liquor City).
- Real product (5% ABV / 72 cal / 3g sugar) — quotable and verifiable.
- Real fruit + premium vodka — verifiable ingredient story.
- No invented awards, customer logos, or numeric metrics.

## Visual constraints

- No first-party photography available in `public/`. The rebuild composes
  the can shape from SVG primitives that recolour per flavour — this is a
  feature, not a constraint: it makes the flavour-swatch cross-fade
  signature interaction trivial.
- The existing source site (south-side.co.za) uses navy + amber chrome with
  glassmorphic cards. The rebuild deliberately breaks the glassmorphic
  pattern (see anti-patterns in `industry-inspiration.md`) while keeping
  navy as one of two foundational chromes.

## Versions context

- **V1** — the existing build in `sites/south-side/build/` before this
  rebuild: glassmorphic rounded-card stack on dark navy with amber accents;
  generic premium "fintech-dashboard" feel that doesn't carry craft soda
  energy.
- **V2** — this rebuild. Resets to **product-led, bold-colour-band, type-led**
  in the manner of Liquid Death, De La Calle, and High Noon (the three ★
  anchors). The can is the protagonist; flavour is the colour system.
