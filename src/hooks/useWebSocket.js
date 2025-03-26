import { useEffect, useRef, useCallback, useState } from 'react';
import { appendMessage, regenerateMessage } from '../redux/chatSlice';

export default function useWebSocket(activeSession, dispatch, userID) {
  const socketRef = useRef(null);
  const messageRef = useRef('');
  const reconnecting = useRef(false);
  const [url, setUrl] = useState('');

  const regenerateUrl = `ws://127.0.0.1:8000/chats/ws/ingredients-checker/${activeSession}/regenerate`;
  const socketUrl = activeSession
    ? `ws://127.0.0.1:8000/chats/ws/ingredients-checker/${userID}/${activeSession}`
    : null;

  useEffect(() => {
    if (activeSession && userID) {
      setUrl(socketUrl);
    }
  }, [activeSession, userID]);

  useEffect(() => {
    if (url) {
      connectWebSocket(url);
    }
  }, [url]);

  const onRegenerateMessage = async () => {
    disconnectWebSocket();
    setUrl(regenerateUrl);
    dispatch(regenerateMessage());
    // Wait a bit for WebSocket to reconnect before sending a message
    setTimeout(() => {
      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.send('');
      }
    }, 500);
  };

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
      console.log('📩 Received:', event);
      messageRef.current = event;

      const streamNextChunk = () => {
        if (!messageRef.current) return;

        const chunkSize = 10;
        const chunk = messageRef.current.slice(0, chunkSize);
        messageRef.current = messageRef.current.slice(chunkSize);

        if (chunk) {
          console.log('🚀 Streaming:', chunk);

          dispatch(
            appendMessage({
              sessionId: activeSession,
              text: chunk,
              sender: 'assistant',
            })
          );

          setTimeout(streamNextChunk, 500);
        }
      };

      streamNextChunk();
    },
    [dispatch, activeSession, userID]
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

      socketRef.current.onclose = (event) => {
        console.log(`🔴 WebSocket Disconnected (Code: ${event.code}, Reason: ${event.reason})`);
      };
    },
    [activeSession, disconnectWebSocket, handleIncomingMessage, userID]
  );

  useEffect(() => {
    if (!activeSession) return;

    disconnectWebSocket();
    setTimeout(() => connectWebSocket(socketUrl), 100);

    return () => disconnectWebSocket();
  }, [activeSession, connectWebSocket, disconnectWebSocket, userID]);

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
