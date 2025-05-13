// // routes/productRoutes.js
// const express = require('express');
// const router = express.Router();
// const mongoose = require('mongoose');
// const Product = require('../models/Products');
// const verifyVendor = require('../middleware/verifyVendor');
// const { getProducts, getProductById } = require('../controller/productController');

// // Existing routes
// router.get('/', getProducts);
// router.get('/:id', getProductById);

// // Add a new product
// router.post('/add', verifyVendor, async (req, res) => {
//   try {
//     // Ensure req.user and req.user._id are available
//     if (!req.user || !req.user._id) {
//       return res.status(401).json({ message: 'Unauthorized: Vendor ID not found' });
//     }

//     const { name, category, subcategory, mrp, sellingPrice, discountPercentage, imageUrl, stock } = req.body;

//     // Validate required fields
//     if (!name || !category || !subcategory || !mrp || !sellingPrice || !imageUrl) {
//       return res.status(400).json({ message: 'All required fields must be provided' });
//     }

//     // Validate numeric fields
//     if (mrp < 0 || sellingPrice < 0) {
//       return res.status(400).json({ message: 'MRP and Selling Price must be non-negative' });
//     }
//     if (discountPercentage && (discountPercentage < 0 || discountPercentage > 100)) {
//       return res.status(400).json({ message: 'Discount Percentage must be between 0 and 100' });
//     }
//     if (stock && stock < 0) {
//       return res.status(400).json({ message: 'Stock must be non-negative' });
//     }

//     // Create the new product
//     const product = new Product({
//       _id: new mongoose.Types.ObjectId().toString(),
//       name,
//       category,
//       subcategory,
//       mrp,
//       sellingPrice,
//       discountPercentage: discountPercentage || 0,
//       imageUrl,
//       stock: stock || 0,
//       vendor: req.user._id, // Should now be defined
//     });

//     await product.save();

//     res.status(201).json({ message: 'Product added successfully', product });
//   } catch (err) {
//     console.error('Error adding product:', err);
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// // Get subcategories for a category
// router.get('/subcategories', verifyVendor, async (req, res) => {
//   try {
//     const { category } = req.query;

//     if (!category) {
//       return res.status(400).json({ message: 'Category is required' });
//     }

//     const subcategories = await Product.distinct('subcategory', { category });
//     const uniqueSubcategories = [...new Set(subcategories.filter((sub) => sub))];

//     res.json({ subcategories: uniqueSubcategories });
//   } catch (err) {
//     console.error('Error fetching subcategories:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Get all products for the vendor
// router.get('/vendor', verifyVendor, async (req, res) => {
//   try {
//     if (!req.user || !req.user._id) {
//       return res.status(401).json({ message: 'Unauthorized: Vendor ID not found' });
//     }
//     const products = await Product.find({ vendor: req.user._id });
//     res.json({ products });
//   } catch (err) {
//     console.error('Error fetching vendor products:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Delete a product
// router.delete('/:id', verifyVendor, async (req, res) => {
//   try {
//     if (!req.user || !req.user._id) {
//       return res.status(401).json({ message: 'Unauthorized: Vendor ID not found' });
//     }
//     const product = await Product.findOne({ _id: req.params.id, vendor: req.user._id });
//     if (!product) {
//       return res.status(404).json({ message: 'Product not found or not authorized' });
//     }
//     await Product.deleteOne({ _id: req.params.id });
//     res.json({ message: 'Product deleted successfully' });
//   } catch (err) {
//     console.error('Error deleting product:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;




const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');

// Routes for products
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.addProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;