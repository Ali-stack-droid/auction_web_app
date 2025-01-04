import { useEffect, useState } from 'react';
import { Dialog, DialogContent, IconButton, Typography, Box, Button, Divider, CircularProgress } from '@mui/material';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import useWinnerModalStyle from './WinnerModalStyles';
import { getCurrentAuctions, moveLotToAuction } from '../../../Services/Methods';
import CustomTextField from '../../../custom-components/CustomTextField';
import { SuccessMessage } from '../../../../utils/ToastMessages';
import theme from '../../../../theme';
import { getQueryParam } from '../../../../helper/GetQueryParam';

const MoveLotModal = ({ open, handleMoveModal, setMoveModalOpen, moveLotId }: any) => {
    const classes = useWinnerModalStyle();

    const [searchById, setSearchById] = useState('');
    const [searchByName, setSearchByName] = useState('');
    const [selectedAuction, setSelectedAuction] = useState(0);
    const [auctionList, setAuctionList]: any = useState([]);

    const [isFetching, setIsFetching] = useState(false);
    const [isMoving, setIsMoving] = useState(false);


    useEffect(() => {
        const fetchAuctionData = async () => {
            setIsFetching(true)
            try {
                const response = await getCurrentAuctions();

                if (response.data && response.data.length > 0) {
                    const updateAuctions = response.data.map((item: any) => ({
                        id: item.Id,
                        name: item.Name,
                        type: item.Type,
                        image: item.Image
                    }));
                    setAuctionList(updateAuctions);
                } else {
                    setAuctionList([]);
                }

            } catch (error) {
                console.error('Error fetching auction data:', error);
            } finally {
                setIsFetching(false); // Set loading state to false when the call ends
            }
        };
        if (open && moveLotId)
            fetchAuctionData();
    }, [open]);

    const handleMoveLot = async (newAuctionId: any) => {
        if (!isMoving) {
            setIsMoving(true);
            let responsedId = 0;
            try {
                const response = await moveLotToAuction(moveLotId, newAuctionId)
                if (response) {
                    responsedId = response.data.Id;
                    SuccessMessage("Lot moved to auction successfuly!");
                }
            } catch (error) {
                console.error("Error moving lot to new auction:", error);
            } finally {
                setIsMoving(false);
                handleMoveModal(responsedId);
                setMoveModalOpen(false);
            }
        }
    };

    return (
        <Dialog open={open} onClose={() => setMoveModalOpen(false)} fullWidth maxWidth="md" >
            <Box p={2}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: "5px" }}>
                    {/* Title */}
                    <Typography variant="h5" className={classes.title}>
                        Move Lot to Auction
                    </Typography>
                    <IconButton onClick={() => setMoveModalOpen(false)}>
                        <ClearRoundedIcon sx={{
                            color: 'black',
                            padding: "1px",
                            border: "1px solid #676767",
                            borderRadius: "50px"
                        }} />
                    </IconButton>
                </Box>
                <Divider sx={{ py: 1 }} />

                <DialogContent className={classes.modalContent}>

                    {/* Search Fields */}
                    <Box sx={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'start', padding: '16px',
                    }}>
                        <Box display="flex" gap={5}>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'start'
                            }}>
                                <Typography className={classes.label} >
                                    Search by Auction ID
                                </Typography>
                                <CustomTextField
                                    sx={{ height: "10px" }}
                                    value={searchById}
                                    onChange={(e) => {
                                        setSearchById(e.target.value);
                                        setSearchByName(''); // Clear the other field
                                        setSelectedAuction(0)
                                    }}
                                    fullWidth
                                    placeholder='# 123'
                                />
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'start'
                            }}>
                                <Typography className={classes.label} >
                                    Search by Auction Name
                                </Typography>
                                <CustomTextField
                                    sx={{ height: "10px" }}
                                    value={searchByName}
                                    onChange={(e) => {
                                        setSearchByName(e.target.value);
                                        setSearchById(''); // Clear the other field
                                        setSelectedAuction(0)
                                    }}
                                    fullWidth
                                    placeholder='Cars Auction'
                                />
                            </Box>
                        </Box>
                        <Button
                            onClick={() => handleMoveLot(selectedAuction)}
                            variant="contained"
                            color="primary"
                            className={classes.filterButton}
                        >
                            {isMoving ? <CircularProgress size={25} sx={{ color: theme.palette.primary.main3 }} /> : 'Move Lot'}
                        </Button>
                    </Box>

                    {!isFetching && auctionList.length === 0 ?
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '50vh',
                            }}
                        >
                            <h2>No Auction Found!</h2>
                        </Box>
                        : !isFetching ?
                            <Box style={{ maxHeight: '300px', overflowY: 'auto', padding: '16px', marginTop: "20px" }}>
                                {auctionList
                                    .filter((auction: any) => {
                                        const aucId = getQueryParam('aucId'); // Get the auction ID from query params
                                        if (aucId && auction.id + "" === aucId + "") return false; // Exclude auctions that don't match aucId
                                        if (searchById) return auction.id.toString().includes(searchById);
                                        if (searchByName) return auction.name.toLowerCase().includes(searchByName.toLowerCase());
                                        return true;
                                    })
                                    .map((auction: any) => (
                                        <Box
                                            key={auction.id}
                                            onClick={() => setSelectedAuction(auction.id)}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '16px',
                                                border: selectedAuction === auction.id ? '2px solid #1976d2' : '1px solid #ccc',
                                                borderRadius: '8px',
                                                padding: '12px',
                                                marginBottom: '12px',
                                                cursor: 'pointer',
                                                backgroundColor: selectedAuction === auction.id ? '#e3f2fd' : '#fff',
                                                transition: 'transform 0.2s, box-shadow 0.2s, background-color 0.3s', // Add transition for background color
                                                boxShadow: selectedAuction === auction.id ? '0px 4px 12px rgba(0, 0, 0, 0.2)' : '0px 2px 8px rgba(0, 0, 0, 0.1)',
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = '#f1f1f1'; // Change background on hover
                                            }}
                                            onMouseLeave={(e) => {
                                                if (selectedAuction !== auction.id) {
                                                    e.currentTarget.style.backgroundColor = '#fff'; // Revert back when hover ends
                                                }
                                            }}
                                        >
                                            {/* Image Section */}
                                            <Box
                                                component="img"
                                                src={auction.image || `${process.env.PUBLIC_URL}/assets/pngs/default-auction.png`}
                                                alt={auction.name}
                                                style={{
                                                    width: '80px',
                                                    height: '80px',
                                                    objectFit: 'cover',
                                                    borderRadius: '8px',
                                                    border: '1px solid #ccc',
                                                }}
                                            />

                                            {/* Auction Details */}
                                            <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'start' }}>
                                                <Typography variant="body1" style={{ fontWeight: 600, color: '#333' }}>
                                                    Auction ID: {auction.id}
                                                </Typography>
                                                <Typography variant="body1" style={{ fontSize: '16px', color: '#555' }}>
                                                    Auction Name: {auction.name}
                                                </Typography>
                                                <Typography variant="body2" style={{ color: '#777' }}>
                                                    Auction Type: {auction.type}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    ))}
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
                                <CircularProgress size={50} disableShrink />
                            </Box>
                    }

                </DialogContent >
            </Box >
        </Dialog >

    );
};

export default MoveLotModal;
