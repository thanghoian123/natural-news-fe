import React from 'react';
import logo from '../../assets/logo.svg';
import LoginHandler from './handler';
<image src={logo} />;

function LoginPage() {
  const {
    error,
    email,
    code,
    validateEmail,
    validateCode,
    handleContinue,
    isVerifyOTP,
    userError,
  } = LoginHandler();

  return (
    <div className="p-[30px] w-[100vw]">
      <div className="logo-wrapper flex justify-center md:justify-start mb-5">
        <img src={logo} alt="Logo" className="w-40" />
      </div>
      <div className="grid  grid-cols place-content-center">
        <div className="flex flex-col max-w-[340px] gap-2 items-center">
          <h1 className="text-center text-[38px] font-[700]">
            {userError ? `We're sorry but...` : isVerifyOTP ? 'Enter Access Code' : 'Hello There'}
          </h1>
          <div className=" text-center text-[14px] font-[400] text-[#2d2d30]">
            {userError
              ? `We're unable to find an account associated with that email address. Please try another.`
              : isVerifyOTP
                ? `We've sent a six-digit access code to your inbox, please enter it below to continue.`
                : 'Enter your Natural News or Health Ranger Store newsletter email address to continue.'}
          </div>

          <div className="flex flex-col gap-2 w-full">
            <div className="flex-1">
              {isVerifyOTP ? (
                <div className="flex flex-col">
                  <label htmlFor="code" className="text-sm text-[#7765FD] text-[12px] font-[400]">
                    Confirmation Code*
                  </label>
                  <input
                    id="code"
                    name="code"
                    value={code}
                    onChange={(e) => validateCode(e.target.value)}
                    className={`w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 ${
                      error
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-blue-500'
                    }`}
                  />
                  {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                </div>
              ) : (
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-sm text-[#7765FD] text-[12px] font-[400]">
                    Email Address*
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => validateEmail(e.target.value)}
                    className={`w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 ${
                      error
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-blue-500'
                    }`}
                  />
                  {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                </div>
              )}
            </div>
          </div>

          <button
            className="px-4 py-2 w-full text-white bg-gradient-to-r from-[#7765FD] to-[#5d4ad1] rounded-lg shadow-md hover:opacity-90 focus:ring-2 focus:ring-[#7765FD]"
            onClick={handleContinue}
          >
            {isVerifyOTP ? 'Login' : 'Continue'}
          </button>

          {isVerifyOTP && (
            <p href="#" className="text-[#7765FD] hover:underline">
              Resend Code
            </p>
          )}

          <p className="text-[#2D2D30] text-[12px] text-center mt-2">
            {isVerifyOTP
              ? `By proceeding, you acknowledge and agree to our terms and conditions, which outline the rules and guidelines for using this site. You also acknowledge that AI is experimental and that it is your responsibility to verify all important information and always consult with your doctor before taking medication or making any changes to your existing medication or health routine.`
              : ` A six-digit access code will be sent to your inbox that you'll need to enter in the next
            step.`}
          </p>

          <p className="text-[#2D2D30] text-[14px] mt-7">
            Don't have an account?{' '}
            <a href="#" className="text-[#7765FD] hover:underline">
              Learn how to gain access
            </a>
          </p>

          <div className="text-gray-700  text-[12px] mt-7">
            <a href="#" className="text-[#7765FD] hover:underline">
              Terms of Use
            </a>{' '}
            •
            <a href="#" className="text-[#7765FD] hover:underline">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
