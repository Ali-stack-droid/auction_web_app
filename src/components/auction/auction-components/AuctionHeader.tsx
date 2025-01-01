import React, { useState } from 'react';
import { Box, Button, Typography, ToggleButton, ToggleButtonGroup, Menu, MenuItem } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import useAuctionHeaderStyles from './AuctionHeaderStyles';
import { useNavigate } from 'react-router-dom';
import { getQueryParam } from '../../../helper/GetQueryParam';

const AuctionHeader = ({
    headerType = 'auction', // Default to 'auction'
    isCurrent,
    onToggle,
    selectedLocation,
    setSelectedLocation
}: any) => {
    const classes = useAuctionHeaderStyles();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleFilterChange = (location: string) => {
        setSelectedLocation((prev: any) => (prev === location ? null : location));
        handleMenuClose();
    };

    const handleAddClick = () => {
        if (headerType === "auction" || headerType === "live") {
            navigate('/auction/create')
        } else {
            const selectedAuction = getQueryParam('aucId');
            navigate(`/auction/lots/create?aucId=${selectedAuction}`)
        }
    }

    return (
        <Box className={classes.root}>
            <Typography className={classes.title}>
                {headerType === 'live' ? "Live Streaming Auctions"
                    : isCurrent
                        ? `Current ${headerType === 'lots' ? 'Lots' : 'Auctions'}`
                        : `Past ${headerType === 'lots' ? 'Lots' : 'Auctions'}`}
            </Typography>
            <Box className={classes.buttonContainer}>

                {isCurrent && (
                    <Button variant={headerType === "live" ? "contained" : "outlined"}
                        className={headerType === "live" ? classes.addAuctionButtonLive : classes.addAuctionButton} onClick={handleAddClick}
                    >
                        Add {headerType === 'lots' ? 'Lot' : 'Auction'}
                    </Button>
                )}

                {headerType !== "live" &&
                    <React.Fragment>
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
                                    Current {headerType === 'lots' ? 'Lots' : 'Auctions'}
                                </ToggleButton>
                                <ToggleButton
                                    value="past"
                                    className={`${classes.toggleButton} ${!isCurrent ? 'current' : 'past'}`}
                                >
                                    Past {headerType === 'lots' ? 'Lots' : 'Auctions'}
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
                                    className={`${classes.menuItem} ${selectedLocation === location ? 'selected' : ''}`}
                                >
                                    {location}
                                </MenuItem>
                            ))}
                        </Menu>
                    </React.Fragment>
                }
            </Box>
        </Box>
    );
};

export default AuctionHeader;
