const pool = require('../config/db');

// Submit Feedback
const submitFeedback = async (req, res) => {
  try {
    const { teacherName, courseName, rating, comments } = req.body;
    const studentId = req.userId;

    if (!teacherName || !courseName || !rating) {
      return res.status(400).json({ message: 'Teacher name, course name, and rating are required' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const connection = await pool.getConnection();

    await connection.query(
      'INSERT INTO feedback (student_id, teacher_name, course_name, rating, comments) VALUES (?, ?, ?, ?, ?)',
      [studentId, teacherName, courseName, rating, comments || '']
    );

    connection.release();

    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get Feedback by Student
const getFeedback = async (req, res) => {
  try {
    const studentId = req.userId;

    const connection = await pool.getConnection();

    const [feedback] = await connection.query(
      'SELECT * FROM feedback WHERE student_id = ? ORDER BY created_at DESC',
      [studentId]
    );

    connection.release();

    res.status(200).json(feedback);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  submitFeedback,
  getFeedback,
};
