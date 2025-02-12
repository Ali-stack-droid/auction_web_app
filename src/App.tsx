import { useEffect, useState } from 'react';
import Routing from './routes/Routing';
import { Box } from '@mui/material';
import { io } from 'socket.io-client';

const socket = io('ws://localhost:8181');

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // try {
    //   socket.on('connect', () => {

    //     console.log('Connected to socket server');
    //   });
    // } catch (error) {
    //   console.log("socket error ==", JSON.stringify(error, null, 2));
    // }

    sessionStorage.setItem('email', 'hassaan@gmail.com');
    const token = sessionStorage.getItem('email');
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

  if (loading) {
    return <Box>Loading...</Box>
  }

  return <Routing isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />;
}

export default App;
