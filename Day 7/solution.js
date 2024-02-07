/**
 * Express middleware to log incoming requests
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function requestLoggerMiddleware(req, res, next) {
    const timestamp = new Date().toISOString();
    console.log(`${timestamp} - ${req.method} request received`);
    next();
  }
  const express = require('express');
  const app = express();
  app.use(requestLoggerMiddleware);
  app.get("/", (req, res) => {
    res.send("Good Evening.");
  });
  // Start the server
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
  