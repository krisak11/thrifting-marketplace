import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../api/productApi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/ProductDetail.css";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: { name: string };
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(Number(id));
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Product not found.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProduct();
    }
  }, [id]);

  if (loading) return <p className="loading-message">Loading product...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="product-detail-container">
      <Navbar />
      <div className="wrapper">
        <div className="product-detail">
            {product && product.imageUrl && (
                <img
                    src={import.meta.env.VITE_API_URL + (product.imageUrl || "/uploads/placeholder.png")}
                    alt={product.name}
                    className="product-image"
                />
            )}
            <div className="product-info">
            <h2>{product?.name}</h2>
            <p>{product?.description}</p>
            <p className="price">Price: ${product?.price}</p>
            <button className="add-to-cart">Add to Cart</button>
            </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
