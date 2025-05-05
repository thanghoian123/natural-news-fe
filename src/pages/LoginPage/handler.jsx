import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, verifyOtp } from '../../redux/userSlice';
import { useToast } from '../../contexts/ToastContext';
import { useTheme } from '../../contexts/ThemeContext';

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

  const { changeTheme } = useTheme();

  useEffect(() => {
    changeTheme('light');
  }, []);

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
    if (email) {
      const result = await dispatch(loginUser(email));
      if (loginUser.fulfilled.match(result)) {
        setIsVerifyOTP(true);
        setResendClicked(false); // 👈 after successful resend, return to verify screen
      } else {
        addToast('Failed to login.', 'error');
      }
    } else {
      addToast('Please type email', 'error');
    }
  };

  const handleVerifyOtp = async () => {
    const result = await dispatch(verifyOtp({ email, otp: code }));
    if (verifyOtp.fulfilled.match(result)) {
      navigate('/home');
      addToast('Login successfully!', 'success');
    } else {
      addToast('Failed to login.', 'error');
    }
  };

  const handleResend = () => {
    setIsVerifyOTP(false); // 👈 go back to email form
    setResendClicked(true); // 👈 trigger special "Resend Code" mode
    setCode(''); // 👈 clear code input
  };

  return {
    email,
    code,
    error,
    validateEmail,
    validateCode,
    handleContinue,
    isVerifyOTP,
    setIsVerifyOTP,
    userError,
    handleVerifyOtp,
    loading,
    resendClicked,
    setResendClicked,
    setEmail,
    setCode,
    handleResend,
  };
}

export default useLoginHandler;
