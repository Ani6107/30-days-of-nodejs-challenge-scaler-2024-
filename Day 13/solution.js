const express = require('express');
const expressWs = require('express-ws');

const app = express();
const port = 3000;

// Extend express app with WebSocket support
expressWs(app);

// Store connected clients
const clients = new Set();

// WebSocket endpoint
app.ws('/websocket', (ws, req) => {
  // Add the new client to the set
  clients.add(ws);

  // Connection established
  console.log('WebSocket connection established');

  // Handle messages from clients
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);

    // Broadcast the message to all connected clients
    clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(`Client says: ${message}`);
      }
    });
  });

  // Handle client disconnection
  ws.on('close', () => {
    // Remove the disconnected client from the set
    clients.delete(ws);
    console.log('WebSocket connection closed');
  });
});

// Serve HTML with JavaScript to establish WebSocket connection
app.get('/websocket', (req, res) => {
  res.sendFile(__dirname + '/websocket.html');
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
