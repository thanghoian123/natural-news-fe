import React, { useEffect, useRef, useState } from 'react';
import Sidebar from '../Sidebar';

const Layout = ({ children }) => {
  const pageRef = useRef(null);
  const [showButton, setShowButton] = useState(false);
  const [fadeClass, setFadeClass] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const pageScrollTop = pageRef.current?.scrollTop || 0;
      const windowScrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;

      const scrollTop = Math.max(pageScrollTop, windowScrollTop);

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

  return (
    <div>
      <div className="PageOpen" id="Page" ref={pageRef}>
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
