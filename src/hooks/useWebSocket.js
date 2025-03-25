import { useEffect, useRef, useCallback } from 'react';
import { appendMessage } from '../redux/chatSlice';

export default function useWebSocket(activeSession, dispatch) {
  const socketRef = useRef(null);
  const messageRef = useRef('');
  const reconnecting = useRef(false);

  const socketUrl = activeSession ? `ws://127.0.0.1:8000/chats/ws/llm/${activeSession}` : null;

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
    [dispatch, activeSession]
  );

  const connectWebSocket = useCallback(() => {
    if (!socketUrl) return;
    console.log(`🔄 Connecting WebSocket for session: ${activeSession}`);

    disconnectWebSocket();

    socketRef.current = new WebSocket(socketUrl);

    socketRef.current.onopen = () => {
      console.log(`✅ WebSocket Connected: ${activeSession}`);
      reconnecting.current = false;
    };

    socketRef.current.onmessage = (event) => handleIncomingMessage(event.data);

    socketRef.current.onerror = (error) => console.error('❌ WebSocket Error:', error);

    socketRef.current.onclose = (event) => {
      console.log(`🔴 WebSocket Disconnected (Code: ${event.code}, Reason: ${event.reason})`);
    };
  }, [socketUrl, activeSession, disconnectWebSocket, handleIncomingMessage]);

  useEffect(() => {
    if (!activeSession) return;

    disconnectWebSocket();
    setTimeout(() => connectWebSocket(), 100);

    return () => disconnectWebSocket();
  }, [activeSession, connectWebSocket, disconnectWebSocket]);

  return { socketRef, disconnectWebSocket, connectWebSocket, reconnecting };
}
