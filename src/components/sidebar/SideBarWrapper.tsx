
import React from 'react';
import { Box } from '@mui/material';
import SideBar from './SideBar';

const SideBarWrapper = ({ children }: any) => {
    return (
        <Box style={{ display: 'flex', height: '100vh' }}>
            <SideBar />
            <Box style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>{children}</Box>
        </Box>
    );
};

export default SideBarWrapper;
