// /models/Bet.js
const mongoose = require('mongoose');

const BetSchema = new mongoose.Schema({
  roundId:{ 
    type: String,
    required: true 
    },
  socketId:{
     type: String,
      required: true
     },  
  amount:{
     type: Number,
     required: true
         },
  cashedOut:{
     type: Boolean,
      default: false 
    },
  autoCashOut:{
     type: Number,
      default: null
     },
  payout:{
     type: Number,
      default: null 
    },
  placedAt:{
     type: Date,
      default: Date.now 
    },
  cashedOutAt:{ 
    type: Date
 }
});

    const Bets = new mongoose.model('Bets', BetSchema);

module.exports = Bets
