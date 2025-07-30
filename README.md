/crypto-crash-server
 -> server.js     # Main entry point

 -> /routes
       └── gameRoutes.js          # Optional: GET crash history, etc.

─> /controllers
       └── gameController.js      # Optional: handle REST endpoints

─> /models
      ├── Bet.js                 # Save bets per round
      └── GameRound.js           # Save crash point per round

─> /socket-handlers
      ├── index.js               # Register all WebSocket events
      └── gameEvents.js          # place_bet, cash_out, etc.

─> /services
       ├── gameEngine.js          # Core multiplier & round logic
       └── cryptoPriceService.js  # Real-time USD → BTC price fetcher

─> /utils
      └── crashCalculator.js     # Generate random crash multiplier

─> .env
─> package.json

# ----------------------------------------------------------------------- #

[WebSocket Event]
place_bet   -> 	Client → Server	   Client places a USD bet
cash_out    ->    Client → Server	   Client requests cash out at current rate
round_start -> 	Server → All	   A new crash game round begins
multiplier  ->	Server → All	   Continuously updated multiplier
crash       ->	Server → All	   Multiplier stopped (crashed), game over
bet_result  ->	Server → Client	   Send win/loss result for the user


# -------------------------------------------------------------------------#
