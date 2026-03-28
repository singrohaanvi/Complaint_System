import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AdminNavbar from '../components/AdminNavbar';

function AdminDashboard({ admin, handleAdminLogout }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('adminToken');

      const response = await axios.get('http://localhost:5000/api/admin/dashboard-stats', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStats(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch statistics');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar admin={admin} handleAdminLogout={handleAdminLogout} />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Admin Dashboard</h1>
        <p className="text-gray-600 mb-8">Manage all complaints, feedback, and students</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        ) : stats ? (
          <>
            {/* Statistics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {/* Total Complaints */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Total Complaints</p>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalComplaints}</p>
                  </div>
                  <div className="text-5xl text-blue-400">📋</div>
                </div>
              </div>

              {/* Pending Complaints */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Pending</p>
                    <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.pendingComplaints}</p>
                  </div>
                  <div className="text-5xl text-yellow-400">⏳</div>
                </div>
              </div>

              {/* In Progress */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">In Progress</p>
                    <p className="text-3xl font-bold text-blue-600 mt-2">{stats.inProgressComplaints}</p>
                  </div>
                  <div className="text-5xl text-blue-400">⚙️</div>
                </div>
              </div>

              {/* Resolved Complaints */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Resolved</p>
                    <p className="text-3xl font-bold text-green-600 mt-2">{stats.resolvedComplaints}</p>
                  </div>
                  <div className="text-5xl text-green-400">✅</div>
                </div>
              </div>

              {/* Total Feedback */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Total Feedback</p>
                    <p className="text-3xl font-bold text-purple-600 mt-2">{stats.totalFeedback}</p>
                  </div>
                  <div className="text-5xl text-purple-400">⭐</div>
                </div>
              </div>

              {/* Total Students */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Total Students</p>
                    <p className="text-3xl font-bold text-indigo-600 mt-2">{stats.totalStudents}</p>
                  </div>
                  <div className="text-5xl text-indigo-400">👥</div>
                </div>
              </div>
            </div>

            {/* Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Manage Complaints */}
              <Link to="/admin/manage-complaints">
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer">
                  <div className="text-4xl mb-4">📝</div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">Manage Complaints</h2>
                  <p className="text-gray-600">
                    Review, approve, and respond to student complaints. Update statuses and manage responses.
                  </p>
                  <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                    View All Complaints
                  </button>
                </div>
              </Link>

              {/* Manage Feedback */}
              <Link to="/admin/manage-feedback">
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer">
                  <div className="text-4xl mb-4">⭐</div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">Manage Feedback</h2>
                  <p className="text-gray-600">
                    Review student feedback about teachers and courses. Delete inappropriate feedback.
                  </p>
                  <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">
                    View All Feedback
                  </button>
                </div>
              </Link>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default AdminDashboard;
