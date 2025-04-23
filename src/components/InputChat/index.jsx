import React, { useRef } from 'react';
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
  } = props;
  const sendButtonRef = useRef(null);
  const prompts = [
    {
      id: 1,
      messages: 'Tell me about',
      label: 'Tell me about',
      options: [
        { label: 'MAHA', value: 'MAHA' },
        { label: 'Aloe Vera', value: 'Aloe Vera' },
        { label: 'Turmeric', value: 'Turmeric' },
        { label: 'Covid-19', value: 'Covid-19' },
      ],
    },
    {
      id: 2,
      messages: 'What are the benefits of',
      label: 'What are the benefits',
      options: [
        { label: 'Weight Loss', value: 'Weight Loss' },
        { label: 'Vitamin D', value: 'Vitamin D' },
        { label: 'Eating Less Sugar', value: 'Eating Less Sugar' },
      ],
    },
    {
      id: 3,
      messages: 'What are the dangers of',
      label: 'What are the dangers',
      options: [
        { label: 'Vegetable Oils', value: 'Vegetable Oils' },
        { label: 'Food Dyes', value: 'Food Dyes' },
        { label: 'Junk Food', value: 'Junk Food' },
        { label: 'Blue Light', value: 'Blue Light' },
      ],
    },
    {
      id: 4,
      messages: 'Give me advice',
      label: 'Give me advice about',
      options: [
        { label: 'Losing Weight', value: 'Losing Weight' },
        { label: 'Walking 10k Steps', value: 'Walking 10k Steps' },
        { label: 'Strength Training', value: 'Strength Training' },
      ],
    },
    {
      id: 5,
      label: 'Summarize',
      messages: 'Summarize this text: [Paste text here]',
      options: [
        // { label: 'Dashboard', value: 'dashboard' },
        // { label: 'Settings', value: 'settings' },
        // { label: 'Earnings', value: 'earnings' },
        // { label: 'Sign out', value: 'signout' },
      ],
    },
  ];
  const helperText =
    tokenRemaining > 2499
      ? 'As a Platinum member, you have access to unlimited questions.'
      : `                Each prompt uses 1 question. You have ${tokenRemaining} questions remaining.
`;

  return (
    <div className="">
      <div className="ChatBox USN">
        <div className="ChatPrompt">
          <textarea
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
                {helperText}
                <Link to="/Support/home" className="Link ButtonProfile NoClose">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="ChatCol ChatColRight">
              <div className="ButtonBox ButtonBoxRight">
                <div
                  className={`ButtonPrimary ButtonIcon  NoClose ${!value && 'ButtonDisabled'}`}
                  id="ButtonGo"
                  title=""
                  ref={sendButtonRef}
                  onClick={sendMessage}
                >
                  <div className="Icon">
                    <span className="Mask MaskGo"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="p-3 bg-[#F4F4FA] dark:bg-[#252526] flex items-center flex-col  rounded-2xl border-primary border-1 border-primary ">
        <input
          type="text"
          className="flex-11 p-2 text-sm border-b border-gray-200 outline-none pb-[24px] w-full text-[#73737E]"
          placeholder="Type a message..."
          value={value}
          onChange={onChange}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              sendButtonRef.current?.click();
            }
          }}
        />
        <div className="flex justify-between items-center w-full mt-[12px]">
          <p className="promt text-[#73737E] text-[12px]">
            Each prompt uses 1 token. You have {tokenRemaining} tokens remaining this month. Learn
            More
          </p>

          <div className="flex items-stretch gap-2 text-[#73737E] dark:text-[#e5e5ec]">
            <div className="flex-1">
              <RadioDropdown onChange={handleChangeModel} value={modelType} />
            </div>
            <button
              ref={sendButtonRef}
              className="flex-1 px-4 py-2 text-white bg-gradient-to-r from-[#7765FD] to-[#5d4ad1] rounded-lg shadow-md hover:opacity-90 focus:ring-2 focus:ring-[#7765FD]"
              onClick={sendMessage}
            >
              Go
            </button>
          </div>
        </div>
      </div> */}
      <div className="Section Narrow" id="SectionHomePresets">
        {isNewChat && (
          <div className="Content">
            <div className="Block ScrollContainer">
              <div className="">
                <div className="flex flex-row pt-[20px] gap-[1px]" id="HomePresets">
                  {prompts.map((p) => (
                    <div key={p.label} className="relative">
                      <Dropdown
                        label={p.label}
                        options={p.options}
                        onSelect={handleSelectPrompt}
                        onPress={() => handlePressPropmt(p)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              className="Block Disclaimer Centered PresetLink NoClose"
              onClick={() => {
                handlePressPropmt({
                  messages: `Why it is so important to lab-test your food and supplements for heavy metals,microbiology, glyphosate and other contaminants?`,
                });
              }}
            >
              Why it is so important to lab-test your food and supplements for heavy metals,
              microbiology, glyphosate and other contaminants?
            </div>
          </div>
        )}

        <div className="Section Narrow" id="SectionHomeDetails">
          <div className="Content">
            <div className="ChatNotice Centered z-1">
              <p>
                Enoch AI is experimental. These statements are not intended to diagnose, treat, or
                cure any medical condition. Please verify all important information and always seek
                advice from your doctor, healthcare professional, or naturopath before making any
                changes to your existing medication or health routine.
              </p>
            </div>
            {isNewChat && (
              <div className="Disclaimer Centered">
                <Link to="/Support/home">
                Visit our support area
                      </Link>
                {' '}
                for a detailed guide on using Enoch AI.
                <p>
                  <a href="Support/Terms">
                    Terms of Service
                  </a>{' '}
                  •{' '}
                  <a href="Support/Privacy">
                    Privacy Policy
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InputChat;
