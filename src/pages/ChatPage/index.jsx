import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChatBox from '../../components/Chatbox';
import { sendMessage, setActiveSession, startNewSession } from '../../redux/chatSlice';
import useWebSocket from '../../hooks/useWebSocket';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import InputChat from '../../components/InputChat';
function ChatPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const chatID = searchParams.get('id'); // "JohnDoe"
  const {
    reconnecting,
    socketRef,
    connectWebSocket,
    onRegenerateMessage,
    socketUrl,
    pendingMessage,
    disconnectWebSocket,
    isStreaming,
  } = useWebSocket({
    activeSession: chatID,
    dispatch,
    userID: user?.id,
  });
  const location = useLocation();
  const initialMessage = location.state?.initialMessage || '';

  const handleSendMessage = useCallback(
    (text) => {
      if (!chatID) {
        dispatch(startNewSession(user?.id)).then(({ payload }) => {
          const chatID = payload?.id;
          if (chatID) {
            navigate(`/chat?id=${chatID}`, { state: { initialMessage: text } });
          }
        });
        return;
      }

      const isSocketReady = socketRef.current?.readyState === WebSocket.OPEN;

      if (!isSocketReady) {
        if (reconnecting.current) return;

        console.log('⚠️ WebSocket not ready, reconnecting and queuing message...');
        reconnecting.current = true;
        pendingMessage.current = { text };
        connectWebSocket(socketUrl);
        return;
      }

      // Send immediately if socket is open
      socketRef.current.send(text);
      dispatch(
        sendMessage({
          sessionId: chatID,
          message: {
            sender: 'user',
            text,
            createdAt: new Date().toISOString(),
          },
        })
      );
    },
    [socketRef, dispatch, chatID, connectWebSocket]
  );

  useEffect(() => {
    if (chatID) {
      dispatch(setActiveSession(chatID));
    }
  }, [chatID]);

  useEffect(() => {
    if (initialMessage) {
      handleSendMessage(initialMessage);
      navigate(location.pathname + location.search, { replace: true, state: {} });
    }
  }, [initialMessage]);

  return (
    <ChatBox
      onSendMessage={handleSendMessage}
      onRegenerateMessage={onRegenerateMessage}
      activeSession={chatID}
      socketRef={socketRef}
      disconnectWebSocket={disconnectWebSocket}
      isStreaming={isStreaming}
    />
  );
}

export default ChatPage;
