# Setup Elevated Walt Media analytics via Google clasp CLI
# Run AFTER site is live on https://dylanwalt.github.io/lodge-lens/
param(
  [switch]$SkipLogin,
  [switch]$UseLocalhost
)

$ErrorActionPreference = 'Stop'
$root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$scriptDir = Join-Path $root 'analytics\apps-script'
$claspJsonPath = Join-Path $scriptDir '.clasp.json'
$codePath = Join-Path $scriptDir 'Code.gs'
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
$claspCreds = Join-Path $env:USERPROFILE '.clasprc.json'

function New-RandomKey {
  -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object { [char]$_ })
}

function Write-Utf8NoBom($path, $content) {
  [System.IO.File]::WriteAllText($path, $content, $utf8NoBom)
}

function Invoke-Clasp {
  param([Parameter(Mandatory)][string[]]$ClaspArgs)

  & clasp @ClaspArgs
  if ($LASTEXITCODE -ne 0) {
    throw "clasp $($ClaspArgs -join ' ') failed (exit $LASTEXITCODE)"
  }
}

function Test-ClaspLoggedIn {
  return (Test-Path $claspCreds) -and ((Get-Item $claspCreds).Length -gt 10)
}

function Invoke-ClaspLogin {
  if ($UseLocalhost) {
    Write-Host "  Using localhost redirect (clasp starts a temporary local server)." -ForegroundColor Gray
    Invoke-Clasp -ClaspArgs @('login')
    return
  }

  Write-Host ""
  Write-Host "  Manual login:" -ForegroundColor Yellow
  Write-Host "  1. Open the Google link clasp prints"
  Write-Host "  2. Approve access"
  Write-Host "  3. If browser shows localhost error, copy the FULL address bar URL"
  Write-Host "  4. Paste the full URL when clasp prompts (not just the code)"
  Write-Host ""

  Invoke-Clasp -ClaspArgs @('login', '--no-localhost')
}

Write-Host "Elevated Walt Media Analytics Setup (clasp CLI)" -ForegroundColor Cyan
Write-Host "Live site: https://dylanwalt.github.io/elevated-walt-media/" -ForegroundColor Gray

if (-not (Get-Command clasp -ErrorAction SilentlyContinue)) {
  Write-Host "Installing @google/clasp globally..."
  npm install -g @google/clasp
}

Write-Host "`nPrerequisite: Apps Script API must be ON for your Google account" -ForegroundColor Yellow
Write-Host "  https://script.google.com/home/usersettings" -ForegroundColor Gray
Write-Host "  Toggle 'Google Apps Script API' on, then wait 1-2 minutes if you just enabled it." -ForegroundColor Gray

if (-not $SkipLogin) {
  Write-Host "`nStep 1: Login to Google" -ForegroundColor Cyan
  Invoke-ClaspLogin
}

if (-not (Test-ClaspLoggedIn)) {
  Write-Error @"
clasp is not logged in (missing $claspCreds).

Log in first:
  clasp login

Then re-run:
  .\scripts\setup-analytics.ps1 -SkipLogin
"@
  exit 1
}

Write-Host "  clasp credentials OK" -ForegroundColor Green

$writeKey = New-RandomKey
$adminKey = New-RandomKey
$ownerToken = New-RandomKey

if (-not (Test-Path $codePath)) {
  throw "Missing $codePath"
}

$code = [System.IO.File]::ReadAllText($codePath, $utf8NoBom)
$code = $code -replace "WRITE_KEY = '[^']*'", "WRITE_KEY = '$writeKey'"
$code = $code -replace "ADMIN_KEY = '[^']*'", "ADMIN_KEY = '$adminKey'"
Write-Utf8NoBom $codePath $code

if (-not (Test-Path $claspJsonPath)) {
  Write-Host "`nStep 2: Create Google Sheet + Apps Script project" -ForegroundColor Cyan
  Invoke-Clasp -ClaspArgs @(
    'create',
    '--type', 'sheets',
    '--title', 'Elevated Walt Media Analytics',
    '--rootDir', $scriptDir
  )
} else {
  Write-Host "`nStep 2: Using existing clasp project" -ForegroundColor Cyan
}

if (-not (Test-Path $claspJsonPath)) {
  throw @"
create did not produce $claspJsonPath

Enable Google Apps Script API: https://script.google.com/home/usersettings
Then run again: .\scripts\setup-analytics.ps1 -SkipLogin
"@
}

$claspJson = Get-Content $claspJsonPath -Raw | ConvertFrom-Json
$parentId = $claspJson.parentId
if (-not $parentId) {
  throw "$claspJsonPath is missing parentId (spreadsheet id)"
}

Write-Host "  Sheet ID: $parentId" -ForegroundColor Gray
Write-Host "  Script: https://script.google.com/d/$($claspJson.scriptId)/edit" -ForegroundColor Gray

$code = [System.IO.File]::ReadAllText($codePath, $utf8NoBom)
$code = $code -replace "SHEET_ID = '[^']*'", "SHEET_ID = '$parentId'"
Write-Utf8NoBom $codePath $code

Write-Host "`nStep 3: Push and deploy web app" -ForegroundColor Cyan
Invoke-Clasp -ClaspArgs @('push', '--force', '-P', $scriptDir)
Invoke-Clasp -ClaspArgs @('create-version', 'Elevated Walt Media analytics', '-P', $scriptDir)
Invoke-Clasp -ClaspArgs @('create-deployment', '--description', 'Elevated Walt Media web app', '-P', $scriptDir)
$deployJson = clasp list-deployments -P $scriptDir --json | ConvertFrom-Json
$deployment = $deployJson | Where-Object { $_.description -eq 'Elevated Walt Media web app' } | Select-Object -First 1
if (-not $deployment) {
  $deployment = $deployJson | Where-Object { $_.versionNumber } | Sort-Object versionNumber -Descending | Select-Object -First 1
}
if (-not $deployment.deploymentId) {
  throw 'Could not find deployment id from clasp list-deployments'
}

$url = "https://script.google.com/macros/s/$($deployment.deploymentId)/exec"
Write-Host "`nWeb App URL:" -ForegroundColor Green
Write-Host "  $url" -ForegroundColor Gray

$configOut = Join-Path $root 'config\analytics.public.json'
Write-Utf8NoBom $configOut (@{
  endpointUrl = $url.Trim()
  writeKey    = $writeKey
  adminKey    = $adminKey
  ownerToken  = $ownerToken
} | ConvertTo-Json)

Write-Host "`nSaved $configOut" -ForegroundColor Green
Write-Host "Owner me-link: ?me=$ownerToken (bookmark on your phone/laptop)" -ForegroundColor Gray
Write-Host "Next: .\scripts\deploy.ps1 -Message 'Add analytics config'" -ForegroundColor Cyan
