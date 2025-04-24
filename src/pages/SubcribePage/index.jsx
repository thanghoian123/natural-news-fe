import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SubscribePage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e) => {
    if (!email) {
      e.preventDefault(); // Prevent submit on empty field
      setError('This field is required.');
    } else if (!validateEmail(email)) {
      e.preventDefault(); // Prevent submit on invalid email
      setError('Enter a valid email address.');
    } else {
      setError('');
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (!value) {
      setError('This field is required.');
    } else if (!validateEmail(value)) {
      setError('Enter a valid email address.');
    } else {
      setError('');
    }
  };

  return (
    <div className="Section Narrow" id="SectionSubscribe">
      <div className="Content">
        <div className="PageBox">
          <div className="Block BigHeadline Centered">Subscribe</div>
          <div className="Block Text Centered">
            <b className="Alert">
              Subscribe to our free newsletter and gain full download access to all our LLMs
            </b>
          </div>

          <form
            method="POST"
            action="https://healthrangerstore.activehosted.com/proc.php"
            target="_blank"
            id="_form_391_"
            noValidate
            onSubmit={handleSubmit}
          >
            <div className="FormBlock">
              <div className="FormGroup">
                <div className="Block FormInput">
                  <input
                    type="text"
                    name="email"
                    placeholder="Enter your email address"
                    className={`Focus ${error ? '_has_error' : ''}`}
                    required
                    value={email}
                    onChange={handleChange}
                    data-name="email"
                  />
                  {error && (
                    <div className="_error _above">
                      <div className="_error-arrow"></div>
                      <div className="_error-inner">{error}</div>
                    </div>
                  )}
                </div>

                <div className="ButtonBox ButtonBoxFull">
                  <button
                    id="_form_391_submit"
                    type="submit"
                    className="Button ButtonPrimary ButtonLarge"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>

            {/* Hidden inputs for ActiveCampaign */}
            <input type="hidden" name="u" value="391" />
            <input type="hidden" name="f" value="391" />
            <input type="hidden" name="s" />
            <input type="hidden" name="c" value="0" />
            <input type="hidden" name="m" value="0" />
            <input type="hidden" name="act" value="sub" />
            <input type="hidden" name="v" value="2" />
            <input type="hidden" name="or" value="7ad87aca66cce05ff14c422be47efbd5" />
          </form>

          <div className="Disclaimer Centered">
            <p>
              <a href="Privacy" target="_blank">
                Your privacy is protected.
              </a>{' '}
              You may unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubscribePage;
