const express = require('express');
const errorHandler = require('./solution');

const app = express();


app.use(express.json());


app.use((req, res, next) => {
    
    const err = new Error('Sample Error');
    err.statusCode = 500;
    next(err);
});


app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Route handling a sample API endpoint
app.get('/api/data', (req, res) => {
    res.json({ message: 'API data response' });
});

// Add the error handling middleware as the last middleware
app.use(errorHandler);

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
