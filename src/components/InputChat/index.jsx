import React, { useRef } from 'react';
import { Paperclip, Settings } from 'lucide-react';
import Dropdown from '../Dropdown';
import RadioDropdown from '../RadioDropdown';

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
        { label: 'Dashboard', value: 'dashboard' },
        { label: 'Settings', value: 'settings' },
        { label: 'Earnings', value: 'earnings' },
        { label: 'Sign out', value: 'signout' },
      ],
    },
    {
      id: 2,
      messages: 'What are the benefits of',
      label: 'What are the benefits',
      options: [
        { label: 'Dashboard', value: 'dashboard' },
        { label: 'Settings', value: 'settings' },
        { label: 'Earnings', value: 'earnings' },
        { label: 'Sign out', value: 'signout' },
      ],
    },
    {
      id: 3,
      messages: 'What are the dangers of',
      label: 'What are the dangers',
      options: [
        { label: 'Dashboard', value: 'dashboard' },
        { label: 'Settings', value: 'settings' },
        { label: 'Earnings', value: 'earnings' },
        { label: 'Sign out', value: 'signout' },
      ],
    },
    {
      id: 4,
      messages: 'Give me advice',
      label: 'Give me advice about',
      options: [
        { label: 'Dashboard', value: 'dashboard' },
        { label: 'Settings', value: 'settings' },
        { label: 'Earnings', value: 'earnings' },
        { label: 'Sign out', value: 'signout' },
      ],
    },
    {
      id: 5,
      label: 'Summarize',
      messages: 'Summarize',
      options: [
        // { label: 'Dashboard', value: 'dashboard' },
        // { label: 'Settings', value: 'settings' },
        // { label: 'Earnings', value: 'earnings' },
        // { label: 'Sign out', value: 'signout' },
      ],
    },
  ];

  return (
    <div className="w-full md:w-[80%] lg:w-[60%] m-auto">
      <div className="p-3 bg-[#F4F4FA] dark:bg-[#252526] flex items-center flex-col  rounded-2xl border-primary border-1 border-primary ">
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
      </div>
      {isNewChat && (
        <div className="flex justify-around gap-2 mt-4 flex-wrap">
          {prompts.map((p) => (
            <div className="flex-1">
              <Dropdown
                label={p.label}
                options={p.options}
                onSelect={handleSelectPrompt}
                onPress={() => handlePressPropmt(p)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default InputChat;
