# Port443 V4 — Experience Brief

## Experience thesis

Make Port443 feel like the **operating system for enterprise cyber defence in
MEA** — a real product with real surfaces, paced like Wiz, narrated like
Tines, and typeset like Linear, with the section rhythm and conversion
architecture borrowed from the Apple product-page reference.

## First viewport

- **Brand signal**: Port443 wordmark + shield in the global nav; H1 is a
  brand-led claim, not a tagline.
- **Hero scene**: off-centre split. Left column (about 50% on desktop):
  eyebrow chip, H1 over two type rows, supporting sub-line, two CTAs
  (`Request a demo`, `See OneView`). Right column: a calm, real-feeling
  OneView dashboard surface — posture-score ring, four framework rows, a
  three-line evidence log. Not a radar; not a terminal.
- **Conversion path**: `Request a demo` is the primary; `See OneView` jumps
  to the OneView product band. The sticky subnav inherits both.
- **Next-section hint**: a slim, calm proof rail (regional + framework
  references) sits visibly below the fold.

## Section sequence (the rebuild's beats)

1. **Hero** — type-led claim + OneView product surface.
2. **Proof rail** — calm, single-row references (Operating across MEA, four
   framework wordmarks, the four service codes).
3. **Highlights reel** — Apple's "Get the highlights" pattern: five horizontal
   cards that each link to a deeper section.
4. **The Loop** — scroll-pinned, three-state reveal of `Signal → Correlate
   → Contain`. This is the signature interaction. (Tines anchor.)
5. **OneView product band** — the dashboard surface shown larger, with
   feature callouts (Posture score, RAG indicator, MTTD/MTTR trends, board
   reporting). Light-ivory band.
6. **Services swatch** — four services as colour-swatch cards. Selecting a
   service cross-fades the description, the framework chips, and the
   call-to-action label. (Notion/Wiz/Apple iPhone-color anchor.)
7. **Frameworks rail** — single calm row naming PCI-DSS 4.0, NIST CSF 2.0,
   ISO 27001:2022, CIS v8.
8. **Regional presence** — the `about-1.jpg` image with a one-line MEA
   operating statement; no invented coverage logos.
9. **Comparison strip** — Port443 vs. Build-in-house vs. Generic MSSP, with
   capability rows. (Apple compare-strip pattern.)
10. **Insights** — three press / LinkedIn cards, real URLs only.
11. **Contact stage** — repeat `Request a demo` with the form.
12. **Footer** — site map + numbered footnotes for any claim that needs one.

## Signature interaction

The Loop section pins for three viewport heights; a left-aligned diagram
builds out across the three pinned states (`Signal → Correlate → Contain`),
while the right-aligned narrative column scrubs through three matched copy
beats and three matched product-surface snippets. Under
`prefers-reduced-motion: reduce` the pin is released and the three states
render as a static three-up grid with the full diagram drawn.

## Three anchor references this experience responds to

1. **Wiz** — hero, color discipline, section banding, and sticky subnav.
2. **Tines** — the scroll-pinned Loop signature interaction.
3. **Linear** — type scale, restraint, calm leading, and editorial pacing.

## Assets

- Keep `hero-bg.jpg` for the regional presence band only (not the hero —
  v3's hero is product-led, not photography-led).
- Keep `about-1.jpg` for the regional presence band.
- Keep `logo-shield-color.svg` and `logo-shield-white.svg`.
- Compose the OneView surface from primitives; no invented screenshots.
- No invented customer logos or numeric metrics.

## Reduced-motion strategy

- The Loop pin is released; the three states render as a three-up grid.
- The colour-swatch cross-fade becomes an instant swap.
- The posture-score ring renders at its final value.
- All ambient motion (gradient drift, sparklines) becomes static.
- All text content remains identical and fully reachable by keyboard.
