import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom'; // Use BrowserRouter instead of Router
import Routing from './routes/Routing'; // Import your routing setup
import Login from './components/authentication/Login';

function App(props: any) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status from localStorage on component mount
    if (localStorage.getItem('token')) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <Box>
      {/* Render Login if not authenticated */}
      {isAuthenticated && <Login setIsAuthenticated={setIsAuthenticated} />}

      {/* Render Routing (authenticated pages) if authenticated */}
      {!isAuthenticated && <Routing isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />}
    </Box>
  );
}

export default App;
