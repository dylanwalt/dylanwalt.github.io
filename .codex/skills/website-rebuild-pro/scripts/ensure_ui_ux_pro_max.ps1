param(
  [string]$RepoUrl = "https://github.com/nextlevelbuilder/ui-ux-pro-max-skill.git",
  [string]$Ref = "main"
)

$ErrorActionPreference = "Stop"

function Resolve-RepoRoot {
  $root = Resolve-Path (Join-Path $PSScriptRoot "../../../../")
  return $root.Path
}

$repoRoot = Resolve-RepoRoot
$vendorDir = Join-Path $repoRoot ".codex/.vendor"
$cloneDir = Join-Path $vendorDir "ui-ux-pro-max-skill"
$destSkillDir = Join-Path $repoRoot ".codex/skills/ui-ux-pro-max"

New-Item -ItemType Directory -Path $vendorDir -Force | Out-Null
New-Item -ItemType Directory -Path (Split-Path $destSkillDir -Parent) -Force | Out-Null

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  throw "git not found. Install git or use the uipro-cli installer method."
}

if (Test-Path (Join-Path $cloneDir ".git")) {
  Write-Host "Updating vendor repo: $cloneDir"
  git -C $cloneDir fetch --all --prune | Out-Null
  git -C $cloneDir checkout $Ref | Out-Null
  git -C $cloneDir pull | Out-Null
} else {
  Write-Host "Cloning vendor repo: $RepoUrl -> $cloneDir"
  git clone $RepoUrl $cloneDir | Out-Null
  git -C $cloneDir checkout $Ref | Out-Null
}

# Build a Codex-local skill folder from the upstream repo's sources.
#
# We intentionally copy from `src/ui-ux-pro-max` (scripts + data) and reuse the SKILL.md content.
# Upstream keeps `.claude/skills/ui-ux-pro-max/{scripts,data}` as pointers; for Codex we vendor real files.

Write-Host "Installing skill to: $destSkillDir"

if (Test-Path $destSkillDir) {
  Remove-Item -Recurse -Force $destSkillDir
}

New-Item -ItemType Directory -Path $destSkillDir -Force | Out-Null
New-Item -ItemType Directory -Path (Join-Path $destSkillDir "scripts") -Force | Out-Null
New-Item -ItemType Directory -Path (Join-Path $destSkillDir "data") -Force | Out-Null

Copy-Item -Force (Join-Path $cloneDir ".claude/skills/ui-ux-pro-max/SKILL.md") (Join-Path $destSkillDir "SKILL.md")
Copy-Item -Recurse -Force (Join-Path $cloneDir "src/ui-ux-pro-max/scripts/*") (Join-Path $destSkillDir "scripts")
Copy-Item -Recurse -Force (Join-Path $cloneDir "src/ui-ux-pro-max/data/*") (Join-Path $destSkillDir "data")

Write-Host "OK: .codex/skills/ui-ux-pro-max installed."
Write-Host "Check: $destSkillDir\\scripts\\search.py"

