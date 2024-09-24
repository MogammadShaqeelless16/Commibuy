import React, { useState, useEffect } from 'react';
import { fetchCurrentUser } from '../../supabase/userOperations';
import { supabase } from '../../supabase/supabaseClient';
import CRMProductsDetails from '../../components/crm/products/CRMProductsDetails';
import * as XLSX from 'xlsx'; // Importing XLSX library
import './CrmProducts.css'; // Ensure this CSS file contains styles for table, header, and actions

function CrmProducts() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [userBusinesses, setUserBusinesses] = useState([]); // Store user businesses
  const [showImageModal, setShowImageModal] = useState(false); // State for image modal
  const [selectedImageUrl, setSelectedImageUrl] = useState(''); // Selected image URL for modal
  const [importFile, setImportFile] = useState(null); // State for the import file

  useEffect(() => {
    // Fetch current user and their accessible products
    async function fetchUserAndProducts() {
      try {
        // Fetch current user
        const user = await fetchCurrentUser();

        if (!user) {
          console.error('No user found');
          return;
        }

        // Log the user object for debugging
        console.log('Fetched user:', user);

        // Fetch the user's businesses from the users_businesses table
        const { data: userBusinessesData, error: businessesError } = await supabase
          .from('users_businesses')
          .select('business_id') // Get only the business IDs
          .eq('user_id', user.id); // Match the current user's ID

        if (businessesError) {
          throw businessesError;
        }

        // Extract business IDs
        const businessIds = userBusinessesData.map(entry => entry.business_id);
        setUserBusinesses(businessIds);

        // Fetch products linked to user's businesses and include business name and image URL
        const { data: productsData, error } = await supabase
          .from('products')
          .select('*, businesses (name), image_url') // Include image_url
          .in('shop_id', businessIds); // Adjust the column name as needed

        if (error) {
          throw error;
        }

        setProducts(productsData);
        setFilteredProducts(productsData); // Initially, display all accessible products

        // Fetch business details for the dropdown
        const { data: businessesData, error: fetchBusinessesError } = await supabase
          .from('businesses')
          .select('*') // Adjust as needed
          .in('id', businessIds); // Fetch only the businesses user has access to

        if (fetchBusinessesError) {
          throw fetchBusinessesError;
        }

        // Set user businesses with detailed info
        setUserBusinesses(businessesData); // Store both IDs and names

      } catch (error) {
        console.error('Error fetching user or products:', error);
      }
    }

    fetchUserAndProducts();
  }, []);

  const handleAction = (productId, actionType) => {
    if (actionType === 'edit') {
      const productToEdit = products.find(product => product.id === productId);
      setSelectedProduct(productToEdit);
      setShowEditProductModal(true);
    } else if (actionType === 'delete') {
      // Add your delete logic here
      console.log(`Delete product ID ${productId}`);
    } else if (actionType === 'viewImage') {
      // Open the image in a modal
      const productToView = products.find(product => product.id === productId);
      setSelectedImageUrl(productToView.image_url); // Set the selected image URL
      setShowImageModal(true); // Show the image modal
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredProducts);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Products');
    XLSX.writeFile(wb, 'products.xlsx');
  };

  const handleFileChange = (e) => {
    setImportFile(e.target.files[0]);
  };

  const handleImport = async () => {
    if (!importFile) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
      
      // Assuming the Excel data contains the same keys as your products table
      const { error } = await supabase
        .from('products')
        .insert(jsonData);
      
      if (error) {
        console.error('Error importing products:', error);
      } else {
        // Refresh products after import
        fetchUserAndProducts();
      }
    };
    reader.readAsArrayBuffer(importFile);
  };

  return (
    <div className="crm-products">
      <div className="header">
        <h1>Products</h1>
        <div className="header-actions">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="search-input"
          />
          <button className="add-product-button" onClick={() => setShowAddProductModal(true)}>
            Add Product
          </button>
          <button className="export-button" onClick={exportToExcel}>
            Export to Excel
          </button>
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
            className="import-input"
          />
          <button className="import-button" onClick={handleImport}>
            Import Products
          </button>
        </div>
      </div>

      <table className="products-table">
        <thead>
          <tr>
            <th>Image</th> {/* New column for Image */}
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Business</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map(product => (
            <tr key={product.id}>
              <td>
                {product.image_url ? (
                  <img 
                    src={product.image_url} 
                    alt="Product Preview" 
                    style={{ width: '50px', height: 'auto', cursor: 'pointer' }} 
                    onClick={() => handleAction(product.id, 'viewImage')} // Action for viewing image
                  />
                ) : (
                  'No Image'
                )}
              </td>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>R{product.price}</td>
              <td>{product.stock}</td>
              <td>{product.businesses?.name || 'N/A'}</td>
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
                <label>Title:</label>
                <input type="text" required />
              </div>
              <div>
                <label>Description:</label>
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
              <div>
                <label>Assign to Business:</label>
                <select required>
                  {userBusinesses.map(business => (
                    <option key={business.id} value={business.id}>
                      {business.name} {/* Show business name in the dropdown */}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="action-button">Add</button>
              <button type="button" onClick={() => setShowAddProductModal(false)} className="action-button">Cancel</button>
            </form>
          </div>
        </div>
      )}

      {showEditProductModal && selectedProduct && (
        <CRMProductsDetails
          product={selectedProduct}
          businesses={userBusinesses} // Pass the list of businesses
          onClose={() => setShowEditProductModal(false)}
          onUpdate={(updatedProduct) => {
            // Update the product in the state or refetch products
            setProducts(prev => prev.map(p => (p.id === updatedProduct.id ? updatedProduct : p)));
            setFilteredProducts(prev => prev.map(p => (p.id === updatedProduct.id ? updatedProduct : p)));
            setShowEditProductModal(false);
          }}
        />
      )}

      {showImageModal && selectedImageUrl && (
        <div className="image-modal-overlay" onClick={() => setShowImageModal(false)}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImageUrl} alt="Product Full" style={{ width: '500px', height: 'auto' }} />
            <button onClick={() => setShowImageModal(false)} className="close-image-modal">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CrmProducts;
