import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';

const SideBar = ({ }: any) => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/logout')
    }

    return (
        <Box
            sx={{
                position: "sticky",
                left: 0,
                width: 250,
                height: '100vh',
                backgroundColor: '#f5f5f5',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            {/* Logo */}
            <h1 style={{ fontWeight: 'bold', marginBottom: '20px', padding: 10 }}>LOGO</h1>

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
            <Button fullWidth onClick={() => handleLogout()} color="error" sx={{ marginTop: 'auto' }}>
                Logout
            </Button>
        </Box>
    );
};

export default SideBar;
