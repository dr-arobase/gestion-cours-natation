import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaSwimmer, FaLock } from 'react-icons/fa';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    let result;
    if (isRegister) {
      result = await signup(email, password, firstName, lastName);
    } else {
      result = await login(email, password);
    }

    if (!result.success) {
      setError(result.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    navigate('/');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <FaSwimmer className="login-icon" />
          <h1>Gestion Cours Natation</h1>
          <p>Swimming & Lifeguard Management</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}
          
          {isRegister && (
            <>
              <div className="form-group">
                <label htmlFor="firstName">Prénom</label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required={isRegister}
                  placeholder="Prénom"
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Nom</label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required={isRegister}
                  placeholder="Nom"
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="votre@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe / Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            <FaLock />
            {loading ? (isRegister ? 'Inscription...' : 'Connexion...') : (isRegister ? 'S\'inscrire' : 'Se connecter / Login')}
          </button>
        </form>

        <div style={{ marginTop: 12, textAlign: 'center' }}>
          <button type="button" className="link-button" onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? 'Vous avez déjà un compte ? Se connecter' : "Pas de compte ? S'inscrire"}
          </button>
        </div>

        <div className="login-footer">
          <p>Demo Credentials:</p>
          <p><small>admin@example.com / admin123</small></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
