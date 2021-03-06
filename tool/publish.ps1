#!/usr/bin/env pwsh
Set-StrictMode -Version Latest
Set-Location (Split-Path $PSScriptRoot)

tool/dist.ps1

$version = (Get-Content haxelib.json | ConvertFrom-Json).version
git tag "v$version"
git push origin "v$version"
