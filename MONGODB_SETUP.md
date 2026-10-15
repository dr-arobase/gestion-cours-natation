# ⚠️ MongoDB n'est pas installé

## Options pour démarrer l'application:

### Option 1: Installer MongoDB localement (Recommandé pour développement)

#### Windows:
1. Télécharger MongoDB Community Server: https://www.mongodb.com/try/download/community
2. Installer MongoDB
3. Démarrer MongoDB:
```powershell
# Créer le dossier de données
mkdir C:\data\db

# Démarrer MongoDB
mongod
```

4. Créer l'admin:
```powershell
cd backend
npm run create-admin
```

### Option 2: Utiliser MongoDB Atlas (Cloud - Gratuit)

1. Créer un compte sur https://www.mongodb.com/cloud/atlas
2. Créer un cluster gratuit (M0)
3. Obtenir votre connection string
4. Modifier `backend/.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/swimming-management
```

5. Créer l'admin:
```powershell
cd backend
npm run create-admin
```

### Option 3: Utiliser Docker (Si vous avez Docker)

```powershell
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

## 🚀 Après avoir démarré MongoDB:

1. Créer l'utilisateur admin:
```powershell
cd backend
npm run create-admin
```

2. Démarrer les serveurs:
```powershell
# Dans VS Code: Ctrl+Shift+B -> "Start All (Frontend + Backend)"

# Ou manuellement:
# Terminal 1:
cd backend
npm run dev

# Terminal 2:
cd frontend
npm run dev
```

3. Ouvrir http://localhost:5173
4. Se connecter avec:
   - Email: admin@example.com
   - Mot de passe: admin123

## 📝 Note

L'application ne peut pas fonctionner sans MongoDB. Choisissez l'une des options ci-dessus pour continuer.
