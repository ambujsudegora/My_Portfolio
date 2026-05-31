# Reorganize repository into frontend/ and backend/
# Run this script from the repo root in PowerShell: `.
eorganize_repo.ps1`

$root = Split-Path -Path $MyInvocation.MyCommand.Definition -Parent
Set-Location $root

if (-not (Test-Path frontend)) { New-Item -ItemType Directory frontend | Out-Null }
if (-not (Test-Path backend)) { New-Item -ItemType Directory backend | Out-Null }

# Move netlify (functions) into backend
if (Test-Path netlify) {
  try { git mv netlify backend } catch { Move-Item -Force netlify backend }
}

# List of frontend items to move
$frontItems = @('eslint.config.js','index.html','package.json','README.md','vite.config.js','src','public','.env','netlify.toml')
foreach ($i in $frontItems) {
  if (Test-Path $i) {
    try { git mv $i frontend } catch { Move-Item -Force $i frontend }
  }
}

Write-Output "Move complete. Run 'git status' to review changes."