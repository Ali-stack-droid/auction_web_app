import { useEffect, useState } from 'react';
import CreateAuction from './CreateAuction';
import LocationForm from './LocationForm';
import AddLot from './AddLot';
import { Box } from '@mui/material';
import { formatDate, formatTime } from '../../../utils/Format';
import { createAuction } from '../../Services/Methods';
import { toast, ToastContainer } from 'react-toastify';
import { ErrorMessage, SuccessMessage } from '../../../utils/ToastMessages';
import { useNavigate } from 'react-router-dom';

const CreatePage = ({ type }: any) => {

    // data states
    const [auctionData, setAuctionData]: any = useState({});
    const [locationData, setLocationData]: any = useState({});

    // utils
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isContinue, setIsContinue] = useState(false);
    const [file, setFile]: any = useState(null);
    const [navigation, setNavigation] = useState("");

    const navigate = useNavigate()
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
        if (isContinue) {
            document.getElementById('childContainer')?.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }, [isContinue]);

    useEffect(() => {
        if (isSubmitted && Object.keys(auctionData).length !== 0 && Object.keys(locationData).length !== 0) {
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
            createNewAuction(updatedData)
        }
    }, [isSubmitted])


    const createNewAuction = async (payload: any) => {
        const formData = new FormData();
        formData.append("payload", JSON.stringify(payload));
        if (file) {
            formData.append("file", file);
            setFile(null)
        }

        createAuction(formData).then((response) => {

            const newAuctionId = response.data.Id;
            setIsSubmitted(false)

            if (navigation == "auction") {
                navigate('/auction')
            } else {
                navigate(`auction/lots/create?aucId=${newAuctionId}`)
            }

            SuccessMessage('Auction created successfully!');

        }).catch(error => {
            ErrorMessage('Error creating auction!');
            setIsSubmitted(false)
        });
    }

    return (
        <Box sx={{ padding: 2 }}>
            {isContinue ? (
                <LocationForm
                    setLocationData={setLocationData}
                    isSubmitted={isSubmitted}
                    setIsSubmitted={setIsSubmitted}
                    setNavigation={setNavigation}
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
