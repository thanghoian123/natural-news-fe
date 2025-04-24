import React from 'react';

function CustomTextarea({ label, questionLabel, error, isRequired, helperText, ...props }) {
  return (
    <div class="FormGroup">
      <div class="Subhead">
        {label} {isRequired && '*'}
      </div>
      <div class="Text">{questionLabel}</div>
      <div class="FormInput">
        <textarea
          cols=""
          rows="16"
          wrap="virtual"
          name="Journal"
          class={`Focus JournalText ${error && 'Required RequiredError'}`}
          placeholder={error ? error : !isRequired ? 'Leave blank if none' : 'Enter your answer here'}
          {...props}
        ></textarea>
        {helperText && <div class="Disclaimer">{helperText}</div>}
      </div>
    </div>
  );
}

export default CustomTextarea;
