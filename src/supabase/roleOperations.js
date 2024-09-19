import { supabase } from './supabaseClient'; // Adjust the path to your Supabase client

// Fetch roles from the database
export const fetchRoles = async () => {
  try {
    const { data, error } = await supabase
      .from('roles') // Assuming your table is named 'roles'
      .select('*');

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error fetching roles:', error.message);
    return [];
  }
};

// Add a new role (optional)
export const addRole = async (role) => {
  try {
    const { data, error } = await supabase
      .from('roles') // Assuming your table is named 'roles'
      .insert([role]);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error adding role:', error.message);
    return null;
  }
};

// Update an existing role (optional)
export const updateRole = async (roleId, updatedRole) => {
  try {
    const { data, error } = await supabase
      .from('roles') // Assuming your table is named 'roles'
      .update(updatedRole)
      .eq('id', roleId);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error updating role:', error.message);
    return null;
  }
};

// Delete a role (optional)
export const deleteRole = async (roleId) => {
  try {
    const { data, error } = await supabase
      .from('roles') // Assuming your table is named 'roles'
      .delete()
      .eq('id', roleId);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error deleting role:', error.message);
    return null;
  }
};
