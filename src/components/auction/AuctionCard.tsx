import { Card, CardContent, CardMedia, Typography, Button, Tooltip, Box } from '@mui/material';
import { useAuctionCardStyles } from './AuctionStyles';
import AuctionDetails from './AuctionDetails';

const AuctionCard = ({ auction }: any) => {
    const classes = useAuctionCardStyles();

    return (
        <Card className={classes.card} elevation={2} >
            {/* Auction Image */}
            <CardMedia
                component="img"
                height="200"
                image={auction.image}
                alt="Auction Image"
                className={classes.media}
            />
            <Box className={classes.contentWrapper}>
                {/* Auction Details */}
                <Box className={classes.content}>
                    <Box className={classes.titleContainer}>

                        {/* Title */}
                        <Tooltip title={auction.name}>
                            <Typography className={classes.title} gutterBottom>
                                {auction.name.length > 33 ? `${auction.name.substring(0, 33)}...` : auction.name}
                            </Typography>
                        </Tooltip>

                        {/* View Catalog Button */}
                        <Button variant="contained" size="small" className={classes.button}>
                            View Catalog
                        </Button>
                    </Box>
                </Box>

                {/* Location, Date, and Lots */}
                <AuctionDetails auction={auction} />

                {/* Action Buttons */}
                <Box className={classes.actionButtons}>
                    <Button variant="contained" size="small" color="primary">
                        Edit
                    </Button>
                    <Button variant="contained" size="small" color="error">
                        Delete
                    </Button>
                </Box>
            </Box>
        </Card>
    );
};

export default AuctionCard;
