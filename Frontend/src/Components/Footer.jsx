import React from 'react';
import '../Styles/Footer.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaCcVisa, FaCcMastercard, FaCcPaypal } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Company Info */}
        <div className="footer-section about">
          <h2>TrolleyGo</h2>
          <p>Your one-stop online grocery store delivering fresh products to your doorstep.</p>
        </div>

        {/* Navigation Links */}
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/shop">Shop</a></li>
            <li><a href="/offers">Offers</a></li>
            <li><a href="/blog">Blog</a></li>
          </ul>
        </div>

        <div className="footer-section links">
          <h3>Customer Service</h3>
          <ul>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/shipping">Shipping & Returns</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div className="footer-section newsletter">
          <h3>Newsletter</h3>
          <form>
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>

        {/* Social Media Links */}
        <div className="footer-section social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com/trolleygo" aria-label="Facebook"><FaFacebookF /></a>
            <a href="https://twitter.com/trolleygo" aria-label="Twitter"><FaTwitter /></a>
            <a href="https://instagram.com/trolleygo" aria-label="Instagram"><FaInstagram /></a>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="footer-section payments">
          <h3>We Accept</h3>
          <div className="payment-icons">
            <FaCcVisa />
            <FaCcMastercard />
            <FaCcPaypal />
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; 2025 TrolleyGo. All rights reserved.</p>
      </div>
    </footer>
  );
};