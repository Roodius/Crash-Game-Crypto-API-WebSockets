// /models/Bet.js
const mongoose = require('mongoose');

const BetSchema = new mongoose.Schema({
  socketId: String,
  amount: Number,
  placedAt: Date,
  roundId: String,
  cashedOut: { type: Boolean, default: false },
  multiplier: Number,
  payout: Number,
  cashedOutAt: Date
});

    const Bets = new mongoose.model('bets', BetSchema);

module.exports = Bets
