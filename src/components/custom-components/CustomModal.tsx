import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Box, Typography, Button } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

interface CustomModalProps {
    open: boolean;
    onClose: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({ open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <IconButton onClick={onClose} color='primary' sx={{ position: 'absolute', right: 0 }}>
                <HighlightOffIcon />
            </IconButton>
            <DialogContent sx={{ my: 2 }}>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Box
                        component="img"
                        src={`${process.env.PUBLIC_URL}/assets/svgs/congratulation.svg`}
                        alt={`Login Successful`}
                        sx={{
                            width: "120px", // Responsive width
                            height: 'auto', // Maintain aspect ratio
                            transition: 'width 0.2s ease-in-out', // Smooth resize
                        }}
                    />

                </Box>

                <Typography variant="h4" textAlign="center" mt={2} color='primary'>
                    Congratulations!
                </Typography>

                <Typography variant="body1" textAlign="center" mt={2}>
                    You have successfully logged into the system!
                </Typography>

            </DialogContent>
        </Dialog >
    );
};

export default CustomModal;
