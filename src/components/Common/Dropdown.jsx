import React, { useState } from 'react';

const Dropdown = React.forwardRef(
  ({ options, helperText,onSelect, label, questionLabel, error, isRequired, ...props }, ref) => {
    const [selectedValue, setSelectedValue] = useState('');

    const handleSelect = (event) => {
      const value = event.target.value;
      setSelectedValue(value);
      onSelect(value);
    };

    return (
      <div className="FormGroup">
        <div className="Subhead">
          {label} {isRequired && '*'}
        </div>
        <div className="Text">{questionLabel}</div>
        <div className="FormSelect">
          <select
            ref={ref}
            name="Length"
            className={`Required Focus ${error && 'RequiredError'}`}
            value={selectedValue}
            onChange={handleSelect}
            {...props}
          >
            {options.map((option, index) => (
              <option key={index} value={index === 0 ? '' : option} disabled={index === 0}>
                {option}
              </option>
            ))}
          </select>
          <div className="Icon">
            <span className="Mask MaskDown" />
          </div>
        </div>
        {helperText && <div class="Disclaimer">{helperText}</div>}
      </div>
    );
  }
);

export default Dropdown;
