// src/pages/ShopsPage.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabase/supabaseClient';
import './ShopsPage.css'; // Make sure this CSS file is updated

function ShopsPage() {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    async function fetchShops() {
      const { data: shopsData, error } = await supabase.from('shops').select('*');
      if (error) {
        console.error('Error fetching shops:', error);
      } else {
        setShops(shopsData);
      }
    }

    fetchShops();
  }, []);

  return (
    <div className="shops-page">
      <h1>Shops</h1>
      <div className="shops-list">
        {shops.length ? (
          shops.map(shop => (
            <div key={shop.id} className="shop-card">
              <div className="shop-header">
                {shop.header_image && <img src={shop.header_image} alt="Shop Header" />}
              </div>
              <div className="shop-info">
                <h2>{shop.name}</h2>
                <p>{shop.address}</p>
                <Link to={`/shops/${shop.slug}`} className="btn">View Details</Link>
              </div>
            </div>
          ))
        ) : (
          <p>No shops available.</p>
        )}
      </div>
    </div>
  );
}

export default ShopsPage;
