// routes/answers.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Answer = require('../models/answer');

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Expecting "Bearer <token>"
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET || 'Mystery', (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = decoded; // Decoded contains { id, username, role }
    next();
  });
};

// POST endpoint to save answers
router.post('/question', authenticateToken, async (req, res) => {
  try {
    const {
      nickname,
      hobby,
      coolestThing,
      birthday,
      favoriteFood,
      secretSocialMedia,
      dreamDay
    } = req.body;

    // Validate required field
    if (!nickname) {
      return res.status(400).json({ message: 'Nickname is required' });
    }

    // Check if user already submitted answers (optional, depending on your needs)
    const existingAnswer = await Answer.findOne({ userId: req.user.id });
    if (existingAnswer) {
      // Update existing answers instead of creating new ones
      await Answer.updateOne(
        { userId: req.user.id },
        {
          nickname,
          hobby,
          coolestThing,
          birthday,
          favoriteFood,
          secretSocialMedia,
          dreamDay
        }
      );
      return res.status(200).json({ message: 'Answers updated successfully' });
    }

    // Create new answer entry
    const answer = new Answer({
      userId: req.user.id,
      nickname,
      hobby,
      coolestThing,
      birthday,
      favoriteFood,
      secretSocialMedia,
      dreamDay
    });

    await answer.save();
    res.status(201).json({ message: 'Answers saved successfully' });
  } catch (error) {
    console.error('Error saving answers:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;