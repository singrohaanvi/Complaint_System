# Digital Complaint and Feedback System for College

A comprehensive full-stack web application for managing student complaints, feedback, and collaboration with an AI chatbot using React, Node.js, Express, MySQL, and Google Gemini API.

## Features

- **Student Authentication**: Secure JWT-based authentication with registration and login
- **Complaint Management**: Submit, track, and manage complaints categorized as hostel, academics, infrastructure, library, or other
- **Feedback System**: Provide ratings and feedback on teachers and courses
- **File Upload**: Attach images or documents as evidence when submitting complaints
- **Chatbot**: AI-powered chatbot using Google Gemini API for college information
- **Notifications**: Real-time notification system for complaint updates
- **Responsive Dashboard**: User-friendly interface with Tailwind CSS

## Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MySQL2
- JWT Authentication
- Bcryptjs (Password Hashing)
- Multer (File Upload)
- Google Generative AI

## Project Structure

```
Digital_Complaint/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── complaintController.js
│   │   ├── feedbackController.js
│   │   └── chatbotController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── complaintRoutes.js
│   │   ├── feedbackRoutes.js
│   │   ├── chatbotRoutes.js
│   │   └── notificationRoutes.js
│   ├── uploads/
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── manifest.json
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   ├── SubmitComplaint.js
│   │   │   ├── ComplaintStatus.js
│   │   │   ├── SubmitFeedback.js
│   │   │   ├── Chatbot.js
│   │   │   └── Notifications.js
│   │   ├── components/
│   │   │   └── Navbar.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── .gitignore
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── README.md
└── database.sql
```

## Installation

### Prerequisites
- Node.js and npm
- MySQL Server
- Google Gemini API Key

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file and configure:
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=college_complaint_system
JWT_SECRET=your_jwt_secret_key_here
GEMINI_API_KEY=your_google_gemini_api_key
NODE_ENV=development
```

4. Create the database:
```bash
# Login to MySQL
mysql -u root -p

# Run the database setup
source ../database.sql;

# Or manually:
# 1. Create database: CREATE DATABASE college_complaint_system;
# 2. Use database: USE college_complaint_system;
# 3. Create tables: (run SQL commands from database.sql)
```

5. Start the backend server:
```bash
npm start
# For development with auto-reload:
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/register` - Register a new student
- `POST /api/login` - Login student

### Complaints
- `POST /api/complaints` - Submit a complaint (with file upload)
- `GET /api/complaints` - Get all complaints by logged-in student
- `GET /api/complaints/:id` - Get specific complaint details

### Feedback
- `POST /api/feedback` - Submit feedback
- `GET /api/feedback` - Get all feedback by logged-in student

### Chatbot
- `POST /api/chatbot` - Chat with AI (Gemini API)

### Notifications
- `GET /api/notifications/:studentId` - Get notifications
- `PUT /api/notifications/:notificationId` - Mark notification as read

## Usage

1. **Register**: Create a new account with your email and department
2. **Login**: Access the dashboard after login
3. **Submit Complaint**: Fill the complaint form with category, description, and optional image
4. **Track Status**: Monitor complaint status and admin responses
5. **Provide Feedback**: Rate teachers and courses with comments
6. **Use Chatbot**: Ask questions about college information
7. **View Notifications**: Check updates on your complaints

## Database Schema

### Students Table
- id (Primary Key)
- name
- email (Unique)
- password (Hashed)
- department
- created_at

### Complaints Table
- id (Primary Key)
- student_id (Foreign Key)
- category
- description
- image_path
- status (Pending, In Progress, Resolved)
- admin_response
- created_at
- updated_at

### Feedback Table
- id (Primary Key)
- student_id (Foreign Key)
- teacher_name
- course_name
- rating (1-5)
- comments
- created_at

### Notifications Table
- id (Primary Key)
- student_id (Foreign Key)
- message
- is_read
- created_at

## Environment Variables

### Backend (.env)
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=college_complaint_system
JWT_SECRET=your_secret_key_change_this
GEMINI_API_KEY=your_google_gemini_api_key
NODE_ENV=development
```

## Features In Detail

### Student Authentication
- Secure registration with email validation
- Password hashing using bcryptjs
- JWT token-based authentication
- 24-hour token expiry

### Complaint Management
- Multiple complaint categories
- File upload support for images/documents
- Real-time status tracking
- Admin response system

### Feedback System
- 1-5 star rating system
- Optional detailed comments
- Teacher and course information
- Feedback history

### Chatbot Integration
- Google Gemini API integration
- Real-time conversation
- Context-aware responses
- Pre-defined categories (timings, departments, hostels, library, admission)

### Notifications
- Automatic notifications on status changes
- Mark as read functionality
- Timestamped messages

## File Upload

Files are uploaded using Multer and stored in the `/backend/uploads` directory. The file path is stored in the database.

Supported file types: Images (jpg, png, gif, etc.) and Documents (pdf, doc, docx)

## Troubleshooting

### Database Connection Error
- Ensure MySQL server is running
- Check database credentials in .env
- Verify database exists: `SHOW DATABASES;`

### API Connection Error
- Ensure backend server is running on port 5000
- Check CORS configuration
- Verify network connectivity

### Authentication Error
- Clear browser localStorage
- Re-login with correct credentials
- Check JWT_SECRET is set correctly

### Gemini API Error
- Verify API key is valid
- Check API is enabled in Google Cloud Console
- Ensure rate limits haven't been exceeded

## Future Enhancements

- Email notifications
- Admin dashboard for complaint management
- Analytics and reporting
- Mobile app version
- Real-time chat notifications
- Advanced search and filtering
- Multi-language support
- Two-factor authentication

## License

MIT License

## Support

For issues or questions, please contact the development team.

---

**Created with ❤️ for College Complaint Management**
