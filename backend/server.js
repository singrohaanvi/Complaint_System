const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const authRoutes = require('./routes/authRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const chatbotRoutes = require('./routes/chatbotRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/api', authRoutes);
app.use('/api', complaintRoutes);
app.use('/api', feedbackRoutes);
app.use('/api', chatbotRoutes);
app.use('/api', notificationRoutes);
app.use('/api', adminRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
