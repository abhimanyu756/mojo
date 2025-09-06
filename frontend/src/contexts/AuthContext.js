import { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

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
    const token = localStorage.getItem('access_token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await api.get('/api/auth/profile/');
      setUser(response.data);
    } catch (error) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      delete api.defaults.headers.common['Authorization'];
    } finally {
      setLoading(false);
    }
  };

  const login = async (loginIdentifier, password) => {
    try {
      const response = await api.post('/api/auth/login/', {
        login: loginIdentifier, // Backend expects 'login' field
        password
      });
      const { access, refresh, user } = response.data;

      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      api.defaults.headers.common['Authorization'] = `Bearer ${access}`;

      setUser(user);
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.detail ||
        error.response?.data?.message ||
        'Invalid credentials';
      return {
        success: false,
        error: errorMessage
      };
    }
  };

  const register = async (userData) => {
    try {
      // Remove password_confirm if it exists in userData to match backend expectations
      const { password_confirm, ...registrationData } = userData;

      const response = await api.post('/api/auth/register/', {
        ...registrationData,
        password_confirm: password_confirm || registrationData.password
      });

      const { access, refresh, user } = response.data;

      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      api.defaults.headers.common['Authorization'] = `Bearer ${access}`;

      setUser(user);
      return { success: true };
    } catch (error) {
      // Return the entire error object from the backend
      const errorData = error.response?.data || { message: 'An unknown error occurred.' };

      return {
        success: false,
        error: errorData // This sends the full error object
      };
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await api.patch('/api/auth/profile/', profileData);
      setUser(response.data);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || 'Failed to update profile'
      };
    }
  };

  const logout = async () => {
    try {
      // Clear all auth tokens
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');

      // Remove Authorization header
      delete api.defaults.headers.common['Authorization'];

      // Clear user state
      setUser(null);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to logout'
      };
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateProfile,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};