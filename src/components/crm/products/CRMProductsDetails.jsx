import React, { useState } from 'react'; 
import { supabase } from '../../../supabase/supabaseClient';

function CRMProductsDetails({ product, businesses, onClose, onUpdate }) {
  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [stock, setStock] = useState(product.stock);
  const [selectedBusinessId, setSelectedBusinessId] = useState(product.shop_id || ''); // Initialize with product's shop_id
  const [imageUrl, setImageUrl] = useState(product.image_url || ''); // Initialize with product's image_url
  const [isImageModalOpen, setIsImageModalOpen] = useState(false); // State to control image modal visibility

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const updatedProduct = {
      id: product.id,
      title,
      description,
      price,
      stock,
      shop_id: selectedBusinessId,
      image_url: imageUrl, // Include updated image URL
    };

    // Update product in the database
    const { error } = await supabase
      .from('products')
      .update(updatedProduct)
      .match({ id: product.id });

    if (error) {
      console.error('Error updating product:', error);
    } else {
      onUpdate(updatedProduct); // Call the onUpdate function with the updated product
      onClose(); // Close the modal
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Product</h2>

        {/* Title Input */}
        <div className="form-group">
          <div className="input-container">
            <input
              type="text"
              className="modal-input"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <label htmlFor="title" className="modal-label">Product Title</label>
          </div>
        </div>

        {/* Description Input */}
        <div className="form-group">
          <div className="input-container">
            <textarea
              className="modal-input"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <label htmlFor="description" className="modal-label">Description</label>
          </div>
        </div>

        {/* Price Input */}
        <div className="form-group">
          <div className="input-container">
            <input
              type="number"
              className="modal-input"
              id="price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              required
            />
            <label htmlFor="price" className="modal-label">Price</label>
          </div>
        </div>

        {/* Stock Input */}
        <div className="form-group">
          <div className="input-container">
            <input
              type="number"
              className="modal-input"
              id="stock"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              required
            />
            <label htmlFor="stock" className="modal-label">Stock</label>
          </div>
        </div>

        {/* Assign to Business */}
        <div className="form-group">
          <div className="input-container">
            <select
              className="modal-select"
              id="business"
              value={selectedBusinessId}
              onChange={(e) => setSelectedBusinessId(e.target.value)}
              required
            >
              {businesses.map(business => (
                <option key={business.id} value={business.id}>
                  {business.name} {/* Show business name in the dropdown */}
                </option>
              ))}
            </select>
            <label htmlFor="business" className="modal-label">Assign to Business</label>
          </div>
        </div>

        {/* Image URL Input */}
        <div className="form-group">
          <div className="input-container">
            <input
              type="text"
              className="modal-input"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter image URL"
            />
            <label htmlFor="imageUrl" className="modal-label">Image URL</label>
          </div>
        </div>

        {/* Image Preview */}
        {imageUrl && (
          <div className="form-group">
            <img 
              src={imageUrl} 
              alt="Product Preview" 
              style={{ width: '200px', height: 'auto', marginTop: '10px', cursor: 'pointer' }} 
              onClick={() => setIsImageModalOpen(true)} // Open image modal on click
            />
          </div>
        )}

        {/* Image Modal for bigger view */}
        {isImageModalOpen && (
          <div className="image-modal-overlay" onClick={() => setIsImageModalOpen(false)}>
            <div className="image-modal-content" onClick={e => e.stopPropagation()}>
              <img src={imageUrl} alt="Product Full" style={{ width: '500px', height: 'auto' }} />
              <button onClick={() => setIsImageModalOpen(false)} className="close-image-modal">
                Close
              </button>
            </div>
          </div>
        )}

        {/* Modal Buttons */}
        <div className="modal-buttons">
          <button type="submit" className="save-btn" onClick={handleSubmit}>
            Save
          </button>
          <button type="button" className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default CRMProductsDetails;
