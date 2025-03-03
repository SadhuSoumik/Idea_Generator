const razorpay = require('../config/razorpay-config');
const Subscription = require('../models/subscription');
const User = require('../models/user');

const subscriptionController = {
  async createOrder(req, res) {
    try {
      const options = {
        amount: 9900,  // amount in paise (₹99)
        currency: "INR",
        receipt: `order_${Date.now()}`
      };

      const order = await razorpay.orders.create(options);
      res.json({ order });
    } catch (error) {
      res.status(500).json({ error: 'Error creating order' });
    }
  },

  async verifyPayment(req, res) {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
      
      // Verify signature
      const text = `${razorpay_order_id}|${razorpay_payment_id}`;
      const generatedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(text)
        .digest('hex');

      if (generatedSignature !== razorpay_signature) {
        return res.status(400).json({ error: 'Invalid payment signature' });
      }

      // Create subscription
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 1);

      const subscription = await Subscription.create({
        userId: req.user.id,
        planId: 'premium',
        paymentId: razorpay_payment_id,
        status: 'active'
      });

      await User.updateSubscription(req.user.id, 'active', endDate);

      res.json({ subscription });
    } catch (error) {
      res.status(500).json({ error: 'Error verifying payment' });
    }
  }
};

module.exports = subscriptionController;