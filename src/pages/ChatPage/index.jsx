import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChatBox from '../../components/Chatbox';
import {
  fetchChatSessions,
  sendMessage,
  setActiveSession,
  startNewSession,
} from '../../redux/chatSlice';
import useWebSocket from '../../hooks/useWebSocket';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

function ChatPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const chatID = searchParams.get('id');
  const initialMessage = location.state?.initialMessage || '';

  const { user } = useSelector((state) => state.user);
  const { sessions, activeSession } = useSelector((state) => state.chat);
  const activeChat = sessions.find((s) => s.id === activeSession);

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

  const hasFetchedSessions = useRef(false);

  const handleSendMessage = useCallback(
    (text) => {
      if (!chatID) {
        dispatch(startNewSession(user?.id)).then(({ payload }) => {
          const newChatID = payload?.id;
          if (newChatID) {
            navigate(`/chat?id=${newChatID}`, {
              state: { initialMessage: text },
            });
          }
        });
        return;
      }

      const isSocketReady = socketRef.current?.readyState === WebSocket.OPEN;

      if (!isSocketReady) {
        if (reconnecting.current) return;

        console.warn('WebSocket not ready. Reconnecting...');
        reconnecting.current = true;
        pendingMessage.current = { text };
        connectWebSocket(socketUrl);
        return;
      }

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
    [
      chatID,
      user?.id,
      socketRef,
      reconnecting,
      pendingMessage,
      connectWebSocket,
      socketUrl,
      dispatch,
      navigate,
    ]
  );

  // Set active session when chatID changes
  useEffect(() => {
    if (chatID) {
      dispatch(setActiveSession(chatID));
    }
  }, [chatID, dispatch]);

  // Handle initial message passed via navigation state
  useEffect(() => {
    if (initialMessage) {
      handleSendMessage(initialMessage);
      navigate(location.pathname + location.search, { replace: true, state: {} });
    }
  }, [initialMessage, handleSendMessage, location.pathname, location.search, navigate]);

  // Fetch chat sessions once, only after the first user message
  useEffect(() => {
    const isFirstMessage = activeChat?.title === 'New Chat' && activeChat?.history?.length === 2;

    const isSocketClosed =
      socketRef.current?.readyState === WebSocket.CLOSING ||
      socketRef.current?.readyState === WebSocket.CLOSED;

    if (isFirstMessage && isSocketClosed && !hasFetchedSessions.current) {
      hasFetchedSessions.current = true;
      dispatch(fetchChatSessions(user?.id));
    }
  }, [
    activeChat?.title,
    activeChat?.history?.length,
    socketRef?.current?.readyState,
    dispatch,
    user?.id,
  ]);

  // Reset fetch flag if chat is reset
  useEffect(() => {
    if (activeChat?.history?.length === 0) {
      hasFetchedSessions.current = false;
    }
  }, [activeChat?.history?.length]);

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
