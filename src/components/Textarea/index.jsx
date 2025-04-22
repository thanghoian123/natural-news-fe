import React from 'react';

function CustomTextarea({ label, questionLabel, ...props }) {
  return (
    <div class="FormGroup">
      <div class="Subhead">{label}</div>
      <div class="Text">{questionLabel}</div>
      <div class="FormInput">
        <textarea
          cols=""
          rows="16"
          wrap="virtual"
          name="Journal"
          class="JournalText Focus"
          {...props}
        ></textarea>
      </div>
    </div>
  );
}

export default CustomTextarea;
