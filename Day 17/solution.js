const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true }
});

const User = mongoose.model('User', userSchema);

mongoose.connect('mongodb://127.0.0.1:27017/problem17', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
  addUserToDatabase({ username: 'john_doe', email: 'john@example.com' });
});

function addUserToDatabase(user) {
  const newUser = new User({
    username: user.username,
    email: user.email
  });

  newUser.save()
    .then(() => {
      console.log('User successfully added to the database');
    })
    .catch((error) => {
      console.error('Error adding user to the database:', error.message);
    })
    .finally(() => {
      mongoose.connection.close();
    });
}
