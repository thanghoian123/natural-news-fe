import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeChatSession, setActiveSession } from '../../redux/chatSlice';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../contexts/ToastContext';
import { Trash, TrashIcon } from 'lucide-react'; // Icons
import Modal from '../../components/Modal';

function HistoryPage() {
  const { sessions } = useSelector((state) => state.chat);
  const { addToast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState('');
  const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);

  const handleChatClick = (chat) => {
    if (chat?.id) {
      dispatch(setActiveSession(chat.id));
      navigate(`/chat?id=${chat.id}`);
    }
  };

  const handleDeleteChat = async () => {
    if (deleteId) {
      const result = await dispatch(removeChatSession(deleteId));
      if (removeChatSession.fulfilled.match(result)) {
        addToast('Chat deleted successfully!', 'success');
        navigate(`/chat`);
      } else {
        addToast('Failed to delete chat.', 'error');
      }
    } else {
      addToast('Chat is not exist', 'error');
    }
    setIsOpenConfirmDelete(false);
  };

  return (
    <div className="z-100 pt-[102px]">
      <div class="UITable ">
        <div class="UICol">
          <div class="Questionnaire">
            <div class="Block Headline Centered">Chat History</div>
            <div class="Text Centered">
              Below is your chat history for the past 30 days. Chats older than this are no longer
              available.
            </div>
            <div class="HistoryBox">
              {sessions.map((chat) => (
                <div class="ChatTitle TitleUpdate NoClose" id="9" key={chat.id}>
                  <div class="Auto">
                    <div class="AutoCol ChatText" onClick={() => handleChatClick(chat)}>
                      <a href="Chat/?id=9">
                        <span class="Clamp1">{chat?.title}</span>
                      </a>
                    </div>
                    <div
                      class="AutoCol ChatOptions"
                      onClick={(e) => {
                        console.log('🚀 ~ HistoryPage ~ e:', chat.id);
                        e.stopPropagation();
                        setDeleteId(chat.id);
                        setIsOpenConfirmDelete(true);
                      }}
                    >
                      <div class="ButtonIcon ButtonIconSmall ButtonChatDelete" title="Delete">
                        <div class="Icon">
                          <span class="Mask MaskDelete"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Modal isOpen={isOpenConfirmDelete} onClose={() => setIsOpenConfirmDelete(false)}>
          <div class="Card">
            <div class="Subhead">Delete Chat?</div>
            <div class="Block Text">Are you sure you want to delete this chat?</div>

            <div class="ButtonBox ButtonBox ButtonBoxLeft">
              <button
                class="Button ButtonAuto ButtonAutoLeft ButtonRed ButtonDelete"
                onClick={handleDeleteChat}
              >
                <div class="Auto">
                  <div class="AutoCol AutoIcon">
                    <div class="Icon IconSmall">
                      <span class="Mask MaskDelete"></span>
                    </div>
                  </div>
                  <div class="AutoCol AutoLabel">Delete</div>
                </div>
              </button>
              <button
                class="Button ButtonGray ButtonClose"
                onClick={() => setIsOpenConfirmDelete(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default HistoryPage;
