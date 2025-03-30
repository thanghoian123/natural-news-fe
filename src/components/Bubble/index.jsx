import React, { useEffect, useState } from 'react';
import { Copy, RefreshCw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useToast } from '../../contexts/ToastContext';
import ChatSkeleton from './ChatSkeleton';

function Bubble({ sender, text, isStreaming, onRegenerateMessage, isLoading }) {
  const [streamedText, setStreamedText] = useState('');
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    if (!isStreaming) {
      setStreamedText(text);
      return;
    }

    if (index < [...text].length) {
      const timeout = setTimeout(() => {
        setStreamedText((prev) => prev + [...text][index]);
        setIndex(index + 1);
      }, 10);

      return () => clearTimeout(timeout);
    }
  }, [index, text, isStreaming]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      addToast('Copied to clipboard!', 'success');
    } catch (error) {
      addToast('Failed to copy text!', 'error');
      console.error('Failed to copy text:', error);
    }
  };

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
        {isLoading ? (
          <ChatSkeleton />
        ) : (
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{streamedText}</ReactMarkdown>
        )}
      </div>
      {sender !== 'user' && (
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity mt-2 dark:text-text-dark text-black">
          <button
            onClick={onRegenerateMessage}
            className="p-1 rounded-full hover:bg-gray-200 hover:text-background-dark transition"
          >
            <RefreshCw size={14} />
          </button>
          <button
            onClick={handleCopy}
            className="p-1 rounded-full hover:bg-gray-200 hover:text-background-dark transition relative"
          >
            <Copy size={14} />
            {copied && (
              <span className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 text-xs bg-gray-700 text-white px-2 py-1 rounded">
                Copied!
              </span>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default Bubble;
