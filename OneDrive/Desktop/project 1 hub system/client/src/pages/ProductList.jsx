import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import api from '../api/api';
import ProductCard from '../components/ProductCard';
import { LayoutGrid, List, ChevronRight } from 'lucide-react';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const category = query.get('category');
  const searchQuery = query.get('query');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let endpoint = '/products';
        const params = new URLSearchParams();
        if (category) params.append('category', category);
        if (searchQuery) params.append('query', searchQuery);
        
        const { data } = await api.get(`${endpoint}?${params.toString()}`);
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category, searchQuery]);

  return (
    <div className="product-list-page fade-in">
      <div className="container">
        <div className="breadcrumbs">
          <Link to="/">Home</Link> <ChevronRight size={14} /> 
          <span>{category || 'All categories'}</span>
        </div>

        <div className="list-layout">
          <aside className="sidebar">
            <div className="filter-group">
              <h4>Category</h4>
              <ul>
                <li className={!category ? 'active' : ''}><Link to="/products">All category</Link></li>
                <li className={category === 'Electronics' ? 'active' : ''}><Link to="/products?category=Electronics">Electronics</Link></li>
                <li className={category === 'Home & Office' ? 'active' : ''}><Link to="/products?category=Home & Office">Home & Office</Link></li>
                <li><Link to="#">Mobile accessory</Link></li>
                <li><Link to="#">Laptops</Link></li>
              </ul>
            </div>

            <div className="filter-group">
              <h4>Brands</h4>
              <label><input type="checkbox" /> Samsung</label>
              <label><input type="checkbox" /> Apple</label>
              <label><input type="checkbox" /> Huawei</label>
              <label><input type="checkbox" /> Xiaomi</label>
              <p className="see-all">See all</p>
            </div>

            <div className="filter-group">
              <h4>Features</h4>
              <label><input type="checkbox" /> Metallic</label>
              <label><input type="checkbox" /> Plastic cover</label>
              <label><input type="checkbox" /> 8GB RAM</label>
              <label><input type="checkbox" /> Super power</label>
              <p className="see-all">See all</p>
            </div>

            <div className="filter-group">
              <h4>Price range</h4>
              <div className="range-inputs">
                <div className="input-group">
                  <label>Min</label>
                  <input type="number" placeholder="0" />
                </div>
                <div className="input-group">
                  <label>Max</label>
                  <input type="number" placeholder="9999" />
                </div>
              </div>
              <button className="btn btn-white w-100">Apply</button>
            </div>

            <div className="filter-group">
              <h4>Condition</h4>
              <label><input type="radio" name="condition" /> Any</label>
              <label><input type="radio" name="condition" /> Refurbished</label>
              <label><input type="radio" name="condition" /> Brand new</label>
              <label><input type="radio" name="condition" /> Old items</label>
            </div>

            <div className="filter-group">
              <h4>Ratings</h4>
              <div className="rating-filter">
                <label><input type="checkbox" /> 
                  <span className="stars">⭐⭐⭐⭐⭐</span>
                </label>
                <label><input type="checkbox" /> 
                  <span className="stars">⭐⭐⭐⭐</span>
                </label>
                <label><input type="checkbox" /> 
                  <span className="stars">⭐⭐⭐</span>
                </label>
              </div>
            </div>
          </aside>

          <main className="products-main">
            <div className="list-header card">
              <div className="header-left">
                <p>12,911 items in <b>{category || searchQuery || 'Mobile accessory'}</b></p>
              </div>
              <div className="header-right">
                <div className="sort-box">
                  <select>
                    <option>Newest</option>
                    <option>Featured</option>
                    <option>Price: Low to High</option>
                  </select>
                </div>
                <div className="view-toggles">
                  <button 
                    className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => setViewMode('grid')}
                  >
                    <LayoutGrid size={20} />
                  </button>
                  <button 
                    className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => setViewMode('list')}
                  >
                    <List size={20} />
                  </button>
                </div>
              </div>
            </div>

            <div className="active-filters">
              <span className="filter-chip">Samsung <button>×</button></span>
              <span className="filter-chip">Apple <button>×</button></span>
              <button className="clear-all">Clear all filters</button>
            </div>

            <div className={`products-container ${viewMode}-view`}>
              {loading ? (
                <div className="loader">Loading products...</div>
              ) : products.length > 0 ? (
                products.map(product => (
                  <ProductCard key={product._id} product={product} isList={viewMode === 'list'} />
                ))
              ) : (
                <div className="no-results">No products found</div>
              )}
            </div>

            <div className="pagination">
              <select defaultValue="10">
                <option value="10">Show 10</option>
                <option value="20">Show 20</option>
                <option value="30">Show 30</option>
              </select>
              <div className="pages">
                <button className="page-btn active">1</button>
                <button className="page-btn">2</button>
                <button className="page-btn">3</button>
                <span className="page-dots">...</span>
                <button className="page-btn">10</button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
