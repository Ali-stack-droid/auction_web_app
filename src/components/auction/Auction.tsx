import { useState, useEffect } from 'react';
import {
    Box,
    Fade,
    Container,
    Grid,
    CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuctionCard from './auction-components/AuctionCard';
import CustomDialogue from '../custom-components/CustomDialogue';
import AuctionHeader from './auction-components/AuctionHeader';
import PaginationButton from './auction-components/PaginationButton';
import { getCurrentAuctions, getPastAuctions } from '../Services/Methods';
import NoRecordFound from '../../utils/NoRecordFound';

const Auction = () => {
    const [isCurrentAuction, setIsCurrentAuction] = useState(true); // Toggle between Current and Past Auctions
    const [selectedLocation, setSelectedLocation]: any = useState(null); // Filter by location
    const [filteredData, setFilteredData]: any = useState(); // Filtered data state
    const [fadeIn, setFadeIn] = useState(false); // Fade control state
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleteAuctionId, setDeleteAuctionId] = useState<string | null>(null);
    const [isFetchingData, setIsFetchingData] = useState(false);

    useEffect(() => {
        if (!isFetchingData) {
            setIsFetchingData(true)
            fetchAuctionData();
        }
    }, [isCurrentAuction])

    const fetchAuctionData = async () => {
        try {
            const response = isCurrentAuction
                ? await getCurrentAuctions()
                : await getPastAuctions();

            // console.log("data: ", response.data);
            if (response.data && response.data.length > 0) {
                const updatedData = response.data.map((item: any) => ({
                    id: item.Id,
                    name: item.Name,
                    image: item.Image,
                    details: {
                        location: `${item.City}, ${item.Country}`,
                        dateRange: `${item.StartDate} to ${item.EndDate}`,
                        lotsAvailable: null // Replace with actual data if available
                    }
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
        navigate(`edit/${id}`); // Navigate to the edit route with auction ID
    };

    // Handle Delete
    const handleDelete = (id: string) => {
        const updatedData = filteredData.filter((auction: any) => auction.id !== id); // Remove auction by ID
        setFilteredData(updatedData); // Update state with filtered data
    };


    // Filtered Data based on `type` and `location`
    useEffect(() => {
        // const newFilteredData = auctionData.filter((auction: any) => {
        //     const matchesLocation = selectedLocation ? auction.location === selectedLocation : true;
        //     return matchesLocation;
        // });
        setFadeIn(false); // Trigger fade-out
        setTimeout(() => {
            setFadeIn(true); // Trigger fade-in after filtering
            // setFilteredData(newFilteredData);
        }, 200);
    }, [selectedLocation]);


    return (
        <Box sx={{ padding: 2 }}>
            <AuctionHeader
                headerType={"auction"}
                isCurrent={isCurrentAuction}
                onToggle={() => setIsCurrentAuction((prev) => !prev)}
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
            />

            {!isFetchingData && filteredData?.length ?
                <Box>
                    {/* Auction Cards */}
                    <Fade in={fadeIn} timeout={200}>
                        <Container disableGutters maxWidth={false} sx={{ mt: 3 }}>
                            <Grid container spacing={3}>
                                {filteredData.map((auction: any) => (
                                    <Grid item xs={12} sm={6} md={4} xl={3} key={auction.id}>
                                        <AuctionCard
                                            headerType={"auction"}
                                            cardData={auction}
                                            handleEdit={handleEdit}
                                            handleDelete={() => handleDeleteAuction(auction.id)}
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
                title={"Confirm Deletion"}
                message={"Are you sure you want to delete this auction? This action cannot be undone."}
                type={"delete"}
                openDialogue={confirmDelete}
                handleCloseModal={handleCloseModal}
                handleConfirmDelete={handleConfirmDelete}
            />

        </Box >
    );
};

export default Auction;
