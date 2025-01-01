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
import useDetailStyles from "./detail-pages-components/DetailPageStyles";
import lotsData from "../lotsData";
import { getQueryParam } from "../../../helper/GetQueryParam";
import theme from "../../../theme";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WatchLaterRoundedIcon from '@mui/icons-material/WatchLaterRounded';
import { useNavigate } from "react-router-dom";
import CustomDialogue from "../../custom-components/CustomDialogue";
import WinnerModal from "./detail-pages-components/WinnerModal";
import { getLotDetails } from "../../Services/Methods";
import { ErrorMessage, SuccessMessage } from "../../../utils/ToastMessages";

const LotDetailPage = () => {
    const classes = useDetailStyles();
    const [lotDetails, setLotDetails]: any = useState({})
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [deleteLotId, setDeleteLotId] = useState(0)
    const [winnerModal, setWinnerModal] = useState(false)
    const [isFetchingData, setIsFetchingData] = useState(false)

    useEffect(() => {
        // if (!isFetchingData) {
        //     setIsFetchingData(true);
        //     fetchLotDetails()
        // }
        if (lotsData) {
            setLotDetails(lotsData.find((lot: any) => lot.id + "" === getQueryParam('lotId')))
        }
    }, [lotsData])

    const fetchLotDetails = async () => {
        try {
            const response = await getLotDetails(getQueryParam('lotId')); // Call the API with the provided ID

            if (response.status === 200) {
                console.log('Lot Details:', response.data); // Handle the fetched lot details
                // You can set the data to state if required

                const details: any = response.data;
                // setLotDetails(details);
            } else {
                // ErrorMessage('Error fetching lot details.')
            }
        } catch (error) {
            console.error('Error fetching lot details:', error);
        }
    };

    const navigate = useNavigate()

    // Handle Edit
    const handleEdit = (id: string) => {
        navigate(`/auction/lots/edit/${id}`); // Navigate to the edit route with auction ID
    };

    // Open confirmation modal
    const handleDeleteLot = (id: number) => {
        setDeleteLotId(id);
        setConfirmDelete(true);
    };

    // Close modal
    const handleCloseModal = () => {
        setConfirmDelete(false);
        setDeleteLotId(0);
    };

    // Confirm deletion
    const handleConfirmDelete = () => {
        navigate('/auction/lots')
        handleCloseModal();
    };

    const handleWinnerDetails = () => {
        setWinnerModal(true)
    }

    return (
        <Box p={2}>
            <Box>
                <Typography className={classes.title} pb={2}>
                    Lot Details
                </Typography>
            </Box>
            <Grid container spacing={4}>
                {/* Left Section */}
                <Grid item xs={12} md={6}>
                    <Card className={classes.card} elevation={2}>
                        {/* Main Image */}
                        <CardMedia
                            component="img"
                            image={lotDetails.image}
                            alt="Lot Image"
                            className={classes.media}
                        />
                        <Button
                            variant="contained"
                            size="small"
                            className={`${classes.soldButton} ${!lotDetails.sold ? classes.unSoldButton : ''}`}
                        >
                            {lotDetails.sold ? "Sold" : "Unsold"}
                        </Button>

                        {/* Thumbnails */}
                        <Box className={classes.thmbnailsWrapper}>
                            {[...Array(3)].map((_, index) => (
                                <CardMedia
                                    key={index}
                                    component="img"
                                    image={lotDetails.image}
                                    alt="Thumbnail"
                                    className={classes.thumbnails}
                                />
                            ))}
                        </Box>
                    </Card>

                    {/* Winner and View Bidders */}
                    <Box className={classes.buttonContainer}>
                        <Button
                            variant="contained"
                            className={classes.winnerButton}
                            onClick={handleWinnerDetails}
                        >
                            Winner Detail
                        </Button>
                        <Button variant="outlined" className={classes.viewButton}>
                            View Bidders
                        </Button>
                    </Box>

                </Grid>

                {/* Right Section */}
                <Grid item xs={12} md={6}>
                    <Box>
                        <Typography className={classes.rightTitle}>
                            {lotDetails.name}
                        </Typography>
                        <Typography gutterBottom className={classes.rightTitle}>
                            {lotDetails.location}
                        </Typography>
                        <Typography className={classes.description} mb={2}>
                            {lotDetails.details?.description}
                        </Typography>
                        <Typography className={classes.description} mb={2}>
                            {lotDetails.details?.description}
                        </Typography>

                        {/* Details */}
                        <Typography className={classes.dateTime} color={theme.palette.primary.main2} gutterBottom>
                            Date and Time
                        </Typography>

                        <Box className={classes.row}>
                            <Box className={classes.iconText}>
                                <CalendarMonthIcon fontSize="small" color="primary" />
                                <Typography className={classes.text}>{lotDetails.details?.date}</Typography>
                            </Box>
                            <Box className={classes.iconText}>
                                <WatchLaterRoundedIcon fontSize="small" color="primary" />
                                <Typography className={classes.text} sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
                                    {lotDetails.details?.time}
                                </Typography>
                            </Box>
                        </Box>

                        <Box className={classes.detailRow}>
                            <Box className={classes.details}>
                                <Typography className={classes.detailHeading}>Order Number</Typography>
                                <Typography className={classes.detailText} >&nbsp;: #{lotDetails.details?.orderNumber}</Typography>
                            </Box>
                            <Box className={classes.details}>
                                <Typography className={classes.detailHeading}>Lot</Typography>
                                <Typography className={classes.detailText}  >&nbsp;:&nbsp;{lotDetails.details?.lot}</Typography>
                            </Box>
                            <Box className={classes.details}>
                                <Typography className={classes.detailHeading}>Category</Typography>
                                <Typography className={classes.detailText} >&nbsp;:&nbsp;{lotDetails.details?.category}</Typography>
                            </Box>
                            <Box className={classes.details}>
                                <Typography className={classes.detailHeading}>Sub-Category</Typography>
                                <Typography className={classes.detailText}  >&nbsp;:&nbsp;{lotDetails.details?.subCategory}</Typography>
                            </Box>
                        </Box>

                        {/* Buttons */}
                        <Box className={classes.actionButtons}>
                            <Button className={classes.actionButton} variant="contained" size="small" color="primary" onClick={() => handleEdit(lotDetails.id)}>
                                Edit
                            </Button>
                            <Button className={classes.actionButton} variant="contained" size="small" color="error" onClick={() => handleDeleteLot(lotDetails.id)}>
                                Delete
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            {/* Confirmation Modal */}
            <CustomDialogue
                type={"delete"}
                title={"Confirm Deletion"}
                message={"Are you sure you want to delete this auction? This action cannot be undone."}
                openDialogue={confirmDelete}
                handleCloseModal={handleCloseModal}
                handleConfirmDelete={handleConfirmDelete}
            />

            <WinnerModal open={winnerModal} onClose={() => setWinnerModal(false)} />
        </Box>
    );
};

export default LotDetailPage;
