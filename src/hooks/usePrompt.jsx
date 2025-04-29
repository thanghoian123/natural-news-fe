import { useEffect } from 'react';

export function usePrompt(message, when = true) {
  useEffect(() => {
    if (!when) return;

    const handleWindowClose = (e) => {
      e.preventDefault();
      e.returnValue = message;
    };

    const handleBrowseAway = (e) => {
      if (window.confirm(message)) {
        // allow navigation
      } else {
        // cancel navigation
        window.history.pushState(null, null, window.location.pathname);
      }
    };

    window.addEventListener('beforeunload', handleWindowClose);
    window.addEventListener('popstate', handleBrowseAway);

    return () => {
      window.removeEventListener('beforeunload', handleWindowClose);
      window.removeEventListener('popstate', handleBrowseAway);
    };
  }, [message, when]);
}
