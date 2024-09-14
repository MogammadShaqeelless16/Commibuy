import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Menu from './components/Menu';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ShopsPage from './pages/ShopsPage';
import ShopDetailsPage from './pages/ShopDetailsPage';
import CrmLayout from './pages/crm/CrmLayout';
import CrmDashboard from './pages/crm/CrmDashboard';
import CrmCustomers from './pages/crm/CrmCustomers';
import CrmOrders from './pages/crm/CrmOrders';
import CrmProducts from './pages/crm/CrmProducts';
import CrmLeads from './pages/crm/CrmLeads';  // Add CrmLeads import

function LayoutWrapper({ children }) {
  const location = useLocation();

  const isCrmRoute = location.pathname.startsWith('/crm');

  return (
    <>
      {!isCrmRoute && <Menu />} {/* Conditionally hide the Menu for CRM routes */}
      {children}
      {!isCrmRoute && <Footer />} {/* Conditionally hide the Footer for CRM routes */}
    </>
  );
}

function App() {
  return (
    <Router>
      <LayoutWrapper>
        <main>
          <Routes>
            {/* Non-CRM Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/shops" element={<ShopsPage />} />
            <Route path="/shops/:shopSlug" element={<ShopDetailsPage />} />

            {/* CRM Routes */}
            <Route path="/crm" element={<CrmLayout />}>
              <Route path="dashboard" element={<CrmDashboard />} />
              <Route path="customers" element={<CrmCustomers />} />
              <Route path="orders" element={<CrmOrders />} />
              <Route path="products" element={<CrmProducts />} />
              <Route path="leads" element={<CrmLeads />} /> {/* Add Leads route */}
            </Route>
          </Routes>
        </main>
      </LayoutWrapper>
    </Router>
  );
}

export default App;
