import { useState } from 'react';
import './InquirySection.css';

const InquirySection = () => {
  const [formData, setFormData] = useState({
    item: '',
    details: '',
    quantity: '',
    unit: 'Pcs'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Inquiry sent successfully!');
  };

  return (
    <section className="inquiry-section container">
      <div className="inquiry-bg">
        <div className="inquiry-content">
          <h2>An easy way to send requests to all suppliers</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.</p>
          <button className="btn btn-primary d-mobile-only">Send inquiry</button>
        </div>
        
        <div className="inquiry-form-container card">
          <h3>Send quote to suppliers</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input 
                type="text" 
                placeholder="What item you need?" 
                value={formData.item}
                onChange={(e) => setFormData({...formData, item: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <textarea 
                placeholder="Type more details"
                rows="3"
                value={formData.details}
                onChange={(e) => setFormData({...formData, details: e.target.value})}
              ></textarea>
            </div>
            <div className="form-row">
              <input 
                type="number" 
                placeholder="Quantity" 
                value={formData.quantity}
                onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                required
              />
              <select 
                value={formData.unit}
                onChange={(e) => setFormData({...formData, unit: e.target.value})}
              >
                <option>Pcs</option>
                <option>Kg</option>
                <option>Litres</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Send inquiry</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default InquirySection;
