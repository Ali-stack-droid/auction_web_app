import { Card, CardMedia, Typography, Button, Tooltip, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuctionCardStyles } from './AuctionStyles';
import LotDetails from './details-components/LotDetails';
import AuctionDetails from './details-components/AuctionDetails';

const AuctionCard = ({
    headerType,
    cardData,
    handleEdit,
    handleDelete
}: any) => {
    const classes = useAuctionCardStyles();
    const navigate = useNavigate();

    const handleCardMediaClick = () => {
        if (headerType === "live") {
            navigate(`/live-streaming/details?liveId=${cardData.id}`);
        } else if (headerType === "lots") {
            navigate(`/auction/lots/details?lotId=${cardData.id}`);
        } else {
            navigate(`/auction/details?aucId=${cardData.id}`);
        }
    };

    return (
        <Card className={classes.card} elevation={2}>
            {/* Auction Image */}
            <Box sx={{
                position: 'relative', // Ensure the button is positioned relative to the Box
            }}>
                <CardMedia
                    onClick={handleCardMediaClick}
                    component="img"
                    height="200"
                    image={cardData.image}
                    alt={headerType === "live" ? "Live Streaming Image" : headerType === "Auction" ? "Auction" : "Lot" + " Image"}
                    className={classes.media}
                />
                {
                    headerType === "lots" || headerType === "live" &&
                    <Button
                        variant="contained"
                        size="small"
                        className={headerType === "live" ? classes.unSoldButtonLive : `${classes.soldButton} ${!cardData.sold ? classes.unSoldButton : ''}`}
                    >
                        {headerType === "live" ? "Live Streaming Auction" : cardData.sold ? "Sold" : "Unsold"}
                    </Button>
                }

            </Box>
            <Box className={classes.contentWrapper}>
                {/* Auction Details */}
                <Box className={classes.content}>
                    {/* Title */}
                    <Tooltip title={cardData.name}>
                        <Typography className={classes.title} gutterBottom>
                            {cardData.name.length > 43 ? `${cardData.name.substring(0, 33)}...` : cardData.name}
                        </Typography>
                    </Tooltip>

                    {/* View Catalog Button */}
                    {headerType === "auction" || headerType === "live" ?
                        <Button onClick={() => navigate('/auction/lots')} variant="contained" size="small" className={classes.catalogButton}>
                            View Catalog
                        </Button>
                        :
                        <Box>
                            <Typography className={classes.smallTitle} gutterBottom>
                                Highest Bid
                            </Typography>
                            <Button variant="contained" size="small" className={classes.catalogButton}
                                sx={{
                                    pointerEvents: 'none', // Prevent interaction while keeping styles
                                    opacity: 1, // Maintain original appearance
                                }}
                            >
                                {cardData.highestBid}
                            </Button>
                        </Box>
                    }
                </Box>

                {/* Location, Date, and Lots */}
                {headerType === "auction" || headerType === "live" ?
                    <AuctionDetails auctionDetails={cardData.details} />
                    : <LotDetails lotData={cardData} />
                }

                {/* Action Buttons */}
                <Box className={classes.actionButtons}>
                    <Button className={classes.actionButton} variant="contained" size="small" color="primary" onClick={() => handleEdit(cardData.id)}>
                        Edit
                    </Button>
                    <Button className={classes.actionButton} variant="contained" size="small" color="error" onClick={() => handleDelete(cardData.id)}>
                        Delete
                    </Button>
                    {headerType === "live" &&
                        <Button className={classes.joinButton} variant="outlined" size="small" color="primary" onClick={() => handleDelete(cardData.id)}>
                            Join
                        </Button>
                    }
                </Box>
            </Box>
        </Card>
    );
};

export default AuctionCard;
