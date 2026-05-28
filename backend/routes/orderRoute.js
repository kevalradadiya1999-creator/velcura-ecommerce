const express = require('express');
const router = express.Router();
const db = require('../db');

// Save new order
router.post('/', async (req, res) => {
  try {
    const { items, total, paymentId, shippingDetails, user } = req.body;

    if (!items || !total || !paymentId) {
      return res.status(400).json({ message: 'Missing required order fields' });
    }

    const newOrder = await db.saveOrder({
      items,
      total,
      paymentId,
      shippingDetails: shippingDetails || {},
      user: user || {}
    });

    console.log('--- NEW ORDER RECEIVED ---');
    console.log(JSON.stringify(newOrder, null, 2));

    res.status(201).json({ message: 'Order saved successfully', orderId: newOrder._id || newOrder.id });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ message: 'Failed to process order' });
  }
});

// Get all orders (for testing)
router.get('/', async (req, res) => {
  try {
    const orders = await db.getAllOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
