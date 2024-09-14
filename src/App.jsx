// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './components/Menu';
import Footer from './components/Footer'; // Import Footer
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ShopsPage from './pages/ShopsPage';
import ShopDetailsPage from './pages/ShopDetailsPage';

function App() {
  return (
    <Router>
      <Menu />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/shops" element={<ShopsPage />} />
          <Route path="/shops/:shopSlug" element={<ShopDetailsPage />} />
        </Routes>
      </main>
      <Footer /> 
    </Router>
  );
}

export default App;
