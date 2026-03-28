const express = require('express');
const { chatbotController } = require('../controllers/chatbotController');

const router = express.Router();

router.post('/chatbot', chatbotController);

module.exports = router;
