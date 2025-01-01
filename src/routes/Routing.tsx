import React, { Suspense, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import TempComponent from './TempComponent';
import AppProvider from '../components/layout/AppProvider';
import Auction from '../components/auction/Auction';
import Lots from '../components/auction/Lots';
import LotDetailPage from '../components/auction/detail-pages/LotDetailPage';
import AuctionDetailPage from '../components/auction/detail-pages/AuctionDetailPage';
import CreatePage from '../components/auction/create-edit-pages/CreatePage';
import LiveStreamingDetailPage from '../components/auction/detail-pages/LiveStreamingDetailPage';
import { ToastContainer } from 'react-toastify';
// import AuctionRoutes from '../components/auction/routes/AuctionRoutes';

// Page Components
const Login = React.lazy(() => import('../components/authentication/Login'));
const Dashboard = React.lazy(() => import('../components/dashboard/Dashboard'));
// const Auction = React.lazy(() => import('../components/auction/Auction'));
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
    const [selectedAuction, setSelectedAuction] = useState(0)
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
                            path="/auction"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <Auction />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/auction/create"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <CreatePage type={"auction"} />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/auction/edit/*"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <CreatePage type={"auction"} />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/auction/lots/edit/*"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <CreatePage type={"lots"} />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/auction/lots"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <Lots />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/auction/lots/details"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <LotDetailPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/auction/details"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <AuctionDetailPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/live-streaming/details"
                            element={
                                <ProtectedRoute isAuthenticated={isAuthenticated}>
                                    <LiveStreamingDetailPage />
                                    {/* <h1>Sorry! This page is under development.</h1> */}
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
                <ToastContainer />
            </Box>
        </Box>
    );
};

export default Routing;
