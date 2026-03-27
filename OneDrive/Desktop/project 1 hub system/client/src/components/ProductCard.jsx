import { Link } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';
import './ProductCard.css';

const ProductCard = ({ product, isList = false }) => {
  if (isList) {
    return (
      <Link to={`/product/${product._id}`} className="product-card list-view card">
        <div className="product-img">
          <img src={product.imageURL} alt={product.title} />
        </div>
        <div className="product-info">
          <div className="info-main">
            <p className="product-title">{product.title}</p>
            <h4 className="product-price">${product.price}</h4>
            <div className="product-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "#FF9017" : "none"} color="#FF9017" />
                ))}
                <span className="rating-num">{product.rating}</span>
              </div>
              <span className="dot">•</span>
              <span className="orders">154 orders</span>
              <span className="dot">•</span>
              <span className="shipping">Free shipping</span>
            </div>
            <p className="product-desc-long">{product.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.'}</p>
          </div>
          <div className="info-actions">
            <button className="wishlist-btn"><Heart size={20} /></button>
            <Link to={`/product/${product._id}`} className="view-link">View details</Link>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/product/${product._id}`} className="product-card grid-view card">
      <div className="product-img">
        <img src={product.imageURL} alt={product.title} />
      </div>
      <div className="product-info">
        <h4 className="product-price">${product.price}</h4>
        <div className="product-rating">
          <Star size={14} fill="#FF9017" color="#FF9017" />
          <span>{product.rating}</span>
        </div>
        <p className="product-title">{product.title}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
