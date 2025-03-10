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
            <div className="wrapper">
                <h1 className="page-title">New Items</h1>
                <ProductGrid tags={["new-items"]} />
            </div>
            <Footer />
        </div>
    );
};

export default NewItems;