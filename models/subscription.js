  // models/subscription.js
  class Subscription {
    static async create({ userId, planId, paymentId, status }) {
      const result = await pool.query(
        `INSERT INTO subscriptions (
          user_id, plan_id, payment_id, status, 
          created_at, updated_at
         )
         VALUES ($1, $2, $3, $4, NOW(), NOW())
         RETURNING *`,
        [userId, planId, paymentId, status]
      );
      return result.rows[0];
    }
  
    static async getActiveSubscription(userId) {
      const result = await pool.query(
        `SELECT * FROM subscriptions 
         WHERE user_id = $1 AND status = 'active'
         ORDER BY created_at DESC 
         LIMIT 1`,
        [userId]
      );
      return result.rows[0];
    }
  
    static async updateStatus(subscriptionId, status) {
      const result = await pool.query(
        `UPDATE subscriptions 
         SET status = $1, updated_at = NOW()
         WHERE id = $2
         RETURNING *`,
        [status, subscriptionId]
      );
      return result.rows[0];
    }
  }
  
  module.exports = Subscription;