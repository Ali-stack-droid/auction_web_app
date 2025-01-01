import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Pagination, Stack, PaginationItem, Button, ToggleButton, ToggleButtonGroup, Fade } from "@mui/material";
import { useState } from "react";
import usePaymentTrackingStyles from "./PaymentTrackingStyles";
import { tableData } from "./paymentData";
import ViewModal from "./ViewModal";

const PaymentTracking = () => {
    const classes = usePaymentTrackingStyles();
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(6);
    const [selectedInvoice, setSelectedInvoice] = useState({});
    const [paidInvoice, setPaidInvoice] = useState<boolean>(false);
    const [fadeIn, setFadeIn] = useState(true);
    const [viewDetails, setViewDetails] = useState(false);

    const handleChangePage = (_event: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage - 1); // Adjust for 0-based index
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPage(0);
    };

    const handleToggleInvoice = () => {
        setFadeIn(false)
        setTimeout(() => {
            setPage(0);
            setPaidInvoice(!paidInvoice);
            setFadeIn(true);
        }, 300);
    }
    const handleViewButton = (ind: number) => {
        setSelectedInvoice(tableData[ind]);
        setViewDetails(true)
    }
    // Calculate the number of pages based on the length of tableData
    const totalPages = Math.ceil(tableData.length / rowsPerPage);

    return (
        <Box sx={{ padding: 2 }}>
            <Box className={classes.header}>
                <Fade in={fadeIn} timeout={300}>
                    <Typography className={classes.title}>{paidInvoice ? "Paid Invoices" : "Pending Invoices"}</Typography>
                </Fade>
                <Box className={classes.toggleContainer}>
                    <ToggleButtonGroup
                        value={paidInvoice ? 'paid' : 'pending'}
                        exclusive
                        onChange={handleToggleInvoice}
                        sx={{ maxHeight: '30px' }}
                    >
                        <ToggleButton
                            value="pending"
                            className={`${classes.toggleButton} ${paidInvoice ? 'paid' : 'pending'}`}
                        >
                            Pending Invoices
                        </ToggleButton>
                        <ToggleButton
                            value="paid"
                            className={`${classes.toggleButton} ${!paidInvoice ? 'paid' : 'pending'}`}
                        >
                            Paid Invoices
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>
            </Box>

            <Fade in={fadeIn} timeout={300}>
                <Table className={classes.paymentTable} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: '#19549F' }}>
                        <TableRow>
                            <TableCell sx={{ color: "white" }}>Invoice ID</TableCell>
                            <TableCell sx={{ color: "white" }}>Name</TableCell>
                            <TableCell sx={{ color: "white" }}>Email</TableCell>
                            <TableCell sx={{ color: "white" }}>Address</TableCell>
                            <TableCell sx={{ color: "white" }}>Deadline</TableCell>
                            <TableCell sx={{ color: "white" }}>Details</TableCell>
                            <TableCell sx={{ color: "white" }}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                            <TableRow key={row.invoiceId}>
                                <TableCell>{row.invoiceId}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.address}</TableCell>
                                <TableCell>{row.deadline}</TableCell>
                                <TableCell>
                                    <Button variant={'contained'} className={classes.viewButton} onClick={() => handleViewButton(index)}>View</Button>
                                </TableCell>
                                <TableCell>
                                    {paidInvoice ?
                                        <Button variant={'contained'} className={`${classes.status} ${'active'}`}>
                                            Paid
                                        </Button>
                                        :
                                        <Button variant={'contained'} className={`${classes.status} ${row.status ? 'active' : 'inactive'}`}>
                                            {row.status ? "Active" : "Inactive"}
                                        </Button>
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Fade>

            <Box className={classes.paginationWrapper}>
                <Stack spacing={0}>
                    <Pagination
                        count={totalPages} // Set the total pages dynamically
                        page={page + 1} // Adjust for 1-based index
                        onChange={handleChangePage}
                        variant="outlined"
                        shape="rounded"
                    />
                </Stack>
            </Box>

            <ViewModal open={viewDetails} onClose={() => setViewDetails(false)} data={selectedInvoice} type={"details"} />
        </Box>
    );
};

export default PaymentTracking;
