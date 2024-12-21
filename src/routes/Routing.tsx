import React, { Suspense } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import TempComponent from './TempComponent';
import AppProvider from '../components/layout/AppProvider';
import AuctionRoutes from '../components/auction/routes/AuctionRoutes';

// Page Components
const Login = React.lazy(() => import('../components/authentication/Login'));
const Dashboard = React.lazy(() => import('../components/dashboard/Dashboard'));
const Auction = React.lazy(() => import('../components/auction/Auction'));
const LiveStreaming = React.lazy(() => import('../components/live-streaming/LiveStreaming'));
const PaymentTracking = React.lazy(() => import('../components/payment-tracking/PaymentTracking'));

// ProtectedRoute Component
const ProtectedRoute = ({ isAuthenticated, children }: any) => {
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }
    return <AppProvider>{children}</AppProvider>;
};

const Routing = ({ isAuthenticated, setIsAuthenticated }: any) => {

    return (
        <Box style={{ display: 'flex' }}>
            {/* Main Content Area */}
            <Box style={{ flex: 1 }}>
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        {/* Login Route */}
                        <Route
                            path="/login"
                            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login setIsAuthenticated={setIsAuthenticated} />}
                        />

                        <Route path="/forgot-password" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                        <Route path="/reset-password" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                        <Route path="/new-password" element={<Login setIsAuthenticated={setIsAuthenticated} />} />

                        {/* Protected Routes */}
                        <Route
                            path="/"
                            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
                        />
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/auction/*"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <AuctionRoutes />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/live"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <LiveStreaming />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/payment"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <PaymentTracking />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/logout" element={<TempComponent setIsAuthenticated={setIsAuthenticated} />} />
                    </Routes>
                </Suspense>
            </Box>
        </Box>
    );
};

export default Routing;
