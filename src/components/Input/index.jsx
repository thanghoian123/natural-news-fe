import React from 'react';

function CustomInput({ label, helperText, questionLabel, error, isRequired = false, ...props }) {
  return (
    <div class="FormGroup">
      <div class="Subhead">
        {label} {isRequired && '*'}
      </div>
      <div class="Text">{questionLabel}</div>
      <div class="FormInput">
        <input
          class={`Focus placeholder-[color:var(--InputPlaceholder)] ${error && 'Required RequiredError'}`}
          name="Preferences"
          type="text"
          {...props}
          placeholder={error ? error : !isRequired ? 'Leave blank if none' : 'Enter your answer here'}
        />
      </div>
      {helperText && <div class="Disclaimer">{helperText}</div>}
    </div>
  );
}

export default CustomInput;
