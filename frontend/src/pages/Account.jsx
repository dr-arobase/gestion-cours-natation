import React from 'react';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaKey, FaPalette, FaGlobe } from 'react-icons/fa';
import './Account.css';

const Account = ({ language, theme, onThemeChange, onLanguageChange }) => {
  const { user } = useAuth();

  const text = language === 'fr' ? {
    title: 'Mon Compte',
    profile: 'Profil',
    preferences: 'Préférences',
    security: 'Sécurité',
    name: 'Nom',
    email: 'Email',
    role: 'Rôle',
    theme: 'Thème',
    language: 'Langue',
    changePassword: 'Changer mot de passe'
  } : {
    title: 'My Account',
    profile: 'Profile',
    preferences: 'Preferences',
    security: 'Security',
    name: 'Name',
    email: 'Email',
    role: 'Role',
    theme: 'Theme',
    language: 'Language',
    changePassword: 'Change Password'
  };

  return (
    <div className="account-page">
      <h1>{text.title}</h1>
      
      <div className="account-grid">
        <div className="account-card">
          <h2><FaUser /> {text.profile}</h2>
          <div className="info-group">
            <label>{text.name}:</label>
            <p>{user?.firstName} {user?.lastName}</p>
          </div>
          <div className="info-group">
            <label>{text.email}:</label>
            <p>{user?.email}</p>
          </div>
          <div className="info-group">
            <label>{text.role}:</label>
            <p className="badge">{user?.role}</p>
          </div>
        </div>

        <div className="account-card">
          <h2><FaPalette /> {text.preferences}</h2>
          <div className="info-group">
            <label>{text.theme}:</label>
            <select value={theme} onChange={(e) => onThemeChange(e.target.value)}>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <div className="info-group">
            <label>{text.language}:</label>
            <select value={language} onChange={(e) => onLanguageChange(e.target.value)}>
              <option value="fr">Français</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>

        <div className="account-card">
          <h2><FaKey /> {text.security}</h2>
          <button className="btn btn-primary">
            {text.changePassword}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
