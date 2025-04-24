import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import { Link } from 'react-router-dom';

function ReceivePage() {
  const VITE_API_URL = "https://api.brighteon.ai";
  const SITE_KEY = "6Ldh-NYqAAAAAOiHmQEzA9aKbOvPuLo-N6UahU0I"; // <-- Replace with your real site key

  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [training, setTraining] = useState(true);
  const [newsletter, setNewsletter] = useState(true);
  const [showRecaptcha, setShowRecaptcha] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);

  const navigate = useNavigate();
  const question = useLocation();

  const handleEmailFocus = () => {
    setShowRecaptcha(true);
  };

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (name === 'Training') {
      setTraining(checked);
    } else if (name === 'Newsletter') {
      setNewsletter(checked);
    }
  };

  const handleSubmit = async () => {
    if (!VITE_API_URL) {
      setError('VITE_API_URL is not defined in .env file');
      return;
    }

    if (!recaptchaToken) {
      setError('Please complete the reCAPTCHA challenge.');
      return;
    }

    try {
      const response = await axios.post(
        `${VITE_API_URL}/prompt/submit`,
        {
          email,
          consent: training,
          prompt: question.state.initialMessage,
          recaptcha: recaptchaToken,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.status === 200) {
        navigate('/Queue');
      } else {
        setError('Failed to submit your question. Please try again.');
      }
    } catch (err) {
      setError('Error submitting your question. Please try again.');
    }
  };

  return (
    <div>
      <div className="Section Narrow" id="SectionReceived">
        <div className="Content">
          <div className="PageBox">
            <div className="Block BigHeadline Centered">Question Received!</div>
            <div className="Block Text Centered">
              <b className="Alert">The current estimated wait time for answer generation is [x] minutes.</b>
            </div>
            <div className="Block Text Centered">
              Prompt answers are emailed to you. Enter the email address where the answer will be sent.
            </div>

            <div className="Block Form">
              <div className="FormGroup">
                <div className="Block FormInput">
                  <input
                    type="text"
                    name="Email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={handleEmailChange}
                    onFocus={handleEmailFocus}
                    className="Focus"
                  />
                </div>
              </div>

              {showRecaptcha && (
                <div className="FormGroup">
                  <ReCAPTCHA sitekey={SITE_KEY} onChange={handleRecaptchaChange} />
                </div>
              )}

              <div className="FormGroup">
                <div className="Block FormOptions">
                  <div className="FormCheckbox">
                    <label>
                      <input
                        name="Training"
                        type="checkbox"
                        id="Training"
                        value="1"
                        checked={training}
                        onChange={handleCheckboxChange}
                      />
                      Use my question to help train future editions of Enoch<span></span>
                    </label>
                  </div>
                  <div className="FormCheckbox">
                    <label>
                      <input
                        name="Newsletter"
                        type="checkbox"
                        id="Newsletter"
                        value="1"
                        checked={newsletter}
                        onChange={handleCheckboxChange}
                      />
                      Keep me informed about Enoch news and updates. *<span></span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="FormGroup">
                <div className="ButtonBox ButtonBoxCenter">
                  <button className="Button ButtonPrimary ButtonLarge" onClick={handleSubmit}>
                    <div className="Auto">
                      <div className="AutoCol AutoIcon">
                        <div className="Icon">
                          <span className="Mask MaskAI"></span>
                        </div>
                      </div>
                      <div className="AutoCol AutoLabel">Send Answer</div>
                    </div>
                  </button>
                </div>
              </div>

              {error && (
                <div className="Block Text Centered">
                  <b className="Alert">{error}</b>
                </div>
              )}
            </div>

            <div className="Disclaimer Centered !text-[10px]">
              <p className="my-[10px]">
                <a href="Privacy" target="_blank">
                  Your privacy is protected.
                </a>{' '}
                We will never share or sell your email address.
              </p>
              <p className="my-[10px]">
                * You will be added to our{' '}
                <Link to="/freeai/Subscribe" target="_blank">
                  free email newsletter
                </Link>
                . You may unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReceivePage;
