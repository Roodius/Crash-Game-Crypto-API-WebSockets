const GameRounds = require('../models/GameRound');
const Bets = require('../models/Bet');



async function startNewRound({ roundId, crashPoint, startedAt, endedAt }) {
  const newRound = new GameRounds({
    roundId:roundId,
    crashPoint:crashPoint,
    startedAt: startedAt,
    endedAt:endedAt
  });
  await newRound.save();
}



async function saveBet({amount ,socketId,placedAt,roundId  }) {
  const bet = new Bets({
        amount:amount,
        socketId: socketId,
        placedAt:placedAt,
        roundId
  });
  await bet.save();
}



async function endRound({roundId}) {
  await GameRounds.findOneAndUpdate(
    { roundId },
    { endedAt: new Date() }
  );
}



const cashOutBet = async ({ socketId, roundId, multiplier, payout }) => {
  try {
    const updatedBet = await Bets.findOneAndUpdate(
      { roundId, socketId },
      {
        $set: {
          cashedOut: true,
          multiplier,
          payout:payout,
          cashedOutAt: new Date()   
        }
      },
      { new: true }
    );

    if (!updatedBet) {
      console.log(`Bet not found for socket ${socketId} in round ${roundId}`);
    } else {
      console.log(`Bet cashed out for ${socketId}: ${payout} at x${multiplier}`);
    }
  } catch (err) {
    console.error(`Error cashing out bet for ${socketId}:`, err.message);
  }
};

//------------------------functions for Routes-------------------//
async function getCrashHistory(req,res) {
    const history = await GameRounds.find().sort({startedAt: -1}).limit(10);

    if(!history){
        return res.status(500).json({msg:"Error on getting history"});
    }

     return res.status(200).json({history});
}

async function getRoundDetails(req,res) {
    const roundId = req.params.roundId;
    if(!roundId){
        return res.status(404).json({msg:"roundId is required"})   
    }
    const round = await GameRounds.findOne({roundId});

    if (!round) {
    return res.status(404).json({ msg: "Round not found" });
  }

    return res.status(200).json({"Your Round":round}); 
}

async function getPlayerBet(req,res) {
    const socketId = req.params.socketId;
    if(!socketId) {
        return res.status(404).json({mssg:"socketId is required"})
    }
    const playerBet = await Bets.findOne({socketId});
    if (!playerBet || playerBet.length === 0) {
    return res.status(404).json({ msg: "No bets found for this player" });
  }
    return res.status(200).json({"you bet is":playerBet});
}

module.exports  = {
    startNewRound,
    saveBet,
    endRound,
    cashOutBet,
    getRoundDetails,
    getCrashHistory,
    getPlayerBet
}

