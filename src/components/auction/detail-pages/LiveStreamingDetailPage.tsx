import React, { useEffect, useState } from 'react';
import { Typography, Box, List, ListItem, Avatar, CircularProgress, Container, Grid, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getQueryParam } from '../../../helper/GetQueryParam';
import AuctionCard from '../auction-components/AuctionCard';
import PaginationButton from '../auction-components/PaginationButton';
import useLiveStreamDetailStyles from './detail-pages-components/LiveStreamingDetailStyles';
import { SuccessMessage, ErrorMessage } from '../../../utils/ToastMessages';
import { getAuctionDetailById, deleteAuction } from '../../Services/Methods';
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';

const LiveStreamingDetailPage = () => {
    const classes = useLiveStreamDetailStyles();

    const liveBidders = ["Bidder Name 1", "Bidder Name 2", "Bidder Name 3", "Bidder Name 4", "Bidder Name 5", "Bidder Name 6"];
    // const [liveStream, setLiveStream]: any = useState(liveStreamData.find((stream: any) => stream.id + "" === getQueryParam('aucId')))
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [deleteAuctionId, setDeleteAuctionId] = useState(0)
    const [isFetchingData, setIsFetchingData] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const [auctionDetails, setAuctionDetails]: any = useState({})
    const [auctionLots, setAuctionLots]: any = useState([])
    const [paginationedData, setPaginationedData]: any = useState([])

    useEffect(() => {
        if (!isFetchingData) {
            setIsFetchingData(true);
            fetchAuctionDetails()
        }
    }, [])

    const fetchAuctionDetails = async () => {
        try {
            const response = await getAuctionDetailById(getQueryParam("aucId"));
            const auction = response.data.Auction;
            const lots = response.data.Lots;

            if (auction) {
                const formattedAuctionDetails = {
                    id: auction.Id,
                    name: auction.Name,
                    image: auction.Image,
                    type: auction.IsPast ? "past" : "current",
                    details: {
                        location: `${auction.City}, ${auction.Country}`,
                        dateRange: `${auction.StartDate} to ${auction.EndDate}`,
                        lotsAvailable: `${auction.TotalLots} Lots Available`
                    },

                    dateRange: `${auction.StartDate} to ${auction.EndDate}`,
                    timeRange: `${auction.StartTime} to ${auction.EndTime}`,
                    previewDateRange: `${auction.PrevStartDate} to ${auction.PrevEndDate}`,
                    previewTimeRange: `${auction.PrevStartTime} to ${auction.PrevEndTime}`,

                    description: auction.Description,
                    notes: auction.Notes,

                    liveStreaming: auction.LiveStreaming,
                    startDate: auction.StartDate,
                    endDate: auction.EndDate,
                    startTime: auction.StartTime,
                    endTime: auction.EndTime,
                    prevStartDate: auction.PrevStartDate,
                    prevEndDate: auction.PrevEndDate,
                    prevStartTime: auction.PrevStartTime,
                    prevEndTime: auction.PrevEndTime,

                    country: auction.Country,
                    state: auction.State,
                    zipCode: auction.ZipCode,
                    city: auction.City,
                    address: auction.Address,
                    fullAddress: `Street ${auction.Address}, ${auction.City}, ${auction.ZipCode}, ${auction.State}, ${auction.Country}`,
                    shippingMethod: auction.ShippingMethod,
                    termsConditions: auction.TermsConditions,
                    paymentTerms: auction.PaymentTerms,
                    // termsConxditions: "Welcome to our auction! By participating, you agree to our terms: All bids are binding and non-retractable. Items are sold without warranty, expressed or implied. Payment must be completed within 48 hours of auction close. Shipping costs are borne by the buyer, and delivery timelines may vary. We reserve the right to cancel or reschedule auctions without prior notice. Unauthorized use of our platform is prohibited. All sales are final; no returns or refunds will be entertained.",
                    // paymentTerms: "Welcome to our auction! By participating, you agree to our terms: All bids are binding and non-retractable. Items are sold without warranty, expressed or implied. Payment must be completed within 48 hours of auction close. Shipping costs are borne by the buyer, and delivery timelines may vary. We reserve the right to cancel or reschedule auctions without prior notice. Unauthorized use of our platform is prohibited. All sales are final; no returns or refunds will be entertained.",
                    createdAt: auction.CreatedAt,
                    updatedAt: auction.UpdateddAt,
                    isDeleted: auction.IsDeleted,
                    isSold: auction.IsSold,
                    totalLots: auction.TotalLots
                };
                setAuctionDetails(formattedAuctionDetails);
            } else {
                setAuctionDetails([]);
            }

            if (lots?.length > 0) {
                const formattedLots = lots.map((item: any) => ({
                    id: item.Id,
                    lotNumber: item.LotNo,
                    name: item.ShortDescription,
                    description: item.LongDescription,
                    countDown: "N/A",
                    location: "N/A",
                    image: item.Image,
                    type: "current",
                    highestBid: item.BidStartAmount,
                    sold: item.IsSold,
                    details: {
                        description: item.LongDescription,
                        date: `${item.StartDate} to ${item.EndDate}`,
                        time: `${item.StartTime} to ${item.EndTime}`,
                        orderNumber: item.OrderNo,
                        lot: item.LotNo,
                        category: item.Category,
                        subCategory: item.SubCategory,
                        winner: {
                            email: "N/A", // Replace with actual data if available
                            phone: "N/A", // Replace with actual data if available
                            location: "N/A", // Replace with actual data if available
                        },
                    },
                }));
                setAuctionLots(formattedLots)
                setPaginationedData(formattedLots)
            } else {
                setAuctionLots([])
                setPaginationedData([])
            }

        } catch (error) {
            console.error('Error fetching auction data:', error);
        } finally {
            setIsFetchingData(false);
        }
    };

    const handleDelete = async () => {
        try {
            const response: any = await deleteAuction(deleteAuctionId);
            if (response.status === 200) {
                SuccessMessage('Lot deleted successfully!')
                setAuctionLots(auctionLots.filter((lot: any) => lot.id !== deleteAuctionId))
                setPaginationedData(auctionLots.filter((lot: any) => lot.id !== deleteAuctionId))
            } else {
                ErrorMessage('Error deleting lot!')
            }
        } catch (error) {
            console.error('Error deleting auction:', error);
        } finally {
            handleCloseModal()
        }
    };

    const navigate = useNavigate()

    // Handle Edit
    const handleEdit = (id: string) => {
        navigate(`/auction/edit/${id}`);
    };

    const handleEditLots = (id: string) => {
        navigate(`/auction/lots/edit?lotId=${id}`);
    }

    // Open confirmation modal
    const handleDeleteAuction = (id: number) => {
        setDeleteAuctionId(id);
        setConfirmDelete(true);
    };

    // Close modal
    const handleCloseModal = () => {
        if (!isDeleting) {
            setIsDeleting(false)
            setConfirmDelete(false);
            setDeleteAuctionId(0);
        }
    };

    // Confirm deletion
    const handleConfirmDelete = () => {
        if (!isDeleting) {
            setIsDeleting(true)
            handleDelete(); // Call the delete handler
        }
    };

    const handleMoveModal = (movedLotId: number) => {
        if (movedLotId > 0) {
            setAuctionLots((prevData: any) => prevData.filter((item: any) => item.id !== movedLotId));
        }
    }


    return (
        <Box p={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pb: 2 }}>
                <IconButton onClick={() => navigate('/live')}>
                    <KeyboardReturnRoundedIcon />
                </IconButton>
                <Typography className={classes.title}>
                    Live Streaming Auction
                </Typography>
            </Box>

            {!isFetchingData && auctionDetails && auctionLots.length > 0 ?
                <Box>
                    <Box className={classes.container}>
                        <Box flex={1} className={classes.mediaSection}>
                            <AuctionCard
                                width={"100%"}
                                headerType={"live"}
                                cardData={auctionDetails || {}}
                                handleEdit={() => { }}
                                handleDelete={() => { }}
                                handleMoveModal={() => { }}
                            />
                        </Box>
                        <Box className={classes.rightSection}>
                            <Typography variant="h6" className={classes.liveBiddersHeader}>Live Bidders</Typography>
                            <List className={classes.liveBiddersList} >
                                {liveBidders.map((bidder, index) => (
                                    <ListItem key={index} className={classes.liveBidderItem}>
                                        <Avatar />
                                        <Box className={classes.bidderBox}>
                                            <Typography className={classes.bidderName}>{bidder}</Typography>
                                            <Typography className={classes.bidderMessage}>Lorem ipsum dolor sit amet sim.</Typography>
                                        </Box>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Box>
                    {auctionLots.length > 0 &&
                        <Box width={'80vw'} pt={3}>
                            <Box className={classes.titleWrapper}>
                                <Typography className={classes.title}>
                                    Auction Lots :
                                </Typography>
                                <Box className={classes.countBadge}>{auctionLots.length}</Box>
                            </Box>
                            <Container disableGutters maxWidth={false} sx={{ mt: 3 }}>
                                <Grid container spacing={3}>
                                    {paginationedData && paginationedData.map((lot: any) => (
                                        <Grid item xs={12} sm={6} md={4} xl={3} key={lot.id}>
                                            <AuctionCard
                                                key={lot.id}
                                                headerType={'lots'}
                                                cardData={lot}
                                                handleEdit={handleEditLots}
                                                handleDelete={handleDeleteAuction}
                                                handleMoveModal={handleMoveModal}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Container>
                            <PaginationButton filteredData={auctionLots} setPaginationedData={setPaginationedData} />
                        </Box>
                    }
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

        </Box >
    );
};

export default LiveStreamingDetailPage;
