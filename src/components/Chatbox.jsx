import React, { useEffect, useRef, useState } from 'react';
import InputChat from './InputChat';
import { useDispatch, useSelector } from 'react-redux';
import Bubble from './Bubble';
import { setModelType } from '../redux/chatSlice';

export default function Chatbox({ onSendMessage, onRegenerateMessage, activeSession }) {
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const { sessions, isLoading, modelType } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const chatEndRef = useRef(null);
  const activeChat = sessions.find((s) => s.id === activeSession);

  // ✅ Identify the last bot message for streaming
  const lastBotMessageIndex = activeChat?.history?.length - 1;

  const handleSendMessage = () => {
    if (!input.trim()) return;
    onSendMessage(input);
    setIsStreaming(true);
    setInput('');
  };

  useEffect(() => {
    if (activeSession) {
      setIsStreaming(false);
    }
  }, [activeSession]);

  // ✅ Auto-scroll to the latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.history]);

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
    <div className="flex flex-col w-full md:w-[100%] lg:w-[90%] h-screen px-[24px] py-4 items-center justify-center">
      {/* Chat messages */}
      {!isNewChat && (
        <div className="overflow-y-auto p-4 space-y-2 h-[85vh] md:h-[80vh] w-full">
          {activeChat?.history.map((msg, index) => (
            <Bubble
              key={index}
              sender={msg.sender}
              text={msg.text}
              isLoading={index === lastBotMessageIndex && isLoading && msg.sender === 'assistant'}
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
      />

      <p className="text-center text-[10px] text-[#73737E] mt-2">
        Enoch AI is experimental. Please verify all important information and always consult with
        your doctor before taking medication or making any changes to your existing medication or
        health routine.
      </p>
    </div>
  );
}
