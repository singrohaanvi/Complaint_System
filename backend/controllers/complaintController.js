const pool = require('../config/db');

// Submit Complaint
const submitComplaint = async (req, res) => {
  try {
    const { category, description } = req.body;
    const studentId = req.userId;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    if (!category || !description) {
      return res.status(400).json({ message: 'Category and description are required' });
    }

    const connection = await pool.getConnection();

    await connection.query(
      'INSERT INTO complaints (student_id, category, description, image_path, status) VALUES (?, ?, ?, ?, ?)',
      [studentId, category, description, imagePath, 'Pending']
    );

    connection.release();

    res.status(201).json({ message: 'Complaint submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get Complaints by Student
const getComplaints = async (req, res) => {
  try {
    const studentId = req.userId;

    const connection = await pool.getConnection();

    const [complaints] = await connection.query(
      'SELECT * FROM complaints WHERE student_id = ? ORDER BY created_at DESC',
      [studentId]
    );

    connection.release();

    res.status(200).json(complaints);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get Complaint by ID
const getComplaintById = async (req, res) => {
  try {
    const { id } = req.params;
    const studentId = req.userId;

    const connection = await pool.getConnection();

    const [complaints] = await connection.query(
      'SELECT * FROM complaints WHERE id = ? AND student_id = ?',
      [id, studentId]
    );

    if (complaints.length === 0) {
      connection.release();
      return res.status(404).json({ message: 'Complaint not found' });
    }

    connection.release();

    res.status(200).json(complaints[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  submitComplaint,
  getComplaints,
  getComplaintById,
};
