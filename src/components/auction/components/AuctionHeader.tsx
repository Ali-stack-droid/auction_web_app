import React, { useState } from 'react';
import { Box, Button, Typography, ToggleButton, ToggleButtonGroup, Menu, MenuItem } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import useAuctionHeaderStyles from './AuctionHeaderStyles';

const AuctionHeader = ({ type, isCurrent, onToggle, selectedLocation, setSelectedLocation }: any) => {
    const classes = useAuctionHeaderStyles();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleFilterChange = (location: string) => {
        setSelectedLocation((prev: any) => (prev === location ? null : location));
        handleMenuClose();
    };

    return (
        <Box className={classes.root}>
            <Typography className={classes.title}>
                {isCurrent ? 'Current Auctions' : 'Past Auctions'}
            </Typography>
            <Box className={classes.buttonContainer}>
                {isCurrent && (
                    <Button variant="outlined" className={classes.addAuctionButton}>
                        Add Auction
                    </Button>
                )}
                <Box className={classes.toggleContainer}>
                    <ToggleButtonGroup
                        value={isCurrent ? 'current' : 'past'}
                        exclusive
                        onChange={onToggle}
                        sx={{ maxHeight: '30px' }}
                    >
                        <ToggleButton
                            value="current"
                            className={`${classes.toggleButton} ${isCurrent ? 'current' : 'past'}`}
                        >
                            Current Auctions
                        </ToggleButton>
                        <ToggleButton
                            value="past"
                            className={`${classes.toggleButton} ${!isCurrent ? 'current' : 'past'}`}
                        >
                            Past Auctions
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>
                <Button
                    variant="contained"
                    className={classes.filterButton}
                    onClick={handleMenuOpen}
                    startIcon={<FilterAltIcon />}
                >
                    Filter
                </Button>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                    {['New York, USA', 'United Kingdom, London', 'Pakistan, Islamabad'].map((location) => (
                        <MenuItem
                            key={location}
                            onClick={() => handleFilterChange(location)}
                            className={`${classes.menuItem} ${selectedLocation === location ? 'selected' : ''
                                }`}
                        >
                            {location}
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
        </Box>
    );
};

export default AuctionHeader;
