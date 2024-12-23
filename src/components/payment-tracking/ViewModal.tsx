import React from 'react';
import { Dialog, DialogContent, IconButton, Typography, Box } from '@mui/material';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import useWinnerModalStyle from '../auction/detail-pages/WinnerModalStyles';

const ViewModal = ({ open, onClose, invoice }: any) => {
    const classes = useWinnerModalStyle();

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" >
            <Box className={classes.closeButtonWrapper}>
                <IconButton onClick={onClose} className={classes.closeButton}>
                    <ClearRoundedIcon />
                </IconButton>
            </Box>
            <DialogContent className={classes.modalContent}>
                <Typography variant="h5" className={classes.title}>
                    Invoice Details
                </Typography>
                <h4>
                    Sorry! This page is under development.
                </h4>
            </DialogContent>
        </Dialog>
    );
};

export default ViewModal;
