import React from 'react';

function CustomInput({ label, helperText, questionLabel, ...props }) {
  return (
    <div class="FormGroup">
      <div class="Subhead">{label}</div>
      <div class="Text">{questionLabel}</div>
      <div class="FormInput">
        <input class="Focus" name="Preferences" type="text" {...props} />
      </div>
      {helperText && <div class="Disclaimer">{helperText}</div>}
    </div>
  );
}

export default CustomInput;
