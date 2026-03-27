import { useState, useEffect } from 'react';
import './DealsSection.css';

const DealsSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 13, mins: 34, secs: 56
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: prev.mins - 1, secs: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const deals = [
    { name: 'Smart watches', discount: '-25%', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop' },
    { name: 'Laptops', discount: '-15%', img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop' },
    { name: 'GoPro cameras', discount: '-40%', img: '/images/gopro.png' },
    { name: 'Headphones', discount: '-25%', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop' },
    { name: 'Canon camreras', discount: '-25%', img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200&h=200&fit=crop' }
  ];

  return (
    <section className="deals-section container card">
      <div className="deals-header">
        <div className="deals-info">
          <h3>Deals and offers</h3>
          <p>Hygiene equipments</p>
        </div>
        <div className="countdown">
          <div className="time-box"><b>{String(timeLeft.days).padStart(2, '0')}</b> <span>Days</span></div>
          <div className="time-box"><b>{String(timeLeft.hours).padStart(2, '0')}</b> <span>Hour</span></div>
          <div className="time-box"><b>{String(timeLeft.mins).padStart(2, '0')}</b> <span>Min</span></div>
          <div className="time-box"><b>{String(timeLeft.secs).padStart(2, '0')}</b> <span>Sec</span></div>
        </div>
      </div>
      <div className="deals-grid">
        {deals.map((deal, i) => (
          <div key={i} className="deal-item">
            <div className="deal-img">
              <img src={deal.img} alt={deal.name} />
            </div>
            <p className="deal-name">{deal.name}</p>
            <span className="deal-discount">{deal.discount}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DealsSection;
