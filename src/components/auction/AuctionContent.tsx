import React from 'react';
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

interface AuctionContentProps {
    isCurrentAuction: boolean;
    setIsCurrentAuction: React.Dispatch<React.SetStateAction<boolean>>;
    anchorEl: null | HTMLElement;
    handleMenuOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
    handleMenuClose: () => void;
    handleFilterChange: (location: string) => void;
    selectedLocation: string | null;
    fadeIn: boolean;
    filteredData: any[];
}

const AuctionContent: React.FC<AuctionContentProps> = ({
    isCurrentAuction,
    setIsCurrentAuction,
    anchorEl,
    handleMenuOpen,
    handleMenuClose,
    handleFilterChange,
    selectedLocation,
    fadeIn,
    filteredData,
}) => (
    <Box sx={{ padding: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
            {/* Title */}
            <Typography sx={{ fontSize: 24, fontWeight: 600, color: theme.palette.primary.main }}>
                {isCurrentAuction ? 'Current Auctions' : 'Past Auctions'}
            </Typography>

            {/* Buttons */}
            <Box display="flex" gap={2} maxHeight={40}>
                {/* Add Auction Button */}
                {isCurrentAuction && (
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
                <Box display={'flex'} alignItems={'center'} justifyContent={'center'} sx={{ border: '1px solid #E2E8F0', height: '36.7', borderRadius: "5px", minWidth: 215 }}>
                    <ToggleButtonGroup
                        color="primary"
                        value={isCurrentAuction ? 'current' : 'past'}
                        exclusive
                        onChange={() => setIsCurrentAuction((prev) => !prev)}
                        aria-label="Auction Type"
                        sx={{ maxHeight: '30px' }}
                    >
                        <ToggleButton
                            value="current"
                            sx={{
                                textTransform: 'none',
                                fontSize: isCurrentAuction ? 11 : 10,
                                backgroundColor: isCurrentAuction ? `${theme.palette.primary.main} !important` : "inherit",
                                color: (isCurrentAuction ? "white" : theme.palette.primary.main5) + " !important",
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
                                fontSize: isCurrentAuction ? 10 : 11,
                                backgroundColor: isCurrentAuction ? "inherit" : `${theme.palette.primary.main} !important`,
                                color: (isCurrentAuction ? theme.palette.primary.main5 : "white") + " !important",
                                transition: 'background 0.2s ease-in-out, color 0.2s ease-in-out',
                                border: 'none',
                                borderRadius: '5px !important',

                            }}
                        >
                            Past Auctions
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>

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

        {/* Auction Cards */}
        <Fade in={fadeIn} timeout={200}>
            <Container disableGutters maxWidth={false} sx={{ mt: 3 }}>
                <Grid container spacing={3}>
                    {filteredData.map((auction: any) => (
                        <Grid item xs={12} sm={6} md={4} xl={3} key={auction.id}>
                            <AuctionCard auction={auction} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Fade>
    </Box >
);

export default AuctionContent;
