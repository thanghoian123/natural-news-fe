import React from 'react';
import { Outlet } from 'react-router-dom';
import NormalLayout from './NormalLayout';
const UnProtectLayout = () => {
  return (
    <NormalLayout>
      <Outlet />
    </NormalLayout>
  );
};

export default UnProtectLayout;
