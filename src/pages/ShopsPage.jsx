import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabase/supabaseClient';
import './ShopsPage.css'; // Create this CSS file

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
        {shops.map(shop => (
          <div key={shop.id} className="shop-card">
            <h2>{shop.name}</h2>
            <p>{shop.address}</p>
            <Link to={`/shops/${shop.slug}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShopsPage;
