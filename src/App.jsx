import React from 'react'; 
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Menu from './components/Menu';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage'
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import BusinessPage from './pages/BusinessPage';
import BusinessDetailsPage from './pages/BusinessDetailsPage';
import CrmLayout from './pages/crm/CrmLayout';
import CrmDashboard from './pages/crm/CrmDashboard';
import CrmCustomers from './pages/crm/CrmCustomers';
import CrmOrders from './pages/crm/CrmOrders';
import CrmProducts from './pages/crm/CrmProducts';
import CrmLeads from './pages/crm/CrmLeads';
import MyBusinessPage from './pages/crm/MyBusinessPage';
import MyProfilePage from './pages/crm/MyProfilePage';
import UserManagementPage from './pages/crm/UserManagementPage';
import BusinessManagementPage from './pages/crm/BusinessManagementPage';
import CrmServices from './pages/crm/CrmServices';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ProtectedRoute from './components/ProtectedRoute';
import PricingPage from './pages/PricingPage';
import MediaPage from './pages/MediaPage';

function LayoutWrapper({ children }) {
  const location = useLocation();
  const isBusinessDetailsPage = location.pathname.startsWith('/business/') && location.pathname.length > '/business/'.length;
  const isCRM = location.pathname.startsWith('/crm/') && location.pathname.length > '/crm/'.length;

  return (
    <>
      {!isBusinessDetailsPage && !isCRM && <Menu />}
      {children}
      {!isCRM && <Footer />}
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
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/media" element={<MediaPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/business" element={<BusinessPage />} />
            <Route path="/business/:businessSlug" element={<BusinessDetailsPage />} />
            <Route path="/price" element={<PricingPage />} />

            {/* Protected CRM Routes */}
            <Route
              path="/crm"
              element={
                <ProtectedRoute>
                  <CrmLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<CrmDashboard />} />
              <Route path="customers" element={<CrmCustomers />} />
              <Route path="orders" element={<CrmOrders />} />
              <Route path="products" element={<CrmProducts />} />
              <Route path="services" element={<CrmServices />} /> {/* Add Services route */}
              <Route path="leads" element={<CrmLeads />} />
              <Route path="my-business" element={<MyBusinessPage />} /> {/* Add My Business route */}
              <Route path="my-profile" element={<MyProfilePage />} /> {/* Add My Profile route */}
              <Route path="admin/user-management" element={<UserManagementPage />} /> {/* Add User Management route */}
              <Route path="admin/business-management" element={<BusinessManagementPage />} /> {/* Add Business Management route */}
            </Route>
          </Routes>
        </main>
      </LayoutWrapper>
    </Router>
  );
}

export default App;
