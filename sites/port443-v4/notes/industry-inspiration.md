# Industry Inspiration Brief — Port443 V4

## Sector

Enterprise cyber-security platform — control attestation, unified security
posture (SOC), and bespoke automation, sold to mid-to-large enterprises across
the Middle East and Africa region. Adjacent sub-sectors used as references:
modern security workflow automation, observability and developer infra (where
the buyer journey and proof patterns rhyme).

## Source brand stance in the sector

Port443 sits between the **category leaders** (CrowdStrike, Palo Alto, Splunk,
Wiz, Zscaler) and the **regional specialist / managed services** end of the
market. It has no consumer reach and no broad-platform breadth — it competes
on credibility, regional operating presence, and an "automation that actually
ships" promise. The rebuild should therefore look closer to the *challenger
infrastructure* end of the spectrum (Tines, Wiz, Material) than to the
mass-broadcast enterprise-banner end (Cisco, Splunk legacy).

## The fifteen

| # | URL | Brand | Bucket | One line |
| - | --- | ----- | ------ | -------- |
| 1 | https://www.tines.com | Tines | award ★ | Best-in-class scrollytelling for a security automation product; explains a workflow product with a workflow page |
| 2 | https://linear.app | Linear | award ★ | Sets the bar for product-led editorial type and motion in B2B tech |
| 3 | https://vercel.com | Vercel | award | Geist typography, alternating dark/light bands, real product surfaces |
| 4 | https://www.cloudflare.com | Cloudflare | award | Information-dense but legible — strong section rhythm and trust rail |
| 5 | https://stripe.com | Stripe | award | Industry benchmark for technical product marketing layout discipline |
| 6 | https://www.crowdstrike.com | CrowdStrike | leader | Category-leading dark editorial cybersec hero pattern |
| 7 | https://www.paloaltonetworks.com | Palo Alto Networks | leader | Enterprise security broad-platform conversion architecture |
| 8 | https://www.wiz.io | Wiz | leader ★ | Best-in-class cloud security site — clean light/dark alternation, massive type |
| 9 | https://www.sentinelone.com | SentinelOne | leader | EDR/XDR positioning, proof-rail discipline, framework references |
| 10 | https://www.splunk.com | Splunk | leader | Telemetry-led storytelling, dashboard-as-hero pattern |
| 11 | https://www.vanta.com | Vanta | challenger | Compliance automation that translates frameworks into product surfaces |
| 12 | https://www.material.security | Material Security | challenger | Editorial-tone challenger brand for email/identity security |
| 13 | https://www.snyk.io | Snyk | challenger | Developer-first security positioning, modern type & motion |
| 14 | https://www.datadoghq.com | Datadog | adjacent | Adjacent observability — sets the standard for live-product hero surfaces |
| 15 | https://www.notion.so | Notion | adjacent | Adjacent productivity — sets the bar for clean color-swatched scroll narrative |

### Long-list entries cut

- Mandiant, Trellix, Rapid7, McAfee Enterprise — strong leaders but their current sites lean on stock imagery and weaker section rhythm than the chosen ten.
- Drata, Secureframe — strong challengers but heavily overlap with Vanta's pattern; one challenger from this niche is enough.
- Okta — significant brand, but the current site is denser and less editorial than the chosen examples.
- Apple.com itself — the design-language reference already covers it; including it here would double-count.

## Per-site notes

```yaml
- url: https://www.tines.com
  brand: Tines
  bucket: award
  one_line: "A security automation product page that performs the product on the page itself."
  hero:
    archetype: "type-led with off-center product surface"
    h1_pattern: "Claim + product name ('Build, run, and monitor your most important workflows.')"
    cta_pattern: "Primary 'Get a demo' button + 'Try Tines' secondary text link"
  typography:
    display: "Söhne-like geometric sans, tight tracking"
    body: "Inter Sans, generous leading"
    scale_note: "Display sizes up to ~7xl; whole hero is two type rows + a product canvas"
  color:
    chrome: "off-white default, occasional ink-dark bands"
    accent: "warm gold yellow as accent, used very sparingly"
  layout:
    section_count: 11
    rhythm: "hero → trust rail → workflow showcase → narrative → integrations grid → testimonials → CTA → footer"
    grid: "12-col with frequent off-grid breaks for the product canvas"
  motion:
    signature: "scroll-pinned workflow canvas that builds a real Tines story one node at a time as the user scrolls"
    techniques: ["pin", "scroll-scrub", "staged entrance reveal"]
    reduced_motion_note: "appears to gracefully collapse to a static workflow diagram"
  conversion:
    primary_path: "/contact → demo booking"
    repeat_cadence: "every 2–3 sections"
  copy_voice:
    register: "warm-technical; product-first claims; no hype"
    sample: "Build, run, and monitor your most important workflows."
  asset_style:
    imagery: "product UI as the hero asset, no people in hero; engineer portraits in testimonials"
    iconography: "line glyphs at body sizes"
  weakness: "On smaller breakpoints the pinned workflow can feel slow; sometimes more story than evidence."

- url: https://linear.app
  brand: Linear
  bucket: award
  one_line: "The reference for editorial product-marketing typography in modern B2B."
  hero:
    archetype: "type-led, product surface as a calm anchor"
    h1_pattern: "Brand promise as a sentence ('Linear is a purpose-built tool for modern product development.')"
    cta_pattern: "Primary 'Start building' + secondary 'Open Linear'"
  typography:
    display: "Inter Display, ultra-tight tracking, ~120px hero"
    body: "Inter Text"
    scale_note: "Display dominates; body is small and quiet"
  color:
    chrome: "near-black ink with light bands at major transitions"
    accent: "lavender / electric purple as ambient gradient (used sparingly)"
  layout:
    section_count: 9
    rhythm: "hero → product surface → narrative beats x3 → feature rail → quotes → CTA"
    grid: "centered narrow column with full-bleed product surfaces"
  motion:
    signature: "calm cross-fade transitions between product states; gradient drift behind hero"
    techniques: ["staged entrance reveal", "cross-fade swatch", "gentle parallax"]
    reduced_motion_note: "everything still legible; gradient drift becomes static"
  conversion:
    primary_path: "Start building → sign up"
    repeat_cadence: "hero, mid-page, footer"
  copy_voice:
    register: "calm, opinionated, slightly editorial"
    sample: "The issue tracking tool you'll enjoy using."
  asset_style:
    imagery: "real product UI shots; rare lifestyle imagery"
    iconography: "monochrome thin-line"
  weakness: "Hard to translate to a brand without an equivalent first-party UI to show."

- url: https://vercel.com
  brand: Vercel
  bucket: award
  one_line: "Sets the standard for monochrome editorial structure with hot accent moments."
  hero:
    archetype: "centered type with product UI underneath"
    h1_pattern: "Claim ('Your complete platform for the web.')"
    cta_pattern: "Primary 'Start Deploying' + secondary 'Get a Demo'"
  typography:
    display: "Geist Sans"
    body: "Geist Sans"
    scale_note: "Geist Sans across the whole site with tracked-tight display"
  color:
    chrome: "true black + true white alternating bands"
    accent: "single neutral accent (off-white on dark); product gradients only inside product mocks"
  layout:
    section_count: 11
    rhythm: "hero → highlights reel → product detail tabs → workflow narrative → proof rail → CTA"
    grid: "12-col with frequent full-bleed bands; sticky subnav appears after hero"
  motion:
    signature: "tabbed product surface that cross-fades between contexts (CI, edge, observability)"
    techniques: ["sticky subnav", "tab swap", "staged entrance reveal", "cross-fade"]
    reduced_motion_note: "graceful — animations are short and cross-fade only"
  conversion:
    primary_path: "Start Deploying → sign-up"
    repeat_cadence: "every section ends with one CTA"
  copy_voice:
    register: "confident-technical"
    sample: "Your complete platform for the web."
  asset_style:
    imagery: "diagrams + product UI + abstract performance gradients (only inside product surfaces)"
    iconography: "monochrome line glyphs"
  weakness: "Without first-party product UI of similar polish, the pattern can feel hollow."

- url: https://www.cloudflare.com
  brand: Cloudflare
  bucket: award
  one_line: "Information-dense but legibly paced — proof rail is industry-leading."
  hero:
    archetype: "off-center hero with diagram + dense supporting copy"
    h1_pattern: "Claim ('The connectivity cloud.')"
    cta_pattern: "Primary 'Sign up' + secondary 'Contact sales'"
  typography:
    display: "Custom geometric sans"
    body: "Inter-like neutral grotesk"
    scale_note: "Moderate display sizes; body density is the differentiator"
  color:
    chrome: "white default with deep navy bands at major transitions"
    accent: "Cloudflare orange used only on diagrams and a single CTA tier"
  layout:
    section_count: 12
    rhythm: "hero → customer logo rail → product surfaces → comparison strip → use-case bands → CTA"
    grid: "12-col with strong horizontal rhythm; sticky product subnav"
  motion:
    signature: "diagram-led reveals that build network topology with the section"
    techniques: ["staged entrance reveal", "diagram scroll-scrub"]
    reduced_motion_note: "diagrams collapse to a finished state"
  conversion:
    primary_path: "Sign up free → enterprise sales as secondary"
    repeat_cadence: "every product surface ends with a CTA"
  copy_voice:
    register: "matter-of-fact, infrastructure-confident"
    sample: "Build, deploy, and scale apps and websites."
  asset_style:
    imagery: "diagrams + product UI + customer logo proof"
    iconography: "monochrome line glyphs"
  weakness: "Slightly busy on long sections; the proof rail is the lesson, not the density."

- url: https://stripe.com
  brand: Stripe
  bucket: award
  one_line: "The reference for technical-product marketing layout craft."
  hero:
    archetype: "diagonal gradient hero + product UI"
    h1_pattern: "Claim ('Financial infrastructure to grow your revenue.')"
    cta_pattern: "Primary 'Start now' + secondary 'Contact sales'"
  typography:
    display: "Custom Sohne-like sans"
    body: "Sohne Text"
    scale_note: "Moderate display, dense body; type is exact, not loud"
  color:
    chrome: "white + occasional indigo bands"
    accent: "Stripe purple used only in diagrams; everything else neutral"
  layout:
    section_count: 13
    rhythm: "hero → proof rail → product bands → developer band → enterprise band → testimonials → CTA"
    grid: "tight 12-col with strict typographic rhythm"
  motion:
    signature: "gradient hero animation that's ambient (not interactive); subtle product UI cross-fades"
    techniques: ["ambient gradient", "cross-fade", "staged entrance reveal"]
    reduced_motion_note: "gradient becomes static; everything else is already calm"
  conversion:
    primary_path: "Start now → onboarding"
    repeat_cadence: "every 2 sections"
  copy_voice:
    register: "precise, technical, business-mature"
    sample: "Financial infrastructure to grow your revenue."
  asset_style:
    imagery: "product UI dominant; rare editorial portraits"
    iconography: "thin-line monochrome at body sizes"
  weakness: "Pattern presumes a deep product surface; minimal coverage of services-led businesses."

- url: https://www.crowdstrike.com
  brand: CrowdStrike
  bucket: leader
  one_line: "The dominant 'dark editorial' cybersec hero pattern in the category."
  hero:
    archetype: "full-bleed dark hero with hero device/dashboard cutout"
    h1_pattern: "Claim ('We stop breaches.')"
    cta_pattern: "Primary 'Get a demo' + secondary 'Free trial'"
  typography:
    display: "Custom red-toned sans"
    body: "Neutral grotesk"
    scale_note: "Massive display, calm body"
  color:
    chrome: "dark navy + black"
    accent: "Falcon red and a calm electric red — used in CTAs and dashboard data"
  layout:
    section_count: 10
    rhythm: "hero → proof rail (Gartner, MITRE) → platform tabs → use cases → CTA"
    grid: "12-col with sticky subnav after hero"
  motion:
    signature: "tabbed platform module switcher that cross-fades dashboard surface"
    techniques: ["sticky subnav", "tab swap", "staged entrance"]
    reduced_motion_note: "graceful, tab swaps are instant"
  conversion:
    primary_path: "Get a demo"
    repeat_cadence: "sticky CTA + repeated demo prompts"
  copy_voice:
    register: "authoritative, breach-focused"
    sample: "We stop breaches."
  asset_style:
    imagery: "product UI + dark dashboards; rare engineer/analyst portraits"
    iconography: "monochrome line"
  weakness: "Heavy chrome can feel uniform; brand color tightly controlled."

- url: https://www.paloaltonetworks.com
  brand: Palo Alto Networks
  bucket: leader
  one_line: "Broad-platform enterprise security conversion architecture, professionally paced."
  hero:
    archetype: "video-led broad hero, brand-promise headline"
    h1_pattern: "Claim ('Make every day more secure.')"
    cta_pattern: "Primary 'Request a demo' + secondary 'See products'"
  typography:
    display: "Custom geometric sans"
    body: "Neutral grotesk"
    scale_note: "Moderate display sizes; restraint over loudness"
  color:
    chrome: "white default with deep orange-tinged bands"
    accent: "Palo Alto orange as a single CTA tier; product gradients in diagrams"
  layout:
    section_count: 11
    rhythm: "hero → product family tabs → use cases → analyst proof → events → CTA"
    grid: "12-col, strict rhythm"
  motion:
    signature: "calm; tab swaps and customer story carousels"
    techniques: ["tab swap", "carousel", "staged entrance reveal"]
    reduced_motion_note: "graceful, animations are short"
  conversion:
    primary_path: "Request a demo → sales"
    repeat_cadence: "every section concludes with a CTA"
  copy_voice:
    register: "enterprise-mature, breach-confident"
    sample: "Make every day more secure."
  asset_style:
    imagery: "product UI + lifestyle photography of analysts"
    iconography: "monochrome line"
  weakness: "Density of product families can dilute focus."

- url: https://www.wiz.io
  brand: Wiz
  bucket: leader
  one_line: "Clean light/dark alternation with massive editorial type — best-in-class for the category."
  hero:
    archetype: "type-led with a calm product surface anchor"
    h1_pattern: "Claim ('The cloud security platform CISOs trust.')"
    cta_pattern: "Primary 'Get a demo' + secondary 'Sign up'"
  typography:
    display: "Custom geometric sans, tight tracking"
    body: "Inter Text"
    scale_note: "Display dominates the hero; body is small and quiet"
  color:
    chrome: "true white + deep navy bands"
    accent: "Wiz blue (single accent) used only on CTAs and a few diagram strokes"
  layout:
    section_count: 11
    rhythm: "hero → analyst logo rail → product surfaces → CISO testimonials → CTA"
    grid: "12-col, strict, sticky product subnav"
  motion:
    signature: "color-swatch-style cross-fade between product modules; calm staged reveals"
    techniques: ["cross-fade swatch", "sticky subnav", "staged entrance"]
    reduced_motion_note: "graceful — animations are short and short-lived"
  conversion:
    primary_path: "Get a demo → sales"
    repeat_cadence: "every 2 sections; sticky CTA persists"
  copy_voice:
    register: "calm authority"
    sample: "The cloud security platform CISOs trust."
  asset_style:
    imagery: "product UI + analyst quotes (no stock imagery)"
    iconography: "thin-line monochrome"
  weakness: "Slightly cool — could feel impersonal without strong customer voice."

- url: https://www.sentinelone.com
  brand: SentinelOne
  bucket: leader
  one_line: "EDR/XDR positioning with proof rails and explicit framework references."
  hero:
    archetype: "dark hero with platform UI and platform name"
    h1_pattern: "Claim ('Cybersecurity built for what's next.')"
    cta_pattern: "Primary 'Get a demo' + secondary 'Watch demo'"
  typography:
    display: "Custom sans"
    body: "Neutral grotesk"
    scale_note: "Moderate display; proof and framework rails carry the page"
  color:
    chrome: "dark navy with neon-purple accents in diagrams"
    accent: "Singularity purple used inside product diagrams only"
  layout:
    section_count: 10
    rhythm: "hero → analyst proof → platform tabs → use cases → roadmap → CTA"
    grid: "12-col, sticky subnav"
  motion:
    signature: "tabbed platform module switcher; threat-graph animations"
    techniques: ["tab swap", "staged entrance reveal", "diagram scroll-scrub"]
    reduced_motion_note: "diagrams collapse to a finished state"
  conversion:
    primary_path: "Get a demo"
    repeat_cadence: "after each product band"
  copy_voice:
    register: "platform-confident"
    sample: "Cybersecurity built for what's next."
  asset_style:
    imagery: "product UI + diagram + analyst photography"
    iconography: "monochrome line"
  weakness: "The purple is occasionally heavy and competes with the dark chrome."

- url: https://www.splunk.com
  brand: Splunk
  bucket: leader
  one_line: "Telemetry-led storytelling; dashboard-as-hero pattern."
  hero:
    archetype: "centered claim + dashboard surface"
    h1_pattern: "Claim with brand voice ('Find anything. Solve anything.')"
    cta_pattern: "Primary 'Try free' + secondary 'Contact sales'"
  typography:
    display: "Custom geometric sans"
    body: "Neutral grotesk"
    scale_note: "Moderate display sizes; data viz carries visual weight"
  color:
    chrome: "white default + dark bands"
    accent: "Splunk green / electric on data viz; restrained otherwise"
  layout:
    section_count: 11
    rhythm: "hero → proof rail → use cases → integrations → events → CTA"
    grid: "12-col"
  motion:
    signature: "live-feeling dashboards; subtle counter animations"
    techniques: ["counter animation", "staged entrance reveal", "carousel"]
    reduced_motion_note: "counters collapse to final values"
  conversion:
    primary_path: "Try free / Contact sales"
    repeat_cadence: "every section"
  copy_voice:
    register: "platform-broad, accessible"
    sample: "Find anything. Solve anything."
  asset_style:
    imagery: "dashboards + analysts at work"
    iconography: "monochrome line"
  weakness: "Broad-platform positioning dilutes the security narrative."

- url: https://www.vanta.com
  brand: Vanta
  bucket: challenger
  one_line: "Translates compliance frameworks into a real product surface; great challenger conversion architecture."
  hero:
    archetype: "claim + product UI screenshot"
    h1_pattern: "Claim ('Automate compliance. Build trust.')"
    cta_pattern: "Primary 'Get a demo' + secondary 'Watch demo'"
  typography:
    display: "Custom geometric sans"
    body: "Neutral grotesk"
    scale_note: "Moderate; sober for a compliance brand"
  color:
    chrome: "off-white default with occasional dark bands"
    accent: "Vanta teal — used on CTAs and framework chips"
  layout:
    section_count: 11
    rhythm: "hero → framework rail (SOC 2, ISO 27001, HIPAA) → product surfaces → testimonials → CTA"
    grid: "12-col, sticky subnav"
  motion:
    signature: "framework chip rail that announces each framework's automation status"
    techniques: ["staged entrance", "cross-fade swatch"]
    reduced_motion_note: "graceful"
  conversion:
    primary_path: "Get a demo → sales"
    repeat_cadence: "every band"
  copy_voice:
    register: "warm-confident"
    sample: "Automate compliance. Build trust."
  asset_style:
    imagery: "product UI + customer logos"
    iconography: "framework wordmarks as chips"
  weakness: "Borderline busy with framework chips; restraint required if borrowing the pattern."

- url: https://www.material.security
  brand: Material Security
  bucket: challenger
  one_line: "Editorial-tone challenger brand in identity/email security; teaches restraint."
  hero:
    archetype: "type-led, claim-first, minimal product surface"
    h1_pattern: "Claim ('A new way to secure cloud identities and email.')"
    cta_pattern: "Primary 'Request a demo' + secondary 'Learn more'"
  typography:
    display: "Custom serif-tinged sans"
    body: "Neutral grotesk"
    scale_note: "Display is calm and tracked-tight; restraint is the move"
  color:
    chrome: "off-white default + occasional ink bands"
    accent: "warm ink accents; almost no chroma"
  layout:
    section_count: 9
    rhythm: "hero → narrative → product surface → testimonial → CTA"
    grid: "narrow centered column with full-bleed product breaks"
  motion:
    signature: "very calm; one quiet cross-fade between product states"
    techniques: ["cross-fade swatch", "staged entrance"]
    reduced_motion_note: "graceful; calm by default"
  conversion:
    primary_path: "Request a demo"
    repeat_cadence: "hero + footer"
  copy_voice:
    register: "editorial-confident"
    sample: "A new way to secure cloud identities and email."
  asset_style:
    imagery: "product UI + a single editorial portrait"
    iconography: "near-none"
  weakness: "Light proof rail — risk that the page underperforms on credibility for enterprise buyers."

- url: https://www.snyk.io
  brand: Snyk
  bucket: challenger
  one_line: "Developer-first security positioning with modern type and motion."
  hero:
    archetype: "off-center hero with dev workflow surface"
    h1_pattern: "Claim ('Develop fast. Stay secure.')"
    cta_pattern: "Primary 'Get started free' + secondary 'Book a demo'"
  typography:
    display: "Custom geometric sans"
    body: "Inter"
    scale_note: "Moderate display; dev tooling tone"
  color:
    chrome: "off-white + dark bands"
    accent: "Snyk magenta and electric blue on diagrams"
  layout:
    section_count: 10
    rhythm: "hero → integrations rail → product modules → community proof → CTA"
    grid: "12-col"
  motion:
    signature: "integrations rail that scrolls horizontally; product tabs that cross-fade"
    techniques: ["horizontal scroll rail", "tab swap", "staged entrance"]
    reduced_motion_note: "graceful"
  conversion:
    primary_path: "Get started free + Book a demo (parallel paths)"
    repeat_cadence: "every band"
  copy_voice:
    register: "developer-confident, security-honest"
    sample: "Develop fast. Stay secure."
  asset_style:
    imagery: "code snippets + product UI + community photography"
    iconography: "monochrome line"
  weakness: "Developer-first voice may not survive translation to a CISO audience."

- url: https://www.datadoghq.com
  brand: Datadog
  bucket: adjacent
  one_line: "Sets the standard for live-feeling dashboard hero surfaces; the lesson for OneView."
  hero:
    archetype: "dashboard-led hero with off-center type"
    h1_pattern: "Claim ('Cloud monitoring as a service.')"
    cta_pattern: "Primary 'Free trial' + secondary 'See pricing'"
  typography:
    display: "Custom geometric sans"
    body: "Neutral grotesk"
    scale_note: "Moderate; dashboards are the visual weight"
  color:
    chrome: "white default + dark bands"
    accent: "Datadog purple in dashboards; restraint outside them"
  layout:
    section_count: 13
    rhythm: "hero → integrations rail (~600 logos) → product modules → use cases → events → CTA"
    grid: "12-col, sticky subnav"
  motion:
    signature: "live-feeling dashboard panels with ticking numbers and sparklines"
    techniques: ["counter animation", "sparkline animation", "staged entrance"]
    reduced_motion_note: "counters collapse to final value"
  conversion:
    primary_path: "Free trial → onboarding"
    repeat_cadence: "every section"
  copy_voice:
    register: "platform-broad, technically credible"
    sample: "See inside any stack, any app, at any scale, anywhere."
  asset_style:
    imagery: "dashboards + integration logos + occasional engineer portraits"
    iconography: "monochrome line"
  weakness: "Integration-rail logo count is unique to Datadog; do not try to imitate the scale."

- url: https://www.notion.so
  brand: Notion
  bucket: adjacent
  one_line: "Adjacent productivity — bar for color-swatched scroll narrative and product UI dance."
  hero:
    archetype: "claim-first centered hero with product UI montage"
    h1_pattern: "Claim ('The AI workspace that works for you.')"
    cta_pattern: "Primary 'Get Notion free' + secondary 'Request a demo'"
  typography:
    display: "Custom sans + occasional serif callout"
    body: "Inter"
    scale_note: "Moderate display; rich body typesetting"
  color:
    chrome: "off-white default + warm ink bands"
    accent: "Notion teal/ochre on swatches and chips; restrained otherwise"
  layout:
    section_count: 11
    rhythm: "hero → product modes → swatch rail → use cases → testimonials → CTA"
    grid: "12-col"
  motion:
    signature: "swatch-driven product canvas (click a pill, watch the UI swap)"
    techniques: ["color-swatch crossfade", "staged entrance", "horizontal rail"]
    reduced_motion_note: "graceful; swatch is instant"
  conversion:
    primary_path: "Free + Request a demo (parallel)"
    repeat_cadence: "every section"
  copy_voice:
    register: "warm, accessible-product"
    sample: "The AI workspace that works for you."
  asset_style:
    imagery: "product UI rich; rare lifestyle"
    iconography: "color-coded line glyphs"
  weakness: "Warmth doesn't translate cleanly to enterprise cybersec — borrow the structure, drop the warmth."
```

## Patterns to inherit

- **Hero**: type-led claim with an off-center product surface (Wiz, Linear,
  Vercel, Tines). Port443's "product surface" is the OneView dashboard.
- **Typography**: monochrome neo-grotesk display + neo-grotesk body + monospace
  for data; tight display tracking; restrained scale (Wiz, Linear, Vercel,
  CrowdStrike). Use Geist Sans + Geist Mono — modern, technical, and free of
  the SF-Pro/Apple-blue trap.
- **Color**: chrome alternates true-white and near-black bands; one chroma
  accent used only on CTAs and inside product surfaces (Vercel, Wiz,
  CrowdStrike). For Port443 the accent is a calibrated security-blue
  (`#3d7bff`) supported by a single forest accent (`#0e6b54`) for "live"
  indicators only — not the same electric-mint as v2.
- **Section rhythm**: alternating ink/ivory bands; ~10–12 sections; sticky
  product subnav after the hero exits (Vercel, Wiz, CrowdStrike, Cloudflare).
- **Signature motion**: scroll-pinned three-state reveal of the "Signal →
  Correlate → Contain" loop (Tines, Cloudflare diagram patterns); color-swatch
  cross-fade between the four services (Notion, Wiz, the Apple iPhone color
  pattern translated).
- **Conversion architecture**: persistent sticky `Request a demo` in the
  subnav; one quiet `Read the brief` / `See OneView` secondary; demo prompt
  reappears after each band (Wiz, Vanta, CrowdStrike).

## Anti-patterns to break

1. **The "cyberpunk command center" cliché** — radar scanners, terminal
   telemetry feeds, neon-mint glow on every surface. v2 already explored this
   direction; the category leaders do not. v3 and v4 strip it back to product
   surfaces and editorial typography.
2. **Stock photo "analyst at three monitors" hero** — every middle-tier
   security vendor uses this. Port443 owns no stock-photo studio; competing
   on stock is a losing move. Use real product UI and abstract regional
   imagery instead.
3. **The framework-chip dump** — Vanta does it once, most followers turn it
   into wallpaper. v4 names PCI-DSS, NIST CSF, CIS, and vendor best-practice exactly
   once each, in a single calm rail, not as ambient decoration.

## Three anchor references

1. ★ **https://www.wiz.io** — primary reference for the type-led hero,
   alternating ink/ivory bands, single-accent CTA color, and calm
   cross-fade between product modules. v3's hero, color, and section rhythm
   answer to this anchor.
2. ★ **https://www.tines.com** — primary reference for the scroll-pinned
   "build the loop as you scroll" signature interaction. v3's
   `Signal → Correlate → Contain` pinned narrative answers to this anchor.
3. ★ **https://linear.app** — primary reference for editorial type, generous
   negative space, and section pacing. v3's typographic scale, leading, and
   restraint answer to this anchor.

## Open questions for the user

- Confirm the four-service taxonomy (Control Attestation, OneView, Custom
  Automation, Consulting) is current; if so, no copy invention is needed.
- Confirm the regional positioning (Middle East and Africa) is still the
  primary geography in 2026; the brief assumes it is.
- The brief avoids inventing customer names, logos, or numeric metrics; if
  real proof becomes available, it can be added to the proof rail before
  ship.
