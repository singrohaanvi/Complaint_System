-- Create Database
CREATE DATABASE IF NOT EXISTS college_complaint_system;
USE college_complaint_system;

-- Students Table
CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  department VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email)
);

-- Admins Table
CREATE TABLE admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email)
);

-- Insert Default Admin (email: admin@college.com, password: admin123)
INSERT INTO admins (name, email, password, role) VALUES 
('Admin User', 'admin@college.com', '$2a$10$JZX3u5qYvGHQBJ.Q7T1k9ODZHC7u0hV9H9qT1K8Y9Z8X5K7T9D1H2', 'admin');

-- Complaints Table
CREATE TABLE complaints (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  category VARCHAR(100) NOT NULL,
  description LONGTEXT NOT NULL,
  image_path VARCHAR(255),
  status VARCHAR(50) DEFAULT 'Pending',
  admin_response LONGTEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  INDEX idx_student_id (student_id),
  INDEX idx_status (status)
);

-- Feedback Table
CREATE TABLE feedback (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  teacher_name VARCHAR(255) NOT NULL,
  course_name VARCHAR(255) NOT NULL,
  rating INT NOT NULL,
  comments LONGTEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  INDEX idx_student_id (student_id)
);

-- Notifications Table
CREATE TABLE notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  message LONGTEXT NOT NULL,
  is_read TINYINT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  INDEX idx_student_id (student_id),
  INDEX idx_is_read (is_read)
);
