import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, verifyOtp } from '../../redux/userSlice';
import { useToast } from '../../contexts/ToastContext';

function LoginHandler() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error: userError } = useSelector((state) => state.user);
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
    if (loginUser.fulfilled.match(result)) {
      setIsVerifyOTP(true);
    } else {
      addToast('Failed to login.', 'error');
    }
  };

  const handleVerifyOtp = async () => {
    const result = await dispatch(verifyOtp({ email, otp: code }));
    if (verifyOtp.fulfilled.match(result)) {
      navigate('/home');
      addToast('login successfully!', 'success');
    } else {
      addToast('Failed to login.', 'error');
    }
  };

  return {
    email,
    code,
    error,
    validateEmail,
    validateCode,
    handleContinue,
    isVerifyOTP,
    userError,
    handleVerifyOtp,
  };
}

export default LoginHandler;
