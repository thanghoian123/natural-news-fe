import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';
import HomePage from './pages/HomePage';
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

const ProtectedChat = withAuth(ChatPage);
const ProtectedHome = withAuth(HomePage);
const ProtectedTool = withAuth(ToolPage);
const ProtectedHistory = withAuth(HistoryPage);

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<UnProtectLayout />}>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/support/home" element={<SupportPage />} />
          <Route path="/support/terms" element={<TermPage />} />
          <Route path="/support/Privacy" element={<PrivacyPage />} />
        </Route>

        {/* Protected Routes Inside Layout */}
        <Route element={<ProtectedLayout />}>
          <Route path="/chat" element={<ProtectedChat />} />
          <Route path="/home/*" element={<ProtectedHome />} />
          <Route path="/tools/:category" element={<ProtectedTool />} />
          <Route path="/history" element={<ProtectedHistory />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
