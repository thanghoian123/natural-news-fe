import React, { useEffect, useRef, useState } from 'react';
import InputChat from './InputChat';
import { useDispatch, useSelector } from 'react-redux';
import Bubble from './Bubble';
import { setModelType } from '../redux/chatSlice';
import { usePrompt } from '../hooks/usePrompt';
import { useLocation, useNavigate } from 'react-router-dom';
import Dropdown from './Dropdown';

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
    messages: 'Give me advice about',
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

export default function Chatbox({
  onSendMessage,
  onRegenerateMessage,
  activeSession,
  disconnectWebSocket,
  isStreaming,
}) {
  const [input, setInput] = useState('');
  // const [isStreaming, setIsStreaming] = useState(false);
  const { sessions, isLoading, modelType, reward } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const chatEndRef = useRef(null);
  const activeChat = sessions.find((s) => s.id === activeSession);

  // ✅ Identify the last bot message for streaming
  const lastBotMessageIndex = activeChat?.history?.length - 1;
  const location = useLocation();
  const navigate = useNavigate();
  const [lastId, setLastId] = useState(new URLSearchParams(location.search).get('id'));

  const handleSendMessage = () => {
    if (!input.trim()) return;
    onSendMessage(input);
    setInput('');
  };

  useEffect(() => {
    const currentId = new URLSearchParams(location.search).get('id');
    if (lastId !== currentId) {
      if (isStreaming) {
        const confirmed = window.confirm(
          'A response is still streaming. Leaving now will charge a credit without completing the reply. Are you sure?'
        );
        if (!confirmed) {
          // User canceled → stay at previous id
          navigate(`/chat?id=${lastId}`, { replace: true });
          return;
        }
      }
      // update lastId if allowed
      setLastId(currentId);
    }
  }, [location.search, lastId, isStreaming, navigate]);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.history]);
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isStreaming) {
        event.preventDefault();
        event.returnValue =
          'You are in the middle of a response. Leaving now will charge a credit without completing the reply. Are you sure?';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isStreaming]);

  usePrompt(
    'A response is still streaming. Leaving now will charge a credit. Are you sure you want to leave?',
    isStreaming
  );

  const handlePress = (finalMessage) => {
    setInput(finalMessage); // Just set the input directly
  };

  const handleSelect = (value, prompt) => {
    handlePress(prompt, value);
  };

  const handleChangeModel = (option) => {
    dispatch(setModelType(option));
  };

  const isNewChat = !activeChat?.history.length;
  return (
    <>
      {isNewChat ? (
        <div className="UITable pt-[102px]">
          <div className="UICol UIMiddle">
            <div id="Canvas">
              <div className="Section Narrow" id="SectionHomeChat">
                <div className="Content">
                  {isNewChat && (
                    <>
                      <div className="Headline Centered">
                        <span className="UIColor">Hi, I'm Enoch.</span>{' '}
                        <span className="NoWrap">How can I help you?</span>
                      </div>
                      <div className="Block Text Centered">
                        Type in your health-related question and prompts or use one of the presets
                        below
                      </div>
                    </>
                  )}

                  <InputChat
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    sendMessage={handleSendMessage}
                    tokenRemaining={reward}
                    isNewChat={isNewChat}
                    handleSelectPrompt={handleSelect}
                    handlePressPropmt={handlePress}
                    handleChangeModel={handleChangeModel}
                    modelType={modelType}
                    disconnectWebSocket={disconnectWebSocket}
                    isStreaming={isStreaming}
                  />
                </div>
              </div>
              <div className="Section Narrow" id="SectionHomePresets">
                {isNewChat && (
                  <div className="Content">
                    <div className="Block ScrollContainer">
                      {/* <div class="ScrollBox"> */}
                      <div class="ScrollBox">
                        <div className="flex flex-row gap-[1px]" id="HomePresets">
                          {prompts.map((p) => (
                            <div key={p.label} className="relative">
                              <Dropdown
                                label={p.label}
                                options={p.options}
                                onSelect={(option) => {
                                  const needsQuestionMark = [2, 3].includes(p.id);
                                  let fullMessage = `${p.messages} ${option.value}`.trim();

                                  if (needsQuestionMark && !fullMessage.endsWith('?')) {
                                    fullMessage += '?';
                                  }

                                  handlePress(fullMessage); // ✅ Send clean full message only
                                }}
                                onPress={() => handlePress(p.messages)} // ⚠️ No option selected here
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div
                      className="Block Disclaimer Centered PresetLink NoClose"
                      onClick={() => {
                        handlePress({
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
                    <div className="ChatNotice Centered">
                      <p>
                        Enoch AI is experimental. These statements are not intended to diagnose,
                        treat, or cure any medical condition. Please verify all important
                        information and always seek advice from your doctor, healthcare
                        professional, or naturopath before making any changes to your existing
                        medication or health routine.
                      </p>
                    </div>
                    {isNewChat && (
                      <div className="Disclaimer Centered">
                        <a href="/Support/home" target="_blank" rel="noopener noreferrer">
                          Visit our support area
                        </a>{' '}
                        for a detailed guide on using Enoch AI.
                        <p>
                          <a href="Support/Terms" target="_blank" rel="noopener noreferrer">
                            Terms of Service
                          </a>{' '}
                          •{' '}
                          <a href="Support/Privacy" target="_blank" rel="noopener noreferrer">
                            Privacy Policy
                          </a>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full  h-screen px-[24px] py-4 items-center justify-center ">
          {/* Chat messages */}
          {!isNewChat && (
            <div className="overflow-y-auto p-4 space-y-2 h-[85vh] md:h-[80vh] w-full max-w-[720px] min-w-[300px]">
              {activeChat?.history.map((msg, index) => (
                <Bubble
                  key={index}
                  sender={msg.sender}
                  text={msg.text}
                  isLoading={
                    index === lastBotMessageIndex && isLoading && msg.sender === 'assistant'
                  }
                  isStreaming={
                    index === lastBotMessageIndex && msg.sender === 'assistant' && isStreaming
                  }
                  onRegenerateMessage={onRegenerateMessage}
                />
              ))}
              <div ref={chatEndRef} /> {/* Scroll anchor */}
            </div>
          )}

          {/* Chat input */}
          <div className="max-w-[720px] min-w-[300px] ">
            <InputChat
              value={input}
              onChange={(e) => setInput(e.target.value)}
              sendMessage={handleSendMessage}
              tokenRemaining={reward}
              isNewChat={isNewChat}
              handleSelectPrompt={handleSelect}
              handlePressPropmt={handlePress}
              handleChangeModel={handleChangeModel}
              modelType={modelType}
              isStreaming={isStreaming}
              disconnectWebSocket={disconnectWebSocket}
            />
          </div>
        </div>
      )}
    </>
  );
}
