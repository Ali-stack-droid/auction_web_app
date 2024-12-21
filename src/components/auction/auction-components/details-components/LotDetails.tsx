import { Box, Typography } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import WatchLaterRoundedIcon from '@mui/icons-material/WatchLaterRounded';
import ViewInArRoundedIcon from '@mui/icons-material/ViewInArRounded';
import { useAuctionDetailStyles } from '../AuctionStyles';

const Details = ({ lotData }: any) => {
    const classes = useAuctionDetailStyles();

    return (
        <Box className={classes.container}>
            {JSON.stringify(lotData)}
        </Box>
    );
};

export default Details;
