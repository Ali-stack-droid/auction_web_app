import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Grid,
    Menu,
    MenuItem,
    Typography,
    Container,
    Fade,
    ToggleButton,
    ToggleButtonGroup,
} from '@mui/material';
import theme from '../../theme';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AuctionCard from './AuctionCard';
import auctionData from './auctionData';

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
        setFadeIn(false); // Trigger fade-in after data has been filtered
        setTimeout(() => {
            setFadeIn(true); // Trigger fade-in after data has been filtered
            setFilteredData(newFilteredData);
        }, 200);
    }, [isCurrentAuction, selectedLocation]);

    return (
        <Box sx={{ padding: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                {/* Title */}
                <Typography sx={{ fontSize: 24, fontWeight: 600, color: theme.palette.primary.main }}>
                    {isCurrentAuction ? 'Current Auctions' : 'Past Auctions'}
                </Typography>

                {/* Buttons */}
                <Box display="flex" gap={2}>
                    {/* Add Auction Button */}
                    {isCurrentAuction && (
                        <Button
                            variant="outlined"
                            sx={{ textTransform: 'none', color: theme.palette.primary.main5, borderColor: theme.palette.primary.main }}
                        >
                            Add Auction
                        </Button>
                    )}

                    {/* Toggle Buttons */}
                    <ToggleButtonGroup
                        color="primary"
                        value={isCurrentAuction ? 'current' : 'past'}
                        exclusive
                        onChange={() => setIsCurrentAuction((prev) => !prev)}
                        aria-label="Auction Type"
                    >
                        <ToggleButton
                            value="current"
                            sx={{
                                textTransform: 'none',
                                backgroundColor: isCurrentAuction ? `${theme.palette.primary.main} !important` : "inherit",
                                color: (isCurrentAuction ? "white" : theme.palette.primary.main5),
                                transition: 'background 0.2s ease-in-out, color 0.2s ease-in-out',
                            }}
                        >
                            Current Auctions
                        </ToggleButton>
                        <ToggleButton
                            value="past"
                            sx={{
                                textTransform: 'none',
                                backgroundColor: isCurrentAuction ? "inherit" : `${theme.palette.primary.main} !important`,
                                color: (isCurrentAuction ? theme.palette.primary.main5 : "white") + " !important",
                                transition: 'background 0.2s ease-in-out, color 0.2s ease-in-out',
                            }}
                        >
                            Past Auctions
                        </ToggleButton>
                    </ToggleButtonGroup>

                    {/* Filter Button */}
                    <Button
                        variant="contained"
                        sx={{ textTransform: 'none', backgroundColor: theme.palette.primary.main }}
                        onClick={handleMenuOpen}
                        startIcon={<FilterAltIcon />}
                    >
                        Filter
                    </Button>

                    {/* Menu with Locations */}
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                        {['New York, USA', 'United Kingdom, London', 'Pakistan, Islamabad'].map((location) => (
                            <MenuItem
                                key={location}
                                onClick={() => handleFilterChange(location)}
                                sx={{
                                    backgroundColor: selectedLocation === location ? 'rgba(47, 131, 233, 0.2)' : 'inherit',
                                    '&:hover': {
                                        backgroundColor: selectedLocation === location ? 'rgba(47, 131, 233, 0.2)' : 'rgba(0,0,0,0.1)',
                                    },
                                }}
                            >
                                {location}
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </Box>

            {/* Auction Cards */}
            <Fade in={fadeIn} timeout={200}>
                <Container disableGutters maxWidth={false} sx={{ mt: 4 }}>
                    <Grid container spacing={3}>
                        {filteredData.map((auction: any) => (
                            <Grid item xs={12} sm={6} md={4} xl={3} key={auction.id}>
                                <AuctionCard auction={auction} />
                            </Grid>
                        ))}
                    </Grid>
                </Container >
            </Fade>
        </Box>
    );
};

export default Auction;
