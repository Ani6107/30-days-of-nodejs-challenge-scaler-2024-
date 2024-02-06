/**
 * Handles GET requests to "/greet" endpoint
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
function greetHandler(req, res) {
    // Extract the 'name' parameter from the query string
    const name = req.query.name || 'Guest';
  
    // Send a personalized greeting in the response
    res.send(`Hello, ${name}!`);
  }
  
  module.exports = { greetHandler };
  