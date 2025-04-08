import { Settings } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

const RadioDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('option1');
  const dropdownRef = useRef(null);

  const options = [
    {
      value: 'default',
      label: 'Default Model',
      subLabel: 'Uses standard AI reasoning to generate answer',
    },
    {
      value: 'Reasoning Model',
      label: 'Reasoning Model',
      subLabel: 'Uses a human-like `thought process` to generate answer',
    },
  ];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full h-full" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 w-full h-full bg-background-dark border rounded-md shadow-sm hover:border-gray-400 text-white"
      >
        <Settings />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 bg-white dark:bg-background-dark rounded-md shadow-lg min-w-[300px] max-w-[400px] px-4 py-2">
          <form className="flex flex-col space-y-2">
            {options.map((option) => (
              <label
                key={option.value}
                className="flex space-x-2 cursor-pointer whitespace-nowrap items-start"
              >
                <div className="relative mt-2">
                  <input
                    type="radio"
                    name="dropdown"
                    value={option.value}
                    checked={selected === option.value}
                    onChange={() => {
                      setSelected(option.value);
                      setIsOpen(false);
                    }}
                    className={`
                    peer appearance-none w-4 h-4 border-2 rounded-full
                    border-gray-400 checked:border-primary checked:bg-white checked:dark:bg-background-dark
                    focus:outline-none cursor-pointer
                  `}
                  />
                  {/* <div
                    className={`
                    pointer-events-none absolute top-1 left-1 w-2 h-2 rounded-full 
                    bg-primary opacity-0 peer-checked:opacity-100 transition
                  `}
                  /> */}
                </div>
                <div className="flex flex-col">
                  <p
                    className={`${
                      selected === option.value ? 'text-primary' : 'dark:text-white text-text-light'
                    } font-[700] text-md text-wrap`}
                  >
                    {option.label}
                  </p>
                  <span className="text-sm text-wrap">{option.subLabel}</span>
                </div>
              </label>
            ))}
          </form>
        </div>
      )}
    </div>
  );
};

export default RadioDropdown;
