import React, { useState, useEffect } from 'react';
import './App.css';
import { Outlet, Navigate } from 'react-router-dom'; 
import Login from './components/Login/login';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const authStatus = !!token;
      setIsAuthenticated(authStatus);
      console.log('Token:', token);
      console.log('Is Authenticated:', authStatus);
    };

    checkAuth();
    window.addEventListener('storage', checkAuth); 

    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <>
      <Outlet /> 
    </>
  );
};

export default App;
export { ProtectedRoute };