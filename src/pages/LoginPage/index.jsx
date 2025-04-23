import React from 'react';
import logoColor from '../../assets/Images/Logo-Color.svg'; // Adjust path as needed
import useLoginHandler from './LoginHandler';

import { Link } from 'react-router-dom';

function LoginPage() {
  const {
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
  } = useLoginHandler();


  return (
    <div id="Page">
      <div class="AuthLogin">
        <div class="Block Headline Centered">
          {userError ? `We're sorry but...` : isVerifyOTP ? 'Enter Access Code' : 'Hello There'}
        </div>
        <div class="Block Text Centered">
          {userError
            ? `We're unable to find an account associated with that email address. Please try another.`
            : isVerifyOTP
              ? `We've sent a six-digit access code to your inbox, please enter it below to continue.`
              : 'Enter your Health Ranger Store newsletter email address to continue.'}
        </div>
        <form action="Auth/Submit">
          <div class="AuthForm">
            {isVerifyOTP ? (
              <>
                <div class="AuthLabel">Confirmation Code*</div>
                <div class="AuthInput">
                  <input
                    class="Focus !bg-white"
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
                <div class="AuthLabel">Email Address*</div>
                <div class="AuthInput">
                  <input
                    class="Focus !bg-white"
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => validateEmail(e.target.value)}
                  />
                </div>
              </>
            )}

            <div class="AuthSubmit">
              <button
                id="AuthSubmit"
                name="AuthSubmit"
                type="submit"
                onClick={() => (isVerifyOTP ? handleVerifyOtp() : handleContinue())}
                disabled={loading}
              >
                {loading ? 'Loading...' : isVerifyOTP ? 'Login' : 'Continue'}
              </button>
            </div>
          </div>
        </form>
      </div>
      <div class="AuthInfo">
        <div class="Disclaimer Centered !text-[#2D2D30]">
          A six-digit access code will be sent to your inbox that you'll need to enter in the next
          step.
        </div>
      </div>

      <div class="AuthLinks">
        <div class="Text Centered">
          Don't have an account?{' '}
          <Link to="/Support/home">
          Learn how to gain access
      </Link>
        </div>
      </div>
      <div class="AuthLinks">
        <div class="Disclaimer Centered">
          <a href="Support/Terms">
            Terms of Service
          </a>
          {' '}
          •
          {' '}
          <a href="Support/Privacy">
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
