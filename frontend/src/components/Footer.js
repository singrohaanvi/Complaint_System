import React from 'react';
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaHeart,
} from 'react-icons/fa';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white pt-12 pb-6">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* About Section */}
        <div className="fade-in">
          <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            College System
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            A modern digital platform for managing student complaints and feedback with ease and transparency.
          </p>
          <div className="mt-4 flex space-x-4">
            <a href="#" className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-full hover:shadow-lg hover:shadow-blue-500/50 transition transform hover:scale-110">
              <FaFacebook size={18} />
            </a>
            <a href="#" className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-full hover:shadow-lg hover:shadow-blue-500/50 transition transform hover:scale-110">
              <FaTwitter size={18} />
            </a>
            <a href="#" className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-full hover:shadow-lg hover:shadow-blue-500/50 transition transform hover:scale-110">
              <FaLinkedin size={18} />
            </a>
            <a href="#" className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-full hover:shadow-lg hover:shadow-blue-500/50 transition transform hover:scale-110">
              <FaInstagram size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="fade-in" style={{ animationDelay: '0.1s' }}>
          <h4 className="text-lg font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="/" className="hover:text-blue-400 transition transform hover:translate-x-1">
                → Home
              </a>
            </li>
            <li>
              <a href="/dashboard" className="hover:text-blue-400 transition transform hover:translate-x-1">
                → Dashboard
              </a>
            </li>
            <li>
              <a href="/submit-complaint" className="hover:text-blue-400 transition transform hover:translate-x-1">
                → File Complaint
              </a>
            </li>
            <li>
              <a href="/submit-feedback" className="hover:text-blue-400 transition transform hover:translate-x-1">
                → Send Feedback
              </a>
            </li>
            <li>
              <a href="/chatbot" className="hover:text-blue-400 transition transform hover:translate-x-1">
                → AI Chatbot
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="fade-in" style={{ animationDelay: '0.2s' }}>
          <h4 className="text-lg font-bold mb-4">Contact Info</h4>
          <ul className="space-y-3 text-gray-400">
            <li className="flex items-center space-x-2 hover:text-blue-400 transition">
              <FaMapMarkerAlt className="text-blue-400" />
              <span>123 Campus Lane, City</span>
            </li>
            <li className="flex items-center space-x-2 hover:text-blue-400 transition">
              <FaPhone className="text-blue-400" />
              <span>+1 (555) 123-4567</span>
            </li>
            <li className="flex items-center space-x-2 hover:text-blue-400 transition">
              <FaEnvelope className="text-blue-400" />
              <span>support@college.edu</span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="fade-in" style={{ animationDelay: '0.3s' }}>
          <h4 className="text-lg font-bold mb-4">Newsletter</h4>
          <p className="text-gray-400 text-sm mb-4">
            Subscribe to get updates about system improvements.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter email"
              className="bg-gray-700 text-white px-4 py-2 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-sm"
            />
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-r-full hover:shadow-lg hover:shadow-blue-500/50 transition font-medium">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 border-t border-gray-700 my-8"></div>

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-400 text-sm mb-4 md:mb-0">
          © {currentYear} College Complaint System. All rights reserved.
        </p>
        <p className="text-gray-400 text-sm flex items-center space-x-1">
          <span>Made with</span>
          <FaHeart className="text-red-500 animate-pulse" />
          <span>by the Development Team</span>
        </p>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-in {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </footer>
  );
}

export default Footer;
