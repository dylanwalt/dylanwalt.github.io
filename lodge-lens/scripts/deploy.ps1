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

Write-Host "GitHub Pages deploys via CI (export-pages.mjs copies lodge-lens into pages-dist)."

# Patch base paths for GitHub Pages subfolder (UTF-8 without BOM)
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
Get-ChildItem -Path $dest -Filter "*.html" -Recurse | ForEach-Object {
  $content = [System.IO.File]::ReadAllText($_.FullName, $utf8NoBom)
  $content = $content -replace 'data-base-path="\.\."', 'data-base-path="/lodge-lens"'
  $content = $content -replace 'data-base-path=""', 'data-base-path="/lodge-lens"'
  [System.IO.File]::WriteAllText($_.FullName, $content, $utf8NoBom)
}

Push-Location $PagesRepo
git add $PublishPath
git status
git commit -m $Message
git push origin main
Pop-Location

Write-Host "Deployed to https://dylanwalt.github.io/$PublishPath/"
