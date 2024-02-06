const express = require('express');
const { greetHandler } = require('./handlers');

const app = express();
const port = 3000;

// Define the greetHandler function for the '/greet' endpoint
app.get('/', greetHandler);


// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
