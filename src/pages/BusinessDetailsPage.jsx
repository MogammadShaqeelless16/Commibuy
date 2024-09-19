import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabase/supabaseClient';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './BusinessDetailsPage.css'; // Ensure this CSS file is updated accordingly
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhoneAlt, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import L from 'leaflet';

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
  const { businessSlug } = useParams(); // Get businessSlug from URL parameters
  const [business, setBusiness] = useState(null);
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [mapCenter, setMapCenter] = useState([0, 0]); // Default center for the map
  const [mapZoom, setMapZoom] = useState(16); // More zoomed-in level

  useEffect(() => {
    async function fetchBusinessDetails() {
      try {
        // Fetch business details by slug
        const { data: businessData, error: businessError } = await supabase
          .from('businesses')
          .select('*')
          .eq('slug', businessSlug)
          .eq('registered', true) // Check if the business is registered
          .single();

        if (businessError) throw businessError;

        setBusiness(businessData);

        // Set the map center based on the business location
        if (businessData.latitude && businessData.longitude) {
          setMapCenter([businessData.latitude, businessData.longitude]);
        }

        // Fetch business products
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('*')
          .eq('shop_id', businessData.id);

        if (productsError) throw productsError;

        setProducts(productsData);

        // Fetch business services
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

  if (!business) return <div>Loading...</div>;

  return (
    <div className="business-details-page">
      <header className="business-header">
        {business.header_image && (
          <div className="header-image">
            <img src={business.header_image} alt="Business Header" />
          </div>
        )}
      </header>
      <div className="business-info">
        <h1>{business.name}</h1>
        {business.description && (
          <>
            <h2 className="who-are-we">Who are we?</h2>
            <p className="description">{business.description}</p>
          </>
        )}
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
      {business.latitude && business.longitude && (
        <section className="map-section">
          <h2>Location</h2>
          <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: '400px', width: '100%' }}>
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
        </section>
      )}
    </div>
  );
}

export default BusinessDetailsPage;
