# Setup Lodge Lens analytics via Google clasp CLI
# Run AFTER site is live on https://dylanwalt.github.io/lodge-lens/
param(
  [switch]$SkipLogin
)

$ErrorActionPreference = 'Stop'
$root = Join-Path $PSScriptRoot '..'
$scriptDir = Join-Path $root 'analytics\apps-script'
$utf8NoBom = New-Object System.Text.UTF8Encoding $false

function New-RandomKey {
  -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object { [char]$_ })
}

function Write-Utf8NoBom($path, $content) {
  [System.IO.File]::WriteAllText($path, $content, $utf8NoBom)
}

Write-Host "Lodge Lens Analytics Setup (clasp CLI)" -ForegroundColor Cyan
Write-Host "Run this after deploy. Live site: https://dylanwalt.github.io/lodge-lens/" -ForegroundColor Gray

if (-not (Get-Command clasp -ErrorAction SilentlyContinue)) {
  Write-Host "Installing @google/clasp globally..."
  npm install -g @google/clasp
}

if (-not $SkipLogin) {
  Write-Host "`nStep 1: Login to Google"
  Write-Host "  Using manual code login (avoids localhost redirect errors in IDE terminals)."
  Write-Host "  After you approve access in the browser, copy the code shown on the page"
  Write-Host "  and paste it here when clasp prompts you."
  clasp login --no-localhost
}

$writeKey = New-RandomKey
$adminKey = New-RandomKey

$codePath = Join-Path $scriptDir 'Code.gs'
$code = [System.IO.File]::ReadAllText($codePath, $utf8NoBom)
$code = $code -replace "WRITE_KEY = '[^']*'", "WRITE_KEY = '$writeKey'"
$code = $code -replace "ADMIN_KEY = '[^']*'", "ADMIN_KEY = '$adminKey'"
Write-Utf8NoBom $codePath $code

Push-Location $scriptDir

if (-not (Test-Path '.clasp.json')) {
  Write-Host "`nStep 2: Create Google Sheet + Apps Script project"
  clasp create-script --title 'Lodge Lens Analytics' --type sheets --rootDir .
} else {
  Write-Host "`nStep 2: Using existing clasp project"
}

$claspJson = Get-Content '.clasp.json' -Raw | ConvertFrom-Json
$parentId = $claspJson.parentId

$code = [System.IO.File]::ReadAllText('Code.gs', $utf8NoBom)
$code = $code -replace "SHEET_ID = '[^']*'", "SHEET_ID = '$parentId'"
Write-Utf8NoBom 'Code.gs' $code

Write-Host "`nStep 3: Push and deploy web app"
clasp push --force
clasp create-version "Lodge Lens analytics"
clasp create-deployment --description "Lodge Lens web app"
clasp list-deployments

Write-Host "`nCopy the Web App URL from above (ends with /exec)"
$url = Read-Host "Web App URL"

$configOut = Join-Path $root 'config\analytics.public.json'
Write-Utf8NoBom $configOut (@{
  endpointUrl = $url.Trim()
  writeKey    = $writeKey
  adminKey    = $adminKey
} | ConvertTo-Json)

Write-Host "`nSaved $configOut" -ForegroundColor Green
Write-Host "Next: .\scripts\deploy.ps1 -Message 'Add analytics config'" -ForegroundColor Cyan

Pop-Location
