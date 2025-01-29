/*
  File: src/pages/OnSale.tsx
  Description: Page to display on-sale items
*/
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductGrid from '../components/ProductGrid';
import '../styles/OnSale.css';

const OnSale: React.FC = () => {
    return (
        <div className="onsale-container">
            <Navbar />
            <h1 className="page-title">On Sale</h1>
            <ProductGrid category="on-sale" />
            <Footer />
        </div>
    );
};

export default OnSale;