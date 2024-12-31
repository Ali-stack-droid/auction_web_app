import { useEffect, useState } from 'react';
import CreateAuction from './CreateAuction';
import LocationForm from './LocationForm';
import AddLot from './AddLot';
import { Box } from '@mui/material';
import { formatDate, formatTime } from '../../../utils/Format';
import { createAuction } from '../../Services/Methods';

const CreatePage = ({ type }: any) => {
    const [isContinue, setIsContinue] = useState(false);
    const [isAddLot, setIsAddLot] = useState(false);
    const [file, setFile]: any = useState(null);

    const [auctionData, setAuctionData] = useState({
        createAuction: {}, // Data from CreateAuction form
        location: {},      // Data from LocationForm
        lots: []           // Data from AddLot form (array if multiple lots)
    });

    useEffect(() => {
        if (isContinue || isAddLot) {
            document.getElementById('childContainer')?.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }, [isContinue, isAddLot]);

    useEffect(() => {
        if (isContinue && isAddLot) {
            alert("submit");
            createNewAuction(auctionData);
        }
    }, [auctionData])


    const createNewAuction = async (payload: any) => {
        const auction = payload.createAuction;
        const location = payload.location;
        const auctionParams = {
            Name: auction.auctionName,
            Type: auction.auctionType,
            Image: "https://example.com/image.jpg",
            Description: auction.description,
            Notes: "Test Notes",
            LiveStreaming: auction.liveStreaming,
            StartDate: formatDate(auction.startDate),
            EndDate: formatDate(auction.endDate),
            StartTime: formatTime(auction.startTime),
            EndTime: formatTime(auction.endTime),
            PrevStartDate: formatDate(auction.auctionPreviewStartDate),
            PrevEndDate: formatDate(auction.auctionPreviewEndDate),
            PrevStartTime: formatTime(auction.auctionPreviewStartTime),
            PrevEndTime: formatTime(auction.auctionPreviewEndTime),
            Country: location.country,
            State: location.state,
            ZipCode: location.zipCode,
            City: location.city,
            Address: location.address,
            ShippingMethod: true,
            PaymentTerms: location.paymentTerms,
            TermsConditions: location.termsAndConditions,
            CreatedAt: formatDate(auction.auctionPreviewStartDate),
            UpdatedAt: formatDate(auction.auctionPreviewStartDate),
        };

        const formData = new FormData();
        formData.append("payload", JSON.stringify(auctionParams));
        if (file) {
            formData.append("file", file);
        }

        createAuction(formData).then((response) => {
            alert('Auction created: ' + response.data);
        }).catch(error => {
            alert('Error creating auction: ' + error.response?.data || error.message);
        });
    }

    return (
        <Box sx={{ padding: 2 }}>
            {type === "lots" || (isContinue && isAddLot) ? (
                <AddLot
                    file={file}
                    setFile={setFile}
                    updateLotsData={(data: any) =>
                        setAuctionData((prev: any) => ({ ...prev, lots: [...prev.lots, data] }))
                    }
                />
            ) : isContinue && !isAddLot ? (
                <LocationForm
                    setIsAddLot={setIsAddLot}
                    updateLocationData={(data: any) =>
                        setAuctionData((prev) => ({ ...prev, location: data }))
                    }
                />
            ) : (
                <CreateAuction
                    file={file}
                    setFile={setFile}
                    setIsContinue={setIsContinue}
                    updateAuctionData={(data: any) =>
                        setAuctionData((prev) => ({ ...prev, createAuction: data }))
                    }
                />
            )}
        </Box>
    );
};

export default CreatePage;
