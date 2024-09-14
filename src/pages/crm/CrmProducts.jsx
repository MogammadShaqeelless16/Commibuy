import React, { useState, useEffect } from 'react';
import './CrmProducts.css'; // Optional CSS

function CrmProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the API or database
    async function fetchProducts() {
      // Mock data or API call
      const data = [
        { id: 1, name: 'Product A', price: 100 },
        { id: 2, name: 'Product B', price: 50 },
      ];
      setProducts(data);
    }

    fetchProducts();
  }, []);

  return (
    <div className="crm-products">
      <h1>Products</h1>
      <div className="products-list">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <h2>{product.name}</h2>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CrmProducts;
