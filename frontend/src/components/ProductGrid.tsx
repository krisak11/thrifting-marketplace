import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { fetchProducts } from "../api/productApi"; // ✅ Import API gateway
import "../styles/ProductGrid.css";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  categoryId: number;
  tags: string[],
  imageUrl: string;
}

interface ProductGridProps {
  categoryId?: number; // optional
  tags?: string[];  // optional
}

const ProductGrid: React.FC<ProductGridProps> = ({ categoryId, tags }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        console.log(`Fetching products for category: ${categoryId || "N/A"}, tags: ${tags || "N/A"}`);
        const data = await fetchProducts(categoryId, tags); // ✅ Pass both categoryId and tags
        setProducts(data);
      } catch (error: unknown) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
  
    loadProducts();
  }, [categoryId, tags]); // ✅ Re-fetch when categoryId or tags change
  

  if (loading) return <p className="loading-message">Loading products...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (products.length === 0) return <p className="no-products-message">No products found in this category.</p>;

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
