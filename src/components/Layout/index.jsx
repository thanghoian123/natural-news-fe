import React from 'react';
import Sidebar from '../Sidebar';
import logo from '../../assets/Images/Logo-Color.svg';
const Layout = ({ children }) => {
  return (
    <div>
      <div className="PageOpen" id="Page">
        {children}
      </div>
      <Sidebar />
      {/* <div className="Menu MenuLeft NoClose USN" id="Menu">
        <div className="Content">
          <div className="ButtonIcon Close" title="Close">
            <div className="Icon">
              <span className="Mask MaskClose"></span>
            </div>
          </div>
          <div className="Card">
            <div className="MenuGroup StickyTop" id="MenuLogo">
              <a href="Home">
                <img alt="Enoch AI" className="Logo" src={logo} />
              </a>
            </div>

            <div className="MenuGroup">
              <div className="ButtonBox ButtonBoxLeft">
                <a href="Chat">
                  <button
                    className="Button ButtonAuto ButtonAutoLeft ButtonPrimary"
                    title="Start a New Chat"
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
                <a href="Home">
                  <button
                    className="Button ButtonAuto ButtonAutoLeft ButtonBlack NoClose"
                    title="VIP Tools"
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
                <div className="ChatTitle TitleUpdate NoClose" id="10">
                  <div className="Auto">
                    <div className="AutoCol ChatText">
                      <a href="Chat/?id=10">
                        <span className="Clamp1">Is aloe vera good for sunburns?</span>
                      </a>
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
                <div className="ChatTitle TitleUpdate NoClose" id="9">
                  <div className="Auto">
                    <div className="AutoCol ChatText">
                      <a href="Chat/?id=9">
                        <span className="Clamp1">What are the benefits of Vitamin D?</span>
                      </a>
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
                <div className="ChatTitle TitleUpdate NoClose" id="8">
                  <div className="Auto">
                    <div className="AutoCol ChatText">
                      <a href="Chat/?id=8">
                        <span className="Clamp1">How far do I need to walk daily to get healthy?</span>
                      </a>
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
                <div className="ChatTitle TitleUpdate NoClose" id="7">
                  <div className="Auto">
                    <div className="AutoCol ChatText">
                      <a href="Chat/?id=7">
                        <span className="Clamp1">Can I eat red meat everyday to lose weight?</span>
                      </a>
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
                <div className="ChatTitle TitleUpdate NoClose" id="6">
                  <div className="Auto">
                    <div className="AutoCol ChatText">
                      <a href="Chat/?id=6">
                        <span className="Clamp1">Is Kale good for me?</span>
                      </a>
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
                <div className="ChatTitle TitleUpdate NoClose" id="5">
                  <div className="Auto">
                    <div className="AutoCol ChatText">
                      <a href="Chat/?id=5">
                        <span className="Clamp1">Summarize the MAHA movement.</span>
                      </a>
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
              </div>
            </div>

            <div className="MenuGroup" id="GroupHistory">
              <div className="ButtonBox ButtonBoxLeft">
                <a href="History">
                  <button
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

            <div className="MenuGroup" id="GroupProfile">
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
                        <a
                          className="__cf_email__"
                          data-cfemail="365c57455958765857424344575a585341451855595b"
                          href="/cdn-cgi/l/email-protection"
                        >
                          [email protected]
                        </a>
                      </span>
                    </div>
                    <div className="Disclaimer">42 questions remaining</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* <div className="Notice BoxShadow" id="CookieNotice">
        <div className="Content">
          <div className="ButtonIcon Close CookieAgree" title="Close">
            <div className="Icon">
              <span className="Mask MaskClose"></span>
            </div>
          </div>
          <div className="Subhead">This website uses cookies</div>
          <div className="Text">
            We use cookies to improve your experience on our site. By using this site, you agree to
            our privacy policy.
          </div>
          <div className="ButtonBox ButtonBoxCenter">
            <button className="Button ButtonPrimary CookieAgree">Close</button>
            <a href="Privacy" target="_blank">
              <button className="Button ButtonPrimary">Learn More</button>
            </a>
          </div>
        </div>
      </div>
      <div className="BacktoTop" title="Back to Top">
        <div className="ButtonBox ButtonBoxRight">
          <div className="ButtonIcon ButtonB2T NoClose" title="New Chat">
            <div className="Icon">
              <span className="Mask MaskB2T"></span>
            </div>
          </div>
        </div>
      </div>
      <div className="Dropdown DropdownPrimary BoxShadow NoClose USN" id="DropdownPreset">
        <div className="DropdownTable">
          <div className="DropdownCol">
            <div className="ButtonIcon Close">
              <div className="Icon"></div>
            </div>
            <div className="DropdownBox">
              <div className="DropdownPanel NoClose">
                <div className="PresetGroup"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Popup USN" id="PopupSettings">
        <div className="PopupTable">
          <div className="PopupCol">
            <div className="Content NoClose">
              <div className="ButtonIcon Close SubscribePopupClose" title="Close">
                <div className="Icon">
                  <span className="Mask MaskClose"></span>
                </div>
              </div>
              <div className="Card">
                <div className="Subhead">Chat Settings</div>
                <div className="Block Text">
                  Select an Enoch AI large language model to use in chats.
                </div>
                <div className="SelectModel">
                  <div className="FormRadio ModelSelected">
                    <label>
                      <input id="ModelDefault" name="Model" type="radio" value="0" />
                      <div className="Headline">Default Model</div>
                      <div className="Text">Uses standard AI reasoning to generate answer</div>
                      <span></span>
                    </label>
                  </div>
                  <div className="FormRadio">
                    <label>
                      <input id="ModelReasoning" name="Model" type="radio" value="1" />
                      <div className="Headline">Reasoning Model</div>
                      <div className="Text">Uses a human-like "thought process" to generate answer</div>
                      <span></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Popup USN" id="PopupWelcomeBack">
        <div className="PopupTable">
          <div className="PopupCol">
            <div className="Content NoClose">
              <div className="ButtonIcon Close SubscribePopupClose" title="Close">
                <div className="Icon">
                  <span className="Mask MaskClose"></span>
                </div>
              </div>
              <div className="Card">
                <div className="Block Headline Centered">You have 42 questions remaining</div>
                <div className="Block Text Centered">
                  More questions are added to your account each day.
                  <a href="Support">Learn More</a>
                </div>
                <div className="Block">
                  <div className="ButtonBox ButtonBoxCenter">
                    <button className="Button ButtonPrimary ButtonClose">Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Popup USN NoClose" id="PopupDelete">
        <div className="PopupTable">
          <div className="PopupCol">
            <div className="Content">
              <div className="ButtonIcon Close SubscribePopupClose" title="Close">
                <div className="Icon">
                  <span className="Mask MaskClose"></span>
                </div>
              </div>
              <div className="Card">
                <div className="Subhead">Delete Chat?</div>
                <div className="Block Text">Are you sure you want to delete this chat?</div>
                <div className="ButtonBox ButtonBox ButtonBoxLeft">
                  <button className="Button ButtonAuto ButtonAutoLeft ButtonRed ButtonDelete">
                    <div className="Auto">
                      <div className="AutoCol AutoIcon">
                        <div className="Icon IconSmall">
                          <span className="Mask MaskDelete"></span>
                        </div>
                      </div>
                      <div className="AutoCol AutoLabel">Delete</div>
                    </div>
                  </button>
                  <button className="Button ButtonGray ButtonClose">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Popup USN NoClose" id="PopupClear">
        <div className="PopupTable">
          <div className="PopupCol">
            <div className="Content">
              <div className="ButtonIcon Close SubscribePopupClose" title="Close">
                <div className="Icon">
                  <span className="Mask MaskClose"></span>
                </div>
              </div>
              <div className="Card">
                <div className="Subhead">Clear History?</div>
                <div className="Block Text">
                  Are you sure you want to delete your entire chat history?
                </div>
                <div className="ButtonBox ButtonBox ButtonBoxLeft">
                  <button className="Button ButtonAuto ButtonAutoLeft ButtonRed ButtonClear">
                    <div className="Auto">
                      <div className="AutoCol AutoIcon">
                        <div className="Icon IconSmall">
                          <span className="Mask MaskDelete"></span>
                        </div>
                      </div>
                      <div className="AutoCol AutoLabel">Delete</div>
                    </div>
                  </button>
                  <button className="Button ButtonGray ButtonClose">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Popup USN" id="PopupRegenerate">
        <div className="PopupTable">
          <div className="PopupCol">
            <div className="Content NoClose">
              <div className="ButtonIcon Close SubscribePopupClose" title="Close">
                <div className="Icon">
                  <span className="Mask MaskClose"></span>
                </div>
              </div>
              <div className="Card">
                <div className="Subhead">Are You Sure?</div>
                <div className="Block Text">
                  Regenerating a response will use 1 question from your account.
                </div>
                <div className="ButtonBox ButtonBoxLeft">
                  <button className="Button ButtonGray ButtonClose">Cancel</button>
                  <button className="Button ButtonAuto ButtonAutoLeft ButtonPrimary ButtonClose">
                    <div className="Auto">
                      <div className="AutoCol AutoIcon">
                        <div className="Icon IconSmall">
                          <span className="Mask MaskAI"></span>
                        </div>
                      </div>
                      <div className="AutoCol AutoLabel">Regenerate</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Popup USN" id="PopupProfile">
        <div className="PopupTable">
          <div className="PopupCol">
            <div className="Content NoClose">
              <div className="ButtonIcon Close SubscribePopupClose" title="Close">
                <div className="Icon">
                  <span className="Mask MaskClose"></span>
                </div>
              </div>
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
                      <b>
                        <a
                          className="__cf_email__"
                          data-cfemail="0c666d7f63624c626d78797e6d6062697b7f226f6361"
                          href="/cdn-cgi/l/email-protection"
                        >
                          [email protected]
                        </a>
                      </b>
                      •<a href="Auth/Logout">Log out</a>
                    </div>
                  </div>
                  <div className="Auto ProfileItem">
                    <div className="AutoCol AutoIcon">
                      <div className="Icon">
                        <span className="Mask MaskProfile"></span>
                      </div>
                    </div>
                    <div className="AutoCol AutoLabel">
                      <b>Bronze Member</b>•
                      <a href="Subscribe" target="_blank">
                        Learn More
                      </a>
                    </div>
                  </div>
                  <div className="Auto ProfileItem">
                    <div className="AutoCol AutoIcon">
                      <div className="Icon">
                        <span className="Mask MaskAI"></span>
                      </div>
                    </div>
                    <div className="AutoCol AutoLabel">
                      <b>42 Questions Remaining</b>•
                      <a href="Support" target="_blank">
                        How to Get More
                      </a>
                    </div>
                  </div>
                </div>
                <div className="ProfileGroup">
                  <div className="Text">Your email address is connected to the following:</div>
                  <div className="Auto ProfileItem" id="SubscribeEnabled">
                    <div className="AutoCol AutoIcon">
                      <div className="Icon">
                        <span className="Mask MaskCheck"></span>
                      </div>
                    </div>
                    <div className="AutoCol AutoLabel">
                      <b>Health Ranger Store Subscriber</b>
                    </div>
                  </div>
                  <div className="Auto ProfileItem" id="StoreDisabled">
                    <div className="AutoCol AutoIcon">
                      <div className="Icon">
                        <span className="Mask MaskDisabled"></span>
                      </div>
                    </div>
                    <div className="AutoCol AutoLabel">
                      <b>Health Ranger Store Buyer</b>
                      <a href="Support" target="_blank">
                        Learn More
                      </a>
                    </div>
                  </div>
                </div>
                <div className="ProfileGroup">
                  <div className="ProfileBox">
                    <div className="ProfileInfo">
                      <div className="Text">
                        Your chat history contains chats from the past 30 days. Chats older than
                        this are not kept.
                      </div>
                    </div>
                    <div className="ProfileAction">
                      <div className="ButtonBox">
                        <button className="Button ButtonRed ButtonClearConfirm">Clear History</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ProfileGroup">
                  <div className="ThemeBox">
                    <span className="ThemeLabel">Theme:</span>
                    <span className="ThemeTab" id="ThemeLight">
                      Light
                    </span>
                    <span className="ThemeTab ThemeActive" id="ThemeDark">
                      Dark
                    </span>
                    <span className="ThemeTab" id="ThemeSystem">
                      System
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Popup USN" id="PopupUpgrade">
        <div className="PopupTable">
          <div className="PopupCol">
            <div className="Content NoClose">
              <div className="ButtonIcon Close SubscribePopupClose" title="Close">
                <div className="Icon">
                  <span className="Mask MaskClose"></span>
                </div>
              </div>
              <div className="Card">
                <div className="Block Headline Centered">Upgrade to Unlock Access</div>
                <div className="Block Text Centered">
                  This exclusive tool is available to Gold and Platinum members.
                  <a href="Support" target="_blank">
                    Please visit our support area
                  </a>
                  for more information.
                </div>
                <div className="Block">
                  <div className="ButtonBox ButtonBoxCenter">
                    <button className="Button ButtonPrimary ButtonClose">Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Layout;
