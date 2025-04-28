import React, { useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';
import { Link } from 'react-router-dom';

function ProfileDetail({ user, onClearChat }) {
  const dispatch = useDispatch();
  const { theme, changeTheme } = useTheme();

  // Detect system theme
  const detectSystemTheme = () => {
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return isDarkMode ? 'dark' : 'light';
  };

  // Set theme to system preference on component mount
  useEffect(() => {
    const systemTheme = detectSystemTheme();
    if (theme === 'system') {
      changeTheme(systemTheme); // Sync with system theme when the mode is set to 'system'
    }

    // Listen for system theme changes
    const themeChangeListener = (e) => {
      if (theme === 'system') {
        changeTheme(e.matches ? 'dark' : 'light');
      }
    };
    
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', themeChangeListener);

    // Clean up listener on component unmount
    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', themeChangeListener);
    };
  }, [theme, changeTheme]);

  const engineList = [
    {
      id: 1,
      name: 'Health Ranger Store Subscriber',
      allows: ['Gold', 'Platinum', 'Silver', 'Bronze'],
      rightAction: (
        <Link to="/Support/home">
          Learn More
        </Link>
      ),
    },

    {
      id: 2,
      name: 'Health Ranger Store Buyer',
      allows: ['Gold', 'Platinum', 'Silver'],
      rightAction: (
        <Link to="/Support/home">
          Learn More
        </Link>
      ),
    },
  ];

  const onLogout = async () => {
    await changeTheme('light');
    dispatch(logout());
  };

  const reward =
    user?.tier === 'Platinum' ? 'Unlimited Question Remain' : `${user?.reward} Questions Remaining`;

  return (
    <div className="Card">
      <div className="Block Subhead">Profile</div>

      <div className="ProfileGroup">
        <div className="Auto ProfileItem">
          <div className="AutoCol AutoIcon">
            <div className="Icon">
              <span className="Mask MaskEmail"></span>
            </div>
          </div>
          <div className="AutoCol AutoLabel">
            <b>{user?.email}</b> • <a onClick={onLogout}>Log out</a>
          </div>
        </div>

        <div className="Auto ProfileItem">
          <div className="AutoCol AutoIcon">
            <div className="Icon">
              <span className="Mask MaskProfile"></span>
            </div>
          </div>
          <div className="AutoCol AutoLabel">
            <b>{user?.tier} Member</b> •{' '}
            <Link to="/Support/home">Learn More</Link>
          </div>
        </div>

        <div className="Auto ProfileItem">
          <div className="AutoCol AutoIcon">
            <div className="Icon">
              <span className="Mask MaskAI"></span>
            </div>
          </div>

          <div className="AutoCol AutoLabel">
            <b>{reward}</b> •{' '}
            <Link to="/Support/home">How to Get More</Link>
          </div>
        </div>
      </div>

      <div className="ProfileGroup">
        <div className="Text">Your email address is connected to the following:</div>
        {engineList.map((i, index) => {
          const isCheck = i.allows.includes(user.tier);

          return (
            <div className="Auto ProfileItem" id="SubscribeEnabled" key={index}>
              <div className="AutoCol AutoIcon">
                <div className="Icon">
                  <span className={`Mask ${isCheck ? 'MaskCheck' : 'MaskLocked'}`}></span>
                </div>
              </div>
              <div className="AutoCol AutoLabel">
                <b>{i?.name}</b>
              </div>
            </div>
          );
        })}
      </div>

      <div className="ProfileGroup">
        <div className="ProfileBox">
          <div className="ProfileInfo">
            <div className="Text">
              Your chat history contains chats from the past 30 days. Chats older than this are not
              kept.
            </div>
          </div>
          <div className="ProfileAction">
            <div className="ButtonBox" onClick={onClearChat}>
              <button className="Button ButtonRed ButtonClearConfirm">Clear History</button>
            </div>
          </div>
        </div>
      </div>

      <div className="ProfileGroup">
        <div className="ThemeBox">
          <span className="ThemeLabel">Theme:</span>
          <span
            className={`ThemeTab ${theme === 'light' ? 'bg-ui-bg dark:bg-primary !text-white' : ''}`}
            id="ThemeLight"
            onClick={() => changeTheme('light')}
          >
            Light
          </span>
          <span
            className={`ThemeTab ${theme === 'dark' ? 'bg-ui-bg dark:bg-primary' : ''}`}
            id="ThemeDark"
            onClick={() => changeTheme('dark')}
          >
            Dark
          </span>
          <span
            className={`ThemeTab ${theme === 'system' ? 'bg-ui-bg dark:bg-primary' : ''}`}
            id="ThemeSystem"
            onClick={() => changeTheme('system')}
          >
            System
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetail;
