import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import DealsSection from '../components/DealsSection';
import CategorySection from '../components/CategorySection';
import ProductCard from '../components/ProductCard';
import InquirySection from '../components/InquirySection';
import SupplierSection from '../components/SupplierSection';
import NewsletterSection from '../components/NewsletterSection';
import api from '../api/api';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [homeProducts, setHomeProducts] = useState([]);
  const [elecProducts, setElecProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get('/products');
        setProducts(data);
        setHomeProducts(data.filter(p => p.category === 'Home & Office').slice(0, 8));
        setElecProducts(data.filter(p => p.category === 'Electronics').slice(0, 8));
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="home-page fade-in">
      <div className="container">
        <Hero />
        <DealsSection />
        
        <CategorySection 
          title="Home and outdoor" 
          bannerImg="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400&h=600&fit=crop"
          products={homeProducts}
        />
        
        <CategorySection 
          title="Consumer electronics" 
          bannerImg="https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=600&fit=crop"
          products={elecProducts}
        />

        <InquirySection />

        <h3 className="section-title">Recommended items</h3>
        <div className="products-grid">
          {products.slice(0, 10).map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        <h3 className="section-title">Our extra services</h3>
        <div className="services-grid">
          <div className="service-card card">
            <div className="service-img" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=300)'}}></div>
            <div className="service-info">
              <span className="service-icon">🔍</span>
              <p>Source from Industry Hubs</p>
            </div>
          </div>
          <div className="service-card card">
            <div className="service-img" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400)'}}></div>
            <div className="service-info">
              <span className="service-icon">📦</span>
              <p>Customize Your Products</p>
            </div>
          </div>
          <div className="service-card card">
            <div className="service-img" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1494412519320-aa613dfb7738?w=300)'}}></div>
            <div className="service-info">
              <span className="service-icon">✈️</span>
              <p>Fast, reliable shipping</p>
            </div>
          </div>
          <div className="service-card card">
            <div className="service-img" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1454165205744-3b78555e5572?w=300)'}}></div>
            <div className="service-info">
              <span className="service-icon">🛡️</span>
              <p>Product monitoring and inspection</p>
            </div>
          </div>
        </div>

        <SupplierSection />
      </div>
      
      <NewsletterSection />
    </div>
  );
};

export default Home;
