import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, MessageCircle, Heart, Globe, LayoutGrid, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [search, setSearch] = useState('');
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?query=${search}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-top">
        <div className="container flex-between">
          <div className="nav-left flex-gap">
            <Link to="/" className="brand-logo">
              <span className="brand-icon">🛒</span>
              <span className="brand-name">Brand</span>
            </Link>
          </div>
          
          <form className="search-bar" onSubmit={handleSearch}>
            <input 
              type="text" 
              placeholder="Search items..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select className="search-category">
              <option>All category</option>
              <option>Electronics</option>
              <option>Home</option>
            </select>
            <button type="submit" className="search-btn">Search</button>
          </form>

          <div className="nav-right flex-gap">
            {user ? (
              <>
                <div className="nav-item" onClick={logout} style={{cursor: 'pointer'}} title="Logout">
                  <User size={20} />
                  <span>Logout</span>
                </div>
                <div className="nav-item">
                  <MessageCircle size={20} />
                  <span>Message</span>
                </div>
                <Link to="/orders" className="nav-item" style={{textDecoration: 'none', color: 'inherit'}}>
                  <Heart size={20} />
                  <span>Orders</span>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-item" style={{textDecoration: 'none', color: 'inherit'}}>
                  <User size={20} />
                  <span>Sign In</span>
                </Link>
                <div className="nav-item">
                  <MessageCircle size={20} />
                  <span>Message</span>
                </div>
                <Link to="/login" className="nav-item" style={{textDecoration: 'none', color: 'inherit'}}>
                  <Heart size={20} />
                  <span>Orders</span>
                </Link>
              </>
            )}
            <Link to="/cart" className="nav-item cart-icon">
              <ShoppingCart size={20} />
              <span>My cart</span>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
          </div>
        </div>
      </div>

      <div className="navbar-bottom">
        <div className="container flex-between">
          <div className="bottom-left flex-gap">
            <div className="menu-item"><LayoutGrid size={18} /> All category</div>
            <div className="menu-item">Hot offers</div>
            <div className="menu-item">Gift boxes</div>
            <div className="menu-item">Projects</div>
            <div className="menu-item">Menu item</div>
            <div className="menu-item flex-gap">Help <ChevronDown size={14} /></div>
          </div>
          <div className="bottom-right flex-gap">
            <div className="menu-item flex-gap">English, USD <ChevronDown size={14} /></div>
            <div className="menu-item flex-gap">Ship to <Globe size={18} /> <ChevronDown size={14} /></div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
