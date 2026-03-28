# College Digital Complaint and Feedback System

## 📋 Project Overview

A complete full-stack web application designed to streamline the college complaint and feedback management process. Students can submit complaints, track their status, provide feedback, and interact with an AI chatbot for college information.

## 🎯 Key Features

✅ **Student Authentication** - Secure JWT-based login/register system  
✅ **Complaint Management** - Submit, track, and manage complaints with file uploads  
✅ **Feedback System** - Rate teachers and courses with star ratings  
✅ **AI Chatbot** - Google Gemini API powered chatbot for college Q&A  
✅ **Notifications** - Real-time updates on complaint status changes  
✅ **Responsive UI** - Beautiful, modern interface built with React and Tailwind CSS  
✅ **File Upload** - Upload images/documents as evidence with complaints  
✅ **Status Tracking** - Monitor complaint progress from submission to resolution  

---

## 🛠️ Technology Stack

### Frontend
- **React.js** - Modern UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **ES6+** - Modern JavaScript

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MySQL2** - Database driver
- **JWT** - Authentication tokens
- **Bcryptjs** - Password hashing
- **Multer** - File upload handling
- **Google Generative AI** - Chatbot API

### Database
- **MySQL** - Relational database

---

## 📁 Complete Project Structure

```
Digital_Complaint/
│
├── backend/                          # Backend Node.js application
│   ├── config/
│   │   └── db.js                    # MySQL connection configuration
│   ├── controllers/
│   │   ├── authController.js         # Login/Register logic
│   │   ├── complaintController.js    # Complaint operations
│   │   ├── feedbackController.js     # Feedback operations
│   │   └── chatbotController.js      # Chatbot integration
│   ├── middleware/
│   │   └── authMiddleware.js         # JWT verification
│   ├── routes/
│   │   ├── authRoutes.js             # Auth endpoints
│   │   ├── complaintRoutes.js        # Complaint endpoints
│   │   ├── feedbackRoutes.js         # Feedback endpoints
│   │   ├── chatbotRoutes.js          # Chatbot endpoint
│   │   └── notificationRoutes.js     # Notification endpoints
│   ├── uploads/                      # Uploaded files directory
│   ├── .env                          # Environment variables (template)
│   ├── .gitignore                    # Git ignore rules
│   ├── package.json                  # Dependencies
│   └── server.js                     # Main server file
│
├── frontend/                         # React frontend application
│   ├── public/
│   │   ├── index.html                # HTML template
│   │   └── manifest.json             # PWA manifest
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.js              # Login page
│   │   │   ├── Register.js           # Registration page
│   │   │   ├── Dashboard.js          # Main dashboard
│   │   │   ├── SubmitComplaint.js    # Complaint form
│   │   │   ├── ComplaintStatus.js    # Track complaints
│   │   │   ├── SubmitFeedback.js     # Feedback form
│   │   │   ├── Chatbot.js            # Chatbot interface
│   │   │   └── Notifications.js      # Notifications page
│   │   ├── components/
│   │   │   └── Navbar.js             # Navigation bar
│   │   ├── App.js                    # Main app component
│   │   ├── index.js                  # Entry point
│   │   └── index.css                 # Global styles
│   ├── .gitignore                    # Git ignore rules
│   ├── package.json                  # Dependencies
│   ├── postcss.config.js             # PostCSS config
│   ├── tailwind.config.js            # Tailwind CSS config
│   └── README.md                     # Frontend README
│
├── database.sql                      # MySQL schema and tables
├── README.md                         # Main documentation
├── SETUP.md                          # Installation guide
├── QUICKSTART.md                     # Quick start guide
├── API_DOCUMENTATION.md              # API reference
└── PROJECT_STRUCTURE.md              # This file
```

---

## 🗄️ Database Schema

### students
```sql
- id (INT, PRIMARY KEY)
- name (VARCHAR)
- email (VARCHAR, UNIQUE)
- password (VARCHAR, hashed)
- department (VARCHAR)
- created_at (TIMESTAMP)
```

### complaints
```sql
- id (INT, PRIMARY KEY)
- student_id (INT, FOREIGN KEY)
- category (VARCHAR)
- description (LONGTEXT)
- image_path (VARCHAR)
- status (VARCHAR) [Pending, In Progress, Resolved]
- admin_response (LONGTEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### feedback
```sql
- id (INT, PRIMARY KEY)
- student_id (INT, FOREIGN KEY)
- teacher_name (VARCHAR)
- course_name (VARCHAR)
- rating (INT) [1-5]
- comments (LONGTEXT)
- created_at (TIMESTAMP)
```

### notifications
```sql
- id (INT, PRIMARY KEY)
- student_id (INT, FOREIGN KEY)
- message (LONGTEXT)
- is_read (TINYINT)
- created_at (TIMESTAMP)
```

---

## 🔌 API Endpoints

### Authentication
- `POST /api/register` - Register new student
- `POST /api/login` - Login and get JWT token

### Complaints
- `POST /api/complaints` - Submit complaint (with file upload)
- `GET /api/complaints` - Get all complaints
- `GET /api/complaints/:id` - Get complaint details

### Feedback
- `POST /api/feedback` - Submit feedback
- `GET /api/feedback` - Get all feedback

### Chatbot
- `POST /api/chatbot` - Chat with AI

### Notifications
- `GET /api/notifications/:studentId` - Get notifications
- `PUT /api/notifications/:notificationId` - Mark as read

---

## 🚀 Installation & Setup

### Quick Start (5 minutes)
```bash
# 1. Database
mysql -u root -p < database.sql

# 2. Backend
cd backend
npm install
# Configure .env
npm start

# 3. Frontend
cd ../frontend
npm install
npm start

# 4. Visit http://localhost:3000
```

See QUICKSTART.md for detailed steps.

---

## 📖 Usage

### For Students
1. **Register** - Create account with email and department
2. **Login** - Access dashboard with credentials
3. **Submit Complaint** - Fill form with category, description, and optional image
4. **Track Status** - Monitor complaint progress in real-time
5. **Provide Feedback** - Rate teachers with star ratings
6. **Use Chatbot** - Ask questions about college
7. **Check Notifications** - View updates on complaints

### For Administrators (Future Feature)
- View all complaints
- Update complaint status
- Add admin response
- View feedback analytics
- Manage users

---

## 🔐 Security Features

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - Bcryptjs for password security
- **Authorization** - Middleware for protected routes
- **Input Validation** - Server-side validation
- **CORS** - Cross-origin resource sharing setup
- **SQL Injection Prevention** - Parameterized queries

---

## 💡 File Upload

- **Location**: `/backend/uploads/`
- **Supported Types**: Images (jpg, png, gif, etc.) and Documents (pdf, doc, docx)
- **Handling**: Multer middleware
- **Naming**: Timestamp + original filename

---

## 🎨 UI Components

### Pages
- **Login** - Clean login form with validation
- **Register** - Multi-field registration
- **Dashboard** - Card-based interface with all features
- **SubmitComplaint** - Form with file upload
- **ComplaintStatus** - Table view with status badges
- **SubmitFeedback** - Star rating form
- **Chatbot** - Chat interface
- **Notifications** - Notification list with timestamps

### Components
- **Navbar** - Top navigation with user info

### Styling
- **Tailwind CSS** - Utility-first CSS
- **Responsive** - Mobile-friendly design
- **Color Scheme** - Professional blue theme

---

## 🔧 Configuration

### Backend .env
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=college_complaint_system
JWT_SECRET=random_secret_key
GEMINI_API_KEY=your_api_key
NODE_ENV=development
```

### Frontend API URL
Update in axios calls: `http://localhost:5000/api`

---

## 📊 User Workflow

```
Register → Login → Dashboard
                 ↓
        ┌────────┼────────┬──────────┬──────────┐
        ↓        ↓        ↓          ↓          ↓
    Complaint Feedback Chatbot Notifications Profile
        ↓
    Submit → Database
        ↓
    Track Status
        ↓
    View Response
```

---

## 🧪 Testing

### Registration & Login
1. Register with new email
2. Login with credentials
3. Should redirect to dashboard

### Complaint Submission
1. Click "Submit Complaint"
2. Fill form and upload image
3. Check database
4. Verify in "Track Complaints"

### Chatbot
1. Go to Chatbot page
2. Ask about college timings
3. Should get AI response

### Notifications
1. Check notifications page
2. Mark as read
3. Should update UI

---

## 📈 Future Enhancements

- [ ] Admin dashboard for managing complaints
- [ ] Email notifications
- [ ] Advanced search and filtering
- [ ] Analytics and reporting
- [ ] Two-factor authentication
- [ ] Mobile app (React Native)
- [ ] Real-time notifications (WebSocket)
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Complaint escalation system

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| MySQL connection error | Check credentials in .env |
| Port 5000 in use | Change PORT in .env |
| CORS error | Ensure backend is running |
| API key not working | Verify Gemini API key is valid |
| File upload fails | Check /uploads directory permissions |

---

## 📚 Documentation Files

1. **README.md** - Complete documentation
2. **SETUP.md** - Detailed installation guide
3. **QUICKSTART.md** - 5-minute quick start
4. **API_DOCUMENTATION.md** - API reference
5. **PROJECT_STRUCTURE.md** - This file

---

## 📝 License

MIT License - Free to use and modify

---

## 👥 Contributing

Contributions welcome! Feel free to:
- Fix bugs
- Add features
- Improve documentation
- Optimize code

---

## 📞 Support

For questions or issues:
1. Check documentation files
2. Review API documentation
3. Check console for error messages
4. Verify all prerequisites are installed

---

## 🎉 Ready to Use!

Everything is set up and ready to go. Start by following the QUICKSTART.md for immediate deployment!

**Built with ❤️ for College Digital Transformation**
