import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const ProtectedRoute = () => {
  const { token, loading } = useContext(AuthContext);
  if (loading) {
    return <div>Loading...</div>;
  }

  // If the user is authenticated (token exists), render the requested component.
  // The <Outlet /> component from react-router-dom will render the nested child route.
  // If not authenticated, redirect them to the /login page.
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;