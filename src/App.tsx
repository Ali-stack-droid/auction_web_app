import { useEffect, useState } from 'react';
import Routing from './routes/Routing';
import { Box } from '@mui/material';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    // Check authentication status from localStorage
    const token = sessionStorage.getItem('authToken');
    setIsAuthenticated(!!token); // Set isAuthenticated based on token
    setLoading(false); // Authentication check complete
  }, []);

  if (loading) {
    // Show a loader until authentication is verified
    return <Box>Loading...</Box>
  }

  return <Routing isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />;
}

export default App;
