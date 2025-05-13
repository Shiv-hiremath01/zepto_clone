// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//   _id: String,
//   name: String,
//   category: [String],
//   subcategory: [String], // Added subcategory field
//   mrp: Number,
//   sellingPrice: Number,
//   imageUrl: String,
//   discountPercentage: Number,
//   stock: {
//     type: Number,
//     default: 0,
//     min: 0,
//   },
// });
// productSchema.index(
//   { name: 'text', category: 'text', subcategory: 'text' }, // Include subcategory in text index
//   { weights: { name: 10, category: 5, subcategory: 3 } }
// );

// module.exports = mongoose.model('Product', productSchema);


const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: [String],
    required: true,
    validate: {
      validator: function (arr) {
        return arr.length > 0;
      },
      message: 'At least one category is required',
    },
  },
  subcategory: {
    type: [String],
    required: true,
    validate: {
      validator: function (arr) {
        return arr.length > 0;
      },
      message: 'At least one subcategory is required',
    },
  },
  description: {
    type: String,
    trim: true,
    default: '',
  },
  mrp: {
    type: Number,
    required: true,
    min: 0,
  },
  sellingPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  imageUrl: {
    type: String,
    required: true,
    trim: true,
  },
  discountPercentage: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  stock: {
    type: Number,
    default: 0,
    min: 0,
  },
  vendorId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { collection: 'products' }); // Explicitly set the collection name

module.exports = mongoose.model('Product', productSchema);