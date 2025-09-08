// server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors()); // Allow frontend to call this proxy
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta2/models/chat-bison-001:generateMessage',
      {
        prompt: { text: prompt },
        temperature: 0.7,
        candidateCount: 1
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const aiOutput = response.data.candidates[0]?.output;
    res.json({ output: aiOutput });
  } catch (error) {
    console.error('Gemini API error:', error.message);
    res.status(500).json({ error: 'Failed to fetch from Gemini API' });
  }
});

app.listen(5000, () => {
  console.log('Proxy server running on http://localhost:5000');
});
