import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';
import HomePage from './pages/HomePage';
import ReceivePage from './pages/ReceivePage';

import withAuth from './HOCs/withAuth';
import './index.css';
import './global.css';
import ProtectedLayout from './components/Layout/ProtectLayout';
import ToolPage from './pages/ToolPage';
import SupportPage from './pages/SupportPage'; // Assuming you have a
import HistoryPage from './pages/HistoryPage';
import UnProtectLayout from './components/Layout/UnProtectLayout';
import TermPage from './pages/TermPage';
import PrivacyPage from './pages/PrivacyPage';
import QueuePage from './pages/QueuePage';

const ProtectedChat = withAuth(ChatPage);
const ProtectedHome = withAuth(HomePage);
const ProtectedTool = withAuth(ToolPage);
const ProtectedHistory = withAuth(HistoryPage);

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<UnProtectLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/received" element={<ReceivePage />} />
          <Route path="/queue" element={<QueuePage />} />
        </Route>

        {/* Protected Routes Inside Layout */}
      </Routes>
    </Router>
  );
}

export default App;
