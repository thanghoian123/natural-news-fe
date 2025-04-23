import React from 'react';
import logoColor from '../../assets/Images/Logo-Color.svg'; // Adjust path as needed
import logoWhite from '../../assets/Images/Logo-white.svg'; // Adjust path as needed
import { useTheme } from '../../contexts/ThemeContext';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar';
function NormalLayout({ children }) {
  const { theme } = useTheme();

  const logoSrc = theme === 'dark' ? logoWhite : logoColor;
  const goTopButton = () => {
    return (
      <div class="BacktoTop" title="Back to Top">
        <div class="ButtonBox ButtonBoxRight">
          <div class="ButtonIcon ButtonB2T NoClose" title="New Chat">
            <div class="Icon">
              <span class="Mask MaskB2T"></span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div>
      <Sidebar />
      <div className="PageOpen" id="Page">
        {children}
      </div>

      <div class="Section" id="SectionFooter">
        <div class="Content">
          <div class="FooterTable">
            <div class="FooterCol FooterColLeft">
              <a href="About">About Enoch</a>
              <a href="Contact">Contact Us</a>
              <a href="Notice">Notice</a>
              <a href="License">License Information</a>
            </div>
            <div class="FooterCol FooterColRight">
              <a href="Terms">Terms of Service</a>
              <a href="Privacy">Privacy Policy</a>
              <a href="Credits">Credits</a>
              <a href="Copyrights">Copyrights</a>
            </div>
          </div>
        </div>
      </div>

      {goTopButton()}
    </div>
  );
}

export default NormalLayout;
