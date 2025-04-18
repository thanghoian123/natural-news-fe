import React from 'react';

const Drawer = ({ isOpen, onClose, children }) => {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close button */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-black">
            ✕
          </button>
        </div>

        {/* Drawer content */}
        <div className="p-4">{children}</div>
      </div>
    </>
  );
};

export default Drawer;
