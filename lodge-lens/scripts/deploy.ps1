# Deploy Lodge Lens to dylanwalt.github.io via clasp-free git push
param(
  [string]$Message = "Update Lodge Lens",
  [string]$PagesRepo = "$PSScriptRoot\..\..\_pages-repo",
  [string]$PublishPath = "lodge-lens"
)

$source = Join-Path $PSScriptRoot ".."
$dest = Join-Path $PagesRepo $PublishPath

if (-not (Test-Path $PagesRepo)) {
  Write-Error "Pages repo not found at $PagesRepo. Run: gh repo clone dylanwalt/dylanwalt.github.io _pages-repo"
  exit 1
}

Write-Host "Running pre-deploy validation..."
& "$PSScriptRoot\validate-site.ps1" -SiteRoot $source
if ($LASTEXITCODE -ne 0) {
  Write-Error "Validation failed. Fix issues before deploy."
  exit 1
}

Write-Host "Copying site to $dest ..."
if (Test-Path $dest) { Remove-Item $dest -Recurse -Force }
New-Item -ItemType Directory -Force -Path $dest | Out-Null

$exclude = @('node_modules', '.clasp.json', '.clasprc.json', 'analytics')
robocopy $source $dest /E /XD $exclude /NFL /NDL /NJH /NJS /nc /ns /np | Out-Null

Write-Host "GitHub Pages deploys via CI (export-pages.mjs copies lodge-lens into pages-dist and patches base paths)."

Push-Location $PagesRepo
git add $PublishPath scripts/export-pages.mjs
$analyticsConfig = Join-Path $dest 'config\analytics.public.json'
if (Test-Path $analyticsConfig) {
  git add -f (Join-Path $PublishPath 'config/analytics.public.json')
}
git status
git commit -m $Message
git push origin main
Pop-Location

Write-Host "Deployed to https://dylanwalt.github.io/$PublishPath/"
