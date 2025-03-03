// models/idea.js
// Backend/routes/ideas.js
const express = require('express');
const router = express.Router();
const ideaController = require('../controllers/ideaController');
const auth = require('../middleware/auth');  // This path should be correct now
const { freeLimiter, premiumLimiter } = require('../middleware/rateLimit');
const checkPremium = require('../middleware/premium');
const { validateIdeaGeneration } = require('../utils/validation');

// ... rest of your code


class Idea {
    static async create({ userId, prompt, response, category }) {
      const result = await pool.query(
        `INSERT INTO ideas (user_id, prompt, response, category, created_at)
         VALUES ($1, $2, $3, $4, NOW())
         RETURNING *`,
        [userId, prompt, response, category]
      );
      return result.rows[0];
    }
  
    static async getUserIdeas(userId, limit = 10) {
      const result = await pool.query(
        `SELECT * FROM ideas 
         WHERE user_id = $1 
         ORDER BY created_at DESC 
         LIMIT $2`,
        [userId, limit]
      );
      return result.rows;
    }
  }
  
  module.exports = Idea;
  
