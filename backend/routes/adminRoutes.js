const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {
  adminLogin,
  getAllComplaints,
  getComplaintById,
  updateComplaintStatus,
  deleteComplaint,
  getAllFeedback,
  deleteFeedback,
  getDashboardStats,
} = require('../controllers/adminController');

const router = express.Router();

// Admin Login
router.post('/admin/login', adminLogin);

// Admin Routes (Protected)
router.get('/admin/dashboard-stats', authMiddleware, getDashboardStats);

// Complaints Management
router.get('/admin/complaints', authMiddleware, getAllComplaints);
router.get('/admin/complaints/:id', authMiddleware, getComplaintById);
router.put('/admin/complaints/:id', authMiddleware, updateComplaintStatus);
router.delete('/admin/complaints/:id', authMiddleware, deleteComplaint);

// Feedback Management
router.get('/admin/feedback', authMiddleware, getAllFeedback);
router.delete('/admin/feedback/:id', authMiddleware, deleteFeedback);

module.exports = router;
