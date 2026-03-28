const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

async function verifyAdmin() {
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

    // Get admin account
    const [admins] = await connection.execute(
      'SELECT * FROM admins WHERE email = ?',
      ['admin@college.com']
    );

    if (admins.length === 0) {
      console.log('✗ Admin account not found');
    } else {
      const admin = admins[0];
      console.log('\n--- Admin Account Details ---');
      console.log('ID:', admin.id);
      console.log('Name:', admin.name);
      console.log('Email:', admin.email);
      console.log('Role:', admin.role);
      console.log('Password Hash (first 20 chars):', admin.password.substring(0, 20) + '...');
      console.log('Password Hash Length:', admin.password.length);

      // Test if password hashes match
      const testPasswordHash = await bcrypt.hash('admin123', 10);
      console.log('\n--- Password Test ---');
      console.log('Testing password "admin123"...');

      const isMatch = await bcrypt.compare('admin123', admin.password);
      console.log('Password Match Result:', isMatch);

      if (!isMatch) {
        console.log('\n✗ Password does not match! Resetting password...');
        const newHash = await bcrypt.hash('admin123', 10);
        await connection.execute(
          'UPDATE admins SET password = ? WHERE email = ?',
          [newHash, 'admin@college.com']
        );
        console.log('✓ Password reset successfully');
      } else {
        console.log('✓ Password verified');
      }
    }

    await connection.end();
    process.exit(0);
  } catch (error) {
    console.error('✗ Error:', error.message);
    process.exit(1);
  }
}

verifyAdmin();
