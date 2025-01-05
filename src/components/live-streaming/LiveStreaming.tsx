import { useState, useEffect } from 'react';
import {
    Box,
    Fade,
    Container,
    Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomDialogue from '../custom-components/CustomDialogue';
import AuctionCard from '../auction/auction-components/AuctionCard';
import AuctionHeader from '../auction/auction-components/AuctionHeader';
import { liveStreamData } from './liveStreamData';
import PaginationButton from '../auction/auction-components/PaginationButton';


const LiveStreaming = () => {
    const [isCurrentAuction, setIsCurrentAuction] = useState(true); // Toggle between Current and Past Auctions
    const [selectedLocation, setSelectedLocation]: any = useState(null); // Filter by location
    const [filteredData, setFilteredData] = useState(liveStreamData); // Filtered data state
    const [fadeIn, setFadeIn] = useState(false); // Fade control state
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleteAuctionId, setDeleteAuctionId] = useState<string | null>(null);
    const [isFetchingData, setIsFetchingData] = useState(false);


    // useEffect(() => {
    //     if (!isFetchingData) {
    //         setIsFetchingData(true)
    //         fetchLiveStreamingData();
    //     }
    // }, [isCurrentAuction])

    // const fetchLiveStreamingData = async () => {
    //     try {
    //         const response = await getCurrentAuctions()

    //         // console.log("data: ", response.data);
    //         if (response.data && response.data.length > 0) {
    //             const updatedData = response.data.map((item: any) => ({
    //                 id: item.Id,
    //                 name: item.Name,
    //                 image: item.Image,
    //                 details: {
    //                     location: `${item.City}, ${item.Country}`,
    //                     dateRange: `${item.StartDate} to ${item.EndDate}`,
    //                     lotsAvailable: item.TotalLots // Replace with actual data if available
    //                 }
    //             }));
    //             setFilteredData(updatedData);
    //             setPaginationedData(updatedData)
    //         } else {
    //             setFilteredData([]);
    //             setPaginationedData([])
    //         }
    //         setIsFetchingData(false)

    //     } catch (error) {
    //         console.error('Error fetching auction data:', error);
    //         setIsFetchingData(false)
    //     }
    // };


    // Open confirmation modal
    const handleDeleteAuction = (id: string) => {
        setDeleteAuctionId(id);
        setConfirmDelete(true);
    };

    // Close modal
    const handleCloseModal = () => {
        setConfirmDelete(false);
        setDeleteAuctionId(null);
    };

    // Confirm deletion
    const handleConfirmDelete = () => {
        if (deleteAuctionId) {
            handleDelete(deleteAuctionId); // Call the delete handler
        }
        handleCloseModal();
    };

    const navigate = useNavigate()

    // Handle Edit
    const handleEdit = (id: string) => {
        navigate(`/auction/edit/${id}`); // Navigate to the edit route with auction ID
    };

    // Handle Delete
    const handleDelete = (id: string) => {
        const updatedData = filteredData.filter((auction: any) => auction.id !== id); // Remove auction by ID
        setFilteredData(updatedData); // Update state with filtered data
    };


    // Filtered Data based on `type` and `location`
    useEffect(() => {

        setFadeIn(false); // Trigger fade-out
        setTimeout(() => {
            setFadeIn(true); // Trigger fade-in after filtering
            setFilteredData(liveStreamData);
        }, 200);
    }, []);


    return (
        <Box sx={{ padding: 2 }}>
            <AuctionHeader
                headerType={"live"}
                isCurrent={isCurrentAuction}
                onToggle={() => setIsCurrentAuction((prev) => !prev)}
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
            />

            {/* Auction Cards */}
            <Fade in={fadeIn} timeout={200}>
                <Container disableGutters maxWidth={false} sx={{ mt: 3 }}>
                    <Grid container spacing={3}>
                        {filteredData.map((auction: any) => (
                            <Grid item xs={12} sm={6} md={4} xl={3} key={auction.id}>
                                <AuctionCard
                                    headerType={"live"}
                                    cardData={auction}
                                    handleEdit={handleEdit}
                                    handleDelete={() => handleDeleteAuction(auction.id)}
                                    handleMoveModal={() => { }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Fade>

            {/* <PaginationButton filteredData={filteredData} setFilteredData={setFilteredData} /> */}

            {/* Confirmation Modal */}
            <CustomDialogue
                type={"delete"}
                title={"Confirm Deletion"}
                message={"Are you sure you want to delete this auction? This action cannot be undone."}
                openDialogue={confirmDelete}
                handleCloseModal={handleCloseModal}
                handleConfirmModal={handleConfirmDelete}
                isDeleting={false}
            />

        </Box>
    );
};

export default LiveStreaming;
