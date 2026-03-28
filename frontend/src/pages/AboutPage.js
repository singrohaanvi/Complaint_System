import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaUsers, FaLightbulb, FaAward, FaChartLine, FaRocket, FaHeart } from 'react-icons/fa';
import Footer from '../components/Footer';

function AboutPage() {
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

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">About Us</h1>
          <p className="text-2xl text-gray-600">
            Transforming Campus Communication Through Transparency and Technology
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-3xl shadow-lg p-12 mb-12 border-l-4 border-blue-600">
          <div className="flex items-start space-x-6">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <FaRocket className="text-blue-600 text-2xl" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                To create a transparent, student-centric platform that empowers students to voice their concerns and 
                contribute to campus improvement. We believe in the power of constructive feedback and believe that 
                every student's voice matters in shaping a better educational environment.
              </p>
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl border-2 border-blue-200 shadow-lg p-12 mb-12">
          <div className="flex items-start space-x-6">
            <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
              <FaLightbulb className="text-indigo-600 text-2xl" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                A campus where communication is transparent, feedback is valued, and continuous improvement is a reality. 
                We envision a future where technology bridges the gap between students and administration, creating a 
                collaborative environment for positive change.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: FaUsers,
                title: 'Student-Centric',
                description: 'Every decision we make is guided by what benefits students and improves their campus experience.',
              },
              {
                icon: FaAward,
                title: 'Transparency',
                description: 'We believe in open communication. Every complaint is tracked, every response is documented.',
              },
              {
                icon: FaChartLine,
                title: 'Continuous Improvement',
                description: 'We are committed to constantly improving our platform and processes based on user feedback.',
              },
              {
                icon: FaHeart,
                title: 'Inclusivity',
                description: 'Everyone deserves to be heard. We ensure all students can voice their concerns without barriers.',
              },
              {
                icon: FaRocket,
                title: 'Innovation',
                description: 'We leverage technology and AI to provide instant support and efficient complaint resolution.',
              },
              {
                icon: FaAward,
                title: 'Accountability',
                description: 'Both students and administration are accountable. We track everything and ensure follow-through.',
              },
            ].map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-md p-6 border-t-4 border-blue-500 hover:shadow-lg transition"
                >
                  <Icon className="text-4xl text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Why Developed Section */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl border-2 border-purple-200 shadow-lg p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why We Built This Platform</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>
              <strong>Problem:</strong> Many students have valuable feedback and complaints about campus life, but lack a 
              structured and transparent way to communicate them to administration.
            </p>
            <p>
              <strong>Solution:</strong> We created a comprehensive digital platform that makes it easy for students to 
              file complaints, track progress, and provide feedback while giving administration clear insights into areas 
              for improvement.
            </p>
            <p>
              <strong>Impact:</strong> By bridging this communication gap, we've enabled faster resolution of issues, 
              improved decision-making, and fostered a more collaborative campus environment.
            </p>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { number: '1000+', label: 'Students Served', icon: '👥' },
            { number: '500+', label: 'Complaints Resolved', icon: '✅' },
            { number: '95%', label: 'Satisfaction Rate', icon: '⭐' },
            { number: '24/7', label: 'AI Support', icon: '🤖' },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 text-center border-2 border-blue-200 hover:shadow-xl transition"
            >
              <div className="text-5xl mb-3">{stat.icon}</div>
              <p className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</p>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Technology Stack */}
        <div className="bg-white rounded-3xl shadow-lg p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Technology Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                category: 'Frontend',
                description: 'Modern React.js with responsive Tailwind CSS design',
                color: 'from-blue-500 to-blue-600',
              },
              {
                category: 'Backend',
                description: 'Robust Node.js and Express.js REST API with JWT authentication',
                color: 'from-green-500 to-green-600',
              },
              {
                category: 'Database',
                description: 'Secure MySQL database with proper indexing and backup systems',
                color: 'from-purple-500 to-purple-600',
              },
              {
                category: 'AI/ML',
                description: 'Google Generative AI for intelligent chatbot and recommendations',
                color: 'from-yellow-500 to-yellow-600',
              },
              {
                category: 'Security',
                description: 'Bcryptjs for password hashing and JWT for secure authentication',
                color: 'from-red-500 to-red-600',
              },
              {
                category: 'Deployment',
                description: 'Cloud-ready architecture for scalable and reliable service',
                color: 'from-indigo-500 to-indigo-600',
              },
            ].map((tech, index) => (
              <div key={index} className={`bg-gradient-to-br ${tech.color} text-white rounded-2xl p-6 shadow-lg`}>
                <h3 className="text-xl font-bold mb-2">{tech.category}</h3>
                <p className="text-blue-100">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-white text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Built With Passion</h2>
          <p className="text-lg text-indigo-100 mb-6">
            Our team is dedicated to creating a platform that truly makes a difference in campus life. 
            We combine technical expertise with a deep understanding of student needs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Development', 'Design', 'Support'].map((role, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-xl rounded-lg p-4">
                <p className="text-xl font-bold">{role} Team</p>
                <p className="text-sm text-indigo-100">Committed to excellence</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-700 rounded-3xl p-12 md:p-16 shadow-2xl text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Community</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Be part of a movement to improve campus life through transparent communication and constructive feedback.
          </p>
          <Link
            to="/register"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold hover:shadow-lg transition transform hover:scale-105"
          >
            Get Started Today
          </Link>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default AboutPage;
