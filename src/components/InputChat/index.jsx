import React, { useRef } from 'react';
import { Paperclip } from 'lucide-react';

function InputChat(props) {
  const { value, onChange, sendMessage, tokenRemaining = 0 } = props;
  const sendButtonRef = useRef(null); // Tạo ref cho nút gửi

  return (
    <div className="p-3 bg-[#F4F4FA] dark:bg-[#252526] flex items-center flex-col w-full rounded-2xl">
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

        <div className="flex items-center text-[#73737E] dark:text-[#e5e5ec]">
          <Paperclip className="mr-2" />

          <button
            ref={sendButtonRef} // Gán ref vào nút
            className="px-4 py-2 text-white bg-gradient-to-r from-[#7765FD] to-[#5d4ad1] rounded-lg shadow-md hover:opacity-90 focus:ring-2 focus:ring-[#7765FD]"
            onClick={sendMessage}
          >
            Go
          </button>
        </div>
      </div>
    </div>
  );
}

export default InputChat;
