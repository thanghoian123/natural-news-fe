import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function ReceivePage() {
  const env = import.meta.env;
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [training, setTraining] = useState(true);
  const [newsletter, setNewsletter] = useState(true);
  const navigate = useNavigate();
  const question = useLocation();
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
    if (!env.VITE_API_URL) {
      // Handle error properly here
      setError('VITE_API_URL is not defined in .env file');
      return;
    }
    const response = await axios.post(
      `${env.VITE_API_URL}/prompt/submit`,
      {
        email: email,
        consent: training,
        prompt: question.state.initialMessage,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.data.status_code !== 200) {
      setError(response.data.detail[0]);
      return;
    }
    navigate('/Queue');
  };

  return (
    <div>
      <div className="Section Narrow" id="SectionReceived">
        <div className="Content">
          <div className="PageBox">
            <div className="Block BigHeadline Centered">Question Received!</div>
            <div className="Block Text Centered">
              <b className="Alert">
                The current estimated wait time for answer generation is [x] minutes.
              </b>
            </div>
            <div className="Block Text Centered">
              Prompt answers are emailed to you. Enter the email address where the answer will be
              sent.
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
                    className="Focus"
                  />
                </div>
              </div>

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
                  <a onClick={handleSubmit}>
                    <button className="Button ButtonPrimary ButtonLarge">
                      <div className="Auto">
                        <div className="AutoCol AutoIcon">
                          <div className="Icon">
                            <span className="Mask MaskAI"></span>
                          </div>
                        </div>
                        <div className="AutoCol AutoLabel">Send Answer</div>
                      </div>
                    </button>
                  </a>
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
                <a href="Subscribe" target="_blank">
                  free email newsletter
                </a>
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
