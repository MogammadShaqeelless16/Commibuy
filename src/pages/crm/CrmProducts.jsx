import React, { useState, useEffect } from 'react';
import './CrmProducts.css'; // Ensure this CSS file contains styles for table, header, and actions

function CrmProducts() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  useEffect(() => {
    // Fetch products from the API or database
    async function fetchProducts() {
      const data = [
        { id: 1, name: 'Product A', price: 100, stock: 50 },
        { id: 2, name: 'Product B', price: 50, stock: 20 },
      ];
      setProducts(data);
    }

    fetchProducts();
  }, []);

  const handleAction = (productId, actionType) => {
    console.log(`Action ${actionType} for product ID ${productId}`);
    // Add your edit/delete logic here
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="crm-products">
      <div className="header">
        <h1>Products</h1>
        <div className="header-actions">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button className="add-product-button" onClick={() => setShowAddProductModal(true)}>
            Add Product
          </button>
        </div>
      </div>

      <table className="products-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td>
                <button
                  className="action-button edit"
                  onClick={() => handleAction(product.id, 'edit')}
                >
                  Edit
                </button>
                <button
                  className="action-button delete"
                  onClick={() => handleAction(product.id, 'delete')}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAddProductModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add Product</h2>
            <form onSubmit={(e) => { e.preventDefault(); /* handleAddProduct logic */ }}>
              <div>
                <label>Name:</label>
                <input type="text" required />
              </div>
              <div>
                <label>Price:</label>
                <input type="number" required />
              </div>
              <div>
                <label>Stock:</label>
                <input type="number" required />
              </div>
              <button type="submit" className="action-button">Add</button>
              <button type="button" onClick={() => setShowAddProductModal(false)} className="action-button">Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CrmProducts;
