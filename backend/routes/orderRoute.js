const express = require('express');
const router = express.Router();

// In-memory array to store orders
const orders = [];

// Save new order
router.post('/', (req, res) => {
  try {
    const { items, total, paymentId, shippingDetails } = req.body;

    if (!items || !total || !paymentId) {
      return res.status(400).json({ message: 'Missing required order fields' });
    }

    const newOrder = {
      id: `ord_${Date.now()}`,
      items,
      total,
      paymentId,
      shippingDetails,
      status: 'Processing',
      createdAt: new Date()
    };

    orders.push(newOrder);

    console.log('--- NEW ORDER RECEIVED ---');
    console.log(JSON.stringify(newOrder, null, 2));

    res.status(201).json({ message: 'Order saved successfully', orderId: newOrder.id });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ message: 'Failed to process order' });
  }
});

// Get all orders (for testing)
router.get('/', (req, res) => {
  res.json(orders);
});

module.exports = router;
