const express = require('express');
const authenticationMiddleware = require('./authenticationMiddleware');

const app = express();
const port = 3000;

app.use(authenticationMiddleware);

app.get('/protected', (req, res) => {
  const user = req.user;
  res.json({ message: 'This is a protected route', user });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
