import './SupplierSection.css';

const SupplierSection = () => {
  const suppliers = [
    { country: 'Arabic Emirates', domain: 'shopname.ae', flag: '🇦🇪' },
    { country: 'Australia', domain: 'shopname.ae', flag: '🇦🇺' },
    { country: 'United States', domain: 'shopname.ae', flag: '🇺🇸' },
    { country: 'Russia', domain: 'shopname.ru', flag: '🇷🇺' },
    { country: 'Italy', domain: 'shopname.it', flag: '🇮🇹' },
    { country: 'Denmark', domain: 'denmark.com.dk', flag: '🇩🇰' },
    { country: 'France', domain: 'shopname.com.fr', flag: '🇫🇷' },
    { country: 'Arabic Emirates', domain: 'shopname.ae', flag: '🇦🇪' },
    { country: 'China', domain: 'shopname.ae', flag: '🇨🇳' },
    { country: 'Great Britain', domain: 'shopname.co.uk', flag: '🇬🇧' }
  ];

  return (
    <section className="supplier-section container">
      <h3 className="section-title">Suppliers by region</h3>
      <div className="supplier-grid">
        {suppliers.map((s, i) => (
          <div key={i} className="supplier-item">
            <span className="supplier-flag">{s.flag}</span>
            <div className="supplier-info">
              <p className="country-name">{s.country}</p>
              <p className="domain-name">{s.domain}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SupplierSection;
