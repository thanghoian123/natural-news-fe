import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/Home';
import './index.css';
import withAuth from './HOCs/withAuth';

const ProtectedHome = withAuth(HomePage); // Wrap HomePage with the HOC

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<ProtectedHome />} />
      </Routes>
    </Router>
  );
}

export default App;
