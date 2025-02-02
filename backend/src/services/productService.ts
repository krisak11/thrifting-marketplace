import { Op } from "sequelize";
import Product from "../models/Product.js";
import Category from "../models/Category.js";

/**
 * Get all products within a category (including subcategories)
 */
export const getProductsByCategory = async (categoryName: string) => {
  // Find the requested category
  const category = await Category.findOne({ where: { name: categoryName } });

  if (!category) {
    return [];
  }

  // Find all subcategories under the requested category
  const subcategories = await Category.findAll({ where: { parentId: category.id } });
  const categoryIds = [category.id, ...subcategories.map(cat => cat.id)];

  // Fetch products that belong to the main category OR any subcategory
  const products = await Product.findAll({
    where: {
      categoryId: { [Op.in]: categoryIds },
    },
    include: [{ model: Category, as: "category" }],
  });

  return products;
};

/**
 * Get products by tags (e.g., "On-Sale", "Vintage")
 */
export const getProductsByTag = async (tag: string) => {
  const products = await Product.findAll({
    where: {
      tags: { [Op.contains]: [tag] }, // Check if the tag exists in the array
    },
  });

  return products;
};
