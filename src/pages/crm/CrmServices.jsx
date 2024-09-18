import React, { useState, useEffect } from 'react';
import './CrmServices.css'; // Ensure this CSS file contains styles for table, header, and actions

function CrmServices() {
  const [services, setServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);

  useEffect(() => {
    // Fetch services from the API or database
    async function fetchServices() {
      const data = [
        { id: 1, name: 'Service A', description: 'Basic service A description' },
        { id: 2, name: 'Service B', description: 'Basic service B description' },
      ];
      setServices(data);
    }

    fetchServices();
  }, []);

  const handleAction = (serviceId, actionType) => {
    console.log(`Action ${actionType} for service ID ${serviceId}`);
    // Add your edit/delete logic here
  };

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="crm-services">
      <div className="header">
        <h1>Services</h1>
        <div className="header-actions">
          <input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button className="add-service-button" onClick={() => setShowAddServiceModal(true)}>
            Add Service
          </button>
        </div>
      </div>

      <table className="services-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredServices.map(service => (
            <tr key={service.id}>
              <td>{service.id}</td>
              <td>{service.name}</td>
              <td>{service.description}</td>
              <td>
                <button
                  className="action-button edit"
                  onClick={() => handleAction(service.id, 'edit')}
                >
                  Edit
                </button>
                <button
                  className="action-button delete"
                  onClick={() => handleAction(service.id, 'delete')}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAddServiceModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add Service</h2>
            <form onSubmit={(e) => { e.preventDefault(); /* handleAddService logic */ }}>
              <div>
                <label>Name:</label>
                <input type="text" required />
              </div>
              <div>
                <label>Description:</label>
                <textarea required />
              </div>
              <button type="submit" className="action-button">Add</button>
              <button type="button" onClick={() => setShowAddServiceModal(false)} className="action-button">Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CrmServices;
