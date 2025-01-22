/*
  File: src/components/Slider.tsx
  Description: Image slider with navigation and overlays
*/
import React, { useState } from 'react';
import '../styles/Slider.css';

const images = [
    { src: 'new_items.jpg', text: 'New Clothes', link: '/new-items' },
    { src: 'on_sale.jpg', text: 'Exclusive Sales', link: '/on-sale' },
    { src: 'cold_weather_outfits.jpg', text: 'Winter Collection', link: '/winter-collection' },
];

const Slider: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => setCurrentIndex((currentIndex + 1) % images.length);
    const prevSlide = () => setCurrentIndex((currentIndex - 1 + images.length) % images.length);

    return (
        <div className="slider">
            <img src={images[currentIndex].src} alt="Promotion" className="slider-image" />
            <div className="overlay">
                <h2>
                    <a href={images[currentIndex].link}>{images[currentIndex].text}</a>
                </h2>
                <button className="view-button" onClick={() => (window.location.href = images[currentIndex].link)}>View</button>
            </div>
            <div className="controls">
                <button onClick={prevSlide}>&lt;</button>
                <div className="dots">
                    {images.map((_, index) => (
                        <div key={index} className={index === currentIndex ? 'dot active' : 'dot'}></div>
                    ))}
                </div>
                <button onClick={nextSlide}>&gt;</button>
            </div>
        </div>
    );
};

export default Slider;