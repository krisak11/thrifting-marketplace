import express, { type Request, type Response } from "express";
import Category from "../models/Category.js";
import Product from "../models/Product.js";

const router = express.Router();

/**
 * GET /categories - Fetch all categories
 */
router.get("/categories", async (req: Request, res: Response) => {
  try {
    const categories = await Category.findAll({
      include: [{ model: Category, as: "subcategories" }], // Include subcategories
    });
    res.json(categories);
    return;
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/categories-images", async (req: Request, res: Response) => {
    try {
        const { parentId } = req.query; // Get parentId from query params
        // Build a dynamic filter for parentId
        const whereCondition = parentId !== undefined ? { parentId: parentId === '' ? null : parentId } : {};
        const categories = await Category.findAll({where: whereCondition});
        const categoriesWithImages = await Promise.all(
            categories.map(async (category) => {
            const product = await Product.findOne({ where: { categoryId: category.id } });
            return {
                ...category.toJSON(),
                imageUrl: product ? product.imageUrl : "/uploads/placeholder.png",
            };
            })
        );
        res.json(categoriesWithImages);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

/**
 * GET /categories/:id - Fetch a single category by ID (including subcategories)
 */
router.get("/categories:id", async (req: Request, res: Response) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Category, as: "subcategories" }],
    });

    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    res.json(category);
    return;
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
});

router.get("/categories-by-name/:name", async (req: Request, res: Response) => {
    try {
      const { name } = req.params;
      const formattedName = name.replace(/-/g, " "); // ✅ Convert dashes to spaces
      console.log(`Looking up category by name: ${formattedName}`); 
  
      const category = await Category.findOne({
        where: { name: formattedName },
        include: [{ model: Category, as: "subcategories" }],
      });
  
      if (!category) {
        res.status(404).json({ message: "Category not found" });
        return
      }
  
      res.json(category);
    } catch (error) {
      console.error("Error fetching category by name:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  

export default router;
