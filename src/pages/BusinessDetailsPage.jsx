import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabase/supabaseClient';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './BusinessDetailsPage.css';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhoneAlt, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import L from 'leaflet';
import Loader from '../components/Loader';  // Ensure you have a Loader component

// Import Leaflet's default icons for use in the browser
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Ensure Leaflet's default icon is used correctly
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

function BusinessDetailsPage() {
  const { businessSlug } = useParams();
  const [business, setBusiness] = useState(null);
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [mapCenter, setMapCenter] = useState([0, 0]);
  const [mapZoom, setMapZoom] = useState(16);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: '',
    interest: ''
  });
  const [formStatus, setFormStatus] = useState(null); // Track form submission status

  useEffect(() => {
    async function fetchBusinessDetails() {
      try {
        const { data: businessData, error: businessError } = await supabase
          .from('businesses')
          .select('*')
          .eq('slug', businessSlug)
          .eq('registered', true)
          .single();

        if (businessError) throw businessError;

        setBusiness(businessData);

        if (businessData.latitude && businessData.longitude) {
          setMapCenter([businessData.latitude, businessData.longitude]);
        }

        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('*')
          .eq('shop_id', businessData.id);

        if (productsError) throw productsError;

        setProducts(productsData);

        const { data: servicesData, error: servicesError } = await supabase
          .from('services')
          .select('*')
          .eq('shop_id', businessData.id);

        if (servicesError) throw servicesError;

        setServices(servicesData);

      } catch (error) {
        console.error('Error fetching business details:', error);
      }
    }

    fetchBusinessDetails();
  }, [businessSlug]);

  if (!business) return <Loader />; // Use the Loader component

  const handleMenuClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleFormChange = (e) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('leads')
        .insert([{
          business_uuid: business.uuid,
          name: contactForm.name,
          email: contactForm.email,
          message: contactForm.message,
          interest: contactForm.interest
        }]);

      if (error) throw error;

      setFormStatus('success');
      // Optionally reset form or do other post-submit actions
      setContactForm({
        name: '',
        email: '',
        message: '',
        interest: ''
      });

    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('error');
    }
  };

  return (
    <div className="business-details-page">
      {/* Top Navigation */}
      <nav className="top-nav">
        <div className="logo">
          {business.logo_url && (
            <a href="/">
              <img src={business.logo_url} alt="Business Logo" className="logo-img" />
            </a>
          )}
          <h1 className="business-name">{business.name}</h1>
        </div>
        <ul className="nav-menu">
          <li><button onClick={() => handleMenuClick('services-section')}>Services</button></li>
          <li><button onClick={() => handleMenuClick('products-section')}>Products</button></li>
          <li><button onClick={() => handleMenuClick('contact-section')}>Contact</button></li>
        </ul>
      </nav>

      {/* Header Image */}
      {business.header_image && (
        <header className="business-header">
          <div className="header-image">
            <img src={business.header_image} alt="Business Header" />
          </div>
        </header>
      )}

      {/* About Us Section */}
      <section className="about-section">
        <div className="container">
          <h2>About Us</h2>
          <p>{business.description}</p>
        </div>
      </section>

      {/* Services Section */}
      {services.length > 0 && (
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
      )}

      {/* Products Section */}
      {products.length > 0 && (
        <section className="products-section" id="products-section">
          <div className="container">
            <h2>Our Products</h2>
            <div className="products-grid">
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
          </div>
        </section>
      )}

      {/* Contact Details */}
      <section className="contact-details-section" id="contact-section">
        <div className="container">
          <div className="info-grid">
            <div className="info-item">
              <FaMapMarkerAlt className="info-icon" />
              <p>{business.address}</p>
            </div>
            <div className="info-item">
              <FaPhoneAlt className="info-icon" />
              <a href={`tel:${business.contact_number}`}>{business.contact_number}</a>
            </div>
            <div className="info-item">
              <FaEnvelope className="info-icon" />
              <a href={`mailto:${business.email}`}>{business.email}</a>
            </div>
          </div>
          <div className="social-media">
            {business.social_media_facebook && (
              <a href={business.social_media_facebook} target="_blank" rel="noopener noreferrer" className="social-link">
                <FaFacebook />
              </a>
            )}
            {business.social_media_twitter && (
              <a href={business.social_media_twitter} target="_blank" rel="noopener noreferrer" className="social-link">
                <FaTwitter />
              </a>
            )}
            {business.social_media_instagram && (
              <a href={business.social_media_instagram} target="_blank" rel="noopener noreferrer" className="social-link">
                <FaInstagram />
              </a>
            )}
            {business.social_media_linkedin && (
              <a href={business.social_media_linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                <FaLinkedin />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="contact-us-section" id="contact-form-section">
        <div className="container">
          <div className="contact-us-grid">
            {/* Map on the left */}
            {business.latitude && business.longitude && (
              <div className="map-container">
                <h2>Location</h2>
                <MapContainer center={mapCenter} zoom={mapZoom} className="map">
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={mapCenter}>
                    <Popup>
                      <strong>{business.name}</strong><br />
                      {business.description}
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            )}

            {/* Contact form on the right */}
            <div className="contact-form-container">
              <h2>Get in Touch</h2>
              <form className="contact-form" onSubmit={handleFormSubmit}>
                <label>
                  Name:
                  <input type="text" name="name" value={contactForm.name} onChange={handleFormChange} required />
                </label>
                <label>
                  Email:
                  <input type="email" name="email" value={contactForm.email} onChange={handleFormChange} required />
                </label>
                <label>
                  Interest:
                  <select name="interest" value={contactForm.interest} onChange={handleFormChange} required>
                    <option value="" disabled>Select an option</option>
                    <option value="products">Products</option>
                    <option value="services">Services</option>
                  </select>
                </label>
                <label>
                  Message:
                  <textarea name="message" value={contactForm.message} onChange={handleFormChange} required></textarea>
                </label>
                <button type="submit" className="submit-button">Send</button>
              </form>
              {/* Display form status message */}
              {formStatus === 'success' && <div className="success-message">Thank you for your submission! We will be in contact with you shortly.</div>}
              {formStatus === 'error' && <div className="error-message">There was an error with your submission. Please try again later.</div>}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BusinessDetailsPage;
