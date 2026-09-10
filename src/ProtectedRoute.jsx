import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = () => {
  const token = Cookies.get('token');

  // Agar token nahi hai, toh wapas Login page par bhej do
  if (!token) {
    return <Navigate to="/Login" replace />;
  }

  // Agar token hai, toh children components (Dashboard, Products etc.) dikhao
  return <Outlet />;
};

export default ProtectedRoute;