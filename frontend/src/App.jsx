import { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Swimming from './pages/Swimming';
import Lifeguard from './pages/Lifeguard';
import Statistics from './pages/Statistics';
import Account from './pages/Account';
import './App.css';

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="loading">Chargement...</div>;
  }
  
  return user ? children : <Navigate to="/login" />;
}

function AppContent() {
  const { user } = useAuth();
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('fr');

  useEffect(() => {
    // Load preferences from user or localStorage
    const savedTheme = user?.preferences?.theme || localStorage.getItem('theme') || 'light';
    const savedLang = user?.preferences?.language || localStorage.getItem('language') || 'fr';
    setTheme(savedTheme);
    setLanguage(savedLang);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, [user]);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  // Root layout kept inside the component so it has access to user, theme and handlers
  function RootLayout() {
    return (
      <div className="app">
        {user && (
          <Navbar
            theme={theme}
            setTheme={handleThemeChange}
            language={language}
            setLanguage={handleLanguageChange}
          />
        )}
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    );
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        { path: 'login', element: !user ? <Login /> : <Navigate to="/" /> },
        { index: true, element: (
            <PrivateRoute>
              <Dashboard language={language} />
            </PrivateRoute>
          )
        },
        { path: 'swimming', element: (
            <PrivateRoute>
              <Swimming language={language} />
            </PrivateRoute>
          )
        },
        { path: 'lifeguard', element: (
            <PrivateRoute>
              <Lifeguard language={language} />
            </PrivateRoute>
          )
        },
        { path: 'statistics', element: (
            <PrivateRoute>
              <Statistics language={language} />
            </PrivateRoute>
          )
        },
        { path: 'account', element: (
            <PrivateRoute>
              <Account
                language={language}
                theme={theme}
                onThemeChange={handleThemeChange}
                onLanguageChange={handleLanguageChange}
              />
            </PrivateRoute>
          )
        }
      ]
    }
  ]);

  return (
    <RouterProvider
      router={router}
      // Opt into v7 future flags to silence the warnings shown in the console
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    />
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
