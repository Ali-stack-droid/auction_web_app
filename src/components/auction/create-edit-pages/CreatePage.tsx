import { useEffect, useState } from 'react';
import CreateAuction from './CreateAuction';
import LocationForm from './LocationForm';
import AddLot from './AddLot';
import { Box } from '@mui/material';

const CreatePage = ({ type }: any) => {
    const [isContinue, setIsContinue] = useState(false);
    const [isAddLot, setIsAddLot] = useState(false);

    useEffect(() => {
        if (isContinue || isAddLot) {
            document.getElementById('childContainer')?.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }, [isContinue, isAddLot]);

    return (
        <Box sx={{ padding: 2 }}>
            {type === "lots" || (isContinue && isAddLot) ? (
                <AddLot />
            ) : isContinue && !isAddLot ? (
                <LocationForm setIsAddLot={setIsAddLot} />
            ) : (
                <CreateAuction setIsContinue={setIsContinue} />
            )}
        </Box>
    );
};

export default CreatePage;
