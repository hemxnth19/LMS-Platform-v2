import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/useAppDispatch';

interface PrivateRouteProps {
  children: React.ReactNode;
  role: 'admin' | 'employee';
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, role }) => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const token = localStorage.getItem('token');

  // Check if we have a token
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If we have a token but no user data, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check if user's role matches the required role
  if (user.role !== role) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/employee'} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute; 