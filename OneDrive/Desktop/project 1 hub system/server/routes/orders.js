const express = require('express');
const Order = require('../models/Order');
const { auth } = require('../middleware/auth');
const router = express.Router();

// POST /api/orders - Create a new order
router.post('/', auth, async (req, res) => {
  try {
    const { products, totalAmount } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: 'No items in order' });
    }

    const order = new Order({
      userId: req.user._id,
      products,
      totalAmount
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/orders - Get orders for the logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .populate('products.productId', 'title imageURL')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Fetch orders error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/orders/:id - Get a specific order
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('products.productId', 'title description price imageURL');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if the order belongs to the user
    if (order.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(order);
  } catch (error) {
    console.error('Fetch single order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
