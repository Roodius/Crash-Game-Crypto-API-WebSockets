
## POSTMAN ENDPOINTS 

1**http://localhost:5000/api/crash-history**

2**http://localhost:5000/api/round/:roundId**

3**http://localhost:5000/api/player-bethistory/:socketId**

## VERCEL Link

**https://vercel.com/osmans-projects-dc6e9795/crash-game-crypto-api-web-sockets**
 
 ### I kindly request you to clone this project locally and run it on your system for testing Vercel not support server deployment
 ## To clone The Repo 
**git clone https://github.com/Roodius/Crash-Game-Crypto-API-WebSockets.git**
---

PORT=5000

DB_link=mongodb://localhost:27017/cryptoCrash


# Crypto Crash Game – Backend

A real-time multiplayer crash gambling game built with **Node.js**, **WebSocket (Socket.IO)**, **Express**, and **MongoDB**. This backend handles all real-time communication, crash-point logic (provably fair), and user bets for the game.

---

## What is a Crash Game?

A crash game is a multiplayer gambling-style game where a **multiplier starts increasing** from `1.00x` and can **crash randomly** at any moment. Players must **cash out before it crashes** to win. If they don't – they lose the bet.

---

##  Features

- Real-time multiplier updates using WebSockets
- Place bet & cash out functionality    // cashedout functionality not working properply
- Provably fair crash-point algorithm using SHA256 hash
- Game rounds stored in MongoDB
- Tracks active & cashed out players
- Crash history API
- REST + WebSocket integration

---

## Tech Stack

- Node.js
- Express.js
- Socket.IO
- MongoDB + Mongoose
- dotenv for config
- uuid for round IDs
- crypto for crash logic

---

