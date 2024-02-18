// Import required modules
const express = require('express');
const mongoose = require('mongoose');

// Define User schema and model
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  // Add other fields as needed
});

const User = mongoose.model('User', userSchema);

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/problem17', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Create Express app
const app = express();
const port = 3000;

// Express route to get all users from MongoDB
app.get('/', getAllUsers);

/**
 * Express route to get all users from MongoDB
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getAllUsers(req, res) {
  try {
    // Use the User model to find all users
    const users = await User.find();

    // Send JSON response with the array of user objects
    res.json(users);
  } catch (error) {
    // Handle errors and send an appropriate response
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Start Express server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
