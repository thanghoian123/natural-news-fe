import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { startNewSession } from '../../redux/chatSlice';
import CustomInput from '../../components/Input';
import { TYPE, dataFormStructure } from './mocks';
import CheckboxGroup from '../../components/Checkbox';
import CustomTextarea from '../../components/Textarea';
import Dropdown from '../../components/Common/Dropdown';

function ToolForm({ category }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const findStructure = dataFormStructure.find((i) => i.key === category);
  const fields = findStructure.fields;

  const initialValues = fields.reduce((acc, field) => {
    acc[field.key] = field.default || (field.type === TYPE.checkbox ? [] : '');
    return acc;
  }, {});

  const validationSchema = Yup.object(
    fields.reduce((acc, field) => {
      if (field?.required) {
        if (field.type === TYPE.checkbox) {
          acc[field.key] = Yup.array()
            .min(1, 'Please select at least one option.')
            .required('This field is required.');
        } else if (field.type === TYPE.dropdown) {
          acc[field.key] = Yup.string().required('This field is required.');
        } else {
          acc[field.key] = Yup.string()
            .trim()
            .required('This field is required.')
            .min(2, 'Must be at least 2 characters.');
        }
      }
      return acc;
    }, {})
  );
  console.log('🚀 ~ ToolForm ~ validationSchema:', validationSchema);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const result = fields
        .map(({ label, key }) => {
          const value = values[key];
          return Array.isArray(value)
            ? `${label}: ${value.length ? value.join(', ') : 'None'}`
            : `${label}: ${value || 'N/A'}`;
        })
        .join('\n\n');

      const { payload } = await dispatch(startNewSession(user?.id));
      if (payload?.id) {
        navigate(`/chat?id=${payload.id}`, { state: { initialMessage: result } });
      }
    },
  });

  return (
    <div className="UITable">
      <div className="UICol">
        <div className="Questionnaire">
          <div className="Block Headline Centered">{findStructure.title}</div>
          <div className="Text Centered">{findStructure.subTitle}</div>
          <form className="Form" onSubmit={formik.handleSubmit}>
            {fields.map(
              (
                { label, key, helperText, questionLabel, type, listCheckBoxes = [], name },
                index
              ) => (
                <div key={key}>
                  {type === TYPE.checkbox ? (
                    <CheckboxGroup
                      label={`${index + 1}. ${label}`}
                      options={listCheckBoxes.map((i) => ({ label: i, value: i }))}
                      selectedValues={formik.values[key]}
                      onChange={(val) => formik.setFieldValue(key, val)}
                      error={formik.touched[key] && formik.errors[key]}
                      helperText={helperText}
                      name={key}
                      questionLabel={questionLabel}
                    />
                  ) : type === TYPE.input ? (
                    <CustomInput
                      label={`${index + 1}. ${label}`}
                      helperText={helperText}
                      questionLabel={questionLabel}
                      value={formik.values[key]}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name={key}
                      error={formik.touched[key] && formik.errors[key]}
                    />
                  ) : type === TYPE.dropdown ? (
                    <Dropdown
                      label={formik.values[key] || 'Select an option'}
                      options={[
                        '1 sentence',
                        '1 paragraph',
                        '2-3 paragraphs',
                        '3-5 paragraphs',
                        '5-10 paragraphs',
                      ]}
                      onSelect={(val) => formik.setFieldValue(key, val)}
                      error={formik.touched[key] && formik.errors[key]}
                    />
                  ) : (
                    <CustomTextarea
                      label={`${index + 1}. ${label}`}
                      helperText={helperText}
                      questionLabel={questionLabel}
                      value={formik.values[key]}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name={key}
                      error={formik.touched[key] && formik.errors[key]}
                    />
                  )}
                </div>
              )
            )}

            <div className="Block ButtonBox ButtonBoxCenter">
              <button
                className="Button ButtonAuto ButtonAutoLeft ButtonPrimary ButtonLarge"
                id="Generate"
                type="submit"
              >
                <div className="Auto">
                  <div className="AutoCol AutoIcon">
                    <div className="Icon">
                      <span className="Mask MaskAI" />
                    </div>
                  </div>
                  <div className="AutoCol AutoLabel">Generate Results</div>
                </div>
              </button>
            </div>

            <div className="ChatNotice Centered">
              <p className="mb-3">
                <b>Note:</b> Generating results will use 1 question from your account.
              </p>
              <p>
                Enoch AI is experimental. These statements are not intended to diagnose, treat, or
                cure any medical condition. Please verify all important information and always seek
                advice from your doctor, healthcare professional, or naturopath before making any
                changes to your existing medication or health routine.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ToolForm;
