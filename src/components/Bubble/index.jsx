import React, { useEffect, useState } from 'react';
import { Copy, RefreshCw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useToast } from '../../contexts/ToastContext';
import ChatSkeleton from './ChatSkeleton';
import emoji from 'emoji-dictionary'; // <-- Install this if not already

function EmojiText({ children }) {
  const flattenChildren = (children) => {
    if (Array.isArray(children)) {
      return children.map(flattenChildren).join('');
    } else if (typeof children === 'string') {
      return children;
    } else if (typeof children === 'object' && children?.props?.children) {
      return flattenChildren(children.props.children);
    } else {
      return '';
    }
  };

  const text = flattenChildren(children);
  const parsed = text.replace(
    /:([a-zA-Z0-9_+-]+):/g,
    (match, name) => emoji.getUnicode(name) || match
  );

  return <>{parsed}</>;
}

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
      }, 5);

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
            ? 'dark:bg-[#7765FD] bg-ui-bg !text-white rounded-l-lg rounded-br-lg'
            : 'text-white rounded-r-lg rounded-bl-lg'
        }`}
        style={{ whiteSpace: 'pre-wrap' }}
      >
        {isLoading ? (
          <ChatSkeleton />
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ children }) => (
                <p>
                  <EmojiText>{children}</EmojiText>
                </p>
              ),
              li: ({ children }) => (
                <li className="list-disc ml-6">
                  <EmojiText>{children}</EmojiText>
                </li>
              ),
              h1: ({ children }) => (
                <h1 className="text-2xl font-bold">
                  <EmojiText>{children}</EmojiText>
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-xl font-semibold">
                  <EmojiText>{children}</EmojiText>
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-lg font-medium">
                  <EmojiText>{children}</EmojiText>
                </h3>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 pl-4 italic text-gray-600">
                  <EmojiText>{children}</EmojiText>
                </blockquote>
              ),
              td: ({ children }) => (
                <td className="border px-2 py-1">
                  <EmojiText>{children}</EmojiText>
                </td>
              ),
              th: ({ children }) => (
                <th className="border px-2 py-1 font-bold">
                  <EmojiText>{children}</EmojiText>
                </th>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  <EmojiText>{children}</EmojiText>
                </a>
              ),
              code: ({ children }) => (
                <code className="bg-gray-100 p-1 rounded text-sm font-mono">
                  {/* Do NOT EmojiText here */}
                  {children}
                </code>
              ),
            }}
          >
            {streamedText}
          </ReactMarkdown>
        )}
      </div>
      {sender !== 'user' && (
  <div className="flex gap-1 transition-opacity mt-2 dark:text-text-dark text-black">
    {/* Copy Button */}
    <div
      onClick={handleCopy}
      title="Copy Text to Clipboard"
      className="ButtonIcon ButtonIconSmall ButtonCopy NoClose p-1 rounded-full hover:bg-gray-200 hover:text-background-dark transition relative"
    >
      <div className="Icon">
        <span className="Mask MaskCopy"></span>
      </div>
      {copied && (
        <span className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 text-xs bg-gray-700 text-white px-2 py-1 rounded">
          Copied!
        </span>
      )}
    </div>

    {/* Regenerate Button */}
    <div
      onClick={onRegenerateMessage}
      title="Regenerate"
      className="ButtonIcon ButtonIconSmall ButtonRegenerate NoClose p-1 rounded-full hover:bg-gray-200 hover:text-background-dark transition"
    >
      <div className="Icon">
        <span className="Mask MaskRegenerate"></span>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

export default Bubble;
