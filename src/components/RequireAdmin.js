import React from 'react';
import { Navigate } from 'react-router-dom';

const RequireAdmin = ({ children }) => {
  const profile = JSON.parse(localStorage.getItem('profile'));

  if (!profile?.is_admin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireAdmin;
