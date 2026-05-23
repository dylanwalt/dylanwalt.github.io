---
name: website-rebuild-pro
description: "Rebuild scraped brand and marketing websites into distinctive local Next.js experiences. Use deterministic design planning, registry component sourcing, immersive motion, and strict anti-slop guardrails."
---

# Website Rebuild Pro

Use this skill to turn a source website into a local site that preserves the
brand truth while elevating the experience with premium layout, motion, and
component architecture.

This is a generative rebuild workflow, not a generic template assembly. The
result should feel authored, source-aligned, and materially better than the
scraped source.

Read [references/immersive-experience.md](references/immersive-experience.md)
and [references/taste-skill.md](references/taste-skill.md) before making design
decisions or frontend edits. Read [references/publishing.md](references/publishing.md)
when the user asks for a live rebuild, a public repository, or a new site in this
workspace.

## Repo Contract

Each site lives in `sites/<site>/`:

- `site.config.json` defines source URLs, stack, and publish path
- `scraped/` stores pages, assets, and crawl manifests
- `notes/` stores requirements, brand brief, experience brief, and design-system output
- `build/` stores the runnable website
- `publish.slug` in `site.config.json` is the stable public route segment

Use `agents/website-scraper/` before guessing about source content. Use
`agents/website-builder/` only after the source, brand brief, and experience
brief are understood.

## Required Tools

This skill relies on external design and component tooling.

- UI/UX Pro Max for design-system search and persistence:

```powershell
powershell -ExecutionPolicy Bypass -File .codex/skills/website-rebuild-pro/scripts/ensure_ui_ux_pro_max.ps1
```

- Shadcn-style registry components from 21st.dev or other compatible sources.

Audit every registry item before writing it into the build:

```bash
python .codex/skills/website-rebuild-pro/scripts/fetch_21st_registry_item.py --url "https://21st.dev/r/author/component" --project-root "sites/<site>/build" --dry-run
```

Inspect `type`, `dependencies`, `devDependencies`, `registryDependencies`,
`files`, `files[].target`, and `envVars`. Do not accept remote file writes
that are not understood.

## Core workflow

### 1. Ground the rebuild

Read `site.config.json`, source pages, scrape manifest, scraped assets, notes,
and brand signals. Do not fabricate business claims, metrics, logos, or product
capabilities.

Update or create:

- `sites/<site>/notes/brand-brief.md`
- `sites/<site>/notes/experience-brief.md`

The experience brief must capture:

- one-sentence experience thesis
- first-viewport brand signal
- hero asset or scene
- section sequence and conversion path
- one signature interaction and reduced-motion fallback
- which source assets to keep, replace, or generate

### 2. Design plan first

Before writing code, generate a deterministic design plan. Commit to it and
apply it consistently.

A valid plan includes:

- hero architecture
- typography stack
- component architecture
- motion paradigm
- conversion path
- reduced-motion strategy

For a robust result, prefer a seeded design-plan process over inventing layouts
on the fly. This prevents repetitive, centered, safe output and enforces creative
variance.

### 3. Source registry and component strategy

Prefer high-fidelity registry-sourced primitives over hallucinated custom UI
when the registry item fits the brand and build.

- Use shadcn-style component sourcing and audit each item carefully.
- Use 21st.dev-style hero or section references as raw material, not a direct clone.
- Add premium registry sources like Aceternity UI or Magic UI when they align
  with the build and do not add unnecessary weight.
- Use `components.json` or stack-specific config to keep registry sourcing explicit.

### 4. Build the experience

Recommended stack where feasible:

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn-style owned components
- Framer Motion or Motion for React

When the experience requires cinematic scroll interactions, use:

- GSAP + ScrollTrigger for pinning, scrubbing, and horizontal scroll scenes
- Lenis for smooth scroll inertia and refined pacing
- R3F / three.js only when source or brand supports a spatial, 3D scene

Use actual source images and brand assets wherever possible. Avoid abstract
assets that are disconnected from the business.

### 5. Motion and accessibility

Use motion intentionally:

- entrance motion should establish hierarchy
- scroll-linked motion should reveal sequence or depth
- hover/focus motion should confirm interaction
- ambient motion should be subtle and never compete with content

Always provide reduced-motion fallbacks. For App Router, keep motion inside
client components and use `MotionConfig reducedMotion="user"` or
`useReducedMotion`.

### 6. Reject generic output

Before finalizing, compare the rebuild with the source and the experience brief.
Revise if the page still feels like a generic component catalog.

Do not ship if any of these are true:

- the hero could fit an unrelated company after swapping a logo
- the page is mostly rounded cards in a grid
- the imagery is unrelated to the brand subject
- the palette feels one-note and the section hierarchy is weak
- motion is decorative, distracting, or missing a reduced-motion path
- there is no clear reason to scroll after the hero

### 7. Verify and handoff

Run focused lint/build checks. Inspect in browser:

- desktop first viewport
- mobile first viewport and text wrapping
- reduced-motion behavior when motion is central
- image loading and responsive layouts
- focus states and no horizontal overflow

Document local run instructions in `sites/<site>/build/README.md`.

### 8. Publish rebuilds

When publishing is in scope, keep each finished rebuild runnable and add it to
the public index under its stable `publish.slug`.
