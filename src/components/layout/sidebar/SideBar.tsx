import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import useSideBarStyles from './SideBarStyles';

const SideBar = () => {
    const classes = useSideBarStyles();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/logout');
    };

    return (
        <Box className={classes.sideBarContainer}>
            {/* Logo */}
            <h1 className={classes.logo}>LOGO</h1>

            {/* Navigation Buttons */}
            <Button
                className={classes.navButton}
                onClick={() => navigate('/dashboard')}
            >
                Dashboard
            </Button>
            <Button
                className={classes.navButton}
                onClick={() => navigate('/auction')}
            >
                Auction
            </Button>
            <Button
                className={classes.navButton}
                onClick={() => navigate('/livestreaming')}
            >
                Live Streaming
            </Button>
            <Button
                className={classes.navButton}
                onClick={() => navigate('/paymenttracking')}
            >
                Payment Tracking
            </Button>

            {/* Logout Button */}
            <Button
                className={classes.logoutButton}
                onClick={handleLogout}
                color="error"
            >
                Logout
            </Button>
        </Box>
    );
};

export default SideBar;
