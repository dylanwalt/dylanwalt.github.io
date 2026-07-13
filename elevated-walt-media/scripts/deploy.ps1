# Deploy Elevated Walt Media site to dylanwalt.github.io via clasp-free git push
param(
  [string]$Message = "Update Elevated Walt Media",
  [string]$PagesRepo = "$PSScriptRoot\..\..\_pages-repo",
  [string]$PublishPath = "elevated-walt-media"
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

$exclude = @('node_modules', '.clasp.json', '.clasprc.json', 'analytics', '_tools', 'assets\video\hero-aerial.mp4', 'assets\video\_hero-build', 'assets\media\safari-plains\raw', 'assets\media\safari-plains\organized', 'assets\media\safari-plains\_vision-cache', 'assets\media\safari-plains\_vision-packs', 'assets\media\safari-plains\_drone-review', 'assets\media\safari-plains\_review-samples', 'assets\media\safari-plains\_review-export', 'assets\media\safari-plains\gallery')
robocopy $source $dest /E /XD $exclude /NFL /NDL /NJH /NJS /nc /ns /np | Out-Null

Write-Host "GitHub Pages deploys via CI (export-pages.mjs copies elevated-walt-media into pages-dist and patches base paths)."

Push-Location $PagesRepo
if (Test-Path (Join-Path $PagesRepo 'lodge-lens')) {
  git rm -r -f lodge-lens 2>$null | Out-Null
}
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
