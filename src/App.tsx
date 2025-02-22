import { useEffect, useState } from 'react';
import Routing from './routes/Routing';
import { Box } from '@mui/material';
import useWebSocket from './utils/useSocket';
import { io } from 'socket.io-client';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const SOCKET_URL = 'ws://localhost:8181'; // Use 'ws' for WebSocket protocol
  const socket = new WebSocket(SOCKET_URL);
  useEffect(() => {

    // Handle connection open
    socket.onopen = () => {
      console.log('WebSocket connection established');
      // You can send an initial message to the server if needed
      // socket.send(JSON.stringify({ type: 'greeting', message: 'Hello Server' }));
    };

    sessionStorage.setItem('email', JSON.stringify('hassaan@gmail.com'));
    const token = sessionStorage.getItem('email');
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

  if (loading) {
    return <Box>Loading...</Box>
  }

  return <Routing isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} socket={socket} />;
}

export default App;
