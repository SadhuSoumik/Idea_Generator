const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');
const auth = require('../middleware/auth');

router.post('/create-order', auth, subscriptionController.createOrder);
router.post('/verify-payment', auth, subscriptionController.verifyPayment);

module.exports = router;