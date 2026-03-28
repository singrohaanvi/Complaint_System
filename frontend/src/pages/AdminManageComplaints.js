import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from '../components/AdminNavbar';

function AdminManageComplaints({ admin, handleAdminLogout }) {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [status, setStatus] = useState('');
  const [adminResponse, setAdminResponse] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('adminToken');

      const response = await axios.get('http://localhost:5000/api/admin/complaints', {
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

  const handleSelectComplaint = (complaint) => {
    setSelectedComplaint(complaint);
    setStatus(complaint.status);
    setAdminResponse(complaint.admin_response || '');
  };

  const handleUpdateStatus = async () => {
    if (!selectedComplaint) return;

    setUpdating(true);
    setError('');

    try {
      const token = localStorage.getItem('adminToken');

      await axios.put(
        `http://localhost:5000/api/admin/complaints/${selectedComplaint.id}`,
        {
          status,
          admin_response: adminResponse,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update local state
      setComplaints(
        complaints.map((c) =>
          c.id === selectedComplaint.id
            ? { ...c, status, admin_response: adminResponse }
            : c
        )
      );

      setSelectedComplaint(null);
      alert('Complaint updated successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update complaint');
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteComplaint = async (id) => {
    if (window.confirm('Are you sure you want to delete this complaint?')) {
      try {
        const token = localStorage.getItem('adminToken');

        await axios.delete(`http://localhost:5000/api/admin/complaints/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setComplaints(complaints.filter((c) => c.id !== id));
        alert('Complaint deleted successfully!');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete complaint');
      }
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
      <AdminNavbar admin={admin} handleAdminLogout={handleAdminLogout} />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Manage Complaints</h1>

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
            <p className="text-gray-600 text-lg">No complaints found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Complaints List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-200 border-b">
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">ID</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Student</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Category</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {complaints.map((complaint) => (
                      <tr key={complaint.id} className="border-b hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-700">#{complaint.id}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          <div>
                            <p className="font-medium">{complaint.student_name}</p>
                            <p className="text-xs text-gray-500">{complaint.student_email}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 capitalize">
                          {complaint.category}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-3 py-1 rounded-full font-medium ${getStatusColor(complaint.status)}`}>
                            {complaint.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <button
                            onClick={() => handleSelectComplaint(complaint)}
                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition text-xs font-medium"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Edit Panel */}
            <div>
              {selectedComplaint ? (
                <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Edit Complaint #{selectedComplaint.id}
                  </h2>

                  <div className="space-y-4">
                    {/* Student Info */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Student
                      </label>
                      <p className="text-sm text-gray-600">
                        <strong>{selectedComplaint.student_name}</strong>
                      </p>
                      <p className="text-xs text-gray-500">{selectedComplaint.student_email}</p>
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <p className="text-sm text-gray-600 capitalize">{selectedComplaint.category}</p>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <p className="text-sm text-gray-600 max-h-24 overflow-y-auto">
                        {selectedComplaint.description}
                      </p>
                    </div>

                    {/* Image */}
                    {selectedComplaint.image_path && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Attached File
                        </label>
                        <a
                          href={`http://localhost:5000${selectedComplaint.image_path}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm"
                        >
                          View File
                        </a>
                      </div>
                    )}

                    {/* Status Update */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                      </label>
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </div>

                    {/* Admin Response */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Response
                      </label>
                      <textarea
                        value={adminResponse}
                        onChange={(e) => setAdminResponse(e.target.value)}
                        rows="4"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Write your response here..."
                      />
                    </div>

                    {/* Buttons */}
                    <div className="space-y-2">
                      <button
                        onClick={handleUpdateStatus}
                        disabled={updating}
                        className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition disabled:bg-gray-400 font-medium"
                      >
                        {updating ? 'Updating...' : 'Update Status'}
                      </button>
                      <button
                        onClick={() => handleDeleteComplaint(selectedComplaint.id)}
                        className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition font-medium"
                      >
                        Delete Complaint
                      </button>
                      <button
                        onClick={() => setSelectedComplaint(null)}
                        className="w-full bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition font-medium"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
                  <p>Select a complaint to edit</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminManageComplaints;
