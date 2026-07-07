param(
  [Parameter(Mandatory = $true)]
  [string]$Password,
  [string]$SiteRoot = "$PSScriptRoot\.."
)

$hashScript = Join-Path $PSScriptRoot 'hash-password.ps1'
$hash = & $hashScript -Password $Password

$htmlFiles = Get-ChildItem -Path $SiteRoot -Filter 'index.html' -Recurse
foreach ($file in $htmlFiles) {
  $content = Get-Content $file.FullName -Raw
  $updated = $content -replace 'data-admin-hash="[^"]*"', "data-admin-hash=`"$hash`""
  if ($updated -ne $content) {
    Set-Content $file.FullName $updated -Encoding utf8
    Write-Host "Updated $($file.FullName)"
  }
}

Write-Host "Admin hash injected."
