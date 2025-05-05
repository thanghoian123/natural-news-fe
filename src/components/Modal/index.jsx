import React from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="">
      <div className="fixed inset-0 z-10">
        <div
          className="absolute inset-0 BlurBox backdrop"
          onClick={onClose} // Optional: close modal on backdrop click
        />
      </div>
      <div class="Popup USN ActiveElement" id="PopupProfile">
        <div class="PopupTable w-[100%]">
          <div class="PopupCol">
            <div class="Content NoClose">
              <div
                class="ButtonIcon Close !block"
                title="Close"
                onClick={onClose} // Optional: close modal on backdrop click
              >
                <button
                  type="button"
                  onClick={onClose}
                  className="text-gray-500 p-2 cursor-pointer"
                >
                  <X size={24} />
                </button>
              </div>

              {children}
              {/* <div class="Card">
              <div class="Block Subhead">Profile</div>

              <div class="ProfileGroup">
                <div class="Auto ProfileItem">
                  <div class="AutoCol AutoIcon">
                    <div class="Icon">
                      <span class="Mask MaskEmail"></span>
                    </div>
                  </div>
                  <div class="AutoCol AutoLabel">
                    <b>jason@naturalnews.com</b> • <a href="Auth/Logout">Log out</a>
                  </div>
                </div>

                <div class="Auto ProfileItem">
                  <div class="AutoCol AutoIcon">
                    <div class="Icon">
                      <span class="Mask MaskProfile"></span>
                    </div>
                  </div>
                  <div class="AutoCol AutoLabel">
                    <b>Gold Member</b> •{' '}
                    <a href="Subscribe" target="_blank">
                      Learn More
                    </a>
                  </div>
                </div>

                <div class="Auto ProfileItem">
                  <div class="AutoCol AutoIcon">
                    <div class="Icon">
                      <span class="Mask MaskAI"></span>
                    </div>
                  </div>

                  <div class="AutoCol AutoLabel">
                    <b>42 Questions Remaining</b> •{' '}
                    <a href="Support" target="_blank">
                      How to Get More
                    </a>
                  </div>
                </div>
              </div>
              <div class="ProfileGroup">
                <div class="Text">Your email address is connected to the following:</div>

                <div class="Auto ProfileItem" id="SubscribeEnabled">
                  <div class="AutoCol AutoIcon">
                    <div class="Icon">
                      <span class="Mask MaskCheck"></span>
                    </div>
                  </div>
                  <div class="AutoCol AutoLabel">
                    <b>Health Ranger Store Subscriber</b>
                  </div>
                </div>

                <div class="Auto ProfileItem" id="StoreEnabled">
                  <div class="AutoCol AutoIcon">
                    <div class="Icon">
                      <span class="Mask MaskCheck"></span>
                    </div>
                  </div>
                  <div class="AutoCol AutoLabel">
                    <b>Health Ranger Store Buyer</b>
                  </div>
                </div>
              </div>
              <div class="ProfileGroup">
                <div class="ProfileBox">
                  <div class="ProfileInfo">
                    <div class="Text">
                      Your chat history contains chats from the past 30 days. Chats older than this
                      are not kept.
                    </div>
                  </div>
                  <div class="ProfileAction">
                    <div class="ButtonBox">
                      <button class="Button ButtonRed ButtonClearConfirm">Clear History</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="ProfileGroup">
                <div class="ThemeBox">
                  <span class="ThemeLabel">Theme:</span>
                  <span class="ThemeTab ThemeTabActive" id="ThemeLight">
                    Light
                  </span>
                  <span class="ThemeTab ThemeActive" id="ThemeDark">
                    Dark
                  </span>
                  <span class="ThemeTab" id="ThemeSystem">
                    System
                  </span>
                </div>
              </div>
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
