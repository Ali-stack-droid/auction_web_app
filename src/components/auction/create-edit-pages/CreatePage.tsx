import { useEffect, useState } from 'react';
import CreateAuction from './CreateAuction';
import LocationForm from './LocationForm';
import AddLot from './AddLot';
import { Box } from '@mui/material';
import { formatDate, formatTime } from '../../../utils/Format';
import { createAuction } from '../../Services/Methods';
import { toast, ToastContainer } from 'react-toastify';
import { ErrorMessage, SuccessMessage } from '../../../utils/ToastMessages';

const CreatePage = ({ type }: any) => {
    const [isContinue, setIsContinue] = useState(false);
    const [isAddLot, setIsAddLot] = useState(false);
    const [file, setFile]: any = useState(null);
    const [auctionData, setAuctionData]: any = useState({});
    const [locationData, setLocationData]: any = useState({});
    const [formData, setFormData] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const toastProps = {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
    }

    useEffect(() => {
        if (isContinue || isAddLot) {
            document.getElementById('childContainer')?.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }, [isContinue, isAddLot]);

    useEffect(() => {
        if (isSubmitted && auctionData && locationData) {
            const updatedData = {
                Name: auctionData.auctionName,
                Type: auctionData.auctionType,
                Image: "https://example.com/image.jpg",
                Description: auctionData.description,
                Notes: "Test Notes",
                LiveStreaming: auctionData.liveStreaming,
                StartDate: formatDate(auctionData.startDate),
                EndDate: formatDate(auctionData.endDate),
                StartTime: formatTime(auctionData.startTime),
                EndTime: formatTime(auctionData.endTime),
                PrevStartDate: formatDate(auctionData.auctionPreviewStartDate),
                PrevEndDate: formatDate(auctionData.auctionPreviewEndDate),
                PrevStartTime: formatTime(auctionData.auctionPreviewStartTime),
                PrevEndTime: formatTime(auctionData.auctionPreviewEndTime),
                Country: locationData.country,
                State: locationData.state,
                ZipCode: locationData.zipCode,
                City: locationData.city,
                Address: locationData.address,
                ShippingMethod: true,
                PaymentTerms: locationData.paymentTerms,
                TermsConditions: locationData.termsAndConditions,
                CreatedAt: formatDate(auctionData.auctionPreviewStartDate),
                UpdatedAt: formatDate(auctionData.auctionPreviewStartDate),
            };
            setFormData(updatedData);
            createNewAuction(updatedData)
        }
    }, [isSubmitted])


    const createNewAuction = async (payload: any) => {
        const formData = new FormData();
        formData.append("payload", JSON.stringify(payload));
        if (file) {
            formData.append("file", file);
        }

        createAuction(formData).then((response) => {
            SuccessMessage('Auction created successfully!');
            setIsSubmitted(false)
        }).catch(error => {
            ErrorMessage('Error creating auction!');
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
                    setLocationData={setLocationData}
                    isSubmitted={isSubmitted}
                    setIsSubmitted={setIsSubmitted}
                />
            ) : (
                <CreateAuction
                    file={file}
                    setFile={setFile}
                    setIsContinue={setIsContinue}
                    setAuctionData={setAuctionData}
                />
            )}
            {/* <ToastContainer /> */}
        </Box>
    );
};

export default CreatePage;
