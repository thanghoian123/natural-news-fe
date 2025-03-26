import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';
import HomePage from './pages/HomePage';
import withAuth from './HOCs/withAuth';
import './index.css';
import ProtectedLayout from './components/Layout/ProtectLayout';
import ToolPage from './pages/ToolPage';

const ProtectedChat = withAuth(ChatPage);
const ProtectedHome = withAuth(HomePage);
const ProtectedTool = withAuth(ToolPage);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {/* Protected Routes Inside Layout */}
        <Route element={<ProtectedLayout />}>
          <Route path="/chat" element={<ProtectedChat />} />
          <Route path="/home/*" element={<ProtectedHome />} />
          <Route path="/tools/:category" element={<ProtectedTool />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
