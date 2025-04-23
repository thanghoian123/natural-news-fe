/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import { useTheme } from '../contexts/ThemeContext';

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
                <a href="Home">
                  <img src="Assets/Images/Logo-White.svg" alt="Brighteon.AI" class="Logo" />
                </a>
              </div>

              <div class="MastheadCol MastheadColNav">
                <div class="NavTable">
                  <div class="NavCol NavColLeft">
                    <a href="Home" id="MastheadHome">
                      Home
                    </a>
                    <a href="About" id="MastheadAbout">
                      About
                    </a>
                    <a href="Home/#SectionHomeTools" id="MastheadTools">
                      Prompt Tools
                    </a>
                    <a href="Guide" id="MastheadGuide">
                      Prompting Guide
                    </a>
                    <a href="Download" id="MastheadDownload">
                      Downloads
                    </a>
                  </div>
                  <div class="NavCol NavColRight">
                    <a href="Subscribe">
                      <button class="Button ButtonPrimary">Newsletter</button>
                    </a>
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
                      <a href="Home">Home</a>
                    </p>
                    <p>
                      <a href="About">About</a>
                    </p>
                    <p>
                      <a href="Home/#SectionHomeTools" id="MastheadTools">
                        Prompt Tools
                      </a>
                    </p>

                    <p>
                      <a href="Guide">Prompting Guide</a>
                    </p>
                    <p>
                      <a href="Download">Downloads</a>
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
                      <a href="About">About Enoch</a>
                    </p>
                    <p>
                      <a href="Contact">Contact Us</a>
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
