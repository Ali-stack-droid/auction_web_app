import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';

// Page Components
const Login = React.lazy(() => import('../components/authentication/Login'));
// const SideBarWrapper = React.lazy(() => import('../components/sidebar/SideBarWrapper'));
const Dashboard = React.lazy(() => import('../components/sidebar/SideBarWrapper'));
const Auction = React.lazy(() => import('../components/sidebar/SideBarWrapper'));
const LiveStreaming = React.lazy(() => import('../components/sidebar/SideBarWrapper'));
const PaymentTracking = React.lazy(() => import('../components/sidebar/SideBarWrapper'));

const AppRoutes = ({ isAuthenticated, setIsAuthenticated }: { isAuthenticated: boolean, setIsAuthenticated: any }) => {



    const Logout = () => {
        setIsAuthenticated(false);
        return (<></>)
    }


    return (
        <Box style={{ display: 'flex' }}>
            {/* Sidebar: Show it only when authenticated */}
            {/* {isAuthenticated && <SideBar setIsAuthenticated={setIsAuthenticated} />} */}

            {/* Main Content Area */}
            <Box style={{ flex: 1, padding: '20px' }}>
                <Routes>
                    {/* Login Route */}
                    <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="logout" element={<Logout />} />

                    {/* Protected Routes (Only for authenticated users) */}
                    {isAuthenticated && (
                        <Route
                            path="/*"
                            element={
                                <Routes>
                                    <Route path="dashboard" element={<Dashboard />} />
                                    <Route path="auction" element={<Auction />} />
                                    <Route path="livestreaming" element={<LiveStreaming />} />
                                    <Route path="paymenttracking" element={<PaymentTracking />} />
                                </Routes>
                            }
                        />
                    )}
                </Routes>
            </Box>
        </Box>
    );
};

export default AppRoutes;
