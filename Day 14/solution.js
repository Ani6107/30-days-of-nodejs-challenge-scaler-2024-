const cache = {}; // Store cached responses
const cacheExpirationTime = 5 * 1000; // Cache expiration time in milliseconds (10 seconds)

/**
 * Caching middleware for Express
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function cachingMiddleware(req, res, next) {
  const cacheKey = req.url;

  // Check if the response is cached
  if (cache[cacheKey] && cache[cacheKey].timestamp + cacheExpirationTime > Date.now()) {
    // Return cached response
    const isExpired = cache[cacheKey].timestamp + cacheExpirationTime < Date.now();
    console.log(`Returning cached response for ${cacheKey}${isExpired ? ' (cache is expired)' : ''}`);
    return res.json(cache[cacheKey].data);
  }

  // Cache the response for future use
  const originalSend = res.send;
  res.send = function (data) {
    cache[cacheKey] = {
      data,
      timestamp: Date.now(),
    };
    originalSend.call(this, data);
  };

  // Continue with the next middleware/route handler
  next();
}

// Example usage:
const express = require('express');
const app = express();

app.use(cachingMiddleware);

app.get('/api/data', (req, res) => {
  // Your route handler logic here
  res.json({ message: 'Hello, World!' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
