/*
  File: src/pages/Shopping.tsx
  Description: Shopping page with filter, sort, and product listing
*/
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Shopping.css";

const Shopping: React.FC = () => {
  return (
    <div>
      <Navbar />
      <h1 className="shopping-title">Shop Our Collection</h1>
      {/* Filter & Sorting Component Goes Here */}
      <h2 className="section-title">Available Products</h2>
      {/* Product Grid Component Goes Here */}
      <Footer />
    </div>
  );
};

export default Shopping;
