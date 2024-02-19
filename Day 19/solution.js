const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // Simple email validation using a regular expression
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },
      message: 'Invalid email address',
    },
  },
});

const UserModel = mongoose.model('User', userSchema);

/**
 * Adds a new user to the MongoDB database with validation
 * @param {Object} user - User object with properties username and email
 */
async function addUserWithValidation(user) {
  try {
    const newUser = new UserModel(user);
    await newUser.save();
    console.log('User added successfully!');
  } catch (err) {
    // Handle validation errors
    if (err.errors && err.errors.email) {
      console.error('Validation Error:', err.errors.email.message);
    } else {
      console.error('Error:', err.message);
    }
  }
}
addUserWithValidation({ username: 'john_doe', email: 'invalid-email' });
