# Elevate Walt Media — Design System (Anti-Slop)

Locked design direction for Lodge Lens. Agents MUST read this before changing visuals.

## What we refuse (AI slop tells)

- Dark zinc-950 hero with cyan/teal/purple glow orbs
- Segoe UI, Inter, or system-ui as primary type
- Pill badges with uppercase letter-spacing
- Uniform `rounded-2xl` card grid with hover `translateY(-4px)`
- Backdrop-blur sticky nav on near-black
- Gradient text, gradient buttons, "private preview" neon pills
- Centered everything, weight-700 headlines
- Clipart drone icons in the logo

## Direction: Warm editorial hospitality

Luxury lodge preview portal — feels like a private invitation, not a SaaS dashboard.

### Palette (max 3 colors + neutrals)

| Token | Value | Use |
|-------|-------|-----|
| `--paper` | `#F3F0EA` | Page background (warm stone) |
| `--ink` | `#1C1A17` | Primary text |
| `--ink-muted` | `#5C574F` | Secondary text |
| `--line` | `#D8D2C8` | Hairline rules |
| `--accent` | `#7A6342` | Bronze — links, focus, one CTA only |
| `--surface` | `#FAF8F4` | Cards, modals |
| `--inverse` | `#1C1A17` | Footer band |

No gradients. Optional 3% noise texture on paper only.

### Typography (Google Fonts)

- **Display:** `Cormorant Garamond` — weight 500, not 700
- **UI / body:** `Instrument Sans` — 400/500

Load via Google Fonts link in HTML.

### Layout principles

- Left-aligned hero with vertical rule accent
- Lodge index: editorial rows or asymmetric 2-col — Safari Plains may span full width when active
- Status as small caps text, not colored pills
- Buttons: rectangular, 2px radius max, solid fill or hairline outline
- Generous whitespace — `clamp()` spacing scale

### Logo

Wordmark only: **Elevate** (serif) + **Walt Media** (sans, tracked). No icons.

### Motion

- 200ms ease on color/border only
- No card lift on hover — use border-color or subtle background shift
- `prefers-reduced-motion`: disable transitions

## Files

- `assets/css/tokens.css` — variables only
- `assets/css/main.css` — components using tokens
- `docs/DESIGN.md` — this file (duplicate for docs/)
