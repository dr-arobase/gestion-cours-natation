# 🚀 Guide de Démarrage Rapide

## Installation Initiale

### 1. Installer MongoDB
Assurez-vous que MongoDB est installé et en cours d'exécution sur votre machine.

Pour Windows:
```powershell
# Télécharger MongoDB Community Server depuis mongodb.com
# Ou utiliser Chocolatey
choco install mongodb
```

Démarrer MongoDB:
```powershell
mongod
```

### 2. Installer les dépendances (déjà fait)
```powershell
cd backend
npm install

cd ../frontend
npm install
```

### 3. Créer l'utilisateur admin
```powershell
cd backend
npm run create-admin
```

Cela créera un utilisateur admin avec :
- Email: `admin@example.com`
- Mot de passe: `admin123`

## 🎯 Démarrage de l'Application

### Option 1: Utiliser VS Code Tasks (Recommandé)
1. Ouvrir VS Code
2. Appuyer sur `Ctrl+Shift+B` ou aller dans Terminal > Run Build Task
3. Sélectionner "Start All (Frontend + Backend)"

### Option 2: Terminaux séparés

Terminal 1 (Backend):
```powershell
cd backend
npm run dev
```

Terminal 2 (Frontend):
```powershell
cd frontend
npm run dev
```

## 📱 Accès à l'Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api

## 🔐 Connexion

Utilisez les identifiants de l'admin créé:
- Email: `admin@example.com`
- Mot de passe: `admin123`

## 🧪 Test de l'API

Vous pouvez tester l'API avec des outils comme Postman ou curl:

```powershell
# Test de connexion
curl -X POST http://localhost:5000/api/users/login `
  -H "Content-Type: application/json" `
  -d '{"email":"admin@example.com","password":"admin123"}'
```

## ⚠️ Dépannage

### MongoDB ne démarre pas
```powershell
# Vérifier si MongoDB est en cours d'exécution
Get-Process mongod

# Démarrer MongoDB comme service Windows
net start MongoDB
```

### Port déjà utilisé
Si le port 5000 ou 5173 est déjà utilisé:
- Backend: Modifier `PORT` dans `backend/.env`
- Frontend: Modifier le port dans `frontend/vite.config.js`

### Erreur de connexion MongoDB
Vérifiez `MONGODB_URI` dans `backend/.env`:
```
MONGODB_URI=mongodb://localhost:27017/swimming-management
```

## 📚 Prochaines Étapes

1. Explorez le tableau de bord
2. Créez des groupes de natation
3. Ajoutez des nageurs
4. Consultez les statistiques
5. Personnalisez le thème et la langue

## 🎨 Fonctionnalités Disponibles

✅ Authentification complète
✅ Gestion des nageurs
✅ Gestion des sauveteurs
✅ Statistiques en temps réel
✅ Thèmes clair/sombre
✅ Multilingue (FR/EN)
✅ Export PDF/CSV
✅ Gestion des permissions

Bon développement! 🏊‍♂️🏊‍♀️
