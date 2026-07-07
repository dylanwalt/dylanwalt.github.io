# Fetch lodge logos from official websites (favicon / og:image fallbacks)
param(
  [string]$ConfigPath = "$PSScriptRoot\..\config\lodges.public.json",
  [string]$AssetsRoot = "$PSScriptRoot\..\assets\lodges"
)

$config = Get-Content $ConfigPath -Raw | ConvertFrom-Json

foreach ($lodge in $config.lodges) {
  $outDir = Join-Path $AssetsRoot $lodge.id
  New-Item -ItemType Directory -Force -Path $outDir | Out-Null

  $domain = ([uri]$lodge.website).Host
  $logoPath = Join-Path $outDir "logo.png"
  $tilePath = Join-Path $outDir "tile.webp"

  Write-Host "Fetching logo for $($lodge.name) ($domain)..."

  $fetched = $false

  # Try Google high-res favicon
  $faviconUrl = "https://www.google.com/s2/favicons?domain=$domain&sz=128"
  try {
    Invoke-WebRequest -Uri $faviconUrl -OutFile $logoPath -UseBasicParsing -TimeoutSec 20
    if ((Get-Item $logoPath).Length -gt 200) { $fetched = $true }
  } catch {
    Write-Warning "  Favicon failed: $_"
  }

  # Try clearbit (may 404 — harmless)
  if (-not $fetched) {
    try {
      $clearbit = "https://logo.clearbit.com/$domain"
      Invoke-WebRequest -Uri $clearbit -OutFile $logoPath -UseBasicParsing -TimeoutSec 15
      if ((Get-Item $logoPath).Length -gt 500) { $fetched = $true }
    } catch { }
  }

  if (-not $fetched) {
    Write-Warning "  Could not fetch logo for $($lodge.id). Add manually to $logoPath"
  } else {
    Write-Host "  Saved $logoPath"
  }

  # Tile placeholder: copy logo if exists, else skip (CSS gradient shows)
  if (Test-Path $logoPath) {
    Copy-Item $logoPath $tilePath -Force -ErrorAction SilentlyContinue
  }
}

Write-Host "Done. Re-run after adding manual logos for any failures."
