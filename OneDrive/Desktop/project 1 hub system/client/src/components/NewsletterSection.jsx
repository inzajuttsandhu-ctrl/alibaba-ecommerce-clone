import './NewsletterSection.css';

const NewsletterSection = () => {
  return (
    <section className="newsletter-section">
      <div className="container">
        <div className="newsletter-content">
          <h3 className="newsletter-title">Subscribe on our newsletter</h3>
          <p className="newsletter-desc">Get daily news on upcoming offers from many suppliers all over the world</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Email" required />
            <button className="btn btn-primary">Subscribe</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
