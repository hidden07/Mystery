// routes/thoughts.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Thought = require('../models/thought');

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

// POST endpoint to save thoughts
router.post('/submit-thoughts', authenticateToken, async (req, res) => {
  try {
    const { thoughts } = req.body;

    if (!thoughts || !thoughts.trim()) {
      return res.status(400).json({ message: 'Thoughts are required' });
    }

    const newThought = new Thought({
      userId: req.user.id,
      thoughts,
    });

    await newThought.save();
    res.status(201).json({ message: 'Thoughts saved successfully' });
  } catch (error) {
    console.error('Error saving thoughts:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;