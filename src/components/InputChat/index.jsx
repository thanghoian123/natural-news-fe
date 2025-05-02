import React, { useRef, useEffect } from 'react';
import { Paperclip, Settings } from 'lucide-react';
import Dropdown from '../Dropdown';
import RadioDropdown from '../RadioDropdown';
import { Link } from 'react-router-dom';

function InputChat(props) {
  const {
    value,
    onChange,
    sendMessage,
    tokenRemaining = 0,
    isNewChat,
    handleSelectPrompt,
    handlePressPropmt,
    handleChangeModel,
    modelType,
    disconnectWebSocket,
    isStreaming,
  } = props;
  const sendButtonRef = useRef(null);

  const helperText =
    tokenRemaining > 2499
      ? 'As a Platinum member, you have access to unlimited questions.'
      : `                Each prompt uses 1 question. You have ${tokenRemaining} questions remaining.
`;
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // reset height
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`; // adjust with max
    }
  }, [value]);
  return (
    <div className="">
      <div className="ChatBox USN">
        <div className="ChatPrompt">
          <textarea
            ref={textareaRef}
            rows="1"
            name="Prompt"
            id="Prompt"
            value={value}
            onChange={onChange}
            placeholder="Type something here"
            className="Focus"
          ></textarea>
        </div>

        <div className="ChatButtons">
          <div className="ChatTable">
            <div className="ChatCol ChatColLeft">
              <div className="Disclaimer">
                {helperText}{' '}
                <Link
                  href="/Support/home"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="Link ButtonProfile NoClose"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="ChatCol ChatColRight">
              <div className="ButtonBox ButtonBoxRight">
                <div
                  className={`ButtonPrimary ButtonIcon  NoClose ${!value && !isStreaming && 'ButtonDisabled'}`}
                  id="ButtonGo"
                  title=""
                  ref={sendButtonRef}
                  onClick={() => (isStreaming ? disconnectWebSocket() : sendMessage())}
                >
                  <div className="Icon">
                    {isStreaming ? (
                      <span style={{ color: 'white' }}>Stop</span>
                    ) : (
                      <span className="Mask MaskGo"></span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InputChat;
