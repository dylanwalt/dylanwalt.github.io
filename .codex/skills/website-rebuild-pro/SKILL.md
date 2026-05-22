---
name: website-rebuild-pro
description: "Rebuild scraped brand and marketing websites into distinctive local Next.js experiences. Use UI/UX Pro Max for design-system decisions, 21st.dev registry components for hero and section references, and Framer Motion or Motion for React for immersive but accessible motion."
---

# Website Rebuild Pro

Use this skill to turn a source website into a local site that preserves the
brand and content truth while materially improving the experience.

The default output is not a template clone. It should have a clear experience
thesis, strong visual assets, section rhythm, a brand-specific hero, and motion
that explains the product or place.

Read [references/immersive-experience.md](references/immersive-experience.md)
before making design decisions or frontend edits.
Read [references/publishing.md](references/publishing.md) when the user asks
for a live rebuild, a public repository, or a new site in this workspace.

## Repo Contract

Each site lives in `sites/<site>/`:

- `site.config.json` defines source URLs and build stack.
- `scraped/` stores pages, assets, and crawl manifests.
- `notes/` stores requirements, brand brief, experience brief, and design-system output.
- `build/` stores the runnable website.
- `publish.slug` in `site.config.json` is the stable public route segment.

Use `agents/website-scraper/` before guessing about source content. Use
`agents/website-builder/` only after the source, brand brief, and experience
brief are understood.

## Required Tools

UI/UX Pro Max is required for design-system search and persistence:

```powershell
powershell -ExecutionPolicy Bypass -File .codex/skills/website-rebuild-pro/scripts/ensure_ui_ux_pro_max.ps1
```

Expected script:

- `.codex/skills/ui-ux-pro-max/scripts/search.py`

21st.dev components are shadcn registry items. Audit a candidate before writing
it into a build:

```bash
python .codex/skills/website-rebuild-pro/scripts/fetch_21st_registry_item.py --url "https://21st.dev/r/author/component" --project-root "sites/<site>/build" --dry-run
```

Inspect `type`, `dependencies`, `devDependencies`, `registryDependencies`,
`files`, `files[].target`, and `envVars`. Do not use remote overwrite unless
every changed file is understood.

## Workflow

### 1. Ground The Rebuild

Read `site.config.json`, requirements, source pages, scrape manifests, images,
logos, product screenshots, and current routes. Do not fabricate business
claims, metrics, logos, client names, or product capabilities.

Create or update:

- `sites/<site>/notes/brand-brief.md`
- `sites/<site>/notes/experience-brief.md`

The experience brief must state:

- the one-sentence experience thesis
- the first-viewport brand signal
- the hero asset or scene
- the section sequence and conversion path
- one signature interaction and its reduced-motion fallback
- source assets to keep, replace, or generate

### 2. Build The Design System

Persist UI/UX Pro Max output:

```bash
python .codex/skills/ui-ux-pro-max/scripts/search.py "<industry> <audience> <brand keywords>" --design-system --persist -p "<Project Name>" -o "sites/<site>/notes"
```

Run targeted searches where needed:

```bash
python .codex/skills/ui-ux-pro-max/scripts/search.py "hero trust conversion" --domain landing
python .codex/skills/ui-ux-pro-max/scripts/search.py "motion focus accessibility" --domain ux
python .codex/skills/ui-ux-pro-max/scripts/search.py "nextjs performance" --stack nextjs
```

Treat the generated master as constraints and rationale, not permission to ship
a generic page. Resolve conflicts against the source brand and the user request.

### 3. Select 21st.dev References

Start at `https://21st.dev/community/components/s/hero`.

Choose a hero or section reference that fits the experience thesis:

- full-bleed image or media treatment for brand, product, venue, or portfolio work
- CTA hierarchy that matches the real conversion path
- dependencies that fit the build
- mobile text flow and next-section hint that survive adaptation

Install with shadcn when the project is initialized:

```bash
cd "sites/<site>/build"
npx shadcn@latest add "https://21st.dev/r/author/component"
```

Use a component as raw material. Replace its copy, imagery, palette, spacing,
motion, and layout details until it belongs to the source brand.

### 4. Build The Experience

Recommended stack:

- Next.js App Router
- TypeScript and Tailwind
- shadcn-style owned components
- Framer Motion or Motion for React

Build with actual assets. Prefer source images, brand assets, product images, or
generated bitmap visuals over abstract decoration. Keep sections unframed unless
the content is genuinely a repeated item, modal, or tool surface.

Required first pass:

- immersive hero with a real asset and the brand or literal offer in the H1
- trust or evidence band
- capability or narrative sequence with varied section pacing
- strong conversion section
- route metadata, image dimensions, keyboard focus states, and responsive layouts

### 5. Motion And Performance

Use motion intentionally:

- entrance motion sets hierarchy
- scroll motion reveals sequence or depth
- hover and focus motion confirms interaction
- ambient motion is subtle and never competes with reading

For App Router, keep motion inside explicit client boundaries. Use
`MotionConfig reducedMotion="user"` or component-level `useReducedMotion`.
Reduced motion must disable large transforms, parallax, and autoplaying media
while keeping content understandable.

Prefer `opacity`, `transform`, and scoped reveal effects. Reserve image geometry
to avoid layout shift. Keep the hero asset fast because it is likely the LCP
candidate.

### 6. Reject Generic Output

Before finalizing, compare the rebuild to the source and the experience brief.
Revise if any of these are true:

- the hero could fit an unrelated company after swapping a logo
- the page is mostly rounded cards in a grid
- visual assets are atmospheric but do not show the brand subject
- the palette reads as one-note and section hierarchy is weak
- motion is decorative, distracting, or missing a reduced-motion path
- there is no visible reason to scroll after the first viewport

### 7. Verify And Handoff

Run focused lint/build checks. Open the local app in a browser and inspect:

- desktop first viewport
- mobile first viewport and text wrapping
- one deep route if present
- reduced-motion behavior where motion is central
- image loading, focus states, and absence of horizontal overflow

Leave the dev server running when the user asks to view the site locally. Record
how to run it in `sites/<site>/build/README.md`.

### 8. Publish Rebuilds

In this workspace, each finished rebuild must remain independently runnable and
also have one stable public page URL. When publishing is in scope, keep the
existing site folders, export each build under its `publish.slug`, add it to the
public index, and publish both prior completed rebuilds and new rebuilds instead
of leaving older sites only on localhost.
