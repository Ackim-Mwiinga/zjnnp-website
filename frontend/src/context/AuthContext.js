import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import axios from '../lib/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileError, setProfileError] = useState(null);

  // Get CSRF token from cookies
  const getCsrfToken = () => {
    const csrfToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('csrfToken='))
      ?.split('=')[1];
    return csrfToken;
  };

  // Memoize setCsrfHeader to prevent unnecessary re-renders
  const setCsrfHeader = useCallback(() => {
    const csrfToken = getCsrfToken();
    if (csrfToken) {
      axios.defaults.headers['X-CSRF-Token'] = csrfToken;
    }
  }, []);

  // Memoize updateUser to prevent unnecessary re-renders
  const updateUser = useCallback((userData) => {
    setUser(prev => ({
      ...prev,
      ...userData,
      // If role is being updated, ensure we have the latest role
      ...(userData.role && { role: userData.role })
    }));
  }, []);

  // Memoize checkAuthStatus with proper dependencies
  const checkAuthStatus = useCallback(async () => {
    try {
      const response = await axios.get('api/auth/profile');
      const { user } = response.data;
      
      // Update user in state
      updateUser(user);
      
      // Check if profile is complete (has required fields)
      const isProfileComplete = user?.firstName && user?.lastName && user?.email;
      
      // If profile is incomplete and not already on the complete-profile page, redirect
      if (!isProfileComplete && !window.location.pathname.startsWith('/complete-profile')) {
        window.location.href = '/complete-profile';
        return;
      }
      
      // If profile is complete but user is on the complete-profile page, redirect to dashboard
      if (isProfileComplete && window.location.pathname === '/complete-profile') {
        window.location.href = '/dashboard';
        return;
      }
      
      // If user doesn't have a role and not already on the role selection page
      if (!user.role && !window.location.pathname.startsWith('/select-role')) {
        window.location.href = '/select-role';
        return;
      }
      
      // If user has a role but is on the role selection page, redirect to dashboard
      if (user.role && window.location.pathname === '/select-role') {
        window.location.href = `/dashboard/${user.role}`;
        return;
      }
    } catch (err) {
      // Clear token if auth fails
      localStorage.removeItem('token');
      setUser(null);
      setError(err.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateUser]);

  // Initialize CSRF token and check auth status on mount
  useEffect(() => {
    setCsrfHeader();

    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      checkAuthStatus();
    } else {
      setLoading(false);
    }
  }, [setCsrfHeader, checkAuthStatus]);

  const login = async (email, password) => {
    try {
      const response = await axios.post('api/auth/login', { email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      setCsrfHeader(); // Update CSRF header after successful login
      
      // Always redirect to complete-profile page after login
      // The profile completion check will be handled by the ProtectedRoute
      window.location.href = '/complete-profile';
      
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      return false;
    }
  };

  const register = async (formData) => {
    try {
      const response = await axios.post('api/auth/register', formData);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      // Redirect to profile completion after successful registration
      window.location.href = '/profile';
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      return false;
    }
  };

  const logout = async () => {
    try {
      await axios.post('api/auth/logout');
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
      setError(null);
      setProfileError(null);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const updateAuthorProfile = async (profileData) => {
    try {
      const response = await axios.put('api/auth/author-profile', profileData);
      setUser(response.data.user);
      return true;
    } catch (err) {
      setProfileError(err.response?.data?.message || 'Profile update failed');
      return false;
    }
  };

  const value = useMemo(() => ({
    user,
    loading,
    error,
    profileError,
    setError,
    setProfileError,
    login,
    register,
    logout,
    updateAuthorProfile,
    checkAuthStatus,
    updateUser,
  }), [user, loading, error, profileError, login, register, logout, updateAuthorProfile, checkAuthStatus, updateUser]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
