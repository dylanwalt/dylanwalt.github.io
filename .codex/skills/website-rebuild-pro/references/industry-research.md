# Industry Research: Top 15 Inspiration Brief

Read this reference before grounding any rebuild. **No rebuild begins until a
top-15 industry inspiration brief is committed to `sites/<site>/notes/`.** This
turns the rebuild from "Claude's taste applied to a brand" into "the strongest
patterns in the brand's actual category, applied with discipline."

## Why this exists

Without a competitive scan, rebuilds drift toward a single house style — dark
hero, big serif, scroll-scrubbed product reveal — regardless of whether that
fits the sector. A jewelry boutique should not look like a SaaS product page;
a structural engineering firm should not look like a perfume brand. A
short, structured scan of the sector's best work prevents that drift and
gives the design plan real references to argue with.

## What counts as "top 15 performing"

A top-15 list is not a popularity ranking. It is a curated sample of **the
fifteen sites whose design, motion, conversion architecture, and brand
expression are strongest in this specific sector**, weighted toward sites that
the source could plausibly compete with.

Use this composition (target counts; adjust ±1 as needed):

- **5 award-recognized sites in this sector** — sites with current or recent
  recognition from Awwwards (Site of the Day or Site of the Month), FWA, CSS
  Design Awards, The Webby Awards, or Brand New Awards. Their craft is
  externally validated.
- **5 category leaders** — the sites of the sector's most recognized brands
  (the names a knowledgeable customer would already list). These define the
  expectations the source's customers walk in with.
- **3 outsider / challenger brands** — newer DTC, indie, or boutique players
  whose sites reframe the category. They show what is possible right now, not
  what is safe.
- **2 adjacent-category benchmarks** — exemplars from a category one step
  away (e.g. luxury hospitality for a high-end real-estate brand) that the
  source can legitimately borrow tone from.

If a sector is too small to fill 15 (e.g. a hyper-local trade), expand
adjacent-category benchmarks until 15 is reached. If a sector has more than 15
obvious candidates, prefer recency (favor sites refreshed in the last 24
months) and skip any site whose live version is materially worse than a
competing entry.

## Where to look

Use these sources in roughly this order:

1. **Awards directories** — Awwwards, FWA, CSS Design Awards, SiteInspire,
   Lapa Ninja, Land Book, Httpster, One Page Love, Godly. Filter by sector
   or tag where supported.
2. **"Best <sector> websites" round-ups** — Webflow Discover,
   designspiration.com, Muzli search, Designrush curated lists, agency
   case-study indexes.
3. **Trade-association member directories** — for niche or regulated sectors
   (HVAC, dental, accounting, law, real estate brokerages), the top members of
   the trade body usually own the leading sites.
4. **Direct knowledge of the category** — for fashion, hospitality,
   automotive, consumer hardware, software, and media there is a well-known
   shortlist. Use it.
5. **The source's own competitor list** — if `notes/` mentions competitors,
   include the strongest 2–3 even if they would not otherwise make the list.

Do not include:

- Generic template marketplaces (ThemeForest, Squarespace template demos).
- Aggregator pages or directory listings rather than the brand's own site.
- Anything behind a hard login wall — the agent cannot read it.

## Workflow

1. **Identify the sector.** Read `site.config.json` and any notes. State the
   sector and sub-sector in one line: e.g. "Independent craft chocolate
   maker — DTC retail with origin-story brand emphasis." If the sector is
   ambiguous, stop and ask before continuing.
2. **Draft a long list.** Aim for 25–30 candidate sites using the sources
   above. Keep URLs and a one-line "why it's a candidate" note for each.
3. **Cut to 15.** Apply the composition above (5 award / 5 leader / 3
   challenger / 2 adjacent). Note any rejected long-list entries with the
   reason — useful when reviewing the brief.
4. **Audit each of the 15.** Visit the live site (or its archived form) and
   extract the deliverable schema below. Capture screenshots into
   `sites/<site>/notes/inspiration/` where rights and bandwidth allow; URLs
   alone are acceptable if capture is impractical.
5. **Synthesize.** Produce
   `sites/<site>/notes/industry-inspiration.md` using the template below.
6. **Pick 3 anchors.** Star three of the fifteen as primary references — the
   sites the rebuild will most directly answer to. The design plan in Step 2
   of the core workflow must cite these three by name.
7. **Identify anti-patterns.** Note three patterns the rebuild will *not*
   inherit from the sector (e.g. "every chocolate site uses the same
   serif and the same earth-tone palette — we will differ here on purpose").

## Per-site deliverable schema

For each of the 15 sites, capture:

```yaml
- url: https://example.com
  brand: Example Co.
  bucket: award | leader | challenger | adjacent
  one_line: "What this site does that is worth borrowing."
  hero:
    archetype: "centered product still | lifestyle | type-led | scroll-scrubbed | etc."
    h1_pattern: "Brand name | product name | claim | wordless"
    cta_pattern: "primary + secondary structure"
  typography:
    display: "typeface family and weight, if identifiable"
    body: "typeface family"
    scale_note: "tight tracking, ultra-large display, etc."
  color:
    chrome: "light | dark | banded"
    accent: "single accent color or palette role"
  layout:
    section_count: 8
    rhythm: "list of beats in order"
    grid: "12-col | bento | editorial | mosaic | full-bleed bands"
  motion:
    signature: "what they do that nobody else in the sector does"
    techniques: ["scroll-scrub", "pin", "color-swatch crossfade", ...]
    reduced_motion_note: "do they handle it?"
  conversion:
    primary_path: "where the buy / contact / book CTA leads"
    repeat_cadence: "how often the primary CTA reappears"
  copy_voice:
    register: "luxury | technical | warm | clinical | playful | etc."
    sample: "one verbatim line that captures the voice"
  asset_style:
    imagery: "studio product | editorial lifestyle | 3D render | illustration | UGC"
    iconography: "line | filled | none"
  weakness: "what they could do better, so we don't repeat it"
```

If a field is genuinely not applicable, write `n/a` rather than guessing.

## Synthesis template — `notes/industry-inspiration.md`

```markdown
# Industry Inspiration Brief — <site>

## Sector
<one-line sector + sub-sector statement>

## Source brand stance in the sector
<2–3 sentences: where the source sits relative to category leaders and
challengers; what it can credibly claim and what it cannot>

## The fifteen

| # | URL | Brand | Bucket | One line |
| - | --- | ----- | ------ | -------- |

(populate 15 rows; anchors marked with ★)

## Per-site notes
<paste the YAML blocks above for all 15>

## Patterns to inherit
- Hero: <pattern + which anchors validate it>
- Typography: <pattern + which anchors validate it>
- Color: <pattern + which anchors validate it>
- Section rhythm: <pattern>
- Signature motion: <pattern>
- Conversion architecture: <pattern>

## Anti-patterns to break
1. <pattern + reason>
2. <pattern + reason>
3. <pattern + reason>

## Three anchor references
1. ★ <url> — <what the rebuild will answer to here>
2. ★ <url> — <what the rebuild will answer to here>
3. ★ <url> — <what the rebuild will answer to here>

## Open questions for the user
<short list, if any — these get resolved before the design plan>
```

## How the brief feeds the design plan

The design plan (Step 2 of the core workflow) must explicitly map each of its
five decisions back to the brief:

| Design plan decision | Cite from brief |
| --- | --- |
| Hero architecture | which anchor's hero archetype, and what changes |
| Typography stack | which sector pattern is being inherited or broken |
| Component architecture | which sector layout grid is being used |
| Motion paradigm | which signature is being borrowed and how it's translated |
| Conversion path | which conversion architecture, and where it diverges |

If a design plan decision cannot cite the brief, either revise the decision or
revise the brief — both are still in scope at that stage.

## Anti-patterns when researching

- **Averaging to mediocrity.** If thirteen of fifteen sites use a serif
  headline on cream, that is information, not a mandate. Anchors can argue
  for any move; copying the median produces invisible work.
- **Sector inbreeding.** If every site in the brief shares one weakness,
  the rebuild should not also have it. Identify and break it.
- **Asset envy.** Do not promise the rebuild moves that require assets the
  source does not have (4K studio footage, hundreds of product SKUs,
  international press logos). Note the constraint in the brief.
- **Trend chasing.** Bento grids, brutalist type, scroll-scrubbed everything
  — these are tools, not goals. If the anchors do not show it, the brief
  should not push it.

## Time and depth budget

- A reasonable brief takes 30–90 minutes of agent work.
- Spend more time on the audit than on the long-list.
- The brief is a living document — revisit it after the rebuild's first pass
  and update with what survived contact with implementation.
