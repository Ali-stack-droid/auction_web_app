import { Box, Typography } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import WatchLaterRoundedIcon from '@mui/icons-material/WatchLaterRounded';
import ViewInArRoundedIcon from '@mui/icons-material/ViewInArRounded';
import { useAuctionDetailStyles } from '../AuctionStyles';
import theme from '../../../../theme';

const LotDetails = ({ lotData }: any) => {
    const classes = useAuctionDetailStyles();

    return (
        <Box className={classes.lotContainer}>
            <Typography fontSize={12} width={"70%"}>
                {lotData.description}
            </Typography>
            <Box display={'flex'} justifyContent={"space-between"} alignItems={"center"} >
                <Box display={"flex"} flex={0.8}>
                    <Typography color={theme.palette.primary.main9} fontWeight={500}>Lot Number</Typography>
                    <Typography ml={0.5} color={theme.palette.primary.main2}>: #&nbsp;{lotData.lotNumber}</Typography>
                </Box>
                <Box display={"flex"} flex={1}>
                    <Typography color={theme.palette.primary.main9} fontWeight={500} whiteSpace={"nowrap"}>Count Down</Typography>
                    <Typography ml={0.5} letterSpacing={3} color={theme.palette.primary.main2} >:&nbsp;{"10:10:10"}</Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default LotDetails;
