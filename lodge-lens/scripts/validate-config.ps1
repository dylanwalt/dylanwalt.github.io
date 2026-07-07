param(
  [string]$SiteRoot = "$PSScriptRoot\.."
)

$configPath = Join-Path $SiteRoot "config\lodges.public.json"
$config = Get-Content $configPath -Raw | ConvertFrom-Json
$errors = @()

foreach ($lodge in $config.lodges) {
  if ($lodge.status -eq 'active') {
    if (-not $lodge.passwordHash) { $errors += "$($lodge.id): missing passwordHash" }
    foreach ($ch in $lodge.chapters) {
      if ($ch.youtubeId -eq 'REPLACE_ME') { $errors += "$($lodge.id): chapter $($ch.id) needs youtubeId" }
    }
    if ($lodge.drivePackageUrl -eq 'REPLACE_DRIVE_URL') { $errors += "$($lodge.id): needs drivePackageUrl" }
  }

  $logoPath = Join-Path $SiteRoot ($lodge.logo -replace '^/', '' -replace '/', '\')
  if (-not (Test-Path $logoPath)) { $errors += "$($lodge.id): missing logo at $($lodge.logo)" }

  $pagePath = Join-Path $SiteRoot "$($lodge.slug)\index.html"
  if (-not (Test-Path $pagePath)) { $errors += "$($lodge.id): missing page $pagePath" }
}

$analyticsPath = Join-Path $SiteRoot "config\analytics.public.json"
if (-not (Test-Path $analyticsPath)) {
  Write-Warning "config/analytics.public.json not found (copy from analytics.public.example.json after setup)"
}

if ($errors.Count) {
  Write-Host "Validation issues ($($errors.Count)):" -ForegroundColor Yellow
  $errors | ForEach-Object { Write-Host "  - $_" -ForegroundColor Yellow }
  exit 1
}

Write-Host "Validation passed." -ForegroundColor Green
