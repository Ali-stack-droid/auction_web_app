import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, IconButton, Typography, Box } from '@mui/material';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import useWinnerModalStyle from './WinnerModalStyles';
import { getWinnerByLotId } from '../../../Services/Methods';

const WinnerModal = ({ open, onClose, lotId }: any) => {
    const classes = useWinnerModalStyle();
    const [winner, setWinner]: any = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchWinner = async () => {
            setLoading(true);
            try {
                const response = await getWinnerByLotId(lotId);
                const winnerDetails = response.data;
                const formattedWinner = {
                    name: winnerDetails.Clients?.Name || "N/A",
                    email: winnerDetails.Clients?.Email || "N/A",
                    phone: winnerDetails.Clients?.Phone || "N/A", // Replace with actual phone if available
                    location: winnerDetails.Clients?.Address || "N/A",
                    image: winnerDetails.Lots?.Image || `${process.env.PUBLIC_URL}/assets/pngs/winner.png`,
                };
                setWinner(formattedWinner);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (open && lotId) fetchWinner();
    }, [open, lotId]);


    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" >
            <Box className={classes.closeButtonWrapper}>
                <IconButton onClick={onClose} className={classes.closeButton}>
                    <ClearRoundedIcon />
                </IconButton>
            </Box>
            <DialogContent className={classes.modalContent}>
                <Typography variant="h5" className={classes.title}>
                    Auction Winner Details
                </Typography>
                <Box className={classes.imageWrapper}>
                    <Box
                        component="img"
                        src={winner.image}
                        alt={'Winner Image'}
                        className={classes.image}
                    />
                </Box>
                <Typography variant="h6" className={classes.name}>
                    {winner.name}
                </Typography>

                <Box className={classes.details}>
                    <Box className={classes.detailsContainer}>
                        <Box className={classes.row}>
                            <Box display="flex" alignItems="center">
                                <EmailIcon className={classes.icon} />
                                <Typography className={classes.infoText}>{winner.email}</Typography>
                            </Box>
                            <Box display="flex" alignItems="center">
                                <PhoneIcon className={classes.icon} />
                                <Typography className={classes.infoText}>{winner.phone}</Typography>
                            </Box>
                        </Box>

                        <Box display="flex" alignItems="start">
                            <LocationOnIcon className={classes.icon} />
                            <Typography className={classes.infoText} >
                                {winner.location}
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Box className={classes.wave}>
                    <img
                        src={`${process.env.PUBLIC_URL}/assets/svgs/wave.svg`}
                        alt="Wave Design"
                        style={{ width: '100%', height: '100%' }}
                    />
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default WinnerModal;
