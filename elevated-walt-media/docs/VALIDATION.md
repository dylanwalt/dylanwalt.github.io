# Lodge Lens pre-publish validation (run before every deploy)

Exit code 0 = pass, 1 = fail (blocks deploy).

## Wave 0 - Encoding (strict)

- No UTF-8 BOM in HTML, CSS, JS, JSON under `lodge-lens/`
- No mojibake byte sequences (detected by UTF-8 pattern scan)
- No curly/smart quotes in HTML/JS
- Prefer ASCII punctuation in HTML titles and user-visible copy: use `-` not em dash

## Wave 1 - Brand and assets

- `assets/brand/elevate-walt-media/logo.svg` exists and size > 100 bytes
- Every lodge in `config/lodges.public.json` has logo PNG on disk (> 200 bytes)
- `index.html` references brand logo (`brand-logo` or `logo.svg`)
- Favicon exists

## Wave 2 - Pages and paths

- Every lodge slug has `/{slug}/index.html`
- All HTML have `<meta charset="utf-8">`
- Safari Plains has `#experience` section
- `js/home.js` renders square `lodge-tile` cards
- No `data-base-path="/lodge-lens"` in source (only patched at deploy time)

## Wave 3 - Config and security

- Active lodges have passwordHash, no `REPLACE_ME` youtube IDs (warn only until launch)
- `config/lodges.public.json` valid JSON
- No plaintext passwords in repo

## Wave 4 - Copy rules

- Footer must contain "internal review"
- Hero or body must mention "internal team"
- Must NOT contain "A/B test", "A-B test", "AB test", or "split test"

## Automation

```powershell
.\scripts\validate-site.ps1          # all waves
.\scripts\validate-site.ps1 -Wave 0  # encoding only
```

`deploy.ps1` calls `validate-site.ps1` and aborts on failure.

GitHub Actions runs the same script before `export-pages.mjs`.

Agents: read `.cursor/skills/lodge-lens-pre-publish/SKILL.md` before any Lodge Lens deploy.
