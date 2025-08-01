const {Server} = require('socket.io')
const express = require('express')
const http = require('http')
const app = express();
const server = http.createServer(app);
const { startGameLoop, registerSocketEvents } = require('./webSockets/GameSocket')
const gamerouter = require('./routes/gameRoutes')
const path = require('path')
const cors = require('cors');
// .env
require('dotenv').config();
const port = process.env.PORT;

const io = new Server(server, {
  cors: {
    origin: "*", // Same as above
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(cors({
  origin: "*", // Replace with your real frontend URL
  methods: ["GET", "POST"],
  credentials: true,
}));

startGameLoop(io);
registerSocketEvents(io);
app.use('/api',gamerouter)
// app.use(express.static(path.join(__dirname,'public')))

const mongoose = require('mongoose');
require('dotenv').config();
const link = process.env.DB_link;
console.log(link)

mongoose.connect(link).then(() => console.log('connected  To Your Db')).catch((err) => console.error(err));

server.listen(port, () => console.log("server started on port" + port))





