import { supabase } from './supabaseClient'; // Adjust the path as needed

// Fetch all users with their roles
export const fetchUsersWithRoles = async () => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*, roles(role_name), users_businesses(businesses(name))');

    if (error) throw error;
    
    console.log('Users with roles and businesses fetched:', data);
    return data;
  } catch (error) {
    console.error('Error fetching users with roles and businesses:', error);
    return null;
  }
};

// Add a new user
export const addUser = async (user) => {
  const { username, email, role_id, businessIds } = user;
  try {
    const { data: newUser, error } = await supabase
      .from('users')
      .insert([{ username, email, role_id }]);

    if (error) throw error;

    const userId = newUser[0].id;

    // Insert business associations
    const businessEntries = businessIds.map(businessId => ({
      user_id: userId,
      business_id: businessId
    }));
    const { error: businessError } = await supabase
      .from('users_businesses')
      .insert(businessEntries);

    if (businessError) throw businessError;

    console.log('User added successfully:', newUser);
    return newUser;
  } catch (error) {
    console.error('Error adding user:', error);
    return null;
  }
};

// Update an existing user
export const updateUser = async (user) => {
  const { id, username, email, role_id, businessIds } = user;
  try {
    const { error } = await supabase
      .from('users')
      .update({ username, email, role_id })
      .match({ id });

    if (error) throw error;

    // Update business associations
    await supabase.from('users_businesses').delete().match({ user_id: id });

    const businessEntries = businessIds.map(businessId => ({
      user_id: id,
      business_id: businessId
    }));
    const { error: businessError } = await supabase
      .from('users_businesses')
      .insert(businessEntries);

    if (businessError) throw businessError;

    console.log('User updated successfully:', user);
    return user;
  } catch (error) {
    console.error('Error updating user:', error);
    return null;
  }
};
