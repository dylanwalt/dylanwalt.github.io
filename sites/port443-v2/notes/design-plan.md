# Port443 V2 — Design Plan

## Experience Thesis

Make Port443 feel like an elite cyber defense command center — where every pixel
communicates operational authority, precision automation, and the gravity of what
happens when enterprise security fails to act fast enough.

## Visual Anchors

1. **Hero scene**: Ultra-dark full-viewport with animated radar scanner, scrolling
   telemetry data feed, and a large editorial headline staged across two lines.
2. **Signature motif**: Monospace data readouts, electric-mint pulse indicators,
   hard angular containers (no border-radius), and a vertical green spine
   connecting section transitions.
3. **Contrast strategy**: Ultra-dark sections (#030912) alternate with an off-white
   data section (#f0f8f4) for the OneView benefits proof, then return to dark for
   the conversion section.

## Hero Architecture

- Full-viewport split: left 58% headline/CTA, right 42% animated radar SVG + telemetry
- Radar: Rotating scan arc in CSS animation, concentric ring pulses, connection
  nodes that blink with staggered timing
- Telemetry feed: Scrolling data stream of security-adjacent log lines (CSS animation)
- Staged Framer Motion reveal: eyebrow → H1 line 1 → H1 line 2 → subtext → CTAs
- Subtle hex-grid background (CSS only, near-invisible at 4% opacity)
- "LIVE: Active monitoring" status indicator with blinking green dot
- Scroll cue: animated chevron double-pulse

## Typography Stack

- Display / headings: `Syne` — geometric, angular, distinctive cyber personality
- UI / body: `Space Grotesk` — technical, readable, modern enterprise feel
- Data / code: `Geist Mono` — all numbers, status labels, monospace elements
- Scale: 9xl (hero H1 lg), 7xl (section H2), 4xl (cards), tracked-tight on large sizes

## Section Sequence

1. **CinematicHero** — Command center opener with radar + telemetry
2. **StatusRail** — Full-width thin bar: "SYSTEM ACTIVE — AUTOMATING CYBER DEFENSE"
3. **ThreePillars** — Animated counter stats: MEA presence, API integrations, frameworks
4. **ControlNarrative** — Scroll-linked reveal: Collect → Correlate → Contain
5. **ServiceMatrix** — Four services as full-width asymmetric sections
6. **PostureProof** — OneView benefits with animated SVG posture score ring
7. **RegionalPresence** — Image-led section with MEA coverage context
8. **PlatformPortal** — VueItAll SaaS showcase
9. **InsightsFeed** — LinkedIn posts + press coverage in editorial grid
10. **ContactStage** — Dark dramatic demo CTA with form

## Motion Paradigm

| Layer | Effect | Reduced motion |
|-------|--------|----------------|
| Hero text | Staged stagger (0.08s between elements) | Opacity only |
| Radar scan | CSS rotation, infinite | Static (no animation) |
| Telemetry feed | CSS scroll upward, infinite | Hidden |
| Pulse dots | CSS scale + opacity pulse, infinite | Static dot |
| Section entry | Y-translate + opacity via Framer Motion | Opacity only |
| Counter | Number count-up on intersection | Static final value |
| Posture ring | SVG stroke-dashoffset fill on view | Static at 100% |
| Service hover | Scale 1.01 + green left-border glow | Border color only |

All motion uses `MotionConfig reducedMotion="user"` and `useReducedMotion()`.
CSS infinite animations paused via `prefers-reduced-motion: reduce`.

## Component Architecture

- `HeroNav` — translucent overlay nav with shield logo + tagline
- `CinematicHero` — hero section, client-only animations
- `RadarScene` — SVG radar animation component  
- `TelemetryFeed` — scrolling log lines, CSS-animated
- `StatusRail` — full-width scrolling ticker
- `ThreePillars` — count-up stat cards
- `ControlNarrative` — three-phase scroll story
- `ServiceMatrix` — stacked full-width service sections
- `PostureScore` — animated SVG ring + benefits grid
- `RegionalPresence` — image + text section
- `PlatformPortal` — VueItAll banner
- `InsightsFeed` — LinkedIn + press cards
- `ContactStage` — dark CTA + form

## Conversion Path

- Hero: Request a Demo (primary) + Explore Services (secondary)
- Services: Individual links to demo for each
- Contact: Repeated demo form with service selector
- Nav: Persistent "Request a Demo" CTA

## Color Palette (extended)

- `#030912` — deepest dark (hero + dark section bg)
- `#061321` — dark navy (secondary dark bg)
- `#0a1e2e` — card surfaces on dark
- `#a8ffce` — electric mint (primary CTA accent)
- `#22c55e` — active green (live indicators)
- `#0e6b54` — forest green (light section accents)
- `#f0f8f4` — near-white (light section bg)
- `#c8ddd5` — muted tint for light section borders
- `#e2f5ec` — highlight bg on light section cards
- `rgba(168,255,206,0.08)` — glow overlay on hover

## Palette — Reject

- No purple gradients
- No generic glassmorphism
- No default card shadows that don't belong to the brand
- No rounded corners on structural elements (buttons/cards use `0` or `2px` radius)
