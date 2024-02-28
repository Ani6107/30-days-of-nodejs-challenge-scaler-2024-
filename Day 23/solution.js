const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
});

const Category = mongoose.model('Category', categorySchema);

const ProductWithCategory = mongoose.model('ProductWithCategory', productSchema);


/**
 * Retrieves all products with populated category details from MongoDB
 * @returns {Array} - Array of product objects with populated category details
 */
async function getProductsPopulatedWithCategory() {
  try {
    const productsWithCategory = await ProductWithCategory.find().populate('category').exec();
    return productsWithCategory;
  } catch (error) {
    console.error('Error retrieving products with category details:', error.message);
    return [];
  }
}

// Example usage:
(async () => {
  // Connect to MongoDB
  await mongoose.connect('mongodb://0.0.0.0:27017/problem23', { useNewUrlParser: true, useUnifiedTopology: true });

  // Create categories (if needed)
  const category1 = await Category.create({ name: 'Electronics', description: 'Electronic products' });

  // Create products with associated categories
  await ProductWithCategory.create({ name: 'Product 1', price: 20.99, quantity: 50, category: category1._id });

  // Retrieve products with populated category details
  const productsWithCategory = await getProductsPopulatedWithCategory();
  console.log('Products with Category Details:', productsWithCategory);

  // Disconnect from MongoDB
  await mongoose.disconnect();
})();
