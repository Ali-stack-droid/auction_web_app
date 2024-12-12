import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';

const SideBar = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                width: 250,
                height: '100vh',
                backgroundColor: '#f5f5f5',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 2,
            }}
        >
            {/* Logo */}
            <div style={{ fontWeight: 'bold', marginBottom: '20px' }}>LOGO</div>

            {/* Navigation Buttons */}
            <Button fullWidth onClick={() => navigate('/dashboard')} sx={{ marginBottom: 2 }}>
                Dashboard
            </Button>
            <Button fullWidth onClick={() => navigate('/auction')} sx={{ marginBottom: 2 }}>
                Auction
            </Button>
            <Button fullWidth onClick={() => navigate('/livestreaming')} sx={{ marginBottom: 2 }}>
                Live Streaming
            </Button>
            <Button fullWidth onClick={() => navigate('/paymenttracking')} sx={{ marginBottom: 2 }}>
                Payment Tracking
            </Button>

            {/* Logout Button */}
            <Button fullWidth onClick={() => navigate('/logout')} color="error" sx={{ marginTop: 'auto' }}>
                Logout
            </Button>
        </Box>
    );
};

export default SideBar;
