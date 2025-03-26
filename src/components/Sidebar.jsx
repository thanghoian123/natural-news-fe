/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Menu, X, Trash, PlusIcon, Moon, SunIcon, MoonIcon } from 'lucide-react'; // Icons
import logo from '../assets/logo.svg'; // Adjust path as needed
import { useDispatch, useSelector } from 'react-redux';
import { removeChatSession, setActiveSession, startNewSession } from '../redux/chatSlice';
import { useToast } from '../contexts/ToastContext';
import { useTheme } from '../contexts/ThemeContext';
import Modal from './Modal';
import ProfileDetail from './ProfileDetail';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const { addToast } = useToast();
  const { user } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const navigate = useNavigate();
  const { sessions, activeSession } = useSelector((state) => state.chat);

  const dispatch = useDispatch();
  const handleNewSession = () => {
    dispatch(startNewSession(user?.id));
  };

  // Function to remove chat
  const handleDeleteChat = async (id) => {
    const result = await dispatch(removeChatSession(id));
    if (removeChatSession.fulfilled.match(result)) {
      addToast('Chat deleted successfully!', 'success');
    } else {
      addToast('Failed to delete chat.', 'error');
    }
  };

  const handleChatClick = (chat) => {
    if (chat?.id) {
      dispatch(setActiveSession(chat.id));
      navigate(`/chat?id=${chat.id}`);
    }
  };

  return (
    <div className="flex w-full md:w-fit justify-between items-center bg-blend-exclusion dark:bg-blend-color-burn">
      {/* Sidebar */}
      <div
        className={`bg-[#F4F4FA] dark:bg-[#252526] p-5 transition-all md:relative md:w-64 flex flex-col h-screen ${
          isOpen ? 'fixed left-0 top-0 h-full w-[85%] z-50' : 'hidden md:flex'
        }`}
      >
        {/* Close Button (Small Screens) */}
        <button
          className="md:hidden absolute top-4 right-4 text-gray-600"
          onClick={() => setIsOpen(false)}
        >
          <X />
        </button>

        {/* Logo */}
        <div className="flex items-center space-x-2 mb-6">
          <img src={logo} alt="Logo" className="w-30" />
        </div>

        <button
          className="my-4 p-2 bg-gradient-to-r from-[#7765FD] to-[#5d4ad1] rounded-sm cursor-pointer text-white flex text-[12px] items-center"
          onClick={handleNewSession}
        >
          <PlusIcon />
          Add New Chat
        </button>

        {/* Chat History */}
        <div className="flex flex-col flex-1 overflow-y-auto chat-wrap">
          <h2 className="text-gray-400 text-sm mb-3">Recent Chats</h2>
          <ul className="space-y-2">
            {sessions.map((chat) => (
              <li
                key={chat.id}
                className={`group flex items-center justify-between p-2 cursor-pointer transition rounded-md ${
                  activeSession === chat.id
                    ? 'bg-gradient-to-r from-[#7765FD] to-[#5d4ad1] text-white'
                    : 'hover:bg-white dark:hover:bg-background-dark text-black'
                }`}
                onClick={() => handleChatClick(chat)}
              >
                <span
                  className={`text-[14px] font-[400] dark:text-text-dark text-[#252526] ${activeSession === chat.id && `text-white`}`}
                >
                  {chat.title}
                </span>
                <div className="opacity-0 group-hover:opacity-100 transition">
                  <Trash
                    className="w-4 h-4 text-gray-400 hover:text-red-500 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteChat(chat.id);
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Theme Toggle Button (Placed at the end) */}
        <div
          className="flex items-center rounded-md hover:bg-white dark:hover:bg-background-dark p-[5px]"
          onClick={() => setIsOpenModal(true)}
        >
          <div class="relative inline-flex items-center justify-center w-[32px] h-[32px] overflow-hidden bg-primary-700 rounded-full dark:bg-gray-600">
            <span class="font-medium text-gray-600 dark:text-gray-300">JL</span>
          </div>

          <div className="flex flex-col pl-[10px]">
            <p className="text-black dark:text-white text-[14px]">View Profile</p>

            <p className="text-[#73737E] text-[12px]">{user?.email || ''}</p>
          </div>

          {/* <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-primary-700 text-white dark:bg-gray-800 mt-auto"
          >
            {theme === 'light' ? <MoonIcon size={20} /> : <SunIcon size={20} />}
          </button> */}
        </div>
      </div>

      {/* Mobile Toggle Button */}
      <button className="md:hidden p-2" onClick={() => setIsOpen(true)}>
        <Menu className="text-gray-600" />
      </button>

      <button
        className="md:hidden mx-2 my-4 p-2 bg-gradient-to-r from-[#7765FD] to-[#5d4ad1] rounded-sm cursor-pointer"
        onClick={handleNewSession}
      >
        <PlusIcon className="text-white" />
      </button>

      {/* Backdrop for small screens */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <Modal isOpen={isOpenModal} title="Profile" onClose={() => setIsOpenModal(false)}>
        <ProfileDetail user={user} />
      </Modal>
    </div>
  );
}
