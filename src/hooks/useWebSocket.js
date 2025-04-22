import { useEffect, useRef, useCallback, useState } from 'react';
import { appendMessage, regenerateMessage, sendMessage } from '../redux/chatSlice';
import { useSelector } from 'react-redux';
const wsUrl = 'ws://api-vip.naturalnews.com/chats/ws'; //import.meta.env.VITE_WS_URL;

export default function useWebSocket({ activeSession, dispatch, userID }) {
  const socketRef = useRef(null);
  const messageRef = useRef('');
  const pendingRegenerate = useRef(false);
  const pendingMessage = useRef(null);
  const reconnecting = useRef(false);
  const [url, setUrl] = useState('');
  const { modelType, toolName } = useSelector((state) => state.chat);
  const getSocketUrl = (chatId, userId, modelType, toolName) =>
    chatId ? `${wsUrl}/${modelType}/${userId}/${chatId}/${toolName}` : null;

  const socketUrl = getSocketUrl(activeSession, userID, modelType, toolName);
  const regenerateUrl = `${socketUrl}?regenerate=regenerate`;

  useEffect(() => {
    if (activeSession && userID) {
      setUrl(socketUrl);
    }
  }, [activeSession, userID, modelType, toolName]);

  useEffect(() => {
    if (url) connectWebSocket(url);
  }, [url]);

  const disconnectWebSocket = useCallback(() => {
    if (socketRef.current) {
      console.log('🔴 Closing WebSocket connection...');
      socketRef.current.close();
      socketRef.current = null;
      reconnecting.current = false;
    }
  }, []);

  const handleIncomingMessage = useCallback(
    (event) => {
      messageRef.current = event;
      const streamNextChunk = () => {
        if (!messageRef.current) return;

        const chunk = messageRef.current.slice(0, 10);
        messageRef.current = messageRef.current.slice(10);

        if (chunk) {
          dispatch(appendMessage({ sessionId: activeSession, text: chunk, sender: 'assistant' }));
          setTimeout(streamNextChunk, 500);
        }
      };
      streamNextChunk();
    },
    [dispatch, activeSession]
  );

  const connectWebSocket = useCallback(
    (newUrl) => {
      if (!newUrl) return;
      console.log(`🔄 Connecting WebSocket for session: ${activeSession}`);
      disconnectWebSocket();

      socketRef.current = new WebSocket(newUrl);
      socketRef.current.onopen = () => {
        console.log(`✅ WebSocket Connected: ${activeSession}`);

        reconnecting.current = false;

        if (pendingMessage.current) {
          socketRef.current.send(pendingMessage.current.text);
          dispatch(
            sendMessage({
              sessionId: activeSession,
              message: {
                sender: 'user',
                text: pendingMessage.current.text,
                createdAt: new Date().toISOString(),
              },
            })
          );
          pendingMessage.current = null;
        }
      };
      socketRef.current.onmessage = (event) => handleIncomingMessage(event.data);
      socketRef.current.onerror = (error) => console.error('❌ WebSocket Error:', error);
      socketRef.current.onclose = (event) =>
        console.log(`🔴 WebSocket Disconnected (Code: ${event.code}, Reason: ${event.reason})`);
    },
    [activeSession, disconnectWebSocket, handleIncomingMessage]
  );

  useEffect(() => {
    if (!activeSession) return;
    disconnectWebSocket();
    setTimeout(() => connectWebSocket(socketUrl), 100);
    return disconnectWebSocket;
  }, [activeSession, connectWebSocket, disconnectWebSocket, socketUrl]);

  const onRegenerateMessage = () => {
    disconnectWebSocket();
    pendingRegenerate.current = true;
    setUrl(regenerateUrl); // This triggers connectWebSocket via useEffect
    dispatch(regenerateMessage());
  };

  return {
    socketRef,
    disconnectWebSocket,
    connectWebSocket,
    reconnecting,
    onRegenerateMessage,
    setUrl,
    socketUrl,
    pendingMessage,
  };
}
