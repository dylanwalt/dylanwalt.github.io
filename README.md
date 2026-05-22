# WEBSITE-REBUILD

Workspace for rebuilding multiple websites with two workflows:

- **Website scraper agent**: collects a site’s pages/assets into `sites/<site>/scraped/`
- **Website builder agent**: turns `scraped/` + `notes/` into a working site in `sites/<site>/build/`

## Repo layout

- `agents/`
  - `website-scraper/` – scraping workflow + prompt/template
  - `website-builder/` – build workflow + prompt/template
- `sites/`
  - `<site>/`
    - `site.config.json` – per-site config (urls, constraints, targets)
    - `notes/` – requirements, decisions, TODOs
    - `scraped/` – downloaded pages/assets + extracted metadata
    - `build/` – generated/implemented website output
- `scripts/` – helper scripts (optional)

## Add a new site

1. Create `sites/<site>/` (copy from `sites/clevacado/` as a starter)
2. Fill in `sites/<site>/site.config.json`
3. Run the scraper agent, then the builder agent for that site folder

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
