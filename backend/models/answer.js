// models/answer.js
const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  nickname: { type: String, required: true },
  hobby: { type: String },
  coolestThing: { type: String },
  birthday: { type: String },
  favoriteFood: { type: String },
  secretSocialMedia: { type: String },
  dreamDay: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Answer', answerSchema);