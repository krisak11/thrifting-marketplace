/*
  File: src/components/Navbar.tsx
  Description: Navigation bar with links and dropdown menu
*/
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    return (
        <nav className="navbar">
            <Link to="/" className="logo">
                ThriftStore
            </Link>
            <ul className="nav-links">
                <li>
                    <Link to="/new-items">New Items</Link>
                </li>
                <li
                    className="dropdown"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                >
                    <Link to="/categories" className="dropdown-toggle">
                        Categories
                    </Link>{' '}
                    {/* # is a placeholder */}
                    {isDropdownOpen && (
                        <ul className="dropdown-menu">
                            <li>
                                <Link to="/category/pants">Pants</Link>
                            </li>
                            <li>
                                <Link to="/category/tops">Tops</Link>
                            </li>
                            <li>
                                <Link to="/category/dresses">Dresses</Link>
                            </li>
                            <li>
                                <Link to="/category/shoes">Shoes</Link>
                            </li>
                        </ul>
                    )}
                </li>
                <li>
                    <Link to="/on-sale">On Sale</Link>
                </li>
            </ul>
            <div className="nav-icons">
                <button className="search-icon">🔍</button>
                <Link to="/account" className="nav-icon">
                    👤
                </Link>
                <Link to="/cart" className="nav-icon">
                    🛒
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
