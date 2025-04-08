import { useEffect, useRef, useCallback, useState } from 'react';
import { appendMessage, regenerateMessage } from '../redux/chatSlice';
import { useSelector } from 'react-redux';

export default function useWebSocket(activeSession, dispatch, userID) {
  const socketRef = useRef(null);
  const messageRef = useRef('');
  const reconnecting = useRef(false);
  const [url, setUrl] = useState('');
  const { serviceName } = useSelector((state) => state.chat);

  const getSocketUrl = (session, user, service) =>
    session ? `ws://127.0.0.1:8000/chats/ws/${service}/${user}/${session}` : null;

  const regenerateUrl = `ws://127.0.0.1:8000/chats/ws/${serviceName}/${activeSession}/regenerate`;
  const socketUrl = getSocketUrl(activeSession, userID, serviceName);

  useEffect(() => {
    if (activeSession && userID && serviceName) {
      setUrl(socketUrl);
    }
  }, [activeSession, userID, serviceName]);

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
          console.log('🚀 Streaming:', chunk);
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

  const onRegenerateMessage = async () => {
    disconnectWebSocket();
    setUrl(regenerateUrl);
    dispatch(regenerateMessage());
    setTimeout(
      () => socketRef.current?.readyState === WebSocket.OPEN && socketRef.current.send(''),
      500
    );
  };

  return {
    socketRef,
    disconnectWebSocket,
    connectWebSocket,
    reconnecting,
    onRegenerateMessage,
    setUrl,
    socketUrl,
  };
}
