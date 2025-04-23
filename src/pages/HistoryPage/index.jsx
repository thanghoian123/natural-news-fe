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
      } else {
        addToast('Failed to delete chat.', 'error');
      }
    } else {
      addToast('Chat is not exist', 'error');
    }
    setIsOpenConfirmDelete(false);
  };

  return (
    // <div className="flex-1 w-full py-[24px]">
    //   <h1 className="text-2xl font-bold text-primary text-center text-[38px] font-[700] mb-[20px]">
    //     Chat History
    //   </h1>
    //   <p className="text-gray-600 dark:text-[#E5E5EC] text-center text-[14px]">
    //     Below is your chat history for the past 30 days. Chats older than this are no longer
    //     available.
    //   </p>

    //   <div className="flex flex-col flex-1 overflow-y-auto mt-[32px] items-center">
    //     <ul className="space-y-2 w-[500px] max-w-[70%] ">
    //       {sessions.map((chat) => (
    //         <li
    //           key={chat.id}
    //           className={`group flex items-center justify-between p-2 cursor-pointer transition rounded-md hover:bg-white dark:hover:bg-background-dark text-black`}
    //           onClick={() => handleChatClick(chat)}
    //         >
    //           <span className={`text-[14px] font-[400] dark:text-text-dark text-[#252526]`}>
    //             {chat.title}
    //           </span>
    //           <div className="opacity-100 transition">
    //             <Trash
    //               className="w-4 h-4 text-gray-400 hover:text-red-500 transition"
    //               onClick={(e) => {
    //                 e.stopPropagation();
    //                 setDeleteId(chat.id);
    //                 setIsOpenConfirmDelete(true);
    //               }}
    //             />
    //           </div>
    //         </li>
    //       ))}
    //     </ul>
    //   </div>

    // </div>

    <div class="UITable">
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
            <button class="Button ButtonAuto ButtonAutoLeft ButtonRed ButtonDelete">
              <div class="Auto">
                <div class="AutoCol AutoIcon">
                  <div class="Icon IconSmall">
                    <span class="Mask MaskDelete"></span>
                  </div>
                </div>
                <div class="AutoCol AutoLabel" onClick={handleDeleteChat}>
                  Delete
                </div>
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
  );
}

export default HistoryPage;
