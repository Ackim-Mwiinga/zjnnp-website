import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ requiredRole, children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If user is not logged in, redirect to login with return url
  if (!user) {
    return <Navigate to={`/sign-in?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  // Check if profile is complete
  const isProfileComplete = user?.firstName && user?.lastName && user?.email;
  
  // If profile is not complete and not already on the complete-profile page, redirect
  if (!isProfileComplete && !location.pathname.startsWith('/complete-profile')) {
    return <Navigate to="/complete-profile" state={{ from: location }} replace />;
  }

  // If user doesn't have a role and not on role selection page, redirect to role selection
  if (!user.role && !location.pathname.startsWith('/select-role')) {
    return <Navigate to="/select-role" state={{ from: location }} replace />;
  }

  // If a specific role is required and user doesn't have it, show unauthorized
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  // If all checks pass, render the child routes
  return children || <Outlet />;
};

export default ProtectedRoute;
