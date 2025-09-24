import React, { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/authService';
import apiService from '../services/apiService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        apiService.setAuthToken(token);
        try {
          const currentUser = await authService.getProfile();
          setUser(currentUser);
        } catch (error) {
          console.error('Failed to fetch user profile, logging out.');
          logout();
        }
      } 
      setLoading(false);
    };
    initializeAuth();
  }, [token]);

  const login = async (email, password) => {
    const data = await authService.login(email, password);
    localStorage.setItem('token', data.token);
    setToken(data.token);
    apiService.setAuthToken(data.token);
    const currentUser = await authService.getProfile();
    setUser(currentUser);
    return currentUser;
  };

  const register = async (userData) => {
    const data = await authService.register(userData);
    localStorage.setItem('token', data.token);
    setToken(data.token);
    apiService.setAuthToken(data.token);
    const currentUser = await authService.getProfile();
    setUser(currentUser);
    return currentUser;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    apiService.setAuthToken(null);
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};