// routes/logs.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Log = require('../models/log');

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

// POST endpoint to log button clicks
router.post('/log-click', authenticateToken, async (req, res) => {
  try {
    const { buttonName } = req.body;
    if (!buttonName) {
      return res.status(400).json({ message: 'Button name is required' });
    }

    const log = new Log({
      userId: req.user.id, // From JWT token
      buttonName,
    });
    await log.save();

    res.status(200).json({ message: 'Click logged successfully' });
  } catch (error) {
    console.error('Log error:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;