
import React, { useState, useEffect } from 'react';
import Login from './components/Login.tsx';
import Dashboard from './components/Dashboard.tsx';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const savedUser = localStorage.getItem('zatochy_user');
    if (savedUser) {
      setUserEmail(savedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = (email) => {
    setUserEmail(email);
    setIsAuthenticated(true);
    localStorage.setItem('zatochy_user', email);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserEmail('');
    localStorage.removeItem('zatochy_user');
  };

  return (
    <div className="min-h-screen transition-all duration-700">
      {!isAuthenticated ? (
        <Login onLoginSuccess={handleLoginSuccess} />
      ) : (
        <Dashboard email={userEmail} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default App;
