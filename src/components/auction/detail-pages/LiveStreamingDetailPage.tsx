import { useEffect, useState } from "react";
import { Box, Button, Typography, Card, CardMedia, Grid } from "@mui/material";
import useDetailStyles from "./DetailPageStyles";
import { getQueryParam } from "../../../helper/GetQueryParam";
import theme from "../../../theme";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WatchLaterRoundedIcon from '@mui/icons-material/WatchLaterRounded';
import { useNavigate } from "react-router-dom";
import CustomDialogue from "../../custom-components/CustomDialogue";
import BiddingTable from "./BiddingTable";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import AuctionCard from "../auction-components/AuctionCard";
import liveStreamData from "../../live-streaming/liveStreamData";

const LiveStreamingDetailPage = () => {
    const classes = useDetailStyles();
    const [liveStreamDetails, setLiveStreamDetails]: any = useState({})
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [deleteAuctionId, setDeleteAuctionId] = useState(0)
    const [showMoreTerms, setShowMoreTerms] = useState(false);
    const [showMorePaymentTerms, setShowMorePaymentTerms] = useState(false);

    const biddingTableData = [{ id: 1, startAmount: 10000, endAmount: 10000, bidRangeAmount: 10000 }, { id: 1, startAmount: 10000, endAmount: 10000, bidRangeAmount: 10000 }, { id: 1, startAmount: 10000, endAmount: 10000, bidRangeAmount: 10000 }, { id: 1, startAmount: 10000, endAmount: 10000, bidRangeAmount: 10000 }, { id: 1, startAmount: 10000, endAmount: 10000, bidRangeAmount: 10000 }]

    useEffect(() => {
        if (liveStreamData) {
            setLiveStreamDetails(liveStreamData.find((auction: any) => auction.id + "" === getQueryParam('liveId')))
        }
    }, [liveStreamData])


    const navigate = useNavigate()

    // Handle Edit
    const handleEdit = (id: string) => {
        navigate(`edit/${id}`); // Navigate to the edit route with auction ID
    };

    // Open confirmation modal
    const handleDeleteAuction = (id: number) => {
        setDeleteAuctionId(id);
        setConfirmDelete(true);
    };

    // Close modal
    const handleCloseModal = () => {
        setConfirmDelete(false);
        setDeleteAuctionId(0);
    };

    // Confirm deletion
    const handleConfirmDelete = () => {
        navigate('/auction/lots')
        handleCloseModal();
    };

    const handleSeeMoreClick = (type: string) => {
        if (type === "terms") {
            setShowMoreTerms(!showMoreTerms);
        } else {
            setShowMorePaymentTerms(!showMorePaymentTerms)
        }
    };

    return (
        <Box p={2}>
            <Box>
                <Typography className={classes.title} pb={2}>
                    Live Streaming Auction
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: "center", }} >
                {/* Left Section */}
                <Box flex={1}>
                    <Card className={classes.liveCard} elevation={2}>
                        {/* Main Image */}
                        <CardMedia
                            component="img"
                            image={liveStreamDetails.image}
                            alt="Live Stream"
                            className={classes.media}
                            height={300}
                        />
                    </Card>
                    <Box paddingTop={3}>
                        <Typography className={classes.dateTime} color={theme.palette.primary.main2} gutterBottom>
                            Auction Date and Time for Live Streaming
                        </Typography>

                        <Box className={classes.row}>
                            <Box className={classes.iconText}>
                                <CalendarMonthIcon fontSize="small" color="primary" />
                                <Typography className={classes.text}>{liveStreamDetails.details?.date}</Typography>
                            </Box>
                            <Box className={classes.iconText}>
                                <WatchLaterRoundedIcon fontSize="small" color="primary" />
                                <Typography className={classes.text} sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
                                    {liveStreamDetails.details?.time}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Box paddingTop={3}>
                        <Typography className={classes.dateTime} color={theme.palette.primary.main2} gutterBottom>
                            Auction Preview Date and Time
                        </Typography>
                        <Box className={classes.row}>
                            <Box className={classes.iconText}>
                                <CalendarMonthIcon fontSize="small" color="primary" />
                                <Typography className={classes.text}>{liveStreamDetails.details?.date}</Typography>
                            </Box>
                            <Box className={classes.iconText}>
                                <WatchLaterRoundedIcon fontSize="small" color="primary" />
                                <Typography className={classes.text} sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
                                    {liveStreamDetails.details?.time}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                {/* Right Section */}
                <Box flex={0.5}>
                    <Box>
                        <Typography className={classes.rightTitle}>
                            {liveStreamDetails.name}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            {/* Confirmation Modal */}
            <CustomDialogue
                confirmDelete={confirmDelete}
                handleCloseModal={handleCloseModal}
                handleConfirmDelete={handleConfirmDelete}
            />
        </Box>
    );
};

export default LiveStreamingDetailPage;
