param(
  [string]$ConfigPath = "$PSScriptRoot\..\config\lodges.public.json",
  [string]$SiteRoot = "$PSScriptRoot\.."
)

$utf8NoBom = New-Object System.Text.UTF8Encoding $false
$config = Get-Content $ConfigPath -Raw | ConvertFrom-Json
$adminHash = "023ed1285e86978de9570bbebb2871e8e9a4c7ba7596480ba76046e09dbf9460"

$template = @'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{{NAME}} - Lodge Lens</title>
  <link rel="icon" href="../assets/brand/elevate-walt-media/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="../assets/css/main.css">
</head>
<body data-base-path=".." data-lodge-slug="{{SLUG}}" data-admin-hash="{{ADMIN_HASH}}">
  <header class="site-header">
    <div class="container inner">
      <a class="logo-link" href="../" data-admin-trigger aria-label="Elevate Walt Media">
        <img class="brand-logo" src="../assets/brand/elevate-walt-media/logo.svg" alt="Elevate Walt Media" width="220" height="32">
      </a>
    </div>
  </header>
  <main id="main-content"></main>
  <footer class="site-footer">
    <div class="container">
      <p>Preview footage is for internal review only. &copy; Elevate Walt Media</p>
    </div>
  </footer>
  <script type="module" src="../js/lodge.js"></script>
</body>
</html>
'@

foreach ($lodge in $config.lodges) {
  if ($lodge.slug -eq 'safari-plains') { continue }
  $dir = Join-Path $SiteRoot $lodge.slug
  New-Item -ItemType Directory -Force -Path $dir | Out-Null
  $html = $template.Replace('{{NAME}}', $lodge.name).Replace('{{SLUG}}', $lodge.slug).Replace('{{ADMIN_HASH}}', $adminHash)
  [System.IO.File]::WriteAllText((Join-Path $dir 'index.html'), $html, $utf8NoBom)
  Write-Host "Generated $($lodge.slug)"
}

Write-Host "Done."
