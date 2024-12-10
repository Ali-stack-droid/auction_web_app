import { Box } from '@mui/material';
import Carousel from './Carousal';
import LoginForm from './LoginForm';

const App = () => {
    return (
        <Box
            display="flex"
            minHeight="100vh"
            overflow="hidden" // Prevents overflow
        >
            {/* Carousel on the left */}
            <Carousel />

            {/* Login form on the right */}
            <Box
                flex={1}
                display="flex"
                justifyContent="center"
                alignItems="center"
                overflow="hidden" // Prevents overflow in the login section
            >
                <LoginForm />
            </Box>
        </Box>
    );
};

export default App;
