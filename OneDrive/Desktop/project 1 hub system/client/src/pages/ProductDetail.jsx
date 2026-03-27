import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, MessageSquare, ShieldCheck, Globe, ChevronRight, Heart, Check, CheckCircle } from 'lucide-react';
import api from '../api/api';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
      } catch (err) {
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="detail-skeleton container card">Loading product details...</div>;
  if (!product) return <div className="container">Product not found</div>;

  const images = [product.imageURL, product.imageURL, product.imageURL, product.imageURL, product.imageURL];

  return (
    <div className="product-detail-page fade-in">
      <div className="container">
        <div className="breadcrumbs">
          <Link to="/">Home</Link> <ChevronRight size={14} /> 
          <Link to="/products">Products</Link> <ChevronRight size={14} /> 
          <Link to={`/products?category=${product.category}`}>{product.category}</Link> <ChevronRight size={14} /> 
          <span>{product.title}</span>
        </div>
        
        <div className="detail-main card">
          <div className="detail-gallery">
            <div className="main-img">
              <img src={images[activeImg]} alt={product.title} />
            </div>
            <div className="thumb-row">
              {images.map((img, i) => (
                <div 
                  key={i} 
                  className={`thumb ${activeImg === i ? 'active' : ''}`}
                  onClick={() => setActiveImg(i)}
                >
                  <img src={img} alt={`${product.title} ${i}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="detail-info">
            <div className="stock-status">
              <Check size={16} color="#00B517" />
              <span>In stock</span>
            </div>
            <h1 className="product-title">{product.title}</h1>
            
            <div className="rating-row">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "#FF9017" : "none"} color="#FF9017" />
                ))}
                <span className="rating-num">{product.rating}</span>
              </div>
              <span className="dot">•</span>
              <span className="meta-text"><MessageSquare size={14} /> 32 reviews</span>
              <span className="dot">•</span>
              <span className="meta-text"><ShoppingCart size={14} /> 154 sold</span>
            </div>

            <div className="price-tiers">
              <div className="price-tier active">
                <p className="price-val">${product.price}</p>
                <p className="price-qty">50-100 pcs</p>
              </div>
              <div className="price-tier">
                <p className="price-val">${(product.price * 0.95).toFixed(2)}</p>
                <p className="price-qty">100-700 pcs</p>
              </div>
              <div className="price-tier">
                <p className="price-val">${(product.price * 0.90).toFixed(2)}</p>
                <p className="price-qty">700+ pcs</p>
              </div>
            </div>

            <div className="specs-grid">
              <div className="spec-item">
                <span className="label">Price:</span>
                <span className="value">Negotiable</span>
              </div>
              <div className="spec-item">
                <span className="label">Type:</span>
                <span className="value">Classic model</span>
              </div>
              <div className="spec-item">
                <span className="label">Material:</span>
                <span className="value">Plastic material</span>
              </div>
              <div className="spec-item">
                <span className="label">Design:</span>
                <span className="value">Modern design</span>
              </div>
              <div className="spec-item">
                <span className="label">Customization:</span>
                <span className="value">Customized logo and design</span>
              </div>
              <div className="spec-item">
                <span className="label">Protection:</span>
                <span className="value">Refund Policy</span>
              </div>
              <div className="spec-item">
                <span className="label">Warranty:</span>
                <span className="value">2 years full warranty</span>
              </div>
            </div>
          </div>

          <aside className="detail-actions">
            <div className="supplier-box card">
              <div className="supplier-header">
                <div className="supplier-avatar">G</div>
                <div className="supplier-meta">
                  <p>Supplier</p>
                  <h4>Guanjhu Trading</h4>
                </div>
              </div>
              <hr />
              <div className="supplier-features">
                <p><Globe size={16} /> Germany, Berlin</p>
                <p><ShieldCheck size={16} /> Verified Seller</p>
                <p><Globe size={16} /> Worldwide shipping</p>
              </div>
              <button className="btn btn-primary w-100">Send inquiry</button>
              <button
                className={`btn w-100 ${addedToCart ? 'btn-success-outline' : 'btn-white'}`}
                onClick={handleAddToCart}
                style={addedToCart ? { color: '#00B517', borderColor: '#00B517', gap: '6px' } : {}}
              >
                {addedToCart ? <><CheckCircle size={16} /> Added to Cart!</> : <><ShoppingCart size={16} /> Add to Cart</>}
              </button>
            </div>
            <button className="save-btn"><Heart size={18} /> Save for later</button>
          </aside>
        </div>

        <div className="product-tabs card">
          <div className="tab-header">
            <button className="tab-link active">Description</button>
            <button className="tab-link">Reviews</button>
            <button className="tab-link">Shipping</button>
            <button className="tab-link">About seller</button>
          </div>
          <div className="tab-content">
            <p>{product.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.'}</p>
            <table className="tech-specs">
              <tbody>
                <tr><td>Model</td><td>#8786867</td></tr>
                <tr><td>Style</td><td>Classic style</td></tr>
                <tr><td>Certificate</td><td>ISO-898921312</td></tr>
                <tr><td>Size</td><td>Medium, Large, Plus size</td></tr>
                <tr><td>Memory</td><td>8GB RAM</td></tr>
              </tbody>
            </table>
            <div className="feature-list">
              <p><Check size={14} /> Some great feature name here</p>
              <p><Check size={14} /> Lorem ipsum dolor sit amet, consectetur</p>
              <p><Check size={14} /> Duis aute irure dolor in reprehenderit</p>
              <p><Check size={14} /> Some great feature name here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
