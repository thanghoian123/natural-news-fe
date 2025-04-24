import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar';
function NormalLayout({ children }) {
  const [visible, setVisible] = useState(false);
  const [fadeClass, setFadeClass] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > 200) {
        setFadeClass('fade-in');
        setVisible(true);
      } else {
        setFadeClass('fade-out');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goTopButton = () => {
    return (
      <div
        className={`BacktoTop fixed bottom-6 right-6 z-50 ${fadeClass}`}
        title="Back to Top"
        onClick={scrollToTop}
      >
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

      {visible && goTopButton()}
    </div>
  );
}

export default NormalLayout;
