import React, { useState, useEffect } from 'react';
import './CrmOrders.css'; // Ensure this CSS file is updated

function CrmOrders() {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch orders from the API or database
    async function fetchOrders() {
      // Mock data or API call
      const data = [
        { id: 1, customer: 'John Doe', total: 100, date: '2023-09-01', status: 'Completed', notes: 'Delivered on time' },
        { id: 2, customer: 'Jane Smith', total: 50, date: '2023-09-10', status: 'Pending', notes: 'Waiting for payment' },
      ];
      setOrders(data);
    }

    fetchOrders();
  }, []);

  const handleAction = (orderId, actionType) => {
    // Implement action logic here, e.g., editing or deleting an order
    console.log(`Action ${actionType} for order ID ${orderId}`);
  };

  const filteredOrders = orders.filter(order =>
    order.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="crm-orders">
      <div className="header">
        <h1>Orders</h1>
        <div className="header-actions">
          <input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button className="add-order-button">
            Add Order
          </button>
        </div>
      </div>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Date</th>
            <th>Status</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>${order.total}</td>
              <td>{order.date}</td>
              <td>{order.status}</td>
              <td>{order.notes}</td>
              <td>
                <button
                  className="action-button edit"
                  onClick={() => handleAction(order.id, 'edit')}
                >
                  Edit
                </button>
                <button
                  className="action-button delete"
                  onClick={() => handleAction(order.id, 'delete')}
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

export default CrmOrders;
