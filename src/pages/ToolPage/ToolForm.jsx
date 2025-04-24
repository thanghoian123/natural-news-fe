/* eslint-disable no-debugger */
import React, { useRef } from 'react';
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
  const fieldRefs = useRef({}); // Holds refs to inputs

  const findStructure = dataFormStructure.find((i) => i.key === category);
  const fields = findStructure.fields;

  const initialValues = fields.reduce((acc, field) => {
    acc[field.key] = field.default || (field.type === TYPE.checkbox ? [] : '');
    return acc;
  }, {});

  const validationSchema = Yup.object(
    fields.reduce((acc, field) => {
      // console.log('🚀 ~ fields.reduce ~ field:', field);
      if (field?.isRequired) {
        if (field.type === TYPE.checkbox) {
          acc[field.key] = Yup.array()
            .min(
              field?.min || 3,
              `Select at least ${field?.min || 3} ${field.key} from the list below.`
            )
            .required('This field is required.');
        } else if (field.type === TYPE.dropdown) {
          acc[field.key] = Yup.string().required('This field is required.');
        } else {
          acc[field.key] = Yup.string().trim().required('This field is required.');
        }
      }
      return acc;
    }, {})
  );

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: true,
    onSubmit: async (values) => {
      const result = fields
        .map(({ key, promptText }) => {
          const value = values[key];
          return Array.isArray(value)
            ? `${promptText}: ${value.length ? value.join(', ') : 'None'}`
            : `${promptText}: ${value || 'N/A'}`;
        })
        .join('\n\n');
      const { payload } = await dispatch(startNewSession(user?.id));
      if (payload?.id) {
        navigate(`/chat?id=${payload.id}`, { state: { initialMessage: result } });
      }
    },
  });
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const errors = await formik.validateForm();
    if (Object.keys(errors).length > 0) {
      const firstErrorKey = Object.keys(errors)[0];
      const firstRef = fieldRefs.current[firstErrorKey];

      formik.setFieldTouched(firstErrorKey, true);

      if (firstRef && typeof firstRef.scrollIntoView === 'function') {
        // Scroll to the field with an error
        firstRef.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        console.warn(`❗ The element does not have scrollIntoView:`, firstRef);
      }

      if (firstRef && typeof firstRef.focus === 'function') {
        firstRef.focus();
      }

      return;
    }

    formik.handleSubmit();
  };

  return (
    <div className="UITable">
      <div className="UICol">
        <div className="Questionnaire">
          <div className="Block Headline Centered">{findStructure.title}</div>
          <div className="Text Centered">{findStructure.subTitle}</div>
          <form className="Form" onSubmit={handleFormSubmit}>
            {fields.map(
              ({ label, key, type, listCheckBoxes = [], isRequired, ...fieldProps }, index) => (
                <div key={key}>
                  {type === TYPE.checkbox ? (
                    <CheckboxGroup
                      label={`${index + 1}. ${label}`}
                      options={listCheckBoxes.map((i) => ({ label: i, value: i }))}
                      selectedValues={formik.values[key]}
                      onChange={(val) => formik.setFieldValue(key, val)}
                      error={formik.touched[key] && formik.errors[key]}
                      isRequired={isRequired}
                      {...fieldProps}
                      ref={(el) => (fieldRefs.current[key] = el)}
                    />
                  ) : type === TYPE.input ? (
                    <CustomInput
                      label={`${index + 1}. ${label}`}
                      value={formik.values[key]}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name={key}
                      error={formik.touched[key] && formik.errors[key]}
                      ref={(el) => (fieldRefs.current[key] = el)}
                      isRequired={isRequired}
                      {...fieldProps}
                    />
                  ) : type === TYPE.dropdown ? (
                    <Dropdown
                      label={`${index + 1}. ${label}`}
                      options={fields.options}
                      onSelect={(val) => formik.setFieldValue(key, val)}
                      error={formik.touched[key] && formik.errors[key]}
                      ref={(el) => (fieldRefs.current[key] = el)}
                      isRequired={isRequired}
                      {...fieldProps}
                    />
                  ) : (
                    <CustomTextarea
                      label={`${index + 1}. ${label}`}
                      value={formik.values[key]}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name={key}
                      error={formik.touched[key] && formik.errors[key]}
                      ref={(el) => (fieldRefs.current[key] = el)}
                      isRequired={isRequired}
                      {...fieldProps}
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
              * Required to continue
              <br />
              <br />
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
