import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase/supabaseClient'; // Adjust the path as needed
import { fetchCurrentUser } from '../../supabase/userOperations'; // Import the fetchCurrentUser function
import LeadDetails from '../../components/crm/leads/LeadDetails';
import './CrmLeads.css'; // Ensure this CSS file is updated

function CrmLeads() {
  const [leads, setLeads] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLead, setSelectedLead] = useState(null); // Track selected lead for editing
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal state

  useEffect(() => {
    const fetchUserAndLeads = async () => {
      const user = await fetchCurrentUser(); // Fetch the current user

      if (!user) {
        console.error('No user found');
        return;
      }

      // Log the user object for debugging
      console.log('Fetched user:', user);

      // Fetch the user's businesses from the users_businesses table
      const { data: userBusinessesData, error: businessesError } = await supabase
        .from('users_businesses')
        .select('business_id') // Use business_id if that's the correct column
        .eq('user_id', user.id); // Match the current user's ID

      if (businessesError) {
        console.error('Error fetching user businesses:', businessesError);
        return;
      }

      const businessIds = userBusinessesData.map(b => b.business_id); // Update this to business_id
      
      if (businessIds.length === 0) {
        console.warn('No businesses found for this user');
        return; // Exit if there are no business IDs
      }
      
      // Fetch leads related to the businesses
      const { data: leadsData, error: leadsError } = await supabase
        .from('leads')
        .select('*')
        .in('business_uuid', businessIds); // Change to business_id to match the leads table

      if (leadsError) {
        console.error('Error fetching leads:', leadsError);
      } else {
        setLeads(leadsData);
      }
    };

    fetchUserAndLeads();
  }, []);

  const handleAction = (lead, actionType) => {
    if (actionType === 'edit') {
      setSelectedLead(lead);
      setIsModalOpen(true);
    } else if (actionType === 'delete') {
      handleDelete(lead.id); // Call delete function
    }
  };

  const handleDelete = async (leadId) => {
    const { error } = await supabase
      .from('leads')
      .delete()
      .eq('id', leadId);
      
    if (error) {
      console.error('Error deleting lead:', error);
    } else {
      // After deletion, we can refresh the leads list
      fetchUserAndLeads(); // Refresh leads after deletion
    }
  };

  const filteredLeads = leads.filter(lead =>
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.interest.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleModalClose = () => {
    setSelectedLead(null);
    setIsModalOpen(false);
    fetchUserAndLeads(); // Refresh leads after editing
  };

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
          <button className="add-lead-button" onClick={() => handleAction(null, 'edit')}>
            Add Lead
          </button>
        </div>
      </div>
      <table className="leads-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Interest</th>
            <th>Created At</th>
            <th>Source</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredLeads.map(lead => (
            <tr key={lead.id}>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>{lead.message}</td>
              <td>{lead.interest}</td>
              <td>{new Date(lead.created_at).toLocaleString()}</td>
              <td>{lead.source}</td>
              <td>{lead.status}</td>
              <td>
                <button
                  className="action-button edit"
                  onClick={() => handleAction(lead, 'edit')}
                >
                  Edit
                </button>
                <button
                  className="action-button delete"
                  onClick={() => handleAction(lead, 'delete')}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && selectedLead && (
        <LeadDetails lead={selectedLead} onClose={handleModalClose} />
      )}
    </div>
  );
}

export default CrmLeads;
