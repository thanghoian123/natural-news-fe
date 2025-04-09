import { ArrowDown, ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';

const Dropdown = ({ options, onSelect, label }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div className="relative inline-block text-left w-full">
      <div>
        <button
          type="button"
          className="inline-flex justify-between w-full rounded-md border dark:border-[#73737E] dark:text-[#F4F4FA] px-4 py-2 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2  focus:ring-blue-400"
          onClick={toggleDropdown}
        >
          {label}
          {!isOpen ? <ChevronDown /> : <ChevronUp />}
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelect(option)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                role="menuitem"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
