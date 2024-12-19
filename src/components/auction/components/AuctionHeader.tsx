import React, { useState } from 'react';
import { Box, Button, Typography, ToggleButton, ToggleButtonGroup, Menu, MenuItem } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import theme from '../../../theme';

const AuctionHeader = ({ type, isCurrent, onToggle, selectedLocation, setSelectedLocation }: any) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // Menu anchor

    // Handle Menu Open/Close
    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    // Handle Filter Selection
    const handleFilterChange = (location: string) => {
        setSelectedLocation((prev: any) => (prev === location ? null : location)); // Toggle location filter
        handleMenuClose(); // Close menu after selection
    };

    return (
        <Box display="flex" justifyContent="space-between" alignItems="center">
            {/* Title */}
            <Typography sx={{ fontSize: 24, fontWeight: 600, color: theme.palette.primary.main }}>
                {isCurrent ? 'Current Auctions' : 'Past Auctions'}
            </Typography>

            {/* Buttons */}
            <Box display="flex" gap={2} maxHeight={40}>
                {/* Add Auction Button */}
                {isCurrent && (
                    <Button
                        variant="outlined"
                        sx={{
                            textTransform: 'none',
                            color: theme.palette.primary.main5,
                            borderColor: theme.palette.primary.main,
                        }}
                    >
                        Add Auction
                    </Button>
                )}

                {/* Toggle Buttons */}
                {(type === "current-auctions" || type === "past-auctions") &&
                    <Box display={'flex'} alignItems={'center'} justifyContent={'center'} sx={{ border: '1px solid #E2E8F0', height: '36.7', borderRadius: "5px", minWidth: 215 }}>
                        <ToggleButtonGroup
                            color="primary"
                            value={isCurrent ? 'current' : 'past'}
                            exclusive
                            onChange={onToggle}
                            aria-label="Auction Type"
                            sx={{ maxHeight: '30px' }}
                        >
                            <ToggleButton
                                value="current"
                                sx={{
                                    textTransform: 'none',
                                    fontSize: isCurrent ? 11 : 10,
                                    backgroundColor: isCurrent ? `${theme.palette.primary.main} !important` : "inherit",
                                    color: (isCurrent ? "white" : theme.palette.primary.main5) + " !important",
                                    transition: 'background 0.2s ease-in-out, color 0.2s ease-in-out',
                                    border: 'none',
                                    borderRadius: '5px !important',
                                }}
                            >
                                Current Auctions
                            </ToggleButton>
                            <ToggleButton
                                value="past"
                                sx={{
                                    textTransform: 'none',
                                    fontSize: isCurrent ? 10 : 11,
                                    backgroundColor: isCurrent ? "inherit" : `${theme.palette.primary.main} !important`,
                                    color: (isCurrent ? theme.palette.primary.main5 : "white") + " !important",
                                    transition: 'background 0.2s ease-in-out, color 0.2s ease-in-out',
                                    border: 'none',
                                    borderRadius: '5px !important',

                                }}
                            >
                                Past Auctions
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                }

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
                                backgroundColor: selectedLocation === location ? theme.palette.primary.main : 'inherit',
                                '&:hover': {
                                    backgroundColor: selectedLocation === location ? theme.palette.primary.main : theme.palette.primary.main6,
                                },
                            }}
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
