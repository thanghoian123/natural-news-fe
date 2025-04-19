import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import './index.css';
import ProtectedLayout from './components/Layout/ProtectLayout';
import ReceivedPage from './pages/ReceivedPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {/* Protected Routes Inside Layout */}
        <Route element={<ProtectedLayout />}>
          <Route path="/home/*" element={<HomePage />} />
          <Route path="/Received" element={<ReceivedPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
