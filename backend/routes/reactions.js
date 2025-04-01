// routes/reactions.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Reaction = require('../models/reaction');

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

// POST endpoint to save reaction
router.post('/submit-reaction', authenticateToken, async (req, res) => {
  try {
    const { reaction } = req.body;

    if (!reaction || !reaction.trim()) {
      return res.status(400).json({ message: 'Reaction is required' });
    }

    const newReaction = new Reaction({
      userId: req.user.id,
      reaction,
    });

    await newReaction.save();
    res.status(201).json({ message: 'Reaction saved successfully' });
  } catch (error) {
    console.error('Error saving reaction:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;