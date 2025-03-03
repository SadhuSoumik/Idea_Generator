
const aiService = require('../services/aiService');
const Idea = require('../models/idea');

const ideaController = {
  async generateIdea(req, res) {
    try {
      const { industry, target_market, budget } = req.body;
      const userId = req.user.id;

      let prompt;
      if (req.user.subscription_status === 'active') {
        prompt = `Generate a business idea for ${industry} industry, targeting ${target_market} with a budget of ${budget}`;
      } else {
        prompt = 'Generate a random tech business idea';
      }

      const response = await aiService.generateBusinessIdea(prompt);
      
      const idea = await Idea.create({
        userId,
        prompt,
        response,
        category: industry || 'tech'
      });

      res.json({ idea });
    } catch (error) {
      res.status(500).json({ error: 'Error generating idea' });
    }
  },

  async getUserIdeas(req, res) {
    try {
      const ideas = await Idea.getUserIdeas(req.user.id);
      res.json({ ideas });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching ideas' });
    }
  }
};

module.exports = ideaController;