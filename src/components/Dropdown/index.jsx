import React, { useState, useRef, useEffect } from 'react';

const Dropdown = ({ label, onPress }) => {
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
    <div ref={dropdownRef} className="inline-block my-2">
      <button
        onClick={onPressBtn}
        className={`Button ButtonTransBorder Preset NoClose ${
          isOpen
            ? '!bg-[#f4f4fa] dark:!bg-[#1e1e1e] dark:ring-primary !text-ui-bg dark:!text-primary'
            : ''
        }`}
        id={`Button${label.replace(/\s+/g, '')}`}
      >
        {label}
      </button>
    </div>
  );
};

export default Dropdown;
