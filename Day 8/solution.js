const express = require('express');
const app = express();
const port = 3000;
function errorHandler(err, req, res, next) {
  if (err.name === 'InvalidPositiveIntegerError') {
    res.status(400).json({ error: 'Invalid positive integer provided' });
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
class InvalidPositiveIntegerError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidPositiveIntegerError';
  }
}
function positiveIntegerHandler(req, res, next) {
  const number = parseInt(req.query.number);

  if (Number.isInteger(number) && number > 0) {
    res.json({ message: 'Success! Valid positive integer provided.' });
  } else {
    next(new InvalidPositiveIntegerError('Invalid positive integer provided'));
  }
}
app.get('/', (req, res) => {
  res.send('Welcome to the positive integer validation API!');
});

app.use(express.json());
app.use(errorHandler);
app.get('/positive', positiveIntegerHandler);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
