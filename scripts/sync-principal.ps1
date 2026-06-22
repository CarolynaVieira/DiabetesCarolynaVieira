param(
  [switch]$Check
)

$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$sourceRoot = Join-Path $repoRoot "principal"
$assetsSource = Join-Path $sourceRoot "assets"
$assetsTarget = Join-Path $repoRoot "assets"

if (!(Test-Path -LiteralPath $sourceRoot)) {
  throw "Pasta principal nao encontrada: $sourceRoot"
}

$topLevelFiles = @(
  "favicon-search-v2.png",
  "favicon.ico",
  "favicon.png",
  "index.html",
  "site-principal-carolyna-vieira.md",
  "style.css"
)

foreach ($fileName in $topLevelFiles) {
  $source = Join-Path $sourceRoot $fileName
  $target = Join-Path $repoRoot $fileName

  if (Test-Path -LiteralPath $source) {
    Copy-Item -LiteralPath $source -Destination $target -Force
  }
}

if (Test-Path -LiteralPath $assetsSource) {
  if (!(Test-Path -LiteralPath $assetsTarget)) {
    New-Item -ItemType Directory -Path $assetsTarget | Out-Null
  }

  Copy-Item -LiteralPath (Join-Path $assetsSource "*") -Destination $assetsTarget -Recurse -Force
}

if ($Check) {
  $sourceIndex = Get-FileHash -Algorithm SHA256 -LiteralPath (Join-Path $sourceRoot "index.html")
  $targetIndex = Get-FileHash -Algorithm SHA256 -LiteralPath (Join-Path $repoRoot "index.html")

  if ($sourceIndex.Hash -ne $targetIndex.Hash) {
    throw "index.html da raiz nao esta sincronizado com principal/index.html"
  }

  Write-Output "OK: raiz local sincronizada com principal/"
} else {
  Write-Output "Sincronizado: principal/ -> raiz local"
}
