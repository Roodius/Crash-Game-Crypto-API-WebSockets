const websocketIo = require('socket.io')
const express = require('express')
const http = require('http')
const app = express();
const server = http.createServer(app);
const { startGameLoop } = require('./webSockets/GameSocket')
// .env
require('dotenv').config();
const port = process.env.PORT;

const io = websocketIo.Server(server);

app.use('/api', gameRoute)

startGameLoop(io)


app.listen(port, () => console.log("server started on port" + port))





