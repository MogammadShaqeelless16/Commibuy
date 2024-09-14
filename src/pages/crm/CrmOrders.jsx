import React, { useState, useEffect } from 'react';
import './CrmOrders.css'; // Optional CSS

function CrmOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from the API or database
    async function fetchOrders() {
      // Mock data or API call
      const data = [
        { id: 1, customer: 'John Doe', total: 100, date: '2023-09-01' },
        { id: 2, customer: 'Jane Smith', total: 50, date: '2023-09-10' },
      ];
      setOrders(data);
    }

    fetchOrders();
  }, []);

  return (
    <div className="crm-orders">
      <h1>Orders</h1>
      <div className="orders-list">
        {orders.map(order => (
          <div key={order.id} className="order-card">
            <h2>Order #{order.id}</h2>
            <p>Customer: {order.customer}</p>
            <p>Total: ${order.total}</p>
            <p>Date: {order.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CrmOrders;
