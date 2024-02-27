const { MongoClient } = require('mongodb');

/**
 * Executes an aggregation pipeline to calculate product statistics
 * @returns {Object} - Aggregated product statistics
 */
async function getProductStatistics() {
 
  const url = 'mongodb://0.0.0.0:27017';


  const dbName = 'problem26';


  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();

  const pipeline = [
    {
      $group: {
        _id: null,
        totalProducts: { $sum: 1 },
        averagePrice: { $avg: '$price' }, // Assuming 'price' is the field for product price
        highestQuantity: { $max: '$quantity' } // Assuming 'quantity' is the field for product quantity
      }
    }
  ];

  // Execute the aggregation pipeline
  const result = await client.db(dbName).collection('products').aggregate(pipeline).toArray();

  // Close the connection
  await client.close();

  // Return the aggregated product statistics
  return result[0];
}

// Example usage
getProductStatistics()
  .then(statistics => {
    console.log('Product Statistics:', statistics);
  })
  .catch(error => {
    console.error('Error:', error);
  });
