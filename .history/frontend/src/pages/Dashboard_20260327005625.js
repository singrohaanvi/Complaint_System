import React from 'react';
import { Link } from 'react-router-dom';
import { FaFileAlt, FaChartBar, FaStar, FaRobot, FaBell, FaUser, FaArrowRight } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Dashboard({ user, handleLogout }) {
  const features = [
    {
      to: '/submit-complaint',
      icon: FaFileAlt,
      title: 'Submit Complaint',
      description: 'File a complaint about hostel, academics, infrastructure, or library issues.',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
    {
      to: '/complaint-status',
      icon: FaChartBar,
      title: 'Track Complaints',
      description: 'View the status and responses for all your submitted complaints.',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
    },
    {
      to: '/submit-feedback',
      icon: FaStar,
      title: 'Submit Feedback',
      description: 'Share your feedback about teachers and courses.',
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
    },
    {
      to: '/chatbot',
      icon: FaRobot,
      title: 'AI Chatbot',
      description: 'Ask questions about college timings, departments, hostels, and more.',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
    },
    {
      to: '/notifications',
      icon: FaBell,
      title: 'Notifications',
      description: 'View all notifications about your complaints and feedback.',
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col">
      <Navbar user={user} handleLogout={handleLogout} />

      {/* Main Content */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl shadow-lg">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-800">Welcome back, {user?.name}!</h1>
              <p className="text-gray-600">You're all set to manage your complaints and feedback</p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-10">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Link key={index} to={feature.to}>
                <div className={`${feature.bgColor} ${feature.borderColor} border-2 rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 p-6 h-full cursor-pointer group`}>
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.color} text-white mb-4 group-hover:shadow-lg transition transform group-hover:scale-110`}>
                    <Icon className="text-lg" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h2>
                  <p className="text-sm text-gray-600 mb-4">{feature.description}</p>
                  <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700 transition">
                    <span className="text-sm">Explore</span>
                    <FaArrowRight className="ml-2 text-xs group-hover:translate-x-1 transition" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Profile Card */}
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-lg border-2 border-gray-100 p-8 mb-10">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl shadow-lg">
              <FaUser />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Your Profile</h2>
              <p className="text-gray-600">Student Information</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-2xl p-6 border-l-4 border-blue-500">
              <p className="text-gray-600 text-sm font-semibold mb-1">Full Name</p>
              <p className="text-xl font-bold text-gray-800">{user?.name}</p>
            </div>
            <div className="bg-green-50 rounded-2xl p-6 border-l-4 border-green-500">
              <p className="text-gray-600 text-sm font-semibold mb-1">Email Address</p>
              <p className="text-xl font-bold text-gray-800 break-all">{user?.email}</p>
            </div>
            <div className="bg-purple-50 rounded-2xl p-6 border-l-4 border-purple-500">
              <p className="text-gray-600 text-sm font-semibold mb-1">Department</p>
              <p className="text-xl font-bold text-gray-800">{user?.department}</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-md p-6 border-t-4 border-blue-500 hover:shadow-lg transition">
            <p className="text-gray-600 text-sm font-semibold mb-2">Your Role</p>
            <p className="text-2xl font-bold text-blue-600">Student</p>
            <p className="text-gray-500 text-xs mt-2">Active Member</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 border-t-4 border-green-500 hover:shadow-lg transition">
            <p className="text-gray-600 text-sm font-semibold mb-2">Account Status</p>
            <p className="text-2xl font-bold text-green-600">Active</p>
            <p className="text-gray-500 text-xs mt-2">Ready to use</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 border-t-4 border-purple-500 hover:shadow-lg transition">
            <p className="text-gray-600 text-sm font-semibold mb-2">Support</p>
            <p className="text-2xl font-bold text-purple-600">24/7</p>
            <p className="text-gray-500 text-xs mt-2">Always available</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Dashboard;
