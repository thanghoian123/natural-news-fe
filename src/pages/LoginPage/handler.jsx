import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, verifyOtp } from '../../redux/userSlice';
import { useToast } from '../../contexts/ToastContext';

function useLoginHandler() {
  console.log('useLoginHandler called');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error: userError, loading } = useSelector((state) => state.user);
  const { addToast } = useToast();
  const [isVerifyOTP, setIsVerifyOTP] = useState(false);
  const [error, setError] = useState('');
  const [resendClicked, setResendClicked] = useState(false);

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
    if (email && !error) {
      // ⚡️ FIX: dispatch an object matching the thunk signature
      const result = await dispatch(loginUser({ email }));
      if (loginUser.fulfilled.match(result)) {
        setIsVerifyOTP(true);
      } else {
        console.error('loginUser rejected, payload:', result.payload, 'error:', result.error);
        addToast('Failed to login.', 'error');
      }
    } else {
      addToast('Please type a valid email', 'error');
    }
  };

  const handleVerifyOtp = async () => {
    const result = await dispatch(verifyOtp({ email, otp: code }));
    if (verifyOtp.fulfilled.match(result)) {
      navigate('/home');
      addToast('Login successful!', 'success');
    } else {
      console.error('verifyOtp rejected, payload:', result.payload, 'error:', result.error);
      addToast('Failed to verify OTP.', 'error');
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
    loading,
    resendClicked,
    setResendClicked,
  };
}

export default useLoginHandler;
