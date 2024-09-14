import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabase/supabaseClient';
import './ShopDetailsPage.css'; // Ensure this CSS file is updated accordingly
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

function ShopDetailsPage() {
  const { shopSlug } = useParams(); // Get shopSlug from URL parameters
  const [shop, setShop] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchShopDetails() {
      // Fetch shop details by slug
      const { data: shopData, error: shopError } = await supabase
        .from('shops')
        .select('*')
        .eq('slug', shopSlug)
        .single();

      if (shopError) {
        console.error('Error fetching shop details:', shopError);
      } else {
        setShop(shopData);
      }

      // Fetch shop products
      const { data: productsData, error: productsError } = await supabase
        .from('products')
        .select('*')
        .eq('shop_id', shopData.id);

      if (productsError) {
        console.error('Error fetching products:', productsError);
      } else {
        setProducts(productsData);
      }
    }

    fetchShopDetails();
  }, [shopSlug]);

  if (!shop) return <div>Loading...</div>;

  return (
    <div className="shop-details-page">
      <header className="shop-header">
        {shop.header_image && (
          <div className="header-image">
            <img src={shop.header_image} alt="Shop Header" />
          </div>
        )}
        <div className="logo-container">
          {shop.logo && <img src={shop.logo} alt="Shop Logo" className="shop-logo" />}
        </div>
        <div className="shop-info">
          <h1>{shop.name}</h1>
          <div className="info-item">
            <FaMapMarkerAlt />
            <p>{shop.address}</p>
          </div>
          <div className="info-item">
            <FaPhoneAlt />
            <p>{shop.contact_number}</p>
          </div>
          <div className="info-item">
            <span>Registered: {shop.registered ? 'Yes' : 'No'}</span>
          </div>
          <div className="social-media">
            {shop.social_media_facebook && (
              <a href={shop.social_media_facebook} target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </a>
            )}
            {shop.social_media_twitter && (
              <a href={shop.social_media_twitter} target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
            )}
            {shop.social_media_instagram && (
              <a href={shop.social_media_instagram} target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
            )}
            {shop.social_media_linkedin && (
              <a href={shop.social_media_linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
            )}
          </div>
        </div>
      </header>
      <section className="products-section">
        <h2>Products</h2>
        <div className="products-list">
          {products.length ? (
            products.map(product => (
              <div key={product.id} className="product-card">
                {product.image_url && (
                  <div className="product-image">
                    <img src={product.image_url} alt={product.name} />
                  </div>
                )}
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
              </div>
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default ShopDetailsPage;
