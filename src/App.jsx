import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChatPage from './pages/ChatPage';
import HomePage from './pages/HomePage';
import ReceivePage from './pages/ReceivePage';
import QueuePage from './pages/QueuePage';

import withAuth from './HOCs/withAuth';
import './index.css';
import './global.css';
import ProtectedLayout from './components/Layout/ProtectLayout';
import ToolPage from './pages/ToolPage';
import HistoryPage from './pages/HistoryPage';
import UnProtectLayout from './components/Layout/UnProtectLayout';
import TermPage from './pages/TermPage';
import PrivacyPage from './pages/PrivacyPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LicensePage from './pages/LicensePage';
import CreditsPage from './pages/CreditsPage';
import CopyrightsPage from './pages/CopyrightsPage';
import NoticePage from './pages/NoticePage';
import PromptingGuidePage from './pages/PromptingGuidePage';
import DownloadPage from './pages/DownloadPage';
import SubscribePage from './pages/SubcribePage';

const ProtectedChat = withAuth(ChatPage);
const ProtectedHome = withAuth(HomePage);
const ProtectedTool = withAuth(ToolPage);
const ProtectedHistory = withAuth(HistoryPage);

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<UnProtectLayout />}>
          <Route path="/home/*" element={<HomePage />} />
          <Route path="/received" element={<ReceivePage />} />
          <Route path="/queue" element={<QueuePage />} />
          <Route path="/freeai/About" element={<AboutPage />} />
          <Route path="/freeai/Contact" element={<ContactPage />} />
          <Route path="/freeai/Notice" element={<NoticePage />} />
          <Route path="/freeai/License" element={<LicensePage />} />
          <Route path="/freeai/Credits" element={<CreditsPage />} />
          <Route path="/freeai/Copyrights" element={<CopyrightsPage />} />
          <Route path="/freeai/Privacy" element={<PrivacyPage />} />
          <Route path="/freeai/Terms" element={<TermPage />} />
          <Route path="/freeai/Guide" element={<PromptingGuidePage />} />
          <Route path="/freeai/Download" element={<DownloadPage />} />
          <Route path="/freeai/Subscribe" element={<SubscribePage />} />
        </Route>

        {/* Protected Routes Inside Layout */}
      </Routes>
    </Router>
  );
}

export default App;
