
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';

// Legacy route - redirect to new admin system
const HotelAdmin = () => {
  const { isLoggedIn } = useAuthStore();
  
  useEffect(() => {
    console.log('HotelAdmin: Redirecting to new admin dashboard');
  }, []);

  if (!isLoggedIn) {
    return <Navigate to="/hotel-owner-login" replace />;
  }

  return <Navigate to="/admin/dashboard" replace />;
};

export default HotelAdmin;
