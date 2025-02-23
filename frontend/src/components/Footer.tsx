/*
  File: src/components/Footer.tsx
  Description: Footer with contact details and links
*/
import React from "react";
import "../styles/Footer.css";

const Footer: React.FC = () => {
  return (

    <div className="footer-wrapper">
      <footer className="footer">
          <div className="footer-links">
            <p>Email: <a href="mailto:thrifting-website@mail.com">thrifting-website@mail.com</a></p>
            <p>Phone Number:<a href="tel:555777"> 555-7777</a></p>
            <p>Location: Streetname 11</p>
          </div>
          <div className="info">
            <h3>Opening Hours</h3>
            <p>Monday-Friday: 9AM - 6PM</p>
            <p>Saturday: 11am - 2pm</p>
            <p>Sunday: Closed</p>
          </div>
          <p>Follow us on <a href="#">Instagram</a> | <a href="#">Facebook</a></p>
      </footer>
    </div>
  );
};

export default Footer;