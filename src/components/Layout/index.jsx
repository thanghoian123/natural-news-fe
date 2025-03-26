import React from 'react';
import Sidebar from '../Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="bg-white dark:bg-[#252526] min-h-screen flex flex-col lg:flex-row">
      <Sidebar />
      <main className="flex-1 flex flex-col px-2 md:px-14 items-center">{children}</main>
    </div>
  );
};

export default Layout;
