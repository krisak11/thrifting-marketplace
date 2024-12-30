import express from 'express';
import Order from '../models/Order';

const router = express.Router();

// GET all orders
router.get('/', async (req, res) => {
  const orders = await Order.findAll();
  res.json(orders);
});

// POST create a new order
router.post('/', async (req, res) => {
  const { userId, product, price } = req.body;

  try {
    const newOrder = await Order.create({ userId, product, price });
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: 'Error creating order', error: err });
  }
});

export default router;
