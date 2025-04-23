import React, { useState, useRef, useEffect } from 'react';

const Dropdown = ({ options = [], onSelect, label, onPress }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const onPressBtn = () => {
    onPress();
    setIsOpen(!isOpen);
  };

  return (
    <div ref={dropdownRef} className=" inline-block my-2  ">
      <button
        onClick={onPressBtn}
        className={`Button ButtonTransBorder Preset NoClose px-4 py-2 rounded focus:outline-none ${
          isOpen ? 'ring-2 ring-ui-bg  dark:ring-primary !text-ui-bg dark:!text-primary' : ''
        } `}
        id={`Button${label.replace(/\s+/g, '')}`}
      >
        {label}
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-2 w-48 bg-white border border-gray-200 dark:border-[#3E3E42] rounded shadow-lg Dropdown z-2 dark:bg-[#1e1e1e]">
          <div className="DropdownPanel NoClose">
            <div className="PresetGroup">
              {options.map((option, index) => (
                <div
                  key={index}
                  className="PresetOption px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    onSelect(option);
                    setIsOpen(false);
                  }}
                >
                  {option.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
