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


    return (
        <Card className={classes.card} elevation={2} >
            {/* Auction Image */}
            <CardMedia
                component="img"
                height="200"
                image={cardData.image}
                alt={headerType === "Auction" ? "Auction" : "Lot" + " Image"}
                className={classes.media}
            />
            <Box className={classes.contentWrapper}>
                {/* Auction Details */}
                <Box className={classes.content}>
                    {/* Title */}
                    <Tooltip title={cardData.name}>
                        <Typography className={classes.title} gutterBottom>
                            {cardData.name.length > 33 ? `${cardData.name.substring(0, 33)}...` : cardData.name}
                        </Typography>
                    </Tooltip>

                    {/* View Catalog Button */}
                    {headerType === "auction" ?
                        <Button onClick={() => navigate('/auction/lots')} variant="contained" size="small" className={classes.catalogButton}>
                            View Catalog
                        </Button> :
                        <Box>
                            <Typography className={classes.smallTitle} gutterBottom>
                                Highest Bid
                            </Typography>
                            <Button onClick={() => navigate('/auction/lots')} variant="contained" size="small" className={classes.catalogButton}>
                                View Catalog
                            </Button>
                        </Box>
                    }
                </Box>

                {/* Location, Date, and Lots */}
                {headerType === "auction" ?
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
                </Box>
            </Box>
        </Card>
    );
};

export default AuctionCard;
