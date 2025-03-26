import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../../components/Sidebar';
import ChatBox from '../../components/Chatbox';
import { fetchChatSessions, sendMessage } from '../../redux/chatSlice';
import useWebSocket from '../../hooks/useWebSocket';
import { fetchUser } from '../../redux/userSlice';
import { useSearchParams } from 'react-router-dom';
function ChatPage() {
  const dispatch = useDispatch();
  const activeSession = useSelector((state) => state.chat.activeSession);
  const { user } = useSelector((state) => state.user);
  const [searchParams] = useSearchParams();

  const chatID = searchParams.get('id'); // "JohnDoe"
  console.log('🚀 ~ ChatPage ~ chatID:', chatID);
  const {
    reconnecting,
    socketRef,
    disconnectWebSocket,
    connectWebSocket,
    onRegenerateMessage,
    socketUrl,
  } = useWebSocket(activeSession, dispatch, user?.id);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchChatSessions(user.id));
    }
  }, [user]);

  const handleSendMessage = useCallback(
    (text) => {
      if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
        if (reconnecting.current) return;

        console.log('⚠️ WebSocket is not open, reconnecting...');
        reconnecting.current = true;
        connectWebSocket(socketUrl);

        setTimeout(() => {
          reconnecting.current = false;
          if (socketRef.current?.readyState === WebSocket.OPEN) {
            console.log('📤 Sending (after reconnect):', text);
            socketRef.current.send(text);
            dispatch(
              sendMessage({
                sessionId: activeSession,
                message: {
                  sender: 'user',
                  text,
                  createdAt: new Date().toISOString(),
                },
              })
            );
          } else {
            console.error('❌ Failed to send message after reconnect.');
          }
        }, 500);
        return;
      }

      console.log('📤 Sending:', text);
      socketRef.current.send(text);
      dispatch(
        sendMessage({
          sessionId: activeSession,
          message: {
            sender: 'user',
            text,
            createdAt: new Date().toISOString(),
          },
        })
      );
    },
    [socketRef, dispatch, activeSession, connectWebSocket]
  );

  return (
    <div className="bg-white dark:bg-background-dark">
      <div className="flex flex-col md:flex-row md:items-start">
        <Sidebar disconnectWebSocket={disconnectWebSocket} />
        <div className="px-2 md:px-14 flex-1 flex justify-center">
          <ChatBox onSendMessage={handleSendMessage} onRegenerateMessage={onRegenerateMessage} />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
