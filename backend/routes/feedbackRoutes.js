const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { submitFeedback, getFeedback } = require('../controllers/feedbackController');

const router = express.Router();

router.post('/feedback', authMiddleware, submitFeedback);
router.get('/feedback', authMiddleware, getFeedback);

module.exports = router;
