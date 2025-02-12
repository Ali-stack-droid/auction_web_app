import { useEffect, useState } from 'react';
import Routing from './routes/Routing';
import { Box } from '@mui/material';
import useWebSocket from './utils/useSocket';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  // const {  sendMessage, setUser, createRoom, joinRoom, leaveRoom, deleteRoom } = useWebSocket("ws://localhost:8181");
  

  useEffect(() => {
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
