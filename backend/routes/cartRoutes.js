const express = require('express');
const router = express.Router();
const cartController = require('../controller/cartController');
const cartMiddleware = require('../middleware/cartMiddleware');

// Apply authMiddleware to all cart routes
router.use(cartMiddleware);

// Cart routes
router.get('/', cartController.getCart);
router.post('/add', cartController.addToCart);
router.post('/remove', cartController.removeFromCart);
router.post('/clear', cartController.clearCart);
router.post('/clear', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    await Cart.deleteMany({ userId });
    res.json({ success: true, items: [] });
  } catch (err) {
    console.error('Error clearing cart:', err);
    res.status(401).json({ message: 'Invalid token' });
  }
});

module.exports = router;