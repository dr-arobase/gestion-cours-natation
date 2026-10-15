import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  FaHome, FaSwimmer, FaLifeRing, FaChartBar, FaUser, FaCog, 
  FaMoon, FaSun, FaGlobe, FaSignOutAlt, FaBars, FaTimes 
} from 'react-icons/fa';
import './Navbar.css';

const Navbar = ({ theme, setTheme, language, setLanguage }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  const menuItems = [
    { path: '/', icon: <FaHome />, label: language === 'fr' ? 'Accueil' : 'Home' },
    { path: '/swimming', icon: <FaSwimmer />, label: language === 'fr' ? 'Natation' : 'Swimming' },
    { path: '/lifeguard', icon: <FaLifeRing />, label: language === 'fr' ? 'Sauvetage' : 'Lifeguard' },
    { path: '/statistics', icon: <FaChartBar />, label: language === 'fr' ? 'Statistiques' : 'Statistics' },
    { path: '/account', icon: <FaUser />, label: language === 'fr' ? 'Compte' : 'Account' },
  ];

  if (user?.role === 'admin') {
    menuItems.push({ 
      path: '/admin', 
      icon: <FaCog />, 
      label: language === 'fr' ? 'Admin' : 'Admin' 
    });
  }

  return (
    <nav className={`navbar ${theme}`}>
      <div className="navbar-container">
        <div className="navbar-brand">
          <FaSwimmer className="brand-icon" />
          <span>{language === 'fr' ? 'Gestion Cours' : 'Course Management'}</span>
        </div>

        <button 
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className={`navbar-menu ${mobileMenuOpen ? 'active' : ''}`}>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="navbar-actions">
          <button onClick={toggleTheme} className="icon-button" title="Toggle Theme">
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </button>
          <button onClick={toggleLanguage} className="icon-button" title="Change Language">
            <FaGlobe />
            <span className="lang-text">{language.toUpperCase()}</span>
          </button>
          <button onClick={logout} className="icon-button logout-button" title="Logout">
            <FaSignOutAlt />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
