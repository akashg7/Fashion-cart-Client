// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if a token exists in local storage
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); // Set authenticated state based on token presence
  }, []);

  // This is where you add the login function
  const login = (token) => {
    localStorage.setItem('token', token); // Store the token in localStorage
    setIsAuthenticated(true); // Update the authenticated state
  };

  const logout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    setIsAuthenticated(false); // Update the authenticated state
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
