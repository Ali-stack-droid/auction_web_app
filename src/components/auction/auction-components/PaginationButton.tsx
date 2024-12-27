import React, { useEffect, useState } from 'react';
import { Box, ToggleButtonGroup, ToggleButton, Pagination, Stack } from '@mui/material';
import useAuctionHeaderStyles from './AuctionHeaderStyles';
import usePaymentTrackingStyles from '../../payment-tracking/PaymentTrackingStyles';

interface PaginationButtonProps {
    filteredData: any[];
    setFilteredData: (data: any[]) => void;
}

const PaginationButton: React.FC<PaginationButtonProps> = React.memo(({ filteredData, setFilteredData }) => {
    const classes = useAuctionHeaderStyles();
    const bottomClass = usePaymentTrackingStyles();

    const rowsPerPage = 6;
    const [isPagination, setIsPagination] = useState(false);
    const [page, setPage] = useState<number>(0);

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    useEffect(() => {
        setFilteredData(filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage))
    }, [page])

    const handleChangePage = (_event: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage - 1); // Adjust for 0-based index
    };


    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: 5 }}>
            {!isPagination ?
                <Stack spacing={0}>
                    <Pagination
                        count={totalPages} // Set the total pages dynamically
                        page={page + 1} // Adjust for 1-based index
                        onChange={handleChangePage}
                        variant="outlined"
                        shape="rounded"
                    />
                </Stack>
                :
                <Box></Box>
            }

            <Box className={classes.toggleContainer}>
                <ToggleButtonGroup
                    value={isPagination ? 'pagination' : 'single'}
                    exclusive
                    onChange={() => setIsPagination((prev) => !prev)}
                    sx={{ maxHeight: '30px' }}
                >
                    <ToggleButton
                        value="single"
                        className={`${classes.toggleButton} ${isPagination ? 'current' : 'past'}`}
                    >
                        Single Page
                    </ToggleButton>
                    <ToggleButton
                        value="pagination"
                        className={`${classes.toggleButton} ${!isPagination ? 'current' : 'past'}`}
                    >
                        Pagination
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>
        </Box>
    );
});

export default PaginationButton;
