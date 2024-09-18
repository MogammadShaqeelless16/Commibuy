import React, { useState, useEffect } from 'react';
import './CrmCustomers.css'; // Ensure this CSS file is updated

function CrmCustomers() {
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch customers from the API or database
    async function fetchCustomers() {
      // Mock data or API call
      const data = [
        { id: 1, name: 'John Doe', email: 'john@example.com', orders: 5 },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', orders: 2 },
      ];
      setCustomers(data);
    }

    fetchCustomers();
  }, []);

  const handleAction = (customerId, actionType) => {
    // Implement action logic here, e.g., editing or deleting a customer
    console.log(`Action ${actionType} for customer ID ${customerId}`);
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="crm-customers">
      <div className="header">
        <h1>Customers</h1>
        <div className="header-actions">
          <input
            type="text"
            placeholder="Search customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button className="add-customer-button">
            Add Customer
          </button>
        </div>
      </div>
      <table className="customers-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Orders</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map(customer => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.orders}</td>
              <td>
                <button
                  className="action-button edit"
                  onClick={() => handleAction(customer.id, 'edit')}
                >
                  Edit
                </button>
                <button
                  className="action-button delete"
                  onClick={() => handleAction(customer.id, 'delete')}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CrmCustomers;
