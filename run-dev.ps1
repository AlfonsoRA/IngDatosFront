# Inicia Angular 15 con proxy hacia el backend (puerto 8080)
$ErrorActionPreference = "Stop"

Set-Location $PSScriptRoot

if (-not (Test-Path "node_modules")) {
    Write-Host "Instalando dependencias (npm install)..." -ForegroundColor Yellow
    npm install
}

Write-Host "Iniciando frontend en http://localhost:4200 (proxy /api -> :8080)..." -ForegroundColor Green
npm start
