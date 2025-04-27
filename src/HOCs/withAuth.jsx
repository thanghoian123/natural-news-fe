import React from 'react';
import { Navigate } from 'react-router-dom';

const withAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const token = localStorage.getItem('token');

    // While checking auth, you can render null or a spinner
    if (token === null) {
      // Assume no token, redirect
      return <Navigate to="/login" replace />;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
