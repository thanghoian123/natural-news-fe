import React from 'react';
import logoColor from '../../assets/Images/Logo-Color.svg'; // Adjust path as needed
import { Link } from 'react-router-dom';

import useLoginHandler from './handler.jsx';

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
    resendClicked,
    setResendClicked,
  } = useLoginHandler();

  return (
    <div id="Page">
      <div class="AuthLogin">
        <div className="Block Headline Centered">
          {userError
            ? `We're sorry but...`
            : resendClicked
              ? 'Resend Code'
              : isVerifyOTP
                ? 'Enter Access Code'
                : 'Hello There'}
        </div>
        <div className="Block Text Centered">
          {userError
            ? `We're unable to find an account associated with that email address. Please try another.`
            : resendClicked
              ? `If you need the access code again, please enter your email address and try again.`
              : isVerifyOTP
                ? `We've sent a six-digit access code to your inbox, please enter it below to continue.`
                : 'Enter your Health Ranger Store newsletter email address to continue.'}
        </div>
        <div class="AuthForm">
          {isVerifyOTP ? (
            <>
              <div class="AuthLabel">Confirmation Code*</div>
              <div class="AuthInput">
                <input
                  class="Focus !bg-white placeholder-[color:var(--InputPlaceholder)]"
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
              onClick={() => (isVerifyOTP ? handleVerifyOtp() : handleContinue())}
              disabled={loading}
            >
              {loading ? 'Loading...' : isVerifyOTP ? 'Login' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
      {isVerifyOTP && !resendClicked && (
        <div className="AuthResend">
          <div className="Text Centered">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setResendClicked(true); // hides the link
              }}
            >
              Resend Code
            </a>
          </div>
        </div>
      )}
      <div class="AuthInfo">
        <div className="Disclaimer Centered !text-[#2D2D30]">
          {resendClicked ? (
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

      <div class="AuthLinks">
        <div class="Text Centered">
          Don't have an account? <Link to="/Support/home">Learn how to gain access</Link>
        </div>
      </div>
      <div class="AuthLinks">
        <div class="Disclaimer Centered">
          <a href="Support/Terms">Terms of Service</a> •{' '}
          <a href="Support/Privacy">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
