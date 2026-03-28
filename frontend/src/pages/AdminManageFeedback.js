import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from '../components/AdminNavbar';

function AdminManageFeedback({ admin, handleAdminLogout }) {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('adminToken');

      const response = await axios.get('http://localhost:5000/api/admin/feedback', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFeedback(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch feedback');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFeedback = async (id) => {
    if (window.confirm('Are you sure you want to delete this feedback?')) {
      try {
        const token = localStorage.getItem('adminToken');

        await axios.delete(`http://localhost:5000/api/admin/feedback/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFeedback(feedback.filter((f) => f.id !== id));
        alert('Feedback deleted successfully!');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete feedback');
      }
    }
  };

  const getRatingColor = (rating) => {
    if (rating >= 4) return 'text-green-600';
    if (rating >= 3) return 'text-blue-600';
    if (rating >= 2) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRatingStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar admin={admin} handleAdminLogout={handleAdminLogout} />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Manage Feedback</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading feedback...</p>
          </div>
        ) : feedback.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No feedback found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {feedback.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
                {/* Header */}
                <div className="mb-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">
                        {item.teacher_name}
                      </h3>
                      <p className="text-sm text-gray-600">{item.course_name}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteFeedback(item.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* Student Info */}
                <div className="mb-4 pb-4 border-b">
                  <p className="text-sm text-gray-700">
                    <strong>Student:</strong> {item.student_name}
                  </p>
                  <p className="text-xs text-gray-500">{item.student_email}</p>
                </div>

                {/* Rating */}
                <div className="mb-4">
                  <p className={`text-2xl font-bold ${getRatingColor(item.rating)}`}>
                    {getRatingStars(item.rating)}
                  </p>
                  <p className="text-sm text-gray-600">
                    Rating: <strong>{item.rating}/5</strong>
                  </p>
                </div>

                {/* Comments */}
                {item.comments && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Comments:</p>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded max-h-24 overflow-y-auto">
                      {item.comments}
                    </p>
                  </div>
                )}

                {/* Date */}
                <p className="text-xs text-gray-500">
                  {new Date(item.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8">
          <button
            onClick={fetchFeedback}
            className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition"
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminManageFeedback;
