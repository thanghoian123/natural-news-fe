import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';
import './index.css';
import withAuth from './HOCs/withAuth';

const ProtectedChat = withAuth(ChatPage); // Wrap HomePage with the HOC

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/chat" element={<ProtectedChat />} />
      </Routes>
    </Router>
  );
}

export default App;
