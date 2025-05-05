/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Menu, X, Trash, PlusIcon, Sparkle, TrashIcon, Clock } from 'lucide-react'; // Icons
import logoColor from '../assets/Images/Logo-Color.svg'; // Adjust path as needed
import logoWhite from '../assets/Images/Logo-White.svg'; // Adjust path as needed

import { useDispatch, useSelector } from 'react-redux';
import {
  deleteMyChatHistory,
  removeChatSession,
  setActiveSession,
  startNewSession,
} from '../redux/chatSlice';
import { useToast } from '../contexts/ToastContext';
import Modal from './Modal';
import ProfileDetail from './ProfileDetail';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { Link } from 'react-router-dom';

export default function Sidebar({ children }) {
  const { addToast } = useToast();
  const { user } = useSelector((state) => state.user);
  const { reward } = useSelector((state) => state.chat);

  const { curTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false); // Toggle menu
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);
  const [isOpenConfirmDeleteAll, setIsOpenConfirmDeleteAll] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const isBronze = user?.tier === 'Bronze';
  const logoSrc = curTheme === 'dark' ? logoWhite : logoColor;
  const navigate = useNavigate();
  const { sessions } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const [selectedChatId, setSelectedChatId] = useState(null);

  const handleNewSession = () => {
    navigate(`/chat`);
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

  const handleDeleteAllChat = async () => {
    const result = await dispatch(deleteMyChatHistory());
    if (deleteMyChatHistory.fulfilled.match(result)) {
      addToast('Chat deleted successfully!', 'success');
      navigate(`/chat`);
    } else {
      addToast('Failed to delete chat.', 'error');
    }
    setIsOpenConfirmDeleteAll(false);
  };

  const handleChatClick = (chat) => {
    if (chat?.id) {
      setSelectedChatId(chat.id);
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

  const handleClearChat = () => {
    setIsOpenConfirmDeleteAll(true);
    setIsOpenProfile(false);
  };

  const rewardRemaining =
    user?.tier === 'Platinum' ? 'Unlimited Question Remain' : `${reward} Questions Remaining`;

  useEffect(() => {
    if (isOpenProfile || isOpenConfirmDelete || isOpenConfirmDeleteAll) {
      setIsOpen(false);
    }
  }, [isOpenProfile, isOpenConfirmDelete, isOpenConfirmDeleteAll]);
  return (
    <>
      <div id="Top" style={{ zIndex: isOpen ? -1 : 0 }}>
        <div className="Section USN" id="SectionMasthead">
          <div className="Content">
            <div className="MastheadTable">
              <div className="MastheadCol MastheadColMenu">
                <div
                  className="ButtonIcon NoClose ButtonMenu"
                  title="Menu"
                  onClick={() => setIsOpen(true)}
                >
                  <div className="Icon">
                    <span className="Mask MaskMenu"></span>
                  </div>
                </div>
              </div>

              <div className="MastheadCol MastheadColLogo">
                <Link to="Home">
                  <img alt="Enoch AI" className="Logo" src={logoSrc} />
                </Link>
              </div>

              <div className="MastheadCol MastheadColNav">
                <div className="ButtonBox ButtonBoxRight">
                  <div
                    className="ButtonIcon ButtonPrimary ButtonNew NoClose"
                    title="New Chat"
                    onClick={handleNewSession}
                  >
                    <div className="Icon">
                      <span className="Mask MaskNew"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-10">
          <div
            className="absolute inset-0 BlurBox backdrop"
            onClick={() => setIsOpen(false)} // Optional: close modal on backdrop click
          />
        </div>
      )}
      <div
        className={`Menu MenuLeft NoClose !z-100 USN ${isOpen ? 'MenuLeftOpen ActiveElement' : ''}`}
        id="Menu"
      >
        <div className="Content">
          <div className="ButtonIcon Close" title="Close" onClick={() => setIsOpen(false)}>
            <div className="Icon">
              <span className="Mask MaskClose"></span>
            </div>
          </div>
          <div className="Card">
            <div className="MenuGroup StickyTop" id="MenuLogo">
              <Link to="Home">
                <img alt="Enoch AI" className="Logo" src={logoSrc} />

                {/* <img alt="Enoch AI" className="Logo" src={logo} /> */}
              </Link>
            </div>

            <div className="MenuGroup">
              <div className="ButtonBox ButtonBoxLeft">
                <a>
                  <button
                    className="Button ButtonAuto ButtonAutoLeft ButtonPrimary"
                    title="Start a New Chat"
                    onClick={handleNewSession}
                  >
                    <div className="Auto">
                      <div className="AutoCol AutoIcon">
                        <div className="Icon IconSmall">
                          <span className="Mask MaskNew"></span>
                        </div>
                      </div>
                      <div className="AutoCol AutoLabel">New Chat</div>
                    </div>
                  </button>
                </a>
                <a>
                  <button
                    className="Button ButtonAuto ButtonAutoLeft ButtonBlack NoClose"
                    title="VIP Tools"
                    onClick={handleNavigateToHome}
                  >
                    <div className="Auto">
                      <div className="AutoCol AutoIcon">
                        <div className="Icon IconSmall">
                          <span className="Mask MaskAI"></span>
                        </div>
                      </div>
                      <div className="AutoCol AutoLabel">Tools</div>
                    </div>
                  </button>
                </a>
              </div>
            </div>

            <div className="MenuGroup" id="GroupRecent">
              <div className="Block Subhead">Recent Questions</div>
              <div className="History">
                {sessions
                  .slice()
                  .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // Ensure valid Date conversion
                  .slice(0, 10) // Limit to 10
                  .map((chat) => (
                    <div
                      key={chat.id}
                      className={`ChatTitle TitleUpdate NoClose ${selectedChatId === chat.id ? 'ChatTitleActive' : ''}`}
                      onClick={() => handleChatClick(chat)}
                    >
                      <div className="Auto">
                        <div className="AutoCol ChatText">
                          <p>
                            <span className="Clamp1">{chat.title}</span>
                          </p>
                        </div>
                        <div className="AutoCol ChatOptions">
                          <div
                            className="ButtonIcon ButtonIconSmall ButtonChatDelete"
                            title="Delete"
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteId(chat.id);
                              setIsOpenConfirmDelete(true);
                            }}
                          >
                            <div className="Icon">
                              <span className="Mask MaskDelete"></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="MenuGroup" id="GroupHistory">
              <div className="ButtonBox ButtonBoxLeft">
                <a>
                  <button
                    onClick={handleNavigateHistory}
                    className="Button ButtonAuto ButtonAutoLeft ButtonGray NoClose"
                    title="View Your Chat History"
                  >
                    <div className="Auto">
                      <div className="AutoCol AutoIcon">
                        <div className="Icon IconSmall">
                          <span className="Mask MaskHistory"></span>
                        </div>
                      </div>
                      <div className="AutoCol AutoLabel">Chat History</div>
                    </div>
                  </button>
                </a>
              </div>
            </div>

            <div className="MenuGroup" id="GroupProfile" onClick={() => setIsOpenProfile(true)}>
              <div className="Profile ButtonProfile NoClose">
                <div className="ProfileTable" id="ProfilePreview">
                  <div className="ProfileCol ProfilePhoto">
                    <div className="ButtonIcon ProfileAvatar">
                      <div className="Icon">
                        <span className="Mask MaskProfile"></span>
                      </div>
                    </div>
                  </div>
                  <div className="ProfileCol ProfileText">
                    <div className="Text">
                      <span className="Clamp1">
                        <a>{user?.email}</a>
                      </span>
                    </div>
                    <div className="Disclaimer">{rewardRemaining}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal isOpen={isOpenProfile} onClose={() => setIsOpenProfile(false)}>
          <ProfileDetail user={user} onClearChat={handleClearChat} />
        </Modal>

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
        <Modal isOpen={isOpenConfirmDeleteAll} onClose={() => setIsOpenConfirmDeleteAll(false)}>
          <div class="Card">
            <div class="Subhead">Delete Chat?</div>
            <div class="Block Text">Are you sure you want to delete this chat?</div>

            <div class="ButtonBox ButtonBox ButtonBoxLeft">
              <button
                class="Button ButtonAuto ButtonAutoLeft ButtonRed ButtonDelete"
                onClick={handleDeleteAllChat}
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
                onClick={() => setIsOpenConfirmDeleteAll(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}
