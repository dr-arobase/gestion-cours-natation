# 🚀 Script de Démarrage Rapide
# Swimming & Lifeguard Management Application

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "🏊 Swimming Management Application" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Vérifier si MongoDB est en cours d'exécution
Write-Host "🔍 Vérification de MongoDB..." -ForegroundColor Yellow
$mongoProcess = Get-Process mongod -ErrorAction SilentlyContinue

if ($null -eq $mongoProcess) {
    Write-Host "❌ MongoDB n'est pas en cours d'exécution!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Options:" -ForegroundColor Yellow
    Write-Host "1. Installer MongoDB: https://www.mongodb.com/try/download/community"
    Write-Host "2. Utiliser MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas"
    Write-Host "3. Utiliser Docker: docker run -d -p 27017:27017 mongo"
    Write-Host ""
    Write-Host "Voir MONGODB_SETUP.md pour plus d'instructions" -ForegroundColor Cyan
    Write-Host ""
    
    $response = Read-Host "Voulez-vous continuer sans MongoDB? (o/N)"
    if ($response -ne "o" -and $response -ne "O") {
        exit
    }
} else {
    Write-Host "✅ MongoDB est en cours d'exécution" -ForegroundColor Green
    Write-Host ""
    
    # Créer l'utilisateur admin
    Write-Host "👤 Création de l'utilisateur admin..." -ForegroundColor Yellow
    Set-Location backend
    npm run create-admin
    Set-Location ..
    Write-Host ""
}

Write-Host "🚀 Démarrage de l'application..." -ForegroundColor Yellow
Write-Host ""
Write-Host "📝 Informations de connexion:" -ForegroundColor Cyan
Write-Host "   Frontend: http://localhost:5173" -ForegroundColor White
Write-Host "   Backend:  http://localhost:5000" -ForegroundColor White
Write-Host "   Email:    admin@example.com" -ForegroundColor White
Write-Host "   Password: admin123" -ForegroundColor White
Write-Host ""
Write-Host "💡 Astuce: Utilisez Ctrl+C pour arrêter les serveurs" -ForegroundColor Yellow
Write-Host ""

# Démarrer les serveurs
Write-Host "🔧 Démarrage du backend..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; npm run dev"

Start-Sleep -Seconds 2

Write-Host "🎨 Démarrage du frontend..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend'; npm run dev"

Write-Host ""
Write-Host "✅ Application démarrée!" -ForegroundColor Green
Write-Host "📱 Ouvrez http://localhost:5173 dans votre navigateur" -ForegroundColor Green
Write-Host ""
Write-Host "Appuyez sur une touche pour fermer cette fenêtre..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
