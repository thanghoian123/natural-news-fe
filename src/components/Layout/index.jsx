import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';

const Layout = ({ children }) => {
  return (
    <div className="bg-white dark:bg-[#252526] min-h-screen">
      <Navbar />
      <main className="flex-1 flex flex-col items-center">{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
