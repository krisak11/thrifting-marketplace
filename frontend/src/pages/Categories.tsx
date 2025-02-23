import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CategoryGrid from "../components/CategoryGrid";
import ProductGrid from "../components/ProductGrid";
import { fetchCategoryByName } from "../api/categoryApi";
import { fetchProducts } from "../api/productApi";
import "../styles/Categories.css";

interface Category {
  id: number;
  name: string;
  imageUrl: string;
  parentId: number | null;
  subcategories: Category[];
}

const Categories: React.FC = () => {
  const { name } = useParams<{ name?: string }>(); // ✅ Get category name (if available)
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategory = async () => {
      if (!name) {
        // ✅ No category name in URL? Show top-level categories
        setLoading(false);
        return;
      }

      try {
        const data = await fetchCategoryByName(name);
        setCategory(data);

        // ✅ Fetch all products belonging to this category (including subcategories)
        const productData = await fetchProducts(data.id);
        setProducts(productData);
      } catch (error: unknown) {
        console.error("Error fetching category:", error);
        setError("Category not found.");
      } finally {
        setLoading(false);
      }
    };

    loadCategory(); // ✅ Always call loadCategory, even if name is undefined

  }, [name]);

  if (loading) return <p className="loading-message">Loading category...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="categories-container">
      <Navbar />
        <div className="wrapper">

            {/* ✅ If no category name is in the URL, show only top-level categories */}
            {!name ? (
                <>
                <h2 className="section-title">All Categories</h2>
                <CategoryGrid parentId={null} />
                </>
            ) : (
                <>
                <h2 className="section-title">{category?.name}</h2>

                {/* ✅ Display subcategories if available */}
                {category?.subcategories && category.subcategories.length > 0 && (
                    <>
                    <h3 className="section-title">Subcategories</h3>
                    <CategoryGrid parentId={category.id} />
                    </>
                )}

                {/* ✅ Display products for this category */}
                <h3 className="section-title">Products in {category?.name}</h3>
                {products.length > 0 ? (
                    <ProductGrid categoryId={category?.id} />
                ) : (
                    <p className="no-products-message">No products found in this category (id: {category?.id}).</p>
                )}
                </>
            )}
        </div>

      <Footer />
    </div>
  );
};

export default Categories;
