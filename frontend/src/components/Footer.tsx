/*
  File: src/components/Footer.tsx
  Description: Footer with contact details and links
*/
import React from "react";
import "../styles/Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>Opening Hours: 9AM - 9PM</p>
      <p>Contact: support@thriftstore.com</p>
      <p>Follow us on <a href="#">Instagram</a> | <a href="#">Facebook</a></p>
    </footer>
  );
};

export default Footer;