/*
  File: src/components/ProductCard.tsx
  Description: Component to display individual product details
*/
import React from 'react';
import '../styles/ProductCard.css';

interface ProductCardProps {
    product: { id: number; name: string; description: string, price: string; imageUrl?: string };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="product-card">
            {product.imageUrl && (
                <img
                    src={import.meta.env.VITE_API_URL + product.imageUrl}
                    alt={product.name}
                    className="product-image"
                />
            )}
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">${product.price}</p>
            <button className="add-to-cart">Add to Cart</button>
        </div>
    );
};


export default ProductCard;