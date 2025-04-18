import React, { useState } from 'react';
import { AlignLeft } from 'lucide-react'; // Or any other icon lib
import Drawer from './Drawer';
import { useTheme } from '../contexts/ThemeContext';

const structureMenu = [
  {
    category: 'Discover',
    items: [
      {
        name: 'home',
      },
      {
        name: 'about',
      },
      {
        name: 'prompt tools',
      },
      {
        name: 'prompting guild',
      },
      {
        name: 'downloads',
      },
      {
        name: 'new letters',
      },
    ],
  },
  {
    category: 'Information',
    items: [
      {
        name: 'About Enoch',
      },
      {
        name: 'Contact Us',
      },
      {
        name: 'Notice',
      },
      {
        name: 'License Information',
      },
      {
        name: 'Credits',
      },
      {
        name: 'Copyrights',
      },
      {
        name: 'Privacy Policy',
      },
      {
        name: 'Terms of Service',
      },
    ],
  },
];

const Navbar = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const { theme, changeTheme } = useTheme();
  console.log('🚀 ~ Navbar ~ theme:', theme);
  return (
    <nav className="w-full h-16 bg-[#0d0d0d] dark:bg-[#252526] shadow-sm px-4 flex items-center justify-between">
      {/* Left: Hamburger + Logo */}
      <div className="flex items-center space-x-3">
        <button onClick={() => setDrawerOpen(true)} className="text-white">
          <AlignLeft size={24} />
        </button>
        <div className="text-xl font-semibold">MyLogo</div>
      </div>

      {/* Right: Nav Items */}
      <div className="flex items-center space-x-6">
        <a href="#" className=" text-[12px] text-white hover:text-blue-600">
          Home
        </a>
        <a href="#" className="text-[12px] text-white hover:text-blue-600">
          About
        </a>
        <a href="#" className=" text-[12px] text-white hover:text-blue-600">
          Services
        </a>
        <a href="#" className=" text-[12px] text-white hover:text-blue-600">
          Contact
        </a>

        <button className="bg-primary px-2 py-1 rounded-sm text-white">New Letters</button>
      </div>

      <Drawer isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
        <div className="Content">
          <div className="Card">
            {/* Menu Group */}
            <div className="MenuGroup dark:text-[#E5E5EC]  flex flex-col gap-[42px]">
              {structureMenu.map((i, index) => (
                <div className="Block MenuGroup" key={index}>
                  <p className="Block Subhead mb-[24px] text-[12px] font-[700]">{i.category}</p>
                  <div className="Block Text flex flex-col gap-3">
                    {i.items.map((j, idx) => (
                      <p className="font-[400] text-[14px] hover:text-primary capitalize">
                        <a href="Home" key={idx}>
                          {j.name}
                        </a>
                      </p>
                    ))}
                  </div>
                </div>
              ))}

              {/* Display Mode */}
              <div className="Block MenuGroup">
                <div className="Block Subhead">Display Mode</div>
                <div className="AutoGroup" id="ThemeMenu">
                  <div className="Auto" id="ThemeLight">
                    <div className="AutoCol AutoIcon">
                      <div className="Icon">
                        <span className="Mask MaskSelect"></span>
                      </div>
                    </div>
                    <div className="AutoCol AutoLabel">
                      <label className="flex space-x-2 cursor-pointer whitespace-nowrap items-center">
                        <input
                          type="radio"
                          name="dropdown"
                          value="dark"
                          checked={theme === 'dark'}
                          onChange={(e) => {
                            changeTheme(e.target.value);
                          }}
                          className={`
                    peer appearance-none w-4 h-4 border-2 rounded-full
                    border-gray-400 checked:border-primary checked:bg-white checked:dark:bg-background-dark
                    focus:outline-none cursor-pointer
                  `}
                        />
                        <p
                          className={`${
                            theme === 'dark' ? 'text-primary' : 'dark:text-white'
                          }  text-md text-wrap`}
                        >
                          dark
                        </p>
                      </label>
                      <label className="flex space-x-2 cursor-pointer whitespace-nowrap items-center">
                        <input
                          type="radio"
                          name="dropdown"
                          value="light"
                          checked={theme === 'light'}
                          onChange={(e) => {
                            changeTheme(e.target.value);
                          }}
                          className={`
                    peer appearance-none w-4 h-4 border-2 rounded-full
                    border-gray-400 checked:border-primary checked:bg-white checked:dark:bg-background-dark
                    focus:outline-none cursor-pointer
                  `}
                        />
                        <p
                          className={`${
                            theme === 'light' ? 'text-primary' : 'dark:text-white '
                          } text-md text-wrap`}
                        >
                          light
                        </p>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </nav>
  );
};

export default Navbar;
