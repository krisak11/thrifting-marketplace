import express from 'express';

const router = express.Router();

router.get('/products', (req, res) => {
  res.json([{ id: 1, name: 'Vintage Jacket', price: 50 }]);
});

export default router;
