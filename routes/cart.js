const express = require('express');
const router = express.Router();

// Simple in-memory cart storage (for client-side handling)
// In production, you might want to store cart in MongoDB as well

router.post('/add', (req, res) => {
  try {
    const { productId, productName, quantity, price, unit } = req.body;

    if (!productId || !productName || !quantity || !price) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Return cart item structure for client-side state management
    const cartItem = {
      productId,
      productName,
      quantity: parseInt(quantity),
      price: parseFloat(price),
      unit,
      subtotal: parseInt(quantity) * parseFloat(price)
    };

    res.json({ success: true, item: cartItem });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/remove', (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ error: 'Product ID required' });
    }
    res.json({ success: true, message: 'Item removed from cart' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/update', (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    res.json({ success: true, message: 'Cart updated' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/clear', (req, res) => {
  try {
    res.json({ success: true, message: 'Cart cleared' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

