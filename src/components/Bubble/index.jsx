import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useToast } from '../../contexts/ToastContext';
import ChatSkeleton from './ChatSkeleton';
import emoji from 'emoji-dictionary'; // <-- Make sure it's installed

function EmojiText({ children }) {
  const renderText = (child) => {
    if (typeof child === 'string') {
      return child.replace(
        /:([a-zA-Z0-9_+-]+):/g,
        (match, name) => emoji.getUnicode(name) || match
      );
    } else if (Array.isArray(child)) {
      return child.map(renderText);
    }
    return child;
  };

  return <>{React.Children.map(children, renderText)}</>;
}

function Bubble({ sender, text, onRegenerateMessage, isLoading, tier = 'Silver' }) {
  // const [streamedText, setStreamedText] = useState('');
  const [copied, setCopied] = useState(false);
  const { addToast } = useToast();
  const [showPopup, setShowPopup] = useState(false);
  const streamedText = text; // useAnimateText(text, { enabled: false });

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
      >
        {isLoading ? (
          <ChatSkeleton />
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ children }) => (
                <p className="mb-2 whitespace-pre-wrap">
                  <EmojiText>{children}</EmojiText>
                </p>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside ml-6 leading-normal">{children}</ol>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside ml-6 leading-normal">{children}</ul>
              ),
              li: ({ children }) => (
                <li>
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
                <code className="bg-gray-100 p-1 rounded text-sm font-mono">{children}</code>
              ),
            }}
            skipHtml={false}
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
            className="ButtonIcon ButtonIconSmall ButtonCopy NoClose rounded-full hover:bg-gray-200 hover:text-background-dark transition relative"
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
            onClick={() => {
              if (tier === 'Platinum') {
                onRegenerateMessage();
              } else {
                setShowPopup(true);
              }
            }}
            title="Regenerate"
            className="ButtonIcon ButtonIconSmall ButtonRegenerate NoClose rounded-full hover:bg-gray-200 hover:text-background-dark transition"
          >
            <div className="Icon">
              <span className="Mask MaskRegenerate"></span>
            </div>
          </div>
        </div>
      )}

      {/* Popup Modal */}
      {showPopup && (
        <div className="Popup USN" id="PopupRegenerate">
          <div className="PopupTable">
            <div className="PopupCol">
              <div className="Content NoClose">
                <div
                  className="ButtonIcon Close SubscribePopupClose"
                  title="Close"
                  onClick={() => setShowPopup(false)}
                >
                  <div className="Icon">
                    <span className="Mask MaskClose"></span>
                  </div>
                </div>
                <div className="Card">
                  <div className="Subhead">Are You Sure?</div>
                  <div className="Block Text">
                    Regenerating a response will use 1 question from your account.
                  </div>
                  <div className="ButtonBox ButtonBoxLeft">
                    <button
                      className="Button ButtonGray ButtonClose"
                      onClick={() => setShowPopup(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="Button ButtonAuto ButtonAutoLeft ButtonPrimary ButtonClose"
                      onClick={() => {
                        setShowPopup(false);
                        onRegenerateMessage();
                      }}
                    >
                      <div className="Auto">
                        <div className="AutoCol AutoIcon">
                          <div className="Icon IconSmall">
                            <span className="Mask MaskAI"></span>
                          </div>
                        </div>
                        <div className="AutoCol AutoLabel">Regenerate</div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bubble;
