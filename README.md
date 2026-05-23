# WEBSITE-REBUILD

Workspace for rebuilding multiple websites with a structured agent workflow and a
premium rebuild standard.

- **Website scraper agent**: collects a site’s pages/assets into `sites/<site>/scraped/`
- **Website builder agent**: turns `scraped/` + `notes/` into a working, brand-aligned site in `sites/<site>/build/`

## Repo layout

- `agents/`
  - `website-scraper/` – scraping workflow + prompt/template
  - `website-builder/` – build workflow + prompt/template
- `sites/`
  - `<site>/`
    - `site.config.json` – per-site config (urls, constraints, targets, stack)
    - `notes/` – requirements, brand brief, experience brief, design decisions
    - `scraped/` – downloaded pages/assets + extracted metadata
    - `build/` – generated/implemented website output
- `.codex/skills/website-rebuild-pro/` – skill documentation and workflow for premium rebuilds
- `scripts/` – helper scripts (optional)

## Build workflow

1. Create `sites/<site>/` using an existing site folder as a starter.
2. Fill in `sites/<site>/site.config.json` with source URLs, scrape targets, and stack preferences.
3. Run the scraper agent first to capture the source.
4. Use the builder agent and the `website-rebuild-pro` skill to produce the rebuilt site.

## Premium rebuild expectations

This repo is designed for more than a straight clone. The rebuilt site should:

- preserve source truth while elevating brand signal
- use a deterministic design plan before implementation
- source registry components when appropriate instead of rewriting fragile UI by hand
- incorporate meaningful motion and clear reduced-motion fallbacks
- avoid generic "AI slop" layouts, gradients, and card catalogs

## Publish rebuilds

Completed rebuilds also ship as standalone public routes. Add a stable
`publish.slug` to each site config, export the site to that path for GitHub
Pages, and keep the public index updated so prior rebuilds stay live when new
ones are added.

Build the GitHub Pages artifact locally with:

```bash
node scripts/export-pages.mjs
```

Raw `sites/*/scraped/` captures stay local by default; public rebuilds commit
the implementation and curated assets used by each finished route.
