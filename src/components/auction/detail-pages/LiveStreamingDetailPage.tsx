import React, { useEffect, useState } from 'react';
import { CardMedia, Typography, Button, Box, List, ListItem, Card, Avatar, Pagination } from '@mui/material';
import useLiveStreamDetailStyles from './LiveStreamingDetailStyles';
import { useNavigate } from 'react-router-dom';
import { getQueryParam } from '../../../helper/GetQueryParam';
import AuctionCard from '../auction-components/AuctionCard';
import { liveStreamData } from '../../live-streaming/liveStreamData';
import auctionsData from "../lotsData";
import PaginationButton from '../auction-components/PaginationButton';


const LiveStreamingDetailPage: React.FC = () => {
    const classes = useLiveStreamDetailStyles();

    const liveBidders = ["Bidder Name 1", "Bidder Name 2", "Bidder Name 3", "Bidder Name 4", "Bidder Name 5", "Bidder Name 6"];
    const [liveStream, setLiveStream]: any = useState(liveStreamData.find((stream: any) => stream.id + "" === getQueryParam('liveId')))
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [deleteStreamId, setDeleteStreamId] = useState(0)

    useEffect(() => {
        if (liveStreamData) {
            const stream = liveStreamData.find((stream: any) => stream.id + "" === getQueryParam('liveId'));
            setLiveStream(stream)
        }
    }, [liveStreamData])

    const navigate = useNavigate()

    return (
        <Box p={2}>
            <Box>
                <Typography className={classes.title} pb={1}>
                    Live Streaming Auction
                </Typography>
            </Box>
            <Box className={classes.container}>
                <Box flex={1} className={classes.mediaSection}>
                    <AuctionCard
                        width={"100%"}
                        headerType={"live"}
                        cardData={liveStream}
                        handleEdit={() => { }}
                        handleDelete={() => { }}
                    />
                </Box>
                <Box className={classes.rightSection}>
                    <Typography variant="h6" className={classes.liveBiddersHeader}>Live Bidders</Typography>
                    <List className={classes.liveBiddersList} >
                        {liveBidders.map((bidder, index) => (
                            <ListItem key={index} className={classes.liveBidderItem}>
                                <Avatar />
                                <Box className={classes.bidderBox}>
                                    <Typography className={classes.bidderName}>{bidder}</Typography>
                                    <Typography className={classes.bidderMessage}>Lorem ipsum dolor sit amet sim.</Typography>
                                </Box>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Box>
            {true &&
                <Box maxWidth={'79vw'} overflow={'auto'} pt={3}>
                    <Box className={classes.titleWrapper}>
                        <Typography className={classes.title}>
                            Auction Lots :
                        </Typography>
                        <Box className={classes.countBadge}>20</Box>
                    </Box>
                    <Box className={classes.cardContainer}>
                        {auctionsData && auctionsData.map((auction) => (
                            <Box
                                key={auction.id}
                                sx={{ flexShrink: 0 }} // Set the card width
                            >
                                <AuctionCard
                                    headerType={'lots'}
                                    cardData={auction}
                                    handleEdit={() => navigate(`/auction/lots/edit/${auction.id}`)}
                                    handleDelete={() => { }}
                                />
                            </Box>
                        ))}
                    </Box>
                    <PaginationButton filteredData={auctionsData} setFilteredData={() => { }} />
                </Box>
            }
        </Box >
    );
};

export default LiveStreamingDetailPage;
