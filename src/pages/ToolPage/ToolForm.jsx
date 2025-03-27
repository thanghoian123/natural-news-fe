import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { startNewSession } from '../../redux/chatSlice';
import CustomInput from '../../components/Input';
import { Sparkles } from 'lucide-react';
import { TYPE, dataFormStructure } from './mocks';
import CheckboxGroup from '../../components/Checkbox';
import CustomTextarea from '../../components/Input';

function ToolForm({ category }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [selectedValues, setSelectedValues] = useState([]);
  const findStructure = dataFormStructure.find((i) => i.key === category);
  const [formData, setFormData] = useState(() =>
    (findStructure.fields || []).reduce((acc, item) => ({ ...acc, [item.key]: item.default }), {})
  );

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheckboxChange = (key, updatedValues) => {
    setSelectedValues(updatedValues);
    setFormData((prev) => ({
      ...prev,
      [key]: updatedValues, // Directly set the updated array
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = findStructure.fields
      .map(({ label, key }) => {
        const value = formData[key];
        if (Array.isArray(value)) {
          return `${label}: ${value.length > 0 ? value.join(', ') : 'None'}`;
        }
        return `${label}: ${value || 'N/A'}`;
      })
      .join('\n\n');

    console.log(result);
    dispatch(startNewSession(user?.id)).then(({ payload }) => {
      const chatID = payload?.id;
      if (chatID) {
        navigate(`/chat?id=${chatID}`, { state: { initialMessage: result } });
      }
    });
  };

  return (
    <div className="p-[40px]">
      <h1 className="text-2xl font-bold text-primary text-center text-[38px] font-[700] mb-[20px]">
        {findStructure.title}
      </h1>
      <p className="text-gray-600 dark:text-[#E5E5EC] text-center text-[14px]">
        {findStructure.subTitle}
      </p>
      <form className="mt-[20px] space-y-4" onSubmit={handleSubmit}>
        {findStructure.fields.map(
          ({ label, key, helperText, questionLabel, type, listCheckBoxes = [] }, index) => (
            <div key={key}>
              {type === TYPE.checkbox ? (
                <CheckboxGroup
                  key={key}
                  options={listCheckBoxes.map((i) => ({ value: i, label: i }))}
                  selectedValues={selectedValues}
                  onChange={(value) => handleCheckboxChange(key, value)}
                  label={`${index + 1}. ${label}`}
                  helperText={helperText}
                  questionLabel={questionLabel}
                />
              ) : type === TYPE.input ? (
                <CustomInput
                  label={`${index + 1}. ${label}`}
                  helperText={helperText}
                  questionLabel={questionLabel}
                  value={formData[key]}
                  onChange={(e) => handleChange(key, e.target.value)}
                />
              ) : (
                <CustomTextarea
                  label={`${index + 1}. ${label}`}
                  helperText={helperText}
                  questionLabel={questionLabel}
                  value={formData[key]}
                  onChange={(e) => handleChange(key, e.target.value)}
                />
              )}
            </div>
          )
        )}
        <button type="submit" className="bg-primary text-white px-8 py-3 mt-4 rounded flex m-auto">
          <Sparkles className="mr-4" />
          <span className="text-[14px] font-[600]">Generate (1 question)</span>
        </button>
      </form>
    </div>
  );
}

export default ToolForm;
