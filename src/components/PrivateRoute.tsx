import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute: React.FC = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!user && !loading) {
      localStorage.setItem('intendedPath', location.pathname);
    }
  }, [user, loading, location]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;