const jwt = require('jsonwebtoken');

function authenticationMiddleware(req, res, next) {
  const token = req.headers.authorization;
  console.log('Recieved token:', token)

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), 'enter_your_secret_key'); 
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
}

module.exports = authenticationMiddleware;
