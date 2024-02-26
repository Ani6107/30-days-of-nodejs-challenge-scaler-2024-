const mongoose = require('mongoose');
const Product = require('./models/Product'); // Replace with the actual path to your Product model

mongoose.connect('mongodb://0.0.0.0:27017/problem25', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to MongoDB');

  createProductNameIndex();
});

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

function createProductNameIndex() {

  const ProductModel = mongoose.model('Product');

  const indexName = 'name';

  ProductModel.collection.createIndex({ name: 1 }, { name: indexName }, (err) => {
    if (err) {
      console.error('Error creating index:', err);
    } else {
      console.log('Index on "name" field created successfully.');

      // Close the MongoDB connection after creating the index
      mongoose.connection.close();
    }
  });
}
