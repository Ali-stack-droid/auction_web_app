import { Dialog, DialogContent, IconButton, Typography, Box, Button } from '@mui/material';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import useWinnerModalStyle from '../auction/detail-pages/detail-pages-components/WinnerModalStyles';

const ViewModal = ({ open, onClose, data, type }: any) => {
    const classes = useWinnerModalStyle();

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" >

            {type !== "move" &&

                <Box className={classes.closeButtonWrapper}>
                    <IconButton onClick={onClose} className={classes.closeButton}>
                        <ClearRoundedIcon />
                    </IconButton>
                </Box>
            }
            {type === "move" ?
                <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2, padding: "10px 0" }}>
                    <DialogContent className={classes.moveModal}>
                        <Typography pt={5} className={classes.text}>
                            Are You wanted to move lot from past auction to current auction.
                        </Typography>
                    </DialogContent>
                    <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 2, padding: "10px 0" }}>
                        <Button
                            variant="contained"
                            size="small"
                            className={classes.yes}
                            onClick={onClose}
                        >
                            Yes
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            className={classes.no}
                            onClick={onClose}
                        >
                            No
                        </Button>
                    </Box>
                </Box>
                :
                <DialogContent className={classes.modalContent}>
                    <Typography variant="h5" className={classes.title}>
                        Invoice Details
                    </Typography>
                    <h4>
                        Sorry! This page is under development.
                    </h4>
                </DialogContent>}
        </Dialog >
    );
};

export default ViewModal;
