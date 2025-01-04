import { Dialog, DialogContent, IconButton, Typography, Box, Button } from '@mui/material';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import useWinnerModalStyle from '../auction/detail-pages/detail-pages-components/WinnerModalStyles';

const ViewModal = ({ open, onClose, data, type }: any) => {
    const classes = useWinnerModalStyle();

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" >
            <DialogContent className={classes.modalContent}>
                <Typography variant="h5" className={classes.title}>
                    Invoice Details
                </Typography>
                <h4>
                    Sorry! This page is under development.
                </h4>
            </DialogContent>
        </Dialog >
    );
};

export default ViewModal;
