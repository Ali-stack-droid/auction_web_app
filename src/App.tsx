import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Use BrowserRouter instead of Router
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
    // Already under a Router.
    <Routing isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />

  );
}

export default App;
