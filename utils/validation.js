// utils/validation.js
const validateRegistration = (req, res, next) => {
    const { email, password, name } = req.body;
  
    if (!email || !password || !name) {
      return res.status(400).json({
        error: 'Please provide all required fields'
      });
    }
  
    if (password.length < 8) {
      return res.status(400).json({
        error: 'Password must be at least 8 characters long'
      });
    }
  
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return res.status(400).json({
        error: 'Please provide a valid email address'
      });
    }
  
    next();
  };
  
  const validateLogin = (req, res, next) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({
        error: 'Please provide email and password'
      });
    }
  
    next();
  };
  
  const validateIdeaGeneration = (req, res, next) => {
    if (req.user.subscription_status === 'active') {
      const { industry, target_market, budget } = req.body;
      
      if (!industry || !target_market || !budget) {
        return res.status(400).json({
          error: 'Please provide all required fields for idea generation'
        });
      }
    }
  
    next();
  };
  
  module.exports = {
    validateRegistration,
    validateLogin,
    validateIdeaGeneration
  };