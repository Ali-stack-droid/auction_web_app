import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Auction from '../Auction';
// import Lots from '../lots/Lots';

const AuctionRoutes = () => {
    return (
        <Routes>
            {/* Auction Routes */}
            <Route path="current-auctions" element={<Auction type="current-auctions" />} />
            <Route path="past-auctions" element={<Auction type="past-auctions" />} />
            <Route path="create-auction" element={<Auction type="create-auctions" />} />
            <Route path="create-auction/:id" element={<Auction type="edit-auctions" />} />

            {/* Lots Routes */}
            <Route path="current-lots" element={<Auction type="current-lots" />} />
            <Route path="past-lots" element={<Auction type="past-lots" />} />
            <Route path="edit-lots" element={<Auction type="past-lots" />} />
        </Routes>
    );
};

export default AuctionRoutes;
