import React, { useEffect, useRef, useState } from 'react';
import InputChat from './InputChat';
import { useSelector } from 'react-redux';
import Bubble from './Bubble';

export default function Chatbox({ onSendMessage, onRegenerateMessage }) {
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const { sessions, activeSession } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const chatEndRef = useRef(null);
  const activeChat = sessions.find((s) => s.id === activeSession);

  // ✅ Identify the last bot message for streaming
  const lastBotMessageIndex = activeChat?.history?.length - 1;

  const handleSendMessage = () => {
    if (!input.trim() || !activeSession) return;
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

  return (
    <div className="flex flex-col w-full md:w-[100%] lg:w-[80%] h-full px-[24px] py-4">
      {/* Chat messages */}
      <div className="overflow-y-auto p-4 space-y-2 h-[85vh] md:h-[80vh]">
        {activeChat?.history.map((msg, index) => (
          <Bubble
            key={index}
            sender={msg.sender}
            text={msg.text}
            isStreaming={index === lastBotMessageIndex && msg.sender === 'assistant' && isStreaming} // ✅ Stream only last bot message
            onRegenerateMessage={onRegenerateMessage}
          />
        ))}
        <div ref={chatEndRef} /> {/* Scroll anchor */}
      </div>

      {/* Chat input */}
      <InputChat
        value={input}
        onChange={(e) => setInput(e.target.value)}
        sendMessage={handleSendMessage}
        tokenRemaining={user?.reward || 0}
      />

      <p className="text-center text-[10px] text-[#73737E] mt-2">
        Enoch AI is experimental. Please verify all important information and always consult with
        your doctor before taking medication or making any changes to your existing medication or
        health routine.
      </p>
    </div>
  );
}
