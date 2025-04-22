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
  console.log('🚀 ~ Sidebar ~ user:', user);
  const [isOpen, setIsOpen] = useState(false); // Toggle menu
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const isBronze = user?.tier === 'Bronze';

  const navigate = useNavigate();
  const { sessions, activeSession } = useSelector((state) => state.chat);
  console.log('🚀 ~ Sidebar ~ sessions:', sessions);
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
    <>
      <div id="Top">
        <div className="Section USN" id="SectionMasthead">
          <div className="Content">
            <div className="MastheadTable">
              <div className="MastheadCol MastheadColMenu">
                <div className="ButtonIcon NoClose ButtonMenu" title="Menu">
                  <div className="Icon">
                    <span className="Mask MaskMenu"></span>
                  </div>
                </div>
              </div>

              <div className="MastheadCol MastheadColLogo">
                <a href="Home">
                  <img alt="Enoch AI" className="Logo" src="Assets/Images/Logo-White.svg" />
                </a>
              </div>

              <div className="MastheadCol MastheadColNav">
                <div className="ButtonBox ButtonBoxRight">
                  <div className="ButtonIcon ButtonPrimary ButtonNew NoClose" title="New Chat">
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
      <div className="Menu MenuLeft NoClose USN" id="Menu">
        <div className="Content">
          <div className="ButtonIcon Close" title="Close">
            <div className="Icon">
              <span className="Mask MaskClose"></span>
            </div>
          </div>
          <div className="Card">
            <div className="MenuGroup StickyTop" id="MenuLogo">
              <a href="Home">
                <img alt="Enoch AI" className="Logo" src="Assets/Images/Logo-White.svg" />

                {/* <img alt="Enoch AI" className="Logo" src={logo} /> */}
              </a>
            </div>

            <div className="MenuGroup">
              <div className="ButtonBox ButtonBoxLeft">
                <a href="Chat">
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
                {sessions.map((chat) => (
                  <div
                    className="ChatTitle TitleUpdate NoClose"
                    onClick={() => handleChatClick(chat)}
                  >
                    <div className="Auto">
                      <div className="AutoCol ChatText">
                        <p>
                          <span className="Clamp1">{chat.title}</span>
                        </p>
                      </div>
                      <div className="AutoCol ChatOptions">
                        <div className="ButtonIcon ButtonIconSmall ButtonChatDelete" title="Delete">
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

            <div className="MenuGroup" id="GroupProfile" onClick={() => setIsOpenModal(true)}>
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
                    <div className="Disclaimer">{`${user?.reward} questions remaining`}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal isOpen={isOpenModal} title="Profile" onClose={() => setIsOpenModal(false)}>
          <ProfileDetail user={user} />
        </Modal>
      </div>
    </>
  );
}
