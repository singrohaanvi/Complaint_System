# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Node.js installed
- MySQL server running
- Google Gemini API Key

### Step 1: Database Setup (1 min)

```bash
# Login to MySQL and run:
mysql -u root -p < database.sql

# Or manually create database:
# 1. Open MySQL client
# 2. Run: CREATE DATABASE college_complaint_system;
# 3. Run: USE college_complaint_system;
# 4. Copy and paste all SQL from database.sql
```

### Step 2: Backend Setup (2 mins)

```bash
cd backend

npm install

# Create .env file with:
# PORT=5000
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=
# DB_NAME=college_complaint_system
# JWT_SECRET=your_random_secret_key
# GEMINI_API_KEY=your_api_key

npm start
```

✅ Backend running on http://localhost:5000

### Step 3: Frontend Setup (2 mins)

```bash
cd ../frontend

npm install

npm start
```

✅ Frontend running on http://localhost:3000

### Step 4: Test the App (1 min)

1. Go to http://localhost:3000
2. Click "Register here"
3. Fill in the form and register
4. Login with your credentials
5. Explore the dashboard!

---

## 📂 Project Files Overview

**Backend** (`/backend`)
- Main file: `server.js`
- API routes: `/routes`
- Database config: `/config/db.js`
- Upload folder: `/uploads`

**Frontend** (`/frontend`)
- Main file: `App.js`
- Pages: `/src/pages`
- Components: `/src/components`

**Database** (`database.sql`)
- Complete MySQL schema with all tables

**Documentation**
- `README.md` - Full documentation
- `SETUP.md` - Detailed setup guide
- `API_DOCUMENTATION.md` - API reference

---

## 🎯 Main Features

| Feature | File |
|---------|------|
| Student Login/Register | `/frontend/src/pages/Login.js` |
| Submit Complaints | `/frontend/src/pages/SubmitComplaint.js` |
| Track Status | `/frontend/src/pages/ComplaintStatus.js` |
| Feedback Form | `/frontend/src/pages/SubmitFeedback.js` |
| AI Chatbot | `/frontend/src/pages/Chatbot.js` |
| Notifications | `/frontend/src/pages/Notifications.js` |

---

## 🔧 Configuration Details

### .env File (Backend)
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=college_complaint_system
JWT_SECRET=your_secure_random_string_here
GEMINI_API_KEY=your_google_gemini_api_key
NODE_ENV=development
```

### API Base URL (Frontend)
- Backend: `http://localhost:5000/api`
- All requests include Authorization header with JWT token

---

## 📋 Database Tables

1. **students** - User accounts
2. **complaints** - Submitted complaints
3. **feedback** - Feedback entries
4. **notifications** - Notification messages

---

## ⚡ Common Commands

```bash
# Backend
cd backend
npm install        # Install dependencies
npm start          # Run server (development)
npm run dev        # Run with auto-reload

# Frontend  
cd frontend
npm install        # Install dependencies
npm start          # Run on http://localhost:3000
npm run build      # Build for production
```

---

## ✅ Verification Checklist

- [ ] MySQL running and database created
- [ ] Backend server running on port 5000
- [ ] Frontend running on port 3000
- [ ] Can register new account
- [ ] Can login with credentials
- [ ] Can submit complaint
- [ ] Can view complaint status
- [ ] Chatbot responds to messages
- [ ] Can submit feedback
- [ ] Notifications are visible

---

## 🆘 Troubleshooting

**Cannot start backend?**
```bash
# Check if port 5000 is in use
# Windows: netstat -ano | findstr :5000
# Mac/Linux: lsof -i :5000
# Change PORT in .env if needed
```

**Cannot start frontend?**
```bash
# Clear npm cache
npm cache clean --force
# Delete node_modules
rm -rf node_modules
# Reinstall
npm install
```

**Database connection error?**
```bash
# Check MySQL running
mysql -u root -p -e "SELECT 1;"

# Verify credentials in .env match MySQL setup
```

**Gemini API error?**
```bash
# Verify API key is valid
# Check API is enabled in Google Cloud Console
# Check rate limits haven't been exceeded
```

---

## 📚 Next Steps

1. Review [READ.md](README.md) for complete documentation
2. Check [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for API details
3. Explore the codebase in `/backend` and `/frontend`
4. Customize UI colors in Tailwind config
5. Add more complaint categories if needed
6. Deploy to production when ready

---

## 🎨 Customization

### Change Theme Colors
Edit `/frontend/tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color'
    }
  }
}
```

### Add More Departments
Edit `/frontend/src/pages/Register.js`:
```javascript
const departments = ['CSE', 'ECE', 'ME', 'CE', 'EEE', 'BT', 'NEW_DEPT'];
```

### Modify Complaint Categories
Edit `/frontend/src/pages/SubmitComplaint.js`:
```javascript
const categories = ['hostel', 'academics', 'infrastructure', 'library', 'other', 'NEW_CATEGORY'];
```

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review API documentation
3. Check console logs for errors
4. Verify all prerequisites are installed

---

**Happy Coding! 🎉**

Create a better college complaint system with this full-stack application!
