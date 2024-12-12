import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import SideBar from '../components/sidebar/SideBar';

// Page Components
const Dashboard = () => <div>Dashboard Page</div>;
const Auction = () => <div>Auction Page</div>;
const LiveStreaming = () => <div>Live Streaming Page</div>;
const PaymentTracking = () => <div>Payment Tracking Page</div>;

const Logout = () => {
    const navigate = useNavigate();
    // Logout Logic Here
    const handleLogout = () => {
        console.log('Logged out successfully');
        navigate('/'); // Redirect to the login or home page
    };

    return (
        <button onClick={handleLogout} style={{ marginTop: '20px' }}>
            Logout
        </button>
    );
};

const AppRoutes = () => {
    return (
        <Router>
            <div style={{ display: 'flex' }}>
                {/* Sidebar */}
                <SideBar />

                {/* Main Content */}
                <div style={{ flex: 1, padding: '20px' }}>
                    <Routes>
                        <Route path="/" element={<Navigate to="/dashboard" />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/auction" element={<Auction />} />
                        <Route path="/livestreaming" element={<LiveStreaming />} />
                        <Route path="/paymenttracking" element={<PaymentTracking />} />
                        <Route path="/logout" element={<Logout />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default AppRoutes;
