import React from 'react';
import Sidebar from '../Sidebar';
const Layout = ({ children }) => {
  return (
    <div>
      <div className="PageOpen" id="Page">
        {children}
      </div>
      <Sidebar />
    </div>
  );
};

export default Layout;
