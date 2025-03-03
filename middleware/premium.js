// middleware/premium.js
const checkPremium = async (req, res, next) => {
    try {
      const result = await pool.query(
        'SELECT subscription_status, subscription_end FROM users WHERE id = $1',
        [req.user.id]
      );
  
      if (result.rows[0].subscription_status !== 'active' || 
          new Date(result.rows[0].subscription_end) < new Date()) {
        return res.status(403).json({
          error: 'Premium subscription required for this feature'
        });
      }
  
      next();
    } catch (error) {
      res.status(500).json({ error: 'Error checking subscription status' });
    }
  };
  
  module.exports = checkPremium;