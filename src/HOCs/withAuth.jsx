import React from 'react';
import { Navigate } from 'react-router-dom';

const withAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const token = localStorage.getItem('token'); // Replace with actual auth logic

    if (!token) {
      return <Navigate to="/login" replace />;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent; // Properly return the new component
};

export default withAuth;
