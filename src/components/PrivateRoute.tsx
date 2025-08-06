
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRoles?: ('admin' | 'hotelOwner' | 'staff')[];
}

const PrivateRoute = ({ children, requiredRoles }: PrivateRouteProps) => {
  const { isLoggedIn, user } = useAuthStore();
  const location = useLocation();

  if (!isLoggedIn || !user) {
    return <Navigate to="/hotel-owner-login" state={{ from: location }} replace />;
  }

  if (requiredRoles && !requiredRoles.includes(user.role)) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
