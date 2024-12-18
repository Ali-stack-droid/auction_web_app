import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Button, Stack } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Inventory2Icon from '@mui/icons-material/Inventory2';

const AuctionCard = ({ auction }: any) => {
    return (
        <Card sx={{ maxWidth: 345, borderRadius: 3, boxShadow: 3, padding: 1.2 }}>
            {/* Auction Image */}
            <CardMedia
                component="img"
                height="200"
                image={auction.image}
                alt="Auction Image"
                sx={{
                    borderRadius: 3,
                }}
            />

            {/* Auction Details */}
            <CardContent>
                {/* Title */}
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {auction.name}
                </Typography>

                {/* View Catalog Button */}
                <Button
                    variant="contained"
                    size="small"
                    sx={{ textTransform: 'none', borderRadius: 2, mb: 1 }}
                >
                    View Catalog
                </Button>

                {/* Location, Date, and Lots */}
                <Stack spacing={1} direction="column">
                    <Box display="flex" alignItems="center" gap={1}>
                        <PlaceIcon fontSize="small" color="primary" />
                        <Typography variant="body2">{auction.location}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                        <AccessTimeIcon fontSize="small" color="primary" />
                        <Typography variant="body2">{auction.dateRange}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Inventory2Icon fontSize="small" color="primary" />
                        <Typography variant="body2">{auction.lotsAvailable}</Typography>
                    </Box>
                </Stack>
            </CardContent>

            {/* Action Buttons */}
            <Box display="flex" justifyContent="space-around" p={1}>
                <Button variant="outlined" size="small" color="primary">
                    Edit
                </Button>
                <Button variant="outlined" size="small" color="error">
                    Delete
                </Button>
            </Box>
        </Card>
    );
};

export default AuctionCard;
