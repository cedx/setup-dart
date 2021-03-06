#!/usr/bin/env pwsh
Set-StrictMode -Version Latest
Set-Location (Split-Path $PSScriptRoot)

tool/clean.ps1
tool/version.ps1
haxe build.hxml

npm run dist
@("#!/usr/bin/env node") + (Get-Content var/index.js) | Out-File bin/setup_dart.js
if (-not $IsWindows) { chmod +x bin/setup_dart.js }
