import { useState, useEffect } from 'react';
import {
    Box,
    Fade,
    Container,
    Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuctionCard from './AuctionCard';
import CustomDialogue from '../custom-components/CustomDialogue';
import auctionData from './auctionData';
import AuctionHeader from './components/AuctionHeader';

const Auction = ({ type }: { type: string }) => {
    const [isCurrentAuction, setIsCurrentAuction] = useState(true); // Toggle between Current and Past Auctions
    const [selectedLocation, setSelectedLocation]: any = useState(null); // Filter by location
    const [filteredData, setFilteredData] = useState(auctionData); // Filtered data state
    const [fadeIn, setFadeIn] = useState(false); // Fade control state
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleteAuctionId, setDeleteAuctionId] = useState<string | null>(null);

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
        const newFilteredData = auctionData.filter((auction: any) => {
            const matchesType = auction.type === (isCurrentAuction ? "current" : "past");
            const matchesLocation = selectedLocation ? auction.location === selectedLocation : true;
            return matchesType && matchesLocation;
        });
        setFadeIn(false); // Trigger fade-out
        setTimeout(() => {
            setFadeIn(true); // Trigger fade-in after filtering
            setFilteredData(newFilteredData);
        }, 200);
    }, [isCurrentAuction, selectedLocation]);

    return (
        <Box sx={{ padding: 2 }}>
            <AuctionHeader
                type={type}
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
                                    auction={auction}
                                    handleEdit={handleEdit}
                                    handleDelete={() => handleDeleteAuction(auction.id)}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Fade>

            {/* Confirmation Modal */}
            <CustomDialogue
                confirmDelete={confirmDelete}
                handleCloseModal={handleCloseModal}
                handleConfirmDelete={handleConfirmDelete}
            />

        </Box>
    );
};

export default Auction;
