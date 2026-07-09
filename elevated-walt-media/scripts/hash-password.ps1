param(
  [Parameter(Mandatory = $true)]
  [string]$Password
)

$bytes = [System.Text.Encoding]::UTF8.GetBytes($Password)
$hash = [System.Security.Cryptography.SHA256]::Create().ComputeHash($bytes)
$hex = ($hash | ForEach-Object { $_.ToString("x2") }) -join ""
Write-Output $hex
