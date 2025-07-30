const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);     // create HTTP server
const io = new Server(server);             // create Socket.IO server


// WebSocket connection handler   
io.on('connection', (socket) => {
  console.log('✅ New client connected:', socket.id);

  // Example: listen to custom event from client
  socket.on('chat message', (msg) => {
    console.log('Received:', msg);

    // Broadcast to all clients
    io.emit('chat message', msg);
  });

  // When client disconnects
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Start server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
