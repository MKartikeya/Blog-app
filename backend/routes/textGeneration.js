
const { GoogleGenerativeAI } = require("@google/generative-ai");
// routes/textGeneration.js
const express = require('express');
const axios = require('axios');
const router = express.Router();
const genAI = new GoogleGenerativeAI("AIzaSyABm9NAdyhUocb2jKavwy4hoK6H0hTC8ds");

router.post('/generate-text', async (req, res) => {
  const { prompt } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    // console.log(text);
    res.status(200).json(response.text());
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error generating text', error: error.message });
  }
});

module.exports = router;
