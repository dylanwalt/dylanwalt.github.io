# Fetch official lodge logos from curated source URLs in config
param(
  [string]$ConfigPath = "$PSScriptRoot\..\config\lodges.public.json",
  [string]$AssetsRoot = "$PSScriptRoot\..\assets\lodges"
)

$ErrorActionPreference = 'Stop'
$config = Get-Content $ConfigPath -Raw | ConvertFrom-Json

function Save-Logo($url, $outPath) {
  $dir = Split-Path $outPath -Parent
  New-Item -ItemType Directory -Force -Path $dir | Out-Null

  $headers = @{ 'User-Agent' = 'Mozilla/5.0 (compatible; LodgeLens/1.0)' }
  Invoke-WebRequest -Uri $url -OutFile $outPath -UseBasicParsing -TimeoutSec 45 -Headers $headers

  $size = (Get-Item $outPath).Length
  if ($size -lt 800) {
    throw "Downloaded file too small ($size bytes) from $url"
  }
  return $size
}

foreach ($lodge in $config.lodges) {
  $outDir = Join-Path $AssetsRoot $lodge.id
  $logoPath = Join-Path $outDir 'logo.png'
  $tilePath = Join-Path $outDir 'tile.webp'

  if (-not $lodge.logoSourceUrl) {
    Write-Warning "$($lodge.id): missing logoSourceUrl in config - add an official logo URL"
    continue
  }

  Write-Host "Fetching $($lodge.name)..."
  Write-Host "  $($lodge.logoSourceUrl)"

  try {
    $bytes = Save-Logo $lodge.logoSourceUrl $logoPath
    Write-Host "  Saved logo.png ($bytes bytes)"
    Copy-Item $logoPath $tilePath -Force -ErrorAction SilentlyContinue
  } catch {
    Write-Warning "  Failed for $($lodge.id): $_"
  }
}

Write-Host 'Done. Verify logos visually before deploy.'
