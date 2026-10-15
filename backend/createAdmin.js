import dotenv from 'dotenv';
import User from './src/models/User.js';

dotenv.config();

const createAdminUser = async () => {
  try {
    const existingAdmin = await User.findOne({ email: 'admin@example.com' });
    if (existingAdmin) {
      console.log('ℹ️  L\'utilisateur admin existe déjà');
      process.exit(0);
    }

    const admin = new User({
      email: 'admin@example.com',
      password: 'admin123',
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
      permissions: {
        canManageSwimmers: true,
        canManageLifeguards: true,
        canViewStats: true,
        canManageUsers: true,
        canExportData: true,
        canManageSettings: true
      }
    });

    await admin.save();
    console.log('✅ Utilisateur admin créé avec succès!');
    console.log('📧 Email: admin@example.com');
    console.log('🔑 Mot de passe: admin123');
    console.log('⚠️  Pensez à changer le mot de passe en production!');

  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    process.exit(0);
  }
};

createAdminUser();
