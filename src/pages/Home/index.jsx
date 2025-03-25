import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../../components/Sidebar';
import ChatBox from '../../components/Chatbox';
import { fetchChatSessions, sendMessage } from '../../redux/chatSlice';
import useWebSocket from '../../hooks/useWebSocket';
function HomePage() {
  const dispatch = useDispatch();
  const activeSession = useSelector((state) => state.chat.activeSession);
  const { reconnecting, socketRef, disconnectWebSocket, connectWebSocket } = useWebSocket(
    activeSession,
    dispatch
  );

  useEffect(() => {
    dispatch(fetchChatSessions());
  }, [dispatch]);

  const handleSendMessage = useCallback(
    (text) => {
      if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
        if (reconnecting.current) return;

        console.log('⚠️ WebSocket is not open, reconnecting...');
        reconnecting.current = true;
        connectWebSocket();

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
      <div className="flex flex-col items-baseline md:flex-row md:items-start">
        <Sidebar disconnectWebSocket={disconnectWebSocket} />
        <div className="px-2 md:px-14 flex-1 flex justify-center">
          <ChatBox onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
