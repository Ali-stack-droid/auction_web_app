import { useEffect, useState } from 'react';
// import { ApolloProvider } from '@apollo/client';
// import { client } from 'src/apolloClient/client'; // Apollo client import
import Routing from './routes/Routing'; // Import your routing setup
import { Box } from '@mui/material';
import Authentication from './components/authentication/Authentication';

function App(props: any) {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Use boolean instead of 0/1

  // Check authentication status on component mount
  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    // <ApolloProvider client={client}>
    <Box>
      {/* Render authentication if not authenticated */}
      {!isAuthenticated && <Authentication history={props.history} />}

      {/* Render Routing component if authenticated */}
      {isAuthenticated && <Routing />}
    </Box>
    // </ApolloProvider>
  );
}

export default App;
