import React from 'react';

function CustomInput({ label, helperText, questionLabel, ...props }) {
  return (
    <div className="flex flex-col">
      <label className="font-[700] text-[19px] mb-[10px] dark:text-[#F4F4FA]">{label}</label>
      <label className="font-[400] text-[14px] mb-[10px] text-[#2D2D30] dark:text-[#E5E5EC]">
        {questionLabel}
      </label>

      <input
        type="text"
        className="border p-2 w-full mt-1 rounded focus:ring-2 focus:ring-blue-400 dark:border-[#73737E] dark:text-[#F4F4FA]"
        {...props}
      />
      {helperText && (
        <span className="text-[12px] text-[#73737E] dark:text-[#9D9DAB] mt-1">{helperText}</span>
      )}
    </div>
  );
}

export default CustomInput;
