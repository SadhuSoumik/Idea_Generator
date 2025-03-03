// services/paymentService.js
const razorpay = require('../config/razorpay-config');

const paymentService = {
  async createSubscriptionOrder(amount) {
    try {
      const options = {
        amount,
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
        payment_capture: 1
      };
      
      return await razorpay.orders.create(options);
    } catch (error) {
      throw new Error('Failed to create payment order');
    }
  },

  async verifyPaymentSignature(orderId, paymentId, signature) {
    const text = `${orderId}|${paymentId}`;
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(text)
      .digest('hex');
    
    return generatedSignature === signature;
  }
};

module.exports = paymentService;