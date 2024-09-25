import React, { useState } from 'react';
import { supabase } from '../../../supabase/supabaseClient'; // Adjust the path as needed


function LeadDetails({ lead, onClose }) {
  const [name, setName] = useState(lead.name);
  const [email, setEmail] = useState(lead.email);
  const [message, setMessage] = useState(lead.message);
  const [interest, setInterest] = useState(lead.interest);
  const [source, setSource] = useState(lead.source);
  const [status, setStatus] = useState(lead.status);

  const handleSave = async () => {
    const { error } = await supabase
      .from('leads')
      .update({
        name,
        email,
        message,
        interest,
        source,
        status,
      })
      .eq('id', lead.id);

    if (error) {
      console.error('Error updating lead:', error);
    } else {
      onClose(); // Close modal on successful save
    }
  };

  return (
    <div className="lead-details-modal">
      <div className="modal-content">
        <h2>Edit Lead</h2>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Message:</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Interest:</label>
          <input type="text" value={interest} onChange={(e) => setInterest(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Source:</label>
          <input type="text" value={source} onChange={(e) => setSource(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Prospecting">Prospecting</option>
            <option value="Negotiation">Negotiation</option>
            <option value="Closed">Closed</option>
            <option value="Lost">Lost</option>
          </select>
        </div>
        <div className="modal-actions">
          <button className="save-button" onClick={handleSave}>Save</button>
          <button className="cancel-button" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default LeadDetails;
