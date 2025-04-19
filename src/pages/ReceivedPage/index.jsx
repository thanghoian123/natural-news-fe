import React, { useEffect, useState } from 'react';
import CheckboxGroup from '../../components/Checkbox';
import { Sparkles } from 'lucide-react';
import CustomInput from '../../components/Input';
import { useLocation, useNavigate } from 'react-router-dom';

function ReceivedPage() {
  const [selectedValues, setSelectedValues] = useState([]);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const location = useLocation();
  const initialMessage = location.state?.initialMessage || '';
  const navigate = useNavigate();
  const handleCheckboxChange = (updatedValues) => {
    setSelectedValues(updatedValues);
  };

  const validateEmail = (value) => {
    setEmail(value);
    if (!value) {
      setError('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError('Invalid email format');
    } else {
      setError('');
    }
  };

  useEffect(() => {
    if (initialMessage) {
      //   setMessage(initialMessage);
      navigate(location.pathname + location.search, { replace: true, state: {} });
    }
  }, [initialMessage]);

  const handleSendMail = async () => {
    if (!email || error) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      // Simulate API call to send mail
      const payload = {
        email,
        message,
        preferences: selectedValues,
      };
      console.log('Sending email with payload:', payload);

      // Simulate success
      alert('Email sent successfully!');
      setMessage('');
    } catch (err) {
      console.error('Error sending email:', err);
      alert('Failed to send email. Please try again later.');
    }
  };

  return (
    <div className="wrapper flex w-full justify-center items-center px-[24px] py-[80px] border-b-[#3E3E42] border-b-1">
      <div className="box  lg:w-[920px] md-w-full bg-[#F4F4FA] dark:bg-[#1E1E1E] border-[#E5E5EC] flex flex-col justify-center items-center p-[40px] rounded-lg gap-4 text-[#2D2D30] dark:text-white">
        <p className="title text-[28px]">Question Received!</p>

        <p className="font-bold text-[14px] text-[#E0203C]">
          The current estimated wait time for answer generation is [x] minutes.
        </p>
        <p className="text-[14px] font-[400] ">
          Prompt answers are emailed to you. Enter the email address where the answer will be sent.
        </p>
        <div>
          <CustomInput
            value={email}
            onChange={(e) => validateEmail(e.target.value)}
            error={error}
            placeHolder="Enter your email address"
          />

          <CheckboxGroup
            options={[
              'Use my question to help train future editions of Enoch',
              'Keep me informed about Enoch news and updates. *',
            ].map((i, index) => ({ value: index, label: i }))}
            selectedValues={selectedValues}
            onChange={(value) => handleCheckboxChange(value)}
            label={``}
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white px-8 py-3 mt-4 rounded flex m-auto"
          onClick={handleSendMail}
        >
          <Sparkles className="mr-4" />
          <span className="text-[14px] font-[600]">Send Answer</span>
        </button>

        <div className="text-[10px] text-center dark:text-[#9D9DAB]">
          <p>
            <a href="#" className="text-primary">
              Your privacy is protected.
            </a>{' '}
            We will never share or sell your email address.
          </p>
          <p>
            * You will be added to our{' '}
            <a href="#" className="text-primary">
              free email newsletter
            </a>
            . You may unsubscribe at any time.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ReceivedPage;
