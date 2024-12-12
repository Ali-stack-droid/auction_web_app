import { Box, useMediaQuery, useTheme } from '@mui/material';
import Carousel from './Carousal';
import LoginForm from './LoginForm';

const App = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if screen is mobile

    return (
        <Box
            display="flex"
            minHeight="100vh"
            overflow="hidden"
            flexDirection={isMobile ? 'column' : 'row'} // Stack vertically on mobile
        >
            {/* Carousel on the left, only visible on non-mobile screens */}
            <Box
                flex={1}
                display="flex"
                justifyContent="center"
                alignItems="center"
                overflow="hidden"
            >
                <Carousel />
            </Box>

            {/* Login form on the right */}
            <Box
                flex={1}
                display="flex"
                justifyContent="center"
                alignItems="center"
                overflow="hidden"
            >
                <LoginForm />
            </Box>
        </Box>
    );
};

export default App;
