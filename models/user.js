// models/user.js
const pool = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  static async create({ email, password, name }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const result = await pool.query(
      `INSERT INTO users (email, password, name, created_at, subscription_status)
       VALUES ($1, $2, $3, NOW(), 'free')
       RETURNING id, email, name, subscription_status`,
      [email, hashedPassword, name]
    );
    
    return result.rows[0];
  }

  static async findByEmail(email) {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0];
  }

  static async updateSubscription(userId, status, endDate) {
    const result = await pool.query(
      `UPDATE users 
       SET subscription_status = $1, subscription_end = $2
       WHERE id = $3
       RETURNING *`,
      [status, endDate, userId]
    );
    return result.rows[0];
  }
}

module.exports = User;