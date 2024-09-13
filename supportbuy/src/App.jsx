// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './routes/HomePage';
import ProductPage from './routes/ProductPage';
import AboutPage from './routes/AboutPage';
import Menu from './components/Menu'; // Import the Menu component

function App() {
  return (
    <Router>
      <Menu /> {/* Include the Menu component */}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
