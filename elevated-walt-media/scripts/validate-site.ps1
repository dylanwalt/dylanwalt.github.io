param(
  [int]$Wave = -1,
  [string]$SiteRoot = "$PSScriptRoot\.."
)

$ErrorActionPreference = 'Stop'
$failures = @()
$warnings = @()

function Fail($msg) { $script:failures += $msg }
function Warn($msg) { $script:warnings += $msg }

function Test-BytesContain($bytes, [byte[]]$pattern) {
  if ($bytes.Length -lt $pattern.Length) { return $false }
  for ($i = 0; $i -le $bytes.Length - $pattern.Length; $i++) {
    $match = $true
    for ($j = 0; $j -lt $pattern.Length; $j++) {
      if ($bytes[$i + $j] -ne $pattern[$j]) { $match = $false; break }
    }
    if ($match) { return $true }
  }
  return $false
}

$textExtensions = @('.html', '.css', '.js', '.json', '.md', '.svg', '.gs')
$allFiles = Get-ChildItem -Path $SiteRoot -Recurse -File |
  Where-Object {
    $textExtensions -contains $_.Extension -and
    $_.FullName -notmatch '\\analytics\\apps-script\\' -and
    $_.FullName -notmatch '\\node_modules\\' -and
    $_.FullName -notmatch '\\_tools\\' -and
    $_.Name -ne 'PASSWORDS.local.md'
  }

# UTF-8 byte patterns only (ASCII-safe script file)
$mojibakePatterns = @(
  @{ Label = 'replacement character U+FFFD'; Bytes = [byte[]](0xEF, 0xBF, 0xBD) },
  @{ Label = 'double-encoded UTF-8 (C3 83)'; Bytes = [byte[]](0xC3, 0x83) },
  @{ Label = 'common mojibake prefix (C3 A2 E2 82 AC)'; Bytes = [byte[]](0xC3, 0xA2, 0xE2, 0x82, 0xAC) }
)

$smartPunctPatterns = @(
  @{ Label = 'left single quote U+2018'; Bytes = [byte[]](0xE2, 0x80, 0x98) },
  @{ Label = 'right single quote U+2019'; Bytes = [byte[]](0xE2, 0x80, 0x99) },
  @{ Label = 'left double quote U+201C'; Bytes = [byte[]](0xE2, 0x80, 0x9C) },
  @{ Label = 'right double quote U+201D'; Bytes = [byte[]](0xE2, 0x80, 0x9D) },
  @{ Label = 'em dash U+2014'; Bytes = [byte[]](0xE2, 0x80, 0x94) }
)

function Test-Wave0 {
  Write-Host 'Wave 0: Encoding' -ForegroundColor Cyan

  foreach ($file in $allFiles) {
    $rel = $file.FullName.Replace($SiteRoot, '')
    $bytes = [System.IO.File]::ReadAllBytes($file.FullName)

    if ($bytes.Length -ge 3 -and $bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF) {
      Fail "UTF-8 BOM:$rel"
    }

    foreach ($pattern in $mojibakePatterns) {
      if (Test-BytesContain $bytes $pattern.Bytes) {
        Fail "Mojibake ($($pattern.Label)):$rel"
      }
    }

    if ($file.Extension -in @('.html', '.js')) {
      foreach ($pattern in $smartPunctPatterns) {
        if (Test-BytesContain $bytes $pattern.Bytes) {
          Fail "Smart punctuation ($($pattern.Label)):$rel - use ASCII hyphen and quotes"
        }
      }
    }
  }
}

function Test-Wave1 {
  Write-Host 'Wave 1: Brand and assets' -ForegroundColor Cyan

  $brandLogo = Join-Path $SiteRoot 'assets\brand\elevate-walt-media\logo.png'
  $brandLogo2x = Join-Path $SiteRoot 'assets\brand\elevate-walt-media\logo@2x.png'
  if (-not (Test-Path $brandLogo)) { Fail 'Missing brand logo.png' }
  elseif ((Get-Item $brandLogo).Length -lt 5000) { Fail 'Brand logo.png too small - use high-res source' }
  if (-not (Test-Path $brandLogo2x)) { Warn 'Missing logo@2x.png for retina displays' }

  $indexPath = Join-Path $SiteRoot 'index.html'
  $indexBytes = [System.IO.File]::ReadAllBytes($indexPath)
  $indexText = [System.Text.Encoding]::UTF8.GetString($indexBytes)
  if ($indexText -notmatch 'brand-logo' -and $indexText -notmatch 'elevate-walt-media/logo\.png') {
    Fail 'index.html missing brand logo (img.brand-logo or logo.png)'
  }
  if ($indexText -notmatch 'logo@2x\.png') { Warn 'index.html missing retina srcset for brand logo' }

  $config = Get-Content (Join-Path $SiteRoot 'config\lodges.public.json') -Raw | ConvertFrom-Json
  foreach ($lodge in $config.lodges) {
    if (-not $lodge.logoSourceUrl) { Warn "$($lodge.id): missing logoSourceUrl (official logo URL)" }
    $logoPath = Join-Path $SiteRoot ($lodge.logo.TrimStart('/') -replace '/', '\')
    if (-not (Test-Path $logoPath)) { Fail "$($lodge.id): missing logo at $($lodge.logo)" }
    elseif ((Get-Item $logoPath).Length -lt 200) { Warn "$($lodge.id): logo suspiciously small" }
  }
}

function Test-Wave2 {
  Write-Host 'Wave 2: Pages and paths' -ForegroundColor Cyan

  $config = Get-Content (Join-Path $SiteRoot 'config\lodges.public.json') -Raw | ConvertFrom-Json
  $siteRootNorm = (Resolve-Path $SiteRoot).Path.TrimEnd('\')

  Get-ChildItem -Path $SiteRoot -Filter '*.html' -Recurse |
    Where-Object { $_.FullName -notmatch '\\node_modules\\' } |
    ForEach-Object {
    $html = [System.IO.File]::ReadAllText($_.FullName, [System.Text.UTF8Encoding]::new($false))
    if ($html -notmatch 'charset="utf-8"') { Fail "Missing utf-8 charset: $($_.Name)" }
    $dirNorm = $_.Directory.FullName.TrimEnd('\')
    if ($dirNorm -eq $siteRootNorm -and $html -match 'data-base-path="/elevated-walt-media"') {
      Fail 'Source index.html must use data-base-path="" (export-pages.mjs patches paths at CI export)'
    }
  }

  foreach ($lodge in $config.lodges) {
    $page = Join-Path $SiteRoot "$($lodge.slug)\index.html"
    if (-not (Test-Path $page)) { Fail "Missing page for $($lodge.slug)" }
  }

  $safari = Join-Path $SiteRoot 'safari-plains\index.html'
  if ((Get-Content $safari -Raw) -notmatch 'id="experience"') { Fail 'Safari Plains missing experience section' }
  if ((Get-Content $safari -Raw) -notmatch 'safari-gallery-root') { Fail 'Safari Plains missing media gallery root' }
  if ((Get-Content $safari -Raw) -notmatch 'safari-drone-note') { Fail 'Safari Plains missing drone equipment note' }

  $eventPhotos = Join-Path $SiteRoot 'assets\media\safari-plains\event-photos\event-photos-index.json'
  if (-not (Test-Path $eventPhotos)) { Fail 'Safari Plains missing event-photos index' }
  else {
    try {
      $ep = Get-Content $eventPhotos -Raw | ConvertFrom-Json
      if (-not $ep.photos -or $ep.photos.Count -lt 1) { Fail 'event-photos index has no photos' }
    } catch {
      Fail "Invalid event-photos-index.json: $_"
    }
  }

  $indexHtml = [System.IO.File]::ReadAllText((Join-Path $SiteRoot 'index.html'), [System.Text.UTF8Encoding]::new($false))
  $homeJs = [System.IO.File]::ReadAllText((Join-Path $SiteRoot 'js\home.js'), [System.Text.UTF8Encoding]::new($false))
  if ($homeJs -notmatch 'lodge-tile') { Fail 'js/home.js must render square lodge tiles (lodge-tile class)' }
  if ($indexHtml -notmatch 'experience-loader') { Warn 'index.html missing experience loader splash' }
  if ($indexHtml -notmatch 'cinema-hero') { Warn 'index.html missing cinematic hero section' }
  if ($indexHtml -notmatch 'mobile-gate-init\.js') { Fail 'index.html must load js/mobile-gate-init.js for desktop-only gate' }
  if ($homeJs -notmatch 'enforceDesktopOnly') { Fail 'js/home.js must call enforceDesktopOnly()' }
}

function Test-Wave3 {
  Write-Host 'Wave 3: Config' -ForegroundColor Cyan

  $configPath = Join-Path $SiteRoot 'config\lodges.public.json'
  try {
    $config = Get-Content $configPath -Raw | ConvertFrom-Json
  } catch {
    Fail "Invalid lodges.public.json: $_"
    return
  }

  foreach ($lodge in $config.lodges) {
    if ($lodge.status -eq 'completed' -and -not $lodge.passwordHash) {
      Fail "$($lodge.id): completed lodge needs passwordHash"
    }
    if ($lodge.status -eq 'completed') {
      foreach ($ch in $lodge.chapters) {
        if ($ch.youtubeId -eq 'REPLACE_ME') { Warn "$($lodge.id): $($ch.id) youtubeId not set" }
      }
    }
  }
}

function Test-Wave4 {
  Write-Host 'Wave 4: Copy rules' -ForegroundColor Cyan

  $htmlFiles = Get-ChildItem -Path $SiteRoot -Filter '*.html' -Recurse |
    Where-Object { $_.FullName -notmatch '\\node_modules\\' }
  $combined = ($htmlFiles | ForEach-Object {
    [System.IO.File]::ReadAllText($_.FullName, [System.Text.UTF8Encoding]::new($false))
  }) -join ' '

  $jsFiles = Get-ChildItem -Path (Join-Path $SiteRoot 'js') -Filter '*.js'
  $combined += ($jsFiles | ForEach-Object {
    [System.IO.File]::ReadAllText($_.FullName, [System.Text.UTF8Encoding]::new($false))
  }) -join ' '

  if ($combined -notmatch 'internal review') { Fail 'Missing internal review disclaimer in site copy' }
  if ($combined -notmatch 'internal team') { Fail 'Missing internal team messaging in site copy' }

  $abPatterns = @('A/B test', 'A-B test', 'AB test', 'split test')
  foreach ($pat in $abPatterns) {
    if ($combined -match [regex]::Escape($pat)) { Fail "Remove forbidden copy: $pat" }
  }
}

$waves = @{
  0 = { Test-Wave0 }
  1 = { Test-Wave1 }
  2 = { Test-Wave2 }
  3 = { Test-Wave3 }
  4 = { Test-Wave4 }
}

if ($Wave -ge 0) {
  & $waves[$Wave]
} else {
  foreach ($k in ($waves.Keys | Sort-Object)) { & $waves[$k] }
}

Write-Host ''
if ($warnings.Count) {
  Write-Host "Warnings ($($warnings.Count)):" -ForegroundColor Yellow
  $warnings | ForEach-Object { Write-Host "  ! $_" -ForegroundColor Yellow }
}

if ($failures.Count) {
  Write-Host "FAILED ($($failures.Count)):" -ForegroundColor Red
  $failures | ForEach-Object { Write-Host "  x $_" -ForegroundColor Red }
  exit 1
}

Write-Host 'All validation waves passed.' -ForegroundColor Green
exit 0
