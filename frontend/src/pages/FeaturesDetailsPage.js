import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaFileAlt,
  FaChartBar,
  FaStar,
  FaRobot,
  FaBell,
  FaCheckCircle,
  FaArrowLeft,
  FaClock,
  FaShieldAlt,
  FaMobile,
  FaHeadset,
  FaChartLine,
} from 'react-icons/fa';
import Footer from '../components/Footer';

function FeaturesDetailsPage() {
  const [selectedFeature, setSelectedFeature] = useState('complaints');

  const features = {
    complaints: {
      title: 'File & Manage Complaints',
      icon: FaFileAlt,
      color: 'from-blue-500 to-blue-600',
      description:
        'Report any issues you face on campus with detailed descriptions, images, and documentation.',
      benefits: [
        'Multiple categories (Hostel, Academics, Infrastructure, Library)',
        'Upload images and supporting documents',
        'Real-time status tracking',
        'Receive admin responses and updates',
        'Anonymous reporting option',
        'Complaint history and archive',
      ],
      features: [
        {
          title: 'Easy Submission',
          description: 'File a complaint in less than 5 minutes with our simple form',
        },
        {
          title: 'File Attachments',
          description: 'Upload images, PDFs, or documents as evidence',
        },
        {
          title: 'Priority Levels',
          description: 'Mark complaints as urgent for faster resolution',
        },
        {
          title: 'Category Selection',
          description: '5 major categories to classify your complaint accurately',
        },
      ],
    },
    tracking: {
      title: 'Track & Monitor Status',
      icon: FaChartBar,
      color: 'from-green-500 to-green-600',
      description: 'Monitor the progress of your complaints in real-time with detailed status updates.',
      benefits: [
        'Real-time status updates',
        'Admin response notifications',
        'Progress timeline visualization',
        'Resolution details and feedback',
        'Expected resolution time',
        'Communication history',
      ],
      features: [
        {
          title: 'Live Status Updates',
          description: 'See your complaint status change from Pending → In Progress → Resolved',
        },
        {
          title: 'Admin Responses',
          description: 'Read detailed responses from administration with action taken',
        },
        {
          title: 'Timeline View',
          description: 'Visual timeline showing all updates and interactions',
        },
        {
          title: 'Notifications',
          description: 'Get instant notifications for every update',
        },
      ],
    },
    feedback: {
      title: 'Provide Valuable Feedback',
      icon: FaStar,
      color: 'from-yellow-500 to-yellow-600',
      description: 'Share your feedback about teachers, courses, and campus facilities.',
      benefits: [
        'Rate teachers and courses (1-5 stars)',
        'Constructive feedback collection',
        'Anonymous feedback option',
        'Feedback analytics for improvements',
        'Course recommendations',
        'Faculty development support',
      ],
      features: [
        {
          title: 'Star Rating System',
          description: 'Easy 5-star rating for teachers and courses',
        },
        {
          title: 'Detailed Comments',
          description: 'Write specific feedback about teaching methods and content',
        },
        {
          title: 'Course Information',
          description: 'Provide feedback organized by course and semester',
        },
        {
          title: 'Constructive Culture',
          description: 'Help improve campus education quality',
        },
      ],
    },
    chatbot: {
      title: 'AI-Powered Chatbot',
      icon: FaRobot,
      color: 'from-purple-500 to-purple-600',
      description: 'Get instant answers to your questions about the college 24/7.',
      benefits: [
        '24/7 instant support',
        'AI-powered responses',
        'College information database',
        'Quick answer retrieval',
        'Multi-language support',
        'Learning from interactions',
      ],
      features: [
        {
          title: 'Instant Responses',
          description: 'Get answers about college timing, departments, and facilities instantly',
        },
        {
          title: 'Knowledge Base',
          description: 'Access comprehensive information about college operations',
        },
        {
          title: '24/7 Availability',
          description: 'Chatbot is always available whenever you need help',
        },
        {
          title: 'Natural Conversations',
          description: 'Ask questions in natural language, get AI-powered responses',
        },
      ],
    },
    notifications: {
      title: 'Smart Notifications',
      icon: FaBell,
      color: 'from-red-500 to-red-600',
      description: 'Stay updated with real-time notifications about your complaints and feedback.',
      benefits: [
        'Real-time updates',
        'Email & in-app notifications',
        'Customizable notification settings',
        'Notification history',
        'Push notifications on mobile',
        'Unread count tracking',
      ],
      features: [
        {
          title: 'Instant Alerts',
          description: 'Get notified immediately when your complaint status changes',
        },
        {
          title: 'Multiple Channels',
          description: 'Receive notifications via email, SMS, and in-app messages',
        },
        {
          title: 'Notification Center',
          description: 'View all notifications in one central location',
        },
        {
          title: 'Smart Filtering',
          description: 'Filter and organize notifications by type and urgency',
        },
      ],
    },
  };

  const selectedFeatureData = features[selectedFeature];
  const Icon = selectedFeatureData.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link
            to="/"
            className="flex items-center space-x-2 text-2xl font-bold hover:text-blue-200 transition"
          >
            <FaArrowLeft />
            <span>College System</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-10">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold transition"
          >
            <FaArrowLeft className="text-sm" />
            <span>Back to Home</span>
          </Link>
        </div>

        <h1 className="text-5xl font-bold text-gray-900 mb-4">Feature Details</h1>
        <p className="text-xl text-gray-600 mb-12">
          Explore all the powerful features designed to enhance your campus experience.
        </p>

        {/* Feature Selector */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12">
          {Object.entries(features).map(([key, feature]) => {
            const FeatureIcon = feature.icon;
            return (
              <button
                key={key}
                onClick={() => setSelectedFeature(key)}
                className={`p-6 rounded-2xl border-2 transition transform hover:scale-105 ${
                  selectedFeature === key
                    ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-blue-600 shadow-xl'
                    : 'bg-white text-gray-800 border-gray-200 hover:border-blue-400'
                }`}
              >
                <FeatureIcon className="text-3xl mb-3 mx-auto" />
                <p className="font-semibold text-center">{feature.title.split(' ')[0]}</p>
              </button>
            );
          })}
        </div>

        {/* Feature Details */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-12">
          <div className={`bg-gradient-to-r ${selectedFeatureData.color} text-white p-12 relative overflow-hidden`}>
            <div className="absolute top-0 right-0 w-96 h-96 opacity-10 rounded-full"></div>
            <div className="relative z-10 flex items-center space-x-6 mb-6">
              <div className="p-6 bg-white/20 rounded-2xl backdrop-blur-xl">
                <Icon className="text-5xl" />
              </div>
              <div>
                <h2 className="text-4xl font-bold mb-2">{selectedFeatureData.title}</h2>
                <p className="text-lg text-blue-100">{selectedFeatureData.description}</p>
              </div>
            </div>
          </div>

          <div className="p-12">
            {/* Benefits */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <FaCheckCircle className="text-green-500 mr-3" />
                Key Benefits
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedFeatureData.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3 bg-green-50 p-4 rounded-xl border border-green-200">
                    <FaCheckCircle className="text-green-500 text-xl mt-1 flex-shrink-0" />
                    <p className="text-gray-700 font-medium">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Feature Breakdown */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">How It Works</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedFeatureData.features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6 hover:shadow-lg transition"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${selectedFeatureData.color} text-white flex items-center justify-center font-bold`}>
                        {index + 1}
                      </div>
                      <h4 className="text-lg font-bold text-gray-800">{feature.title}</h4>
                    </div>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 rounded-3xl p-12 text-white text-center shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-blue-100 mb-8">
            Join thousands of students improving their campus experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-2xl font-bold hover:shadow-lg transition transform hover:scale-105"
            >
              Create Account
            </Link>
            <Link
              to="/login"
              className="inline-block bg-transparent border-2 border-white text-white px-8 py-3 rounded-2xl font-bold hover:bg-white hover:text-blue-600 transition"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default FeaturesDetailsPage;
