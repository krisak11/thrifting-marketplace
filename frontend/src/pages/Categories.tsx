import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CategoryGrid from "../components/CategoryGrid";
import { fetchCategoryByName } from "../api/categoryApi";
import "../styles/Categories.css";

interface Category {
  id: number;
  name: string;
  imageUrl: string;
  parentId: number | null;
  subcategories: Category[];
}

const Categories: React.FC = () => {
  const { name } = useParams<{ name: string }>(); // ✅ Get category name from URL
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategory = async () => {
      try {
        const data = await fetchCategoryByName(name!);
        setCategory(data);
      } catch (error: unknown) {
        console.error("Error fetching category:", error);
        setError("Category not found.");
      } finally {
        setLoading(false);
      }
    };

    if (name) {
      loadCategory();
    }
  }, [name]);

  if (loading) return <p className="loading-message">Loading category...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!category) return <p className="error-message">Category not found.</p>;

  return (
    <div className="categories-container">
      <Navbar />
      <h2 className="section-title">{category.name}</h2>

      {/* ✅ Show subcategories if available */}
      {category.subcategories.length > 0 ? (
        <>
          <h3 className="section-title">Subcategories</h3>
          <CategoryGrid parentId={category.id} />
        </>
      ) : (
        <p>No subcategories found.</p>
      )}

      <Footer />
    </div>
  );
};

export default Categories;
