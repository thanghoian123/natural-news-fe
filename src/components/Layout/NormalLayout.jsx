import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar';
function NormalLayout({ children }) {
  const pageRef = useRef(null);
  const [showButton, setShowButton] = useState(false);
  const [fadeClass, setFadeClass] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const pageScrollTop = pageRef.current?.scrollTop || 0;
      const windowScrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;

      const scrollTop = Math.max(pageScrollTop, windowScrollTop);
      console.log('📱 Combined Scroll Top:', scrollTop);

      if (scrollTop > 200) {
        setFadeClass('fade-in');
        setShowButton(true);
      } else {
        setFadeClass('fade-out');
        setShowButton(false);
      }
    };

    const pageElement = pageRef.current;
    pageElement?.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleScroll);

    return () => {
      pageElement?.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    if (pageRef.current?.scrollTop > 0) {
      pageRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
      <div className="PageOpen" id="Page" ref={pageRef}>
        {children}

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
      </div>

      {showButton && goTopButton()}
    </div>
  );
}

export default NormalLayout;
