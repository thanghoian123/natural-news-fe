import React from 'react';
import { Outlet } from 'react-router-dom';
import Layout from './index';
const ProtectedLayout = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default ProtectedLayout;
