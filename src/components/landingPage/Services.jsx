import React from 'react';

function Services({ services }) {
  return (
    services.length > 0 && (
      <section className="services-section" id="services-section">
        <div className="container">
          <h2>Our Services</h2>
          <div className="services-grid">
            {services.map(service => (
              <div key={service.id} className="service-card">
                {service.icon_url && (
                  <div className="service-icon">
                    <img src={service.icon_url} alt={service.name} />
                  </div>
                )}
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <p>Price: R{service.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  );
}

export default Services;
