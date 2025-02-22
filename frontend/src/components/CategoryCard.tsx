import React from 'react';
import '../styles/CategoryCard.css';

interface CategoryCardProps {
  category: {
    id: number;
    name: string;
    imageUrl: string;
  };
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
  const imageUrl = category.imageUrl
    ? import.meta.env.VITE_API_URL + category.imageUrl
    : '/uploads/placeholder.png'; // Fallback to default image
console.log(imageUrl)
  return (
    <div className="category-card" onClick={onClick}>
      <img src={imageUrl} alt={category.name} className="category-image" />

      <h3 className="category-name">{category.name}</h3>
    </div>
  );
};

export default CategoryCard;
