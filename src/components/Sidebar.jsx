/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Menu, X, Trash, PlusIcon, Sparkle, TrashIcon, Clock } from 'lucide-react'; // Icons
import logo from '../assets/logo.svg'; // Adjust path as needed
import { useDispatch, useSelector } from 'react-redux';
import { removeChatSession, setActiveSession, startNewSession } from '../redux/chatSlice';
import { useToast } from '../contexts/ToastContext';
import Modal from './Modal';
import ProfileDetail from './ProfileDetail';
import { useNavigate } from 'react-router-dom';

export default function Sidebar({ children }) {
  const { addToast } = useToast();
  const { user } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false); // Toggle menu
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const isBronze = user?.tier === 'Bronze';

  const navigate = useNavigate();
  const { sessions, activeSession } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  const handleNewSession = () => {
    dispatch(startNewSession(user?.id)).then(({ payload }) => {
      const chatID = payload?.id;
      if (chatID) {
        navigate(`/chat?id=${chatID}`);
      }
    });
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

  const handleChatClick = (chat) => {
    if (chat?.id) {
      dispatch(setActiveSession(chat.id));
      navigate(`/chat?id=${chat.id}`);
      setIsOpen(false); // Close dropdown on mobile
    }
  };

  const handleNavigateToHome = () => {
    navigate(`/home`);
    setIsOpen(false);
  };

  const handleNavigateHistory = () => {
    navigate(`/history`);
  };

  return (
    <div className="flex flex-col">
      {/* Navbar (Mobile View) */}
      <div className="lg:hidden fixed top-0 left-0 w-full flex items-center justify-between px-4 py-3 z-50 bg-white dark:bg-[#252526]">
        {/* Left Side: Hamburger Menu & Logo */}
        <div className="flex items-center space-x-3">
          <button className="text-gray-600" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <img src={logo} alt="Logo" className="w-24" />
        </div>

        {/* Right Side: New Chat Button */}
        <button
          className="p-2 bg-gradient-to-r from-[#7765FD] to-[#5d4ad1] rounded-sm text-white flex items-center text-[12px]"
          onClick={handleNewSession}
        >
          <PlusIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Sidebar (Desktop View) */}
      <div
        className={`hidden lg:flex flex-col w-64 h-screen bg-[#F4F4FA] dark:bg-[#1e1e1e] p-5 fixed left-0 top-0 z-40`}
      >
        {/* Logo */}
        <div className="mb-6">
          <img src={logo} alt="Logo" className="w-30" />
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            className="my-4 p-2 bg-gradient-to-r from-[#7765FD] to-[#5d4ad1] rounded-sm text-white flex text-[12px] items-center flex-2"
            onClick={handleNewSession}
          >
            <PlusIcon />
            New Chat
          </button>
          <button
            className="my-4 p-2 bg-black  rounded-sm text-white flex text-[12px] items-center flex-1"
            onClick={handleNavigateToHome}
          >
            <Sparkle className="w-[14px] mr-2" />
            Tools
          </button>
        </div>

        {/* Chat History */}
        <div className="flex flex-col flex-1 overflow-y-auto">
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
                  className={`text-[14px] font-[400] dark:text-text-dark text-[#252526] ${
                    activeSession === chat.id && `text-white`
                  }`}
                >
                  {chat.title}
                </span>
                <div className="opacity-0 group-hover:opacity-100 transition">
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

        <div>
          <button
            className="my-4 p-2 bg-gradient-to-r bg-[#3E3E42] text-white rounded-sm flex text-[12px] items-center cursor-pointer"
            onClick={handleNavigateHistory}
          >
            <Clock className="mr-2" />
            Chat History
          </button>
        </div>

        {/* Profile Section */}
        <div
          className="flex items-center rounded-md hover:bg-white dark:hover:bg-background-dark p-[5px] mt-auto cursor-pointer"
          onClick={() => setIsOpenModal(true)}
        >
          <div className="relative inline-flex items-center justify-center w-[32px] h-[32px] overflow-hidden bg-primary-700 rounded-full dark:bg-gray-600">
            <span className="font-medium text-gray-600 dark:text-gray-300">
              {user?.name?.charAt(0) || 'U'}
            </span>
          </div>
          <div className="flex flex-col pl-[10px]">
            <p className="text-black dark:text-white text-[14px]">View Profile</p>
            <p className="text-[#73737E] text-[12px]">{user?.email || ''}</p>
          </div>
        </div>
      </div>

      {/* Dropdown Chat List (Mobile View) */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#00000099]  z-40"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Sidebar Chat List */}
          <div className="lg:hidden fixed top-0 left-0 h-screen w-[85%] max-w-[500px] bg-white dark:bg-[#252526] shadow-md p-4 z-50 overflow-y-auto flex flex-col">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-600 dark:text-gray-300"
              onClick={() => setIsOpen(false)}
            >
              <X />
            </button>

            <div className="flex gap-2">
              <button
                className="my-4 p-2 bg-gradient-to-r from-[#7765FD] to-[#5d4ad1] rounded-sm text-white flex text-[12px] items-center"
                onClick={handleNewSession}
              >
                <PlusIcon />
                New Chat
              </button>
              <button
                className="my-4 p-2 bg-black  rounded-sm text-white flex text-[12px] items-center flex-1"
                onClick={handleNavigateToHome}
              >
                <Sparkle className="w-[14px] mr-2" />
                Tools
              </button>
            </div>

            <h2 className="text-gray-400 text-sm mb-3">Recent Chats</h2>

            {/* Chat List - This takes remaining space */}
            <ul className="space-y-2 flex-grow overflow-y-auto">
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
                    className={`text-[14px] font-[400] dark:text-text-dark text-[#252526] ${
                      activeSession === chat.id && `text-white`
                    }`}
                  >
                    {chat.title}
                  </span>
                  <div className="opacity-0 group-hover:opacity-100 transition">
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

            <div>
              <button
                className="my-4 p-2 bg-gradient-to-r bg-[#3E3E42] text-white rounded-sm flex text-[12px] items-center cursor-pointer"
                onClick={handleNavigateHistory}
              >
                <Clock className="mr-2" />
                Chat History
              </button>
            </div>
            {/* Profile Section - Stays at the Bottom */}
            <div
              className="flex items-center rounded-md hover:bg-white dark:hover:bg-background-dark p-[5px] mt-4 cursor-pointer"
              onClick={() => setIsOpenModal(true)}
            >
              <div className="relative inline-flex items-center justify-center w-[32px] h-[32px] overflow-hidden bg-primary-700 rounded-full dark:bg-gray-600">
                <span className="font-medium text-gray-600 dark:text-gray-300">
                  {user?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <div className="flex flex-col pl-[10px]">
                <p className="text-black dark:text-white text-[14px]">View Profile</p>
                <p className="text-[#73737E] text-[12px]">{user?.email || ''}</p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="mt-[0px] lg:mt-64 lg:ml-64 p-5">{children}</div>

      {/* Profile Modal */}
      <Modal isOpen={isOpenModal} title="Profile" onClose={() => setIsOpenModal(false)}>
        <ProfileDetail user={user} />
      </Modal>

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
