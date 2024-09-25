import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase/supabaseClient'; // Adjust the path as needed
import './BusinessManagementPage.css';

function BusinessManagementPage() {
  const [businesses, setBusinesses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);  // To distinguish between add and edit

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    const { data: businessesData, error } = await supabase
      .from('businesses') // Replace with your table name
      .select('*');

    if (error) {
      console.error('Error fetching businesses:', error);
    } else {
      setBusinesses(businessesData);
    }
  };

  // Handle Edit Button click
  const handleEdit = (business) => {
    setSelectedBusiness(business);
    setIsModalOpen(true);
    setIsEditMode(true); // Enable edit mode
  };

  // Handle Add Button click
  const handleAdd = () => {
    setSelectedBusiness({
      name: '',
      address: '',
      slug: '',  // Initialize slug field
      registered: false,
      active: false,
      email: '',
      contact_number: ''
    });
    setIsModalOpen(true);
    setIsEditMode(false); // Disable edit mode for adding a new business
  };

  const handleModalClose = () => {
    setSelectedBusiness(null);
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSelectedBusiness({
      ...selectedBusiness,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSave = async () => {
    if (isEditMode && selectedBusiness) {
      // Update the selected business
      const { error } = await supabase
        .from('businesses')
        .update({
          name: selectedBusiness.name,
          address: selectedBusiness.address,
          slug: selectedBusiness.slug,  // Include slug in the update
          registered: selectedBusiness.registered,
          active: selectedBusiness.active,
          email: selectedBusiness.email,
          contact_number: selectedBusiness.contact_number,
        })
        .eq('id', selectedBusiness.id);

      if (error) {
        console.error('Error updating business:', error);
      } else {
        setIsModalOpen(false);
        setSelectedBusiness(null);
        fetchBusinesses();
      }
    } else if (selectedBusiness) {
      // Add a new business
      const { error } = await supabase
        .from('businesses')
        .insert([{
          name: selectedBusiness.name,
          address: selectedBusiness.address,
          slug: selectedBusiness.slug,  // Include slug in the insert
          registered: selectedBusiness.registered,
          active: selectedBusiness.active,
          email: selectedBusiness.email,
          contact_number: selectedBusiness.contact_number,
        }]);

      if (error) {
        console.error('Error adding business:', error);
      } else {
        setIsModalOpen(false);
        setSelectedBusiness(null);
        fetchBusinesses();
      }
    }
  };

  const filteredBusinesses = businesses.filter((business) =>
    business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    business.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="business-management-page">
      <h1>Business Management</h1>

      {/* Add Business Button */}
      <div className="header">
        <button className="add-business-button" onClick={handleAdd}>
          Add Business
        </button>
      </div>

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search businesses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Business List */}
      <div className="business-list">
        {filteredBusinesses.length ? (
          filteredBusinesses.map((business) => (
            <div
              key={business.id}
              className="business-card"
              onClick={() => handleEdit(business)}
            >
              <h2>{business.name}</h2>
              <p>{business.address}</p>
              <p>{business.slug}</p> {/* Display the slug if needed */}
            </div>
          ))
        ) : (
          <p>No businesses found.</p>
        )}
      </div>

      {/* Modal for Adding/Editing Business */}
      {isModalOpen && selectedBusiness && (
        <div className="modal">
          <div className="modal-content">
            <h2>{isEditMode ? 'Edit Business' : 'Add Business'}</h2>
            <div className="form-group">
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={selectedBusiness.name}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Address:
                <input
                  type="text"
                  name="address"
                  value={selectedBusiness.address}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Slug:
                <input
                  type="text"
                  name="slug"
                  value={selectedBusiness.slug}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Registered:
                <input
                  type="checkbox"
                  name="registered"
                  checked={selectedBusiness.registered}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Active:
                <input
                  type="checkbox"
                  name="active"
                  checked={selectedBusiness.active}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Email:
                <input
                  type="text"
                  name="email"
                  value={selectedBusiness.email}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                Contact Number:
                <input
                  type="text"
                  name="contact_number"
                  value={selectedBusiness.contact_number}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="modal-actions">
              <button className="save-button" onClick={handleSave}>
                {isEditMode ? 'Save' : 'Add'}
              </button>
              <button className="cancel-button" onClick={handleModalClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BusinessManagementPage;
