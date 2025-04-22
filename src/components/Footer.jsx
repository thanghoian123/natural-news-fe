import React from 'react';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full bg-gray-100 dark:bg-[#1e1e1e] text-gray-700 dark:text-gray-300 text-[12px] font-[300] py-5 px-6 shadow-inner z-50">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center flex-wrap">
        {/* Left side links */}
        <div className="flex flex-wrap gap-4">
          <a href="#" className="hover:underline">
            About
          </a>
          <a href="#" className="hover:underline">
            Enoch
          </a>
          <a href="#" className="hover:underline">
            Contact Us
          </a>
          <a href="#" className="hover:underline">
            Notice
          </a>
          <a href="#" className="hover:underline">
            License Information
          </a>
        </div>

        {/* Right side links */}
        <div className="flex flex-wrap gap-4 mt-2 md:mt-0">
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Credits
          </a>
          <a href="#" className="hover:underline">
            © {new Date().getFullYear()}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
