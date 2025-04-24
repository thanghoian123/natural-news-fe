/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import logoWhite from '../assets/Images/Logo-White.svg'; // Adjust path as needed

import { useTheme } from '../contexts/ThemeContext';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

export default function Sidebar() {
  const { theme, changeTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false); // Toggle menu
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-[101]">
          <div
            className="absolute inset-0 BlurBox backdrop"
            onClick={() => setIsOpen(false)} // Optional: close modal on backdrop click
          />
        </div>
      )}
      <div class="StickyTop" id="top">
        <div class="Section BlurBox USN" id="SectionMasthead">
          <div class="Content">
            <div class="MastheadTable">
              <div class="MastheadCol MastheadColMenu">
                <div
                  class="ButtonIcon NoClose ButtonMenu"
                  title="Menu"
                  onClick={() => setIsOpen(true)}
                >
                  <div class="Icon">
                    <span class="Mask MaskMenu"></span>
                  </div>
                </div>
              </div>

              <div class="MastheadCol MastheadColLogo">
                <Link to="/home">
                  <img src={logoWhite} alt="Brighteon.AI" class="Logo" />
                </Link>
              </div>

              <div class="MastheadCol MastheadColNav">
                <div class="NavTable">
                  <div class="NavCol NavColLeft">
                    <Link to="/home" id="MastheadHome">
                      Home
                    </Link>
                    <Link to="/freeai/About" id="MastheadAbout">
                      About
                    </Link>
                    <HashLink
                      to="/Home/#SectionHomeTools"
                      id="MastheadTools"
                      replace={true}
                      // onClick={() => handleScrollToId('SectionHomeTools')}
                    >
                      Prompt Tools
                    </HashLink>
                    <Link to="/freeai/Guide" id="MastheadAbout">
                      Prompting Guide
                    </Link>
                    <Link to="/freeai/Download" id="MastheadAbout">
                      Downloads
                    </Link>
                  </div>
                  <div class="NavCol NavColRight">
                    <Link to="/freeai/Subscribe">
                      <button class="Button ButtonPrimary">Newsletter</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div class={` z-100 Menu MenuLeft  USN ${isOpen && 'MenuLeftOpen '} `} id="Menu">
          <div class="Content">
            <div class="ButtonIcon Close" title="Close" onClick={() => setIsOpen(false)}>
              <div class="Icon">
                <span class="Mask MaskClose"></span>
              </div>
            </div>
            <div class="Card">
              <div class="MenuGroup">
                <div class="Block MenuGroup">
                  <div class="Block Subhead">Discover</div>
                  <div class="Block Text">
                    <p>
                      <Link to="/home">Home</Link>
                    </p>
                    <p>
                      <Link to="/freeai/About">About Enoch</Link>
                    </p>
                    <p>
                      <HashLink to="/Home/#SectionHomeTools" id="MastheadTools">
                        Prompt Tools
                      </HashLink>
                    </p>

                    <p>
                      <Link to="/freeai/Guide" id="MastheadAbout">
                        Prompting Guide
                      </Link>
                    </p>
                    <p>
                      <Link to="/freeai/Download">Downloads</Link>
                    </p>
                    <p>
                      <a href="Newsletter">Newsletter</a>
                    </p>
                  </div>
                </div>

                <div class="Block MenuGroup">
                  <div class="Block Subhead">Information</div>
                  <div class="Block Text">
                    <p>
                      <Link to="/freeai/About">About Enoch</Link>
                    </p>
                    <p>
                      <Link to="/freeai/Contact">Contact Us</Link>
                    </p>
                    <p>
                      <a href="Notice">Notice</a>
                    </p>
                    <p>
                      <a href="License">License Information</a>
                    </p>
                    <p>
                      <a href="Credits">Credits</a>
                    </p>
                    <p>
                      <a href="Copyrights">Copyrights</a>
                    </p>
                    <p>
                      <a href="Privacy">Privacy Policy</a>
                    </p>
                    <p>
                      <a href="Terms">Terms of Service</a>
                    </p>
                  </div>
                </div>

                <div class="Block MenuGroup">
                  <div class="Block Subhead">Display Mode</div>
                  <div class="AutoGroup" id="ThemeMenu">
                    {['light', 'dark', 'system'].map((mode) => (
                      <div
                        key={mode}
                        className={`Auto ${theme === mode ? 'Active' : ''}`}
                        id={`Theme${mode.charAt(0).toUpperCase() + mode.slice(1)}`}
                        onClick={() => changeTheme(mode)}
                        role="button"
                      >
                        <div className="AutoCol AutoIcon">
                          <div className="Icon">
                            <span
                              className={`Mask ${theme === mode ? 'MaskSelected' : 'MaskSelect'}`}
                            />
                          </div>
                        </div>
                        <div className="AutoCol AutoLabel">
                          <div className="AutoText">
                            {mode.charAt(0).toUpperCase() + mode.slice(1)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
