import { useEffect, useState } from 'react';
import Routing from './routes/Routing';
import { Box } from '@mui/material';
import { io } from 'socket.io-client';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;
  const socket = io(SOCKET_URL, { transports: ["websocket"] });

  useEffect(() => {
    // Handle connection open
    // socket.on("connect", () => {
    //   console.log("Socket.IO connection established");

    //   // Example: Send an initial message to the server if needed
    //   // socket.on("testing-event", handleMessages);
    // });

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
