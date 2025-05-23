const express = require("express");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require("cors");
require("dotenv").config();
require("./db/conn"); 

const app = express();
const authRoutes = require('./routes/auth');
const logRoutes = require('./routes/logs');
const answerRoutes = require('./routes/answers'); 
const reactionRoutes = require('./routes/reactions');
const thoughtRoutes = require('./routes/thoughts');
const User = require('./models/user');

const seedUser = async () => {
  try {
    const existingUser = await User.findOne({ email: 'charmi22@gmail.com' });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash('Charmi@07', 10);
      const user = new User({
        email: 'charmi22@gmail.com',
        password: hashedPassword,
        username: 'Mystery07',
        role: 'user', 
        isVerified: true
      });
      await user.save();
      console.log('Single user created successfully');
    } else {
      console.log('User already exists');
    }
  } catch (error) {
    console.error('Error seeding user:', error);
  }
};

const startServer = async () => {
  try {
    await mongoose.connection; 
    await seedUser(); 
    app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173" }));
    app.use(express.json());
    app.use('/api/v1', authRoutes);
    app.use('/api/v1', logRoutes);
    app.use('/api/v1', answerRoutes);
    app.use('/api/v1', reactionRoutes);
    app.use('/api/v1', thoughtRoutes);

    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server started at port ${port}`);
    });
  } catch (error) {
    console.error('Server startup error:', error);
  }
};

startServer();