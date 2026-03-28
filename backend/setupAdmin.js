const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

async function setupAdmin() {
  let connection;
  try {
    // Create connection
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log('✓ Connected to database');

    // Create admins table if it doesn't exist
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS admins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('✓ Admins table created/verified');

    // Check if admin already exists
    const [existingAdmins] = await connection.execute(
      'SELECT * FROM admins WHERE email = ?',
      ['admin@college.com']
    );

    if (existingAdmins.length > 0) {
      console.log('✓ Admin account already exists');
      console.log('  Email: admin@college.com');
      console.log('  Password: admin123');
    } else {
      // Hash the password
      const hashedPassword = await bcrypt.hash('admin123', 10);

      // Insert default admin
      await connection.execute(
        'INSERT INTO admins (name, email, password, role) VALUES (?, ?, ?, ?)',
        ['Admin', 'admin@college.com', hashedPassword, 'admin']
      );

      console.log('✓ Default admin account created');
      console.log('  Email: admin@college.com');
      console.log('  Password: admin123');
    }

    await connection.end();
    console.log('✓ Setup completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('✗ Error during setup:', error.message);
    process.exit(1);
  }
}

setupAdmin();
