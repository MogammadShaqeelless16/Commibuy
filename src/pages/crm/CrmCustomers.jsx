import React, { useState, useEffect } from 'react';
import './CrmCustomers.css'; // Optional CSS

function CrmCustomers() {
  const [customers, setCustomers] = useState([]);

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

  return (
    <div className="crm-customers">
      <h1>Customers</h1>
      <div className="customers-list">
        {customers.map(customer => (
          <div key={customer.id} className="customer-card">
            <h2>{customer.name}</h2>
            <p>{customer.email}</p>
            <p>Orders: {customer.orders}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CrmCustomers;
