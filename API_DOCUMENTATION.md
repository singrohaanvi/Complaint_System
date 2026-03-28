# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Authentication Endpoints

### Register Student
**POST** `/register`

Register a new student account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@college.edu",
  "password": "password123",
  "department": "CSE"
}
```

**Response (201):**
```json
{
  "message": "Registration successful"
}
```

**Error (400):**
```json
{
  "message": "Email already registered"
}
```

---

### Login Student
**POST** `/login`

Authenticate and get JWT token.

**Request Body:**
```json
{
  "email": "john@college.edu",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@college.edu",
    "department": "CSE"
  }
}
```

**Error (401):**
```json
{
  "message": "Invalid credentials"
}
```

---

## Complaint Endpoints

### Submit Complaint
**POST** `/complaints` 
**Authentication:** Required

Submit a new complaint with optional file upload.

**Request (Form Data):**
- `category` (string, required): hostel, academics, infrastructure, library, other
- `description` (string, required): Complaint description
- `image` (file, optional): Image or document file

**Response (201):**
```json
{
  "message": "Complaint submitted successfully"
}
```

**Example cURL:**
```bash
curl -X POST http://localhost:5000/api/complaints \
  -H "Authorization: Bearer <token>" \
  -F "category=hostel" \
  -F "description=Complaint description" \
  -F "image=@path/to/image.jpg"
```

---

### Get All Complaints
**GET** `/complaints`
**Authentication:** Required

Retrieve all complaints submitted by the logged-in student.

**Response (200):**
```json
[
  {
    "id": 1,
    "student_id": 1,
    "category": "hostel",
    "description": "Complaint description here",
    "image_path": "/uploads/1234567890-image.jpg",
    "status": "Pending",
    "admin_response": null,
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  }
]
```

---

### Get Complaint by ID
**GET** `/complaints/:id`
**Authentication:** Required

Retrieve details of a specific complaint.

**Response (200):**
```json
{
  "id": 1,
  "student_id": 1,
  "category": "hostel",
  "description": "Complaint description",
  "image_path": "/uploads/1234567890-image.jpg",
  "status": "In Progress",
  "admin_response": "We are looking into this matter.",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-16T14:20:00Z"
}
```

**Error (404):**
```json
{
  "message": "Complaint not found"
}
```

---

## Feedback Endpoints

### Submit Feedback
**POST** `/feedback`
**Authentication:** Required

Submit feedback about a teacher or course.

**Request Body:**
```json
{
  "teacherName": "Dr. Smith",
  "courseName": "Data Structures",
  "rating": 4,
  "comments": "Great teaching methodology"
}
```

**Response (201):**
```json
{
  "message": "Feedback submitted successfully"
}
```

**Validation:**
- Rating must be between 1 and 5
- teacherName and courseName are required
- Comments are optional

---

### Get All Feedback
**GET** `/feedback`
**Authentication:** Required

Retrieve all feedback submitted by the logged-in student.

**Response (200):**
```json
[
  {
    "id": 1,
    "student_id": 1,
    "teacher_name": "Dr. Smith",
    "course_name": "Data Structures",
    "rating": 4,
    "comments": "Great teaching methodology",
    "created_at": "2024-01-15T10:30:00Z"
  }
]
```

---

## Chatbot Endpoint

### Send Message to Chatbot
**POST** `/chatbot`
**Authentication:** Not Required

Chat with the AI assistant about college information.

**Request Body:**
```json
{
  "message": "What are the college timings?"
}
```

**Response (200):**
```json
{
  "reply": "The college operates from 8:00 AM to 5:00 PM on weekdays..."
}
```

**Topics the Chatbot can help with:**
- College timings
- Department information
- Hostel information
- Library information
- Admission process
- General college questions

---

## Notification Endpoints

### Get Notifications
**GET** `/notifications/:studentId`
**Authentication:** Required

Retrieve all notifications for a student.

**Response (200):**
```json
[
  {
    "id": 1,
    "student_id": 1,
    "message": "Your complaint #1 status has been updated to 'In Progress'",
    "is_read": 0,
    "created_at": "2024-01-16T10:00:00Z"
  },
  {
    "id": 2,
    "student_id": 1,
    "message": "Your complaint #1 has been resolved",
    "is_read": 1,
    "created_at": "2024-01-17T15:30:00Z"
  }
]
```

---

### Mark Notification as Read
**PUT** `/notifications/:notificationId`
**Authentication:** Required

Mark a specific notification as read.

**Response (200):**
```json
{
  "message": "Notification marked as read"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Category and description are required"
}
```

### 401 Unauthorized
```json
{
  "message": "Invalid token"
}
```

### 403 Forbidden
```json
{
  "message": "Unauthorized access"
}
```

### 404 Not Found
```json
{
  "message": "Complaint not found"
}
```

### 500 Server Error
```json
{
  "message": "Server error",
  "error": "Error details"
}
```

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Permission denied |
| 404 | Not Found - Resource not found |
| 500 | Server Error - Internal error |

---

## File Upload

Files are uploaded using multipart/form-data with Multer.

**Supported File Types:**
- Images: jpg, jpeg, png, gif, bmp
- Documents: pdf, doc, docx, txt

**Upload Limits:**
- Default: 10MB per file
- Files are stored in `/backend/uploads/`

---

## Example Client Usage

### Using JavaScript/Fetch

```javascript
// Register
const registerResponse = await fetch('http://localhost:5000/api/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John',
    email: 'john@college.edu',
    password: 'password',
    department: 'CSE'
  })
});

// Login
const loginResponse = await fetch('http://localhost:5000/api/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'john@college.edu',
    password: 'password'
  })
});

const loginData = await loginResponse.json();
const token = loginData.token;

// Submit Complaint with File
const formData = new FormData();
formData.append('category', 'hostel');
formData.append('description', 'Complaint text');
formData.append('image', fileInput.files[0]);

const complaintResponse = await fetch('http://localhost:5000/api/complaints', {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${token}` },
  body: formData
});
```

### Using Axios

```javascript
// Setup default headers
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

// Submit Complaint
const response = await axios.post('http://localhost:5000/api/complaints', data);
```

---

## Rate Limiting

Currently, no rate limiting is implemented. For production, add rate limiting middleware.

---

## CORS Configuration

Frontend URL should match the CORS configuration in server.js:
```javascript
app.use(cors());
```

For production, specify allowed origins:
```javascript
app.use(cors({
  origin: 'https://yourdomain.com',
  credentials: true
}));
```

---

For more information, refer to the README.md file.
