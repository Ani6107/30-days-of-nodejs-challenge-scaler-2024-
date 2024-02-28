const express = require('express');
const app = express();
const rateLimit = 2;
const requestCounts = {};
/**
 * Rate-limiting middleware for Express
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function rateLimitMiddleware(req, res, next) {
  const clientIP = req.ip; 
  if (!requestCounts[clientIP]) {
    requestCounts[clientIP] = 0;
  }
  requestCounts[clientIP]++;

  if (requestCounts[clientIP] > rateLimit) {
    return res.status(429).send('Too Many Requests' );
  }
  next();
}
app.use(rateLimitMiddleware);
app.get('/', (req, res) => {
  res.send('Hey Everyone');
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
