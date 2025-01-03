import { useState, useEffect } from 'react';
import {
    Box,
    Fade,
    Container,
    Grid,
    CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomDialogue from '../custom-components/CustomDialogue';
import AuctionHeader from './auction-components/AuctionHeader';
import AuctionCard from './auction-components/AuctionCard';
import PaginationButton from './auction-components/PaginationButton';
import { deleteLot, getLotsByAuctionId } from '../Services/Methods';

// redux imports
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import NoRecordFound from '../../utils/NoRecordFound';
import { getQueryParam } from '../../helper/GetQueryParam';
import { ErrorMessage, SuccessMessage } from '../../utils/ToastMessages';


const Lots = () => {
    const [isCurrentLot, setIsCurrentLot] = useState(true); // Toggle between Current and Past Lots
    const [selectedLocation, setSelectedLocation]: any = useState(null); // Filter by location
    const [filteredData, setFilteredData]: any = useState([]); // Filtered data state
    const [fadeIn, setFadeIn] = useState(false); // Fade control state
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleteLotId, setDeleteLotId] = useState(0);
    const [isFetchingData, setIsFetchingData] = useState(false);
    // const selectedAuction = useSelector((state: RootState) => state.auction.selectedAuction);

    useEffect(() => {
        if (!isFetchingData) {
            setIsFetchingData(true)
            fetchLotsData();
        }
    }, [isCurrentLot])

    const fetchLotsData = async () => {
        try {
            // const response = isCurrentLot
            //     ? await getCurrentAuctions()
            //     : await getPastAuctions();

            const selectedAuction = getQueryParam('aucId')
            const response = await getLotsByAuctionId(selectedAuction);

            // console.log("data: ", response.data);
            if (response.data && response.data.length > 0) {
                const updatedData = response.data.map((item: any) => ({
                    id: item.Id,
                    lotNumber: item.LotNo,
                    name: item.ShortDescription,
                    description: item.LongDescription,
                    countDown: "N/A",
                    location: "N/A",
                    image: item.Image,
                    type: "current",
                    highestBid: item.BidStartAmount,
                    sold: !item.IsSold,
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

                setFilteredData(updatedData);
            } else {
                setFilteredData([]);
            }
            setIsFetchingData(false)

        } catch (error) {
            console.error('Error fetching auction data:', error);
            setIsFetchingData(false)
        }
    };

    // Filtered Data based on `type` and `location`
    useEffect(() => {
        // const newFilteredData = lotsData.filter((lot) => {
        //     const matchesLocation = selectedLocation ? lot.location === selectedLocation : true;
        //     return matchesLocation;
        // });
        setFadeIn(false); // Trigger fade-out
        setTimeout(() => {
            setFadeIn(true); // Trigger fade-in after filtering
            setFilteredData(filteredData);
        }, 200);
    }, [isCurrentLot, selectedLocation]);

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
        if (deleteLotId > 0) {
            handleDelete(deleteLotId); // Call the delete handler
        }
        handleCloseModal();
    };

    const navigate = useNavigate();

    // Handle Edit
    const handleEdit = (id: number) => {
        navigate(`edit/${id}`); // Navigate to the edit route with lot ID
    };

    const handleDelete = async (id: number) => {
        try {
            // Call the delete API
            const response: any = await deleteLot(id);
            console.log("response: ", response)
            if (response.status === 200) {
                SuccessMessage('Lot deleted successfully!')
                // Update state with filtered data if API call is successful
                const updatedData = filteredData.filter((lot: any) => lot.id !== id); // Remove lot by ID
                setFilteredData(updatedData); // Update state with filtered data
            } else {
                ErrorMessage('Error deleting lot!')
            }
        } catch (error) {
            console.error('Error deleting auction:', error);
        }
    };


    return (
        <Box sx={{ padding: 2 }}>
            <AuctionHeader
                headerType={"lots"}
                isCurrent={isCurrentLot}
                onToggle={() => setIsCurrentLot((prev) => !prev)}
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
            />
            {!isFetchingData && filteredData?.length ?
                <Box>
                    {/* Lot Cards */}
                    <Fade in={fadeIn} timeout={200}>
                        <Container disableGutters maxWidth={false} sx={{ mt: 3 }}>
                            <Grid container spacing={3}>
                                {filteredData && filteredData.map((lot: any) => (
                                    <Grid item xs={12} sm={6} md={4} xl={3} key={lot.id}>
                                        <AuctionCard
                                            headerType={"lots"}
                                            cardData={lot}
                                            handleEdit={handleEdit}
                                            handleDelete={() => handleDeleteLot(lot.id)}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Container>
                    </Fade>

                    <PaginationButton filteredData={filteredData} setFilteredData={setFilteredData} />
                </Box>
                : isFetchingData ?
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
                    :
                    <NoRecordFound />
            }
            {/* Confirmation Modal */}
            <CustomDialogue
                type={"delete"}
                title={"Confirm Deletion"}
                message={"Are you sure you want to delete this auction? This action cannot be undone."}
                openDialogue={confirmDelete}
                handleCloseModal={handleCloseModal}
                handleConfirmModal={handleConfirmDelete}
            />
        </Box>
    );
};

export default Lots;
