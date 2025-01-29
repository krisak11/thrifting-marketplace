/*
  File: src/pages/NewItems.tsx
  Description: Page to display new items
*/
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductGrid from '../components/ProductGrid';
import '../styles/NewItems.css';

const NewItems: React.FC = () => {
    return (
        <div className="newitems-container">
            <Navbar />
            <h1 className="page-title">New Items</h1>
            <ProductGrid category="new-items" />
            <Footer />
        </div>
    );
};

export default NewItems;