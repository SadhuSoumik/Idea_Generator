// services/aiService.js
const aiClient = require('../config/ai-config');

const aiService = {
  async generateBusinessIdea(prompt) {
    try {
      const completion = await aiClient.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a business consultant specialized in generating innovative business ideas."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.8,
        max_tokens: 500
      });

      return completion.choices[0].message.content;
    } catch (error) {
      throw new Error('Failed to generate business idea');
    }
  }
};

module.exports = aiService;