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
    const [lotsData, setLotsData] = useState<Lot[]>([]); // Original data state
    const [filteredData, setFilteredData] = useState<Lot[]>([]); // Filtered data state
    const [fadeIn, setFadeIn] = useState(false); // Fade control state
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleteLotId, setDeleteLotId] = useState<string | null>(null);

    useEffect(() => {
        const initialData: Lot[] = [
            { id: 1, lotNumber: "1", name: "Gold Necklace", description: "A vintage gold necklace with intricate design.", countDown: "1 day", location: "New York, USA", image: `${process.env.PUBLIC_URL}/assets/pngs/jacket.png`, type: "current" },
            { id: 2, lotNumber: "2", name: "Diamond Ring", description: "A rare diamond ring with flawless clarity.", countDown: "2 days", location: "United Kingdom, London", image: `${process.env.PUBLIC_URL}/assets/pngs/mercedes.png`, type: "past" },
            { id: 3, lotNumber: "3", name: "Pearl Earrings", description: "A pair of elegant pearl earrings.", countDown: "3 days", location: "Pakistan, Islamabad", image: `${process.env.PUBLIC_URL}/assets/pngs/jacket.png`, type: "current" },
            { id: 4, lotNumber: "4", name: "Antique Brooch", description: "A beautifully crafted antique brooch.", countDown: "5 days", location: "New York, USA", image: `${process.env.PUBLIC_URL}/assets/pngs/mercedes.png`, type: "past" },
            { id: 5, lotNumber: "5", name: "Silver Bracelet", description: "A delicate silver bracelet with intricate carvings.", countDown: "7 days", location: "United Kingdom, London", image: `${process.env.PUBLIC_URL}/assets/pngs/watch.png`, type: "current" },
            { id: 6, lotNumber: "6", name: "Vintage Watch", description: "A rare vintage wristwatch from the 1950s.", countDown: "9 days", location: "Pakistan, Islamabad", image: `${process.env.PUBLIC_URL}/assets/pngs/jacket.png`, type: "past" },
            { id: 7, lotNumber: "7", name: "Gold Ring", description: "A luxurious gold ring with a custom design.", countDown: "11 days", location: "New York, USA", image: `${process.env.PUBLIC_URL}/assets/pngs/watch.png`, type: "current" },
            { id: 8, lotNumber: "8", name: "Sapphire Pendant", description: "A sapphire pendant with a modern touch.", countDown: "13 days", location: "United Kingdom, London", image: `${process.env.PUBLIC_URL}/assets/pngs/jacket.png`, type: "past" },
            { id: 9, lotNumber: "9", name: "Emerald Brooch", description: "A beautiful emerald brooch with antique value.", countDown: "15 days", location: "Pakistan, Islamabad", image: `${process.env.PUBLIC_URL}/assets/pngs/mercedes.png`, type: "current" },
        ];
        setLotsData(initialData);
        setFilteredData(initialData); // Initialize filtered data
    }, []);

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
            const matchesType = lot.countDown.includes(isCurrentLot ? "day" : "days");
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
