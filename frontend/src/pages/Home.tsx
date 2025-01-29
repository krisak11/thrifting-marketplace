/*
  File: src/pages/Home.tsx
  Description: Home page layout with all sections
*/
import React from "react";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import Footer from "../components/Footer";
import ProductGrid from "../components/ProductGrid";
import "../styles/Home.css";

const Home: React.FC = () => {
  return (
    <div className="home-container">

      <Navbar />
      <Slider />
      <h2 className="section-title">Categories</h2>
      {/* Category Grid Component Goes Here */}
      
      <h2 className="section-title">Popular Products</h2>
      <ProductGrid category="popular" />

      <button className="see-more">See More</button>
      <Footer />
    </div>
  );
};

export default Home;