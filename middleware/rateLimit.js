// middleware/rateLimit.js
const rateLimit = require('express-rate-limit');

const generateRateLimiter = (type) => {
  const limits = {
    free: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 5 // 5 requests per 15 minutes for free users
    },
    premium: {
      windowMs: 15 * 60 * 1000,
      max: 50 // 50 requests per 15 minutes for premium users
    }
  };

  return rateLimit({
    windowMs: limits[type].windowMs,
    max: limits[type].max,
    message: {
      error: `Too many requests. Please try again after ${limits[type].windowMs / 60000} minutes.`
    }
  });
};

module.exports = {
  freeLimiter: generateRateLimiter('free'),
  premiumLimiter: generateRateLimiter('premium')
};