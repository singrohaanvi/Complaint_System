const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const pool = require('../config/db');

const router = express.Router();

// Get Notifications
router.get('/notifications/:studentId', authMiddleware, async (req, res) => {
  try {
    const { studentId } = req.params;

    // Verify student is accessing their own notifications
    if (parseInt(studentId) !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    const connection = await pool.getConnection();

    const [notifications] = await connection.query(
      'SELECT * FROM notifications WHERE student_id = ? ORDER BY created_at DESC',
      [studentId]
    );

    connection.release();

    res.status(200).json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Mark Notification as Read
router.put('/notifications/:notificationId', authMiddleware, async (req, res) => {
  try {
    const { notificationId } = req.params;

    const connection = await pool.getConnection();

    await connection.query(
      'UPDATE notifications SET is_read = 1 WHERE id = ?',
      [notificationId]
    );

    connection.release();

    res.status(200).json({ message: 'Notification marked as read' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
