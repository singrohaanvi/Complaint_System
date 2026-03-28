const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

// Admin Login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const connection = await pool.getConnection();

    const [admins] = await connection.query('SELECT * FROM admins WHERE email = ?', [email]);

    if (admins.length === 0) {
      connection.release();
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const admin = admins[0];

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      connection.release();
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    connection.release();

    res.status(200).json({
      message: 'Login successful',
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get All Complaints (Admin)
const getAllComplaints = async (req, res) => {
  try {
    const connection = await pool.getConnection();

    const [complaints] = await connection.query(
      `SELECT c.*, s.name as student_name, s.email as student_email 
       FROM complaints c 
       JOIN students s ON c.student_id = s.id 
       ORDER BY c.created_at DESC`
    );

    connection.release();

    res.status(200).json(complaints);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get Complaint by ID (Admin)
const getComplaintById = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await pool.getConnection();

    const [complaints] = await connection.query(
      `SELECT c.*, s.name as student_name, s.email as student_email 
       FROM complaints c 
       JOIN students s ON c.student_id = s.id 
       WHERE c.id = ?`,
      [id]
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

// Update Complaint Status
const updateComplaintStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, admin_response } = req.body;

    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }

    const connection = await pool.getConnection();

    await connection.query(
      'UPDATE complaints SET status = ?, admin_response = ? WHERE id = ?',
      [status, admin_response || null, id]
    );

    // Create notification for student
    const [complaints] = await connection.query('SELECT student_id FROM complaints WHERE id = ?', [id]);

    if (complaints.length > 0) {
      await connection.query(
        'INSERT INTO notifications (student_id, message) VALUES (?, ?)',
        [
          complaints[0].student_id,
          `Your complaint #${id} status has been updated to '${status}'`,
        ]
      );
    }

    connection.release();

    res.status(200).json({ message: 'Complaint updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete Complaint
const deleteComplaint = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await pool.getConnection();

    await connection.query('DELETE FROM complaints WHERE id = ?', [id]);

    connection.release();

    res.status(200).json({ message: 'Complaint deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get All Feedback (Admin)
const getAllFeedback = async (req, res) => {
  try {
    const connection = await pool.getConnection();

    const [feedback] = await connection.query(
      `SELECT f.*, s.name as student_name, s.email as student_email 
       FROM feedback f 
       JOIN students s ON f.student_id = s.id 
       ORDER BY f.created_at DESC`
    );

    connection.release();

    res.status(200).json(feedback);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete Feedback
const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await pool.getConnection();

    await connection.query('DELETE FROM feedback WHERE id = ?', [id]);

    connection.release();

    res.status(200).json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get Dashboard Statistics
const getDashboardStats = async (req, res) => {
  try {
    const connection = await pool.getConnection();

    // Total complaints
    const [totalComplaints] = await connection.query('SELECT COUNT(*) as count FROM complaints');

    // Pending complaints
    const [pendingComplaints] = await connection.query(
      "SELECT COUNT(*) as count FROM complaints WHERE status = 'Pending'"
    );

    // In progress complaints
    const [inProgressComplaints] = await connection.query(
      "SELECT COUNT(*) as count FROM complaints WHERE status = 'In Progress'"
    );

    // Resolved complaints
    const [resolvedComplaints] = await connection.query(
      "SELECT COUNT(*) as count FROM complaints WHERE status = 'Resolved'"
    );

    // Total feedback
    const [totalFeedback] = await connection.query('SELECT COUNT(*) as count FROM feedback');

    // Total students
    const [totalStudents] = await connection.query('SELECT COUNT(*) as count FROM students');

    connection.release();

    res.status(200).json({
      totalComplaints: totalComplaints[0]?.count || 0,
      pendingComplaints: pendingComplaints[0]?.count || 0,
      inProgressComplaints: inProgressComplaints[0]?.count || 0,
      resolvedComplaints: resolvedComplaints[0]?.count || 0,
      totalFeedback: totalFeedback[0]?.count || 0,
      totalStudents: totalStudents[0]?.count || 0,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  adminLogin,
  getAllComplaints,
  getComplaintById,
  updateComplaintStatus,
  deleteComplaint,
  getAllFeedback,
  deleteFeedback,
  getDashboardStats,
};
