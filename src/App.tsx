import { useEffect, useState } from 'react';
import Routing from './routes/Routing';
import { Box } from '@mui/material';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './components/Redux/store';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); 
    setLoading(false);
  }, []);

  if (loading) {
    return <Box>Loading...</Box>
  }

  return (
    <Provider store={store}>
      <PersistGate loading={<Box>Loading...</Box>} persistor={persistor}>
        <Routing isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />;
      </PersistGate>
    </Provider>
  )

}

export default App;
