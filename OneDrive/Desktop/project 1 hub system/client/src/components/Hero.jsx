import './Hero.css';

const Hero = () => {
  return (
    <div className="hero-section">
      <div className="hero-sidebar">
        <ul>
          <li className="active">Automobiles</li>
          <li>Clothes and wear</li>
          <li>Home interiors</li>
          <li>Computer and tech</li>
          <li>Tools, equipments</li>
          <li>Sports and outdoor</li>
          <li>Animal and pets</li>
          <li>Machinery tools</li>
          <li>More category</li>
        </ul>
      </div>
      <div className="hero-banner">
        <div className="banner-content">
          <h3>Latest trending</h3>
          <h1>Electronic items</h1>
          <button className="btn btn-primary">Learn more</button>
        </div>
      </div>
      <div className="hero-user-status">
        <div className="user-card card">
          <div className="user-info">
            <div className="user-avatar">👤</div>
            <p>Hi, user let's get started</p>
          </div>
          <button className="btn btn-secondary w-100">Join now</button>
          <button className="btn btn-outline w-100 mt-10">Log in</button>
        </div>
        <div className="promo-card card orange">
          <p>Get US $10 off with a new supplier</p>
        </div>
        <div className="promo-card card teal">
          <p>Send quotes with supplier preferences</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
