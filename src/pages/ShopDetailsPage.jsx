import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabase/supabaseClient';
import './ShopDetailsPage.css'; // Create this CSS file

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
        <h1>{shop.name}</h1>
        <p>{shop.address}</p>
        <p>Contact: {shop.contact_number}</p>
        <p>Social Media: {shop.social_media}</p>
        <p>Registered: {shop.registered ? 'Yes' : 'No'}</p>
      </header>
      <section className="products-section">
        <h2>Products</h2>
        <div className="products-list">
          {products.length ? (
            products.map(product => (
              <div key={product.id} className="product-card">
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
