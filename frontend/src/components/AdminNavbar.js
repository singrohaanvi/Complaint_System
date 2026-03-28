import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaChartBar, FaFileAlt, FaComments, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';

function AdminNavbar({ admin, handleAdminLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: '/admin/dashboard', icon: FaChartBar, label: 'Dashboard' },
    { to: '/admin/manage-complaints', icon: FaFileAlt, label: 'Manage Complaints' },
    { to: '/admin/manage-feedback', icon: FaComments, label: 'Feedback' },
  ];

  return (
    <nav className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white shadow-2xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/admin/dashboard" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-full bg-white text-orange-600 flex items-center justify-center font-bold text-lg group-hover:shadow-lg transition">
              <FaShieldAlt />
            </div>
            <span className="text-2xl font-bold hidden md:block group-hover:text-orange-200 transition">
              Admin Panel
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className="flex items-center space-x-1 px-4 py-2 rounded-lg hover:bg-white hover:text-orange-600 transition transform hover:scale-105 text-sm font-medium"
                >
                  <Icon className="text-lg" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* User Section */}
          <div className="flex items-center gap-4">
            {/* User Info */}
            <div className="hidden md:flex items-center space-x-3 pl-4 border-l border-orange-400">
              <div className="w-10 h-10 rounded-full bg-white text-orange-600 flex items-center justify-center font-bold">
                {admin?.name?.charAt(0).toUpperCase()}
              </div>
              <span className="hidden lg:block text-sm font-medium">{admin?.name}</span>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleAdminLogout}
              className="hidden md:flex items-center space-x-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-medium transition transform hover:scale-105"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-2xl hover:text-orange-200 transition"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-orange-400 pt-4 space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-white hover:text-orange-600 transition"
                >
                  <Icon />
                  <span>{link.label}</span>
                </Link>
              );
            })}
            <div className="border-t border-orange-400 pt-4 mt-4 space-y-2">
              <div className="flex items-center space-x-2 px-4 py-2">
                <div className="w-8 h-8 rounded-full bg-white text-orange-600 flex items-center justify-center font-bold text-sm">
                  {admin?.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium">{admin?.name}</span>
              </div>
              <button
                onClick={handleAdminLogout}
                className="w-full flex items-center justify-center space-x-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-medium transition"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default AdminNavbar;
