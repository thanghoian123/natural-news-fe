import React, { useEffect, useState } from 'react';
import { Copy, RefreshCw } from 'lucide-react';

function Bubble({ sender, text, isStreaming, onRegenerate, handleCopy }) {
  const [streamedText, setStreamedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!isStreaming) {
      setStreamedText(text);
      return;
    }

    if (index < [...text].length) {
      const timeout = setTimeout(() => {
        setStreamedText((prev) => prev + [...text][index]);
        setIndex(index + 1);
      }, 30);

      return () => clearTimeout(timeout);
    }
  }, [index, text, isStreaming]);

  return (
    <div className={`w-fit max-w-[80%] group ${sender === 'user' ? 'ml-auto' : ''}`}>
      <div
        className={`p-3 ${
          sender === 'user'
            ? 'bg-[#7765FD] text-white rounded-l-lg rounded-br-lg'
            : 'dark:text-text-dark text-black rounded-r-lg rounded-bl-lg'
        }`}
        style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}
      >
        {streamedText}
      </div>
      {sender !== 'user' && (
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity mt-2 dark:text-text-dark text-black">
          <button
            onClick={onRegenerate}
            className="p-1 rounded-full hover:bg-gray-200 hover:text-background-dark transition"
          >
            <RefreshCw size={14} />
          </button>
          <button
            onClick={handleCopy}
            className="p-1 rounded-full hover:bg-gray-200 hover:text-background-dark transition"
          >
            <Copy size={14} />
          </button>
        </div>
      )}
    </div>
  );
}

export default Bubble;
