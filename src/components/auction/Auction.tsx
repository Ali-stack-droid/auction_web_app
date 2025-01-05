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
import { deleteAuction, getCurrentAuctions, getCurrentAuctionsByLocation, getCurrentLocations, getPastAuctions, getPastAuctionsByLocation, getPastLocations } from '../Services/Methods';
import NoRecordFound from '../../utils/NoRecordFound';
import { ErrorMessage, SuccessMessage } from '../../utils/ToastMessages';

const Auction = ({ searchTerm }: any) => {
    const [fadeIn, setFadeIn] = useState(false); // Fade control state
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleteAuctionId, setDeleteAuctionId] = useState<string | null>(null);
    const [isFetchingData, setIsFetchingData] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const [isCurrentAuction, setIsCurrentAuction] = useState(true); // Toggle between Current and Past Auctions
    const [selectedLocation, setSelectedLocation]: any = useState(null); // Filter by location
    const [filteredData, setFilteredData]: any = useState([]); // Filtered data state
    const [paginationedData, setPaginationedData]: any = useState([]); // Filtered data state
    const [locations, setLocations]: any = useState([]); // Filtered data state

    useEffect(() => {
        if (!isFetchingData) {
            setIsFetchingData(true)
            fetchAuctionData();

        }
    }, [isCurrentAuction, selectedLocation])

    const fetchAuctionData = async () => {
        try {
            // Critical request:
            let response;
            if (isCurrentAuction) {
                response = selectedLocation
                    ? await getCurrentAuctionsByLocation(selectedLocation)
                    : await getCurrentAuctions()
            } else {
                response = selectedLocation
                    ? await getPastAuctionsByLocation(selectedLocation)
                    : await getPastAuctions();
            }

            if (response.data && response.data.length > 0) {
                const updatedData = response.data.map((item: any) => ({
                    id: item.Id,
                    name: item.Name,
                    image: item.Image,
                    details: {
                        location: `${item.City}, ${item.Country}`,
                        dateRange: `${item.StartDate} to ${item.EndDate}`,
                        lotsAvailable: item.TotalLots // Replace with actual data if available
                    }
                }));
                setFilteredData(updatedData);
                setPaginationedData(updatedData)
            } else {
                setFilteredData([]);
                setPaginationedData([])
            }

            const locationResponse = isCurrentAuction
                ? await getCurrentLocations()
                : await getPastLocations();

            if (locationResponse.data && locationResponse.data.length > 0) {
                const updatedLocation = locationResponse.data;
                setLocations(updatedLocation);
            } else {
                setLocations([]);
            }


        } catch (error) {
            console.error('Error fetching auction data:', error);
        } finally {
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
        if (!isDeleting) {
            setIsDeleting(false)
            setConfirmDelete(false);
            setDeleteAuctionId(null);
        }
    };

    // Confirm deletion
    const handleConfirmDelete = () => {
        if (deleteAuctionId && !isDeleting) {
            setIsDeleting(true)
            handleDelete(deleteAuctionId); // Call the delete handler
        }
    };

    const navigate = useNavigate()

    // Handle Edit
    const handleEdit = (id: string) => {
        navigate(`edit/${id}`); // Navigate to the edit route with auction ID
    };

    const handleDelete = async (id: string) => {
        try {
            // Call the delete API
            const response: any = await deleteAuction(id);
            if (response.status === 200) {
                SuccessMessage('Auction deleted successfully!')
                // Update state with filtered data if API call is successful
                const updatedData = filteredData.filter((auction: any) => auction.id !== id);
                setFilteredData(updatedData);
            } else {
                ErrorMessage('Error deleting auction!')
            }
        } catch (error) {
            console.error('Error deleting auction:', error);
        } finally {
            handleCloseModal();
        }
    };

    // Filtered Data based on `type` and `location`
    useEffect(() => {

        setFadeIn(false); // Trigger fade-out
        setTimeout(() => {
            setFadeIn(true); // Trigger fade-in after filtering
        }, 300);
    }, [paginationedData]);


    return (
        <Box sx={{ padding: 2 }}>
            <AuctionHeader
                headerType={"auction"}
                isCurrent={isCurrentAuction}
                onToggle={() => {
                    if (!isFetchingData) {
                        setIsCurrentAuction((prev) => !prev)
                    }
                }}
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                locations={locations}
            />

            <Box sx={{ minHeight: "500px" }}>
                {!isFetchingData && paginationedData?.length ?
                    <Fade in={fadeIn} timeout={300}>
                        <Container disableGutters maxWidth={false} sx={{ mt: 3 }}>
                            <Grid container spacing={3}>
                                {paginationedData
                                    .filter((auction: any) => {
                                        if (!searchTerm) return true; // Show all if no search term
                                        const lowerCaseTerm = searchTerm.toLowerCase();
                                        return (
                                            auction.id.toString().includes(searchTerm) || // Match ID
                                            auction.name.toLowerCase().includes(lowerCaseTerm) || // Match Name
                                            auction.details.location.toLowerCase().includes(lowerCaseTerm) // Match Location
                                        );
                                    })
                                    .map((auction: any) => (
                                        <Grid item xs={12} sm={6} md={4} xl={3} key={auction.id}>
                                            <AuctionCard
                                                headerType={"auction"}
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
            </Box>

            <PaginationButton filteredData={filteredData} setPaginationedData={setPaginationedData} />
            {/* Confirmation Modal */}
            <CustomDialogue
                title={"Confirm Deletion"}
                message={"Are you sure you want to delete this auction? This action cannot be undone."}
                type={"delete"}
                openDialogue={confirmDelete}
                handleCloseModal={handleCloseModal}
                handleConfirmModal={handleConfirmDelete}
                isDeleting={isDeleting}
            />

        </Box >
    );
};

export default Auction;
