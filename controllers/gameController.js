const GameRounds = require('../models/GameRound');
const Bets = require('../models/Bet');



async function startNewRound(roundId, crashPoint) {
  const newRound = new GameRounds({
    roundId,
    crashPoint,
    startedAt: new Date(),
    endedAt:Date.now()
  });
  await newRound.save();
}



async function saveBet(socketId, roundId, amount) {
  const bet = new Bets({
    userId: socketId,
    roundId,
    amount,
    placedAt: new Date()
  });
  await Bets.save();
}



async function endRound(roundId) {
  await GameRounds.findOneAndUpdate(
    { roundId },
    { endedAt: new Date() }
  );
}

 async function cashedoutBet(){
    
 }

module.exports  = {
    startNewRound,
    saveBet,
    endRound
}

