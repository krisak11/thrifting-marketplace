//frontend/src/components/CategoryGrid.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryCard from "./CategoryCard.js";
import { fetchCategories } from "../api/categoryApi.js"; // API function to fetch categories
import "../styles/CategoryGrid.css";

interface Category {
  id: number;
  name: string;
  imageUrl: string;
}

const CategoryGrid: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error: unknown) {
        console.error("Error fetching categories:", error);
        setError("Failed to load categories.");
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading) return <p className="loading-message">Loading categories...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="category-grid">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          onClick={() => navigate(`/categories/${category.id}`)} // Navigate to category page
        />
      ))}
    </div>
  );
};

export default CategoryGrid;
