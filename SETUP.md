# Setup and Installation Guide

## System Requirements

- Node.js (v14 or higher)
- npm or yarn
- MySQL Server (v5.7 or higher)
- Modern web browser
- Google Gemini API Key

## Step-by-Step Installation

### 1. Database Setup

1. Open MySQL command line or MySQL Workbench
2. Run the database.sql file:
```bash
mysql -u root -p < database.sql
```

Or manually execute the SQL commands in database.sql file.

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file and configure (see .env file for template)
# Edit the following values in .env:
# - DB_HOST
# - DB_USER  
# - DB_PASSWORD
# - DB_NAME
# - JWT_SECRET (change to a secure random string)
# - GEMINI_API_KEY (get from Google Cloud Console)

# Start the server
npm start
# For development: npm run dev
```

Backend will be available at: http://localhost:5000

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

Frontend will be available at: http://localhost:3000

## Configuration

### Backend Environment Variables (.env)

```
PORT=5000                                    # Backend port
DB_HOST=localhost                            # MySQL host
DB_USER=root                                 # MySQL user
DB_PASSWORD=                                 # MySQL password
DB_NAME=college_complaint_system             # Database name
JWT_SECRET=change_this_to_random_string      # JWT secret key
GEMINI_API_KEY=your_google_gemini_key       # Google Gemini API key
NODE_ENV=development                         # Environment
```

### Getting Google Gemini API Key

1. Go to https://console.cloud.google.com/
2. Create a new project
3. Enable the Google Generative AI API
4. Create an API key
5. Copy the API key to GEMINI_API_KEY in .env

## Verification

### Check Backend Connection
```bash
curl http://localhost:5000/health
```
Should return: `{ "message": "Server is running" }`

### Check Database Connection
- Login page should load
- Try registering a new account
- Check if data is stored in MySQL

## Common Issues and Solutions

| Issue | Solution |
|-------|----------|
| Cannot connect to MySQL | Ensure MySQL is running and credentials are correct |
| Port 5000 already in use | Change PORT in .env or kill process using the port |
| CORS error | Ensure backend is running and frontend API URL is correct |
| API key error | Verify GEMINI_API_KEY is valid and API is enabled |
| File upload error | Check /backend/uploads directory has write permissions |

## Testing the Application

1. Start both servers
2. Open http://localhost:3000
3. Click "Register here" link
4. Fill in the form and register
5. Login with your credentials
6. Navigate through the dashboard features

## Production Deployment

For production deployment:

1. Build frontend: `npm run build`
2. Set NODE_ENV=production in backend .env
3. Use environment variables for sensitive data
4. Set up HTTPS
5. Configure proper CORS origins
6. Set up database backups
7. Use a process manager like PM2 for backend

## Additional Notes

- Keep .env file secure, never commit to repository
- Enable backups for MySQL database
- Monitor file upload sizes (currently limited to multer default)
- Implement rate limiting for production
- Set up proper error logging and monitoring

---

For more detailed information, refer to the main README.md file.
