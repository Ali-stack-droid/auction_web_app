import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Typography,
    Card,
    CardMedia,
    Grid,
    Avatar,
    Tooltip,
} from "@mui/material";
import useDetailStyles from "./DetailPageStyles";
import lotsData from "../lotsData";
import { getQueryParam } from "../../../helper/GetQueryParam";

const LotDetailPage = () => {
    const classes = useDetailStyles();
    const [lotDetails, setLotDeatils]: any = useState({})

    useEffect(() => {
        if (lotsData) {
            setLotDeatils(lotsData.find((lot: any) => lot.id + "" === getQueryParam('lotId')))
        }
    }, [lotsData])

    return (
        <Box p={2} sx={{
            // minHeight: "100vh" 
        }}>
            <Box>
                <Typography className={classes.title}>
                    Lot Details
                </Typography>
            </Box>
            {JSON.stringify(lotDetails)}
            <Grid container spacing={4}>
                {/* Left Section */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ position: "relative", overflow: "visible" }}>
                        {/* Main Image */}
                        <CardMedia
                            component="img"
                            height="300"
                            image="https://via.placeholder.com/500"
                            alt="Lot Image"
                            sx={{ borderRadius: "8px" }}
                        />
                        {/* Unsold Badge */}
                        <Button
                            variant="contained"
                            size="small"
                            className={`${classes.soldButton} ${!lotDetails.sold ? classes.unSoldButton : ''}`}
                        >
                            {lotDetails.sold ? "Sold" : "Unsold"}
                        </Button>

                        {/* Thumbnails */}
                        <Box display="flex" justifyContent="center" mt={2} gap={2}>
                            {[...Array(4)].map((_, index) => (
                                <CardMedia
                                    key={index}
                                    component="img"
                                    image="https://via.placeholder.com/100"
                                    alt="Thumbnail"
                                    sx={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: "8px",
                                        border: "2px solid #ddd",
                                        cursor: "pointer",
                                    }}
                                />
                            ))}
                        </Box>
                    </Card>

                    {/* Winner and View Bidders */}
                    <Box display="flex" gap={2} mt={3}>
                        <Button variant="contained" color="primary" fullWidth>
                            Winner Detail
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            fullWidth
                            startIcon={
                                <Tooltip title="View Bidders">
                                    <Avatar
                                        src="https://via.placeholder.com/50"
                                        alt="Bidder"
                                        sx={{ width: 24, height: 24 }}
                                    />
                                </Tooltip>
                            }
                        >
                            View Bidders
                        </Button>
                    </Box>
                </Grid>

                {/* Right Section */}
                <Grid item xs={12} md={6}>
                    <Box>
                        <Typography variant="h5" fontWeight={600} gutterBottom>
                            {lotDetails.name}
                        </Typography>
                        <Typography variant="h5" fontWeight={600} gutterBottom>
                            {lotDetails.location}
                        </Typography>
                        <Typography color="text.secondary" mb={4}>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio voluptate blanditiis laudantium maxime pariatur neque quia eum magnam, quaerat alias dignissimos? Adipisci, quis alias iste ex magnam dolorum recusandae optio?
                        </Typography>

                        {/* Details */}
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            <strong>Date and Time:</strong> 23-04-2024 to 30-04-2024 | 08:00
                            AM to 12:00 PM
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            <strong>Order Number:</strong> #345 | <strong>Lot:</strong> 45 |
                            <strong> Category:</strong> ABCXYZ | <strong>Sub-Category:</strong>{" "}
                            ABCXYZ
                        </Typography>

                        {/* Buttons */}
                        <Box display="flex" gap={2} mt={4}>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ flex: 1, height: 40 }}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                sx={{ flex: 1, height: 40 }}
                            >
                                Delete
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default LotDetailPage;
