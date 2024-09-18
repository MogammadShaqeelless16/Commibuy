import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { checkAuth } from '../supabase/userOperations'; // Import your auth check

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    async function verifyAuth() {
      const authStatus = await checkAuth();
      setIsAuthenticated(authStatus);
    }
    verifyAuth();
  }, []);

  if (isAuthenticated === null) {
    // Show a loading state while checking authentication
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
