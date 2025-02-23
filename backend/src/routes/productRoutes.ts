import express, { type Request, type Response } from 'express';
import { body, validationResult } from 'express-validator';
import { getProductsByCategoryName, getProductsByCategoryId, getProductsByTag } from "../services/productService.js";

import Product from '../models/Product.js';
import Category from '../models/Category.js';
import upload from '../middleware/upload.js';

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


/**
 *  GET Products with Category & Tag Filtering
 */
router.get('/products', async (req: Request, res: Response) => {
  try {
    const { category, tag } = req.query;

    let products = [];

    if (category && !isNaN(Number(category))) { 
      // ✅ If category is a number, fetch by ID
      products = await getProductsByCategoryId(Number(category));
    } else if (category) {
      // ✅ Fetch products by category name
      products = await getProductsByCategoryName(category as string);
    } else if (tag) {
      // ✅ Fetch products by tag
      products = await getProductsByTag(tag as string);
    } else {
      // ✅ Return all products if no filters provided
      products = await Product.findAll();
    }

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get('/products/:id', async (req: Request, res: Response) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category, as: "category" }], //  Include category info
    });

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


/**
 *  POST /products - Create New Product (With Image Upload)
 */
router.post(
  '/products',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
    body('quantity').isInt({ gt: 0 }).withMessage('Quantity must be a positive integer'),
    body('categoryId').isInt().withMessage('CategoryId must be a valid integer'),
    body('tags').optional().isArray().withMessage('Tags must be an array of strings'),
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
      const { name, description, price, quantity, categoryId, tags } = req.body;

      // Ensure category exists
      const category = await Category.findByPk(categoryId);
      if (!category) {
        res.status(400).json({ message: 'Invalid categoryId: Category does not exist' });
        return;
      }

      // Get uploaded image URL if available
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

      // Create and save the product in DB
      const newProduct = await Product.create({
        name,
        description,
        price,
        quantity,
        categoryId,
        tags, // Can be empty array or null
        imageUrl,
      });

      res.status(201).json(newProduct);
      return;

    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
);

export default router;
