# Website Builder Agent

## Goal

Given a site folder (e.g. `sites/clevacado/`) and its `scraped/` + `notes/`, produce an implementation in:

- `sites/<site>/build/`

## Inputs

- `sites/<site>/scraped/`
- `sites/<site>/notes/`
- `sites/<site>/site.config.json`

## Outputs (expected)

- A runnable site in `sites/<site>/build/` (framework/stack depends on `site.config.json`)

