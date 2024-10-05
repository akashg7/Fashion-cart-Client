// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuth(); // Use the authentication context

  return isAuthenticated ? element : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
