import React, { useState, useEffect } from 'react';
import { fetchCurrentUser } from '../../supabase/userOperations'; // Ensure this function is defined correctly to fetch the current user
import { supabase } from '../../supabase/supabaseClient';
import * as XLSX from 'xlsx'; // Importing XLSX library
import './CrmServices.css'; // Ensure this CSS file contains styles for table, header, hover effect, and modals

function CrmServices() {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [importFile, setImportFile] = useState(null); // State for the import file
  const [userBusinesses, setUserBusinesses] = useState([]); // State for user businesses

  useEffect(() => {
    // Fetch current user and their businesses
    async function fetchUserAndServices() {
      try {
        // Fetch current user
        const user = await fetchCurrentUser();
        if (!user) {
          console.error('No user found');
          return;
        }

        // Fetch user businesses
        const { data: userBusinessesData, error: businessesError } = await supabase
          .from('users_businesses')
          .select('business_id')
          .eq('user_id', user.id);

        if (businessesError) {
          throw businessesError;
        }

        const businessIds = userBusinessesData.map(entry => entry.business_id);
        setUserBusinesses(businessIds);

        // Fetch services related to the user's businesses
        const { data, error } = await supabase
          .from('services')
          .select('*, businesses (name)')
          .in('shop_id', businessIds); // Ensure this matches your service's foreign key

        if (error) {
          throw error;
        }

        setServices(data);
        setFilteredServices(data); // Initially display all services
      } catch (error) {
        console.error('Error fetching user or services:', error);
      }
    }

    fetchUserAndServices();
  }, []);

  const handleRowClick = (service) => {
    setSelectedService(service);
  };

  const filteredServicesList = services.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredServices);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Services');
    XLSX.writeFile(wb, 'services.xlsx');
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

      // Assuming the Excel data contains the same keys as your services table
      const { error } = await supabase
        .from('services')
        .insert(jsonData);

      if (error) {
        console.error('Error importing services:', error);
      } else {
        // Refresh services after import
        fetchUserAndServices(); // Fetch services again after import
      }
    };
    reader.readAsArrayBuffer(importFile);
  };

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
            Import Services
          </button>
        </div>
      </div>

      <table className="services-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Call Out Fee</th>
            <th>Business</th> {/* New column for business */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredServicesList.map(service => (
            <tr key={service.id} onClick={() => handleRowClick(service)} className="service-row">
              <td>{service.id}</td>
              <td>{service.name}</td>
              <td>{service.description}</td>
              <td>R{service.price}</td>
              <td>R{service.call_out_fee}</td>
              <td>{service.businesses?.name || 'N/A'}</td> {/* Display related business name */}
              <td>
                <button className="action-button edit">
                  Edit
                </button>
                <button className="action-button delete">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for adding service */}
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
              <div>
                <label>Price:</label>
                <input type="number" step="0.01" required />
              </div>
              <div>
                <label>Call Out Fee:</label>
                <input type="number" step="0.01" required />
              </div>
              <div>
                <label>Assign to Business:</label>
                <select required>
                  {userBusinesses.map(business => (
                    <option key={business.id} value={business.id}>
                      {business.name}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="action-button">Add</button>
              <button type="button" onClick={() => setShowAddServiceModal(false)} className="action-button">
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal for viewing service details */}
      {selectedService && (
        <div className="modal-overlay" onClick={() => setSelectedService(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>Service Details</h2>
            <p><strong>ID:</strong> {selectedService.id}</p>
            <p><strong>Name:</strong> {selectedService.name}</p>
            <p><strong>Description:</strong> {selectedService.description}</p>
            <p><strong>Price:</strong> ${selectedService.price}</p>
            <p><strong>Call Out Fee:</strong> ${selectedService.call_out_fee}</p>
            <p><strong>Business:</strong> {selectedService.businesses?.name || 'N/A'}</p> {/* Show business name */}
            <button onClick={() => setSelectedService(null)} className="action-button">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CrmServices;
