import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

function ComplaintStatus({ user, handleLogout }) {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');

      const response = await axios.get('http://localhost:5000/api/complaints', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setComplaints(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch complaints');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} handleLogout={handleLogout} />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Complaints</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading complaints...</p>
          </div>
        ) : complaints.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No complaints submitted yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-200 border-b">
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Response
                  </th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((complaint) => (
                  <tr key={complaint.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-700 capitalize">
                      {complaint.category}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {complaint.description.substring(0, 50)}...
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full font-medium ${getStatusColor(complaint.status)}`}>
                        {complaint.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(complaint.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {complaint.admin_response || 'Awaiting response...'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-8">
          <button
            onClick={fetchComplaints}
            className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition"
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
}

export default ComplaintStatus;
