import React from 'react';

const Drawer = ({ isOpen, onClose, children }) => {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-[black] z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-80' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer Panel - now from LEFT */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-[#252526] text-gray-900 dark:text-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-hidden={!isOpen}
      >
        {/* Header */}
        {/* <div className="p-4 flex justify-between items-center">
          <button
            onClick={onClose}
            className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
          >
            ✕
          </button>
        </div> */}

        {/* Drawer Content */}
        <div className="p-4 overflow-y-auto h-full">{children}</div>
      </div>
    </>
  );
};

export default Drawer;
