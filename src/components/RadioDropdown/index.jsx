import { Settings } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

const RadioDropdown = ({ onChange, value }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const options = [
    {
      value: 'default',
      label: 'Default Model',
      subLabel: 'Uses standard AI reasoning to generate answer',
    },
    {
      value: 'reasoning',
      label: 'Reasoning Model',
      subLabel: 'Uses a human-like "thought process" to generate answer',
    },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      setDropUp(spaceBelow < 200 && spaceAbove > spaceBelow);
    }
  }, [isOpen]);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-2 w-full bg-background-dark border rounded-md shadow-sm hover:border-gray-400 text-white flex items-center justify-center"
      >
        <Settings className="w-5 h-5" />
      </button>

      {isOpen && (
        <div
          className={`absolute z-10 ${dropUp ? 'bottom-full mb-2' : 'top-full mt-2'} 
          bg-white dark:bg-background-dark rounded-md shadow-lg min-w-[300px] px-4 py-2`}
        >
          <form className="flex flex-col gap-2">
            {options.map((option) => {
              const isSelected = value === option.value;
              return (
                <div
                  key={option.value}
                  className={`FormRadio ${isSelected ? 'ModelSelected' : ''}`}
                >
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="Model"
                      value={option.value}
                      checked={isSelected}
                      onChange={() => {
                        onChange(option.value);
                        setIsOpen(false);
                      }}
                    />
                    <div className="flex flex-col">
                      <div className="Headline">{option.label}</div>
                      <div className="Text">{option.subLabel}</div>
                    </div>
                    <span className="ml-auto"></span>
                  </label>
                </div>
              );
            })}
          </form>
        </div>
      )}
    </div>
  );
};

export default RadioDropdown;
