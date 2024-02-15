const express = require('express');
const app = express();

// Middleware for logging
function loggingMiddleware(req, res, next) {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  const headers = req.headers;
  const body = req.body;

  console.log(`[${timestamp}] ${method} ${url}`);
  console.log('Headers:', headers);
  console.log('Body:', body);

  next();
}

// Use the logging middleware for all routes
app.use(loggingMiddleware);

// Route for handling GET requests
app.get('/api/data', (req, res) => {
  res.json({ message: 'GET request handled successfully' });
});

// Route for handling POST requests
app.post('/api/data', (req, res) => {
  // Assume JSON payload in the request body
  const dataFromBody = req.body;

  // Process the data and send a response
  res.json({ message: 'POST request handled successfully', data: dataFromBody });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
