import React from 'react';

const CheckboxGroup = React.forwardRef(
  (
    {
      options,
      selectedValues,
      onChange,
      label = '',
      questionLabel = '',
      error,
      isRequired,
      ...props
    },
    ref
  ) => {
    const handleCheckboxChange = (value) => {
      const updatedValues = selectedValues.includes(value)
        ? selectedValues.filter((item) => item !== value)
        : [...selectedValues, value];

      onChange(updatedValues);
    };

    return (
      <div className="FormGroup" ref={ref}>
        <div className="Subhead">
          {' '}
          {label} {isRequired && '*'}
        </div>
        <div className={`Text ${error && 'RequiredText ChooseError'}`}>{questionLabel}</div>
        <div className="FormOptionsTable">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-1">
            {options.map((option) => (
              <div className="FormCheckbox" key={option.value}>
                <label>
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={selectedValues.includes(option.value)}
                    onChange={() => handleCheckboxChange(option.value)}
                    {...props}
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
  }
);

export default CheckboxGroup;
