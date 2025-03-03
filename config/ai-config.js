const openai = require('openai');

const aiClient = new openai({
  apiKey: process.env.OPENAI_API_KEY
});

module.exports = aiClient;

// config/razorpay-config.js
const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

module.exports = razorpay;