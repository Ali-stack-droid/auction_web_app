import { Box, Fade, useMediaQuery, useTheme } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Carousel from './login/Carousal';
import LoginForm from './login/LoginForm';
import ForgotPassword from './login/ForgotPassword';
import ResetPassword from './login/ResetPassword';
import SetNewPassword from './login/SetNewPassword';
import { useState, useEffect } from 'react';

const Login = ({ setIsAuthenticated }: any) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const location = useLocation();

    const [currentComponent, setCurrentComponent]: any = useState(null);
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        setFadeIn(false); // Trigger fade out
        const timer = setTimeout(() => {
            // Change the component after fade-out
            setCurrentComponent(() => {
                switch (location.pathname) {
                    case '/forgot-password':
                        return <ForgotPassword />;
                    case '/reset-password':
                        return <ResetPassword />;
                    case '/new-password':
                        return <SetNewPassword />;
                    default:
                        return <LoginForm setIsAuthenticated={setIsAuthenticated} />;
                }
            });
            setFadeIn(true); // Trigger fade in
        }, 300); // Match the fade-out duration

        return () => clearTimeout(timer); // Clean up the timer
    }, [location.pathname]);

    return (
        <Box
            display="flex"
            minHeight="92vh"
            overflow="hidden"
            flexDirection={isMobile ? 'column' : 'row'}
        >
            {/* Carousel */}
            <Box
                flex={1}
                display="flex"
                justifyContent="center"
                alignItems="center"
                overflow="hidden"
            >
                <Carousel />
            </Box>

            {/* Animated Component */}
            <Box
                flex={1}
                display="flex"
                justifyContent="center"
                alignItems="center"
                overflow="hidden"
            >
                <Fade in={fadeIn} timeout={300}>
                    <div style={{ width: '100%' }}>{currentComponent}</div>
                </Fade>
            </Box>
        </Box>
    );
};

export default Login;
