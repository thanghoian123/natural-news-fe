import React from 'react';

function CustomInput({ label, helperText, questionLabel, error, ...props }) {
  console.log('CustomInput', error);
  return (
    <div class="FormGroup">
      <div class="Subhead">{label}</div>
      <div class="Text">{questionLabel}</div>
      <div class="FormInput">
        <input
          class={`Focus ${error && 'Required RequiredError'}`}
          name="Preferences"
          type="text"
          {...props}
          placeholder={error}
        />
      </div>
      {helperText && <div class="Disclaimer">{helperText}</div>}
    </div>
  );
}

export default CustomInput;
