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
    <div className="flex-1 w-full py-[24px]">
      <h1 className="text-2xl font-bold text-primary text-center text-[38px] font-[700] mb-[20px]">
        Chat History
      </h1>
      <p className="text-gray-600 dark:text-[#E5E5EC] text-center text-[14px]">
        Below is your chat history for the past 30 days. Chats older than this are no longer
        available.
      </p>

      <div className="flex flex-col flex-1 overflow-y-auto mt-[32px]">
        <ul className="space-y-2">
          {sessions.map((chat) => (
            <li
              key={chat.id}
              className={`group flex items-center justify-between p-2 cursor-pointer transition rounded-md hover:bg-white dark:hover:bg-background-dark text-black`}
              onClick={() => handleChatClick(chat)}
            >
              <span className={`text-[14px] font-[400] dark:text-text-dark text-[#252526]`}>
                {chat.title}
              </span>
              <div className="opacity-0 opacity-100 transition">
                <Trash
                  className="w-4 h-4 text-gray-400 hover:text-red-500 transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteId(chat.id);
                    setIsOpenConfirmDelete(true);
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Modal
        isOpen={isOpenConfirmDelete}
        title="Delete Chat"
        onClose={() => setIsOpenConfirmDelete(false)}
        customActions={
          <div className="flex justify-start space-x-3 p-4">
            <button
              onClick={handleDeleteChat}
              className=" flex items-center text-white bg-[#c2102b] hover:bg-[#d62d47] px-5 py-2 rounded-lg text-[14px]"
            >
              <TrashIcon className="w-[14px] h-[14px] mr-2" />
              <span>Delete</span>
            </button>
            <button
              onClick={() => setIsOpenConfirmDelete(false)}
              className="text-gray-700 bg-gray-200 hover:bg-gray-300 px-5 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        }
      >
        <span className="dark:text-white text-[14px]">
          Are you sure you want to delete this chat?
        </span>
      </Modal>
    </div>
  );
}

export default HistoryPage;
