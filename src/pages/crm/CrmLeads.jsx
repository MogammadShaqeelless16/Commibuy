import React, { useState, useEffect } from 'react';
import './CrmLeads.css'; // Ensure this CSS file is updated

function CrmLeads() {
  const [leads, setLeads] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    // Fetch leads from the API or database
    async function fetchLeads() {
      // Mock data or API call
      const data = [
        { id: 1, name: 'Alice Johnson', email: 'alice@example.com', phone: '123-456-7890', stage: 'Prospecting', source: 'Website' },
        { id: 2, name: 'Bob Brown', email: 'bob@example.com', phone: '987-654-3210', stage: 'Negotiation', source: 'Referral' },
      ];
      setLeads(data);
    }

    fetchLeads();
  }, []);

  const handleAction = (leadId, actionType) => {
    // Implement action logic here, e.g., editing or deleting a lead
    console.log(`Action ${actionType} for lead ID ${leadId}`);
  };

  const filteredLeads = leads.filter(lead =>
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.phone.includes(searchQuery)
  );

  return (
    <div className="crm-leads">
      <div className="header">
        <h1>Leads</h1>
        <div className="header-actions">
          <input
            type="text"
            placeholder="Search leads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button className="add-lead-button">
            Add Lead
          </button>
        </div>
      </div>
      <table className="leads-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Stage</th>
            <th>Source</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredLeads.map(lead => (
            <tr key={lead.id}>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>{lead.phone}</td>
              <td>{lead.stage}</td>
              <td>{lead.source}</td>
              <td>
                <button
                  className="action-button edit"
                  onClick={() => handleAction(lead.id, 'edit')}
                >
                  Edit
                </button>
                <button
                  className="action-button delete"
                  onClick={() => handleAction(lead.id, 'delete')}
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

export default CrmLeads;
