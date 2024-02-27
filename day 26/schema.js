const { MongoClient } = require('mongodb');

async function insertTestData() {
  const url = 'mongodb://0.0.0.0:27017';
  const dbName = 'problem26';
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('products');

    // Insert test data
    await collection.insertMany([
      { "name": "Product1", "price": 10, "quantity": 5 },
      { "name": "Product2", "price": 20, "quantity": 8 },
      { "name": "Product3", "price": 15, "quantity": 3 },
      { "name": "Product4", "price": 25, "quantity": 10 },
      { "name": "Product5", "price": 18, "quantity": 6 }
    ]);

    console.log('Test data inserted successfully');
  } finally {
    await client.close();
  }
}

// Call the function to insert test data
insertTestData();
