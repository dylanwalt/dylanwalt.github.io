# Website Scraper Agent

## Goal

Given a site folder (e.g. `sites/clevacado/`) and its `site.config.json`, collect:

- HTML for pages into `scraped/pages/`
- static assets (images/css/js/fonts) into `scraped/assets/`
- metadata/manifests into `scraped/meta/`

## Inputs

- `sites/<site>/site.config.json`
- Any extra constraints in `sites/<site>/notes/`

## Outputs (expected)

- `sites/<site>/scraped/meta/sitemap.json` (or similar manifest)
- `sites/<site>/scraped/pages/...` (saved page sources)
- `sites/<site>/scraped/assets/...` (downloaded assets)

