const uuid = require('uuid')
const CrashPointGenerator = require("../services/crashCalculator")
const {startNewRound,saveBet,endRound } =  require('../controllers/gameController')


let currtMultiplier = 1.0;
let multiplierInterval = null;
let roundId =  uuid.v4();
let seed = uuid.v4();
let crashPoint = CrashPointGenerator(seed ,roundId, 120);
let StartTime = Date.now();
let isCrashed = false;
let gameInProgress = false;
let activeBets = new Map();
let speedFactor = 50;
let multiplierStep = 0.01;

function GameEnd(){
  setTimeout(() => {
    startGameLoop(io);
  }, 10000);
}

 function startGameLoop(io){
    currtMultiplier = 1.0;
    isCrashed = false;
    activeBets.clear();
    multiplierInterval = null;
    gameInProgress = true;
    StartTime = Date.now();
    roundId = uuid.v4()
    crashPoint = CrashPointGenerator(seed, roundId, 120)

    multiplierInterval = setInterval(() => {
      currtMultiplier += multiplierStep;
      io.emit('multiplier' ,currtMultiplier);

      // auto cashedout

       startNewRound({
        roundId,
        crashPoint,
        startedAt: StartTime,
        endedAt: Date.now()
      });

      if(currtMultiplier >= crashPoint){
        clearInterval(multiplierInterval);
        isCrashed = true;
        io.emit('crash',crashPoint);
        GameEnd();
      }

    },50);
    

    


}

function registerSocketEvents(io){
    
    io.on('connection', (socket) => {
      console.log(`use Connected with Id ${socket.id}` );
      socket.emit('connected' ,socket.id)
      
    socket.on('place_bet', (data) => {
        if(isCrashed === true || gameInProgress === false){
          socket.emit('crashedGame', {crashPoint});
          return;
        } 


          // if already placed bet
        if (activeBets.has(socket.id)) {
          socket.emit('bet_failed', { reason: "Already placed a bet in this round." });
          return;
        }

            //Validate amount
        if (typeof data.amount !== 'number' || data.amount <= 0) {
          socket.emit('bet_failed', { reason: "Invalid bet amount." });
          return;
        }

        activeBets.set(socket.id,{
          amount: data.amount,               // from client
          autoCashOut: data.autoCashOut || null,  // optional
          cashedOut: false
        })

        saveBet({
          roundId,
          socketId:socket.id,
          cashedOut:false
        })

        socket.emit("bet_accepted", {
          roundId,
          amount: data.amount
        });
    });

    socket.on('cash_out', () => {
        if(gameInProgress === false || isCrashed === true){
          socket.emit('crashedGame', {crashPoint});
          return
        }

        if(!activeBets.has(socket.id)){
          socket.emit('no active bet by', socket.id)
          return;
        }

        if(activeBets.get(socket.id).cashedOut){
          socket.emit('Already cashedOUt')
          return;
        }

        const bet = activeBets.get(socket.id)

        let payout = bet.amount * currtMultiplier;

        cashOutBet({
            socketId: socket.id,
            roundId,
            multiplier: currtMultiplier,
            payout
          });

        socket.emit('cashedout',{
          "Multiplier":currtMultiplier,
          "payout":payout
        })
        bet.cashedOut = true;
        activeBets.set(socket.id,bet)
        io.emit('player_cashed_out', { id:socket.id, payout })
    })
})


}

module.exports = {
  registerSocketEvents
}