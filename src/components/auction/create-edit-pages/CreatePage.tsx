import { useState } from 'react';
import CreateAuction from './CreateAuction';
import LocationForm from './LocationForm';
import AddLot from './AddLot';

const CreatePage = () => {
    const [isContinue, setIsContinue] = useState(false);
    const [isLot, setIsLot] = useState(false);

    return (
        <>
            {isContinue && isLot ? (
                // <AddLot />
                <h1>Sorry! This page is under Development...</h1>
            ) : isContinue ? (
                <LocationForm setIsLot={setIsLot} />
            ) : (
                <CreateAuction setIsContinue={setIsContinue} />
            )}
        </>
    );
};

export default CreatePage;
