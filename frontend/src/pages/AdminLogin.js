import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEnvelope, FaLock, FaSignInAlt, FaSpinner, FaShieldAlt } from 'react-icons/fa';
import Footer from '../components/Footer';

function AdminLogin({ setIsAdminAuthenticated, setAdmin }) {
  const [email, setEmail] = useState('admin@college.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', {
        email,
        password,
      });

      localStorage.setItem('adminToken', response.data.token);
      localStorage.setItem('admin', JSON.stringify(response.data.admin));
      setIsAdminAuthenticated(true);
      setAdmin(response.data.admin);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Decorative Elements */}
          <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-r from-orange-200 to-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-gradient-to-r from-red-200 to-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

          {/* Card */}
          <div className="relative bg-white rounded-3xl shadow-2xl p-8 md:p-10 backdrop-blur-xl border border-white/20">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-red-600 mb-4 shadow-lg">
                <FaShieldAlt className="text-white text-2xl" />
              </div>
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 mb-2">
                Admin Portal
              </h1>
              <p className="text-gray-600">Secure administration access</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-2xl mb-6 flex items-center space-x-2 animate-shake">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Input */}
              <div className="relative group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Admin Email</label>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-200 transition bg-gray-50 hover:bg-white"
                    placeholder="admin@college.edu"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="relative group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-orange-500 transition" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-200 transition bg-gray-50 hover:bg-white"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-3 px-4 rounded-2xl transition transform hover:scale-105 hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    <span>Logging in...</span>
                  </>
                ) : (
                  <>
                    <FaSignInAlt />
                    <span>Admin Login</span>
                  </>
                )}
              </button>
            </form>

            {/* Info Box */}
            <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border-2 border-orange-200">
              <p className="text-xs text-gray-600 font-semibold mb-3 flex items-center space-x-1">
                <FaShieldAlt className="text-orange-500" />
                <span>Demo Credentials</span>
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Email:</strong> admin@college.com
              </p>
              <p className="text-sm text-gray-700">
                <strong>Password:</strong> admin123
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animate-shake {
          animation: shake 0.5s;
        }
      `}</style>
    </div>
  );
}

export default AdminLogin;
    