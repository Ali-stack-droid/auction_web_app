import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useLocation } from 'react-router-dom'; // Import useLocation
import Carousel from './login/Carousal';
import LoginForm from './login/LoginForm';
import ForgotPassword from './login/ForgotPassword';
import { useState } from 'react';
import ResetPassword from './login/ResetPaswword';

const Login = ({ setIsAuthenticated }: any) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if screen is mobile

    // Get the current location
    const location = useLocation();

    const [forgotPassword, setForgotPassword] = useState(false)

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

            {/* Login or Forgot Password form on the right */}
            <Box
                flex={1}
                display="flex"
                justifyContent="center"
                alignItems="center"
                overflow="hidden"
            >
                {/* Conditionally render LoginForm or ForgotPasswordForm based on the URL */}
                {forgotPassword ? (
                    // <ForgotPassword setForgotPassword={setForgotPassword} />
                    <ResetPassword />
                ) : (
                    <LoginForm setIsAuthenticated={setIsAuthenticated} setForgotPassword={setForgotPassword} />
                )}
            </Box>
        </Box>
    );
};

export default Login;
