const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Define your User model here...
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  // Add other fields as needed
});

const User = mongoose.model('User', userSchema);

// Define your averageAgeOfUsers function here...
async function averageAgeOfUsers(req, res) {
  try {
    // Using MongoDB aggregation to calculate the average age
    const result = await User.aggregate([
      {
        $group: {
          _id: null,
          averageAge: { $avg: '$age' } // Assuming your user model has an 'age' field
        }
      }
    ]);

    if (result.length === 0) {
      return res.status(404).json({ error: 'No users found' });
    }

    const averageAge = result[0].averageAge;

    // Return the calculated average age in the response
    res.json({ averageAge });
  } catch (error) {
    console.error('Error calculating average age:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Connect to MongoDB
mongoose.connect('mongodb://0.0.0.0:27017/problem18', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define your route after the database connection
app.get('/average-age', averageAgeOfUsers);

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
