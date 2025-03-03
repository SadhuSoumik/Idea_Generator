const openai = require('openai');

const aiClient = new openai({
  apiKey: process.env.OPENAI_API_KEY
});

module.exports = aiClient;

