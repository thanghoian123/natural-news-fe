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
    <div class="FormGroup">
      <div class="Subhead">{label}</div>
      <div class="Text">{questionLabel}</div>
      <div class="FormOptionsTable">
        <div class=" grid grid-cols-2 gap-1">
          {options.map((option) => (
            <div class="FormCheckbox">
              <label>
                <input
                  type="checkbox"
                  value={option.value}
                  checked={selectedValues.includes(option.value)}
                  onChange={() => handleCheckboxChange(option.value)}
                />
                {option.label}
                <span></span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CheckboxGroup;
