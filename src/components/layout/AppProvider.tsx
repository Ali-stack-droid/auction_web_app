import React from 'react';
import { AppBar, Box, Grid, Toolbar, Typography } from '@mui/material';
import SideBar from './sidebar/SideBar';
import Header from './header/Header'; // Import your Header component

const AppProvider = ({ children }: any) => {
    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            {/* Sidebar on the left */}
            <SideBar />

            {/* Main content area */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Header on top */}
                <Header />

                {/* Content area below the header */}
                <Box sx={{ flex: 1, padding: '20px', marginTop: '64px', overflowY: 'auto' }}>
                    {/* The header is fixed, so we add marginTop to push the content down */}
                    {children}
                </Box>
            </Box>
        </Box>
    );
};

export default AppProvider;
