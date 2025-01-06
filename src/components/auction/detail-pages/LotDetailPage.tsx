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
    CircularProgress,
    IconButton,
} from "@mui/material";
import useDetailStyles from "./detail-pages-components/DetailPageStyles";
import { getQueryParam } from "../../../helper/GetQueryParam";
import theme from "../../../theme";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WatchLaterRoundedIcon from '@mui/icons-material/WatchLaterRounded';
import { useLocation, useNavigate } from "react-router-dom";
import CustomDialogue from "../../custom-components/CustomDialogue";
import WinnerModal from "./detail-pages-components/WinnerModal";
import { deleteLot, getBiddersByLotId, getLotDetails, getLotDetailsById, getWinnerByLotId } from "../../Services/Methods";
import { ErrorMessage, SuccessMessage } from "../../../utils/ToastMessages";
import BiddingTable from "./detail-pages-components/BiddingTable";
import BiddersModal from "./detail-pages-components/BiddersModal";
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';

const LotDetailPage = () => {
    const classes = useDetailStyles();
    const navigate = useNavigate();
    const locationURL = useLocation();

    const [lotDetails, setLotDetails]: any = useState({})
    const [bidders, setBidders]: any = useState([])
    const [winner, setWinner]: any = useState({});

    const [confirmDelete, setConfirmDelete] = useState(false)
    const [deleteLotId, setDeleteLotId] = useState(0)

    const [winnerModal, setWinnerModal] = useState(false)
    const [openBidders, setOpenBidders] = useState(false)
    const [isFetchingData, setIsFetchingData] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false);

    const [mainImage, setMainImage] = useState("");

    useEffect(() => {
        if (!isFetchingData) {
            setIsFetchingData(true);
            fetchLotDetails();
        }
    }, [])

    const fetchLotDetails = async () => {
        try {
            const response = await getLotDetailsById(getQueryParam('lotId'));
            const lot = response.data?.Lot;
            const images = [
                ...(lot.Image ? [lot.Image] : []),
                ...(response.data?.Images || []).map((img: any) => img.Image)
            ];
            const bidsRange = response.data?.BidsRange || [];

            if (lot) {
                const formattedLotDetails = {
                    id: lot.Id,
                    auctionId: lot.AuctionId,
                    lotNumber: lot.LotNo,
                    name: lot.ShortDescription,
                    description: lot.LongDescription,
                    countDown: "N/A", // Update if you calculate countdown elsewhere
                    location: "N/A", // Replace with actual location if available
                    image: lot.Image,
                    type: lot.IsPast ? "past" : "current",
                    highestBid: lot.BidStartAmount,
                    sold: lot.IsSold,
                    buyerPremium: lot.BuyerPremium,
                    currency: lot.Currency,
                    images: images,
                    details: {
                        description: lot.LongDescription,
                        date: `${lot.StartDate} to ${lot.EndDate}`,
                        time: `${lot.StartTime} to ${lot.EndTime}`,
                        orderNumber: lot.OrderNo,
                        lot: lot.LotNo,
                        category: lot.Category,
                        subCategory: lot.SubCategory,
                        auctionId: lot.AuctionId,
                        createdAt: lot.CreatedAt,
                        updatedAt: lot.UpdateddAt,
                    },
                    bidsRange: bidsRange.map((bid: any) => ({
                        id: bid.Id,
                        startAmount: bid.StartAmount,
                        endAmount: bid.EndAmount,
                        bidRangeAmount: bid.BidRange,
                    })),
                };
                setMainImage(formattedLotDetails.image || `${process.env.PUBLIC_URL}/assets/pngs/placeholder.png`)
                setLotDetails(formattedLotDetails);
                fetchBidders();
                fetchWinner();
            } else {
                setLotDetails([]);
            }
        } catch (error) {
            console.error('Error fetching auction data:', error);
            setIsFetchingData(false);
        } finally {
            setIsFetchingData(false);
        }
    };

    const fetchBidders = async () => {
        try {
            const response = await getBiddersByLotId(getQueryParam('lotId'));
            const bidders = response.data;
            if (bidders.length > 0) {
                const formattedBidders = response.data.map((bidder: any) => ({
                    id: bidder.Id,
                    clientId: bidder.ClientId,
                    name: bidder.Name,
                    bidAmount: bidder.BidAmount,
                    email: bidder.Email,
                    address: bidder.Address,
                    company: bidder.Company,
                }));
                setBidders(formattedBidders)
            } else {
                setBidders([]);
            }
        } catch (error) {
            console.error('Error fetching auction data:', error);
        }
    };

    const fetchWinner = async () => {
        try {
            const response = await getWinnerByLotId(getQueryParam('lotId'));
            const winnerDetails = response.data;
            const formattedWinner = {
                name: winnerDetails.Clients?.Name || "N/A",
                email: winnerDetails.Clients?.Email || "N/A",
                phone: winnerDetails.Clients?.Phone || "N/A", // Replace with actual phone if available
                location: winnerDetails.Clients?.Address || "N/A",
                image: winnerDetails.Lots?.Image || `${process.env.PUBLIC_URL}/assets/pngs/winner.png`,
            };
            setWinner(formattedWinner);
        } catch (err) {
            setWinner({});
            // console.error(err);
        }
    };

    const handleDelete = async () => {
        try {
            const response: any = await deleteLot(deleteLotId);
            if (response.status === 200) {
                SuccessMessage('Lot deleted successfully!')
                navigate(`/auction/lots?aucId=${response.data.AuctionID}`)
            } else {
                ErrorMessage('Error deleting lot!')
            }
        } catch (error) {
            console.error('Error deleting auction:', error);
        } finally {
            handleCloseModal()
        }
    };

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
        if (!isDeleting) {
            setIsDeleting(false)
            setConfirmDelete(false);
            setDeleteLotId(0);
        }
    };

    // Confirm deletion
    const handleConfirmDelete = () => {
        if (!isDeleting) {
            setIsDeleting(true)
            handleDelete(); // Call the delete handler
        }
    };

    const handleWinnerDetails = () => {
        setWinnerModal(true)
    }

    const handleThumbnailClick = (selectedImage: string) => {
        setMainImage(selectedImage);
    };

    return (
        <Box p={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pb: 2 }}>
                <IconButton onClick={() => navigate(`/auction/lots?aucId=${lotDetails.auctionId}`)}>
                    <KeyboardReturnRoundedIcon />
                </IconButton>
                <Typography className={classes.title}>
                    Lot Details
                </Typography>
            </Box>

            {!isFetchingData ?
                <Grid container spacing={4}>
                    {/* Left Section */}
                    <Grid item xs={12} md={6}>
                        <Card className={classes.card} elevation={2}>
                            {/* Main Image */}
                            <CardMedia
                                component="img"
                                image={mainImage}
                                alt="Lot Image"
                                className={classes.media}
                                height={300}
                            />
                            <Button
                                variant="contained"
                                size="small"
                                className={`${classes.soldButton} ${!lotDetails.sold ? classes.unSoldButton : ''}`}
                            >
                                {lotDetails.sold ? "Sold" : "Unsold"}
                            </Button>

                            {/* Thumbnails */}
                            {lotDetails.images?.length > 1 &&
                                <Box className={classes.thmbnailsWrapper}>
                                    {lotDetails.images?.map((img: any, index: number) => (
                                        <CardMedia
                                            key={index}
                                            component="img"
                                            image={img || `${process.env.PUBLIC_URL}/assets/pngs/placeholder.png`}
                                            alt="Thumbnail"
                                            className={classes.thumbnails}
                                            onClick={() => handleThumbnailClick(img)}
                                        />
                                    ))}
                                </Box>
                            }
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
                            <Button
                                variant="outlined"
                                className={classes.viewButton}
                                onClick={() => setOpenBidders(true)}
                            >
                                View Bidders
                            </Button>
                        </Box>

                        {lotDetails.bidsRange?.length > 0 &&
                            <Box paddingTop={5}>
                                <BiddingTable biddingData={lotDetails.bidsRange} />
                            </Box>
                        }

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
                                <Button className={classes.actionButton}
                                    variant="contained" size="small" color="primary"
                                    onClick={() => handleEdit(lotDetails.id)}
                                >
                                    Edit
                                </Button>
                                <Button className={classes.actionButton}
                                    variant="contained" size="small" color="error"
                                    onClick={() => handleDeleteLot(lotDetails.id)}
                                >
                                    Delete
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                :
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '70vh',
                        width: '100%',
                    }}
                >
                    <CircularProgress size={70} disableShrink />
                </Box>
            }
            {/* Confirmation Modal */}
            <CustomDialogue
                type={"delete"}
                title={"Confirm Deletion"}
                message={"Are you sure you want to delete this auction? This action cannot be undone."}
                openDialogue={confirmDelete}
                handleCloseModal={handleCloseModal}
                handleConfirmModal={handleConfirmDelete}
                isDeleting={isDeleting}

            />

            <WinnerModal open={winnerModal} onClose={() => setWinnerModal(false)} winner={winner} />

            <BiddersModal open={openBidders} onClose={() => setOpenBidders(false)} bidders={bidders} />
        </Box >
    );
};

export default LotDetailPage;
