# ClevaCado — Design Plan

## Experience Thesis
Make ClevaCado feel like the most precise instrument in post-harvest avocado logistics — where every scroll reveals the hidden damage story inside each piece of fruit, told through data, texture, and quiet authority.

## Three Visual Anchors

1. **Hero scene**: Full-viewport dark opener with a warm avocado-skin texture wash. An animated diagnostic scan line sweeps across suggesting the device "reading" the fruit. Editorial serif headline floats over it, staged.

2. **Signature motif**: Avocado-green precision lines connecting stages; monospace data readouts styled like device output; the bruise-orange (#d97706) used only for risk/alert states, making it immediately legible as danger.

3. **Contrast strategy**: Deep organic dark (#0d1a0f) alternates with warm cream (#faf7f2) — nature's own contrast between skin and flesh. The analytics section goes nearly black with orange data bars, clinical precision against organic warmth.

## Hero Architecture
- Full viewport, dark (#0d1a0f)
- Subtle avocado skin texture via CSS radial gradient + noise
- Animated horizontal scan-line (CSS keyframe) sweeps continuously
- Left-aligned headline: large serif display, staged Framer Motion reveal
- Sub-headline and CTA below
- Right side: diagnostic data panel (telemetry mock, monospace font)
- Scroll hint: thin green line pulsing downward

## Typography Stack
- **Display / headings**: `Fraunces` (weight 400–700) — organic, editorial, variable weight; communicates premium agriculture AND precision science
- **Body / UI**: `DM Sans` (300–600) — geometric, clean, highly readable; the scientist voice
- **Data / mono**: `DM Mono` (400, 500) — all telemetry readouts, risk scores, stage labels, coordinates

## Color Palette
| Token | Value | Use |
|-------|-------|-----|
| dark-base | #0d1a0f | primary dark bg |
| dark-mid | #162b1b | secondary dark bg |
| dark-card | #1c3322 | dark cards |
| green-deep | #2d6a4f | primary brand green |
| green-mid | #4a7c59 | mid green |
| green-light | #74c69d | highlight / active |
| cream-base | #faf7f2 | light section bg |
| cream-mid | #efe8d8 | card bg on cream |
| cream-dark | #ddd0b8 | border on cream |
| text-dark | #1c1c14 | body text on cream |
| text-muted | #5c6b5a | muted text on cream |
| alert | #d97706 | risk / high-impact |
| alert-light | #fbbf24 | risk highlight |
| white | #ffffff | text on dark |
| white-dim | rgba(255,255,255,0.65) | muted on dark |

## Section Sequence (AIDA)

### Attention
1. **CinematicHero** — diagnostic scan + editorial headline + telemetry panel

### Interest
2. **ProblemStatement** — large editorial quote section: "By the time the bruise shows, the data is gone"
3. **DeviceIntro** — the device: what it is, what it measures, what it delivers

### Desire
4. **ArchitectureLayers** — four technical sensing layers (3-axis shock, vibration, rotation, continuous telemetry)
5. **JourneyPipeline** — five-stage supply chain journey with telemetry at each step
6. **AnalyticsDashboard** — risk scores per stage, animated bars, hotspot finding

### Action
7. **PilotCTA** — join the pilot program, contact details, urgency

## Motion Map

| Layer | Effect | Reduced motion |
|-------|--------|----------------|
| Hero headline words | Staggered fade-up per word | Opacity only |
| Scan line | CSS infinite sweep | Hidden / static |
| Problem quote | Large fade-in, no translate | Same |
| Device specs | Staggered reveal | Opacity only |
| Journey stages | Sequential left-to-right reveal | Opacity only |
| Risk bars | Animated width fill on view | Static at value |
| Risk numbers | Count-up on view | Static at value |
| Section entries | Y-translate + opacity | Opacity only |

## Layout Decisions
- No border-radius on structural containers (angular precision)
- Journey stages: horizontal row on desktop, vertical stack on mobile
- Analytics: full-dark section with colored bar chart — feels like a real diagnostic report
- Every section uses a consistent left-aligned structure — no centered generic layouts
- Device architecture: 2-column grid, technical spec card style

## Anti-Slop Guardrails
- No generic floating blob decorations
- No purple gradient anywhere
- No "card catalog" layout as the main visual strategy
- No stock-photo approach to the hero (use CSS texture + editorial type)
- No weak orientation copy ("Welcome to ClevaCado")
- Bruise-orange reserved ONLY for risk/alert — never decorative
