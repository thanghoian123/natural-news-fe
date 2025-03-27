import React from 'react';

const CheckboxGroup = ({
  options,
  selectedValues,
  onChange,
  label = '',
  questionLabel = '',
  helperText = '',
}) => {
  const handleCheckboxChange = (value) => {
    const updatedValues = selectedValues.includes(value)
      ? selectedValues.filter((item) => item !== value) // Remove if checked
      : [...selectedValues, value]; // Add if unchecked

    onChange(updatedValues); // Call parent with updated values
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="font-[700] text-[19px] mb-[10px] dark:text-[#F4F4FA]">{label}</label>
      <label className="font-[400] text-[14px] mb-[10px] text-[#2D2D30] dark:text-[#E5E5EC]">
        {questionLabel}
      </label>
      <div className="grid grid-cols-2 gap-4">
        {options.map((option) => (
          <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              value={option.value}
              checked={selectedValues.includes(option.value)}
              onChange={() => handleCheckboxChange(option.value)}
              className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary"
            />
            <span className="dark:text-[#E5E5EC] text-[14px] font-[300]">{option.label}</span>
          </label>
        ))}
      </div>
      {helperText && (
        <span className="text-[12px] text-[#73737E] dark:text-[#9D9DAB] mt-1">{helperText}</span>
      )}
    </div>
  );
};

export default CheckboxGroup;
