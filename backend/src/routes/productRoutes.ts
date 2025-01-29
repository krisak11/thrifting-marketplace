import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import Product from '../models/Product';
import upload from '../middleware/upload';

const router = express.Router();

// 🖼️ **UPLOAD PRODUCT IMAGE**
router.post('/upload', upload.single('image'), (req: Request, res: Response): void => {
  if (!req.file) {
    res.status(400).json({ message: 'No file uploaded' });
    return;
  }

  // Construct image URL (relative path)
  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

// 📦 **FETCH PRODUCTS (WITH CATEGORY FILTERING)**
router.get('/products', async (req: Request, res: Response) => {
  try {
    const { category } = req.query;

    // If a category is provided, filter by it, otherwise return all products
    const products = category
      ? await Product.findAll({ where: { category } })
      : await Product.findAll();

    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// 🛒 **CREATE NEW PRODUCT (WITH IMAGE SUPPORT)**
router.post(
  '/products',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
    body('quantity').isInt({ gt: 0 }).withMessage('Quantity must be a positive integer'),
    body('name').notEmpty().withMessage('Category is required'),
  ], 
  upload.single('image'), // Handle image upload

  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ message: 'Validation error', errors: errors.array() });
      return;
    }

    try {
      // Extract product fields from request body
      const { name, description, price, quantity, category } = req.body;

      // Get uploaded image URL if available
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

      // Create and save the product in DB
      const newProduct = await Product.create({
        name,
        description,
        price,
        quantity,
        category,
        imageUrl,
      });

      res.status(201).json(newProduct);
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
);

export default router;
