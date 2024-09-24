import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { fetchCurrentUser } from '../../../supabase/userOperations';
import { supabase } from '../../../supabase/supabaseClient';

const MapOverview = () => {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        // Fetch the current user
        const user = await fetchCurrentUser();

        // Fetch the user's businesses from the users_businesses table
        const { data: userBusinessesData, error: businessesError } = await supabase
          .from('users_businesses')
          .select('business_id') // Get only the business IDs
          .eq('user_id', user.id); // Match the current user's ID

        if (businessesError) {
          throw new Error(businessesError.message);
        }

        // Fetch detailed business information for each business ID
        const businessesData = await Promise.all(userBusinessesData.map(async (userBusiness) => {
          const { data: businessData, error: businessError } = await supabase
            .from('businesses') // Ensure you're targeting the correct table
            .select('*') // Fetch all columns; adjust as necessary
            .eq('id', userBusiness.business_id)
            .single(); // Assuming business IDs are unique

          if (businessError) {
            throw new Error(businessError.message);
          }

          return businessData;
        }));

        // Filter businesses to only include those with valid latitude and longitude
        const validBusinesses = businessesData.filter(business => 
          business.latitude !== null && business.longitude !== null
        );

        setBusinesses(validBusinesses);
      } catch (error) {
        console.error('Error fetching businesses:', error);
      }
    };

    fetchBusinesses();
  }, []);

  return (
    <div className="map-container">
      <h2>Map Overview</h2>
      <MapContainer center={[-30.5595, 22.9375]} zoom={6} className="leaflet-container">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {businesses.map(business => (
          <Marker key={business.id} position={[business.latitude, business.longitude]}>
            <Popup>
              <strong>{business.name}</strong><br />
              {business.slogan} {/* Modify as per your business data structure */}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapOverview;
