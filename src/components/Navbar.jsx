import React from 'react';
import { AlignLeft } from 'lucide-react'; // Or any other icon lib

const Navbar = ({ onMenuClick }) => {
  return (
    <nav className="w-full h-16 bg-[#0d0d0d] dark:bg-[#252526] shadow-sm px-4 flex items-center justify-between">
      {/* Left: Hamburger + Logo */}
      <div className="flex items-center space-x-3">
        <button onClick={onMenuClick} className="text-white">
          <AlignLeft size={24} />
        </button>
        <div className="text-xl font-semibold">MyLogo</div>
      </div>

      {/* Right: Nav Items */}
      <div className="flex items-center space-x-6">
        <a href="#" className=" text-[12px] text-white hover:text-blue-600">
          Home
        </a>
        <a href="#" className="text-[12px] text-white hover:text-blue-600">
          About
        </a>
        <a href="#" className=" text-[12px] text-white hover:text-blue-600">
          Services
        </a>
        <a href="#" className=" text-[12px] text-white hover:text-blue-600">
          Contact
        </a>

        <button className="bg-primary px-2 py-1 rounded-sm text-white">New Letters</button>
      </div>
    </nav>
  );
};

export default Navbar;
