/*
  File: src/pages/Home.tsx
  Description: Home page layout with all sections
*/
import React from "react";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import Footer from "../components/Footer";
import ProductGrid from "../components/ProductGrid";
import CategoryGrid from "../components/CategoryGrid";
import "../styles/Home.css";

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="main-wrapper">
        <Slider />

        <h2 className="section-title">Categories</h2>
        <CategoryGrid parentId={null}/> {/* Only displays top-level categories */}
        
        <h2 className="section-title">On Sale</h2>
        <ProductGrid tags={["On-Sale"]} />

        <button className="see-more">See More</button>
      </div>
      <Footer />
    </div>
  );
};

export default Home;