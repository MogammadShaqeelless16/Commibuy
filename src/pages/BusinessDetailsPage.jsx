import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabase/supabaseClient';
import './BusinessDetailsPage.css'; // Ensure this CSS file is updated accordingly
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

function BusinessDetailsPage() {
  const { businessSlug } = useParams(); // Get businessSlug from URL parameters
  const [business, setBusiness] = useState(null);
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function fetchBusinessDetails() {
      // Fetch business details by slug
      const { data: businessData, error: businessError } = await supabase
        .from('businesses')
        .select('*')
        .eq('slug', businessSlug)
        .single();

      if (businessError) {
        console.error('Error fetching business details:', businessError);
      } else {
        setBusiness(businessData);
      }

      // Fetch business products
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .eq('shop_id', businessData.id);

      if (productsError) {
        console.error('Error fetching products:', productsError);
      } else {
        setProducts(productsData);
      }

      // Fetch business services
      const { data: servicesData, error: servicesError } = await supabase
        .from('services')
        .select('*')
        .eq('shop_id', businessData.id);

      if (servicesError) {
        console.error('Error fetching services:', servicesError);
      } else {
        setServices(servicesData);
      }
    }

    fetchBusinessDetails();
  }, [businessSlug]);

  if (!business) return <div>Loading...</div>;

  return (
    <div className="business-details-page">
      <header className="business-header">
        {business.header_image && (
          <div className="header-image">
            <img src={business.header_image} alt="Business Header" />
          </div>
        )}
        <div className="logo-container">
          {business.logo && <img src={business.logo} alt="Business Logo" className="business-logo" />}
        </div>
        <div className="business-info">
          <h1>{business.name}</h1>
          <div className="info-item">
            <FaMapMarkerAlt />
            <p>{business.address}</p>
          </div>
          <div className="info-item">
            <FaPhoneAlt />
            <p>{business.contact_number}</p>
          </div>
          <div className="info-item">
            <span>Registered: {business.registered ? 'Yes' : 'No'}</span>
          </div>
          <div className="social-media">
            {business.social_media_facebook && (
              <a href={business.social_media_facebook} target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </a>
            )}
            {business.social_media_twitter && (
              <a href={business.social_media_twitter} target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
            )}
            {business.social_media_instagram && (
              <a href={business.social_media_instagram} target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
            )}
            {business.social_media_linkedin && (
              <a href={business.social_media_linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
            )}
          </div>
        </div>
      </header>
      {services.length > 0 && (
        <section className="services-section">
          <h2>Services</h2>
          <div className="services-list">
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
        </section>
      )}
      {products.length > 0 && (
        <section className="products-section">
          <h2>Products</h2>
          <div className="products-list">
            {products.map(product => (
              <div key={product.id} className="product-card">
                {product.image_url && (
                  <div className="product-image">
                    <img src={product.image_url} alt={product.name} />
                  </div>
                )}
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>Price: R{product.price}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default BusinessDetailsPage;
