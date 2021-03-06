#!/usr/bin/env pwsh
Set-StrictMode -Version Latest
Set-Location (Split-Path $PSScriptRoot)

if (Test-Path docs/api) { Remove-Item docs/api -Force -Recurse }

$version = (Get-Content haxelib.json | ConvertFrom-Json).version
haxe --define doc-gen --xml var/api.xml build.hxml
lix run dox `
	--define description "Set up your GitHub Actions workflow with a specific version of the Dart SDK." `
	--define source-path "https://github.com/cedx/setup-dart/blob/main/src" `
	--define themeColor 0x0175c2 `
	--define version $version `
	--define website "https://cedx.github.io/setup-dart" `
	--input-path var `
	--output-path docs/api `
	--title "Setup Dart Action" `
	--toplevel-package setup_dart

Copy-Item docs/favicon.ico docs/api
