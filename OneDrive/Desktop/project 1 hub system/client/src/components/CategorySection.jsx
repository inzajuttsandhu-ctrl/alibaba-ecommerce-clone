import './CategorySection.css';

const CategorySection = ({ title, bannerImg, products }) => {
  return (
    <section className="category-section container card">
      <div className="category-banner" style={{ backgroundImage: `url(${bannerImg})` }}>
        <h3 className="category-title">{title}</h3>
        <button className="btn btn-white">Source now</button>
      </div>
      <div className="category-grid">
        {products.slice(0, 8).map((product) => (
          <div key={product._id} className="category-item-card">
            <div className="item-info">
              <p className="item-name">{product.title.split(' ').slice(0, 2).join(' ')}</p>
              <p className="item-price-from">From <br/> USD {product.price}</p>
            </div>
            <div className="item-img">
              <img src={product.imageURL} alt={product.title} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
