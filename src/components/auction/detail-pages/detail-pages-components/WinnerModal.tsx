import React from 'react';
import { Dialog, DialogContent, IconButton, Typography, Box } from '@mui/material';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import useWinnerModalStyle from './WinnerModalStyles';

const WinnerModal = ({ open, onClose }: any) => {
    const classes = useWinnerModalStyle();

    const winnerDetails = {
        name: "Ali Cheema",
        email: "example@gmail.com",
        phone: "+61(09)7866 3431",
        location: "#53 Prince Juan Carlos Washington, New York, NY 10012, USA",
        image: `${process.env.PUBLIC_URL}/assets/pngs/winner.png`,
    };

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
                        src={winnerDetails.image}
                        alt={'Winner Image'}
                        className={classes.image}
                    />
                </Box>
                <Typography variant="h6" className={classes.name}>
                    {winnerDetails.name}
                </Typography>

                <Box className={classes.details}>
                    <Box className={classes.detailsContainer}>
                        <Box className={classes.row}>
                            <Box display="flex" alignItems="center">
                                <EmailIcon className={classes.icon} />
                                <Typography className={classes.infoText}>{winnerDetails.email}</Typography>
                            </Box>
                            <Box display="flex" alignItems="center">
                                <PhoneIcon className={classes.icon} />
                                <Typography className={classes.infoText}>{winnerDetails.phone}</Typography>
                            </Box>
                        </Box>

                        <Box display="flex" alignItems="start">
                            <LocationOnIcon className={classes.icon} />
                            <Typography className={classes.infoText} >
                                {winnerDetails.location}
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
