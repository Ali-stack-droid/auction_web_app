import React from 'react';
import { Box, Typography, Button, MenuItem, FormControlLabel, Checkbox, IconButton } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomTextField from '../../custom-components/CustomTextField';
import { CustomMultiLineTextField } from '../../custom-components/CustomMultiLineTextField';
import ImageUploader from '../../custom-components/ImageUploader';
import { useCreateAuctionStyles } from './CreateAuctionStyles';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';

const AddLot = ({ updateLotsData, file, setFile }: any) => {
    const classes = useCreateAuctionStyles();

    const formik = useFormik({
        initialValues: {
            orderNumber: '',
            lotNumber: '',
            category: '',
            subCategory: '',
            lead: '',
            startAmount: '',
            endAmount: '',
            bidRangeAmount: '',
            description: '',
            startDate: '',
            startTime: '',
            endDate: '',
            endTime: '',
            internalNotes: '',
            auctionImage: '',
        },
        validationSchema: Yup.object({
            orderNumber: Yup.string().required('Order Number is required'),
            lotNumber: Yup.string().required('Lot Number is required'),
            category: Yup.string().required('Category is required'),
            subCategory: Yup.string().required('Sub-Category is required'),
            lead: Yup.string().required('Lead is required'),
            startAmount: Yup.number().required('Start Amount is required'),
            endAmount: Yup.number().required('End Amount is required'),
            bidRangeAmount: Yup.number().required('Bid Range Amount is required'),
            description: Yup.string().max(500).required('Description is required'),
            startDate: Yup.date().required('Start Date is required'),
            startTime: Yup.string().required('Start Time is required'),
            endDate: Yup.date().required('End Date is required'),
            endTime: Yup.string().required('End Time is required'),
            internalNotes: Yup.string(),
            auctionImage: Yup.mixed().required('Auction Image is required'),
        }),
        onSubmit: (values) => {
            updateLotsData(values);
            console.log('Form Data:', values);
        },
    });

    return (
        <Box>
            <Typography className={classes.title}>Create New Auction</Typography>
            <Typography className={classes.location}>Lots:</Typography>

            <form onSubmit={formik.handleSubmit}>
                <Box sx={{ padding: 3, marginBottom: 3, border: '1px solid #E2E8F0', borderRadius: "20px" }}>

                    <Box display="flex" gap={2} mb={2} justifyContent={'space-between'}>
                        <Box flex={1}>
                            <Typography className={classes.label}>
                                Order Number
                            </Typography>
                            <CustomTextField
                                name="orderNumber"
                                placeholder="Order Number"
                                value={formik.values.orderNumber}
                                onChange={formik.handleChange}
                                error={formik.touched.orderNumber && Boolean(formik.errors.orderNumber)}
                                helperText={formik.touched.orderNumber && formik.errors.orderNumber}
                            />
                        </Box>
                        <Box flex={1} mx={2}>
                            <Typography className={classes.label}>
                                Lot Number
                            </Typography>
                            <CustomTextField
                                name="lotNumber"
                                placeholder="Lot Number"
                                value={formik.values.lotNumber}
                                onChange={formik.handleChange}
                                error={formik.touched.lotNumber && Boolean(formik.errors.lotNumber)}
                                helperText={formik.touched.lotNumber && formik.errors.lotNumber}
                            />
                        </Box>
                        <Box flex={1}>
                            <Typography className={classes.label}>
                                Category
                            </Typography>
                            <CustomTextField
                                select
                                name="category"
                                placeholder="Category"
                                value={formik.values.category}
                                onChange={formik.handleChange}
                                error={formik.touched.category && Boolean(formik.errors.category)}
                                helperText={formik.touched.category && formik.errors.category}
                            >
                                <MenuItem value="Category1">Category1</MenuItem>
                                <MenuItem value="Category2">Category2</MenuItem>
                            </CustomTextField>
                        </Box>
                    </Box>

                    <Box display="flex" gap={2} mb={3} justifyContent={'space-between'}>
                        <Box flex={0.479}>
                            <Typography className={classes.label}>
                                Sub-Category
                            </Typography>
                            <CustomTextField
                                select
                                name="subCategory"
                                placeholder="Sub-Category"
                                value={formik.values.subCategory}
                                onChange={formik.handleChange}
                                error={formik.touched.subCategory && Boolean(formik.errors.subCategory)}
                                helperText={formik.touched.subCategory && formik.errors.subCategory}
                            >
                                <MenuItem value="SubCategory1">SubCategory1</MenuItem>
                                <MenuItem value="SubCategory2">SubCategory2</MenuItem>
                            </CustomTextField>
                        </Box>
                        <Box flex={1} ml={2}>
                            <Typography className={classes.label}>
                                Lead
                            </Typography>
                            <CustomTextField
                                name="lead"
                                placeholder="Lead"
                                value={formik.values.lead}
                                onChange={formik.handleChange}
                                error={formik.touched.lead && Boolean(formik.errors.lead)}
                                helperText={formik.touched.lead && formik.errors.lead}
                            />
                        </Box>
                    </Box>

                    <Typography className={classes.info} my={1}>Bid Increment</Typography>

                    <Box display="flex" gap={2} mb={2} justifyContent={'space-between'}>
                        <Box flex={1}>
                            <Typography className={classes.label}>
                                Start Amount
                            </Typography>
                            <CustomTextField
                                name="startAmount"
                                placeholder="Start Amount"
                                value={formik.values.startAmount}
                                onChange={formik.handleChange}
                                error={formik.touched.startAmount && Boolean(formik.errors.startAmount)}
                                helperText={formik.touched.startAmount && formik.errors.startAmount}
                            />
                        </Box>

                        <Box flex={1} mx={2}>
                            <Typography className={classes.label}>
                                End Amount
                            </Typography>
                            <CustomTextField
                                name="endAmount"
                                placeholder="End Amount"
                                value={formik.values.endAmount}
                                onChange={formik.handleChange}
                                error={formik.touched.endAmount && Boolean(formik.errors.endAmount)}
                                helperText={formik.touched.endAmount && formik.errors.endAmount}
                            />
                        </Box>
                        {/* <Box flex={1}>
                            <Typography className={classes.label}>
                                Bid Range Amount
                            </Typography>
                            <CustomTextField
                                name="bidRangeAmount"
                                placeholder="Bid Range Amount"
                                value={formik.values.bidRangeAmount}
                                onChange={formik.handleChange}
                                error={formik.touched.bidRangeAmount && Boolean(formik.errors.bidRangeAmount)}
                                helperText={formik.touched.bidRangeAmount && formik.errors.bidRangeAmount}
                            />
                        </Box> */}

                        <Box flex={1}>
                            <Typography className={classes.label}>
                                Bid Range Amount
                            </Typography>
                            <Box className={classes.inputWithButton}>
                                <CustomTextField
                                    name="bidRangeAmount"
                                    placeholder="Bid Range Amount"
                                    value={formik.values.bidRangeAmount}
                                    onChange={formik.handleChange}
                                    error={formik.touched.bidRangeAmount && Boolean(formik.errors.bidRangeAmount)}
                                    helperText={formik.touched.bidRangeAmount && formik.errors.bidRangeAmount}
                                />
                                <IconButton sx={{ margin: "0 0 10px 10px" }}>
                                    <ControlPointRoundedIcon className={classes.addIcon} />
                                </IconButton>
                            </Box>
                        </Box>
                    </Box>

                    <Box flex={1} mb={2}>
                        <Typography className={classes.label}>
                            Description
                        </Typography>
                        <CustomMultiLineTextField
                            name="description"
                            placeholder="Description"
                            maxRows={5}
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                        />
                    </Box>

                    <Box display="flex" gap={2} mb={2} justifyContent={'space-between'}>
                        <Box flex={1}>
                            <Typography className={classes.label}>
                                Start Date
                            </Typography>
                            <CustomTextField
                                name="startDate"
                                type="date"
                                value={formik.values.startDate}
                                onChange={formik.handleChange}
                                error={formik.touched.startDate && Boolean(formik.errors.startDate)}
                                helperText={formik.touched.startDate && formik.errors.startDate}
                            />
                        </Box>
                        <Box flex={1}>
                            <Typography className={classes.label}>
                                Start Time
                            </Typography>
                            <CustomTextField
                                name="startTime"
                                type="time"
                                value={formik.values.startTime}
                                onChange={formik.handleChange}
                                error={formik.touched.startTime && Boolean(formik.errors.startTime)}
                                helperText={formik.touched.startTime && formik.errors.startTime}
                            />
                        </Box>
                        <Box flex={1}>
                            <Typography className={classes.label}>
                                End Date
                            </Typography>
                            <CustomTextField
                                name="endDate"
                                type="date"
                                value={formik.values.endDate}
                                onChange={formik.handleChange}
                                error={formik.touched.endDate && Boolean(formik.errors.endDate)}
                                helperText={formik.touched.endDate && formik.errors.endDate}
                            />
                        </Box>
                    </Box>

                    <Box width={'32.3%'} mb={2}>
                        <Typography className={classes.label}>
                            End Time
                        </Typography>
                        <CustomTextField
                            name="endTime"
                            type="time"
                            value={formik.values.endTime}
                            onChange={formik.handleChange}
                            error={formik.touched.endTime && Boolean(formik.errors.endTime)}
                            helperText={formik.touched.endTime && formik.errors.endTime}
                        />
                    </Box>

                    <Box mb={2}>
                        <Typography className={classes.label}>
                            Upload Auction Image
                        </Typography>
                        <ImageUploader
                            file={file}
                            setFile={(uploadedFile: any) => {
                                setFile(uploadedFile); // Update local state
                                formik.setFieldValue('auctionImage', uploadedFile); // Update Formik state
                            }} />                    </Box>

                    <Box mt={3}>
                        <Typography className={classes.label}>
                            Internal Notes
                        </Typography>
                        <CustomMultiLineTextField
                            name="internalNotes"
                            placeholder="Internal Notes"
                            value={formik.values.internalNotes}
                            onChange={formik.handleChange}
                        />
                    </Box>

                    <Box className={classes.actionButtons}>
                        <Button
                            className={classes.cancelButton}
                            variant="outlined"
                            onClick={() => formik.resetForm()}
                        >
                            Cancel
                        </Button>
                        <Button
                            className={classes.continueButton}
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Save
                        </Button>
                    </Box>
                </Box>
            </form>
        </Box>
    );
};

export default AddLot;
