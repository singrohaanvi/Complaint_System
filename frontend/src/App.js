import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import FeaturesDetailsPage from './pages/FeaturesDetailsPage';
import AboutPage from './pages/AboutPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import SubmitComplaint from './pages/SubmitComplaint';
import ComplaintStatus from './pages/ComplaintStatus';
import SubmitFeedback from './pages/SubmitFeedback';
import Chatbot from './pages/Chatbot';
import Notifications from './pages/Notifications';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminManageComplaints from './pages/AdminManageComplaints';
import AdminManageFeedback from './pages/AdminManageFeedback';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    const adminToken = localStorage.getItem('adminToken');
    const storedAdmin = localStorage.getItem('admin');

    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }

    if (adminToken && storedAdmin) {
      setIsAdminAuthenticated(true);
      setAdmin(JSON.parse(storedAdmin));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('admin');
    setIsAdminAuthenticated(false);
    setAdmin(null);
  };

  return (
    <Router>
      <Routes>
        {/* Home Page - Always Accessible */}
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<FeaturesDetailsPage />} />
        <Route path="/about" element={<AboutPage />} />
        
        {/* Student Routes */}
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin setIsAdminAuthenticated={setIsAdminAuthenticated} setAdmin={setAdmin} />} />

        {isAdminAuthenticated ? (
          <>
            <Route path="/admin/dashboard" element={<AdminDashboard admin={admin} handleAdminLogout={handleAdminLogout} />} />
            <Route path="/admin/manage-complaints" element={<AdminManageComplaints admin={admin} handleAdminLogout={handleAdminLogout} />} />
            <Route path="/admin/manage-feedback" element={<AdminManageFeedback admin={admin} handleAdminLogout={handleAdminLogout} />} />
            <Route path="/admin/*" element={<Navigate to="/admin/dashboard" />} />
          </>
        ) : null}

        {isAuthenticated ? (
          <>
            <Route path="/dashboard" element={<Dashboard user={user} handleLogout={handleLogout} />} />
            <Route path="/submit-complaint" element={<SubmitComplaint user={user} handleLogout={handleLogout} />} />
            <Route path="/complaint-status" element={<ComplaintStatus user={user} handleLogout={handleLogout} />} />
            <Route path="/submit-feedback" element={<SubmitFeedback user={user} handleLogout={handleLogout} />} />
            <Route path="/chatbot" element={<Chatbot user={user} handleLogout={handleLogout} />} />
            <Route path="/notifications" element={<Notifications user={user} handleLogout={handleLogout} />} />
            <Route path="/*" element={<Navigate to="/dashboard" />} />
          </>
        ) : (
          <>
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
