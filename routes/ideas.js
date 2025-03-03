const express = require('express');
const router = express.Router();
const ideaController = require('../controllers/ideaController');
const auth = require('../middleware/auth');
const { freeLimiter, premiumLimiter } = require('../middleware/rateLimit');
const checkPremium = require('../middleware/premium');
const { validateIdeaGeneration } = require('../utils/validation');

router.post(
  '/generate',
  auth,
  (req, res, next) => {
    if (req.user.subscription_status === 'active') {
      premiumLimiter(req, res, next);
    } else {
      freeLimiter(req, res, next);
    }
  },
  validateIdeaGeneration,
  ideaController.generateIdea
);

router.get('/history', auth, ideaController.getUserIdeas);

module.exports = router;