import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swimmingRoutes from './routes/swimming.js';
import lifeguardRoutes from './routes/lifeguard.js';
import userRoutes from './routes/user.js';
import statsRoutes from './routes/stats.js';
import adminRoutes from './routes/admin.js';
import User from './models/User.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In development allow localhost connect-src (helps DevTools and Vite integrations)
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    // Allow connections to local frontend/backend/devtools during development only
    res.setHeader('Content-Security-Policy', "default-src 'self'; connect-src 'self' http://localhost:5173 http://localhost:5000 ws://localhost:5173 ws://localhost:5000; script-src 'self' 'unsafe-inline' 'unsafe-eval'");
    next();
  });
}

// Routes
app.use('/api/swimming', swimmingRoutes);
app.use('/api/lifeguard', lifeguardRoutes);
app.use('/api/users', userRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/admin', adminRoutes);

// Root — redirect to frontend dev server to avoid "Cannot GET /" when visiting backend root
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
app.get('/', (req, res) => {
  return res.redirect(FRONTEND_URL);
});

// Respond to DevTools request to avoid 404 spam in console
app.get('/.well-known/appspecific/com.chrome.devtools.json', (req, res) => {
  return res.json({ name: 'devtools-placeholder' });
});

import db from './db.js'

let mongoMemoryServer = null

const ensureAdminUser = async () => {
  try {
    const existing = await User.findOne({ email: 'admin@example.com' });
    if (existing) {
      console.log('ℹ️  Admin déjà présent dans la base.');
      return;
    }

    const hashed = await bcrypt.hash('admin123', 10);
    const admin = new User({
      email: 'admin@example.com',
      password: hashed,
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
      permissions: {
        canManageSwimmers: true,
        canManageLifeguards: true,
        canViewStats: true,
        canManageUsers: true,
        canExportData: true,
        canManageSettings: true,
      },
    });

    await admin.save();
    console.log('✅ Utilisateur admin créé automatiquement (admin@example.com / admin123)');
  } catch (err) {
    console.error('Erreur lors de la vérification/création de l\'admin:', err.message);
  }
};

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  });
};

const connectToDatabase = async () => {
  // lowdb initialization already happens in src/db.js; just ensure it's loaded
  await db.read()
  db.data ||= { users: [], swimmers: [], groups: [], lifeguards: [], equipment: [] }
  await db.write()
  await ensureAdminUser()
  startServer()
}

// Graceful shutdown: flush lowdb (no special cleanup required)
const cleanup = async () => {
  try {
    await db.write()
    console.log('🧹 Cleanup complete')
  } catch (err) {
    console.warn('Erreur lors du cleanup:', err.message);
  }
};

process.on('SIGINT', async () => { await cleanup(); process.exit(0); });
process.on('SIGTERM', async () => { await cleanup(); process.exit(0); });

// Start
connectToDatabase();

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Une erreur est survenue', 
    error: process.env.NODE_ENV === 'development' ? err.message : {} 
  });
});

export default app;
