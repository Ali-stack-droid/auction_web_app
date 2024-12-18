import { Box, Typography } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import WatchLaterRoundedIcon from '@mui/icons-material/WatchLaterRounded';
import ViewInArRoundedIcon from '@mui/icons-material/ViewInArRounded';
import { useAuctionDetailStyles } from './AuctionStyles';

const AuctionDetails = ({ auction }: any) => {
    const classes = useAuctionDetailStyles();

    return (
        <Box className={classes.container}>
            {/* Row 1 */}
            <Box className={classes.row}>
                {/* Location */}
                <Box className={classes.iconText}>
                    <PlaceIcon fontSize="small" color="primary" />
                    <Typography className={classes.text}>{auction.location}</Typography>
                </Box>
                {/* Date Range */}
                <Box className={`${classes.iconText} ${classes.flexItem}`}>
                    <WatchLaterRoundedIcon fontSize="small" color="primary" />
                    <Typography className={classes.text} sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
                        {auction.dateRange}
                    </Typography>
                </Box>
            </Box>

            {/* Row 2 */}
            <Box className={classes.row}>
                {/* Lots Available */}
                <Box className={classes.iconText}>
                    <ViewInArRoundedIcon fontSize="small" color="primary" />
                    <Typography className={classes.text}>{auction.lotsAvailable}</Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default AuctionDetails;
