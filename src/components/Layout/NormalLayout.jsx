import React from 'react';
import logoColor from '../../assets/Images/Logo-Color.svg'; // Adjust path as needed
import logoWhite from '../../assets/Images/Logo-White.svg'; // Adjust path as needed
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
              <Link to="/freeai/About">About Enoch</Link>
              <Link to="/freeai/Contact">Contact Us</Link>
              <Link to="/freeai/Notice">Notice</Link>
              <Link to="/freeai/License">License Information</Link>
            </div>
            <div class="FooterCol FooterColRight">
            <Link to="/freeai/Terms">Terms of Service</Link>
              <Link to="/freeai/Privacy">Privacy Policy</Link>
              <Link to="/freeai/Credits">Credits</Link>
              <Link to="/freeai/Copyrights">Copyrights</Link>
            </div>
          </div>
        </div>
      </div>

      {goTopButton()}
    </div>
  );
}

export default NormalLayout;
