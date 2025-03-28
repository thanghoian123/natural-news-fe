import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChatBox from '../../components/Chatbox';
import { sendMessage, setActiveSession, startNewSession } from '../../redux/chatSlice';
import useWebSocket from '../../hooks/useWebSocket';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
function ChatPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const chatID = searchParams.get('id'); // "JohnDoe"
  const { reconnecting, socketRef, connectWebSocket, onRegenerateMessage, socketUrl } =
    useWebSocket(chatID, dispatch, user?.id);
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
      } else {
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
                  sessionId: chatID,
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
            sessionId: chatID,
            message: {
              sender: 'user',
              text,
              createdAt: new Date().toISOString(),
            },
          })
        );
      }
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
    }
  }, [initialMessage]);

  return <ChatBox onSendMessage={handleSendMessage} onRegenerateMessage={onRegenerateMessage} />;
}

export default ChatPage;
