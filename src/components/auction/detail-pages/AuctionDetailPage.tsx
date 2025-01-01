import { useEffect, useState } from "react";
import { Box, Button, Typography, Card, CardMedia, Grid, CircularProgress } from "@mui/material";
import useDetailStyles from "./detail-pages-components/DetailPageStyles";
import auctionsData from "../lotsData";
import { getQueryParam } from "../../../helper/GetQueryParam";
import theme from "../../../theme";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WatchLaterRoundedIcon from '@mui/icons-material/WatchLaterRounded';
import { useNavigate } from "react-router-dom";
import CustomDialogue from "../../custom-components/CustomDialogue";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import AuctionCard from "../auction-components/AuctionCard";
import BiddingTable from "./detail-pages-components/BiddingTable";

const AuctionDetailPage = () => {
    const classes = useDetailStyles();
    const [auctionDetails, setAuctionDetails]: any = useState({})
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [deleteAuctionId, setDeleteAuctionId] = useState(0)
    const [showMoreTerms, setShowMoreTerms] = useState(false);
    const [showMorePaymentTerms, setShowMorePaymentTerms] = useState(false);
    const [isFetchingData, setIsFetchingData] = useState(false);

    const biddingTableData = [{ id: 1, startAmount: 10000, endAmount: 10000, bidRangeAmount: 10000 }, { id: 1, startAmount: 10000, endAmount: 10000, bidRangeAmount: 10000 }, { id: 1, startAmount: 10000, endAmount: 10000, bidRangeAmount: 10000 }, { id: 1, startAmount: 10000, endAmount: 10000, bidRangeAmount: 10000 }, { id: 1, startAmount: 10000, endAmount: 10000, bidRangeAmount: 10000 }]

    useEffect(() => {
        if (!isFetchingData) {
            // setIsFetchingData(true);
            // fetchAuctionDetails()
        }
        if (auctionsData) {
            setAuctionDetails(auctionsData.find((auction: any) => auction.id + "" === getQueryParam('aucId')))
        }
    }, [auctionsData])


    const navigate = useNavigate()

    // Handle Edit
    const handleEdit = (id: string) => {
        navigate(`/auction/edit/${id}`);
    };

    const handleEditLots = (id: string) => {
        navigate(`/auction/lots/edit/${id}`);
    }
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
                    Auction Details
                </Typography>
            </Box>

            {!isFetchingData ?
                <Box>
                    <Grid container spacing={4}>
                        {/* Left Section */}
                        <Grid item xs={12} md={6}>
                            <Card className={classes.card} elevation={2}>
                                {/* Main Image */}
                                <CardMedia
                                    component="img"
                                    image={auctionDetails.image}
                                    alt="Auction Image"
                                    className={classes.media}
                                />
                            </Card>
                            <Box paddingTop={3}>
                                <Typography className={classes.dateTime} color={theme.palette.primary.main2} gutterBottom>
                                    Auction Date and Time for Live Streaming
                                </Typography>

                                <Box className={classes.row}>
                                    <Box className={classes.iconText}>
                                        <CalendarMonthIcon fontSize="small" color="primary" />
                                        <Typography className={classes.text}>{auctionDetails.details?.date}</Typography>
                                    </Box>
                                    <Box className={classes.iconText}>
                                        <WatchLaterRoundedIcon fontSize="small" color="primary" />
                                        <Typography className={classes.text} sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
                                            {auctionDetails.details?.time}
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
                                        <Typography className={classes.text}>{auctionDetails.details?.date}</Typography>
                                    </Box>
                                    <Box className={classes.iconText}>
                                        <WatchLaterRoundedIcon fontSize="small" color="primary" />
                                        <Typography className={classes.text} sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
                                            {auctionDetails.details?.time}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>

                            <Box paddingTop={3}>
                                <Typography className={classes.location} color={theme.palette.primary.main2} gutterBottom>
                                    Street Number 21, Hawks Street , UK London, 45560, London, United Kingdom
                                </Typography>
                                <Box className={classes.details}>
                                    <Typography className={classes.detailHeading}>Currency USD</Typography>
                                    <Typography className={classes.detailText} py={1}>&nbsp;: 5000</Typography>
                                </Box>
                            </Box>

                            <Box paddingTop={3}>
                                <BiddingTable data={biddingTableData} />
                            </Box>

                            <Box paddingTop={3}>
                                <Typography className={classes.terms}>Terms and Condition:</Typography>
                                <Typography className={classes.termsText}>
                                    The auction held in London was an exclusive event showcasing a stunning collection of rare and valuable items. Attended by collectors, enthusiasts, and art connoisseurs from around the world, the atmosphere buzzed with anticipation.
                                    {!showMoreTerms && <Typography
                                        component={'span'}
                                        className={classes.seeMore}
                                        onClick={() => handleSeeMoreClick('terms')}
                                    >
                                        See More
                                    </Typography>}
                                </Typography>
                                {showMoreTerms && (
                                    <Typography className={classes.termsText}>
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed earum ab rem hic iste suscipit omnis?
                                        Quod quasi ex at ducimus sunt dignissimos, animi totam?
                                        Sint excepturi consectetur minima nisi fuga architecto repudiandae minus aspernatur fugiat!
                                        Error quasi corrupti tempore, obcaecati quibusdam placeat beatae mollitia quod iure odio, repellendus laudantium?
                                        <Typography
                                            component={'span'}
                                            className={classes.seeMore}
                                            onClick={() => handleSeeMoreClick('terms')}
                                        >
                                            See Less
                                        </Typography>
                                    </Typography>
                                )}
                            </Box>
                            <Box paddingTop={3}>
                                <Typography className={classes.terms}>Payment Terms:</Typography>
                                <Typography className={classes.termsText}>The auction held in London was an exclusive event showcasing a stunning collection of rare and valuable items. Attended by collectors, enthusiasts, and art connoisseurs from around the world, the atmosphere buzzed with anticipation.
                                    {!showMorePaymentTerms &&
                                        <Typography
                                            component={'span'}
                                            className={classes.seeMore}
                                            onClick={() => handleSeeMoreClick('payment')}
                                        >
                                            See More
                                        </Typography>
                                    }
                                </Typography>
                                {showMorePaymentTerms && (
                                    <Typography className={classes.termsText}>
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed earum ab rem hic iste suscipit omnis?
                                        Quod quasi ex at ducimus sunt dignissimos, animi totam?
                                        Sint excepturi consectetur minima nisi fuga architecto repudiandae minus aspernatur fugiat!
                                        Error quasi corrupti tempore, obcaecati quibusdam placeat beatae mollitia quod iure odio, repellendus laudantium?
                                        <Typography
                                            component={'span'}
                                            className={classes.seeMore}
                                            onClick={() => handleSeeMoreClick('payment')}
                                        >
                                            See Less
                                        </Typography>
                                    </Typography>
                                )}
                            </Box>
                        </Grid>

                        {/* Right Section */}
                        <Grid item xs={12} md={6}>
                            <Box>
                                <Typography className={classes.rightTitle}>
                                    {auctionDetails.name}
                                </Typography>
                                <Typography gutterBottom className={classes.rightTitle}>
                                    {auctionDetails.location}
                                </Typography>
                                <Typography className={classes.description} mb={2}>
                                    {auctionDetails.details?.description}
                                </Typography>

                                <Box display={'flex'} gap={3}>
                                    <Box className={classes.iconText}>
                                        <FiberManualRecordIcon sx={{ width: "15px", height: "15px" }} color="primary" />
                                        <Typography className={classes.text}>ID# 123</Typography>
                                    </Box>
                                    <Box className={classes.iconText}>
                                        <FiberManualRecordIcon sx={{ width: "15px", height: "15px" }} color="primary" />
                                        <Typography className={classes.text}>Online Auction</Typography>
                                    </Box>
                                    <Box className={classes.iconText}>
                                        <FiberManualRecordIcon sx={{ width: "15px", height: "15px" }} color="primary" />
                                        <Typography className={classes.text}>Live Streaming</Typography>
                                    </Box>
                                    <Box className={classes.iconText}>
                                        <FiberManualRecordIcon sx={{ width: "15px", height: "15px" }} color="primary" />
                                        <Typography className={classes.text}>Buyer Premium : 10%</Typography>
                                    </Box>
                                </Box>

                                {/* Details */}
                                <Box className={classes.iconText} py={1}>
                                    <CalendarMonthIcon fontSize="small" color="primary" />
                                    <Typography className={classes.text}>{auctionDetails.details?.date}</Typography>
                                </Box>
                                <Box className={classes.iconText}>
                                    <WatchLaterRoundedIcon fontSize="small" color="primary" />
                                    <Typography className={classes.text} sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
                                        {auctionDetails.details?.time}
                                    </Typography>
                                </Box>

                                {/* Buttons */}
                                <Box className={classes.actionButtons} py={1}>
                                    <Button className={classes.actionButton} variant="contained" size="small" color="primary" onClick={() => handleEdit(auctionDetails.id)}>
                                        Edit
                                    </Button>
                                    <Button className={classes.actionButton} variant="contained" size="small" color="error" onClick={() => handleDeleteAuction(auctionDetails.id)}>
                                        Delete
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box maxWidth={'80vw'} overflow={'auto'} pt={3}>
                        <Box className={classes.titleWrapper}>
                            <Typography className={classes.title}>
                                Auction Lots :
                            </Typography>
                            <Box className={classes.countBadge}>20</Box>
                        </Box>
                        <Box className={classes.cardContainer} >
                            {auctionsData && auctionsData.map((auction) => (
                                <Box minWidth={'345px'}>
                                    <AuctionCard
                                        key={auction.id}
                                        headerType={'lots'}
                                        cardData={auction}
                                        handleEdit={handleEditLots}
                                        handleDelete={handleDeleteAuction}
                                    />
                                </Box>
                            ))}
                        </Box>

                    </Box>
                </Box>
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
                handleConfirmDelete={handleConfirmDelete}
            />
        </Box>
    );
};

export default AuctionDetailPage;
