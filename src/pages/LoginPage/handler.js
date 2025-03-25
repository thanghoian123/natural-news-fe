import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../redux/userSlice';
import { useToast } from '../../contexts/ToastContext';

function LoginHandler() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addToast } = useToast();
  const [isVerifyOTP, setIsVerifyOTP] = useState(false);
  const [error, setError] = useState('');

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

  const validateCode = (value) => {
    setCode(value);
  };

  const handleContinue = async () => {
    const result = await dispatch(loginUser(email));
    // const result = await dispatch(removeChatSession(id));
    if (loginUser.fulfilled.match(result)) {
      addToast('login successfully!', 'success');
      navigate('/home');
    } else {
      addToast('Failed to login.', 'error');
    }
    // if (!error) {
    //   if (isVerifyOTP) {
    //     // Verify otp
    //     // Nagigate to home
    //     dispatch(loginUser(email));
    //     // navigate('/home');
    //   } else {
    //     // Call Send OTP
    //     onSendOTP()
    //       .then((result) => {
    //         if (result) {
    //           setIsVerifyOTP(true);
    //           setEmail('');
    //         }
    //       })
    //       .catch((e) => {
    //         console.log('🚀 ~ result ~ e:', e);
    //       });
    //   }
    // }
  };

  const onSendOTP = async () => {
    return;
  };
  return {
    email,
    code,
    error,
    validateEmail,
    validateCode,
    handleContinue,
    isVerifyOTP,
    onSendOTP,
  };
}

export default LoginHandler;
