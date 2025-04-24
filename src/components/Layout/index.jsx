import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';

const Layout = ({ children }) => {
  const [showButton, setShowButton] = useState(false);
  const [fadeClass, setFadeClass] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      console.log('Scroll event triggered');
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > 200) {
        setFadeClass('fade-in');
        setShowButton(true);
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

  return (
    <div>
      <div className="PageOpen" id="Page">
        {children}
      </div>
      <Sidebar />

      {showButton && (
        <div
          className={`BacktoTop fixed bottom-6 right-6 z-50 ${fadeClass}`}
          title="Back to Top"
          onClick={scrollToTop}
        >
          <div className="ButtonBox ButtonBoxRight">
            <div className="ButtonIcon ButtonB2T NoClose" title="New Chat">
              <div className="Icon">
                <span className="Mask MaskB2T"></span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
