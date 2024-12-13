import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SideBar from '../components/sidebar/SideBar';
import { Box } from '@mui/material';

// Page Components
const Dashboard = () => <div>Dashboard Page</div>;
const Auction = () => <div>Auction Page</div>;
const LiveStreaming = () => <div>Live Streaming Page</div>;
const PaymentTracking = () => <div>Payment Tracking Page</div>;
const Login = React.lazy(() => import('../components/authentication/Login'));  // Lazy load Login component

const AppRoutes = ({ isAuthenticated, setIsAuthenticated }: { isAuthenticated: boolean, setIsAuthenticated: any }) => {
    return (
        <Router>
            <Box style={{ display: 'flex' }}>
                {/* Sidebar: Show it only when authenticated */}
                {isAuthenticated && <SideBar />}

                {/* Main Content Area */}
                <Box style={{ flex: 1, padding: '20px' }}>
                    <Routes>
                        {/* Login Route */}
                        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login setIsAuthenticated={setIsAuthenticated} />} />

                        {/* Protected Routes (Only for authenticated users) */}
                        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
                        <Route path="/auction" element={isAuthenticated ? <Auction /> : <Navigate to="/" />} />
                        <Route path="/livestreaming" element={isAuthenticated ? <LiveStreaming /> : <Navigate to="/" />} />
                        <Route path="/paymenttracking" element={isAuthenticated ? <PaymentTracking /> : <Navigate to="/" />} />

                    </Routes>
                </Box>
            </Box>
        </Router>
    );
};

export default AppRoutes;
