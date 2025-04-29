import React, { useEffect, useRef, useState } from 'react';
import InputChat from './InputChat';
import { useDispatch, useSelector } from 'react-redux';
import Bubble from './Bubble';
import { setModelType } from '../redux/chatSlice';
import { usePrompt } from '../hooks/usePrompt';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Chatbox({
  onSendMessage,
  onRegenerateMessage,
  activeSession,
  disconnectWebSocket,
  isStreaming,
}) {
  console.log('🚀 ~ isStreaming:----------------', isStreaming);
  const [input, setInput] = useState('');
  // const [isStreaming, setIsStreaming] = useState(false);
  const { sessions, isLoading, modelType } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
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
        const confirmed = window.confirm('A response is still streaming. Leaving now will charge a credit without completing the reply. Are you sure?');
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
        event.returnValue = 'You are in the middle of a response. Leaving now will charge a credit without completing the reply. Are you sure?';
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

  const handlePress = (prompt) => {
    setInput(prompt.messages);
  };

  const handleSelect = (option) => {
    setInput((pre) => `${pre} ${option.label}`);
  };

  const handleChangeModel = (option) => {
    dispatch(setModelType(option));
  };

  const isNewChat = !activeChat?.history.length;
  return (
    <>
      {isNewChat ? (
        <div className="UITable">
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
                    tokenRemaining={user?.reward || 0}
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
              tokenRemaining={user?.reward || 0}
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
