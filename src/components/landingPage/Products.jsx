import React from 'react';

function Products({ products }) {
  return (
    products.length > 0 && (
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
    )
  );
}

export default Products;
