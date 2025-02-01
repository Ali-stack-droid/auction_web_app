import { Card, CardMedia, Typography, Button, Tooltip, Box, FormControlLabel, Switch } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuctionCardStyles } from './AuctionStyles';
import LotDetails from './card-details-components/LotDetails';
import AuctionDetails from './card-details-components/AuctionDetails';
import LiveStreamingDetails from './card-details-components/LiveStreamingDetails';
import { getQueryParam } from '../../../helper/GetQueryParam';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import MoveLotModal from '../detail-pages/detail-pages-components/MoveLotModal';
import { setFeaturedLots } from '../../Services/Methods';
import { ErrorMessage, SuccessMessage } from '../../../utils/ToastMessages';

const AuctionCard = ({
    headerType,
    cardData,
    handleEdit,
    handleDelete,
    handleMoveModal
}: any) => {
    const classes = useAuctionCardStyles();
    const navigate = useNavigate();
    const location = useLocation();

    const [select, setSelect] = useState(false)
    const [moveLotId, setMoveLotId] = useState(0)

    const [moveModalOpen, setMoveModalOpen] = useState(false)
    const [isFeatured, setIsFeatured] = useState(cardData.isFeatured)
    // const isFeatured = cardData.isFeatured;

    // const [moveDialogue, setMoveDialogue] = useState(false)

    const dispatch = useDispatch();

    const handleCardMediaClick = () => {
        if (headerType === "live") {
            navigate(`/live-streaming/details?aucId=${cardData.id}`);
        } else if (headerType === "lots") {
            if (location.pathname === "/inventory") {
                localStorage.setItem('inventory', 'true');
            }
            navigate(`/auction/lots/details?lotId=${cardData.id}`);
        } else {
            navigate(`/auction/details?aucId=${cardData.id}`);
        }
    };

    const handleJoin = (id: number) => {
        navigate(`/live-streaming/details?aucId=${id}`);
    }

    const handleNextLot = (id: number) => {
        console.log("Join live stream: ", id)
    }

    const isLiveDetail = headerType === "live" && getQueryParam('aucId');

    const handleViewCatalog = (id: number) => {
        navigate(`/auction/lots?aucId=${id}`)
    }

    const handleMoveLot = (id: number) => {
        setMoveLotId(id)
        setMoveModalOpen(true);
    }

    const handleFeaturedLot = async (id: any) => {
        try {
            const response = await setFeaturedLots(id);
            if (response) {
                response.data === "Selected Lot featured" ?
                    SuccessMessage('Lot featured successfully!') :
                    SuccessMessage('Lot unfeatured successfully!')

                setIsFeatured(!isFeatured)
            }
        }
        catch {
            ErrorMessage('Only 3 lots can be fetured. Please unfeature a lot first!')
        }

    }

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
                        : ((headerType === "lots" && cardData.isPast) || headerType === "live" || headerType === "inventory") &&

                        <Button
                            variant="contained"
                            size="small"
                            className={headerType === "live" ? classes.unSoldButtonLive : `${classes.soldButton} ${!cardData.sold ? classes.unSoldButton : ''}`}
                        >
                            {headerType === "live" && cardData?.isLive ? "Live Streaming Auction" : cardData.sold ? "Sold" : "Unsold"}
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
                                {cardData.name.length > 100 ? `${cardData.name.substring(0, 33)}...` : cardData.name}
                            </Typography>
                            :
                            <Typography className={classes.title} gutterBottom>
                                {cardData.name.length > 43 ? `${cardData.name.substring(0, 33)}...` : cardData.name}
                            </Typography>
                        }
                    </Tooltip>

                    {/* View Catalog Button */}
                    {isLiveDetail ?
                        <Button
                            onClick={() => navigate(`/auction/lots?aucId=${cardData.id}`)}
                            variant={"outlined"}
                            size="small"
                            className={classes.nextButton}>
                            Show Next Lot
                        </Button>
                        :
                        headerType === "auction" || headerType === "live" ?
                            <Button onClick={() => handleViewCatalog(cardData.id)} variant={"contained"} size="small" className={classes.catalogButton}>
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
                                    $&nbsp;{cardData.highestBid}
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
                            : headerType === "lots" && cardData?.isPast ?
                                <Button className={classes.joinButton} variant="outlined" size="small" color="primary" onClick={() => handleMoveLot(cardData.id)}>
                                    Move
                                </Button>
                                : headerType === "lots" ?
                                    <Tooltip title={isFeatured ? "Click to unfeature" : "Click to feature"}>
                                        {/* <Button className={classes.joinButton} variant="outlined" size="small" color="primary" onClick={() => handleFeaturedLot(cardData.id)}>
                                            {isFeatured ? "Featured" : "Unfeatured"}
                                        </Button> */}
                                        <FormControlLabel
                                            control={
                                                <Switch checked={isFeatured}
                                                    onChange={() => handleFeaturedLot(cardData.id)} />
                                            }
                                            label={isFeatured ? "Featured" : "Unfeatured"}
                                        />
                                    </Tooltip>
                                    : null
                    }
                </Box>
            </Box>

            {/* Move Lot Confirmation on Move Button*/}
            {/* <CustomDialogue
                type={"create"}
                title={"Move Lot Confirmation!"}
                message={"Are you sure you want to move this lot from past auction to current auction?"}
                openDialogue={moveDialogue}
                handleCloseModal={() => setMoveDialogue(false)}
                handleConfirmModal={() => { setMoveDialogue(false); setMoveModalOpen(true) }}
            /> */}

            <MoveLotModal open={moveModalOpen} handleMoveModal={handleMoveModal} setMoveModalOpen={setMoveModalOpen} moveLotId={moveLotId} />

        </Card >
    );
};

export default AuctionCard;
