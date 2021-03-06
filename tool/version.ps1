#!/usr/bin/env pwsh
Set-StrictMode -Version Latest
Set-Location (Split-Path $PSScriptRoot)

function Update-File {
	param (
		[Parameter(Mandatory = $true, Position = 0)] [String] $file,
		[Parameter(Mandatory = $true, Position = 1)] [String] $pattern,
		[Parameter(Mandatory = $true, Position = 2)] [String] $replacement
	)

	(Get-Content $file) -replace $pattern, $replacement | Out-File $file
}

$version = (Get-Content haxelib.json | ConvertFrom-Json).version
Update-File package.json '"version": "\d+(\.\d+){2}"' """version"": ""$version"""
Update-File README.md "action/v\d+(\.\d+){2}" "action/v$version"
Update-File docs/README.md "action/v\d+(\.\d+){2}" "action/v$version"
