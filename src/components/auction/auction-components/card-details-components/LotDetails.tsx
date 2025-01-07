import { Box, Typography } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import WatchLaterRoundedIcon from '@mui/icons-material/WatchLaterRounded';
import ViewInArRoundedIcon from '@mui/icons-material/ViewInArRounded';
import { useAuctionDetailStyles } from '../AuctionStyles';
import theme from '../../../../theme';
import { useState, useEffect } from 'react';

const LotDetails = ({ lotData }: any) => {
    const classes = useAuctionDetailStyles();
    const [countdown, setCountdown] = useState<string>('00:00:00');

    useEffect(() => {
        const parseDateTime = () => {
            const [startDate, endDate] = lotData.details.date.split(' to ');
            const [startTime, endTime] = lotData.details.time.split(' to ');

            return {
                startDateTime: new Date(`${startDate} ${startTime}`),
                endDateTime: new Date(`${endDate} ${endTime}`),
            };
        };
        const calculateCountdown = () => {
            const { endDateTime } = parseDateTime();
            const now = new Date();

            const remainingTime = endDateTime.getTime() - now.getTime();
            if (remainingTime > 0) {
                const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
                const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
                const seconds = Math.floor((remainingTime / 1000) % 60);

                setCountdown(
                    `${days}d"${hours}h ${minutes}m ${seconds}s`
                );
            } else {
                setCountdown('0d 0h 0m 0s'); // Auction ended
            }
        };

        calculateCountdown(); // Initial calculation
        const interval = setInterval(calculateCountdown, 1000); // Update every second

        return () => clearInterval(interval); // Cleanup on component unmount
    }, [lotData.details.date, lotData.details.time]);

    return (
        <Box className={classes.lotContainer}>
            <Typography fontSize={12} width={"70%"} height={'30px'}>
                {lotData.description.length > 45 ? `${lotData.description.substring(0, 60)}...` : lotData.description}
            </Typography>
            <Box display={'flex'} justifyContent={"space-between"} alignItems={"center"} flexWrap={'wrap'} >
                <Box display={"flex"} flex={0.8} whiteSpace={'nowrap'}>
                    <Typography color={theme.palette.primary.main9} fontWeight={500}>Lot Number</Typography>
                    <Typography ml={0.5} color={theme.palette.primary.main2}>: #&nbsp;{lotData.lotNumber}</Typography>
                </Box>
                <Box display={"flex"} flex={1} >
                    <Typography color={theme.palette.primary.main9} fontWeight={500} whiteSpace={"nowrap"}>Count Down</Typography>
                    <Typography ml={0.5} letterSpacing={3} color={theme.palette.primary.main2} whiteSpace={'nowrap'}>
                        :&nbsp;{countdown}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default LotDetails;
