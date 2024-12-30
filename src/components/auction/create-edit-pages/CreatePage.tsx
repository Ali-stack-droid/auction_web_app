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

    useEffect(() => {
        console.log('auction data: ', auctionData)
    }, [auctionData])


    const createAuction = async (payload: LogInPayload) => {
    }

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
