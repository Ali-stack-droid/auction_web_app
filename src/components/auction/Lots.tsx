import { useState, useEffect } from 'react';
import {
    Box,
    Fade,
    Container,
    Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomDialogue from '../custom-components/CustomDialogue';
import AuctionHeader from './auction-components/AuctionHeader';
import AuctionCard from './auction-components/AuctionCard';
import lots from './lotsData';
import PaginationButton from './auction-components/PaginationButton';

// Define the type interface for LotsData
interface Lot {
    id: number;
    lotNumber: string;
    name: string;
    description: string;
    countDown: string;
    location: string;
    image: string;
    type: string;
}

const Lots = () => {
    const [isCurrentLot, setIsCurrentLot] = useState(true); // Toggle between Current and Past Lots
    const [selectedLocation, setSelectedLocation]: any = useState(null); // Filter by location
    const [lotsData, setLotsData] = useState<Lot[]>(lots); // Original data state
    const [filteredData, setFilteredData] = useState<Lot[]>([]); // Filtered data state
    const [fadeIn, setFadeIn] = useState(false); // Fade control state
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleteLotId, setDeleteLotId] = useState<string | null>(null);

    useEffect(() => {
        setFilteredData(lots)
    }, [lots])

    // Open confirmation modal
    const handleDeleteLot = (id: string) => {
        setDeleteLotId(id);
        setConfirmDelete(true);
    };

    // Close modal
    const handleCloseModal = () => {
        setConfirmDelete(false);
        setDeleteLotId(null);
    };

    // Confirm deletion
    const handleConfirmDelete = () => {
        if (deleteLotId) {
            handleDelete(deleteLotId); // Call the delete handler
        }
        handleCloseModal();
    };

    const navigate = useNavigate();

    // Handle Edit
    const handleEdit = (id: string) => {
        navigate(`edit/${id}`); // Navigate to the edit route with lot ID
    };

    // Handle Delete
    const handleDelete = (id: string) => {
        const updatedData = filteredData.filter((lot) => lot.id !== parseInt(id)); // Remove lot by ID
        setFilteredData(updatedData); // Update state with filtered data
    };

    // Filtered Data based on `type` and `location`
    useEffect(() => {
        const newFilteredData = lotsData.filter((lot) => {
            const matchesType = lot.type === (isCurrentLot ? "current" : "past");
            const matchesLocation = selectedLocation ? lot.location === selectedLocation : true;
            return matchesType && matchesLocation;
        });
        setFadeIn(false); // Trigger fade-out
        setTimeout(() => {
            setFadeIn(true); // Trigger fade-in after filtering
            setFilteredData(newFilteredData);
        }, 200);
    }, [isCurrentLot, selectedLocation, lotsData]);

    return (
        <Box sx={{ padding: 2 }}>
            <AuctionHeader
                headerType={"lots"}
                isCurrent={isCurrentLot}
                onToggle={() => setIsCurrentLot((prev) => !prev)}
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
            />

            {/* Lot Cards */}
            <Fade in={fadeIn} timeout={200}>
                <Container disableGutters maxWidth={false} sx={{ mt: 3 }}>
                    <Grid container spacing={3}>
                        {filteredData.map((lot) => (
                            <Grid item xs={12} sm={6} md={4} xl={3} key={lot.id}>
                                <AuctionCard
                                    headerType={"lots"}
                                    cardData={lot}
                                    handleEdit={handleEdit}
                                    handleDelete={() => handleDeleteLot(lot.id.toString())}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Fade>

            <PaginationButton filteredData={filteredData} setFilteredData={setFilteredData} />

            {/* Confirmation Modal */}
            <CustomDialogue
                confirmDelete={confirmDelete}
                handleCloseModal={handleCloseModal}
                handleConfirmDelete={handleConfirmDelete}
            />
        </Box>
    );
};

export default Lots;
