# Lodge Lens

Private aerial preview site for lodges — **Dylan Walt Aerial Media**.

Deploys to `https://dylanwalt.github.io/lodge-lens/`

## Quick start

```powershell
cd lodge-lens
python -m http.server 8080
# Open http://localhost:8080
```

Safari Plains preview password: `SafariPlains2026` (hash stored in config)

## Setup (one-time)

```powershell
# Analytics (Google clasp CLI — creates Sheet + Apps Script)
.\scripts\setup-analytics.ps1

# Admin backdoor password (triple-click logo)
$hash = .\scripts\hash-password.ps1 -Password "YourAdminPassword"
# Paste $hash into data-admin-hash="" on index.html pages, or run:
.\scripts\inject-admin-hash.ps1 -Password "YourAdminPassword"

# Logos for all lodge tiles
.\scripts\fetch-logos.ps1
```

## Before launch

1. Upload YouTube unlisted videos → paste IDs in `config/lodges.public.json`  
   See `../docs/YOUTUBE_SETUP.md`
2. Add Google Drive package URL for Safari Plains
3. `.\scripts\validate-config.ps1`
4. `.\scripts\deploy.ps1 -Message "Launch Lodge Lens"`

## Docs

- `../docs/IMPLEMENTATION_PLAN.md` — full wave plan
- `../docs/ANALYTICS_SETUP.md` — Google Sheet + clasp
- `../docs/BRAND.md` — colors, name ideas, spelling
- `../.cursor/skills/lodge-lens-*` — agent skills
