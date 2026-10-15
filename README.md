# 🏊 Application de Gestion de Cours de Natation et Sauvetage

Application web complète pour la gestion de cours de natation et de sauvetage avec toutes les fonctionnalités professionnelles.

## 📋 Fonctionnalités

### 🧭 Menu Principal
- ✅ Accès aux groupes de natation
- 🛟 Accès aux groupes de sauvetage
- 📊 Statistiques et rapports
- 👤 Gestion de compte
- 🎨 Thème clair/sombre
- 🌐 Français/Anglais
- 🔒 Authentification sécurisée

### 🏊 Module Natation
- 📋 Liste des nageurs par groupe
- ➕ Ajouter/Modifier/Supprimer nageurs
- 🕓 Horaire des groupes
- 📌 Présences
- 📝 Évaluation des compétences
- 🎖️ Attribution de niveaux/diplômes
- 📤 Export PDF/CSV
- 📈 Suivi de progression
- 🧑‍🏫 Assignation de moniteurs

### 🛟 Module Sauvetage
- 📋 Liste des participants
- 🔥 Inscription aux tests (Bronze/Médaille/Croix)
- 📝 Notes d'examen pratique/théorique
- 🎓 Validation des réussites
- 📅 Calendrier des tests
- 📦 Gestion du matériel
- 🕵️ Suivi des présences

### 📊 Statistiques
- 📈 Progression des nageurs (graphiques)
- 📉 Taux d'assiduité
- 🧮 Taux de réussite
- 👥 Statistiques par moniteur
- 📂 Exportation des données

### ⚙️ Administration
- 🔐 Gestion des rôles et permissions
- 📂 Sauvegarde/Restauration
- 📤 Export complet
- 📬 Messagerie aux moniteurs
- 🚦 Activation/désactivation de groupes

## 🚀 Installation

### Prérequis
- Node.js (v18 ou supérieur)
- MongoDB (local ou cloud)
- npm ou yarn

### Backend

```powershell
cd backend
npm install
```

Créer un fichier `.env` :
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/swimming-management
JWT_SECRET=votre_secret_jwt_tres_securise
NODE_ENV=development
```

Démarrer le serveur :
```powershell
npm run dev
```

### Frontend

```powershell
cd frontend
npm install
```

Démarrer l'application :
```powershell
npm run dev
```

## 📱 Utilisation

1. Accédez à `http://localhost:5173`
2. Connectez-vous avec les identifiants démo :
   - Email: `admin@example.com`
   - Mot de passe: `admin123`

## 🏗️ Architecture

```
faux-gestion-pour-cafa/
├── backend/
│   ├── src/
│   │   ├── models/       # Modèles MongoDB
│   │   ├── routes/       # Routes API
│   │   ├── controllers/  # Logique métier
│   │   ├── middleware/   # Authentification
│   │   └── server.js     # Point d'entrée
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/   # Composants React
    │   ├── pages/        # Pages principales
    │   ├── context/      # Context API
    │   ├── services/     # API client
    │   ├── utils/        # Traductions
    │   └── App.jsx       # Application principale
    └── package.json
```

## 🛠️ Technologies

### Backend
- Node.js & Express
- MongoDB & Mongoose
- JWT pour l'authentification
- PDFKit pour les exports PDF
- Bcrypt pour le hachage des mots de passe

### Frontend
- React 19
- React Router pour la navigation
- Axios pour les appels API
- Chart.js pour les graphiques
- React Icons
- CSS moderne avec variables CSS

## 🎨 Thèmes

L'application supporte deux thèmes :
- 🌞 Mode Clair
- 🌙 Mode Sombre

## 🌐 Langues

- 🇫🇷 Français
- 🇬🇧 English

## 📝 Licence

MIT

## 👨‍💻 Développement

Pour créer un utilisateur admin :

```javascript
// Dans MongoDB ou via l'API
{
  "email": "admin@example.com",
  "password": "admin123",
  "firstName": "Admin",
  "lastName": "User",
  "role": "admin"
}
```

## 🐛 Dépannage

### Le backend ne démarre pas
- Vérifiez que MongoDB est en cours d'exécution
- Vérifiez les variables d'environnement dans `.env`

### Le frontend ne se connecte pas au backend
- Vérifiez que `VITE_API_URL` dans frontend/.env pointe vers le bon port
- Vérifiez que le backend est démarré

## 📞 Support

Pour toute question ou problème, consultez la documentation ou créez une issue.

---

Développé avec ❤️ pour la gestion de cours aquatiques
