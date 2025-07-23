import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const token = localStorage.getItem('ensguard_token');
    const userData = localStorage.getItem('ensguard_user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('ensguard_token');
        localStorage.removeItem('ensguard_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Simulate API call
      if (email === 'admin@example.com' && password === 'password') {
        const userData = {
          id: '1',
          email: 'admin@example.com',
          name: 'Juan Carlos Administrador',
          role: 'Administrador',
          organization: 'Empresa Demo S.L.'
        };
        
        localStorage.setItem('ensguard_token', 'demo-token');
        localStorage.setItem('ensguard_user', JSON.stringify(userData));
        setUser(userData);
        return { success: true };
      }
      
      return { success: false, error: 'Credenciales incorrectas' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Error durante el inicio de sesión' };
    }
  };

  const logout = () => {
    localStorage.removeItem('ensguard_token');
    localStorage.removeItem('ensguard_user');
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};