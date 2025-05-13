// const express = require('express');
// const router = express.Router();
// const jwt = require('jsonwebtoken');
// const Order = require('../models/Order');

// // Middleware to verify admin role
// const verifyAdmin = (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) return res.status(401).json({ success: false, message: 'No token provided' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (decoded.role !== 'admin') {
//       return res.status(403).json({ success: false, message: 'Access denied. Admins only.' });
//     }
//     req.user = decoded;
//     next();
//   } catch (err) {
//     console.error('Token verification failed:', err);
//     res.status(401).json({ success: false, message: 'Invalid token' });
//   }
// };

// // Fetch all orders (for admin)
// router.get('/', verifyAdmin, async (req, res) => {
//   try {
//     const orders = await Order.find().sort({ createdAt: -1 }).lean();
//     res.json({ success: true, orders });
//   } catch (error) {
//     console.error('Error fetching all orders:', error);
//     res.status(500).json({ success: false, message: 'Failed to fetch orders', error: error.message });
//   }
// });

// // Fetch all orders for the logged-in user
// router.get('/user', async (req, res) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) return res.status(401).json({ message: 'No token provided' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const userId = decoded.id;

//     const orders = await Order.find({ userId }).sort({ createdAt: -1 });
//     res.json({ success: true, orders });
//   } catch (err) {
//     console.error('Error fetching orders:', err);
//     res.status(401).json({ message: 'Invalid token' });
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Order = require('../models/Order');
const Product = require('../models/Products');

// Middleware to verify admin role
const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied. Admins only.' });
    }
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Token verification failed:', err);
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

// Middleware to verify vendor or user token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Token verification failed:', err);
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

// Fetch all orders (for admin)
router.get('/', verifyAdmin, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).lean();
    res.json({ success: true, orders });
  } catch (error) {
    console.error('Error fetching all orders:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch orders', error: error.message });
  }
});

// Fetch all orders for the logged-in user
router.get('/user', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 }).lean();
    res.json({ success: true, orders });
  } catch (err) {
    console.error('Error fetching user orders:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch orders', error: err.message });
  }
});

// Fetch orders containing the vendor's products
router.get('/vendor', verifyToken, async (req, res) => {
  try {
    const vendorId = req.user.id;
    // Find products belonging to the vendor
    const vendorProductIds = await Product.find({ vendorId }).distinct('_id');
    
    // Find orders where items.productId._id matches vendor's products
    const orders = await Order.find({
      'items.productId._id': { $in: vendorProductIds },
    })
      .sort({ createdAt: -1 })
      .lean();

    res.json({ success: true, orders });
  } catch (err) {
    console.error('Error fetching vendor orders:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch vendor orders', error: err.message });
  }
});

module.exports = router;