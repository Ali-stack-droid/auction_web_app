import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Menu,
    MenuItem,
    Typography,
    Fade,
    ToggleButton,
    ToggleButtonGroup,
} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import theme from '../../theme';
import auctionData from './auctionData';
import AuctionContent from './AuctionContent';

const Auction = () => {
    const [isCurrentAuction, setIsCurrentAuction] = useState(true); // Toggle between Current and Past Auctions
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // Menu anchor
    const [selectedLocation, setSelectedLocation]: any = useState(null); // Filter by location
    const [filteredData, setFilteredData] = useState(auctionData); // Filtered data state
    const [fadeIn, setFadeIn] = useState(false); // Fade control state

    // Handle Menu Open/Close
    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    // Handle Filter Selection
    const handleFilterChange = (location: string) => {
        setSelectedLocation((prev: any) => (prev === location ? null : location)); // Toggle location filter
        handleMenuClose(); // Close menu after selection
    };

    // Filtered Data based on `type` and `location`
    useEffect(() => {
        const newFilteredData = auctionData.filter((auction: any) => {
            const matchesType = auction.type === (isCurrentAuction ? "current" : "past");
            const matchesLocation = selectedLocation ? auction.location === selectedLocation : true;
            return matchesType && matchesLocation;
        });
        setFadeIn(false); // Trigger fade-out
        setTimeout(() => {
            setFadeIn(true); // Trigger fade-in after filtering
            setFilteredData(newFilteredData);
        }, 200);
    }, [isCurrentAuction, selectedLocation]);

    return (
        <AuctionContent
            isCurrentAuction={isCurrentAuction}
            setIsCurrentAuction={setIsCurrentAuction}
            anchorEl={anchorEl}
            handleMenuOpen={handleMenuOpen}
            handleMenuClose={handleMenuClose}
            handleFilterChange={handleFilterChange}
            selectedLocation={selectedLocation}
            fadeIn={fadeIn}
            filteredData={filteredData}
        />
    );
};

export default Auction;
