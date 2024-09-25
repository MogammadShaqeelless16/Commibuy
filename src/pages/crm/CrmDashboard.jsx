import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate replaces useHistory in React Router v6+
import DashboardCard from '../../components/crm/dashboard/DashboardCard';
import MapOverview from '../../components/crm/dashboard/MapOverview';
import SalesGraph from '../../components/crm/dashboard/SalesGraph';
import { fetchCurrentUser } from '../../supabase/userOperations';
import { supabase } from '../../supabase/supabaseClient'; // Import your Supabase client
import './CrmDashboard.css';

const CrmDashboard = () => {
  const navigate = useNavigate(); // useNavigate for navigation
  const [totalProducts, setTotalProducts] = useState(0); // State to hold total products
  const [totalLeads, setTotalLeads] = useState(0); // State to hold total leads

  const navigateTo = (path) => {
    navigate(path); // Updated navigation function using useNavigate
  };

  useEffect(() => {
    const fetchCounts = async () => {
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

        // If no businesses found, set total products and leads to 0
        if (!userBusinessesData || userBusinessesData.length === 0) {
          setTotalProducts(0);
          setTotalLeads(0);
          return;
        }

        // Extract the business IDs
        const businessIds = userBusinessesData.map(userBusiness => userBusiness.business_id);

        // Fetch all products associated with the user's businesses
        const { data: productsData, error: productsError } = await supabase
          .from('products') // Ensure you target the correct table
          .select('*') // Fetch all columns; adjust as necessary
          .in('shop_id', businessIds); // Fetch products where shop_id is in the user's business IDs

        if (productsError) {
          throw new Error(productsError.message);
        }

        // Set the total number of products
        setTotalProducts(productsData.length);

        // Fetch all leads associated with the user's businesses
        const { data: leadsData, error: leadsError } = await supabase
          .from('leads') // Ensure you target the correct table
          .select('*') // Fetch all columns; adjust as necessary
          .in('business_uuid', businessIds); // Fetch leads where business_id is in the user's business IDs

        if (leadsError) {
          throw new Error(leadsError.message);
        }

        // Set the total number of leads
        setTotalLeads(leadsData.length);
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="crm-dashboard">
      <h1>CRM Dashboard</h1>

      <div className="dashboard-overview">
        <DashboardCard 
          title="Total Customers" 
          endValue={150} 
          onClick={() => navigateTo('/crm/customers')} 
        />
        <DashboardCard 
          title="Total Orders" 
          endValue={500} 
          onClick={() => navigateTo('/crm/orders')} 
        />
        <DashboardCard 
          title="Total Products" 
          endValue={totalProducts} // Use the fetched total products count
          onClick={() => navigateTo('/crm/products')} 
        />
        <DashboardCard 
          title="Total Leads" 
          endValue={totalLeads} // Use the fetched total leads count
          onClick={() => navigateTo('/crm/leads')} // Navigate to leads page
        />
      </div>

      {/* Map and Graph Section */}
      <div className="dashboard-map-graph">
        <MapOverview />
        <SalesGraph />
      </div>
    </div>
  );
};

export default CrmDashboard;
