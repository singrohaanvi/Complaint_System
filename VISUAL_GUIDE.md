# 📊 Visual Project Structure

## Directory Tree

```
e:\Digital_Complaint/                                    (ROOT)
│
├─ 📄 README.md                                         (Main documentation)
├─ 📄 SETUP.md                                          (Installation guide)
├─ 📄 QUICKSTART.md                                     (5-minute quick start)
├─ 📄 API_DOCUMENTATION.md                              (API reference)
├─ 📄 PROJECT_STRUCTURE.md                              (File organization)
├─ 📄 IMPLEMENTATION_SUMMARY.md                         (Summary of what's created)
└─ 📄 database.sql                                      (MySQL schema)
│
├─ 📁 backend/                                          (Node.js + Express)
│  │
│  ├─ 📄 server.js                                    (Main server file)
│  ├─ 📄 package.json                                 (dependencies)
│  ├─ 📄 .env                                         (configuration template)
│  ├─ 📄 .gitignore                                   (git ignore)
│  │
│  ├─ 📁 config/
│  │  └─ 📄 db.js                                  (MySQL connection pool)
│  │
│  ├─ 📁 controllers/
│  │  ├─ 📄 authController.js                     (Login/Register logic)
│  │  ├─ 📄 complaintController.js                (Complaint operations)
│  │  ├─ 📄 feedbackController.js                 (Feedback operations)
│  │  └─ 📄 chatbotController.js                  (Chatbot integration)
│  │
│  ├─ 📁 middleware/
│  │  └─ 📄 authMiddleware.js                     (JWT verification)
│  │
│  ├─ 📁 routes/
│  │  ├─ 📄 authRoutes.js                         (Auth endpoints)
│  │  ├─ 📄 complaintRoutes.js                    (Complaint endpoints)
│  │  ├─ 📄 feedbackRoutes.js                     (Feedback endpoints)
│  │  ├─ 📄 chatbotRoutes.js                      (Chatbot endpoint)
│  │  └─ 📄 notificationRoutes.js                 (Notification endpoints)
│  │
│  └─ 📁 uploads/                                    (User uploaded files)
│     └─ 📄 .gitkeep                              (Git tracking file)
│
└─ 📁 frontend/                                         (React.js)
   │
   ├─ 📄 package.json                                (dependencies)
   ├─ 📄 .gitignore                                 (git ignore)
   ├─ 📄 tailwind.config.js                         (CSS framework config)
   ├─ 📄 postcss.config.js                          (PostCSS config)
   │
   ├─ 📁 public/
   │  ├─ 📄 index.html                          (HTML template)
   │  └─ 📄 manifest.json                        (PWA manifest)
   │
   └─ 📁 src/
      ├─ 📄 App.js                                (Main app component)
      ├─ 📄 index.js                              (React entry point)
      ├─ 📄 index.css                             (Global styles)
      │
      ├─ 📁 pages/                                  (Route components)
      │  ├─ 📄 Login.js                         (Login page)
      │  ├─ 📄 Register.js                      (Registration page)
      │  ├─ 📄 Dashboard.js                     (Main dashboard)
      │  ├─ 📄 SubmitComplaint.js               (Complaint form)
      │  ├─ 📄 ComplaintStatus.js               (Track complaints)
      │  ├─ 📄 SubmitFeedback.js                (Feedback form)
      │  ├─ 📄 Chatbot.js                       (Chat interface)
      │  └─ 📄 Notifications.js                 (Notifications page)
      │
      └─ 📁 components/                            (Reusable components)
         └─ 📄 Navbar.js                        (Navigation bar)
```

---

## 🔄 User Journey Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    APPLICATION START                        │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
                    ┌──────────────┐
                    │  Not Logged  │
                    └──────────────┘
                    │              │
           ┌────────▼────┐  ┌──────▼────────┐
           │   Register  │  │    Login      │
           └────────┬────┘  └──────┬────────┘
                    │              │
                    └──────┬───────┘
                           ▼
                    ┌──────────────┐
                    │  Logged In   │
                    └──────────────┘
                           │
            ┌──────────────┼──────────────┐
            │              │              │
            ▼              ▼              ▼
        Dashboard ──── Complaint ──── Feedback
            │              │              │
    ┌───────┼──────┐       │         ┌────┘
    │       │      │       │         │
    ▼       ▼      ▼       ▼         ▼
  Track  Chatbot Notifications  Notifications
Complaints

Graph Legend:
→ = Navigation flow
├ = Multiple paths
└ = Connection point
```

---

## 📡 Backend Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   CLIENT (React)                         │
└─────────────────────────────────────────────────────────┘
                            │
                   ┌────────▼────────┐
                   │  HTTP/CORS      │
                   └────────┬────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
    ┌────────┐          ┌────────┐         ┌────────┐
    │ Routes │          │ Routes │         │ Routes │
    │ (5)    │          │ (5)    │         │ (5)    │
    └────┬───┘          └────┬───┘         └────┬───┘
         │                   │                   │
         ▼                   ▼                   ▼
    ┌────────┐          ┌────────┐         ┌────────┐
    │ Auth   │          │Complaint        │Feedback│
    │Ctrl    │          │Ctrl             │Ctrl    │
    └────┬───┘          └────┬───┘         └────┬───┘
         │                   │                   │
         └───────────┬───────┴───────┬───────────┘
                     │               │
                     ▼               ▼
            ┌────────────────────────────────┐
            │      Middleware (JWT Auth)     │
            └────────────────────────────────┘
                     │
         ┌───────────┼───────────┐
         │           │           │
         ▼           ▼           ▼
    ┌────────┐  ┌────────┐  ┌────────┐
    │ MySQL  │  │Uploads │  │Gemini  │
    │Database│  │Storage │  │API     │
    └────────┘  └────────┘  └────────┘
```

---

## 🎯 Technology Stack Map

```
┌──────────────────────────────────────────────────────────┐
│                  FRONTEND (Port 3000)                     │
├──────────────────────────────────────────────────────────┤
│ ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐ │
│ │   React.js  │  │ React Router │  │  Tailwind CSS    │ │
│ │   18.2      │  │      6       │  │      3.3         │ │
│ └─────────────┘  └──────────────┘  └──────────────────┘ │
│                                                           │
│ ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐ │
│ │   Axios     │  │   Hooks      │  │  Local Storage   │ │
│ │  (HTTP)     │  │  (useState)  │  │    (JWT)         │ │
│ └─────────────┘  └──────────────┘  └──────────────────┘ │
└──────────────────────────────────────────────────────────┘
                            ▲
                            │ HTTP/JSON
                            ▼
┌──────────────────────────────────────────────────────────┐
│                  BACKEND (Port 5000)                      │
├──────────────────────────────────────────────────────────┤
│ ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐ │
│ │   Node.js   │  │  Express.js  │  │   Middleware     │ │
│ │   Runtime   │  │   Framework  │  │   (Auth, CORS)   │ │
│ └─────────────┘  └──────────────┘  └──────────────────┘ │
│                                                           │
│ ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐ │
│ │  Bcryptjs   │  │ JWT Token    │  │    Multer        │ │
│ │  Password   │  │  Auth        │  │  File Upload     │ │
│ └─────────────┘  └──────────────┘  └──────────────────┘ │
└──────────────────────────────────────────────────────────┘
                            ▲
                            │ SQL
                            ▼
┌──────────────────────────────────────────────────────────┐
│                   DATABASE Layer                          │
├──────────────────────────────────────────────────────────┤
│ ┌─────────────┐  ┌──────────────┐                         │
│ │   MySQL     │  │  4 Tables    │                         │
│ │   Server    │  │  Normalized  │                         │
│ └─────────────┘  └──────────────┘                         │
│                                                           │
│ Tables: Students, Complaints, Feedback, Notifications    │
└──────────────────────────────────────────────────────────┘
                            ▲
                            │ API Call
                            ▼
┌──────────────────────────────────────────────────────────┐
│                   EXTERNAL SERVICES                       │
├──────────────────────────────────────────────────────────┤
│ ┌──────────────────────────────────────────────────────┐ │
│ │    Google Gemini API (Chatbot Integration)          │ │
│ └──────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

---

## 📊 Database Schema Diagram

```
┌─────────────────────────┐
│       students          │
├─────────────────────────┤
│ id (PK)         INT     │
│ name            VARCHAR │
│ email (UNIQUE)  VARCHAR │
│ password        VARCHAR │
│ department      VARCHAR │
│ created_at      TIMESTAMP
└──────┬────────────────────┘
       │ (1:N)
       ├────────────────────┬──────────────────┐
       │                    │                  │
       ▼                    ▼                  ▼
   ┌─────────────────┐ ┌──────────────┐ ┌─────────────┐
   │  complaints     │ │   feedback   │ │notifications│
   ├─────────────────┤ ├──────────────┤ ├─────────────┤
   │ id (PK)         │ │ id (PK)      │ │ id (PK)     │
   │ student_id (FK) │ │ student_id   │ │ student_id  │
   │ category        │ │ teacher_name │ │ message     │
   │ description     │ │ course_name  │ │ is_read     │
   │ image_path      │ │ rating (1-5) │ │ created_at  │
   │ status          │ │ comments     │ └─────────────┘
   │ admin_response  │ │ created_at   │
   │ created_at      │ └──────────────┘
   └─────────────────┘

Legend:
PK = Primary Key
FK = Foreign Key
N = Many
1 = One
```

---

## 🔐 Security Architecture

```
┌──────────────────────────────────────────────────────┐
│            CLIENT REQUEST                            │
└──────────────────────────────────────────────────────┘
                        │
                        ▼
        ┌───────────────────────────────┐
        │  Initial Validation           │
        │ (Client-side validation)      │
        └───────────┬───────────────────┘
                    │
                    ▼
        ┌───────────────────────────────┐
        │  CORS Check                   │
        │ (Cross-origin validation)     │
        └───────────┬───────────────────┘
                    │
                    ▼
        ┌───────────────────────────────┐
        │  JWT Token Verification       │
        │ (Authentication Middleware)   │
        └───────────┬───────────────────┘
                    │
        ┌───────────┴───────────┐
        │ No Token / Invalid    │
        ▼                       ▼
    401 Error         Valid Token Proceed
                              │
                              ▼
                    ┌──────────────────────┐
                    │ Input Validation     │
                    │ (Server-side)        │
                    └──────┬───────────────┘
                           │
                           ▼
                    ┌──────────────────────┐
                    │ Password Hashing     │
                    │ (Bcryptjs - Auth)    │
                    └──────┬───────────────┘
                           │
                           ▼
                    ┌──────────────────────┐
                    │ SQL Parameterized    │
                    │ (Query Safety)       │
                    └──────┬───────────────┘
                           │
                           ▼
                    ┌──────────────────────┐
                    │ File Upload Check    │
                    │ (Type validation)    │
                    └──────┬───────────────┘
                           │
                           ▼
                    ┌──────────────────────┐
                    │ Response Return      │
                    └──────────────────────┘
```

---

## 📈 API Call Flow

```
Frontend Component
       │
       │ axios.post()
       ▼
┌──────────────────────────┐
│  HTTP Request            │
│  + JWT Token in Header   │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│  Express Server          │
│  /api/endpoint           │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│  Route Handler           │
│  /routes/...Routes.js    │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│  Middleware (Auth)       │
│  authMiddleware.js       │
└──────┬───────────────────┘
       │
       ├─ Invalid Token → 401 Response
       │
       └─ Valid Token
           │
           ▼
┌──────────────────────────┐
│  Controller Function     │
│  /controllers/...Ctrl.js │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│  Database Operation      │
│  MySQL Query             │
└──────┬───────────────────┘
       │
       ├─ Error → Error Response
       │
       └─ Success
           │
           ▼
┌──────────────────────────┐
│  JSON Response           │
│  Status + Data           │
└──────┬───────────────────┘
       │
       ▼
Frontend Component (Handle Response)
```

---

## ✨ Feature Implementation Matrix

```
Feature                 Backend     Frontend    Database
────────────────────────────────────────────────────────
Registration            ✅          ✅          ✅
Login/Logout            ✅          ✅          ✅
JWT Auth                ✅          ✅          N/A
Submit Complaint        ✅          ✅          ✅
File Upload             ✅          ✅          ✅
Track Complaints        ✅          ✅          ✅
Submit Feedback         ✅          ✅          ✅
Chatbot (Gemini)        ✅          ✅          N/A
Notifications           ✅          ✅          ✅
User Profile            ✅          ✅          ✅
Error Handling          ✅          ✅          N/A
Validation              ✅          ✅          ✅
CORS                    ✅          ✅          N/A
Environment Config      ✅          N/A         N/A
```

---

This Visual Guide provides a complete overview of the system architecture!
