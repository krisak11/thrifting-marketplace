import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CategoryGrid from "../components/CategoryGrid";
import "../styles/Categories.css";

const Categories: React.FC = () => {
  return (
    <div className="categories-container">
      <Navbar />
      <h2 className="section-title">All Categories</h2>
      <CategoryGrid />
      <Footer />
    </div>
  );
};

export default Categories;
