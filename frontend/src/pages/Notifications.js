import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

function Notifications({ user, handleLogout }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchNotifications();
  }, [user?.id]);

  const fetchNotifications = async () => {
    if (!user?.id) return;

    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');

      const response = await axios.get(
        `http://localhost:5000/api/notifications/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotifications(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch notifications');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      const token = localStorage.getItem('token');

      await axios.put(
        `http://localhost:5000/api/notifications/${notificationId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update UI
      setNotifications(
        notifications.map((notif) =>
          notif.id === notificationId ? { ...notif, is_read: 1 } : notif
        )
      );
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} handleLogout={handleLogout} />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Notifications</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading notifications...</p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No notifications yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`border rounded-lg p-4 ${
                  notification.is_read === 0
                    ? 'bg-blue-50 border-blue-300'
                    : 'bg-white border-gray-300'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-gray-800">{notification.message}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {new Date(notification.created_at).toLocaleString()}
                    </p>
                  </div>
                  {notification.is_read === 0 && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="ml-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm font-medium"
                    >
                      Mark as Read
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8">
          <button
            onClick={fetchNotifications}
            className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition"
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
}

export default Notifications;
