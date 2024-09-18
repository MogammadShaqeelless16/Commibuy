import { supabase } from './supabaseClient'; // Adjust the path as needed

// Fetch all businesses
export const fetchBusinesses = async () => {
  try {
    const { data, error } = await supabase
      .from('businesses')
      .select('*');

    if (error) throw error;
    
    console.log('Businesses fetched:', data);
    return data;
  } catch (error) {
    console.error('Error fetching businesses:', error);
    return null;
  }
};

// Add a new business
export const addBusiness = async (business) => {
  const { name, address, registered, active, email, contact_number } = business;
  try {
    const { data, error } = await supabase
      .from('businesses')
      .insert([{ name, address, registered, active, email, contact_number }]);

    if (error) throw error;
    
    console.log('Business added successfully:', data);
    return data;
  } catch (error) {
    console.error('Error adding business:', error);
    return null;
  }
};

// Update an existing business
export const updateBusiness = async (business) => {
  const { id, name, address, registered, active, email, contact_number } = business;
  try {
    const { error } = await supabase
      .from('businesses')
      .update({ name, address, registered, active, email, contact_number })
      .match({ id });

    if (error) throw error;

    console.log('Business updated successfully:', business);
    return business;
  } catch (error) {
    console.error('Error updating business:', error);
    return null;
  }
};
