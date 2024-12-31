import { Card, CardMedia, Typography, Button, Tooltip, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuctionCardStyles } from './AuctionStyles';
import LotDetails from './details-components/LotDetails';
import AuctionDetails from './details-components/AuctionDetails';
import LiveStreamingDetails from './details-components/LiveStreamingDetails';
import { getQueryParam } from '../../../helper/GetQueryParam';
import React, { useState } from 'react';
import ViewModal from '../../payment-tracking/ViewModal';

const AuctionCard = ({
    headerType,
    cardData,
    handleEdit,
    handleDelete
}: any) => {
    const classes = useAuctionCardStyles();
    const navigate = useNavigate();
    const [select, setSelect] = useState(false)
    const [moveDialogue, setMoveDialogue] = useState(false)
    const [moveLotId, setMoveLotId] = useState(0)


    const handleCardMediaClick = () => {
        if (headerType === "live") {
            navigate(`/live-streaming/details?liveId=${cardData.id}`);
        } else if (headerType === "lots") {
            navigate(`/auction/lots/details?lotId=${cardData.id}`);
        } else {
            navigate(`/auction/details?aucId=${cardData.id}`);
        }
    };

    const handleJoin = (id: number) => {
        navigate(`/live-streaming/details?liveId=${id}`);
    }

    const handleNextLot = (id: number) => {
        console.log("Join live stream: ", id)
    }

    const handleMove = (id: number) => {
        setMoveDialogue(true);
        setMoveLotId(id);
    }

    const isLiveDetail = headerType === "live" && getQueryParam('liveId');

    return (
        <Card className={headerType === "live" ? classes.liveCard : classes.card} elevation={2}>
            {/* Auction Image */}
            <Box sx={{
                position: 'relative', // Ensure the button is positioned relative to the Box
            }}>
                <CardMedia
                    onClick={handleCardMediaClick}
                    component="img"
                    height={isLiveDetail ? "350" : "200"}
                    image={cardData.image}
                    alt={headerType === "live" ? "Live Streaming Image" : headerType === "Auction" ? "Auction" : "Lot" + " Image"}
                    className={isLiveDetail ? classes.liveMedia : classes.media}
                />
                {
                    isLiveDetail ?
                        <Box>
                            <Button
                                variant="contained"
                                size="small"
                                className={classes.button1}
                            >
                                Live Stream
                            </Button>
                            <Button
                                variant="contained"
                                size="small"
                                className={classes.button2}
                            >
                                End Stream
                            </Button>
                            <Box sx={{ position: "absolute", gap: 2, top: 10, right: 10, display: "flex", alignItems: "center" }}>
                                <Button
                                    variant="contained"
                                    size="small"
                                    className={classes.button3}
                                >
                                    John Anderson Smith
                                </Button>
                                <Button
                                    variant="contained"
                                    size="small"
                                    className={classes.button3}
                                >
                                    Highest Bid : $10,000
                                </Button>
                            </Box>
                        </Box>
                        : (headerType === "lots" || headerType === "live") &&

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
                        {isLiveDetail ?
                            <Typography className={classes.title} gutterBottom>
                                {cardData.fullName.length > 100 ? `${cardData.fullName.substring(0, 33)}...` : cardData.fullName}
                            </Typography>
                            :
                            <Typography className={classes.title} gutterBottom>
                                {cardData.name.length > 43 ? `${cardData.name.substring(0, 33)}...` : cardData.name}
                            </Typography>
                        }
                    </Tooltip>

                    {/* View Catalog Button */}
                    {isLiveDetail ?
                        <Button onClick={() => navigate('/auction/lots')} variant={"outlined"} size="small" className={classes.nextButton}>
                            Show Next Lot
                        </Button>
                        :
                        headerType === "auction" || headerType === "live" ?
                            <Button onClick={() => navigate('/auction/lots')} variant={"contained"} size="small" className={classes.catalogButton}>
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
                {isLiveDetail &&
                    <Typography className={classes.description} gutterBottom>
                        {cardData.description.length > 300 ? `${cardData.description.substring(0, 33)}...` : cardData.description}
                    </Typography>
                }


                {/* Location, Date, and Lots */}
                {isLiveDetail ?
                    <LiveStreamingDetails streamData={cardData.details} />
                    : headerType === "auction" || headerType === "live" ?
                        <AuctionDetails auctionDetails={cardData.details} />
                        : <LotDetails lotData={cardData} />
                }

                {/* Action Buttons */}
                <Box className={classes.actionButtons}>
                    {!isLiveDetail &&
                        <React.Fragment>
                            <Button className={classes.actionButton} variant="contained" size="small" color="primary" onClick={() => handleEdit(cardData.id)}>
                                Edit
                            </Button>
                            <Button className={classes.actionButton} variant="contained" size="small" color="error" onClick={() => handleDelete(cardData.id)}>
                                Delete
                            </Button>
                        </React.Fragment>
                    }
                    {isLiveDetail ?
                        <Button className={classes.selectButton} variant="contained" size="small" color="primary" onClick={() => setSelect(true)}>
                            Select Next Lot
                        </Button>
                        : headerType === "live" ?
                            <Button className={classes.joinButton} variant="outlined" size="small" color="primary" onClick={() => handleJoin(cardData.id)}>
                                Join
                            </Button>
                            : headerType === "lots" ?
                                <Button className={classes.joinButton} variant="outlined" size="small" color="primary" onClick={() => handleMove(cardData.id)}>
                                    Move
                                </Button>
                                : null
                    }
                </Box>
            </Box>

            <ViewModal open={moveDialogue} onClose={() => setMoveDialogue(false)} data={moveLotId} type={"move"} />

        </Card >
    );
};

export default AuctionCard;
