import { AtSign, Ban, Check, Sparkle, User } from 'lucide-react';
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';
import { Link } from 'react-router-dom';

function ProfileDetail({ user, onClearChat }) {
  const dispatch = useDispatch();
  const { theme, changeTheme } = useTheme();

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
    // <div>
    //   <div className="flex flex-col gap-4">
    //     {dataMapping.map((i, index) => {
    //       return (
    //         <div key={index} className="flex dark:text-white text-sm">
    //           {i.iconLeft ?? i.iconLeft}
    //           <span className="ml-[8px]">{i.label}</span> &bull;
    //           {i.rightAction ?? i.rightAction}
    //         </div>
    //       );
    //     })}
    //   </div>

    //   <div className="h-[0.5px] w-full bg-[#3e3e42] my-2" />

    //   <p className="text-[#9D9DAB] text-[14px] my-4">
    //     Your email address is connected to the following:
    //   </p>

    //   <div className="h-[0.5px] w-full bg-[#3e3e42] my-2" />

    //   <div className="flex justify-between">
    //     <p className="w-4/5 dark:text-[#9D9DAB] text-[14px] my-4">
    //       Your chat history contains chats from the past 30 days. Chats older than this are not
    //       kept.
    //     </p>
    //     <button
    //       onClick={() => dispatch(deleteMyChatHistory())}
    //       className="my-4 p-2 bg-[#E0203C] rounded-sm cursor-pointer text-white flex text-[12px] items-center"
    //     >
    //       Clear History
    //     </button>
    //   </div>

    //   <div className="h-[0.5px] w-full bg-[#3e3e42] my-2" />

    //   <div className="text-[#3e3e42] dark:text-white flex items-center">
    //     <p className="text-[12px"> Theme:</p>
    //     <button
    //       className={`px-2 text-[#3e3e42] dark:text-white rounded-sm cursor-pointer flex text-[12px] items-center ${theme === 'light' && 'bg-primary-700 text-white'}`}
    //       onClick={toggleTheme}
    //     >
    //       light
    //     </button>
    //     <button
    //       className={` px-2 text-[#3e3e42] dark:text-white rounded-sm cursor-pointer flex text-[12px] items-center ${theme === 'dark' && 'bg-primary-700 text-white'}`}
    //       onClick={toggleTheme}
    //     >
    //       dark
    //     </button>
    //   </div>
    //   <div className="h-[0.5px] w-full bg-[#3e3e42] my-2" />
    // </div>
    <div class="Card">
      <div class="Block Subhead">Profile</div>

      <div class="ProfileGroup">
        <div class="Auto ProfileItem">
          <div class="AutoCol AutoIcon">
            <div class="Icon">
              <span class="Mask MaskEmail"></span>
            </div>
          </div>
          <div class="AutoCol AutoLabel">
            <b>{user?.email}</b> • <a onClick={onLogout}>Log out</a>
          </div>
        </div>

        <div class="Auto ProfileItem">
          <div class="AutoCol AutoIcon">
            <div class="Icon">
              <span class="Mask MaskProfile"></span>
            </div>
          </div>
          <div class="AutoCol AutoLabel">
            <b>{user?.tier} Member</b> •{' '}
            <Link to="/Support/home">
        Learn More
      </Link>
          </div>
        </div>

        <div class="Auto ProfileItem">
          <div class="AutoCol AutoIcon">
            <div class="Icon">
              <span class="Mask MaskAI"></span>
            </div>
          </div>

          <div class="AutoCol AutoLabel">
            <b>{reward}</b> •{' '}
            <Link to="/Support/home">
              How to Get More
            </Link>
          </div>
        </div>
      </div>
      <div class="ProfileGroup">
        <div class="Text">Your email address is connected to the following:</div>
        {engineList.map((i, index) => {
          const isCheck = i.allows.includes(user.tier);

          return (
            <div class="Auto ProfileItem" id="SubscribeEnabled" key={index}>
              <div class="AutoCol AutoIcon">
                <div class="Icon">
                  <span class={`Mask ${isCheck ? 'MaskCheck' : 'MaskLocked'}`}></span>
                </div>
              </div>
              <div class="AutoCol AutoLabel">
                <b>{i?.name}</b>
              </div>
            </div>
          );
        })}
      </div>
      <div class="ProfileGroup">
        <div class="ProfileBox">
          <div class="ProfileInfo">
            <div class="Text">
              Your chat history contains chats from the past 30 days. Chats older than this are not
              kept.
            </div>
          </div>
          <div class="ProfileAction">
            <div class="ButtonBox" onClick={onClearChat}>
              <button class="Button ButtonRed ButtonClearConfirm">Clear History</button>
            </div>
          </div>
        </div>
      </div>
      <div class="ProfileGroup">
        <div class="ThemeBox">
          <span class="ThemeLabel">Theme:</span>
          <span
            class={`ThemeTab ${theme === 'light' ? 'bg-ui-bg dark:bg-primary !text-white' : ''}`}
            id="ThemeLight"
            onClick={() => changeTheme('light')}
          >
            Light
          </span>
          <span
            class={`ThemeTab ${theme === 'dark' ? 'bg-ui-bg dark:bg-primary' : ''}`}
            id="ThemeDark"
            onClick={() => changeTheme('dark')}
          >
            Dark
          </span>
          <span class="ThemeTab" id="ThemeSystem">
            System
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetail;
