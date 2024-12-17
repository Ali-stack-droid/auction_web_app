import React, { useState } from 'react';
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    Menu,
    MenuItem,
    Typography,
    Card,
    CardContent,
    ToggleButton,
    ToggleButtonGroup,
    Container,
} from '@mui/material';
import theme from '../../theme';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AuctionCard from './AuctionCard';
import auctionData from './auctionData';

const Auction = () => {
    const [isCurrentAuction, setIsCurrentAuction] = useState(true); // Toggle between Current and Past Auctions
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // Menu anchor
    const [selectedFilter, setSelectedFilter]: any = useState('current');

    // Handle Menu Open/Close
    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    // Handle Filter Selection (single checkbox selection)
    const handleFilterChange = (value: string) => {
        setSelectedFilter((prev: any) => (prev === value ? null : value));
    };

    // Filtered Data based on selected location
    const filteredData = selectedFilter
        ? auctionData.filter((auction: any) => auction.location === selectedFilter)
        : auctionData;

    return (
        <Box sx={{ padding: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>

                {/* Left: Title */}
                <Typography sx={{ fontSize: 24, fontWeight: 600, color: theme.palette.primary.main }}>
                    {isCurrentAuction ? 'Current Auction' : 'Past Auction'}
                </Typography>

                {/* Right: Busttons */}
                <Box display="flex" gap={2}>

                    {/* Add Auction Button (visible only for Current Auctions) */}
                    {isCurrentAuction && (
                        <Button variant="outlined" sx={{ textTransform: 'none', color: '#212121', borderColor: theme.palette.primary.main }}>Add Auction</Button>
                    )}

                    <ToggleButtonGroup
                        color="primary"
                        value={isCurrentAuction ? 'current' : 'past'}
                        exclusive
                        onChange={() => setIsCurrentAuction((prev) => !prev)}
                        aria-label="Platform"
                    >
                        <ToggleButton value="current"
                            // size='small'
                            sx={{
                                textTransform: 'none',
                                backgroundColor: isCurrentAuction ? `${theme.palette.primary.main} !important` : "inherit",
                                color: isCurrentAuction ? "white !important" : "#212121 !important"
                                // color: isCurrentAuction ? theme.palette.primary.main : "inherit",
                            }}
                        >
                            Current Auction
                        </ToggleButton>
                        <ToggleButton value="past"
                            sx={{
                                textTransform: 'none',
                                backgroundColor: isCurrentAuction ? "inherit" : `${theme.palette.primary.main} !important`,
                                color: isCurrentAuction ? "#212121 !important" : "white !important",
                            }}
                        >
                            Past Auctions
                        </ToggleButton>
                    </ToggleButtonGroup>

                    {/* Filter Button */}
                    <Button variant="contained"
                        sx={{ textTransform: 'none', backgroundColor: theme.palette.primary.main }}
                        onClick={handleMenuOpen}
                        startIcon={<FilterAltIcon />}
                    >
                        Filter
                    </Button>
                    {/* Menu with Checkboxes */}
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                        {['New York, USA', 'United Kingdom, London', 'Pakistan, Islamabad'].map((location) => (
                            <MenuItem
                                key={location}
                                onClick={() => handleFilterChange(location)}
                                sx={{
                                    backgroundColor: selectedFilter === location ? 'rgba(47, 131, 233, 0.2)' : 'inherit',
                                    '&:hover': {
                                        backgroundColor: selectedFilter === location ? 'rgba(47, 131, 233, 0.2)' : 'rgba(0,0,0,0.1)',
                                    },
                                }}
                            >
                                {location}
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </Box>

            {/* Responsive Grid for Auction Cards */}
            {/* <Grid container spacing={2}>
                {filteredData.map((auction) => (
                    <Grid item xs={12} sm={6} md={4} key={auction.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{auction.title}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {auction.location}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid> */}

            <Container sx={{ mt: 4 }}>
                <Grid container spacing={3}>
                    {filteredData.map((auction: any) => (
                        <Grid item xs={12} sm={6} md={4} key={auction.id}>
                            <AuctionCard auction={auction} />
                        </Grid>
                    ))}
                </Grid>
            </Container>

        </Box >
    );
};

export default Auction;
