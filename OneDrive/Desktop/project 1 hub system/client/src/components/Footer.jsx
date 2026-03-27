import { Link } from 'react-router-dom';
import { Apple, Play, ChevronDown } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top grid-columns">
          <div className="footer-logo-section">
            <Link to="/" className="brand-logo footer-brand">
              <span className="brand-icon">🛒</span>
              <span className="brand-name">Brand</span>
            </Link>
            <p className="footer-desc">Best information about the company gies here but now lorem ipsum is</p>
            <div className="social-links">
              <span className="social-icon">F</span>
              <span className="social-icon">T</span>
              <span className="social-icon">L</span>
              <span className="social-icon">I</span>
              <span className="social-icon">Y</span>
            </div>
          </div>
          
          <div className="footer-links">
            <h4>About</h4>
            <ul>
              <li>About Us</li>
              <li>Find store</li>
              <li>Categories</li>
              <li>Blogs</li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Partnership</h4>
            <ul>
              <li>About Us</li>
              <li>Find store</li>
              <li>Categories</li>
              <li>Blogs</li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Information</h4>
            <ul>
              <li>Help Center</li>
              <li>Money Refund</li>
              <li>Shipping</li>
              <li>Contact us</li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>For users</h4>
            <ul>
              <li>Login</li>
              <li>Register</li>
              <li>Settings</li>
              <li>My Orders</li>
            </ul>
          </div>

          <div className="footer-app">
            <h4>Get app</h4>
            <div className="app-buttons">
              <div className="app-btn"><Apple size={18} /> App Store</div>
              <div className="app-btn"><Play size={18} /> Google Play</div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container flex-between">
          <p>© 2026 Ecommerce.</p>
          <div className="footer-selector">English <ChevronDown size={14} /></div>
        </div>
      </div>
    </footer>
  );
};


export default Footer;
