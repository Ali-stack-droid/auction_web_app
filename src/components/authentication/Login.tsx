import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useLocation } from 'react-router-dom'; // Import useLocation
import Carousel from './login/Carousal';
import LoginForm from './login/LoginForm';
import ForgotPassword from './login/ForgotPassword';
import ResetPassword from './login/ResetPassword';
import SetNewPassword from './login/SetNewPassword';

const Login = ({ setIsAuthenticated }: any) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if screen is mobile

    // Get the current location
    const location = useLocation();

    let renderComponent;


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
                {location.pathname === '/forgot-password' ? <ForgotPassword />
                    : location.pathname === '/reset-password' ? <ResetPassword />
                        : location.pathname === '/set-new-password' ? <SetNewPassword />
                            : <LoginForm setIsAuthenticated={setIsAuthenticated} />}

            </Box>
        </Box>
    );
};

export default Login;
