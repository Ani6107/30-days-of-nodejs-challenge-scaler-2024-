const WebSocket = require('ws');

function setupWebSocketServer(server) {
    
    const wss = new WebSocket.Server({ server });

    const clients = new Set();

    const broadcast = (message) => {
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(message));
            }
        });
    };

    wss.on('connection', (ws) => {
        
        clients.add(ws);

       
        ws.on('message', (message) => {
            // Handle the incoming message as needed
            // You may want to update the collaborative editing document
            // and then broadcast the changes to all connected clients
            // Example: broadcast({ type: 'update', data: updatedDocument });
        });

        // Event listener for WebSocket disconnection
        ws.on('close', () => {
            // Remove the disconnected client from the set
            clients.delete(ws);
        });
    });

    // Optionally, you can set up periodic tasks or other functionality here

    // Return the WebSocket server instance
    return wss;
}

// Example usage:
const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);

// Set up WebSocket server
const wss = setupWebSocketServer(server);

// Other Express route and middleware setup goes here
app.get('/', (req, res) => {
    res.send('Hello, this is your Express server!');
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
