const express = require('express');
const multer = require('multer');
const path = require('path');
const authMiddleware = require('../middleware/authMiddleware');
const {
  submitComplaint,
  getComplaints,
  getComplaintById,
} = require('../controllers/complaintController');

const router = express.Router();

// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

router.post('/complaints', authMiddleware, upload.single('image'), submitComplaint);
router.get('/complaints', authMiddleware, getComplaints);
router.get('/complaints/:id', authMiddleware, getComplaintById);

module.exports = router;
