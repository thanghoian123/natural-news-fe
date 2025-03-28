import { AtSign, Ban, Check, Sparkle, User } from 'lucide-react';
import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';

function ProfileDetail({ user }) {
  console.log('🚀 ~ user:', user);
  const dispatch = useDispatch();
  const { theme, toggleTheme } = useTheme();
  const [selectedEngine, setSelectedEngine] = useState(1);
  const dataMapping = [
    {
      label: user?.email || '',
      iconLeft: <AtSign className="w-[14px]" />,
      rightAction: (
        <span
          className="text-primary-700 cursor-pointer"
          onClick={() => {
            dispatch(logout());
          }}
        >
          Log out
        </span>
      ),
    },
    {
      label: `${user?.reward} questions remaining`,
      iconLeft: <Sparkle className="w-[14px]" />,
      rightAction: <span className="text-primary-700 cursor-pointer">How to get more</span>,
    },
    {
      label: 'Standard User',
      iconLeft: <User className="w-[14px]" />,
      rightAction: <span className="text-primary-700 cursor-pointer">How to get more</span>,
    },
  ];

  const engineList = [
    {
      id: 1,
      name: 'Natural News Subscriber',
      allows: ['Gold', 'Platinum', 'Silver', 'Bronze'],
      rightAction: (
        <a href="#" className="text-primary-700">
          Learn More
        </a>
      ),
    },

    {
      id: 2,
      name: 'Health Ranger Store Buyer',
      allows: ['Gold', 'Platinum', 'Silver'],
      rightAction: (
        <a href="#" className="text-primary-700">
          Learn More
        </a>
      ),
    },
  ];
  return (
    <div>
      <div className="flex flex-col gap-4">
        {dataMapping.map((i, index) => {
          return (
            <div key={index} className="flex dark:text-white text-sm">
              {i.iconLeft ?? i.iconLeft}
              <span className="ml-[8px]">{i.label}</span> &bull;
              {i.rightAction ?? i.rightAction}
            </div>
          );
        })}
      </div>

      <div className="h-[0.5px] w-full bg-[#3e3e42] my-2" />

      <p className="text-[#9D9DAB] text-[14px] my-4">
        Your email address is connected to the following:
      </p>

      <div className="flex flex-col gap-4">
        {engineList.map((i, index) => {
          const isCheck = i.allows.includes(user.tier);
          console.log('🚀 ~ {engineList.map ~ isCheck:', isCheck);

          return (
            <div key={index} className="flex dark:text-white text-sm">
              {isCheck ? (
                <Check className={`w-[14px] opacity-100`} />
              ) : (
                <Ban className={`w-[14px] opacity-100 text-[#e0203c]`} />
              )}
              {/* {isSelected && } */}
              <span className="ml-[8px]">{i.name}</span>
              {!isCheck && <>&bull; {i.rightAction ?? i.rightAction}</>}
            </div>
          );
        })}
      </div>

      <div className="h-[0.5px] w-full bg-[#3e3e42] my-2" />

      <div className="flex justify-between">
        <p className="w-4/5 dark:text-[#9D9DAB] text-[14px] my-4">
          Your chat history contains chats from the past 30 days. Chats older than this are not
          kept.
        </p>
        <button
          className="my-4 p-2 bg-[#E0203C] rounded-sm cursor-pointer text-white flex text-[12px] items-center"
          onClick={() => {}}
        >
          Clear History
        </button>
      </div>

      <div className="h-[0.5px] w-full bg-[#3e3e42] my-2" />

      <div className="text-[#3e3e42] dark:text-white flex items-center">
        <p className="text-[12px"> Theme:</p>
        <button
          className={`px-2 text-[#3e3e42] dark:text-white rounded-sm cursor-pointer flex text-[12px] items-center ${theme === 'light' && 'bg-primary-700 text-white'}`}
          onClick={toggleTheme}
        >
          light
        </button>
        <button
          className={` px-2 text-[#3e3e42] dark:text-white rounded-sm cursor-pointer flex text-[12px] items-center ${theme === 'dark' && 'bg-primary-700 text-white'}`}
          onClick={toggleTheme}
        >
          dark
        </button>
      </div>
      <div className="h-[0.5px] w-full bg-[#3e3e42] my-2" />
    </div>
  );
}

export default ProfileDetail;
