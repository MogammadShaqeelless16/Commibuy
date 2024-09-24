import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function Map({ mapCenter, mapZoom, business }) {
  return (
    business.latitude && business.longitude && (
      <div className="map-container">
        <h2>Location</h2>
        <MapContainer center={mapCenter} zoom={mapZoom} className="map">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={mapCenter}>
            <Popup>
              <strong>{business.name}</strong><br />
              {business.description}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    )
  );
}

export default Map;
