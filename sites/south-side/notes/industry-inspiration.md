# Industry Inspiration Brief — South Side Soda

## Sector

Premium hard soda — ready-to-drink (RTD) vodka-and-real-fruit beverages, sold
in chilled retail across South Africa. The closest international category is
"premium vodka soda RTD" (High Noon's territory), with strong overlap into
"craft soda DTC" (Olipop, Poppi, De La Calle) for the visual language and
into "challenger drink brand" (Liquid Death) for tone of voice. The buyer is
20–35, values craft and provenance, and shops at PnP / Spar / Liquor City.

## Source brand stance in the sector

South Side sits at the intersection of three positions: it is **a craft
beverage** in feel, **a hard seltzer alternative** in function (5% ABV, low
sugar, low calorie), and **a South African heritage brand** in voice. It
cannot compete on the mass-market spend of White Claw or Truly. It can
out-craft them, out-design them, and own the "made for South Africa, made
for the heat" positioning that nobody else in the regional shelf does well.

The rebuild should answer to the **craft + challenger** end of the
spectrum (Liquid Death, De La Calle, High Noon) rather than the
mass-market hard-seltzer playbook.

## The fifteen

| # | URL | Brand | Bucket | One line |
| - | --- | ----- | ------ | -------- |
| 1 | https://liquiddeath.com | Liquid Death | award ★ | The reference for irreverent, type-led challenger brand at supermarket scale |
| 2 | https://drinkdelacalle.com | De La Calle | award ★ | Editorial craft soda with deep heritage and flavour-as-art treatment |
| 3 | https://drinkolipop.com | OLIPOP | award | Bold color-flooded flavour landing with mass-market polish |
| 4 | https://drinkpoppi.com | poppi | award | Soft-pastel hero, mega type, color-swatch flavour system |
| 5 | https://takearecess.com | Recess | award | Calm, postmodern beverage tone; demonstrates restraint as a flex |
| 6 | https://www.highnoonspirits.com | High Noon | leader ★ | The dominant premium vodka-soda RTD — closest direct analog |
| 7 | https://www.whiteclaw.com | White Claw | leader | The category's mass-market scale brand; useful as a foil, not a model |
| 8 | https://www.trulyhardseltzer.com | Truly | leader | Mass-market hard seltzer; tracks the playbook to break from |
| 9 | https://www.budlightseltzer.com | Bud Light Seltzer | leader | Mainstream RTD; budget-mass tone we explicitly avoid |
| 10 | https://www.cutwaterspirits.com | Cutwater | leader | Premium canned-cocktail leader; the right shelf neighbour |
| 11 | https://athleticbrewing.com | Athletic Brewing | challenger | Modern NA challenger with great brand discipline |
| 12 | https://aplos.world | Aplós | challenger | NA modern spirit — luxury DTC playbook for adult beverage |
| 13 | https://drinkjones.com | Jones Soda | challenger | Cult craft soda with edge — irreverence at retail |
| 14 | https://www.sanpellegrino.com | San Pellegrino | adjacent | Premium glass-bottle Italian soda; lesson in flavour-as-portrait |
| 15 | https://www.aesop.com | Aesop | adjacent | The luxury-DTC tone reference used widely across premium consumer |

### Long-list entries cut

- Stoked, Bawi, Culture Pop — strong craft soda but their sites are weaker
  than Olipop and De La Calle from the same niche.
- Schweppes, Coca-Cola, Pepsi — mass corporate; nothing to borrow.
- South African beer brands (Castle, SAB) — wrong category (beer) and wrong
  tone (mass).
- Jack Black's Brewing Co. (SA) — strong craft brand but the site is more
  brewery-tour than retail-beverage; lessons captured better in Athletic.

## Per-site notes

```yaml
- url: https://liquiddeath.com
  brand: Liquid Death
  bucket: award
  one_line: "Type-led irreverence at supermarket scale — the bar for challenger voice."
  hero:
    archetype: "type-led with floating can; high-saturation contrasting bands"
    h1_pattern: "Slogan as headline (\"MURDER YOUR THIRST\")"
    cta_pattern: "Primary 'SHOP NOW' + secondary 'FIND IN STORE'"
  typography:
    display: "Condensed gothic display, ultra-bold; metal-band lockup"
    body: "Neutral grotesk"
    scale_note: "Display is huge; body is small; everything in caps"
  color:
    chrome: "true black + true white alternating; flavour bands borrow from product"
    accent: "Per-flavour color flood (lime, raspberry, mango)"
  layout:
    section_count: 11
    rhythm: "hero → product reel → flavour bands → press → social rail → CTA"
    grid: "Asymmetric — text and product collide at extreme scale"
  motion:
    signature: "Floating can with subtle rotation; aggressive band swaps; loops of stunt content"
    techniques: ["staged reveal", "horizontal product rail", "in-page video loops"]
    reduced_motion_note: "Loops collapse to stills; static bands carry the page"
  conversion:
    primary_path: "SHOP NOW → DTC store"
    repeat_cadence: "every band"
  copy_voice:
    register: "metal, irreverent, ad-copy provocative"
    sample: "MURDER YOUR THIRST"
  asset_style:
    imagery: "studio can photography + viral stunt content"
    iconography: "metal-band woodcut style"
  weakness: "Voice is so dominant that anything quieter feels inert next to it; do not borrow the voice, only the scale of confidence."

- url: https://drinkdelacalle.com
  brand: De La Calle
  bucket: award
  one_line: "Editorial craft beverage with cultural-heritage storytelling done right."
  hero:
    archetype: "warm-color full-bleed with vintage typography and lifestyle still"
    h1_pattern: "Brand promise + product moniker (\"Tepache, born in Mexico\")"
    cta_pattern: "Primary 'SHOP' + secondary 'FIND US'"
  typography:
    display: "Warm slab/serif hybrid; expressive, illustrated feel"
    body: "Friendly neutral sans"
    scale_note: "Display is medium-large with stylistic flourishes"
  color:
    chrome: "warm cream + terracotta + flavour color floods"
    accent: "Per-flavour earthy palette (pineapple, tamarind, mango)"
  layout:
    section_count: 10
    rhythm: "hero → flavour grid → heritage story → ingredients → recipes → CTA"
    grid: "12-col with editorial breaks"
  motion:
    signature: "Soft staged reveals; subtle parallax on lifestyle imagery"
    techniques: ["staged reveal", "parallax", "cross-fade swatch"]
    reduced_motion_note: "Graceful; parallax disabled"
  conversion:
    primary_path: "SHOP → DTC store"
    repeat_cadence: "after each flavour band"
  copy_voice:
    register: "warm, cultural, generous"
    sample: "Tepache de la abuela. Reborn for today."
  asset_style:
    imagery: "studio cans + ingredient close-ups + cultural stills"
    iconography: "illustrated line art"
  weakness: "Sometimes too soft for retail urgency — punch up the CTA hierarchy if borrowing."

- url: https://drinkolipop.com
  brand: OLIPOP
  bucket: award
  one_line: "Bold flavour-flooded color bands with mass-market polish."
  hero:
    archetype: "color-flooded hero with can dead center"
    h1_pattern: "Brand promise (\"A New Kind of Soda.\")"
    cta_pattern: "Primary 'SHOP NOW' + secondary 'OUR STORY'"
  typography:
    display: "Custom rounded sans, friendly-confident"
    body: "Neutral grotesk"
    scale_note: "Moderate display; body is generous"
  color:
    chrome: "white default with per-flavour color floods"
    accent: "Vibrant per-flavour palette"
  layout:
    section_count: 11
    rhythm: "hero → flavour swatch → benefits → press rail → quiz → CTA"
    grid: "12-col, structured"
  motion:
    signature: "Color-swatch flavour selector that cross-fades the entire viewport"
    techniques: ["cross-fade swatch", "staged reveal", "carousel"]
    reduced_motion_note: "Cross-fade becomes instant swap"
  conversion:
    primary_path: "SHOP NOW → DTC store"
    repeat_cadence: "every section"
  copy_voice:
    register: "warm-confident, wellness-adjacent"
    sample: "A New Kind of Soda."
  asset_style:
    imagery: "can-focused product photography + ingredient stills"
    iconography: "monochrome line + accent"
  weakness: "Wellness positioning is heavy; for adult beverages, dial back the health language."

- url: https://drinkpoppi.com
  brand: poppi
  bucket: award
  one_line: "Soft-pastel hero with mega type and a flavour-swatch system at scale."
  hero:
    archetype: "soft-pastel band with floating cans + huge wordmark-style H1"
    h1_pattern: "Wordmark + brand promise"
    cta_pattern: "Primary 'SHOP' + secondary 'LEARN MORE'"
  typography:
    display: "Custom rounded grotesk, very tall x-height"
    body: "Inter-like neutral"
    scale_note: "Hero type is enormous; body is calm"
  color:
    chrome: "pastel cream + per-flavour pastels"
    accent: "vibrant flavour pops"
  layout:
    section_count: 10
    rhythm: "hero → benefits → flavour rail → press → quiz → CTA"
    grid: "12-col"
  motion:
    signature: "Cans float and rotate gently; flavour rail swaps backgrounds"
    techniques: ["cross-fade swatch", "gentle float", "staged reveal"]
    reduced_motion_note: "Floats collapse to stills"
  conversion:
    primary_path: "SHOP → checkout"
    repeat_cadence: "every band"
  copy_voice:
    register: "bright, accessible, joyful"
    sample: "Be Bubbly. Be You."
  asset_style:
    imagery: "studio can photography on pastel backdrops"
    iconography: "playful line icons"
  weakness: "Pastel softness reads juvenile if applied to an alcoholic product — temper it."

- url: https://takearecess.com
  brand: Recess
  bucket: award
  one_line: "Postmodern beverage with calm restraint as the differentiator."
  hero:
    archetype: "calm pastel band with single can + editorial type"
    h1_pattern: "Mood claim (\"Find your calm.\")"
    cta_pattern: "Primary 'SHOP' + quiet secondary"
  typography:
    display: "Editorial serif"
    body: "Neutral grotesk"
    scale_note: "Restrained display; airy body"
  color:
    chrome: "pastels and chalk tones"
    accent: "single-accent per band"
  layout:
    section_count: 9
    rhythm: "hero → ingredients → benefits → press → CTA"
    grid: "12-col with narrow content columns"
  motion:
    signature: "Very calm; cross-fade and gentle entrance"
    techniques: ["cross-fade", "staged reveal"]
    reduced_motion_note: "Graceful by default"
  conversion:
    primary_path: "SHOP → DTC"
    repeat_cadence: "hero + footer"
  copy_voice:
    register: "calm, wellness, postmodern"
    sample: "A canned beverage that helps you take a moment."
  asset_style:
    imagery: "still life + soft lifestyle"
    iconography: "minimal"
  weakness: "Tone is so quiet that retail urgency is hard to read."

- url: https://www.highnoonspirits.com
  brand: High Noon
  bucket: leader
  one_line: "The dominant premium vodka-soda RTD — direct functional analog."
  hero:
    archetype: "lifestyle scene + can lockup, sunny-saturated palette"
    h1_pattern: "Brand promise (\"Sun's up. High Noon.\")"
    cta_pattern: "Primary 'FIND HIGH NOON' + secondary 'OUR DRINKS'"
  typography:
    display: "Custom serif with deco echo"
    body: "Neutral sans"
    scale_note: "Moderate display; lifestyle drives the page"
  color:
    chrome: "sunny pastels + per-flavour bands"
    accent: "vibrant flavour color"
  layout:
    section_count: 10
    rhythm: "hero → flavour rail → lifestyle → press → locator → CTA"
    grid: "12-col"
  motion:
    signature: "Calm staged reveals; lifestyle photo crossfades"
    techniques: ["cross-fade", "staged reveal"]
    reduced_motion_note: "Graceful"
  conversion:
    primary_path: "FIND HIGH NOON → store locator"
    repeat_cadence: "every band"
  copy_voice:
    register: "sunny, mass-premium, occasion-led"
    sample: "Sun's up. High Noon."
  asset_style:
    imagery: "studio cans + sunny lifestyle"
    iconography: "minimal"
  weakness: "Lifestyle imagery is unique to High Noon's photography budget — borrow structure, not asset count."

- url: https://www.whiteclaw.com
  brand: White Claw
  bucket: leader
  one_line: "Mass-market hard seltzer playbook — the foil, not the model."
  hero:
    archetype: "neon-saturated lifestyle hero with can lockup"
    h1_pattern: "Brand-promise tagline"
    cta_pattern: "Primary 'FIND IT NEAR YOU'"
  typography:
    display: "Custom condensed sans"
    body: "Neutral sans"
    scale_note: "Mass display, calm body"
  color:
    chrome: "saturated bright neon + per-flavour bands"
    accent: "lots of vivid color, sometimes competing"
  layout:
    section_count: 11
    rhythm: "hero → flavour grid → events → social → CTA"
    grid: "12-col"
  motion:
    signature: "Lots of video and motion, can-spin loops"
    techniques: ["video loops", "staged reveal", "carousel"]
    reduced_motion_note: "Video stops"
  conversion:
    primary_path: "FIND IT NEAR YOU → locator"
    repeat_cadence: "every band"
  copy_voice:
    register: "youthful-mass, party occasion"
    sample: "Let's White Claw."
  asset_style:
    imagery: "young-adult lifestyle + can lockups"
    iconography: "minimal"
  weakness: "The category cliché — borrowing this dilutes any craft positioning."

- url: https://www.trulyhardseltzer.com
  brand: Truly
  bucket: leader
  one_line: "Mass-market hard seltzer cousin to White Claw — same playbook."
  hero:
    archetype: "neon hero with can"
    h1_pattern: "Brand promise"
    cta_pattern: "Primary 'WHERE TO BUY'"
  typography:
    display: "Custom sans"
    body: "Neutral"
    scale_note: "Mass display"
  color:
    chrome: "bright neon + per-flavour"
    accent: "competing brights"
  layout:
    section_count: 10
    rhythm: "hero → flavours → lifestyle → CTA"
    grid: "12-col"
  motion:
    signature: "Stock motion, can-spins, low restraint"
    techniques: ["video loops", "carousel"]
    reduced_motion_note: "Stops"
  conversion:
    primary_path: "WHERE TO BUY"
    repeat_cadence: "every band"
  copy_voice:
    register: "youthful-mass, occasion-led"
    sample: "Drink Truly."
  asset_style:
    imagery: "lifestyle + can lockups"
    iconography: "minimal"
  weakness: "Same as White Claw — the category template, not a model."

- url: https://www.budlightseltzer.com
  brand: Bud Light Seltzer
  bucket: leader
  one_line: "Budget-mass tone; demonstrates what to break from."
  hero:
    archetype: "video-led lifestyle"
    h1_pattern: "Brand tagline"
    cta_pattern: "Primary 'BUY NOW'"
  typography:
    display: "Sans"
    body: "Sans"
    scale_note: "Even, mass"
  color:
    chrome: "white + AB-blue + flavour"
    accent: "category brights"
  layout:
    section_count: 9
    rhythm: "hero → flavours → events → CTA"
    grid: "12-col"
  motion:
    signature: "Stock video and can-spins"
    techniques: ["video loops"]
    reduced_motion_note: "Stops"
  conversion:
    primary_path: "BUY NOW"
    repeat_cadence: "every band"
  copy_voice:
    register: "mass beer-brand"
    sample: "n/a"
  asset_style:
    imagery: "stock lifestyle"
    iconography: "minimal"
  weakness: "Indistinguishable from the rest of the AB-InBev portfolio."

- url: https://www.cutwaterspirits.com
  brand: Cutwater Spirits
  bucket: leader
  one_line: "Premium canned-cocktail leader; the right shelf neighbour for South Side."
  hero:
    archetype: "dark editorial with can hero + warm gold accents"
    h1_pattern: "Promise (\"Real spirits. Real flavor.\")"
    cta_pattern: "Primary 'SHOP NOW' + secondary 'OUR DRINKS'"
  typography:
    display: "Editorial sans + serif accent"
    body: "Neutral"
    scale_note: "Moderate display; restrained body"
  color:
    chrome: "deep navy + amber"
    accent: "warm gold accents on dark"
  layout:
    section_count: 10
    rhythm: "hero → range → process → press → locator"
    grid: "12-col"
  motion:
    signature: "Staged reveals on dark; subtle parallax"
    techniques: ["staged reveal", "parallax", "carousel"]
    reduced_motion_note: "Parallax disabled"
  conversion:
    primary_path: "SHOP / FIND NEARBY"
    repeat_cadence: "every band"
  copy_voice:
    register: "premium-confident, craft-distillery"
    sample: "Real spirits. Real flavor."
  asset_style:
    imagery: "dark studio + craft-process stills"
    iconography: "monochrome line"
  weakness: "Site can feel chrome-heavy on long sessions."

- url: https://athleticbrewing.com
  brand: Athletic Brewing
  bucket: challenger
  one_line: "Modern NA challenger with extreme brand discipline."
  hero:
    archetype: "off-center hero with can + bold tagline"
    h1_pattern: "Brand promise (\"Athletic for everyone.\")"
    cta_pattern: "Primary 'SHOP' + secondary 'FIND BEER'"
  typography:
    display: "Custom condensed sans"
    body: "Neutral grotesk"
    scale_note: "Tight tracked display; calm body"
  color:
    chrome: "muted earth + sport accents"
    accent: "single bright per-band"
  layout:
    section_count: 11
    rhythm: "hero → range → mission → athletes → press → CTA"
    grid: "12-col"
  motion:
    signature: "Calm; athlete photography crossfades"
    techniques: ["cross-fade", "staged reveal"]
    reduced_motion_note: "Graceful"
  conversion:
    primary_path: "SHOP / FIND BEER"
    repeat_cadence: "every band"
  copy_voice:
    register: "athletic-mature, mission-driven"
    sample: "Athletic for everyone."
  asset_style:
    imagery: "athlete portraits + brewery stills"
    iconography: "line"
  weakness: "Mission-driven is hard to translate to a hedonic beverage; lean on craft, not mission."

- url: https://aplos.world
  brand: Aplós
  bucket: challenger
  one_line: "NA modern spirit — luxury DTC playbook applied to adult beverage."
  hero:
    archetype: "minimal editorial with bottle hero on cream"
    h1_pattern: "Promise (\"A modern spirit for a modern world.\")"
    cta_pattern: "Primary 'SHOP' + secondary 'LEARN'"
  typography:
    display: "Custom serif (light, elegant)"
    body: "Neutral grotesk"
    scale_note: "Calm display; editorial leading"
  color:
    chrome: "cream + green + chalk"
    accent: "single muted green"
  layout:
    section_count: 10
    rhythm: "hero → product → ritual → press → CTA"
    grid: "narrow centered + full-bleed product breaks"
  motion:
    signature: "Calm cross-fade + ambient gradient drift"
    techniques: ["cross-fade", "ambient gradient", "staged reveal"]
    reduced_motion_note: "Graceful"
  conversion:
    primary_path: "SHOP → DTC"
    repeat_cadence: "hero + footer"
  copy_voice:
    register: "calm-luxury"
    sample: "A modern spirit for a modern world."
  asset_style:
    imagery: "still life + soft lifestyle"
    iconography: "minimal"
  weakness: "Luxury restraint can read aloof for a more populist craft brand."

- url: https://drinkjones.com
  brand: Jones Soda
  bucket: challenger
  one_line: "Cult craft soda with edge — irreverence translated to retail."
  hero:
    archetype: "loud lifestyle hero + can with custom labels"
    h1_pattern: "Brand-as-collage"
    cta_pattern: "Primary 'SHOP' + secondary 'CUSTOM LABEL'"
  typography:
    display: "Heavy custom display"
    body: "Mixed sans/serif"
    scale_note: "Loud headers; busy"
  color:
    chrome: "saturated palettes; per-flavour floods"
    accent: "lots of color"
  layout:
    section_count: 10
    rhythm: "hero → flavour rail → custom labels → press → CTA"
    grid: "12-col with collage breaks"
  motion:
    signature: "Loud entrance, collage motion"
    techniques: ["staged reveal", "carousel"]
    reduced_motion_note: "Carousels still"
  conversion:
    primary_path: "SHOP → DTC"
    repeat_cadence: "every band"
  copy_voice:
    register: "irreverent, cult, lifestyle"
    sample: "Run with the little guy."
  asset_style:
    imagery: "UGC labels + lifestyle"
    iconography: "collage"
  weakness: "Visual density is high; transcribe the energy without the noise."

- url: https://www.sanpellegrino.com
  brand: San Pellegrino
  bucket: adjacent
  one_line: "Premium glass-bottle Italian soda — flavour-as-portrait at the highest end."
  hero:
    archetype: "editorial with bottle hero + warm cream palette"
    h1_pattern: "Brand promise + product moniker"
    cta_pattern: "Primary 'EXPLORE'"
  typography:
    display: "Serif editorial"
    body: "Neutral grotesk"
    scale_note: "Medium display; high-quality body"
  color:
    chrome: "cream + per-bottle"
    accent: "warm gold + flavour"
  layout:
    section_count: 11
    rhythm: "hero → flavour gallery → recipes → heritage → CTA"
    grid: "12-col with editorial breaks"
  motion:
    signature: "Calm crossfade + ambient overlays"
    techniques: ["cross-fade", "staged reveal"]
    reduced_motion_note: "Graceful"
  conversion:
    primary_path: "EXPLORE → catalog"
    repeat_cadence: "every band"
  copy_voice:
    register: "luxury heritage"
    sample: "Live in Italian."
  asset_style:
    imagery: "still life with bottle as protagonist"
    iconography: "heritage serif accents"
  weakness: "Heritage tone presumes deep brand age; do not borrow without source proof."

- url: https://www.aesop.com
  brand: Aesop
  bucket: adjacent
  one_line: "The luxury-DTC tone reference used widely across premium consumer."
  hero:
    archetype: "minimal cream hero with editorial type and product still"
    h1_pattern: "Restrained promise"
    cta_pattern: "Primary 'SHOP' + secondary 'STORES'"
  typography:
    display: "Custom serif"
    body: "Neutral grotesk"
    scale_note: "Restrained, generous leading"
  color:
    chrome: "cream + chalk + olive"
    accent: "single deep olive or terracotta"
  layout:
    section_count: 9
    rhythm: "hero → product → ritual → places → CTA"
    grid: "centered narrow with full-bleed breaks"
  motion:
    signature: "Very calm; one fade per band"
    techniques: ["cross-fade", "staged reveal"]
    reduced_motion_note: "Already calm"
  conversion:
    primary_path: "SHOP / STORES"
    repeat_cadence: "hero + footer"
  copy_voice:
    register: "luxury, calm, considered"
    sample: "n/a"
  asset_style:
    imagery: "still life + spaces"
    iconography: "near-none"
  weakness: "Borrow the restraint; do not borrow the apothecary register."
```

## Patterns to inherit

- **Hero**: type-led, with the can as a hero protagonist (not glassmorphic
  cards). The can floats; the colour behind it floods. (Liquid Death,
  Olipop, Poppi anchors.)
- **Signature interaction**: flavour-swatch cross-fade — picking a flavour
  cross-fades the entire viewport into that flavour's colour and swaps the
  can label. This is the Apple iPhone-color pattern translated for soda.
  (Olipop, Poppi, De La Calle anchors; Apple design-language pattern.)
- **Section rhythm**: bold colour bands alternating with calmer cream/ink
  bands. Each flavour gets a flavour-coloured full-bleed band. (De La
  Calle, Liquid Death.)
- **Typography**: editorial display + neo-grotesk body, ultra-tight
  display tracking, sentence-case for personality. (De La Calle, Aplós,
  Aesop.)
- **Conversion**: "Find a store" is the primary CTA — South Side is a
  retail-shelf product, not DTC. "Explore flavours" is a quiet secondary.
  (High Noon's locator-led conversion is the closest model.)

## Anti-patterns to break

1. **Glassmorphic rounded cards on dark navy with amber underlines** —
   the existing v1 South Side build leans hard into this; it reads more
   "fintech dashboard" than "craft soda". Drop it.
2. **Wellness-functional health language** — Olipop's "prebiotic" /
   Recess's "find your calm" rhetoric does not apply. South Side is
   a hard soda. Lean into refreshment + occasion, not health.
3. **Mass-market party-lifestyle photography** — the White Claw / Truly /
   Bud Light Seltzer template. Without the photography budget it always
   looks like stock. Use composed primitives instead.

## Three anchor references

1. ★ **https://liquiddeath.com** — for the courage of type-led
   bold-colour-band scale; the "fight the supermarket shelf" energy. v2's
   bold colour-flood section bands answer to this anchor.
2. ★ **https://drinkdelacalle.com** — for editorial craft-soda heritage
   storytelling and flavour-as-portrait. v2's per-flavour bands and
   ingredient close-ups answer to this anchor.
3. ★ **https://www.highnoonspirits.com** — for the closest functional
   analog (premium vodka soda RTD) and the retail-locator-led conversion
   architecture. v2's CTA hierarchy and store locator band answer to
   this anchor.

## Open questions for the user

- The existing brand brief mentions "South African heritage" and "local
  ingredients" — do specific local fruit varieties or producers need to
  be named, or should the rebuild stay with the existing flavour names
  (Cranberry & Raspberry, Passion Fruit, Mango & Orange, Pineapple &
  Coconut, Lime & Lemon) and the existing retail names (PnP, Spar,
  Liquor City)?
- Is there appetite for adding a "where in SA" map to the locator band,
  or should it remain a CTA jump to south-side.co.za's locator?
- Confirm "5% ABV / 72 calories / 3g sugar" is current and quotable.
