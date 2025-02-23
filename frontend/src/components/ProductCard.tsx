/*
  File: src/components/ProductCard.tsx
  Description: Component to display individual product details
*/
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProductCard.css';

interface ProductCardProps {
    
    product: { 
        id: number; 
        name: string; 
        description: string, 
        price: number; 
        quantity: number, 
        categoryId: number, 
        tags: string[],
        imageUrl?: string };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const navigate = useNavigate(); // ✅ Initialize navigation

    return (
        /* Navigate to product details */
        <div className="product-card" onClick={() => navigate(`/products/${product.id}`)}> {}
            {product.imageUrl && (
                <img
                    src={import.meta.env.VITE_API_URL + (product.imageUrl || "/uploads/placeholder.png")}
                    alt={product.name}
                    className="product-image"
                />
            )}
            <div className="product-info-wrapper">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">${product.price}</p>
                <button className="add-to-cart">Add to Cart</button>
            </div>
        </div>
    );
};


export default ProductCard;