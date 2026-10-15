# 🏊‍♂️ Swimming & Lifeguard Management System

> **Application web professionnelle complète pour la gestion de cours de natation et de sauvetage**

[![React](https://img.shields.io/badge/React-19.2.0-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 📸 Aperçu

Cette application offre une solution complète de gestion pour :
- 🏊 Cours de natation (tous niveaux)
- 🛟 Formations de sauvetage (Bronze, Médaille, Croix)
- 📊 Statistiques et rapports détaillés
- 👥 Gestion multi-utilisateurs avec permissions

---

## ✨ Fonctionnalités Principales

### 🎯 Pour les Moniteurs
- ✅ Suivi des présences en temps réel
- ✅ Évaluation des compétences
- ✅ Attribution de niveaux et diplômes
- ✅ Accès à l'historique complet de chaque élève

### 📊 Statistiques Avancées
- 📈 Graphiques de progression interactifs
- 📉 Taux d'assiduité par groupe
- 🏆 Taux de réussite par niveau
- 👨‍🏫 Performance par moniteur

### 🎨 Expérience Utilisateur
- 🌓 Thème clair / sombre
- 🌍 Multilingue (Français / English)
- 📱 Design responsive (mobile-first)
- ⚡ Navigation rapide et intuitive

### 🔐 Sécurité
- 🛡️ Authentification JWT
- 🔒 Gestion des rôles (Admin, Moniteur, Superviseur)
- 🔑 Permissions granulaires
- 💾 Chiffrement des mots de passe

---

## 🚀 Démarrage Rapide

### 📋 Prérequis

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) (local ou Atlas)
- npm ou yarn

### ⚡ Installation Express

```powershell
# 1. Cloner / Télécharger le projet

# 2. Installer MongoDB
# Voir MONGODB_SETUP.md pour les instructions détaillées

# 3. Démarrer MongoDB
mongod

# 4. Installer les dépendances
cd backend
npm install

cd ../frontend
npm install

# 5. Créer l'utilisateur admin
cd backend
npm run create-admin

# 6. Démarrer l'application (2 options)

## Option A: Script PowerShell (Windows)
.\start.ps1

## Option B: VS Code Tasks
# Ctrl+Shift+B -> "Start All (Frontend + Backend)"

## Option C: Manuellement
# Terminal 1:
cd backend && npm run dev

# Terminal 2:
cd frontend && npm run dev
```

### 🌐 Accès

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api

### 🔑 Connexion

```
Email:    admin@example.com
Password: admin123
```

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [README.md](README.md) | Documentation complète |
| [QUICK_START.md](QUICK_START.md) | Guide de démarrage rapide |
| [MONGODB_SETUP.md](MONGODB_SETUP.md) | Installation MongoDB |
| [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) | Résumé détaillé du projet |

---

## 🏗️ Architecture

```
├── 🎨 Frontend (React + Vite)
│   ├── Pages: Dashboard, Swimming, Lifeguard, Statistics, Account
│   ├── Components: Navbar, Forms, Tables
│   ├── Context: Authentication
│   ├── Services: API Client (Axios)
│   └── Utils: Translations, Theme
│
├── ⚙️ Backend (Node.js + Express)
│   ├── Models: User, Swimmer, Lifeguard, Group, Equipment
│   ├── Routes: /users, /swimming, /lifeguard, /stats, /admin
│   ├── Middleware: Authentication, Authorization
│   └── Controllers: Business Logic
│
└── 💾 Database (MongoDB)
    ├── Collections: users, swimmers, lifeguards, groups, equipment
    └── Indexes: Performance optimization
```

---

## 🛠️ Technologies

### Backend
| Tech | Usage |
|------|-------|
| ![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white) | Runtime JavaScript |
| ![Express](https://img.shields.io/badge/-Express-000000?logo=express&logoColor=white) | Framework web |
| ![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?logo=mongodb&logoColor=white) | Base de données |
| ![JWT](https://img.shields.io/badge/-JWT-000000?logo=json-web-tokens&logoColor=white) | Authentification |

### Frontend
| Tech | Usage |
|------|-------|
| ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=black) | Framework UI |
| ![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white) | Build tool |
| ![Chart.js](https://img.shields.io/badge/-Chart.js-FF6384?logo=chart.js&logoColor=white) | Graphiques |
| ![Axios](https://img.shields.io/badge/-Axios-5A29E4?logo=axios&logoColor=white) | HTTP client |

---

## 📦 Modules Disponibles

### 🏊 Module Natation
```
✓ Gestion des groupes        ✓ Suivi des présences
✓ Gestion des nageurs         ✓ Évaluation des compétences
✓ Horaires flexibles          ✓ Attribution de niveaux
✓ Export PDF/CSV              ✓ Historique complet
```

### 🛟 Module Sauvetage
```
✓ Gestion des sauveteurs      ✓ Inscription aux tests
✓ Notes d'examen              ✓ Certifications
✓ Calendrier des tests        ✓ Gestion du matériel
✓ Suivi des retards           ✓ Formulaires de consentement
```

### 📊 Module Statistiques
```
✓ Graphiques interactifs      ✓ Taux d'assiduité
✓ Taux de réussite            ✓ Performance moniteurs
✓ Export des rapports         ✓ Historiques détaillés
```

---

## 🎨 Captures d'écran

### 🖥️ Dashboard
> Vue d'ensemble avec statistiques en temps réel

### 🏊 Gestion Nageurs
> Interface intuitive pour gérer tous les aspects des cours

### 📊 Statistiques
> Graphiques et rapports détaillés

### 🌓 Thèmes
> Mode clair et sombre disponibles

---

## 🔧 Configuration

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/swimming-management
JWT_SECRET=votre_secret_securise
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 📱 Responsive Design

L'application est entièrement responsive :
- 📱 Mobile (< 600px)
- 📱 Tablette (600px - 968px)
- 🖥️ Desktop (> 968px)

---

## 🌍 Internationalisation

Langues supportées :
- 🇫🇷 Français (par défaut)
- 🇬🇧 English

Ajoutez facilement de nouvelles langues dans `frontend/src/utils/translations.js`

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créez votre branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

---

## 📝 Roadmap

- [x] Authentification complète
- [x] Gestion des nageurs
- [x] Gestion des sauveteurs
- [x] Statistiques avancées
- [x] Export PDF/CSV
- [ ] Notifications par email
- [ ] Application mobile (React Native)
- [ ] Intégration calendrier
- [ ] Paiements en ligne

---

## 🐛 Rapporter un Bug

Trouvé un bug ? [Créez une issue](https://github.com/votre-repo/issues) avec :
- Description du problème
- Étapes pour reproduire
- Comportement attendu vs actuel
- Captures d'écran si possible

---

## 💡 Support

Besoin d'aide ?
- 📖 Consultez la [documentation](README.md)
- 🚀 Lisez le [guide de démarrage](QUICK_START.md)
- 🗄️ Vérifiez [MongoDB Setup](MONGODB_SETUP.md)

---

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 👏 Remerciements

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Chart.js](https://www.chartjs.org/)
- [React Icons](https://react-icons.github.io/react-icons/)

---

## 📊 Statistiques du Projet

```
Lignes de code:     ~5,000+
Fichiers:           50+
Composants React:   10+
Routes API:         30+
Tests:              En cours
```

---

<div align="center">

### ⭐ Si vous aimez ce projet, donnez-lui une étoile !

**Développé avec ❤️ pour la communauté aquatique**

[🏊 Demo](#) • [📚 Docs](README.md) • [🐛 Issues](#) • [💬 Discussions](#)

</div>
