import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryCard from "./CategoryCard";
import { fetchCategoryById } from "../api/categoryApi";
import "../styles/CategoryGrid.css";

interface Category {
  id: number;
  name: string;
  imageUrl: string;
  parentId: number | null;
}

interface CategoryGridProps {
  parentId?: number | null; // Default to null for top-level categories
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ parentId = null }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategoryById(parentId); // Fetch only relevant categories
        setCategories(data);
      } catch (error: unknown) {
        console.error("Error fetching categories:", error);
        setError("Failed to load categories.");
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, [parentId]);

  if (loading) return <p className="loading-message">Loading categories...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (categories.length === 0) return <p className="no-categories-message">No categories found.</p>;

  return (
    <div className="category-grid">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          onClick={() => navigate(`/categories/${category.name}`)} // Keep dashes in the URL
          />
      ))}
    </div>
  );
};

export default CategoryGrid;
