# Website Builder Agent

## Goal

Given a site folder (for example `sites/clevacado/`) and its `scraped/` + `notes/`, produce a polished, brand-aligned website build in:

- `sites/<site>/build/`

## Inputs

- `sites/<site>/scraped/` (read-only source copy of pages, assets, and manifest)
- `sites/<site>/notes/` (requirements, brand brief, experience brief, design system decisions)
- `sites/<site>/site.config.json` (stack, URLs, publish path, constraints)

## Workflow

1. Audit the source: confirm what content, imagery, and brand signals are available.
2. Write or update `notes/experience-brief.md` with:
   - one-sentence experience thesis
   - first-viewport brand signal
   - hero asset or scene
   - section sequence and conversion path
   - signature interaction and reduced-motion fallback
3. Create a deterministic design plan before editing implementation:
   - hero architecture
   - typography stack
   - component architecture
   - motion paradigm
   - conversion path
4. Build the implementation inside `sites/<site>/build/` only.
5. Add a clear `sites/<site>/build/README.md` describing how to run the site locally and any build or deploy notes.

## Expected quality

- The rebuild should preserve source truth and brand identity.
- The rebuild should feel authored, not templated.
- Use registry-sourced components when they accelerate a robust, maintainable implementation.
- Use motion sparingly and meaningfully; always include a reduced-motion path for key interactions.
- Avoid overly safe layout patterns and generic visual noise.

## Notes

- If a stack or framework is not specified in `site.config.json`, pause and ask for it before continuing.
- If the source contains weak hero media, use composited or generated visual assets that keep the brand subject present.
- If using shadcn components, audit every registry item and only accept dependencies that are understood and needed.

