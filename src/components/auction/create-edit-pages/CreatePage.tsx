import { useEffect, useState } from 'react';
import CreateAuction from './CreateAuction';
import LocationForm from './LocationForm';
import AddLot from './AddLot';
import { Box } from '@mui/material';

const CreatePage = ({ type }: any) => {
    const [isContinue, setIsContinue] = useState(false);
    const [isAddLot, setIsAddLot] = useState(false);
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

    // useEffect(() => {
    //     console.log('auction data: ', auctionData)
    // }, [auctionData])


    // const createAuction = async (payload: LogInPayload) => {
    //     updateAuctionData(formik.values);
    //     const data = formik.values
    //     const auctionParams = {
    //         Name: data.auctionName,
    //         Type: data.auctionType,
    //         Image: "https://example.com/image.jpg",
    //         Description: data.description,
    //         Notes: "Test Notes",
    //         LiveStreaming: data.liveStreaming,
    //         StartDate: formateDate(data.startDate),
    //         EndDate: formateDate(data.endDate),
    //         StartTime: formatTime(data.startTime),
    //         EndTime: formatTime(data.endTime),
    //         PrevStartDate: formateDate(data.auctionPreviewStartDate),
    //         PrevEndDate: formateDate(data.auctionPreviewEndDate),
    //         PrevStartTime: formatTime(data.auctionPreviewStartTime),
    //         PrevEndTime: formatTime(data.auctionPreviewEndTime),
    //         Country: "United States",
    //         State: "California",
    //         ZipCode: "90001",
    //         City: "Los Angeles",
    //         Address: "123 Demo Street",
    //         ShippingMethod: true,
    //         PaymentTerms: "Net 30",
    //         TermsConditions: "All sales are final.",
    //         CreatedAt: formateDate(data.auctionPreviewStartDate),
    //         UpdatedAt: formateDate(data.auctionPreviewStartDate),
    //     };

    //     const formData = new FormData();
    //     formData.append("payload", JSON.stringify(auctionParams));
    //     if (file) {
    //         formData.append("file", file);
    //     }

    //     createAuction(formData).then(response => {
    //         alert('Auction created: ' + response.data);
    //     }).catch(error => {
    //         alert('Error creating auction: ' + error.response?.data || error.message);
    //     });
    // }

    return (
        <Box sx={{ padding: 2 }}>
            {type === "lots" || (isContinue && isAddLot) ? (
                <AddLot
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
