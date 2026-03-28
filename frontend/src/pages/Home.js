import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaFileAlt,
  FaChartBar,
  FaStar,
  FaRobot,
  FaBell,
  FaCheckCircle,
  FaUsers,
  FaLightbulb,
  FaSchool,
  FaArrowRight,
  FaQuoteLeft,
  FaDot,
} from 'react-icons/fa';
import Footer from '../components/Footer';

function Home() {
  const features = [
    {
      icon: FaFileAlt,
      title: 'File Complaints',
      description: 'Easily submit complaints about hostel, academics, infrastructure, and more with detailed descriptions.',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: FaChartBar,
      title: 'Track Status',
      description: 'Monitor the progress of your complaints in real-time with detailed status updates and admin responses.',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: FaStar,
      title: 'Give Feedback',
      description: 'Share your valuable feedback about teachers and courses to help improve the educational quality.',
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      icon: FaRobot,
      title: 'AI Chatbot',
      description: 'Get instant answers about college information, timings, departments, and facilities 24/7.',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      icon: FaBell,
      title: 'Notifications',
      description: 'Stay updated with real-time notifications about your complaints, feedback, and system updates.',
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
    },
    {
      icon: FaCheckCircle,
      title: 'Resolution',
      description: 'Track how your issues are being resolved with detailed admin responses and follow-ups.',
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50',
    },
  ];

  const benefits = [
    {
      icon: FaUsers,
      title: 'Student-Centric',
      description: 'Designed specifically for students to voice their concerns and improve campus life.',
    },
    {
      icon: FaLightbulb,
      title: 'Smart Solutions',
      description: 'AI-powered chatbot provides instant help and reduces response time for complaints.',
    },
    {
      icon: FaSchool,
      title: 'Campus Excellence',
      description: 'Help your institution become better through constructive feedback and transparency.',
    },
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'CSE Student',
      message: 'Great platform! My hostel complaint was resolved in just 3 days. Very transparent process.',
      rating: 5,
    },
    {
      name: 'Priya Singh',
      role: 'ECE Student',
      message: 'The AI chatbot helped me find information about course schedules instantly. Highly recommend!',
      rating: 5,
    },
    {
      name: 'Amit Patel',
      role: 'ME Student',
      message: 'Easy to use interface and regular notifications keep me updated on my complaints.',
      rating: 4,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation Bar */}
      <nav className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white shadow-2xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-white text-blue-600 flex items-center justify-center font-bold text-lg">
                CC
              </div>
              <span className="text-2xl font-bold">College System</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <Link to="/features" className="hover:text-blue-200 transition font-medium">
                Features
              </Link>
              <Link to="/about" className="hover:text-blue-200 transition font-medium">
                About Us
              </Link>
              <a href="#testimonials" className="hover:text-blue-200 transition font-medium">
                Testimonials
              </a>
              <Link
                to="/login"
                className="bg-white text-blue-600 px-6 py-2 rounded-full font-bold hover:shadow-lg transition"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-r from-purple-200 to-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full mb-4 font-semibold">
                ✨ Welcome to Digital Complaint & Feedback System
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Your Voice
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  {' '}Matters
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                A transparent platform where students can file complaints, provide feedback, and track resolutions. 
                Empower your campus with constructive communication.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-xl transition transform hover:scale-105"
                >
                  Get Started
                  <FaArrowRight className="ml-2" />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-2xl font-bold hover:bg-blue-50 transition"
                >
                  Login Here
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12">
                <div className="bg-white rounded-2xl p-4 shadow-md">
                  <p className="text-3xl font-bold text-blue-600">500+</p>
                  <p className="text-gray-600 text-sm">Complaints Resolved</p>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-md">
                  <p className="text-3xl font-bold text-green-600">95%</p>
                  <p className="text-gray-600 text-sm">Satisfaction Rate</p>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-md">
                  <p className="text-3xl font-bold text-purple-600">24/7</p>
                  <p className="text-gray-600 text-sm">Support Available</p>
                </div>
              </div>
            </div>

            {/* Right Image Section */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-400 to-indigo-600 rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition">
                <div className="bg-white rounded-2xl p-8 text-center">
                  <div className="text-6xl mb-4">📱</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Easy to Use</h3>
                  <p className="text-gray-600">File complaints in just 3 clicks</p>
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="bg-blue-50 rounded-lg p-3 text-sm font-semibold text-blue-600">
                      ✓ Mobile Friendly
                    </div>
                    <div className="bg-green-50 rounded-lg p-3 text-sm font-semibold text-green-600">
                      ✓ Fast & Secure
                    </div>
                    <div className="bg-purple-50 rounded-lg p-3 text-sm font-semibold text-purple-600">
                      ✓ Transparent
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-3 text-sm font-semibold text-yellow-600">
                      ✓ Live Updates
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full mb-4 font-semibold">
              Key Features
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools to help you communicate concerns and contribute to campus improvement.
            </p>
            <Link
              to="/features"
              className="inline-flex items-center mt-4 bg-indigo-100 text-indigo-600 px-6 py-2 rounded-full font-semibold hover:bg-indigo-200 transition"
            >
              Explore All Features <FaArrowRight className="ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className={`${feature.bgColor} rounded-3xl p-8 border-2 border-gray-200 hover:border-blue-400 hover:shadow-xl transition transform hover:scale-105`}
                >
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} text-white mb-4 shadow-lg`}>
                    <Icon className="text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 px-4 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full mix-blend-multiply filter blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose Us?</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              We're committed to creating a better campus environment through transparent communication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition">
                  <div className="text-5xl mb-4">
                    <Icon />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-blue-100">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block bg-green-100 text-green-600 px-4 py-2 rounded-full mb-4 font-semibold">
              Simple Process
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in just 4 simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { number: '1', title: 'Register', description: 'Create your account with your college email' },
              { number: '2', title: 'Login', description: 'Sign in to access the platform' },
              { number: '3', title: 'Report', description: 'File your complaint with details & images' },
              { number: '4', title: 'Track', description: 'Monitor status & get real-time updates' },
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border-2 border-blue-200 text-center h-full">
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mt-4 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:flex absolute top-1/3 -right-3 text-blue-400 text-2xl">
                    <FaArrowRight />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-10 rounded-full mix-blend-multiply filter blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Student Testimonials</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Hear what students are saying about our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition"
              >
                <FaQuoteLeft className="text-3xl text-blue-400 mb-4" />
                <p className="text-gray-200 mb-4 italic">"{testimonial.message}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                  <div className="flex text-yellow-400">
                    {Array(testimonial.rating)
                      .fill(0)
                      .map((_, i) => (
                        <span key={i}>⭐</span>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-700 rounded-3xl p-12 md:p-16 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white opacity-10 rounded-full mix-blend-multiply filter blur-3xl"></div>

          <div className="relative z-10 text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Make a Difference?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of students who are actively improving their campus through transparent communication and constructive feedback.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold hover:shadow-xl transition transform hover:scale-105"
              >
                Sign Up Now
                <FaArrowRight className="ml-2" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white px-8 py-4 rounded-2xl font-bold hover:bg-white hover:text-blue-600 transition"
              >
                Existing User? Login
              </Link>
            </div>
          </div>
        </div>
      </section>

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

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}

export default Home;
