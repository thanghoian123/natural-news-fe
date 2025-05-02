import React, { useState, useEffect } from 'react';
import logoColor from '../../assets/Images/Logo-Color.svg'; // adjust as needed
import { useNavigate } from 'react-router-dom';
import useLoginHandler from './handler.jsx';

function LoginPage() {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     if (token) {
  //       navigate('/home', { replace: true });
  //     }
  //   } catch (error) {
  //     console.error('Error checking auth token:', error);
  //   }
  // }, [navigate]);
  const {
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
    setEmail,
    setCode,
  } = useLoginHandler();

  const [resendMode, setResendMode] = useState(false); // 👈 ADD resendMode

  const handleResend = (e) => {
    e.preventDefault();
    setResendMode(true); // 👈 set resend mode active
    setIsVerifyOTP(false); // 👈 go back to Email input
    setCode('');
    setEmail('');
  };

  return (
    <div className="p-[30px]">
      <div className="AuthLogin">
        <div className="Block Headline Centered">
          {userError
            ? `We're sorry but...`
            : resendMode
              ? 'Resend Code' // 👈 when resendMode, show Resend Code
              : isVerifyOTP
                ? 'Enter Access Code'
                : 'Hello There'}
        </div>

        <div className="Block Text Centered">
          {userError
            ? `We're unable to find an account associated with that email address. Please try another.`
            : resendMode
              ? `If you need the access code again, please enter your email address and try again.`
              : isVerifyOTP
                ? `We've sent a six-digit access code to your inbox, please enter it below to continue.`
                : 'Enter your Health Ranger Store newsletter email address to continue.'}
        </div>

        <div className="AuthForm">
          {isVerifyOTP ? (
            <>
              <div className="AuthLabel">Confirmation Code*</div>
              <div className="AuthInput">
                <input
                  className="Focus !bg-white placeholder-[color:var(--InputPlaceholder)]"
                  type="text"
                  id="code"
                  name="code"
                  value={code}
                  onChange={(e) => validateCode(e.target.value)}
                />
              </div>
            </>
          ) : (
            <>
              <div className="AuthLabel">Email Address*</div>
              <div className="AuthInput">
                <input
                  className="Focus !bg-white"
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => validateEmail(e.target.value)}
                />
              </div>
            </>
          )}

          <div className="AuthSubmit">
            <button
              onClick={() => {
                if (isVerifyOTP) {
                  handleVerifyOtp();
                } else {
                  handleContinue();
                  setResendMode(false); // 👈 after re-continue, clear resendMode
                }
              }}
              disabled={loading}
            >
              {loading ? 'Loading...' : isVerifyOTP ? 'Login' : 'Continue'}
            </button>
          </div>
        </div>

        {/* Only show "Resend Code" when verifying OTP */}
        {isVerifyOTP && !resendMode && (
          <div className="AuthResend">
            <div className="Text Centered">
              <a href="#" onClick={handleResend}>
                Resend Code
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="AuthInfo">
        <div className="Disclaimer Centered !text-[#2D2D30]">
          {resendMode ? (
            <>
              <b>Note:</b> Please check your spam/junk folder as the access code email may have
              ended up there.
            </>
          ) : isVerifyOTP ? (
            `By proceeding, you acknowledge and agree to our terms and conditions, which outline the rules and guidelines for using this site. You also acknowledge that AI is experimental and that it is your responsibility to verify all important information and always consult with your doctor before taking medication or making any changes to your existing medication or health routine.`
          ) : (
            `A six-digit access code will be sent to your inbox that you'll need to enter in the next step.`
          )}
        </div>
      </div>

      <div className="AuthLinks">
        <div className="Text Centered">
          Don't have an account?{' '}
          <a href="/Support/home" target="_blank" rel="noopener noreferrer">
            Learn how to gain access
          </a>
        </div>
      </div>

      <div className="AuthLinks">
        <div className="Disclaimer Centered">
          <a href="/Support/Terms" target="_blank" rel="noopener noreferrer">
            Terms of Service
          </a>{' '}
          •{' '}
          <a href="/Support/Privacy" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
