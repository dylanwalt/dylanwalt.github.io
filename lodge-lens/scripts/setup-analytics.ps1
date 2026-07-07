# Setup Lodge Lens analytics via Google clasp CLI
# Prerequisites: Node.js, npm install -g @google/clasp
param(
  [switch]$SkipLogin
)

$ErrorActionPreference = 'Stop'
$root = Join-Path $PSScriptRoot '..'
$scriptDir = Join-Path $root 'analytics\apps-script'

function New-RandomKey {
  -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object { [char]$_ })
}

Write-Host "Lodge Lens Analytics Setup (clasp CLI)" -ForegroundColor Cyan

# Check clasp
if (-not (Get-Command clasp -ErrorAction SilentlyContinue)) {
  Write-Host "Installing @google/clasp globally..."
  npm install -g @google/clasp
}

if (-not $SkipLogin) {
  Write-Host "`nStep 1: Login to Google (browser will open)"
  Write-Host "  clasp login --no-localhost"
  clasp login --no-localhost
}

$writeKey = New-RandomKey
$adminKey = New-RandomKey
Write-Host "`nGenerated writeKey and adminKey"

# Patch Code.gs keys (Sheet ID added after create)
$codePath = Join-Path $scriptDir 'Code.gs'
$code = Get-Content $codePath -Raw
$code = $code -replace "WRITE_KEY = '[^']*'", "WRITE_KEY = '$writeKey'"
$code = $code -replace "ADMIN_KEY = '[^']*'", "ADMIN_KEY = '$adminKey'"
Set-Content $codePath $code -Encoding utf8

Write-Host "`nStep 2: Create Google Sheet + Apps Script project"
Write-Host "  This opens a new Sheet in your Google account."
Push-Location $scriptDir

if (-not (Test-Path '.clasp.json')) {
  clasp create-script --title 'Lodge Lens Analytics' --type sheets --rootDir .
}

$claspJson = Get-Content '.clasp.json' -Raw | ConvertFrom-Json
$scriptId = $claspJson.scriptId
$parentId = $claspJson.parentId  # Spreadsheet ID when type=sheets

Write-Host "  Script ID: $scriptId"
Write-Host "  Sheet ID:  $parentId"

# Update SHEET_ID in Code.gs
$code = Get-Content 'Code.gs' -Raw
$code = $code -replace "SHEET_ID = '[^']*'", "SHEET_ID = '$parentId'"
Set-Content 'Code.gs' $code -Encoding utf8

Write-Host "`nStep 3: Push and deploy web app"
clasp push --force
clasp create-version "Initial Lodge Lens analytics"
$deployJson = clasp create-deployment --description "Lodge Lens web app" | Out-String
Write-Host $deployJson

Write-Host "`nStep 4: Get deployment URL"
clasp list-deployments

$url = Read-Host "`nPaste the Web App URL (ends with /exec)"

$configOut = Join-Path $root 'config\analytics.public.json'
@{
  endpointUrl = $url.Trim()
  writeKey    = $writeKey
  adminKey    = $adminKey
} | ConvertTo-Json | Set-Content $configOut -Encoding utf8

Write-Host "`nSaved $configOut" -ForegroundColor Green
Write-Host "Test POST with:"
Write-Host @"

`$body = @{
  key = '$writeKey'
  lodge_id = 'safari-plains'
  event = 'test'
  label = 'cli'
  session_id = 'test'
  user_agent = 'powershell'
} | ConvertTo-Json
Invoke-RestMethod -Uri '$($url.Trim())' -Method Post -Body `$body -ContentType 'application/json'

"@

Pop-Location
