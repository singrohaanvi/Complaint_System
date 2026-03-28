import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaFileAlt, FaChartBar, FaStar, FaRobot, FaBell, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';

function Navbar({ user, handleLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: '/dashboard', icon: FaHome, label: 'Dashboard' },
    { to: '/submit-complaint', icon: FaFileAlt, label: 'File Complaint' },
    { to: '/complaint-status', icon: FaChartBar, label: 'My Complaints' },
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white shadow-2xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-lg group-hover:shadow-lg transition">
              CC
            </div>
            <span className="text-2xl font-bold hidden md:block group-hover:text-blue-200 transition">
              College System
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
                  className="flex items-center space-x-1 px-4 py-2 rounded-lg hover:bg-white hover:text-blue-600 transition transform hover:scale-105 text-sm font-medium"
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
            <div className="hidden md:flex items-center space-x-3 pl-4 border-l border-blue-400">
              <div className="w-10 h-10 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <span className="hidden lg:block text-sm font-medium">{user?.name}</span>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="hidden md:flex items-center space-x-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-medium transition transform hover:scale-105"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-2xl hover:text-blue-200 transition"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-blue-400 pt-4 space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-white hover:text-blue-600 transition"
                >
                  <Icon />
                  <span>{link.label}</span>
                </Link>
              );
            })}
            <div className="border-t border-blue-400 pt-4 mt-4 space-y-2">
              <div className="flex items-center space-x-2 px-4 py-2">
                <div className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-sm">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium">{user?.name}</span>
              </div>
              <button
                onClick={handleLogout}
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

export default Navbar;
