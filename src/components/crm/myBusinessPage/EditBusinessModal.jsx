// MyBusinessPage/EditBusinessModal.js
import React from 'react';
import { FaSave, FaTimes } from 'react-icons/fa';
import './EditBusinessModal.css';

function EditBusinessModal({ editForm, onChange, onSave, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Business Website</h2>

        <div className="form-group">
          <div className="input-container">
            <input
              type="text"
              name="name"
              className="modal-input"
              id="name"
              value={editForm.name || ''}
              onChange={onChange}
              required
            />
            <label htmlFor="name" className="modal-label">Business Name</label>
          </div>
        </div>

                {/* Contact Number */}
                <div className="form-group">
          <div className="input-container">
            <input
              type="text"
              name="contact_number"
              className="modal-input"
              id="contact_number"
              value={editForm.contact_number || ''}
              onChange={onChange}
              required
            />
            <label htmlFor="contact_number" className="modal-label">Contact Number</label>
          </div>
        </div>

        <div className="form-group">
  <label htmlFor="primary_colour" className="modal-color-picker-label">Primary Colour</label>
  <div className="modal-color-picker-container">
    <input
      type="color"
      name="primary_colour"
      className="modal-color-picker"
      id="primary_colour"
      value={editForm.primary_colour || '#ffcc00'}
      onChange={onChange}
    />
  </div>
</div>

<div className="form-group">
  <label htmlFor="secondary_colour" className="modal-color-picker-label">Secondary Colour</label>
  <div className="modal-color-picker-container">
    <input
      type="color"
      name="secondary_colour"
      className="modal-color-picker"
      id="secondary_colour"
      value={editForm.secondary_colour || '#333333'}
      onChange={onChange}
    />
  </div>
</div>

        <div className="form-group">
          <div className="input-container">
            <textarea
              name="description"
              className="modal-input"
              id="description"
              value={editForm.description || ''}
              onChange={onChange}
              required
            />
            <label htmlFor="description" className="modal-label">Description</label>
          </div>
        </div>

        <div className="form-group">
          <div className="input-container">
            <input
              type="text"
              name="address"
              className="modal-input"
              id="address"
              value={editForm.address || ''}
              onChange={onChange}
              required
            />
            <label htmlFor="address" className="modal-label">Address</label>
          </div>
        </div>

        <div className="form-group">
          <div className="input-container">
            <input
              type="text"
              name="header_image"
              className="modal-input"
              id="header_image"
              value={editForm.header_image || ''}
              onChange={onChange}
              required
            />
            <label htmlFor="header_image" className="modal-label">Header Image URL</label>
          </div>
        </div>

        <div className="form-group">
          <div className="input-container">
            <input
              type="text"
              name="logo_url"
              className="modal-input"
              id="logo_url"
              value={editForm.logo_url || ''}
              onChange={onChange}
              required
            />
            <label htmlFor="logo_url" className="modal-label">Logo URL</label>
          </div>
        </div>

        <div className="form-group">
          <div className="input-container">
            <input
              type="text"
              name="facebook"
              className="modal-input"
              id="facebook"
              value={editForm.facebook || ''}
              onChange={onChange}
              required
            />
            <label htmlFor="facebook" className="modal-label">Facebook URL</label>
          </div>
        </div>

        <div className="form-group">
          <div className="input-container">
            <input
              type="text"
              name="social_media_twitter"
              className="modal-input"
              id="social_media_twitter"
              value={editForm.social_media_twitter || ''}
              onChange={onChange}
              required
            />
            <label htmlFor="social_media_twitter" className="modal-label">Twitter URL</label>
          </div>
        </div>

        <div className="form-group">
          <div className="input-container">
            <input
              type="text"
              name="instagram"
              className="modal-input"
              id="instagram"
              value={editForm.instagram || ''}
              onChange={onChange}
              required
            />
            <label htmlFor="instagram" className="modal-label">Instagram URL</label>
          </div>
        </div>

        <div className="form-group">
          <div className="input-container">
            <input
              type="text"
              name="linkedin"
              className="modal-input"
              id="linkedin"
              value={editForm.linkedin || ''}
              onChange={onChange}
              required
            />
            <label htmlFor="linkedin" className="modal-label">LinkedIn URL</label>
          </div>
        </div>

        <div className="form-group">
          <div className="input-container">
            <input
              type="email"
              name="email"
              className="modal-input"
              id="email"
              value={editForm.email || ''}
              onChange={onChange}
              required
            />
            <label htmlFor="email" className="modal-label">Email</label>
          </div>
        </div>

        <div className="form-group">
          <div className="input-container">
            <input
              type="text"
              name="longitude"
              className="modal-input"
              id="longitude"
              value={editForm.longitude || ''}
              onChange={onChange}
              required
            />
            <label htmlFor="longitude" className="modal-label">Longitude</label>
          </div>
        </div>

        <div className="form-group">
          <div className="input-container">
            <input
              type="text"
              name="latitude"
              className="modal-input"
              id="latitude"
              value={editForm.latitude || ''}
              onChange={onChange}
              required
            />
            <label htmlFor="latitude" className="modal-label">Latitude</label>
          </div>
        </div>

        <div className="form-group">
          <div className="input-container">
            <input
              type="text"
              name="slogan"
              className="modal-input"
              id="slogan"
              value={editForm.slogan || ''}
              onChange={onChange}
              required
            />
            <label htmlFor="slogan" className="modal-label">Slogan</label>
          </div>
        </div>

        <div className="form-group">
          <div className="input-container">
            <select
              name="template"
              className="modal-select"
              id="template"
              value={editForm.template || 'template1'}
              onChange={onChange}
            >
              <option value="template1">Standard Plan</option>
              <option value="template2">Gallary</option>
              <option value="template3">Service Showcase</option>
              <option value="template2">Product Showcase</option>
            </select>
            <label htmlFor="template" className="modal-label">Template</label>
          </div>
        </div>

        <div className="form-group">
          <div className="input-container">
            <select
              name="font"
              className="modal-select"
              id="font"
              value={editForm.font || 'Arial'}
              onChange={onChange}
            >
              <option value="Arial">Arial</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier New">Courier New</option>
              <option value="Verdana">Verdana</option>
              <option value="Georgia">Georgia</option>
            </select>
            <label htmlFor="font" className="modal-label">Font</label>
          </div>
        </div>

        <div className="modal-buttons">
          <button className="save-btn" onClick={onSave}>
            <FaSave /> Save
          </button>
          <button className="cancel-btn" onClick={onCancel}>
            <FaTimes /> Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditBusinessModal;
